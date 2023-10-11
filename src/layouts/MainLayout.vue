<template>
  <q-layout view="lHh Lpr lFf">
    <loading-component />
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>MuniRIF</q-toolbar-title>

        <div class="text-orange-3 q-px-xs">
          <router-link to="/account/profile">
            <q-chip
              class="glossy"
              icon="person"
              :label="$authStore.currentUser.username"
            />
          </router-link>
          <!-- {{ $getState("user")?.name }} -->
        </div>
        <user-logout />
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-grey-2"
      show-if-above
      bordered
      :width="220"
    >
      <user-menu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      leftDrawerOpen: false,
    };
  },

  created() {
    if (!this.$authStore.currentUser) {
      location.href = "index/account/signin";
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },

    logout() {
      this.$utilsStore.setLoading(true);
      this.$api.get(`/accounts/logout/`).then((res) => {
        this.$authStore.clearUserAndToken();
        this.$router.push("/login");
        // location.href = "/login";
        this.$utilsStore.setLoading(false);
      });
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
