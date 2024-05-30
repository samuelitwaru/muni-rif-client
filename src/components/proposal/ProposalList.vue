<template lang>
  <div>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />

        <q-breadcrumbs-el label="Proposals" icon="note" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
    <h2 class="flex justify-between items-center text-h6 q-px-sm">
      Proposals
      <div class="flex">
        <q-btn-toggle
          flat
          v-model="status_query"
          @update:model-value="getProposals"
          toggle-color="primary"
          :options="[
            { label: 'All', value: null },
            { label: 'Submitted', value: 'SUBMITTED' },
            { label: 'Reviewing', value: 'SCORING' },
            { label: 'Reviewed', value: 'REVIEWED' },
          ]"
          class="q-mx-sm">
        </q-btn-toggle>
        <q-input
          dense
          outlined
          v-model="search_query"
          type="text"
          label="Search"
          class="q-mr-sm"
          @input="getProposals()" />
      </div>
    </h2>

    <q-list bordered class="q-ma-sm">
      <q-item
        class="flex justify-between items-center"
        v-for="proposal in proposals"
        :key="proposal.id">
        <q-item-section avatar>
          <q-icon color name="book" />
        </q-item-section>
        <q-item-section>
          <router-link :to="`proposals/${proposal.id}`">
            {{ proposal.title }}
          </router-link>
        </q-item-section>
        <div>
          <q-btn
            color="primary"
            dense
            outline
            label="Go To Reviews"
            @click="$router.push(`/proposals/${proposal.id}/reviewers`)" />

          <q-btn
            color="secondary"
            class="q-mx-sm"
            dense
            outline
            icon='people'
            label="Team Members"
            @click="$router.push(`/proposals/${proposal.id}/team`)" />
        </div>
        <div style="width: 100px">
          <q-chip
            color="secondary"
            class="text-center"
            dense
            :label="proposal.status" />
        </div>
      </q-item>
    </q-list>
    <q-inner-loading :showing="loading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>

    <div v-if="proposals.length == 0" align="center" style="margin-top: 10rem">
      <p>No proposals found</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stateData: this.$utilsStore.getStateData(),
      loading: false,
      proposals: [],
      search_query: "",
      status_query: null,
    };
  },

  created() {
    this.status_query = this.stateData.ProposalList_status_query
    this.getProposals();
  },

  methods: {
    getProposals() {
      this.loading = true;
      var args = {
        exclude__status: "EDITING"
      };
      // var query = this.search_query ? `?search=${this.search_query}` : "";
      if (this.search_query.length) args.search = this.search_query;
      if (this.status_query) args.status = this.status_query;
      var queryString = this.$buildURLQuery(args);
      this.$api.get(`proposals?${queryString}`).then((res) => {
        this.proposals = res.data;
        this.loading = false;
      });
    },
  },

  watch: {
    search_query(newVal) {
      this.getProposals();
    },
    status_query(newVal) {
      this.$utilsStore.setStateData('ProposalList_status_query', newVal);
    },
  },
};
</script>
<style lang></style>
