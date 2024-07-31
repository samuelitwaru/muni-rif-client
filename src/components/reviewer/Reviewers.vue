<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />
        <q-breadcrumbs-el label="Reviewers" icon="people" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
    <div align="right" class="q-ma-sm">
      <router-link to="/reviewers/create">
        <q-btn color="primary" outline label="add reviewer" @click="onClick" />
      </router-link>
    </div>
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
        <tr v-for="item in reviewers" :key="item.id">
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
            <router-link :to="`/reviewers/${item.id}`">
              <q-btn
                label="View"
                flat
                color="primary"
                @click="editItem(item)"
              />
            </router-link>
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
  name: "ReviewerList",
  data() {
    return {
      formData: {
        title: "",
      },
      reviewers: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getReviewers();
    },
    getReviewers() {
      this.$api.get("users/?groups__name__in=reviewer").then((res) => {
        this.reviewers = res.data;
      });
    },

    deleteItem(id) {
      if (confirm("Delete this reviewer?")) {
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
