<template>
  <div align="center">
    <q-card class="q-ma-md" style="max-width: 22rem">
      <q-card-section>
        <q-form @submit="setPassword">
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
            label="Set Password"
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
        token: this.$route.params.token,
        new_password: "",
        confirm_password: "",
      },
    };
  },
  methods: {
    setPassword() {
      this.$utilsStore.setLoading(true);
      this.$api.post("accounts/set-password/", this.formData).then((res) => {
        this.$utilsStore.setLoading(false);
        this.$router.push("/account/profile");
      });
    },
  },
};
</script>
