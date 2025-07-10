<template>
  <div align="center">
    <message-box :message="this.message" @close="this.message = ''" />
    <error-message-modal :errorResponse="errorResponse" />
    <q-card class="q-my-lg" style="min-width: 22rem">
      <q-card-section>
        <h3 class="text-h6">Password Reset</h3>
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

          <br />
          <br />

          <q-separator spaced />

          <router-link to="/index/account/signin">
            <q-btn flat color="primary" label="Sign in"></q-btn>
          </router-link>
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
    if (process.env.DEBUG) {
      this.setFormData();
    }
  },
  methods: {
    resetPassword() {
      this.$utilsStore.setLoading(true);
      this.$api
        .post("accounts/reset-password/", this.formData)
        .then((res) => {
          this.$utilsStore.setLoading(false);
          this.message = res.data.detail;
        })
        .catch((err) => {
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
