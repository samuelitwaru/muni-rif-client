<template lang="">
  <div>
    <h2 class="flex justify-between text-h6 q-px-md">
      Proposals
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

    <q-list bordered>
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
          <q-chip class="glossy" dense :label="proposal.status" />
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
    if (this.$userHasAnyGroups(["applicant"])) {
      this.getCurrentUserProposals();
    }
  },

  methods: {
    getCurrentUserProposals() {
      // this.$utilsStore.setLoading(true);
      var query = this.search_query ? `&search=${this.search_query}` : "";
      this.$api
        .get(`proposals?user=${this.$authStore.currentUser.id}${query}`)
        .then((res) => {
          this.proposals = res.data;
          // this.$utilsStore.setLoading(false);
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
