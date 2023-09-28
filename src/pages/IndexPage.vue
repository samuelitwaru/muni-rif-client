<template>
  <q-page>
    <div class="flex flex-center">
      <img
        alt="Quasar logo"
        src="~assets/logo.jpeg"
        style="width: 100px; height: 100px"
      />
      <h3>MuniRIF</h3>
    </div>
    <developer-menu-2></developer-menu-2>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import wordCount from "html-word-count";

export default defineComponent({
  name: "IndexPage",

  created() {
    console.log(wordCount);
    console.log(wordCount("<p>Hello <b>world!</b></p>"));
  },
});
</script>
