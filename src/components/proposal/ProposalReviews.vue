<template lang="">
  <div>
    <proposal-score-sheets />
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
          </tr>
        </tbody>
      </q-markup-table>
      <p v-if="!scores.length" align="center" class="q-my-lg">
        No reviewers found
      </p>
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
<style lang=""></style>
