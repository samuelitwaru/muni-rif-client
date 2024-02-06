<template>
  <div align="center">
    <h4 class="text-h6 q-my-sm">Change Password</h4>
    <q-card class="my-card q-ma-sm q-pa-md" style="min-width: 20rem">
      <q-form @submit="changePassword">
        <div>
          <small class="text-caption text-red"
            ><strong>{{ formErrors.old_password }}</strong></small
          >
        </div>
        <q-input
          v-model="formData.old_password"
          label="Current Password"
          outlined
          class="q-my-sm"
          dense
          type="password"
          required
        />

        <div class="row">
          <div class="col">
            <q-input
              v-model="formData.new_password"
              outlined
              dense
              class="q-my-sm"
              label="New Password"
              type="password"
              :rules="passwordRules"
              required
            />
          </div>
          <div class="col q-ml-sm">
            <q-input
              v-model="formData.confirm_password"
              label="Confirm New Password"
              outlined
              :rules="confirmPasswordRules"
              dense
              class="q-my-sm"
              type="password"
              required
            />
          </div>
        </div>
        <q-btn
          class="q-my-sm"
          type="submit"
          color="primary"
          label="Change Password"
        />
      </q-form>
      <!-- </q-card-section> -->
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      errorResponse: null,
      formData: {
        old_password: "",
        new_password: "",
        confirm_password: "",
      },
      formErrors: {
        old_password: "",
        new_password: "",
        confirm_password: "",
      },
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be at least 8 characters long",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirm Password is required",
        (v) => v === this.formData.new_password || "Passwords do not match",
      ],
    };
  },
  methods: {
    changePassword() {
      this.formErrors = {};
      this.$utilsStore.setLoading(true);
      this.$api
        .post("accounts/change-password/", this.formData)
        .then((res) => {
          this.$utilsStore.setLoading(false);
          this.$router.push("/account/profile");
          window.location.reload();
        })
        .catch((err) => {
          this.$utilsStore.setLoading(false);
          this.errorResponse = err.response;
          this.formErrors.old_password = this.errorResponse.data.detail;
        });
    },
  },
};
</script>
