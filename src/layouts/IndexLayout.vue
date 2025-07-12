<template>
  <q-layout view="hhr LpR lFf">
    <loading-component />

    <div reveal bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" style="">
            <div>
              <q-avatar>
                <img src="~assets/logo.jpeg" />
              </q-avatar>
              <label class="q-pa-md text-white"
                >MuniRIF Management System</label
              >
            </div>
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
    </div>

    <q-page-container>
      <div class="q-mt-md">
        <taglines
          style="
            color: #00b0d9;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
              'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          "
        />
      </div>
      <div
        id="bg"
        class="row q-py-md"
        style="
          background-image: url('https://munirif.pythonanywhere.com/media/static/bg.jpg');
          background-position: center;
          min-height: 40rem;
        "
      >
        <div class="flex col-md-4 q-mb-md">
          <q-separator spaced />
        </div>
        <div class="col-12 flex justify-center align-self-center q-px-md">
          <router-view />
        </div>
      </div>
      <q-separator spaced />
      <div
        align="center"
        class="q-pa-sm q-mt-xl"
        style="background-color: #00b0d9; height: 14rem"
      >
        <p class="text-white q-py-xl q-my-xl">
          &copy; {{ year }} MuniRIF Management System. All rights reserved
        </p>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { authStore } from "src/stores/auth";
import { utilsStore } from "src/stores/utils";
import { useQuasar } from 'quasar'

const $q = useQuasar()
utilsStore().setLoading(true);
export default {
  setup() {
    if (authStore().isLoggedIn) {
      window.location.href = "/";
    }
    const date = new Date();
    const year = date.getFullYear();
    return {
      year,
    };
  },
};
</script>

<style>
body {
  background-color: #f2f2f2;
  /* d-image: url(https://i.stack.imgur.com/LCCB6.jpg); */
}
</style>
