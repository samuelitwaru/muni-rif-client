<template>
  <div>
    <q-btn
      v-if="showButton"
      label="New Proposal"
      color="primary"
      @click="showDialog = true"
    />
    <q-form @submit="createProposal" class="q-gutter-md">
      <q-dialog v-model="showDialog" persistent>
        <q-card style="width: 500px">
          <q-card-section>
            <div class="text-h6">New Proposal</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pt-lg q-pb-md">
            <label>Name your proposal</label>
            <br />
            <br />
            <q-input
              v-model="formData.title"
              label="Title of your proposal"
              outlined
              required
            />
          </q-card-section>
          <q-separator spaced />
          <q-card-actions align="right">
            <q-btn flat color="primary" label="Cancel" @click="cancelCreate" />
            <q-btn color="primary" label="Create" @click="createProposal" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-form>
  </div>
</template>

<script>
export default {
  props: {
    showButton: {
      type: Boolean,
      required: true,
      default: true,
    },
    showPopup: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      showDialog: false,
      formData: {
        title: "",
      },
    };
  },
  created() {
    if (process.env.DEBUG) this.setFormData();
  },
  methods: {
    createProposal() {
      this.$utilsStore.setLoading(true);
      this.formData["user"] = this.$authStore.currentUser.id;
      this.$api.post("proposals/", this.formData).then((res) => {
        this.$router.push(`/applicant/proposals/${res.data.id}`);
        this.$utilsStore.setLoading(false);
        this.showDialog = false;
      });
    },
    cancelCreate() {
      // Cancel the creation and close the dialog.
      this.showDialog = false;
    },

    setFormData() {
      this.formData = {
        title: "Muni RIF Management System",
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
