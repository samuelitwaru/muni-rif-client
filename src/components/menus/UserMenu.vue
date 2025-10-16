<template>
  <div>
    <div>
      <q-list>
        <q-item
          v-for="item in menuItems.filter(item=>$userHasAnyGroups(item.roles) || item.roles.length == 0)"
          :key="item.name"
          :active="isMenuActive(item)"
          active-class="bg-primary text-white"
          clickable
          v-close-popup
          @click="routeTo(item)"
          :title="item.name"
        >
          <q-item-section>
            <q-item-label class="row justify-between items-center">
              <div class="row items-center">
                <q-icon :name="item.icon" size="xs" />
                <span class="q-pa-sm"> {{ item.display_name }}</span>
              </div>
              <q-badge v-if="counts[item.name]" :label="counts[item.name]" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <!-- <q-separator spaced /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false,
      menuItems: [
        {
          name: "HOME",
          display_name: "HOME",
          route: "/",
          icon: "home",
          color: "secondary",
          roles: [],
        },
        {
          name: "PROPOSALS",
          display_name: "ALL PROPOSALS",
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
          name: "CALLS",
          display_name: "CALLS",
          route: "/calls",
          icon: "campaign",
          color: "secondary",
          roles: ["grants_officer"],
          count: 0,
        },




        {
          name: "THEMES",
          display_name: "THEMES",
          route: "/themes",
          icon: "apps",
          color: "secondary",
          roles: ["grants_officer"],
        },

        {
          name: "REVIEWERS",
          display_name: "REVIEWERS",
          route: "/reviewers",
          icon: "school",
          color: "secondary",
          roles: ["grants_officer"],
        },

        {
          name: "APPLICANTS",
          display_name: "APPLICANTS",
          route: "/applicants",
          icon: "people",
          color: "secondary",
          roles: ["grants_officer"],
        },

        {
          name: "MY PROPOSALS",
          display_name: "MY PROPOSALS",
          route: "/applicant/proposals",
          icon: "search",
          color: "secondary",
          roles: ["applicant"],
        },

        {
          name: "PROPOSAL REVIEWS",
          display_name: "PROPOSAL REVIEWS",
          route: "/proposal-reviews",
          icon: "reviews",
          color: "secondary",
          roles: ["reviewer"],
        },
      ],

      counts: {
        SELECTED: 0,
        PROPOSALS: 0,
      },
    };
  },

  created() {
    this.getCalls();
    this.$bus.on('proposal-selected', (data)=>{
      this.getCounts()
    })
  },

  methods: {
    getCalls() {
      this.$api.get(`calls/`).then((res) => {
        this.items = res.data;

        if (this.items.length) {
          var lastCall = this.items[0];
          this.setCurrentCall(this.$dataStore.currentCall || lastCall);
          this.getCounts();
        } else {
          this.setCurrentCall({ title: "No Call Found" });
        }
      });
    },

    setCurrentCall(item) {
      this.currentCall = item;
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

    isMenuActive(item){
      if (item.name == "HOME") {
        return this.$route.path == "/"
      }else{
        return this.$route.path.startsWith(item.route)
      }
    },

    routeTo(item) {
      if (item.click) item.click();
      this.$router.push(item.route);
    },
  },
};
</script>
