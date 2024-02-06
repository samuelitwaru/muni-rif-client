<template>
  <div align="center">
    <div class="flex justify-center">
      <q-card class="q-mt-l" style="min-width: 23rem">
        <q-card-section>
          <q-form @submit="login" ref="form" @reset="resetForm">
            <h2 class="text-h6">Login</h2>

            <div>
              <small class="text-caption text-red"
                ><strong>{{ formErrors.email }}</strong></small
              >
            </div>

            <q-input
              outlined
              dense
              v-model="formData.email"
              label="Email"
              type="email"
              :rules="emailRules"
              required
            ></q-input>

            <q-input
              outlined
              dense
              v-model="formData.password"
              label="Password"
              type="password"
              :rules="passwordRules"
              required
            ></q-input>

            <small class="text-caption text-red">
              {{ formErrors.password }}
            </small>
            <div class="">
              <div class="flex justify-between">
                <div></div>
                <q-btn type="submit" color="primary" label="Login"></q-btn>
              </div>

              <q-separator spaced />
              Don't have an account?
              <router-link to="/index/account/signup">
                <q-btn
                  type="submit"
                  flat
                  color="primary"
                  label="Sign up"
                ></q-btn>
              </router-link>
            </div>
            <q-separator spaced style="width: 40%" />
            <router-link to="/index/account/password-reset" class="q-my-auto">
              <small>FORGOT PASSWORD</small>
            </router-link>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      formData: {
        email: "",
        password: "",
      },
      formErrors: {
        email: "",
        password: "",
      },
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  created() {
    if (process.env.DEBUG) this.setFormData();
  },
  methods: {
    login() {
      this.formErrors = {};
      this.$utilsStore.setLoading(true);
      this.formData["username"] = this.formData["email"];
      this.$api
        .post(`/accounts/login/`, this.formData)
        .then((res) => {
          const token = res.data.token;
          const user = res.data.user;
          this.$authStore.setUserAndToken(user, token);
          this.$utilsStore.setLoading(false);
          var _next = this.$route.query._next || "/";
          this.$router.push(_next);
          this.$utilsStore.setLoading(false);
        })
        .catch((err) => {
          this.$utilsStore.setLoading(false);
          this.formErrors.email = err.response.data.error;
        });
    },
    setFormData() {
      this.formData = { email: "samuelitwaru@gmail.com", password: "bratz123" };
    },

    resetForm() {
      this.formData = {
        email: this.formData.email,
        password: "",
      };
    },
  },
};
</script>
