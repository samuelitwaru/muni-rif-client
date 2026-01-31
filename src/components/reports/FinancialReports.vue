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
      <div class="col"></div>
      <table>
        <thead>
          <tr>
            <th align="left">Project</th>
            <th align="left">Last Updated</th>
            <th align="center">Allocated</th>
            <th align="center">Accounted</th>
            <th align="center">Balance</th>
            <th align="center"></th>
          </tr>
        </thead>

        <tbody>
          <template v-for="(item, index) in proposals" :key="index">
            <!-- Main Row -->
            <tr class="expandable">
              <td>
                <router-link to="/"
                  ><b>{{ item.title }}</b></router-link
                >
              </td>
              <td>{{ item.submission_date }}</td>
              <td class="text-center">
                {{ $commaSeparator(item.budget_allocation || 0) }} UGX
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
                  @click="toggle(index)"
                />
              </td>
            </tr>

            <!-- Expanded Content -->
            <tr v-if="expandedIndex === index" class="expand-content">
              <td colspan="6">
                <ProposalExpenses :expenditures="item.expenditures" />
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4"><b>Total:</b></td>
            <td colspan="2">
              <b>{{ $commaSeparator(totalAmount) }} UGX</b>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!--  -->
  </q-page>
</template>

<script>
import ProposalExpenses from "./ProposalExpenses.vue";

export default {
  name: "ReviewerList",
  components: { ProposalExpenses },
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
  },
};
</script>

<style scoped>
.table-wrapper {
  max-width: 800px;
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
  border-bottom: 2px solid black !important;
}

.expand-content {
  background-image: linear-gradient(to bottom, rgb(100, 100, 100), white);
  border-bottom: 2px solid black !important;
  border-left: 2px solid black !important;
  border-right: 2px solid black !important;
  border-collapse: collapse !important;
}
</style>
