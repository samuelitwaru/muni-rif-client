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
          <score-sheet />
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
          :href="`/proposal-reviews/${$route.params.id}${section.ref}`"
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
    </q-page-container>

    <q-footer elevated>
      <q-toolbar class="bg-white text-dark flex justify-between">
        <!-- <q-toolbar-title> -->
        <div>Attachments</div>
        <div>
          <q-chip
            v-for="file in proposalFiles"
            :key="file.id"
            class="glossy"
            icon="attachment"
            :label="file.name"
            :removable="
              $userHasAnyGroups(['applicant']) &&
              $authStore.currentUser.id == $proposalStore.currentProposal.user
            "
            clickable
            @remove="deleteFile(file.id)"
            @click="openFile(file.file)"
          />
        </div>
        <proposal-file-attachment @file-uploaded="getProposalFiles" />
        <!-- </q-toolbar-title> -->
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ProposalLayout",

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
        { id: "#detailed_budget", name: "Detailed Budget" },
        { id: "#workplan", name: "Workplan" },
      ],
    };
  },

  created() {
    this.getProposalFiles();
    this.getSections();
    this.getScore();
  },

  methods: {
    getProposalFiles() {
      this.$api
        .get(`files/?proposal_id=${this.$route.params.id}`)
        .then((res) => {
          this.proposalFiles = res.data;
        });
    },

    getScore() {
      this.$api
        .get(
          `scores/?user=${this.$authStore.currentUser?.id || 0}&proposal=${
            this.$route.params.id
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
