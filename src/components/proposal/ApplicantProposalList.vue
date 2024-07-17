<template lang="">
  <div>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />

        <q-breadcrumbs-el label="My Proposals" icon="note" />
      </q-breadcrumbs>
    </div>

    <q-separator spaced />
    <h2 class="flex justify-between text-h6 q-px-md">
      My Proposals
      <div class="flex">
        <q-input
          dense
          outlined
          v-model="search_query"
          type="text"
          label="Search"
          class="q-mr-sm"
          @input="getCurrentUserProposals()"
        />
        <create-proposal-dialog />
      </div>
    </h2>

    <q-list bordered class="q-ma-sm">
      <router-link
        :to="`proposals/${proposal.id}`"
        v-for="proposal in proposals"
        :key="proposal.id"
      >
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="" name="book" />
          </q-item-section>
          <q-item-section>{{ proposal.title }}</q-item-section>
          <q-chip
            color="secondary"
            class="glossy"
            dense
            :label="proposal.status"
          />
        </q-item>
      </router-link>
    </q-list>
    <q-inner-loading :showing="loading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>

    <div v-if="proposals.length == 0" align="center" style="margin-top: 10rem">
      <p>No proposals found</p>
    </div>

    <q-list bordered class="q-ma-sm" v-if="teamProposals.length">
      <router-link
        :to="`proposals/${proposal.id}`"
        v-for="proposal in teamProposals"
        :key="proposal.id"
      >
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="" name="book" />
          </q-item-section>
          <q-item-section>{{ proposal.title }}</q-item-section>
          <q-chip
            color="secondary"
            class="glossy"
            dense
            :label="proposal.status"
          />
        </q-item>
      </router-link>
    </q-list>
  </div>
</template>
<script>
import { protectFile } from "src/utils/helpers";

export default {
  name: "ApplicantProposalList",
  data() {
    return {
      loading: false,
      proposals: [],
      teamProposals: [],
      search_query: "",
    };
  },

  created() {
    protectFile(this.$options.name);
    if (this.$userHasAnyGroups(["applicant"])) {
      this.getCurrentUserProposals();
    }
  },

  methods: {
    getCurrentUserProposals() {
      this.loading = true;
      var query = this.search_query ? `&search=${this.search_query}` : "";
      this.$api
        .get(`proposals?user=${this.$authStore.currentUser.id}${query}`)
        .then((res) => {
          this.proposals = res.data;
          this.loading = false;
        });
    },
  },

  watch: {
    search_query(newVal) {
      this.getCurrentUserProposals();
    },
  },
};
</script>
<style lang=""></style>
