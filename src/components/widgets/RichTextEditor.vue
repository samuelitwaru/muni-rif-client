<template>
  <div>
    <mc-wysiwyg v-model="html"></mc-wysiwyg>
  </div>
</template>

<script>
import McWysiwyg from "@mycure/wysiwyg";

export default {
  components: {
    McWysiwyg,
  },
  data() {
    return {
      html: "",
    };
  },
};
</script>
