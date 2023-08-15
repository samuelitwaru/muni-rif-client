<template lang="">
  <div>
    <h2 class="text-h6 q-px-md">Developer Menu</h2>

    <div class="row q-ma-xs">
      <div class="col">
        <q-list>
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

          <router-link to="/proposals">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="arrow_forward" />
              </q-item-section>
              <q-item-section>Proposals</q-item-section>
            </q-item>
          </router-link>
        </q-list>
      </div>
      <div class="col q-my-auto" align="center">
        <create-proposal-dialog />
      </div>
    </div>
    <div class="flex q-pa-sm">
      <user-logout />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
