<template>
  <div align="center">
    <q-card class="q-mt-l" style="min-width: 22rem; height: 25rem">
      <q-card-section>
        <q-form @submit="login" ref="form">
          <input type="hidden" v-model="formData.token" />
          <br />
          <q-inner-loading :showing="true">
            <q-spinner-ios size="50px" color="primary" />
          </q-inner-loading>
          <br />
          <div class="text-h6 q-mt-xl">Signing you in...</div>
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
        token: this.$route.params.token || "",
      },
    };
  },
  created() {
    localStorage.clear();
    this.login();
  },
  methods: {
    login() {
      this.formErrors = {};
      this.$utilsStore.setLoading(true);
      this.formData["username"] = this.formData["email"];
      this.$api
        .post(`/accounts/auto-login/`, this.formData)
        .then((res) => {
          const token = res.data.token;
          const user = res.data.user;
          this.$authStore.setUserAndToken(user, token);
          this.$utilsStore.setLoading(false);

          var _next = this.$route.query._next || "/";
          if (this.$userHasAnyGroups(["reviewer"])) {
            _next = "/proposal-reviews";
          }
          this.$router.push(_next);
          this.$utilsStore.setLoading(false);
        })
        .catch((err) => {
          this.$utilsStore.setLoading(false);
          this.$router.push("/index/account/signin");
          this.$q.notify({
            type: "negative",
            timeout: 0,
            html: true,
            message:
              "Invalid or expired token. <p>Please sign in again or contact <a class='text-secondary' href='mailto:gms@muni.ac.ug'>(gms@muni.ac.ug)</a> for assistance.</p>",
            actions: [
              {
                icon: "close",
                color: "white",
                round: true,
                size: "sm",
                "aria-label": "Dismiss",
              },
            ],
          });
          this.formErrors.email = err.response.data.error;
        });
    },
  },
};
</script>
