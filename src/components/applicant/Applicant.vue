<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />
        <q-breadcrumbs-el icon="people" to="/applicants" label="Applicants" />
        <q-breadcrumbs-el
          :label="`${formData.first_name} ${formData.last_name}`"
          icon="person"
        />
      </q-breadcrumbs>
    </div>
    <q-separator spaced size="0.5px" />
    <div class="flex justify-center">
      <q-card class="my-card">
        <q-form class="q-gutter-md">
          <div class="q-pa-md">
            <div class="row q-col-gutter-xs q-my-sm">
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

            <div class="row q-col-gutter-xs q-my-sm">
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
            <!-- {{ formData.gender }} -->

            <q-radio
              v-model="formData.gender"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="Male"
              label="Male"
            />
            <q-radio
              v-model="formData.gender"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="Female"
              label="Female"
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
                  v-model="formData.designation"
                  label="Your Designation"
                  :rules="nameRules"
                  required
                ></q-input>
              </div>
            </div>

            <div class="q-my-sm">
              <label for="">Themes</label>
              <q-card class="row" flat bordered style="min-height: 4rem">
                <div
                  class="col-10 flex content-center"
                  style="max-width: 400px"
                  :class="{ 'truncate-chip-labels': true }"
                >
                  <q-chip
                    v-for="theme in themes.filter((item) =>
                      formData.themes.includes(item.id)
                    )"
                    :key="theme.id"
                    class="glossy"
                    :label="theme.title"
                    removable
                    @remove="deselectTheme(theme.id)"
                  />
                </div>
                <q-btn class="col-2" color="primary" flat icon="add">
                  <q-popup-proxy cover :breakpoint="1000">
                    <q-card class="my-card">
                      <q-card-section>
                        <div class="text-h6">Select Themes</div>
                      </q-card-section>
                      <q-card-section>
                        <q-list bordered separator>
                          <q-item
                            style="cursor: pointer"
                            clickable
                            @click="selectTheme(theme.id)"
                            v-for="theme in themes.filter(
                              (item) => !formData.themes.includes(item.id)
                            )"
                            :key="theme.id"
                          >
                            <q-item-section>{{ theme.title }}</q-item-section>
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-popup-proxy>
                </q-btn>
              </q-card>
            </div>

            <q-checkbox
              left-labe
              v-model="formData.is_active"
              label="Is Active"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
          </div>
          <div class="q-pa-md" align="center">
            <q-btn color="primary" label="Confirm" @click="updateApplicant" />
          </div>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
// import AutoForm from "components/widgets/AutoForm.vue";
import { generateRandomString } from "src/utils/helpers";
export default {
  // components: { AutoForm },
  name: "CreateApplicant",
  data() {
    return {
      loading: false,
      showDialog: false,
      faculties: [],
      qualifications: [],
      themes: [],
      formData: {
        email: "",
        first_name: "",
        last_name: "",
        is_active: false,
        phone: "",
        gender: "Female",
        designation: "",
        faculty: null,
        department: null,
        qualification: null,
        password: "",
        themes: [],
      },
    };
  },
  created() {
    this.getApplicant();
    this.getFaculties();
    this.getQualifications();
    this.getThemes();
  },
  methods: {
    getApplicant() {
      this.$api.get(`users/${this.$route.params.user_id}/`).then((res) => {
        if (res.status == 200) {
          this.applicant = res.data;
          this.setFormData();
        }
      });
    },
    updateApplicant() {
      this.formData["username"] = this.formData["email"];
      this.$utilsStore.setLoading(true);
      this.$api
        .put(`users/${this.applicant.id}/update-applicant/`, this.formData)
        .then((res) => {
          this.$router.push(`/applicants/`);
          this.$utilsStore.setLoading(false);
        });
    },

    getThemes() {
      this.$api.get("themes/").then((res) => {
        this.themes = res.data;
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

    selectTheme(themeId) {
      if (this.formData.themes.includes(themeId)) {
        this.formData.themes.filter((item) => item != themeId);
      } else {
        this.formData.themes.push(themeId);
      }
    },

    deselectTheme(themeId) {
      if (this.formData.themes.includes(themeId)) {
        this.formData.themes = this.formData.themes.filter(
          (item) => item != themeId
        );
      }
    },

    cancelCreate() {
      // Cancel the creation and close the dialog.
      this.showDialog = false;
    },

    setFormData() {
      console.log(this.applicant.profile);
      this.formData = {
        first_name: this.applicant.first_name,
        last_name: this.applicant.last_name,
        is_active: this.applicant.is_active,
        email: this.applicant.email,
        phone: this.applicant.profile.phone,
        gender: this.applicant.profile.gender,
        designation: this.applicant.profile.designation,
        qualification: this.applicant.profile.qualification,
        department: this.applicant.profile.department,
        faculty: this.applicant.profile.faculty,
        themes: this.applicant.profile.themes.map((theme) => theme.theme),
      };
    },
  },

  watch: {
    showPopup(newValue, oldValue) {
      this.showDialog = newValue;
    },
    showDialog(newValue, oldValue) {
      this.$emit("showPopupChanged", newValue);
    },
  },
};
</script>
