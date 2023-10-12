<template>
  <div align="center">
    <h4 class="text-h6 q-my-sm">Update Profile</h4>
    <q-card class="q-ma-sm q-pa-md" style="max-width: 40rem">
      <q-form @submit="updateUserProfile">
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
              v-model="formData.designation"
              label="Your Designation"
              :rules="nameRules"
              required
            ></q-input>
          </div>
        </div>

        <div class="flex flex-center">
          <q-btn type="submit" color="primary" label="Update Profile"></q-btn>
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$authStore.currentUser,
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
    this.setFormData();
    this.getFaculties();
    this.getQualifications();
  },
  methods: {
    updateUserProfile() {
      // Handle form submission here
      this.$utilsStore.setLoading(true);
      this.formData["username"] = this.formData["email"];
      this.formData["token"] = this.$authStore.token;
      this.$api
        .post("accounts/update-user/", this.formData)
        .then((res) => {
          const token = res.data.token;
          const user = res.data.user;
          this.$authStore.setUserAndToken(user, token);
          this.$utilsStore.setLoading(false);
        })
        .catch((err) => {
          this.$utilsStore.setLoading(false);
          this.errorResponse = err.response;
        });
    },

    getFaculties() {
      this.$api.get("faculties/").then((res) => {
        this.faculties = res.data;
      });
    },

    getQualifications() {
      this.$api.get("qualifications/").then((res) => {
        this.qualifications = res.data;
      });
    },

    setFormData() {
      this.formData = {
        email: this.user.email,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        phone: this.user.profile.phone,
        faculty: this.user.profile.faculty.id,
        department: this.user.profile.department.id,
        qualification: this.user.profile.qualification.id,
        designation: this.user.profile.designation,
      };
    },
  },
};
</script>
