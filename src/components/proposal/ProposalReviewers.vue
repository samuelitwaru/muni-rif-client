<template lang="">
  <div>
    <div class="q-pa-sm">
      <q-toolbar-title>Reviewers</q-toolbar-title>
      <q-markup-table flat bordered>
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
                icon="delete"
                flat
                dense
                @click="deleteScore(score.id)"
              />
            </td>
          </tr>
          <tr>
            <td class="text-left flex">
              <q-btn-dropdown
                flat
                class="q-mx-sm"
                label="Select existing reviewer"
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
              <q-input
                outlined
                dense
                v-model="formData.email"
                type="email"
                label="Enter Email Address"
              />
            </td>
            <td class="text-left">
              <q-btn
                color="primary"
                icon="add"
                label="Add Reviewer"
                @click="createScore"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>

      <q-separator spaced />

      <proposal-score-sheets />
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
        proposal: this.$route.params.id,
      },
    };
  },
  created() {
    this.getScores();
    this.getReviewers();
  },
  methods: {
    getScores() {
      this.$api.get(`scores/?proposal=${this.$route.params.id}`).then((res) => {
        this.scores = res.data;
        console.log(this.scores);
      });
    },

    getReviewers() {
      this.$api.get("users/?groups__name__in=reviewer").then((res) => {
        this.reviewers = res.data;
        console.log(res.data);
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
<style lang=""></style>
