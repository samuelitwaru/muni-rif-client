<template>
  <div align="center">
    <loading-component :loading="loading" />
    <message-box :message="this.message" @close="this.message = ''" />
    <error-message-modal :errorResponse="errorResponse" />
    <q-card class="q-ma-md" style="max-width: 500px">
      <q-card-section>
        <h2 class="text-h6">Password Reset</h2>
      </q-card-section>

      <q-card-section>
        <q-form @submit="resetPassword">
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
      loading: false,
      message: "",
      errorResponse: {},
      formData: {
        email: "",
      },
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
    };
  },
  created() {
    this.setFormData();
  },
  methods: {
    resetPassword() {
      this.loading = true;
      this.$api
        .post("accounts/reset-password/", this.formData)
        .then((res) => {
          console.log(res.data);
          this.loading = false;
          this.message = res.data.detail;
        })
        .catch((err) => {
          console.log(err.response);
          this.loading = false;
          this.errorResponse = err.response;
        });
    },

    setFormData() {
      this.formData = {
        email: "samuelitwaru@gmail.com",
      };
    },
  },
};
</script>
