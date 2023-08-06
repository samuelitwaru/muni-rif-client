<template>
  <div align="center">
    <q-card class="q-ma-md" style="max-width: 500px">
      <q-card-section>
        <h2 class="text-h6">Password Reset</h2>
      </q-card-section>

      <q-card-section>
        <q-form @submit="submitForm">
          <q-input
            outlined
            dense
            v-model="formData.email"
            label="Email"
            type="email"
            :rules="emailRules"
            required
          ></q-input>

          <q-btn type="submit" color="primary" label="Reset Password"></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: "",
      },
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
    };
  },
  methods: {
    submitForm() {
      // Handle form submission here (Password reset logic)
      console.log("Form submitted:", this.formData);
    },
  },
};
</script>
