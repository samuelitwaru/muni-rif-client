<template>
  <q-layout view="lHh Lpr lFf">
    <loading-component />
    <q-header elevated>
      <q-toolbar class="bg-white text-dark">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="flex justify-between">
          <div>
            {{ $proposalStore.currentProposal?.title }}

            <q-chip
              color="secondary"
              class="text-white"
              size="md"
              :label="$proposalStore.currentProposal?.status"
            />
          </div>

          <submit-proposal
            :proposal="$proposalStore.currentProposal"
            v-if="$proposalStore.currentProposal?.status == 'EDITING'"
          />
        </q-toolbar-title>
        <div class="flex">
          <q-btn
            v-if="$proposalStore.currentProposal?.status != 'EDITING'"
            color="primary"
            icon="download"
            dense
            label="download"
            @click="downloadProposal"
          />
          <proposal-options />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-grey-2"
      show-if-above
      bordered
      :width="220"
    >
      <q-card flat class="q-py-sm">
        <router-link to="/proposal-reviews">
          <q-btn
            class="q-mx-sm"
            block
            color="primary"
            flat
            icon="arrow_back"
            label="Proposal Reviews"
          />
        </router-link>
      </q-card>
      <q-separator />
      <q-list>
        <a
          v-for="(section, index) in sections"
          :key="section.id"
          :href="`/proposal-reviews/${$route.params.proposal_id}${section.ref}`"
        >
          <q-item clickable v-ripple>
            <div class="q-px-sm border q-my-auto q-mr-sm">
              {{ index + 1 }}
            </div>
            <q-item-section>{{ section.title }}</q-item-section>
          </q-item>
          <q-separator />
        </a>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
      <div align="center" class="q-mb-xl">
        <score-sheet />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { protectFile } from "src/utils/helpers";
export default defineComponent({
  name: "ReviewProposalLayout",

  data() {
    return {
      leftDrawerOpen: false,
      proposalFiles: [],
      score: {},
      sections: [
        { id: "#problem", name: "The Problem" },
        { id: "#solution", name: "Proposed Solution" },
        { id: "#outputs", name: "Outputs, Outcomes and Impact" },
        { id: "#team", name: "Team Composition" },
        {
          id: "#capacity_development",
          name: "Provision for Capacity Development",
        },
        {
          id: "#scalability",
          name: "Dissemination, Scalabilty and Sustainability",
        },
        {
          id: "#ethical_implications",
          name: "Ethical Implications and Enviromental Impact",
        },
        { id: "#conflict_of_interest", name: "Conflict of Interest" },
        { id: "#summary_budget", name: "Summary Budget" },
        { id: "#summary_budget", name: "Detailed Budget" },
        { id: "#workplan", name: "Workplan" },
      ],
    };
  },

  created() {
    protectFile(this.$options.name);
    this.getProposal();
  },

  methods: {
    getProposal() {
      this.$utilsStore.setLoading(true);
      this.$api
        .get(`proposals/${this.$route.params.proposal_id}/`)
        .then((res) => {
          this.proposal = res.data;
          this.$proposalStore.setProposal(this.proposal);
          this.getProposalFiles();
          this.getSections();
          this.getScore();
          this.$utilsStore.setLoading(false);
        });
    },
    getProposalFiles() {
      this.$api
        .get(`files/?proposal_id=${this.$route.params.proposal_id}`)
        .then((res) => {
          this.proposalFiles = res.data;
        });
    },

    getScore() {
      this.$api
        .get(
          `scores/?user=${this.$authStore.currentUser?.id || 0}&proposal=${
            this.$route.params.proposal_id
          }`
        )
        .then((res) => {
          if (res.data.length == 1) {
            this.score = res.data[0];
          }
        });
    },

    deleteFile(fileId) {
      if (confirm("Delete this File?")) {
        this.$api.delete(`files/${fileId}/`).then((res) => {
          this.getProposalFiles();
        });
      }
    },

    getSections() {
      this.$api.get(`sections/`).then((res) => {
        this.sections = res.data;
      });
    },

    downloadProposal() {
      this.$api
        .get(`proposals/${this.$route.params.proposal_id}/pdf/download/`)
        .then((res) => {
          if (res.status == 200) {
            window.open(res.data.file_url, "_blank");
          }
        });
    },

    openFile(fileURL) {
      window.open(fileURL);
    },
  },
});
</script>

<style>
a {
  text-decoration: none;
}
</style>
