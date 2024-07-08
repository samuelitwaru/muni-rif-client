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
            <div class="text-red">
              <ul class="q-ma-xs">
                <li v-for="err in formErrors?.title" :key="err">{{ err }}</li>
              </ul>
            </div>

            <br />

            <q-select
              v-model="formData.theme"
              :options="themes"
              label="Select Theme"
              outlined
              option-value="id"
              option-label="title"
              map-options
              emit-value
            />
            <div class="text-red">
              <ul class="q-ma-xs">
                <li v-for="err in formErrors?.theme" :key="err">{{ err }}</li>
              </ul>
            </div>
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
import { getThemes } from "src/utils/api";

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
      themes: [],
      formData: {
        title: "",
        theme: null,
        call: this.$dataStore.currentCall.id,
      },
      formErrors: {},
    };
  },
  created() {
    if (process.env.DEBUG) this.setFormData();
    getThemes().then((data) => (this.themes = data));
    this.formData.call = this.$dataStore.currentCall.id;
  },
  methods: {
    createProposal() {
      this.$utilsStore.setLoading(true);
      this.formErrors = {};
      this.formData["user"] = this.$authStore.currentUser.id;
      this.$api
        .post("proposals/", this.formData)
        .then((res) => {
          this.$router.push(`/applicant/proposals/${res.data.id}`);
          this.$utilsStore.setLoading(false);
          this.showDialog = false;
        })
        .catch((err) => {
          console.log(err.response.data);
          this.formErrors = err.response.data;
          this.$utilsStore.setLoading(false);
        });
    },
    cancelCreate() {
      // Cancel the creation and close the dialog.
      this.showDialog = false;
    },

    setFormData() {
      this.formData = {
        title: "",
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
