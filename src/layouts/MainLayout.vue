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

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered> </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <developer-menu-2 />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
};
</script>
