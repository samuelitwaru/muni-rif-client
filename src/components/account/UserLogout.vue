<template>
  <div v-if="$authStore.isLoggedIn">
    <loading-component :loading="loading" />
    <!-- Your logout button here -->
    <q-btn flat @click="showConfirmationDialog" color="primary">Logout</q-btn>

    <!-- Confirmation Dialog -->
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section class="q-pa-md">
          <span class="q-body1">Are you sure you want to log out?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn dense flat @click="cancelLogout" color="primary">Cancel</q-btn>
          <q-btn @click="confirmLogout" color="primary" class="q-ml-md"
            >Logout</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      showDialog: false,
    };
  },
  methods: {
    showConfirmationDialog() {
      this.showDialog = true;
    },
    cancelLogout() {
      this.showDialog = false;
    },
    confirmLogout() {
      this.loading = true;
      this.$api.get(`/accounts/logout/`).then((res) => {
        this.$authStore.clearUserAndToken();
        this.$router.push("/");
        this.loading = false;
        this.cancelLogout();
      });
    },
  },
};
</script>
