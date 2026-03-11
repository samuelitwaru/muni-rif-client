<template>
  <q-page>
    <award-project-dialog
      v-if="currentProposal"
      :proposal="currentProposal"
      :show-popup="showAwardDialog"
      @close="showAwardDialog = false"
      @project-awarded="replaceProposalInList"
    />
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />
        <q-breadcrumbs-el label="Selected Proposals" icon="list" />
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
          @update:model-value="getProposals"
        />
      </div>
      <div class="col"></div>
    </div>
    <q-markup-table class="q-ma-sm" flat bordered>
      <thead>
        <tr>
          <th align="left">Title</th>
          <th align="left">Date Submitted</th>
          <th align="center">Total Score</th>
          <th align="center">Average Score</th>
          <th align="left">Budget Estimate</th>
          <th align="left">Budget Allocation</th>
          <th align="left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in proposals" :key="item.id">
          <td>
            <router-link :to="`/proposals/${item.id}`">
              <b>{{ item.title }}</b>
            </router-link>
          </td>
          <td>{{ item.submission_date }}</td>
          <td class="text-center">{{ item.total_score }}</td>
          <td class="text-center">{{ item.average_score }}</td>
          <td class="text-center">
            {{ $commaSeparator(item.total_budget || 0) }}
          </td>
          <td class="text-center">
            <div class="flex justify-around items-center">
              <span class="q-pr-sm">
                {{ $commaSeparator(item.budget_allocation || 0) }}
              </span>
              <budget-allocation-dialog
                @budget-allocated="replaceProposalInList"
                :proposal="item"
              />
            </div>
          </td>
          <td>
            <q-btn round flat icon="more_vert">
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      currentProposal = item;
                      showAwardDialog = true;
                    "
                  >
                    <q-item-section>
                      <div>
                        <q-icon name="email" />
                        Award
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    @click="unselectProposal(item.id)"
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
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>
import BudgetAllocationDialog from "./BudgetAllocationDialog.vue";
import AwardProjectDialog from "./AwardProjectDialog.vue";

export default {
  name: "SelectedProposals",
  components: {
    BudgetAllocationDialog,
    AwardProjectDialog,
  },
  data() {
    return {
      formData: {
        theme: null,
        is_selected: true,
        call: this.$dataStore.currentCall.id,
        page: 1,
        limit: 20,
      },
      proposals: [],
      themes: [],
      currentProposal: null,
      showAwardDialog: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getProposals();
      this.getThemes();
    },
    getProposals() {
      this.$utilsStore.setLoading(true);
      var queryString = this.$buildURLQuery(this.formData);
      this.$api
        .get(`proposals/?${queryString}`)
        .then((res) => {
          this.proposals = res.data.results;
        })
        .finally(() => {
          this.$utilsStore.setLoading(false);
        });
    },
    getThemes() {
      this.$api.get("themes/").then((res) => {
        this.themes = res.data;
      });
    },
    replaceProposalInList(updatedProposal) {
      const index = this.proposals.findIndex(
        (proposal) => proposal.id === updatedProposal.id
      );
      if (index !== -1) {
        this.proposals.splice(index, 1, updatedProposal);
      }
    },
    unselectProposal(ProposalId) {
      this.$api
        .patch(`proposals/${ProposalId}/`, {
          is_selected: false,
          status: "REVIEWED",
        })
        .then((res) => {
          const message = "Proposal removed from selected proposals";
          this.$q.notify(message);
        })
        .finally(() => {
          this.getProposals();
          this.$bus.emit("proposal-selected", {});
        });
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
