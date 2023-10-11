<template>
  <div align="center">
    <error-message-modal :errorResponse="errorResponse" />
    <q-card class="q-ma-sm q-pa-md" style="max-width: 40rem">
      <h2 class="text-h6">
        <q-avatar>
          <img src="~assets/logo.jpeg" />
        </q-avatar>
        Signup Form
      </h2>
      <q-form @submit="signup">
        <div class="row q-col-gutter-xs">
          <div class="col">
            <q-input
              outlined
              dense
              v-model="formData.first_name"
              label="First Name"
              :rules="nameRules"
              required
            ></q-input>
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="formData.last_name"
              label="Last Name"
              :rules="nameRules"
              required
            ></q-input>
          </div>
        </div>

        <div class="row q-col-gutter-xs">
          <div class="col">
            <q-input
              outlined
              dense
              v-model="formData.email"
              label="Email"
              type="email"
              :rules="emailRules"
              required
            ></q-input>
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="formData.phone"
              label="Telephone Number"
              type="tel"
              :rules="phoneRules"
              required
            ></q-input>
          </div>
        </div>

        <radio-field
          align="left"
          label="Gender"
          @input="formData.gender = $event"
          v-model="formData.gender"
          :options="[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]"
        />

        <div class="row q-col-gutter-xs q-my-sm">
          <div class="col">
            <q-select
              outlined
              dense
              v-model="formData.faculty"
              :options="faculties"
              option-value="id"
              option-label="name"
              label="Faculty"
              emit-value
              map-options
            />
          </div>
          <div class="col">
            <q-select
              outlined
              dense
              v-model="formData.department"
              :options="
                this.faculties.find((f) => f.id === this.formData.faculty)
                  ?.departments
              "
              option-value="id"
              option-label="name"
              label="Department"
              emit-value
              map-options
            />
          </div>
        </div>

        <div class="row q-col-gutter-xs">
          <div class="col">
            <q-select
              dense
              outlined
              v-model="formData.qualification"
              :options="qualifications"
              label="Qualification"
              option-value="id"
              option-label="name"
              map-options
              emit-value
            />
          </div>
          <div class="col">
            <q-input
              outlined
              dense
              v-model="formData.first_name"
              label="Your Designation"
              :rules="nameRules"
              required
            ></q-input>
          </div>
        </div>

        <q-input
          outlined
          dense
          v-model="formData.password"
          label="Password"
          type="password"
          :rules="passwordRules"
          required
        ></q-input>

        <q-input
          outlined
          dense
          v-model="formData.confirm_password"
          label="Confirm Password"
          type="password"
          :rules="confirmPasswordRules"
          required
        ></q-input>

        <div class="flex flex-center">
          <q-btn type="submit" color="primary" label="Sign Up"></q-btn>
        </div>

        <div align="center" class="flex justify-between">
          <div class="col"><hr /></div>
          <span class="col">or</span>
          <div class="col"><hr /></div>
        </div>
        <router-link to="/index/account/signin">
          <q-btn type="submit" flat color="primary" label="Sign in"></q-btn>
        </router-link>
      </q-form>

      <!-- <div class="flex flex-center">or</div>

      <q-card-actions class="flex flex-center">
        <q-btn type="button" @click="signUpWithGoogle">
          <q-avatar size="sm">
            <img src="~assets/google.jpg" />
          </q-avatar>
          Join with google
        </q-btn>
      </q-card-actions> -->
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      faculties: [],
      departments: [],
      qualifications: [],
      formData: {
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        gender: "",
        faculty: null,
        department: null,
        qualification: null,
        password: "",
        confirm_password: "",
      },
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      nameRules: [(v) => !!v || "Field is required"],
      phoneRules: [
        (v) => !!v || "Telephone number is required",
        (v) => /^[0-9]{10}$/.test(v) || "Telephone number must be 10 digits",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be at least 8 characters long",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirm Password is required",
        (v) => v === this.formData.password || "Passwords do not match",
      ],
      errorResponse: {},
    };
  },

  created() {
    // this.setFormData();
    this.getFaculties();
    this.getQualifications();
  },
  methods: {
    signup() {
      // Handle form submission here
      this.$utilsStore.setLoading(true);
      this.formData["username"] = this.formData["email"];
      this.$api
        .post("accounts/signup/", this.formData)
        .then((res) => {
          this.$utilsStore.setLoading(false);
          this.$router.push("/account/signin");
        })
        .catch((err) => {
          this.$utilsStore.setLoading(false);
          this.errorResponse = err.response;
        });
      // console.log("Form submitted:", this.formData);
    },

    getFaculties() {
      this.$api.get("faculties/").then((res) => {
        this.faculties = res.data;
        console.log(this.faculties);
      });
    },

    getQualifications() {
      this.$api.get("qualifications/").then((res) => {
        this.qualifications = res.data;
      });
    },

    signUpWithGoogle() {},

    setFormData() {
      this.formData = {
        email: "samuel@gmail.com",
        first_name: "Samuel",
        last_name: "Itwaru",
        phone: "0781902516",
        gender: "Male",
        faculty: null,
        department: null,
        qualification: null,
        password: "bratz123",
        confirm_password: "bratz123",
      };
    },
  },
};
</script>
