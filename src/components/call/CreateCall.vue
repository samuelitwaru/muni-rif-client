<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />
        <q-breadcrumbs-el label="Create New Call" icon="campaign" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced size="0.5px" />
    <q-form @submit="createCall" class="q-gutter-md flex justify-center">
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">New Call</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-lg q-pb-md">
          <q-input
            v-model="formData.title"
            label="Title of your call"
            outlined
            required
          />

          <div class="row q-col-gutter-xs q-my-sm">
            <q-input
              class="col"
              v-model="formData.date_from"
              type="date"
              label="Period Starts From?"
              outlined
            />
            <q-input
              class="col"
              v-model="formData.date_to"
              type="date"
              label="Period Ends On?"
              outlined
            />
          </div>

          <q-input
            class="q-my-sm"
            v-model="formData.submission_date"
            type="date"
            label="Applications Submission Deadline?"
            outlined
          />
          <q-input
            class="q-my-sm"
            v-model="formData.review_date"
            type="date"
            label="Applications Review Deadline?"
            outlined
          />
          <q-input
            class="q-my-sm"
            v-model="formData.selection_date"
            type="date"
            label="Applications Selection Deadline?"
            outlined
          />
          <q-checkbox
            v-model="formData.is_active"
            label="Set this as currently active period"
          />
        </q-card-section>
        <q-separator spaced />
        <q-card-actions align="right">
          <q-btn color="primary" label="Create" @click="createCall" />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "CreateCall",
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
    createCall() {
      this.$utilsStore.setLoading(true);
      this.$api.post("calls/", this.formData).then((res) => {
        this.$router.push(`/calls/`);
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
        title: "",
        is_active: false,
        date_from: "",
        date_to: "",
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
