<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 10vh">No Calls Open</div>
      <user-logout />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
  created() {
    this.checkCalls();
  },
  methods: {
    checkCalls() {
      this.$api.get(`calls`).then((res) => {
        if (res.data.length) {
          this.$router.push(`/`);
        }
      });
    },
  },
});
</script>
