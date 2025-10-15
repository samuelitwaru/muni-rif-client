<template lang>
  <div class="q-pa-sm">
    <div v-for="section in sections" :key="section.id">
      <hr :id="section.name" class="section-separator" />
      <div class="q-pa-sm">
        <q-toolbar-title class="flex justify-between">
          <div class="flex">
            {{ section.title }}
          </div>
        </q-toolbar-title>

        <q-card
          v-if="$proposalStore.currentProposal?.status == 'EDITING'"
          class="flex no-wrap q-pa-sm"
          flat
          bordered
        >
          <q-icon size="md" class="q-pr-sm" name="info_outline" />
          <div class="bg-grey-0">
            <small class="text-caption text-grey-8">
              {{ section.description }}</small
            >
          </div>
        </q-card>
        <div class="q-pt-sm">
          <div v-if="section.ref == '#summary_budget'">
            <budgeteditor />
          </div>
          <div v-else-if="section.ref == '#team'">
            <teameditor />
          </div>
          <div v-else-if="section.ref == '#attachments'">
            <attachmentseditor />
          </div>
          <div v-else>
            <sectioneditor2
              v-if="$proposalStore.currentProposal?.status == 'EDITING'"
              :proposal="proposal"
              :section="section"
              @proposal-updated="
                proposal = $event;
                $proposalStore.setProposal($event);
              "
            />
            <q-card v-else class="my-card" flat bordered>
              <q-card-section>
                <div v-html="proposal[section.name]"></div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <hr />
    <ExpenseReports />
    <ProposalReportsEditor />

    <hr id="solution" class="section-separator" />
  </div>
</template>
<script>
import budgeteditor from "components/proposal/BudgetEditor.vue";
import teameditor from "components/proposal/TeamEditor.vue";
import sectioneditor2 from "components/proposal/SectionEditor2.vue";
import attachmentseditor from "components/proposal/AttachmentsEditor.vue";
import ExpenseReports from "./ExpenseReports.vue";
import ProposalReportsEditor from "./ProposalReportsEditor.vue";

export default {
  components: { budgeteditor, teameditor, sectioneditor2, attachmentseditor, ExpenseReports, ProposalReportsEditor },
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
  scroll-behavior: auto;
}
</style>
