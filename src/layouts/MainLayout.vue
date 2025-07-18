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

          <DropdownCallMenu color="" v-if="$userHasAnyGroups(['grants_officer'])" />
          <span v-else>
            <q-icon name="arrow_right" size="md" />
            {{ this.currentCall.title }}</span
          >
        </q-toolbar-title>

        <div class="text-orange-3 q-px-xs">
          <q-btn-dropdown
            split
            color="grey-2"
            text-color="black"
            rounded
            icon="person"
            to="/account/profile"
            :label="`${$authStore.currentUser?.first_name} ${$authStore.currentUser?.last_name}`"
          >
            <q-list>
              <q-item clickable v-close-popup to="/account/profile">
                <q-item-section side>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Profile</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="logout">
                <q-item-section side>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="bg-grey-2" bordered :width="220">
      <q-img
        src="~assets/logo.jpeg"
        spinner-color="primary"
        spinner-size="72px"
      />
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
    this.getEntity();
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },

    async getEntity() {
      const res = await this.$api.get(`entities/`);
      this.entity = res.data[0];
      this.$dataStore.setEntity(this.entity);
      console.log("entity", this.entity);
      this.getCalls();
    },

    getCalls() {
      getCalls().then((res) => {
        this.calls = res;
        if (this.calls.length) {
          if (this.$userHasAnyGroups(["applicant", "reviewer"])) {
            var activeCall = this.calls.find(
              (call) => call.id == this.entity.current_call
            );
            console.log("ac", activeCall);
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
        this.$router.push("/index/account/signin");
        this.$authStore.clearUserAndToken();
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
