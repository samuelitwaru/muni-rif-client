<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <!-- <q-breadcrumbs-el icon="home" to="/" label="Home" /> -->

        <q-breadcrumbs-el label="Home" icon="home" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />

    <user-menu-2 class="my-card q-ma-sm" />

    <useful-docs />

    <!-- <developer-menu-2></developer-menu-2> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
