<template>
  <span v-if="currentCall">
    <!-- Call: -->
    <q-btn-dropdown
      v-if="currentUser && $userHasAnyGroups(['grants_officer'])"
      split
      :color="color"
      outline
      no-caps
      icon="folder"
      :label="currentCall.title"
      @click="this.$router.push(`/calls/`)"
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
                <q-item-label class="flex justify-between items-center">{{ call.title }} <q-chip v-if="activeCall?.id == call.id" color="secondary" size="sm" class="gloss" label="Active" /></q-item-label>
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
  </span>
</template>

<script>

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
    activeCall(){
      return this.calls.find(call=>call.id==this.entity.current_call)
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
    this.getEntity()
  },
  methods: {
    async getEntity() {
      const res = await this.$api.get(`entities/`);
      this.entity = res.data[0];
      this.$dataStore.setEntity(this.entity);
      this.getCalls();
    },
    getCalls() {
      this.$api.get('calls/').then(res=>{
        this.calls = res.data;
        if (this.calls.length) {
          var activeCall = this.getActiveCall()
          console.log('current call: ', this.$dataStore.currentCall.title)
          this.setCurrentCall(this.$dataStore.currentCall || activeCall);
        } else {
          this.setCurrentCall({ title: "No Call Found" });
        }
      })
    },
    getActiveCall(){
      return this.calls.find(call=>call.id==this.entity.current_call)
    },
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
