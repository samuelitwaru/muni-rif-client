<template lang>
  <div>
    <div v-for="section in sections" :key="section.id">
      <hr :id="section.name" class="section-separator" />
      <div class="q-pa-sm">
        <q-toolbar-title class="flex justify-between">
          <div class="flex">
            {{ section.title }}
          </div>
        </q-toolbar-title>

        <div v-if="section.name == 'attachments'">
          <ProposalAttachments />
        </div>

        <div v-else-if="section.name == 'team'">
          <TeamMembers />
        </div>

        <div v-else-if="section.name == 'summary_budget'">
          <BudgetItems />
        </div>

        <q-card v-else flat bordered class="q-pa-sm">
          <div>
            <div
              style="overflow: auto; min-height: 5rem"
              v-html="proposal?.[section['name']] || ''"
            ></div>
          </div>
        </q-card>
      </div>
    </div>
    <hr />
    <ProposalScoreSheets />
    <ExpenseReports />
    <ProposalReportsEditor />
    <hr id="solution" class="section-separator" />
  </div>
</template>
<script>
import ProposalAttachments from "components/proposal/ProposalAttachments.vue";
import TeamMembers from "components/proposal/TeamMembers.vue";
import BudgetItems from "components/proposal/BudgetItems.vue";
import ExpenseReports from "./ExpenseReports.vue";
import ProposalScoreSheets from "./ProposalScoreSheets.vue";
import ProposalReportsEditor from "./ProposalReportsEditor.vue";
export default {
  components: { ProposalAttachments, TeamMembers, BudgetItems, ExpenseReports, ProposalScoreSheets, ProposalReportsEditor },
  data() {
    return {
      sections: [],
      proposal: {},
      score: null,
      content: `
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
        natus animi, et itaque ea tempora, exercitationem nemo nobis eos quos
        corrupti quasi cupiditate recusandae magnam, quis dicta facere dolore
        blanditiis.
      </p>`,
      attachments: [],
    };
  },

  created() {
    this.getProposal();
    this.getSections();
  },

  methods: {
    getProposal() {
      this.$api
        .get(`proposals/${this.$route.params.proposal_id}/`)
        .then((res) => {
          this.proposal = res.data;
          this.$proposalStore.setProposal(this.proposal);
          this.getScore();
          this.getAttachments();
        });
    },

    getAttachments() {
      this.$api.get(`attachments/`).then((res) => {
        this.attachments = res.data;
        this.getFiles();
      });
    },

    getFiles() {
      for (let index = 0; index < this.attachments.length; index++) {
        const attachment = this.attachments[index];
        this.$api
          .get(
            `files/?proposal_id=${this.$route.params.proposal_id}&attachment_id=${attachment.id}`
          )
          .then((res) => {
            var files = res.data;
            this.attachments.filter((att) => att.id == attachment.id)[0].files =
              files;
          });
      }
    },

    getScore() {
      console.log(this.$authStore.currentUser?.id || 0);
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

    getSections() {
      this.$api.get(`sections/`).then((res) => {
        this.sections = res.data;
      });
    },
  },
};
</script>
<style>
body,
html {
  /* scroll-behavior: smooth; */
}
</style>
