<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <!-- <q-breadcrumbs-el icon="home" to="/" label="Home" /> -->

        <q-breadcrumbs-el text-color="black" label="Home" icon="home" />
        <q-breadcrumbs-el :label="call.title" icon="campaign" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
    <main-menu />

    <!-- <user-menu-2 class="my-card q-ma-sm" /> -->

    <!-- <developer-menu-2></developer-menu-2> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      call: this.$dataStore.currentCall,
    };
  },
  created() {
    console.log(this.$dataStore.currentCall);
  },
  methods: {},
});
</script>
