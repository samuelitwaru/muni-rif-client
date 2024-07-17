<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />
        <q-breadcrumbs-el label="Submitted Proposals" icon="list" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
    <div align="right" class="q-ma-sm row">
      <div class="col">
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
          @update:model-value="
            getProposals();
            getReviewers();
          "
        />
      </div>
      <div class="col">
        <q-btn
          color="primary"
          label="Assign Reviewers"
          :disabled="selectedProposals.length == 0"
        >
          <q-popup-proxy v-model="show" :breakpoint="1000">
            <AssignReviewers
              :reviewers="reviewers"
              @reviewers-selected="
                createScores($event);
                show = false;
              "
            />
          </q-popup-proxy>
        </q-btn>
      </div>
    </div>
    <q-markup-table class="q-ma-sm" flat bordered>
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
          <!-- <th align="left">Theme</th> -->
          <th align="left">Date Submitted</th>
          <th align="left">PI</th>
          <th align="left">Reviewers</th>
          <th align="left">Status</th>
          <th align="left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in proposals" :key="item.id">
          <td>
            <input
              :checked="selectedProposals.includes(item.id)"
              type="checkbox"
              @click="selectProposal(item.id)"
            />
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.submission_date }}</td>
          <td>{{ item.user__first_name }} {{ item.user__last_name }}</td>
          <td>
            <div class="flex">
              <q-chip
                v-for="score in item.scores"
                :key="score.id"
                class="glossy"
                :label="`${score.user__first_name} ${score.user__last_name}`"
                removable
                @remove="deleteScore(score.id)"
              />
            </div>
          </td>
          <td>{{ item.status }}</td>

          <td>
            <router-link :to="`/proposals/${item.id}`">
              <q-btn
                label="View"
                flat
                color="primary"
                @click="editItem(item)"
              />
            </router-link>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>
import AssignReviewers from "components/proposal/AssignReviewers.vue";
export default {
  components: { AssignReviewers },
  name: "ReviewerList",
  data() {
    return {
      show: false,
      formData: {
        theme: null,
        exclude__status: "EDITING",
        call: this.$dataStore.currentCall.id,
      },
      proposals: [],
      themes: [],
      selectedProposals: [],
      allSelected: false,
    };
  },
  created() {
    this.getProposals();
    this.getThemes();
    this.getReviewers();
  },
  methods: {
    getProposals() {
      var queryString = this.$buildURLQuery(this.formData);

      this.$api.get(`proposals/?${queryString}`).then((res) => {
        this.proposals = res.data;
        this.getProposalScores();
      });
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

    getProposalScores() {
      for (let index = 0; index < this.proposals.length; index++) {
        const prop = this.proposals[index];

        this.$api.get(`scores/?proposal=${prop.id}`).then((res) => {
          this.proposals[index].scores = res.data;
        });
      }
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
    selectAllProposals(event) {
      if (event.target.checked) {
        this.selectedProposals = this.proposals.map((item) => item.id);
      } else {
        this.selectedProposals = [];
      }
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
