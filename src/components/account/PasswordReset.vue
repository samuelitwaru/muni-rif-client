<template>
  <div align="center">
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
      this.$utilsStore.setLoading(true);
      this.$api
        .post("accounts/reset-password/", this.formData)
        .then((res) => {
          console.log(res.data);
          this.$utilsStore.setLoading(false);
          this.message = res.data.detail;
        })
        .catch((err) => {
          console.log(err.response);
          this.$utilsStore.setLoading(false);
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
