<template lang="">
  <div>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />

        <q-breadcrumbs-el label="Proposal Reviews" icon="reviews" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />

    <h2 class="flex justify-between text-h6 q-px-md">Proposal Reviews</h2>

    <q-list bordered class="q-ma-sm">
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
          <q-chip
            color="secondary"
            dense
            class="glossy"
            :label="score.status"
          />
        </q-item>
      </router-link>
    </q-list>

    <div v-if="proposals.length == 0" align="center" style="margin-top: 10rem">
      <p>No proposals found</p>
    </div>
  </div>
</template>
<script>
import { protectFile } from "src/utils/helpers";
export default {
  name: "ReviewProposalList",
  data() {
    return {
      loading: false,
      proposals: [],
      search_query: "",
    };
  },

  created() {
    protectFile(this.$options.name);
    if (this.$userHasAnyGroups(["reviewer"])) {
      this.getCurrentUserScoreSheets();
    }
  },

  methods: {
    getCurrentUserScoreSheets() {
      var query = this.search_query ? `&search=${this.search_query}` : "";
      this.$api
        .get(`scores?user=${this.$authStore.currentUser.id}${query}`)
        .then((res) => {
          this.proposals = res.data;
        });
    },
  },
};
</script>
<style lang=""></style>
