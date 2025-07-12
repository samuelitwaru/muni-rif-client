<template>
  <span v-if="currentCall">
    Call:
    <q-btn-dropdown
      v-if="currentUser && $userHasAnyGroups(['grants_officer'])"
      split
      :color="color"
      outline
      no-caps
      icon="folder"
      :label="currentCall.title"
      @click="this.$router.push(`/calls/${currentCall.id}`)"
    >
      <div v-if="$userHasAnyGroups(['grants_officer'])">
        <div v-if="calls.length">
          <q-list>
            <q-item
              v-for="call in calls"
              :key="call.id"
              :active="call.id == currentCall?.id"
              active-class="bg-primary text-white"
              clickable
              v-close-popup
              @click="changeCurrentCall(call)"
            >
              <q-item-section>
                <q-item-label class="flex justify-between items-center">{{ call.title }} <q-chip v-if="$dataStore.currentEntity.current_call == call.id" color="secondary" size="sm" class="gloss" label="Active" /></q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator spaced />
        </div>
        <q-list>
          <router-link to="/calls">
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label> See all calls ...</q-item-label>
              </q-item-section>
            </q-item>
          </router-link>
          <router-link to="/calls/create">
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label> Create New Call </q-item-label>
              </q-item-section>
            </q-item>
          </router-link>
        </q-list>
      </div>
    </q-btn-dropdown>
    <span v-else> > {{ currentCall.title }} </span>
  </span>
</template>

<script>
import { getCalls } from "src/utils/api";

export default {
  props: {
    color: {
      type: String,
      default: "primary",
    },
  },
  name: "CallMenu",
  data() {
    return {
      calls: [],
      currentCall: null,
      currentUser: this.$authStore.currentUser,
    };
  },
  computed: {
    otherCalls() {
      if (this.currentCall)
        return this.calls.filter((call) => call.id != this.currentCall.id);
      return [];
    },
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
    getCalls().then((res) => {
      this.calls = res;
      if (this.calls.length) {
        var lastCall = this.calls[0];
        setTimeout(() => {
          console.log('active call', this.$dataStore.currentEntity);
        }, 2000);
        this.setCurrentCall(this.$dataStore.currentCall || lastCall);
      } else {
        this.setCurrentCall({ title: "No Call Found" });
      }
    });
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    changeCurrentCall(call) {
      this.setCurrentCall(call);
      window.location = "/";
    },

    setCurrentCall(call) {
      this.currentCall = call;
      this.$dataStore.setCall(this.currentCall);
    },
  },
};
</script>
