<template lang="">
  <div>
    <h2 class="flex justify-between text-h6 q-px-md">Proposal Reviews</h2>

    <q-list bordered>
      <router-link
        :to="`proposal-reviews/${score.proposal_detail.id}`"
        v-for="score in proposals"
        :key="score.id"
      >
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="" name="book" />
          </q-item-section>
          <q-item-section>{{ score.proposal_detail.title }}</q-item-section>
          <q-chip dense class="glossy" :label="score.status" />
        </q-item>
      </router-link>
    </q-list>

    <div v-if="proposals.length == 0" align="center" style="margin-top: 10rem">
      <p>No proposals found</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      proposals: [],
      search_query: "",
    };
  },

  created() {
    if (this.$userHasAnyGroups(["reviewer"])) {
      this.getCurrentUserScoreSheets();
    }
  },

  methods: {
    getCurrentUserScoreSheets() {
      // this.$utilsStore.setLoading(true);
      var query = this.search_query ? `&search=${this.search_query}` : "";
      this.$api
        .get(`scores?user=${this.$authStore.currentUser.id}${query}`)
        .then((res) => {
          this.proposals = res.data;
          console.log(this.proposals);
          // this.$utilsStore.setLoading(false);
        });
    },
  },
};
</script>
<style lang=""></style>
