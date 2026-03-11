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

    <ProposalFilter @filter="getProposals($event)" />

    <div v-if="view === 'proposals'">
      <q-markup-table wrap-cells class="q-ma-sm" separator="cell" flat bordered>
        <thead>
          <tr>
            <th align="left">Title</th>
            <th align="left">Theme</th>
            <th align="left">Date Submitted</th>
            <th align="left">PI</th>
            <th align="left">Status</th>
            <th align="left">Screening Score</th>
            <th align="left">Passed Screening</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in proposals" :key="item.id">
            <tr>
              <td>
                <router-link :to="`/proposals/screening/${item.id}`"
                  ><b>{{ item.title }}</b></router-link
                >
              </td>
              <td wrap-cells>
                {{ item.theme_title }}
              </td>
              <td>{{ item.submission_date }}</td>
              <td>{{ item.user__first_name }} {{ item.user__last_name }}</td>
              <td>{{ item.status }}</td>
              <td>
                <q-linear-progress
                  :value="item.screening_score / 100"
                  class="q-mt-md"
                />
                <q-badge :label="`${(item.screening_score / 100) * 100}%`" />
              </td>
              <td align="center">
                <q-icon
                  v-if="item.is_recommended"
                  size="sm"
                  color="green"
                  name="check_circle"
                />
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
import AssignedProposals from "components/proposal/AssignedProposals.vue";
import ProposalFilter from "./ProposalFilter.vue";
// import InlineProposalReviewers from "./InlineProposalReviewers.vue";

export default {
  components: {
    ProposalFilter,
    AssignedProposals,
  },
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
      filterData.page = this.formData.page;
      filterData.limit = this.formData.limit;
      filterData.call = this.formData.call;
      filterData["exclude__status"] = "EDITING";
      this.setView(filterData);
      let queryString = "";
      if (filterData) {
        queryString = this.$buildURLQuery(filterData);
      }
      this.$api.get(`proposals/?${queryString}`).then((res) => {
        this.proposals = res.data.results;
        this.page = res.data.page;
        this.maxPageCount = res.data.max_page;
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
      if (
        filterData?.status &&
        ["REVIEWING", "REVIEWED", "SELECTED"].includes(filterData.status)
      ) {
        this.view = "scores";
      } else {
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
