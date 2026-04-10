<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />
        <q-breadcrumbs-el label="Screened Proposals" icon="list" />
      </q-breadcrumbs>
    </div>
    {{ proposal?.title }}
    <ScoreSheetDialog
      :show="showScoreSheet"
      :proposal="proposal"
      @close-dialog="
        showScoreSheet = false;
        proposal = null;
      "
    />

    <q-separator spaced />
    <!-- filters section -->
    <div align="right" class="q-ma-sm row">
      <div class="col"></div>
      <!-- other controls -->
      <div class="col">
        <AssignReviewers2
          @reviewers-selected="
            createScores($event);
            show = false;
          "
          @close-dialog="show = false"
          :show-dialog="show"
        />
      </div>
    </div>
    <ProposalFilter @filter="getProposals($event)" />

    <div class="row">
      <div class="col q-px-sm">
        <q-select
          v-model="formData.theme"
          dense
          outlined
          :options="[{ id: null, title: 'All' }].concat(themes)"
          label="Select Theme"
          option-value="id"
          option-label="title"
          map-options
          emit-value
          @update:model-value="getProposals(formData)"
        />
      </div>
      <div class="flex justify-end col">
        <q-btn
          flat
          icon="download"
          class="q-ma-sm"
          color="primary"
          label="EXPORT REVIEWS"
          @click="exportReviews"
        />
      </div>
    </div>

    <div v-if="view === 'proposals'">
      <q-markup-table wrap-cells class="q-ma-sm" separator="cell" flat bordered>
        <thead>
          <tr>
            <th align="left">No</th>
            <th align="left">Title</th>
            <th align="left">Theme</th>
            <th align="left">Date Submitted</th>
            <th align="left">PI</th>
            <!-- <th align="left">Reviewers</th> -->
            <th align="left">Status</th>
            <th align="left">Reviewers</th>
            <th align="left">Review Score</th>
            <th align="left"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in proposals" :key="item.id">
            <tr>
              <td>
                {{ index + 1 }}
              </td>
              <td>
                <router-link :to="`/proposals/${item.id}`"
                  ><b>{{ item.title }}</b></router-link
                >
              </td>
              <td>{{ item.theme_title }}</td>
              <td>{{ item.submission_date }}</td>
              <td>{{ item.user__first_name }} {{ item.user__last_name }}</td>
              <td>{{ item.status }}</td>

              <td>
                <q-btn
                  @click="selectProposal2(item.id)"
                  icon="add"
                  dense
                  flat
                  size="sm"
                  color="primary"
                />
                <q-chip size="md" v-for="score in item.scores" :key="score.id">
                  <span v-if="score.user"
                    >{{ score.user__first_name }}
                    {{ score.user__last_name }}</span
                  >
                  <span v-else>(missing user)</span>

                  <q-btn round dense flat icon="more_vert">
                    <q-menu>
                      <q-list style="min-width: 120px">
                        <q-item v-close-popup>
                          <q-item-section>
                            <b>
                              {{ score.status }}
                            </b>
                          </q-item-section>
                        </q-item>
                        <q-separator />

                        <q-item
                          @click="viewScore(item)"
                          clickable
                          v-close-popup
                        >
                          <q-item-section>
                            <div>
                              <!-- <q-icon name="close" /> -->
                              View Scores
                            </div>
                          </q-item-section>
                        </q-item>

                        <q-item
                          v-if="score.status == 'PENDING'"
                          clickable
                          v-close-popup
                        >
                          <q-item-section>
                            <div>
                              <q-icon name="email" />
                              Email
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item
                          @click="deleteScore(score.id)"
                          clickable
                          v-close-popup
                        >
                          <q-item-section>
                            <div>
                              <q-icon name="close" />
                              Remove
                            </div>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </q-chip>
              </td>

              <td>
                <q-linear-progress
                  :value="item.average_score / 100"
                  color="secondary"
                  class="q-mt-md"
                />
                <q-badge
                  color="secondary"
                  :label="`${Math.round((item.average_score / 100) * 100)}%`"
                />
              </td>

              <td>
                <div class="flex">
                  <q-btn
                    dense
                    flat
                    size="sm"
                    :icon="expanded[item.id] ? 'expand_less' : 'expand_more'"
                    @click="toggle(item.id)"
                  />
                </div>
              </td>
            </tr>

            <tr
              v-show="expanded[item.id]"
              class="q-tr--no-hover"
              v-if="item.scores && item.scores.length"
            >
              <td></td>
              <td colspan="8">
                <ProposalScorePivotTable :proposal_id="item.id" />
              </td>
            </tr>
          </template>
        </tbody>
      </q-markup-table>
      <div class="q-pa-sm flex flex-center">
        <q-pagination
          direction-links
          v-model="formData.page"
          :max="maxPageCount"
          @update:model-value="getProposals(formData)"
        />
      </div>
    </div>

    <AssignedProposals v-if="view === 'scores'" :proposals="proposals" />
  </q-page>
</template>

<script>
import AssignReviewers2 from "components/proposal/AssignReviewers2.vue";
import AssignedProposals from "components/proposal/AssignedProposals.vue";
import ScoreSheetDialog from "./ScoreSheetDialog.vue";
import ProposalScorePivotTable from "./ProposalScorePivotTable.vue";

export default {
  components: {
    AssignReviewers2,
    AssignedProposals,
    ScoreSheetDialog,
    ProposalScorePivotTable,
  },
  name: "ReviewerList",
  data() {
    return {
      show: false,
      showScoreSheet: false,
      formData: {
        theme: null,
        is_done_screening: true,
        is_recommended: true,
        call: this.$dataStore.currentCall.id,
        page: 1,
        limit: 20,
      },
      proposals: [],
      scores: [],
      themes: [],
      selectedProposals: [],
      selectedProposal: null,
      allSelected: false,
      maxPageCount: 0,
      view: "proposals", // can be "proposals" or "scores"
      expanded: {},
    };
  },
  created() {
    this.getProposals(this.formData);
    this.getThemes();
    this.getReviewers();
  },
  methods: {
    getProposals(filterData) {
      this.$utilsStore.setLoading(true);
      var queryString = this.$buildURLQuery(filterData);

      this.$api.get(`proposals/?${queryString}`).then((res) => {
        this.proposals = res.data.results;
        this.page = res.data.page;
        this.maxPageCount = res.data.max_page;
        this.getProposalScores();
        this.$utilsStore.setLoading(false);
      });
    },

    exportReviews() {
      const filterData = {
        is_done_screening: true,
        is_recommended: true,
        call: this.$dataStore.currentCall.id,
      };
      this.$utilsStore.setLoading(true);
      let queryString = "";
      if (filterData) {
        queryString = this.$buildURLQuery(filterData);
      }
      this.$api
        .get(`proposals/export-reviews-pdf/?${queryString}`)
        .then((res) => {
          this.$utilsStore.setLoading(false);
          window.open(res.data.file_url, "_blank");
        });
    },

    getProposalScores() {
      for (let index = 0; index < this.proposals.length; index++) {
        const prop = this.proposals[index];

        this.$api.get(`scores/?proposal=${prop.id}`).then((res) => {
          this.proposals[index].scores = res.data;
        });
      }
    },

    toggle(id) {
      this.expanded[id] = !this.expanded[id];
    },

    viewScore(proposal) {
      console.log(proposal);
      this.proposal = proposal;
      this.showScoreSheet = true;
    },

    getThemes() {
      this.$api.get("themes/").then((res) => {
        this.themes = res.data;
      });
    },
    getReviewers() {
      var queryString = this.$buildURLQuery({
        themes__in: this.formData.theme,
      });
      this.$api
        .get(`users/?${queryString}&groups__name__in=reviewer`)
        .then((res) => {
          this.reviewers = res.data;
        });
    },

    createScores(selectedReviewers) {
      this.$utilsStore.setLoading(true);
      const returns = selectedReviewers.length * this.selectedProposals.length;
      let count = 0;
      for (let i = 0; i < selectedReviewers.length; i++) {
        const revId = selectedReviewers[i];
        const email = this.reviewers.find((item) => item.id == revId).email;
        for (let j = 0; j < this.selectedProposals.length; j++) {
          const propId = this.selectedProposals[j];
          this.$api
            .post("scores/", { proposal: propId, email: email, user: revId })
            .then((res) => {
              count += 1;
              if (res.status == 201) {
                console.log("done >> " + revId + ", " + propId);
              }
              if (count == returns) {
                this.$utilsStore.setLoading(false);
                this.getProposalScores();
              }
            })
            .catch((e) => {
              count += 1;
              if (count == returns) {
                this.$utilsStore.setLoading(false);
                this.getProposalScores();
              }
            });
        }
      }
    },

    deleteScore(id) {
      if (confirm("Are you sure you would like to delete this reviewer?")) {
        this.$utilsStore.setLoading(true);
        this.$api.delete(`scores/${id}/`).then((res) => {
          if (res.status == 204) {
            this.getProposalScores();
            this.$utilsStore.setLoading(false);
          }
        });
      }
    },

    selectProposal(proposalId) {
      if (this.selectedProposals.includes(proposalId)) {
        this.selectedProposals = this.selectedProposals.filter(
          (item) => item != proposalId
        );
      } else {
        this.selectedProposals.push(proposalId);
      }

      if (this.selectedProposals.length == this.proposals.length) {
        this.allSelected = true;
      }
    },

    selectProposal2(proposalId) {
      this.selectAllProposals = [];
      this.selectedProposals = [];
      this.selectedProposals.push(proposalId);
      this.selectedProposal = proposalId;
      this.show = true;
    },
    selectAllProposals(event) {
      if (event.target.checked) {
        this.selectedProposals = this.proposals.map((item) => item.id);
      } else {
        this.selectedProposals = [];
      }
    },

    downloadTemplate() {
      this.$api.get(`proposals/bulk-upload-sheet/download/`).then((res) => {
        if (res.status == 200) {
          window.open(res.data.file_url, "_blank");
        }
      });
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
