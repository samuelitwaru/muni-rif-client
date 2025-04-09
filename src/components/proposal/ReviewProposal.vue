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
          <!-- Tab Navigation Buttons -->
          <div>
            <q-btn-toggle
              class="q-mt-xs"
              square
              style="border: 1px #dddddd solid"
              glossy
              padding="5px 30px"
              v-model="tab"
              color="white"
              text-color="black"
              toggle-text-color="white"
              unelevated
              bordered
              toggle-color="red"
              :options="[
                { label: 'Content', value: 'proposal' },
                { label: 'Guidelines', value: 'guidelines' },
                { label: 'Scores', value: 'scores' },
              ]"
            />
          </div>

          <!-- Section Content  -->
          <SectionView
            :proposal="proposal"
            :section="section"
            v-show="tab == 'proposal'"
          />

          <!-- Score Editor -->
          <score-editor
            v-show="tab == 'scores'"
            v-if="section.max_score > 0"
            :min="0"
            :max="section.max_score"
            :proposal="proposal"
            :section="section"
            :score="score"
          />

          <!-- Score View -->
          <ScoreView
            v-show="tab == 'scores' && score?.status == 'COMPLETED'"
            :section="section"
            :score="score"
          />
          <div v-show="tab == 'guidelines'" class="q-my-sm">
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

        <SectionView v-else :proposal="proposal" :section="section" />
      </div>
    </div>
    {{ scoresAreValid }}
    <hr id="solution" class="section-separator" />
  </div>
</template>
<script>
// import proposalattachments from "components/proposal/ProposalAttachments.vue";
// import BudgetItems from "components/proposal/BudgetItems.vue";
// import TeamMembers from "components/proposal/TeamMembers.vue";
import ProposalHeader from "components/proposal/ProposalHeader.vue";
import ScoreView from "components/proposal/ScoreView.vue";
import SectionView from "./SectionView.vue";
export default {
  name: "ReviewProposal",
  components: {
    // proposalattachments,
    // BudgetItems,
    // TeamMembers,
    ProposalHeader,
    ScoreView,
    SectionView,
  },
  data() {
    return {
      tab: "proposal",
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

  computed: {
    scoresAreValid() {
      if (this.score && this.sections) {
        console.log(this.score);
        for (let index = 0; index < this.sections.length; index++) {
          const section = this.sections[index];
          if (section.max_score > 0) {
            if (this.score[section.name] === null) {
              this.$bus.emit("score-updated", false);
              return false;
            }
          }
        }
      }
      this.$bus.emit("score-updated", true);
      return true;
    },
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
<style></style>
