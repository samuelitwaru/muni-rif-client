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
        <div class="row q-col-gutter-xs">
          <div class="col-8">
            <div v-if="section.name == 'attachments'">
              <ProposalAttachments />
            </div>
            <div v-else-if="section.name == 'team'"><TeamMembers /></div>
            <div v-else-if="section.name == 'summary_budget'">
              <BudgetItems :proposal_id="$route.params.proposal_id" />
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
          <div class="col-4 self-center">
            <q-card v-if="section.max_score > 0" class="my-card" flat bordered>
              <q-card-section>
                <div class="text-h6">Score</div>
              </q-card-section>
              <q-card-section>
                <div class="text-center">
                  <input
                    disabled
                    style="width: 3rem; text-align: center"
                    v-model="formData[`${section.name}_score`]"
                    type="number"
                    :min="section.min_score"
                    :max="section.max_score"
                    @blur="updateSectionScore(section.name)"
                  />/{{ section.max_score }}
                </div>
                <q-slider
                  v-if="!proposal.is_done_screening"
                  v-model="formData[`${section.name}_score`]"
                  :min="section.min_score"
                  :max="section.max_score"
                  :step="1"
                  color="green"
                  @change="updateSectionScore(section.name)"
                />
                <q-linear-progress
                  v-else
                  :value="formData[`${section.name}_score`] / section.max_score"
                  color="primary"
                  class="q-mt-xs"
                />
              </q-card-section>
              <q-card-section>
                <q-input
                  outlined
                  multiline
                  :disable="proposal.is_done_screening"
                  v-model="formData[`${section.name}_comment`]"
                  type="textarea"
                  label="Comment (Optional)"
                  @blur="updateSectionComment(section.name)"
                />
              </q-card-section>
            </q-card>
            <q-card v-else class="my-card" flat bordered>
              <q-card-section>
                <div class="text-grey text-center">Scoring Not Applicable</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <hr id="solution" class="section-separator" />
    <div class="q-pa-sm" align="center">
      <FinishScreening :proposal="proposal" />
    </div>
  </div>
</template>
<script>
import ProposalAttachments from "components/proposal/ProposalAttachments.vue";
import TeamMembers from "components/proposal/TeamMembers.vue";
import BudgetItems from "components/proposal/BudgetItems.vue";
import FinishScreening from "./FinishScreening.vue";
export default {
  components: {
    ProposalAttachments,
    TeamMembers,
    BudgetItems,
    FinishScreening,
  },
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
      formData: {},
    };
  },

  created() {
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
          this.getSections();
          this.getScore();
          this.getAttachments();
        })
        .finally(() => {
          this.$utilsStore.setLoading(false);
        });
    },

    updateSectionScore(section_name) {
      const data = {
        [`${section_name}_score`]: this.formData[`${section_name}_score`],
      };
      this.$api.patch(`proposals/${this.proposal.id}/`, data).then((res) => {
        this.proposal = res.data;
        this.$proposalStore.setProposal(this.proposal);
      });
    },

    updateSectionComment(section_name) {
      const data = {
        [`${section_name}_comment`]: this.formData[`${section_name}_comment`],
      };
      this.$api.patch(`proposals/${this.proposal.id}/`, data).then((res) => {
        this.proposal = res.data;
        this.$proposalStore.setProposal(this.proposal);
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
        this.setFormData();
      });
    },

    setFormData() {
      this.sections.forEach((section) => {
        this.formData[`${section.name}_score`] =
          this.proposal[`${section.name}_score`];
        this.formData[`${section.name}_comment`] =
          this.proposal[`${section.name}_comment`];
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
