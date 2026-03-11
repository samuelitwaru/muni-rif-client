<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />
        <q-breadcrumbs-el label="Financial Reports" icon="assessment" />
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
      <div class="col">
        <q-btn label="Export" color="primary" icon-right="more_vert" outline>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item @click="exportToExcel" clickable v-close-popup>
                <q-item-section>Overview (Excel)</q-item-section>
              </q-item>
              <q-item @click="exportToPDF" clickable v-close-popup>
                <q-item-section>Detailed (PDF)</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>
    <div class="q-pa-sm">
      <table>
        <thead>
          <tr>
            <th align="left">Project</th>
            <th align="left">Last Updated</th>
            <th align="center">Budget</th>
            <th align="center">Allocated</th>
            <th align="center">Accounted</th>
            <th align="center">Unaccounted</th>
            <th align="center"></th>
          </tr>
        </thead>

        <tbody>
          <template v-for="(item, index) in proposals" :key="index">
            <!-- Main Row -->
            <tr class="expandable">
              <td>
                <router-link :to="`/proposals/${item.id}`"
                  ><b>{{ item.title }}</b></router-link
                >
              </td>
              <td>{{ $formatDate(item.updated_at) }}</td>
              <td>{{ $commaSeparator(item.total_budget || 0) }} UGX</td>
              <td class="text-center">
                <div class="flex justify-between items-center">
                  <span
                    >{{
                      $commaSeparator(item.budget_allocation || 0)
                    }}
                    UGX</span
                  >
                  <BudgetAllocationDialog
                    @budget-allocated="getProposals"
                    :proposal="item"
                  />
                </div>
              </td>
              <td class="text-center">
                {{ $commaSeparator(item.total_expenditure || 0) }} UGX
              </td>
              <td class="text-center">
                {{
                  $commaSeparator(
                    item.budget_allocation - item.total_expenditure || 0
                  )
                }}
                UGX
              </td>
              <td class="text-center">
                <q-btn
                  flat
                  round
                  dense
                  icon="expand_more"
                  :class="{ rotated: expandedIndex === index }"
                  @click="toggle(index)"
                />
              </td>
            </tr>

            <!-- Expanded Content -->
            <transition name="collapse">
              <tr v-if="expandedIndex === index" class="expand-content">
                <td colspan="7">
                  <div class="collapse-inner">
                    <ProposalExpenses :expenditures="item.expenditures" />
                  </div>
                </td>
              </tr>
            </transition>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"><b>Total:</b></td>

            <td>
              <b>Allocated: <br />{{ $commaSeparator(totalAllocated) }} UGX</b>
            </td>
            <td>
              <b
                >Accounted: <br />
                {{ $commaSeparator(totalAccounted) }} UGX</b
              >
            </td>
            <td colspan="2">
              <b> Unaccounted: <br />{{ $commaSeparator(UnAccounted) }} UGX</b>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!--  -->
  </q-page>
</template>

<script>
import BudgetAllocationDialog from "../proposal/BudgetAllocationDialog.vue";
import ProposalExpenses from "./ProposalExpenses.vue";

export default {
  name: "ReviewerList",
  components: { ProposalExpenses, BudgetAllocationDialog },
  data() {
    return {
      expandedIndex: null,
      formData: {
        theme: null,
        is_selected: true,
        call: this.$dataStore.currentCall.id,
        page: 1,
        limit: 20,
      },
      proposals: [],
      themes: [],
    };
  },
  created() {
    this.init();
  },
  computed: {
    totalAllocated() {
      const allocations = this.proposals.map(
        (proposal) => proposal.budget_allocation || 0
      );
      return allocations.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    },
    totalAccounted() {
      const accounted = this.proposals.map(
        (proposal) => proposal.total_expenditure || 0
      );
      return accounted.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    },
    UnAccounted() {
      return this.totalAllocated - this.totalAccounted;
    },
  },
  methods: {
    init() {
      this.getProposals();
      this.getThemes();
    },
    getProposals() {
      var queryString = this.$buildURLQuery(this.formData);
      this.$api.get(`proposals/?${queryString}`).then((res) => {
        console.log(res.data.results);
        this.proposals = res.data.results;
      });
    },
    getThemes() {
      this.$api.get("themes/").then((res) => {
        this.themes = res.data;
      });
    },
    toggle(index) {
      this.expandedIndex = this.expandedIndex === index ? null : index;
    },

    exportToExcel() {
      // var queryString = this.$buildURLQuery(this.formData);
      // const url = `${this.$api.defaults.baseURL}/expenditures/financial-report/download?${queryString}`;
      this.$api
        .get(
          `expenditures/financial-report/download/?call=${this.$dataStore.currentCall.id}`
        )
        .then((res) => {
          if (res.status === 200) {
            const url = res.data.file_url;
            window.open(url, "_blank");
          } else {
            this.$q.notify({
              type: "negative",
              message: "Failed to generate report. Please try again.",
            });
          }
        });
    },

    exportToPDF() {
      this.$api
        .get(
          `expenditures/financial-pdf-report/download/?call=${this.$dataStore.currentCall.id}`
        )
        .then((res) => {
          if (res.status === 200) {
            const url = res.data.file_url;
            window.open(url, "_blank");
          } else {
            this.$q.notify({
              type: "negative",
              message: "Failed to generate report. Please try again.",
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.rotated {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
.table-wrapper {
  /* max-width: 800px; */
  margin: auto;
  font-family: Arial, sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid rgb(146, 143, 143);
  text-align: left;
}

th {
  /* background-color: #f4f4f4; */
}

.expandable {
  cursor: pointer;
  /* background-color: #fafafa; */
  /* border-bottom: 2px solid black !important; */
}

.expand-content {
  border-bottom: 4px solid rgb(146, 143, 143);
  border-collapse: collapse !important;
}

/* add animation to the expandable row */
.expand-content {
  transition: all 5s ease;
}

/* Transition states */
.collapse-enter-active,
.collapse-leave-active {
  transition: all 2s ease;
}

.collapse-enter-from,
.collapse-leave-to {
  display: none;
}

/* Inner wrapper handles height animation */
.collapse-inner {
  overflow: hidden;
  animation: expand 2s ease;
}

/* Optional keyframes (smoother feel) */
@keyframes expand {
  from {
    max-height: 0;
    display: none;
  }
  to {
    max-height: 1000px;
    display: block;
  }
}
</style>
