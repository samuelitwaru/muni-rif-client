<template>
  <q-layout view="hHh Lpr lFf">
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

        <q-toolbar-title> MuniRIF </q-toolbar-title>

        <div class="text-orange-3 q-px-xs">
          <router-link to="/account/profile">
            <q-chip
              class="glossy"
              icon="person"
              :label="`${$authStore.currentUser?.first_name} ${$authStore.currentUser?.last_name}`"
            />
          </router-link>
          <!-- {{ $getState("user")?.name }} -->
        </div>
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="bg-grey-2" bordered :width="220">
      <q-img
        src="~assets/logo.jpeg"
        spinner-color="primary"
        spinner-size="72px"
      />
      <!-- <div>
        <router-link to="/" block>
          <q-btn color="black" class="full-width" align="left" icon="home" flat>
            <span class="q-px-md">Home</span>
          </q-btn>
        </router-link>
      </div> -->
      <CallMenu />
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { getCalls } from "src/utils/api";
import CallMenu from "src/components/call/CallMenu.vue";

export default {
  name: "MainLayout",
  components: { CallMenu },
  data() {
    return {
      leftDrawerOpen: false,
      calls: [],
      currentCall: null,
    };
  },

  computed: {
    otherCalls() {
      if (this.currentCall)
        return this.calls.filter((call) => call.id != this.currentCall.id);
      return [];
    },
  },

  created() {
    if (!this.$authStore.currentUser) {
      location.href = "/index/account/signin";
    }
    this.getCalls();
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },

    getCalls() {
      getCalls().then((res) => {
        this.calls = res;
        if (this.calls.length) {
          var lastCall = this.calls[0];
          this.setCurrentCall(this.$dataStore.currentCall || lastCall);
        } else {
          this.setCurrentCall({ title: "No Call Found" });
        }
      });
    },

    changeCurrentCall(call) {
      this.setCurrentCall(call);
      window.location.reload();
    },

    setCurrentCall(call) {
      this.currentCall = call;
      this.$dataStore.setCall(this.currentCall);
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
