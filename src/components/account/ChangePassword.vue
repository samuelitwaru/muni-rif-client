<template>
  <div align="center">
    <loading-component :loading="loading" />
    <q-card class="q-ma-md" style="max-width: 22rem">
      <q-card-section>
        <q-form @submit="changePassword">
          <q-input
            v-model="oldPassword"
            label="Old Password"
            type="password"
            required
          />
          <q-input
            v-model="newPassword"
            label="New Password"
            type="password"
            required
          />
          <q-input
            v-model="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            required
          />
          <q-btn
            class="q-my-sm"
            type="submit"
            color="primary"
            label="Change Password"
            :disable="isSubmitting"
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
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      isSubmitting: false,
    };
  },
  methods: {
    async changePassword() {
      if (this.newPassword !== this.confirmNewPassword) {
        this.$q.notify({
          message: "New passwords do not match.",
          type: "negative",
        });
        return;
      }

      this.isSubmitting = true;

      try {
        // Perform your password change logic here
        // For example, call an API to change the password
        // After the password is changed, reset the form and show a success notification
        // You can also emit an event to notify a parent component
        // this.$emit('passwordChanged');
        // this.resetForm();
        this.$q.notify({
          message: "Password changed successfully.",
          type: "positive",
        });
      } catch (error) {
        this.$q.notify({
          message: "An error occurred while changing the password.",
          type: "negative",
        });
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.oldPassword = "";
      this.newPassword = "";
      this.confirmNewPassword = "";
    },
  },
};
</script>
