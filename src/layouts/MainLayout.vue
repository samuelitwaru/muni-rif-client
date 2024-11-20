<template>
  <q-layout view="hHh Lpr lFf" v-if="currentCall">
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

        <q-toolbar-title>
          Muni RIF

          <DropdownCallMenu v-if="$userHasAnyGroups(['grants_officer'])" />
          <span v-else>
            <q-icon name="arrow_right" size="md" />
            {{ this.currentCall.title }}</span
          >
        </q-toolbar-title>

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
import DropdownCallMenu from "src/components/call/DropdownCallMenu.vue";

export default {
  name: "MainLayout",
  components: { CallMenu, DropdownCallMenu },
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
          if (this.$userHasAnyGroups(["applicant", "reviewer"])) {
            var activeCall = this.calls.find((call) => call.is_active);
            if (activeCall) {
              this.setCurrentCall(activeCall || { title: "No Call Found" });
            } else {
              this.$router.push("/no-call-found");
            }
          } else {
            var lastCall = this.calls[0];
            this.setCurrentCall(this.$dataStore.currentCall || lastCall);
          }
        } else {
          this.setCurrentCall({ title: "No Call Found" });
          if (this.$userHasAnyGroups(["grants_officer"])) {
            this.$router.push("/calls");
          } else {
            this.$router.push("/no-call-found");
          }
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
