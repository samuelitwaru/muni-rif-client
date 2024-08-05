<template lang>
  <div>
    <accept-review :proposal="proposal" :score="score" />

    <ProposalHeader />

    <div v-for="section in sections" :key="section.id">
      <hr :id="section.name" class="section-separator" />
      <div class="q-pa-sm">
        <q-toolbar-title class="flex justify-between">
          <div class="flex">
            {{ section.title }}
          </div>
        </q-toolbar-title>
        <div v-if="section.max_score > 0">
          <q-btn-toggle
            class="q-mt-xs"
            square
            style="border: 1px #dddddd solid"
            glossy
            padding="5px 30px"
            v-model="section.view"
            color="white"
            text-color="black"
            toggle-text-color="white"
            unelevated
            bordered
            toggle-color="red"
            :options="[
              { label: 'Proposal', value: 'proposal' },
              { label: 'Guidelines', value: 'guidelines' },
              { label: 'Scores', value: 'scores' },
            ]"
          />
        </div>
        <div v-show="section.view == 'proposal'">
          <proposalattachments v-if="section.name == 'attachments'" />
          <BudgetItems v-else-if="section.name == 'summary_budget'" />
          <TeamMembers v-else-if="section.name == 'team'" />
          <div v-else>
            <q-card flat bordered class="q-pa-sm q-my-sm">
              <div
                style="overflow: auto; min-height: 5rem"
                v-html="proposal?.[section['name']] || ''"
              ></div>
            </q-card>
          </div>
        </div>
        <score-editor
          v-show="section.view == 'scores'"
          :min="0"
          :max="section.max_score"
          :proposal="proposal"
          :section="section"
          :score="score"
        />
        <ScoreView
          v-show="section.view == 'scores'"
          :section="section"
          :score="score"
        />
        <div
          v-show="section.view == 'guidelines' && score.status == 'COMPLETED'"
          class="q-my-sm"
        >
          <q-card class="flex no-wrap q-pa-sm" flat bordered>
            <q-icon size="md" class="q-pr-sm" name="info_outline" />
            <div class="bg-grey-0">
              <small class="text-caption text-grey-8">
                {{ section.description }}</small
              >
            </div>
          </q-card>
        </div>
      </div>
    </div>

    <hr id="solution" class="section-separator" />
  </div>
</template>
<script>
import proposalattachments from "components/proposal/ProposalAttachments.vue";
import BudgetItems from "components/proposal/BudgetItems.vue";
import TeamMembers from "components/proposal/TeamMembers.vue";
import ProposalHeader from "components/proposal/ProposalHeader.vue";
import ScoreView from "components/proposal/ScoreView.vue";
export default {
  name: "ReviewProposal",
  components: {
    proposalattachments,
    BudgetItems,
    TeamMembers,
    ProposalHeader,
    ScoreView,
  },
  data() {
    return {
      tab: "content",
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
        this.sections = res.data.map((section) => {
          section.view = "proposal";
          return section;
        });
      });
    },
  },
};
</script>
<style></style>
