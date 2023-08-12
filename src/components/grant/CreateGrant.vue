<template lang="">
  <div class="container">
    <!-- Fixed column -->
    <div class="fixed-column">
      <!-- Add your content here for the fixed column -->
      <div style="height: 100%">
        <q-list>
          <a href="#problem">
            <q-item clickable v-ripple>
              <q-item-section>The Problem Statment</q-item-section>
            </q-item>
          </a>
          <a href="#solution">
            <q-item clickable v-ripple>
              <q-item-section>Proposed Solution</q-item-section>
            </q-item>
          </a>
          <a href="#budget">
            <q-item clickable v-ripple>
              <q-item-section>Budget Summary</q-item-section>
            </q-item>
          </a>
          <a href="#attachments">
            <q-item clickable v-ripple>
              <q-item-section>Attachments</q-item-section>
            </q-item>
          </a>
        </q-list>
      </div>
    </div>

    <!-- Scrollable column -->
    <div class="scrollable-column">
      <h2 class="text-h6">Grant Proposal Form</h2>
      <q-form @submit="submitForm">
        <q-input
          outlined
          dense
          class="q-my-sm"
          v-model="formData.subject"
          label="Subject of the project"
          placeholder="Subject of the project"
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

        <!-- <div class="row"> -->
        <div id="problem" class="col q-my-sm">
          <label>Problem Statement</label>
          <q-editor v-model="formData.problem" min-height="20rem" />
        </div>
        <div id="solution" class="col q-my-sm">
          <label>Proposed Solution</label>
          <q-editor v-model="formData.solution" min-height="20rem" />
        </div>
        <!-- </div> -->
        <div id="budget" class="q-my-sm">
          <label>Budget Summary</label>
          <q-editor v-model="formData.budget" min-height="20rem" />
        </div>
        <div id="attachments">
          <h5 class="q-my-sm">Attachments</h5>
          <div class="row">
            <div class="col q-py-sm q-mr-sm">
              <label>Detailed Budget</label>
              <q-file dense v-model="file" label="Attach a file" filled />
            </div>

            <div class="col q-py-sm">
              <label>Letters of Support</label>
              <q-file dense v-model="file" label="Attach a file" filled />
            </div>
          </div>
        </div>

        <!-- <rich-text-edit></rich-text-edit> -->
        <!-- <q-btn color="primary" type="submit" label="Submit" /> -->
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        subject: "",
        problem: "",
        solution: "",
        budget: "",
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

<style>
body,
html {
  height: 100%;
  margin: 0;
}

.container {
  display: flex;
  height: 100%;
}

.fixed-column {
  flex: 0 0 auto;
  /* width: 300px; Change the width of the fixed column as needed */
  background-color: #f2f2f2;
  /* padding: 20px; */
}

.scrollable-column {
  flex: 1 1 auto;
  max-height: calc(
    100vh - 40px
  ); /* Adjust the max height to leave space for padding */
  overflow-y: auto;
  padding: 10px;
  scroll-behavior: smooth;
}
</style>
