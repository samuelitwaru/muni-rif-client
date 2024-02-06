<template lang="">
  <div>
    <q-btn-dropdown flat dense dropdown-icon="more_vert">
      <q-list class="q-py-sm">
        <router-link v-for="item in menuItems" :key="item" :to="item.route">
          <q-item dense clickable v-close-popup>
            <q-item-section>
              <q-item-label>
                <q-icon :name="item.icon" />
                {{ item.name }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // menuItems: [
      //   { name: "My Proposals", icon: "arrow_right", route: "/proposals" },
      //   { name: "Profile", icon: "arrow_right", route: "/account/profile" },
      //   { name: "Team", icon: "arrow_right", route: "" },
      // ],
    };
  },
  computed: {
    menuItems() {
      if (this.$userHasAnyGroups(["applicant"])) {
        return [
          {
            name: "REVIEWS",
            icon: "list",
            route: `/applicant/proposals/${this.$proposalStore.currentProposal.id}/reviews`,
          },
          {
            name: "TEAM",
            icon: "people",
            route: `/applicant/proposals/${this.$proposalStore.currentProposal.id}/team`,
          },
        ];
      } else if (this.$userHasAnyGroups(["reviewer"])) {
        return [
          {
            name: "REVIEWS",
            icon: "list",
            route: `/proposal-reviews/${this.$proposalStore.currentProposal.id}/reviews`,
          },
          {
            name: "TEAM",
            icon: "people",
            route: `/proposal-reviews/${this.$proposalStore.currentProposal.id}/team`,
          },
        ];
      } else if (this.$userHasAnyGroups(["grants_officer"])) {
        return [
          {
            name: "REVIEWS",
            icon: "list",
            route: `/proposals/${this.$proposalStore.currentProposal.id}/reviewers`,
          },
          {
            name: "TEAM",
            icon: "people",
            route: `/proposals/${this.$proposalStore.currentProposal.id}/team`,
          },
        ];
      }
      return [];
    },
  },

  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style lang=""></style>
