<template>
  <div>
    <q-markup-table class="q-my-sm" flat bordered>
      <thead>
        <tr>
          <th align="left">Item</th>
          <th align="left">Quantity</th>
          <th align="left">Units</th>
          <th align="left">Unit Cost (UGX)</th>
          <th align="left">Total Cost (UGX)</th>
          <th
            v-if="$proposalStore.currentProposal?.status == 'EDITING'"
            align="left"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="q-tr--no-hover"
          v-if="$proposalStore.currentProposal?.status == 'EDITING'"
        >
          <td>
            <input
              v-model="formData.item"
              style="display: block; width: 100%"
              type="text"
            />
          </td>
          <td>
            <input
              v-model="formData.quantity"
              style="display: block; width: 100%"
              type="number"
            />
          </td>
          <td>
            <input
              v-model="formData.units"
              style="display: block; width: 100%"
              type="text"
            />
          </td>
          <td>
            <input
              v-model="formData.unit_cost"
              style="display: block; width: 100%"
              type="number"
            />
          </td>
          <td>{{ $commaSeparator(formData.unit_cost * formData.quantity) }}</td>
          <td>
            <button @click="createBudget">Add</button>
          </td>
        </tr>
        <tr class="q-tr--no-hover" v-for="item in items" :key="item.id">
          <td>{{ item.item }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.units }}</td>
          <td>{{ $commaSeparator(item.unit_cost) }} UGX</td>
          <td>{{ $commaSeparator(item.unit_cost * item.quantity) }} UGX</td>
          <td v-if="$proposalStore.currentProposal?.status == 'EDITING'">
            <q-btn
              icon="delete"
              flat
              color="negative"
              @click="deleteItem(item.id)"
            />
          </td>
        </tr>
        <tr class="q-tr--no-hover">
          <th class="text-left" colspan="4">Total</th>
          <th class="text-left">{{ $commaSeparator(totalBudget) }} UGX</th>
          <td></td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  name: "BudgetEditor",
  data() {
    return {
      formData: {
        item: "",
        quantity: 1,
        units: "",
        unit_cost: 0,
        proposal: this.$route.params.proposal_id,
      },
      updateFormData: {
        id: 0,
        item: "",
        quantity: 1,
        units: "",
        unit_cost: 0,
        proposal: this.$route.params.proposal_id,
      },
      items: [],
    };
  },
  computed: {
    totalBudget() {
      var total = 0;
      for (let index = 0; index < this.items.length; index++) {
        const item = this.items[index];
        total += item.unit_cost * item.quantity;
      }
      return total;
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getBudgets();
    },
    getBudgets() {
      this.$api
        .get(`budgets/?proposal=${this.$route.params.proposal_id}`)
        .then((res) => {
          this.items = res.data;
        });
    },
    createBudget() {
      this.$api.post(`budgets/`, this.formData).then((res) => {
        if ((res.status = 201)) {
          this.items.unshift(res.data);
          this.resetFormData();
          this.$bus.emit("proposal-updated", true);
        }
      });
    },

    deleteItem(id) {
      if (confirm("Delete this budget?")) {
        this.$api.delete(`budgets/${id}`).then((res) => {
          if (res.status == 204) {
            this.init();
            this.$bus.emit("proposal-updated", true);
          }
        });
      }
    },
    resetFormData() {
      this.formData = {
        item: "",
        quantity: 1,
        units: "",
        unit_cost: 0,
        proposal: this.$route.params.proposal_id,
      };
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
