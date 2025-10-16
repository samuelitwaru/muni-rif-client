<template>
  <q-page>
    <create-proposal-dialog
      :showButton="false"
      :showPopup="showPopup"
      @showPopupChanged="this.showPopup = $event"
    />


    <div class="q-pt-xl flex flex-center">
      <DropdownCallMenu v-if="$userHasAnyGroups(['grants_officer'])" />
    </div>
    <div class="q-py-lg flex flex-center">

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
          style="width: 10rem; height: 10rem"
        >
          <q-badge style="position: absolute; top:4px; right:4px" v-if="counts[item.name]" :label="counts[item.name]" />
          <q-icon :name="item.icon" size="xl" />
          <q-card-section>
            <div class="text-h6">{{ item.display_name }}</div>
          </q-card-section>
        </q-btn>
      </router-link>
    </div>

    <useful-docs />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import DropdownCallMenu from "../call/DropdownCallMenu.vue";
defineOptions({
  name: "MainPage",
  components: {
    DropdownCallMenu,
  },

  data() {
    return {
      showPopup: false,
      menuItems: ref([
        {
          name: "PROPOSALS",
          display_name: "ALL PROPOSALS",
          route: "/go/proposals/submitted",
          icon: "description",
          color: "orange",
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
          name: "REVIEWED",
          display_name: "REVIEWED",
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
          display_name: "SELECTED",
          route: "/go/proposals/selected",
          icon: "check_circle_outline",
          color: "pink",
          roles: ["grants_officer"],
          click: () => {
            this.$utilsStore.setStateData(
              "ProposalList_status_query",
              "SELECTED"
            );
          },
        },



        {
          name: "CALLS",
          display_name: "CALLS",
          route: "/calls",
          icon: "campaign",
          color: "blue",
          roles: ["grants_officer"],
          count: 0,
        },




        {
          name: "THEMES",
          display_name: "THEMES",
          route: "/themes",
          icon: "apps",
          color: "indigo",
          roles: ["grants_officer"],
        },

        {
          name: "REVIEWERS",
          display_name: "REVIEWERS",
          route: "/reviewers",
          icon: "school",
          color: "green",
          roles: ["grants_officer"],
        },

        {
          name: "APPLICANTS",
          display_name: "APPLICANTS",
          route: "/applicants",
          icon: "people",
          color: "purple",
          roles: ["grants_officer"],
        },

        {
          name: "MY PROPOSALS",
          display_name: "MY PROPOSALS",
          route: "/applicant/proposals",
          icon: "description",
          color: "indigo",
          roles: ["applicant"],
        },

        {
          name: "APPLY",
          display_name: "APPLY",
          route: "",
          icon: "app_registration",
          color: "red",
          roles: ["applicant"],
          click: () => {
            this.showPopup = true;
          },
        },

        {
          name: "PROPOSAL REVIEWS",
          display_name: "PROPOSAL REVIEWS",
          route: "/proposal-reviews",
          icon: "reviews",
          color: "green",
          roles: ["reviewer"],
        },
      ]),

      counts: {
        SELECTED: 0,
        PROPOSALS: 0,
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
            this.counts.PROPOSALS = res.data.count;
          }
        });
      this.$api
        .get(
          `proposals/count/?call=${this.$dataStore.currentCall.id}&status=REVIEWED`
        )
        .then((res) => {
          if ((res.status = 200)) {
            this.counts.REVIEWED = res.data.count;
          }
        });
    },
  },
});
</script>
