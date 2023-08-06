<template>
  <div align="center">
    <q-card class="q-ma-sm q-pa-md" style="max-width: 22rem">
      <h2 class="text-h6">
        <q-avatar>
          <img src="~assets/logo.jpeg" />
        </q-avatar>
        Signup Form
      </h2>
      <q-form @submit="submitForm">
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
          v-model="formData.first_name"
          label="First Name"
          :rules="nameRules"
          required
        ></q-input>

        <q-input
          outlined
          dense
          v-model="formData.last_name"
          label="Last Name"
          :rules="nameRules"
          required
        ></q-input>

        <q-input
          outlined
          dense
          v-model="formData.telephone_number"
          label="Telephone Number"
          type="tel"
          :rules="phoneRules"
          required
        ></q-input>

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

        <options-field
          label="Department"
          :options="departments"
          @input="formData.department = $event.value"
        />

        <options-field
          label="Your Hight Qualification"
          :options="qualifications"
          @input="formData.qualification = $event.value"
        />

        <q-input
          outlined
          dense
          v-model="formData.first_name"
          label="Your Designation"
          :rules="nameRules"
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
      </q-form>

      <div class="flex flex-center">or</div>

      <q-card-actions class="flex flex-center">
        <q-btn type="button" @click="signUpWithGoogle">
          <q-avatar size="sm">
            <img src="~assets/google.jpg" />
          </q-avatar>
          Join with google
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: "",
        first_name: "",
        last_name: "",
        telephone_number: "",
        gender: "",
        department: "",
        password: "",
        confirm_password: "",
      },
      departments: [
        { value: 1, label: "Technoscience" },
        { value: 2, label: "Education" },
        { value: 3, label: "Nursing Science" },
        { value: 4, label: "Business" },
      ],
      qualifications: [
        { value: 1, label: "PhD" },
        { value: 2, label: "Maters" },
      ],
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
    };
  },
  methods: {
    submitForm() {
      // Handle form submission here
      console.log("Form submitted:", this.formData);
    },

    signUpWithGoogle() {},
  },
};
</script>
