<template>
  <div>
    <q-list>
      <div v-for="item in menuItems" :key="item.name">
        <router-link :to="item.route" block>
          <q-btn
            color="black"
            class="full-width"
            align="left"
            :icon="item.icon"
            flat
          >
            <span class="q-px-md">{{ item.name }}</span>
          </q-btn>
        </router-link>
      </div>
    </q-list>
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

  created() {},
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
