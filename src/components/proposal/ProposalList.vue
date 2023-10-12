<template lang="">
  <div>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />

        <q-breadcrumbs-el label="All Proposals" icon="note" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
    <h2 class="flex justify-between text-h6 q-px-md">
      All Proposals
      <div class="flex">
        <q-input
          dense
          outlined
          v-model="search_query"
          type="text"
          label="Search"
          class="q-mr-sm"
          @input="getProposals()"
        />
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
          <q-chip dense :label="proposal.status" />
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
    this.getProposals();
  },

  methods: {
    getProposals() {
      var query = this.search_query ? `?search=${this.search_query}` : "";
      this.$api.get(`proposals${query}`).then((res) => {
        this.proposals = res.data;
      });
    },
  },

  watch: {
    search_query(newVal) {
      this.getProposals();
    },
  },
};
</script>
<style lang=""></style>
