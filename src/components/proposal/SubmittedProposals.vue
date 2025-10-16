<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />
        <q-breadcrumbs-el label="Submitted Proposals" icon="list" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
    <!-- filters section -->
    <!-- other controls -->
    <div class="q-ma-sm row items-center">
      <q-card class="my-card q-pa-xs" flat bordered>
      <div class="flex border">
        <label class="row items-center q-pr-xs">Bulk Upload</label>
        <q-btn color="primary" icon="download" dense flat @click="downloadTemplate"  label="template" />
        <FileUploader2 @file-uploaded="getProposals({})" uploadUrl="/proposals/upload-bulk/" :multiple="false" :formData="{}" />
      </div>
      </q-card>
      <div class="col">
      </div>
      <div class="col">
        <div>
          <q-popup-proxy v-model="show" :breakpoint="1000">
            <AssignReviewers2
              :reviewers="reviewers"
              @reviewers-selected="
                createScores($event);
                show = false;
              "
            />
          </q-popup-proxy>
        </div>
        <!-- <router-link to="/go/proposals/reviewed">
          <q-btn color="primary" flat label="Go To Reviews" class="q-mr-sm" />
        </router-link> -->
      </div>
    </div>
    <ProposalFilter @filter="getProposals($event)"/>

    <div v-if="view === 'proposals'">
      <q-markup-table class="q-ma-sm" separator="cell" flat bordered>
        <thead>
          <tr>
            <th align="left">
              <input
                :checked="allSelected"
                type="checkbox"
                @click="selectAllProposals($event)"
              />
            </th>
            <th align="left">Title</th>
            <th align="left">Theme</th>
            <th align="left">Date Submitted</th>
            <th align="left">PI</th>
            <!-- <th align="left">Reviewers</th> -->
            <th align="left">Status</th>
            <th align="left"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in proposals" :key="item.id">
            <tr >
              <td>
                <input
                  :checked="selectedProposals.includes(item.id)"
                  type="checkbox"
                  @click="selectProposal(item.id)"
                />
              </td>
              <td><router-link :to="`/proposals/${item.id}`">{{ item.title }}</router-link></td>
              <td>{{ item.theme_title }}</td>
              <td>{{ item.submission_date }}</td>
              <td>{{ item.user__first_name }} {{ item.user__last_name }}</td>
              <td>{{ item.status }}</td>
              <td>
                <q-btn
                  @click="selectProposal2(item.id)"
                  label="Assign Reviewers"
                  flat
                  color="primary"
                />

                <q-chip v-for="score in item.scores" :key="score.id">
                  {{ score.user__first_name }} {{ score.user__last_name }}
                  <q-icon
                    name="close"
                    color="primary"
                    @click="deleteScore(score.id)"
                    class="cursor-pointer"
                  />
                </q-chip>
              </td>
            </tr>
            <!-- <tr class="q-tr--no-hover" v-if="item.scores && item.scores.length">
              <td colspan="7">
                <InlineProposalReviewers :proposal="item" :scores="item.scores"/>
              </td>
            </tr> -->
          </template>
        </tbody>
      </q-markup-table>
      <div class="q-pa-sm flex flex-center">
        <q-pagination direction-links v-model="formData.page" :max="maxPageCount" @update:model-value="getProposals(formData)"/>
      </div>
    </div>

    <AssignedProposals v-if="view === 'scores'" :proposals="proposals"/>
  </q-page>
</template>

<script>
import AssignReviewers2 from "components/proposal/AssignReviewers2.vue";
import AssignedProposals from "components/proposal/AssignedProposals.vue";
import FileUploader2 from "components/widgets/FileUploader2.vue";
import ProposalFilter from "./ProposalFilter.vue";
// import InlineProposalReviewers from "./InlineProposalReviewers.vue";

export default {
  components: { AssignReviewers2, FileUploader2, ProposalFilter, AssignedProposals },
  name: "ReviewerList",
  data() {
    return {
      show: false,
      formData: {
        theme: null,
        exclude__status: "EDITING",
        // submission_date_lte: "2025-06-24",
        // submission_date_gte: "2025-01-01",
        call: this.$dataStore.currentCall.id,
        page: 1,
        limit: 10
      },
      proposals: [],
      scores:[],
      themes: [],
      selectedProposals: [],
      selectedProposal: null,
      allSelected: false,
      maxPageCount: 0,
      view: "proposals", // can be "proposals" or "scores"
    };
  },
  created() {
    this.getProposals(this.formData);
    this.getThemes();
    this.getReviewers();
  },
  methods: {
    getProposals(filterData) {
      console.log('filerdata', filterData)
      this.$utilsStore.setLoading(true);
      filterData.page = this.formData.page
      filterData.limit = this.formData.limit
      filterData.call = this.formData.call
      filterData["exclude__status"] = "EDITING"
      this.setView(filterData)
      let queryString = ''
      if (filterData) {
        queryString = this.$buildURLQuery(filterData);
      }
      this.$api.get(`proposals/?${queryString}`).then((res) => {
        this.proposals = res.data.results;
        this.page = res.data.page
        this.maxPageCount = res.data.max_page
        this.getProposalScores();
        this.$utilsStore.setLoading(false);
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

    setView(filterData) {
      if (filterData?.status && ["REVIEWING","REVIEWED","SELECTED"].includes(filterData.status)) {
        this.view = "scores";
      }else {
        this.view = "proposals";
      }
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

    downloadTemplate(){
      this.$api
        .get(`proposals/bulk-upload-sheet/download/`)
        .then((res) => {
          if (res.status == 200) {
            window.open(res.data.file_url, "_blank");
          }
        });
    }
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
