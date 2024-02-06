<template>
  <div align="center">
    <q-card class="q-ma-md" style="min-width: 22rem">
      <q-card-section>
        <h4 class="text-h6 q-my-sm">Set New Password</h4>
        <q-form @submit="setPassword">
          <q-input
            dense
            outlined
            v-model="formData.new_password"
            label="New Password"
            type="password"
            required
          />
          <br />
          <q-input
            dense
            outlined
            v-model="formData.confirm_password"
            label="Confirm New Password"
            type="password"
            required
          />
          <q-separator spaced />
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
        this.$router.push("/index/account/signin");
      });
    },
  },
};
</script>
