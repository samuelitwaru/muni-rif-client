<template>
  <q-card class="my-card q-pa-sm" flat bordered>
    <div class="flex justify-cente">
      <div v-for="item in menuItems" :key="item" class="q-m-sm text-center">
        <router-link :to="item.route">
          <q-btn color="primary" flat outline>
            <q-icon :name="item.icon" />
            <!-- <div> -->
            <label class="q-pl-sm">{{ item.name.toUpperCase() }}</label>
            <!-- </div> -->
          </q-btn>
        </router-link>
      </div>
    </div>
  </q-card>
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

  created() {},
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
