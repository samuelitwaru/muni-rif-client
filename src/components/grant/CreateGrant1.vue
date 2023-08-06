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

        <div class="row">
          <div>
            <q-list bordered>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="bluetooth" />
                </q-item-section>
                <q-item-section>Icon as avatar</q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col">
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
              <div class="row">
                <div class="col q-pr-sm q-my-sm">
                  <label>Problem Statement</label>
                  <q-editor v-model="formData.problem" min-height="10rem" />
                </div>
                <div class="col q-my-sm">
                  <label>Proposed Solution</label>
                  <q-editor v-model="formData.solution" min-height="10rem" />
                </div>
              </div>
              <div class="q-my-sm">
                <label>Budget Summary</label>
                <q-editor v-model="formData.budget" min-height="10rem" />
              </div>
              <div>
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
              <q-btn color="primary" type="submit" label="Submit" />
            </q-form>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
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
