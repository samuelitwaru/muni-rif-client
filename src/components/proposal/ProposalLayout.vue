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
        <router-link to="/proposals">
          <q-btn
            class="q-mx-sm"
            block
            color="primary"
            flat
            icon="arrow_back"
            label="All Proposals"
          />
        </router-link>
      </q-card>
      <q-separator />
      <q-list>
        <a
          v-for="(section, index) in sections"
          :key="section.id"
          :href="`/proposals/${$route.params.proposal_id}${section.ref}`"
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

    <!-- <q-footer elevated>
      <q-toolbar class="bg-white text-dark flex justify-between">
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
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { protectFile } from "src/utils/helpers";

export default defineComponent({
  name: "ProposalLayout",

  data() {
    return {
      leftDrawerOpen: false,
      proposal: {},
      proposalFiles: [],
      score: {},
      sections: [],
    };
  },

  created() {
    protectFile(this.$options.__file);
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
