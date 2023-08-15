<template>
  <div>
    <loading-component :loading="loading" />
    <q-btn
      label="Start New Proposal"
      color="primary"
      @click="showDialog = true"
    />
    <q-form @submit="createProposal" class="q-gutter-md">
      <q-dialog v-model="showDialog" persistent>
        <q-card style="width: 500px">
          <q-card-section>
            <div class="text-h6">Start New Proposal</div>
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
      this.loading = true;
      this.$api.post("proposals/", this.formData).then((res) => {
        this.$router.push(`/proposals/${res.data.id}/edit`);
        this.loading = false;
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
};
</script>
