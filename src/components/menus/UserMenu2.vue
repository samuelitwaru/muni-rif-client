<template>
  <div class="flex justify-ceter">
    <div v-for="item in menuItems" :key="item" class="q-ma-sm">
      <router-link :to="item.route">
        <q-btn padding="lg" color="primary" outline :icon="item.icon" />
        <div class="text-center">
          <label>{{ item.name }}</label>
        </div>
      </router-link>
    </div>
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
            name: "My Proposals",
            icon: "note",
            route: "/applicant/proposals",
          },
          { name: "Profile", icon: "person", route: "/account/profile" },
        ];
      } else if (this.$userHasAnyGroups(["reviewer"])) {
        return [
          {
            name: "Reviews",
            icon: "note",
            route: "/proposal-reviews",
          },
          { name: "Profile", icon: "person", route: "/account/profile" },
        ];
      } else if (this.$userHasAnyGroups(["grants_officer"])) {
        return [
          { name: "All Proposals", icon: "note", route: "/proposals" },
          { name: "Profile", icon: "person", route: "/account/profile" },
        ];
      }
      return [];
    },
  },

  created() {
    console.log(this.$authStore.currentUser);
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
