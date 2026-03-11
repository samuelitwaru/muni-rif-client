<template>
  <div>
    <q-btn
      v-if="showButton"
      icon="edit"
      color="primary"
      @click="showDialog = true"
      dense
      size="sm"
      flat
    />
    <q-form @submit="awardProject">
      <q-dialog v-model="showDialog" persistent>
        <q-card style="width: 700px">
          <q-card-section class="flex justify-between">
            <div class="text-h6">Award Project</div>
            <!-- close btn -->
            <q-btn icon="close" flat dense round @click="closeDialog" />
          </q-card-section>
          <q-separator />

          <q-card-section class="q-pt-lg q-pb-md">
            <div class="q-pb-sm"><label class="text-grey">Message</label></div>
            <q-editor v-model="formData.message" />
          </q-card-section>
          <q-separator spaced />
          <q-card-actions align="right">
            <q-btn flat color="primary" label="Cancel" @click="closeDialog" />
            <q-btn
              color="primary"
              label="Award Project"
              @click="awardProject"
              :disable="!formData.message"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    proposal: {
      type: Object,
      required: true,
    },
    showButton: {
      type: Boolean,
      required: false,
      default: false,
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
      showDialog: this.showPopup,
      formData: {
        message: "",
      },
      formErrors: {},
    };
  },
  created() {
    this.setFormData();
  },
  methods: {
    awardProject() {
      this.$utilsStore.setLoading(true);
      this.$api
        .post(`proposals/${this.proposal.id}/award/`, this.formData)
        .then((res) => {
          console.log("res: ", res);
          this.$utilsStore.setLoading(false);
          this.closeDialog();
          this.$emit("project-awarded", res.data);
        })
        .catch((err) => {
          this.formErrors = err.response.data;
          this.$utilsStore.setLoading(false);
        });
    },
    closeDialog() {
      // Cancel the creation and close the dialog.
      this.showDialog = false;
      this.$emit("close");
    },

    setFormData() {
      this.formData = {
        message: `
        <p>Congratulations!</p>

        <p>Your proposal <b>"${this.proposal.title}"</b> has been selected for funding. We are excited to support your project and look forward to seeing the positive impact it will have on our community.</p>

        <p>Please let us know if you have any questions or need further assistance as you move forward with your project.</p>

        <p>Best regards, </p>
        <p>The Grants Management Office.</p>
        `,
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
