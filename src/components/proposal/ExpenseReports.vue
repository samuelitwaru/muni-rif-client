<template lang="">
  <div class="q-pa-md">

    <div class="row items-center justify-between">
      <div class="text-h6">Expense Reports</div>
      <!-- <div class="q-gutter-sm">
        <q-btn color="primary" outline flat icon="download" label="export" @click="exportExpenditures" />
      </div> -->
    </div>
    <q-markup-table flat bordered>
      <thead>
        <tr>
          <th class="text-left">Date</th>
          <th class="text-left">Item</th>
          <th class="text-left">Units</th>
          <th class="text-left">Quantity</th>
          <th class="text-left">Unit Cost</th>
          <th class="text-right">Total</th>
          <th class="text-left">Comments</th>
          <th class="text-left" v-if="isEditing">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isEditing">
          <td class="text-left">
            <input type="date" v-model="formData.date">
          </td>
          <td class="text-left">
            <input type="text"  v-model="formData.item">
          </td>
          <td class="text-left">
            <input type="text"  v-model="formData.units">
          </td>
          <td class="text-left">
            <input type="number"  v-model="formData.quantity">
          </td>
          <td class="text-left">
            <input type="number"  v-model="formData.unit_cost">
          </td>
          <td class="text-right">{{$commaSeparator(formData.unit_cost*formData.quantity)}} UGX</td>
          <td class="text-right">
            <input type="text"  v-model="formData.remarks">
          </td>
          <td class="text-left">
            <q-btn v-if="!isSubmitting" color="red" icon="check" flat outline @click="createExpenditure" />
            <q-spinner
            v-else
              color="primary"
              size="1.5rem"
              :thickness="5"
            />
          </td>
        </tr>
        <tr v-for="expenditure in expenditures" :key="expenditure.id">
          <td class="text-left">{{ expenditure.date }}</td>
          <td class="text-left">{{ expenditure.item }}</td>
          <td class="text-left">{{ expenditure.units }}</td>
          <td class="text-center">{{ expenditure.quantity }}</td>
          <td class="text-right">{{ $commaSeparator(expenditure.unit_cost) }} UGX</td>
          <td class="text-right">{{ $commaSeparator(expenditure.quantity * expenditure.unit_cost) }} UGX</td>
          <td class="text-left">{{ expenditure.remarks }}</td>
          <td v-if="isEditing" class="text-left">
            <q-btn color="red" icon="delete" @click="deleteExpenditure(expenditure.id)" flat outline />
          </td>
        </tr>
        <tr>
          <td align="center" v-if="expenditures.length == 0" colspan="7">
            No entries
          </td>
        </tr>
      </tbody>
      <tfoot v-if="expenditures.length">
        <tr>
          <td colspan="5" class="text-left"><strong>Total</strong></td>
          <td class="text-right"><strong>{{$commaSeparator(totalAmount)}} UGX</strong></td>
          <td class="text-left"><strong></strong></td>
          <td v-if="isEditing" class="text-left"><strong></strong></td>
        </tr>
      </tfoot>
    </q-markup-table>
  </div>
</template>
<script>
const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);
export default {
  name:"ExpenseReports",
  components: {},
  data() {
    return {
      formData: {
        item: "",
        quantity: 1,
        unit_cost: 0,
        units: "",
        date: formattedDate,
        proposal: this.$route.params.proposal_id,
        remarks: "",
      },
      expenditures: [],
      isEditing: this.$userHasAnyGroups(['applicant']) && this.$authStore.currentUser.id ==
                    this.$proposalStore.currentProposal.user && this.$proposalStore.currentProposal.is_selected,
      isSubmitting: false,
    }
  },
  created(){
    this.getExpenditures()
  },
  computed: {
    totalAmount(){
      const amounts = (this.expenditures.map(exp=>exp.unit_cost*exp.quantity))
      return amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    },
  },
  methods: {
    getExpenditures() {
      this.$api.get(`expenditures/`).then((res) => {
        this.expenditures = res.data;
      });
    },
    createExpenditure(){
      this.isSubmitting = true
      this.$api.post(`expenditures/`, this.formData)
      .then((res) => {
        console.log('res: ', res.status)
        if (res.status == 201) {
          this.expenditures.push(res.data)
          this.resetFormData()
          this.isSubmitting = false
        }
      })
      .catch(err => {
        console.log('err', err.response.data)
        this.isSubmitting = false
      })
    },
    deleteExpenditure(expenseId){
      if (confirm("Confirm Delete?")) {
        this.$api.delete(`expenditures/${expenseId}`).then((res) => {
          console.log('res: ', res.data)
          this.getExpenditures()
        });
      }

    },
    exportExpenditures(){},

    resetFormData(){
      this.formData = {
        item: "",
        quantity: 1,
        unit_cost: 0,
        units: "",
        date: formattedDate,
        proposal: this.$route.params.proposal_id,
        remarks: "",
      }
    }
  }
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
