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
        <q-card
          v-if="$userHasAnyGroups(item.roles) || item.roles.length == 0"
          flat
          bordered
          :class="`text-center q-pa-md q-ma-xs text-${item.color}`"
          style="width: 200px"
        >
          <q-icon :name="item.icon" size="xl" />
          <q-card-section>
            <div class="text-h6">{{ item.name }}</div>
          </q-card-section>
        </q-card>
      </router-link>
    </div>

    <useful-docs />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
defineOptions({
  name: "HomePage",
  data() {
    return {
      showPopup: false,
      menuItems: ref([
        {
          name: "PENDING",
          route: "/proposals",
          icon: "description",
          color: "red",
          roles: ["grants_officer"],
          click: () => {
            this.$utilsStore.setStateData(
              "ProposalList_status_query",
              "PENDING"
            );
          },
        },

        {
          name: "REVIEWED",
          route: "/proposals",
          icon: "search",
          color: "red",
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
          route: "/proposals",
          icon: "check_circle_outline",
          color: "red",
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
          color: "red",
          roles: ["grants_officer"],
          click: () => {
            this.$utilsStore.setStateData(
              "ProposalList_status_query",
              "SELECTED"
            );
          },
        },

        {
          name: "My Proposals",
          route: "/applicant/proposals",
          icon: "search",
          color: "red",
          roles: ["applicant"],
        },
        {
          name: "Apply",
          route: "",
          icon: "app_registration",
          color: "red",
          roles: ["applicant"],
          click: () => {
            this.showPopup = true;
          },
        },

        {
          name: "Proposal Reviews",
          route: "/proposal-reviews",
          icon: "search",
          color: "red",
          roles: ["reviewer"],
        },
        // {
        //   name: "Account",
        //   route: "/account/profile",
        //   icon: "person",
        //   color: "secondary",
        //   roles: [],
        // },
      ]),
    };
  },
});
</script>
