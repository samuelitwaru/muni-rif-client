<template>
  <q-page>
    <create-proposal-dialog
      :showButton="false"
      :showPopup="showPopup"
      @showPopupChanged="this.showPopup = $event"
    />

    <div class="q-py-xl flex flex-center">
      <router-link
        :key="item.name"
        v-for="item in menuItems"
        :to="item.route"
        @click="item.click"
      >
        <q-btn
          v-if="$userHasAnyGroups(item.roles) || item.roles.length == 0"
          outlined
          :class="`text-center q-pa-md q-ma-sm text-${item.color}`"
          style="width: 200px; height: 150px"
        >
          <q-badge
            class="q-pa-sm justify-center"
            style="width: 30px"
            v-if="counts[item.name]"
            color="primary"
            floating
            rounded
            >{{ counts[item.name] }}</q-badge
          >
          <q-icon :name="item.icon" size="xl" />
          <q-card-section>
            <div class="text-h6">{{ item.name }}</div>
          </q-card-section>
        </q-btn>
      </router-link>
    </div>

    <useful-docs />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
defineOptions({
  name: "MainPage",

  data() {
    return {
      showPopup: false,
      menuItems: ref([
        {
          name: "SUBMISSIONS",
          route: "/go/proposals/submitted",
          icon: "description",
          color: "secondary",
          roles: ["grants_officer"],
          count: 0,
          click: () => {
            this.$utilsStore.setStateData(
              "ProposalList_status_query",
              "SUBMITTED"
            );
          },
        },

        {
          name: "REVIEWES",
          route: "/go/proposals/reviewed",
          icon: "search",
          color: "secondary",
          roles: ["grants_officer"],
          click: () => {
            this.$utilsStore.setStateData(
              "ProposalList_status_query",
              "REVIEWED"
            );
          },
        },

        {
          name: "SELECTED",
          route: "/go/proposals/selected",
          icon: "check_circle_outline",
          color: "secondary",
          roles: ["grants_officer"],
          click: () => {
            this.$utilsStore.setStateData(
              "ProposalList_status_query",
              "SELECTED"
            );
          },
        },

        {
          name: "THEMES",
          route: "/themes",
          icon: "apps",
          color: "secondary",
          roles: ["grants_officer"],
        },

        {
          name: "REVIEWERS",
          route: "/reviewers",
          icon: "people",
          color: "secondary",
          roles: ["grants_officer"],
        },

        {
          name: "APPLICANTS",
          route: "/applicants",
          icon: "people",
          color: "secondary",
          roles: ["grants_officer"],
        },

        {
          name: "MY PROPOSALS",
          route: "/applicant/proposals",
          icon: "search",
          color: "secondary",
          roles: ["applicant"],
        },
        {
          name: "Apply",
          route: "",
          icon: "app_registration",
          color: "secondary",
          roles: ["applicant"],
          click: () => {
            this.showPopup = true;
          },
        },

        {
          name: "Proposal Reviews",
          route: "/proposal-reviews",
          icon: "search",
          color: "secondary",
          roles: ["reviewer"],
        },
      ]),

      counts: {
        SELECTED: 0,
        SUBMISSIONS: 0,
      },
    };
  },

  created() {
    this.getCalls();
  },

  methods: {
    getCalls() {
      this.$api.get(`calls/`).then((res) => {
        this.calls = res.data;

        if (this.calls.length) {
          var lastCall = this.calls[0];
          this.setCurrentCall(this.$dataStore.currentCall || lastCall);
          this.getCounts();
        } else {
          this.setCurrentCall({ title: "No Call Found" });
        }
      });
    },

    setCurrentCall(call) {
      this.currentCall = call;
      this.$dataStore.setCall(this.currentCall);
    },

    getCounts() {
      this.$api
        .get(
          `proposals/count/?call=${this.$dataStore.currentCall.id}&is_selected=true`
        )
        .then((res) => {
          if ((res.status = 200)) {
            this.counts.SELECTED = res.data.count;
          }
        });
      this.$api
        .get(
          `proposals/count/?call=${this.$dataStore.currentCall.id}&status=SUBMITTED`
        )
        .then((res) => {
          if ((res.status = 200)) {
            this.counts.SUBMISSIONS = res.data.count;
          }
        });
    },
  },
});
</script>
