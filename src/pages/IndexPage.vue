<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <!-- <q-breadcrumbs-el icon="home" to="/" label="Home" /> -->
        <q-breadcrumbs-el text-color="black" label="Home" icon="home" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
    <CallProgress />
    <main-menu />

    <!-- <user-menu-2 class="my-card q-ma-sm" /> -->

    <!-- <developer-menu-2></developer-menu-2> -->
  </q-page>
</template>

<script>
import CallProgress from "src/components/call/CallProgress.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: {CallProgress},
  data() {
    return {
      call: this.$dataStore?.currentCall,
    };
  },
  created() {},
  methods: {},
});
</script>
