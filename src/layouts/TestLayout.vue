<template>
  <q-layout view="hhr LpR lFf">
    <loading-component />
    <q-header reveal bordered class="bg-primary text-white">
      <q-toolbar>
        <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->
        <q-toolbar-title>
          <router-link to="/" style="">
            <div>
              <q-avatar>
                <img src="~assets/logo.jpeg" />
              </q-avatar>
              <label class="q-pa-md text-white">MuniRIF</label>
            </div>
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { authStore } from "src/stores/auth";
export default {
  setup() {
    if (authStore().isLoggedIn) {
      window.location.href = "/";
    }
  },
};
</script>
