<template>
  <div>
    <q-btn
      v-if="showButton"
      icon="edit"
      color="primary"
      @click="showDialog = true"
      dense
      flat
    />
    <q-form @submit="allocateBudget">
      <q-dialog v-model="showDialog" persistent>
        <q-card style="width: 500px">
          <q-card-section class="flex justify-between">
            <div class="text-h6">Budget Allocation</div>
            <!-- close btn -->
            <q-btn
              icon="close"
              flat
              dense
              round
              @click="cancelUpdate"
            />
          </q-card-section>
          <q-separator />

          <q-card-section class="q-pt-lg q-pb-md">
            <div class="text-h5">Budget</div>
            <BudgetItems :proposal_id="proposal.id" />
          </q-card-section>

          <q-card-section class="q-pt-lg q-pb-md">
            <label>Budget Allocation</label>

            <q-input
              v-model.number="formData.budget_allocation"
              type="number"
              outlined
              required
              class="text-h5"
            />
            <div class="text-red">
              <ul class="q-ma-xs">
                <li v-for="err in formErrors?.budget_allocation" :key="err">{{ err }}</li>
              </ul>
            </div>

            <br />


            <div class="text-red">
              <ul class="q-ma-xs">
                <li v-for="err in formErrors?.budget_allocation" :key="err">{{ err }}</li>
              </ul>
            </div>
          </q-card-section>
          <q-separator spaced />
          <q-card-actions align="right">
            <q-btn flat color="primary" label="Cancel" @click="cancelUpdate" />
            <q-btn color="primary" label="Allocate" @click="allocateBudget" :disable="!formData.budget_allocation"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-form>
  </div>
</template>

<script>
import BudgetItems from "./BudgetItems.vue";

export default {
  components: {
    BudgetItems,
  },
  props: {
    proposal: {
      type: Object,
      required: true,
    },
    showButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    showPopup: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      showDialog: false,
      formData: {
        budget_allocation: null,
      },
      formErrors: {},
    };
  },
  created() {
    if (process.env.DEBUG) this.setFormData();
  },
  methods: {
    allocateBudget() {
      console.log(this.formData);
      this.$utilsStore.setLoading(true);
      this.$api
        .patch(`proposals/${this.proposal.id}/`, this.formData)
        .then((res) => {
          console.log('res: ', res)
          this.$utilsStore.setLoading(false);
          this.showDialog = false;
        })
        .catch((err) => {
          this.formErrors = err.response.data;
          this.$utilsStore.setLoading(false);
        });
    },
    cancelUpdate() {
      // Cancel the creation and close the dialog.
      this.showDialog = false;
    },

    setFormData() {
      this.formData = {
        budget_allocation: null,
      };
    },
  },

  watch: {
    showPopup(newValue, oldValue) {
      this.showDialog = newValue;
    },
    showDialog(newValue, oldValue) {
      this.$emit("showPopupChanged", newValue);
    },
  },
};
</script>
