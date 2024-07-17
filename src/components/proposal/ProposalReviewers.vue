<template lang>
  <div>
    <proposal-score-sheets />
    <div class="q-pa-sm">
      <q-toolbar-title>Reviewers</q-toolbar-title>
      <q-markup-table v-if="scores.length" flat bordered>
        <tbody>
          <tr v-for="score in scores" :key="score.id">
            <td class="text-left">
              {{ score.user }} - {{ score.user__first_name }}
              {{ score.user__last_name }} [{{ score.user__username }}]
            </td>
            <td class="text-left">{{ score.status }}</td>
            <td class="text-left flex">
              <q-btn
                color="primary"
                icon="close"
                flat
                dense
                @click="deleteScore(score.id)"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <q-card flat bordered class="my-card q-my-sm">
        <label class="text-h6 q-pa-sm">Add Reviewer</label>
        <div class="row">
          <div class="col-6 q-pa-sm">
            <q-btn-dropdown
              flat
              class="q-mx-sm"
              label="Select reviewer"
              color="primary"
            >
              <q-list>
                <q-item
                  v-for="user in reviewers"
                  :key="user.id"
                  clickable
                  v-close-popup
                  @click="
                    this.formData.email = user.username;
                    this.formData.user = user.id;
                  "
                >
                  <q-item-section>
                    <q-item-label>
                      <div>
                        {{ user.first_name }}
                        {{ user.last_name }}
                      </div>
                      {{ user.username }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div class="col-4 q-pa-sm">
            <q-input
              outlined
              dense
              v-model="formData.email"
              type="email"
              label="Enter Email Address"
            />
          </div>
          <div class="col-2 q-pa-sm">
            <q-btn color="primary" label="Add" @click="createScore" />
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scores: [],
      reviewers: [],
      loading: false,
      formData: {
        user: null,
        email: null,
        proposal: this.$route.params.proposal_id,
      },
    };
  },
  created() {
    this.getScores();
    this.getReviewers();
  },
  methods: {
    getScores() {
      this.$api
        .get(`scores/?proposal=${this.$route.params.proposal_id}`)
        .then((res) => {
          this.scores = res.data;
        });
    },

    getReviewers() {
      this.$api.get("users/?groups__name__in=reviewer").then((res) => {
        this.reviewers = res.data;
      });
    },

    createScore() {
      this.$utilsStore.setLoading(true);
      this.$api.post("scores/", this.formData).then((res) => {
        if (res.status == 201) {
          this.getScores();
          this.$utilsStore.setLoading(false);
        }
      });
    },

    deleteScore(id) {
      if (confirm("Are you sure you would like to delete this reviewer?")) {
        this.$utilsStore.setLoading(true);
        this.$api.delete(`scores/${id}/`).then((res) => {
          if (res.status == 204) {
            this.getScores();
            this.$utilsStore.setLoading(false);
          }
        });
      }
    },
  },
};
</script>
<style lang></style>
