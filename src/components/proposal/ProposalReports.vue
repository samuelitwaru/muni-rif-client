<template lang="">
  <div class="q-pa-md">
    <div class="row items-center justify-between">
      <div class="text-h6 q-pa-sm">Expense Reports</div>
      <div class="q-gutter-sm">
        <q-btn color="green" outline flat icon="download" label="export" @click="onClick" />
      </div>
    </div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">Date</th>
          <th class="text-left">Item</th>
          <th class="text-left">Quantity</th>
          <th class="text-left">Units</th>
          <th class="text-left">Unit Cost</th>
          <th class="text-left">Total</th>
          <th class="text-left">Comments</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">
            <input type="date" name="" value="">
          </td>
          <td class="text-left">
            <input type="text" name="" value="Printing and Binding">
          </td>
          <td class="text-left">
            <input type="number" name="" value="159">
          </td>
          <td class="text-left">
            <input type="text" name="" value="Copies">
          </td>
          <td class="text-left">
            <input type="number" name="" value="20000">
          </td>
          <td class="text-left">{{$commaSeparator(159*20000)}} UGX</td>
          <td class="text-left">
            <input type="text" name="" value="For distribution to stakeholders">
          </td>
          <td class="text-left">
            <q-btn color="red" label="submit" flat outline />
          </td>
        </tr>
        <tr v-for="expenditure in expenditures" :key="expenditure.id">
          <td class="text-left">{{ expenditure.date }}</td>
          <td class="text-left">{{ expenditure.item }}</td>
          <td class="text-left">{{ expenditure.quantity }}</td>
          <td class="text-left">{{ expenditure.units }}</td>
          <td class="text-left">{{ $commaSeparator(expenditure.unit_cost) }} UGX</td>
          <td class="text-left">{{ expenditure.amount }}</td>
          <td class="text-left">{{ expenditure.comments }}</td>
          <td class="text-left">
            <q-btn color="red" icon="delete" flat outline />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="text-left"><strong>Total</strong></td>
          <td class="text-left"><strong>300,000 UGX</strong></td>
          <td class="text-left"><strong></strong></td>
          <td class="text-left"><strong></strong></td>
        </tr>
      </tfoot>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      expenditures: [
        {
          id: 1,
          date: "09-07-2024",
          item: "Stationery",
          quantity: 10,
          units: "Packs",
          unit_cost: 5000,
          comments: "For office use",
          amount: "50,000 UGX"
        },
        {
          id: 2,
          date: "10-07-2024",
          item: "Travel",
          quantity: 1,
          units: "Trip",
          unit_cost: 100000,
          comments: "Client meeting",
          amount: "100,000 UGX"
        },
        {
          id: 3,
          date: "11-07-2024",
          item: "Meals",
          quantity: 5,
          units: "Days",
          unit_cost: 20000,
          comments: "Team lunch",
          amount: "100,000 UGX"
        }
      ]
    }
  },
}
</script>
<style>
  input {
    /* border: none; */
    /* border-bottom: 1px solid #ccc; */
    padding: 4px;
    font-size: 14px;
    width: 100%;
  }
</style>
