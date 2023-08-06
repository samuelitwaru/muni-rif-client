<template>
  <q-page>
    <q-card>
      <q-card-section>
        <h2 class="text-h6">
          <q-avatar>
            <img src="~assets/logo.jpeg" />
          </q-avatar>
          Grant Proposal Form
        </h2>
        <q-form @submit="submitForm">
          <q-input
            outlined
            dense
            class="q-my-sm"
            v-model="formData.subject"
            label="Subject"
            placeholder="Subject of the proposal"
            required
          />

          <q-input
            outlined
            dense
            class="q-my-sm"
            v-model="formData.description"
            label="Project Description"
            placeholder="Provide a brief description about your project"
            type="textarea"
            required
          />
          <div class="q-my-sm">
            <label>Problem Statement</label>
            <tiny-mce></tiny-mce>
          </div>
          <div class="q-my-sm">
            <label>Proposed Solution</label>
            <tiny-mce></tiny-mce>
          </div>
          <div class="q-my-sm">
            <label>Budget Summary</label>
            <tiny-mce></tiny-mce>
          </div>

          <!-- <rich-text-edit></rich-text-edit> -->
          <q-btn color="primary" type="submit" label="Submit" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    submitForm() {
      // Here you can handle the form submission logic, for example, sending the data to a backend server.
      console.log("Form data submitted:", this.formData);

      // After form submission, you can clear the form fields if needed.
      this.formData.name = "";
      this.formData.email = "";
      this.formData.message = "";
    },
  },
};
</script>
