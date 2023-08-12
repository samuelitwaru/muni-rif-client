<template>
  <q-list bordered separator>
    <h2 class="text-h6 q-px-md">Developer Menu</h2>

    <q-card>
      <router-link to="/account/signup">
        <q-item v-ripple>
          <q-item-section class="q-pl-md q-pa-sm text-primary"
            >Signup</q-item-section
          >
        </q-item>
      </router-link>

      <router-link to="/account/signin">
        <q-item clickable v-ripple>
          <q-item-section class="q-pl-md q-pa-sm text-primary"
            >Signin</q-item-section
          >
        </q-item>
      </router-link>

      <router-link to="/account/password-reset">
        <q-item clickable v-ripple>
          <q-item-section class="q-pl-md q-pa-sm text-primary"
            >Forgort Password</q-item-section
          >
        </q-item>
      </router-link>

      <router-link to="/account">
        <q-item clickable v-ripple>
          <q-item-section class="q-pl-md q-pa-sm text-primary"
            >Account details</q-item-section
          >
        </q-item>
      </router-link>
      <router-link to="/grant/create">
        <q-item clickable v-ripple>
          <q-item-section class="q-pl-md q-pa-sm text-primary"
            >New Grant Application</q-item-section
          >
        </q-item>
      </router-link>
      <router-link to="/proposals/create">
        <q-item clickable v-ripple>
          <q-item-section class="q-pl-md q-pa-sm text-primary"
            >Proposal</q-item-section
          >
        </q-item>
      </router-link>
    </q-card>
  </q-list>
</template>

<script>
export default {};
</script>

<style></style>
