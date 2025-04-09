<template>
  <div>
    <q-markup-table dense class="q-my-sm" flat bordered>
      <thead>
        <tr>
          <th align="left">Item</th>
          <th align="left">Quantity</th>
          <th align="left">Units</th>
          <th align="right">Unit Cost (UGX)</th>
          <th align="right">Total Cost (UGX)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.item }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.units }}</td>
          <td align="right">{{ $commaSeparator(item.unit_cost) }}</td>
          <td align="right">
            {{ $commaSeparator(item.unit_cost * item.quantity) }}
          </td>
        </tr>
        <tr>
          <td colspan="4">Total</td>
          <td align="right">{{ $commaSeparator(totalBudget) }}</td>
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
