<template>
  <div align="center">
    <q-card class="q-ma-md" style="max-width: 22rem">
      <q-card-section>
        <q-form @submit="changePassword">
          <q-input
            v-model="formData.old_password"
            label="Current Password"
            type="password"
            required
          />
          <q-input
            v-model="formData.new_password"
            label="New Password"
            type="password"
            required
          />
          <q-input
            v-model="formData.confirm_password"
            label="Confirm New Password"
            type="password"
            required
          />
          <q-btn
            class="q-my-sm"
            type="submit"
            color="primary"
            label="Change Password"
          />
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
      this.$api.post("accounts/change-password/", this.formData).then((res) => {
        this.$utilsStore.setLoading(false);
        this.$router.push("/account/profile");
      });
    },
  },
};
</script>
