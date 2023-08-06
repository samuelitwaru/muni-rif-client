<template>
  <q-page>
    <div class="flex flex-center">
      <img
        alt="Quasar logo"
        src="~assets/logo.jpeg"
        style="width: 200px; height: 200px"
      />
      <h3>MuniRIF</h3>
    </div>
    <developer-menu-2></developer-menu-2>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
