<template>
  <q-layout view="lHh Lpr lFf" v-if="$proposalStore.currentProposal">
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
          <q-btn
            v-if="$proposalStore.currentProposal?.status != 'EDITING'"
            color="primary"
            icon="download"
            dense
            label="download"
            @click="downloadProposal"
          />
          <!-- <proposal-options /> -->
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
        <router-link to="/go/proposals/submitted">
          <q-btn
            class="q-mx-sm"
            block
            color="primary"
            flat
            icon="arrow_back"
            label="Back"
          />
        </router-link>
      </q-card>
      <q-list>
        <span
          v-for="(section, index) in sections"
          :key="section.id"
          :href="`/proposals/${$route.params.proposal_id}${section.ref}`"
        >
          <q-item clickable v-ripple @click="scrollInToView(section.name)">
            <div class="q-px-sm border q-my-auto q-mr-sm">
              {{ index + 1 }}
            </div>
            <q-item-section>{{ section.title }}</q-item-section>
          </q-item>
          <q-separator />
        </span>
      </q-list>

      <q-list>
        <span
          v-for="item in menuItems"
          :key="item.name"
        >
          <q-item class="row q-gutter-x-sm justify-center items-center" clickable v-ripple @click=scrollInToView(item.name)>
            <q-icon :name="item.icon" size="1.5rem" />
            <q-item-section>
            {{ item.label }}
            </q-item-section>
          </q-item>
          <q-separator />
        </span>
      </q-list>
    </q-drawer>

    <q-page-container>
      <ProposalHeader />
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { protectFile } from "src/utils/helpers";
import ProposalHeader from "components/proposal/ProposalHeader.vue";
import { scroll } from "quasar";
export default defineComponent({
  components: { ProposalHeader },
  name: "ProposalLayout",

  data() {
    return {
      leftDrawerOpen: false,
      proposal: {},
      proposalFiles: [],
      score: {},
      sections: [],
      menuItems: [
        {icon: "reviews", label: "Reviews", name: "reviews", link: "#reviews"},
        {icon: "assignment", label: "Reports", name: "reports", link: "#reports"},
      ]
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

    scrollInToView(section_name) {
      // alert(section_name)
      document.getElementById(section_name).scrollIntoView({
        behavior: 'smooth',   // enables smooth scrolling
        block: 'start',      // align in the middle (you can use 'start', 'center', 'end', or 'nearest')
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
