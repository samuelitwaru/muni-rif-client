<template>
  <div align="center">
    <h4 class="text-h6 q-my-sm">Change Password</h4>
    <q-card class="my-card q-ma-sm q-pa-md">
      <q-form @submit="changePassword">
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
              required
            />
          </div>
          <div class="col q-ml-sm">
            <q-input
              v-model="formData.confirm_password"
              label="Confirm New Password"
              outlined
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
    };
  },
  methods: {
    changePassword() {
      this.$utilsStore.setLoading(true);
      this.$api
        .post("accounts/change-password/", this.formData)
        .then((res) => {
          this.$utilsStore.setLoading(false);
          this.$router.push("/account/profile");
        })
        .catch((err) => {
          this.$utilsStore.setLoading(false);
          this.errorResponse = err.response;
        });
    },
  },
};
</script>
