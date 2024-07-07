<template lang="">
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
          <div v-if="section.ref == '#detailed_budget'">
            <BudgetEditor />
          </div>
          <div v-else-if="section.ref == '#team'">
            <TeamEditor />
          </div>
          <div v-else-if="section.ref == '#attachments'">
            <AttachmentsEditor />
          </div>
          <div v-else>
            <SectionEditor2
              :proposal="proposal"
              :section="section"
              @proposal-updated="
                proposal = $event;
                $proposalStore.setProposal($event);
              "
            />
            <q-card class="my-card" flat bordered>
              <q-card-section>
                <div v-html="proposal[section.name]"></div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <hr id="solution" class="section-separator" />
  </div>
</template>
<script>
import BudgetEditor from "components/proposal/BudgetEditor.vue";
import TeamEditor from "components/proposal/TeamEditor.vue";
import SectionEditor2 from "components/proposal/SectionEditor2.vue";
import AttachmentsEditor from "components/proposal/AttachmentsEditor.vue";

export default {
  components: { BudgetEditor, TeamEditor, SectionEditor2, AttachmentsEditor },
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

.section-separator {
  margin-bottom: 2.5rem;
  border: none; /* Remove the default border */
  height: 0.1px; /* Set height */
  background-color: #dddddd;
}
</style>
