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
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.item }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.units }}</td>
          <td>{{ item.unit_cost }}</td>
          <td>{{ item.unit_cost * item.quantity }}</td>
        </tr>
        <tr>
          <td colspan="4">Total</td>
          <td>...</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  name: "BudgetItems",
  data() {
    return {
      items: [],
    };
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
  },
};
</script>
