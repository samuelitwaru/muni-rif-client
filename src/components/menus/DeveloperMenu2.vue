<template lang="">
  <div>
    <h2 class="text-h6 q-px-md">Developer Menu</h2>

    <q-list bordered>
      <router-link to="/account/signup">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="arrow_forward" />
          </q-item-section>
          <q-item-section>Signup</q-item-section>
        </q-item>
      </router-link>

      <router-link to="/account/signin">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="arrow_forward" />
          </q-item-section>
          <q-item-section>Sign in</q-item-section>
        </q-item>
      </router-link>

      <router-link to="/account/password-reset">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="arrow_forward" />
          </q-item-section>
          <q-item-section>Forgot Password</q-item-section>
        </q-item>
      </router-link>

      <router-link to="/account/profile">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="arrow_forward" />
          </q-item-section>
          <q-item-section>Profile</q-item-section>
        </q-item>
      </router-link>

      <router-link to="/account/password">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="arrow_forward" />
          </q-item-section>
          <q-item-section>Change Password</q-item-section>
        </q-item>
      </router-link>

      <router-link to="/grant/create">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="arrow_forward" />
          </q-item-section>
          <q-item-section>New Grant Application</q-item-section>
        </q-item>
      </router-link>

      <router-link to="/proposals/create">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="arrow_forward" />
          </q-item-section>
          <q-item-section>Proposal</q-item-section>
        </q-item>
      </router-link>
    </q-list>
    <div class="flex q-pa-sm">
      <user-logout />
      <create-proposal-dialog />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
