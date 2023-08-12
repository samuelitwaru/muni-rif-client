<template>
  <q-card v-if="user">
    <q-card-section>
      <div class="flex">
        <div>
          <q-icon name="person" size="xl" />
        </div>

        <div>
          <h2 class="text-h6 q-my-auto">
            {{ user.first_name }}
            {{ user.last_name }}
          </h2>
          <p>{{ user.email }}</p>
          <q-separator spaced />
          <p>{{ user.profile?.faculty.name }}</p>
          <p>{{ user.profile?.department.name }}</p>
        </div>
      </div>
      <div class="flex">
        <q-btn flat color="primary" label="Edit Profile" />
        <router-link to="/account/password">
          <q-btn flat color="primary" label="Change Password" />
        </router-link>
        <user-logout />
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.user = this.$authStore.currentUser;
    },
  },
};
</script>
<style lang=""></style>
