<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />
        <q-breadcrumbs-el label="Applicants" icon="people" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />

    <q-markup-table class="q-ma-sm" flat bordered>
      <thead>
        <tr>
          <th align="left">First Name</th>
          <th align="left">Last Name</th>
          <th align="left">Email</th>
          <th align="left">Telephone</th>
          <th align="left">Qualification</th>
          <th align="left">Status</th>
          <th align="left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in applicants" :key="item.id">
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.profile.phone }}</td>
          <td>{{ item.profile.qualification_name }}</td>
          <td>
            <span class="text-green" v-if="item.is_active">ACTIVE</span
            ><span class="text-red" v-else>INACTIVE</span>
          </td>
          <td>
            <q-btn
              icon="delete"
              flat
              color="primary"
              @click="deleteItem(item.id)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>
export default {
  name: "ApplicantList",
  data() {
    return {
      formData: {
        title: "",
      },
      applicants: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getApplicants();
    },
    getApplicants() {
      this.$api.get("users/?groups__name__in=applicant").then((res) => {
        this.applicants = res.data;
      });
    },

    deleteItem(id) {
      if (confirm("Delete this applicant?")) {
        this.$api.delete(`users/${id}`).then((res) => {
          if (res.status == 204) {
            this.init();
          }
        });
      }
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
