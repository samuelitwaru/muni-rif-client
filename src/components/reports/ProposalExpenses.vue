<template lang="">
  <div>
    <q-markup-table flat bordered separator="cell">
      <thead>
        <tr>
          <th class="text-left">Date</th>
          <th class="text-left">Expense Category</th>
          <th class="text-left">Item</th>
          <th class="text-left">Units</th>
          <th class="text-right">Quantity</th>
          <th class="text-right">Unit Cost</th>
          <th class="text-right">Total</th>
          <th class="text-left">Comments</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="q-tr--no-hover"
          v-for="expenditure in expenditures"
          :key="expenditure.id"
        >
          <td class="text-left">{{ expenditure.date }}</td>
          <td class="text-left">
            {{ expenditure.budget_category_title || "-" }}
          </td>
          <td class="text-left">{{ expenditure.item }}</td>
          <td class="text-left">{{ expenditure.units }}</td>
          <td class="text-right">{{ expenditure.quantity }}</td>
          <td class="text-right">
            {{ $commaSeparator(expenditure.unit_cost) }} UGX
          </td>
          <td class="text-right">
            {{ $commaSeparator(expenditure.quantity * expenditure.unit_cost) }}
            UGX
          </td>
          <td class="text-left">{{ expenditure.remarks }}</td>
        </tr>
        <tr class="q-tr--no-hover">
          <td align="center" v-if="expenditures.length == 0" colspan="8">
            No entries
          </td>
        </tr>
      </tbody>
      <tfoot v-if="expenditures.length">
        <tr>
          <td colspan="6" class="text-left"><strong>Total</strong></td>
          <td class="text-right">
            <strong>{{ $commaSeparator(totalAmount) }} UGX</strong>
          </td>
          <td class="text-left"><strong></strong></td>
          <td v-if="isEditing" class="text-left"><strong></strong></td>
        </tr>
      </tfoot>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  props: {
    expenditures: {
      type: Array,
      required: true,
    },
  },

  computed: {
    totalAmount() {
      const amounts = this.expenditures.map(
        (exp) => exp.unit_cost * exp.quantity
      );
      return amounts.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    },
  },
};
</script>
<style lang=""></style>
