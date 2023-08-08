<template>
  <div align="center">
    <loading-component :loading="loading" />
    <q-card class="q-ma-md" style="max-width: 22rem">
      <q-card-section>
        <q-form @submit="login">
          <h2 class="text-h6">
            <q-avatar>
              <img src="~assets/logo.jpeg" />
            </q-avatar>
            Login Form
          </h2>
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
          <div class="">
            <q-btn type="submit" color="primary" label="Login"></q-btn>
            <div align="center" class="flex justify-between">
              <div class="col"><hr /></div>
              <span class="col">or</span>
              <div class="col"><hr /></div>
            </div>
            <router-link to="/account/signup">
              <q-btn type="submit" flat color="primary" label="Sign up"></q-btn>
            </router-link>
          </div>
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
        email: "samuelitwaru@gmail.com",
        password: "bratz123",
      },
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.formData["username"] = this.formData["email"];
      this.$api
        .post(`/accounts/login/`, this.formData)
        .then((res) => {
          const token = res.data.token;
          const user = res.data.user;
          console.log(user);
          this.$authStore.setUserAndToken(user, token);
          this.loading = false;
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
};
</script>
