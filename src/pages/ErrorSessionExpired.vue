<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <!-- <div style="font-size: 30vh">401</div> -->

      <div class="text-h2" style="opacity: 0.4">Session Expired</div>

      <div class="flex q-gutter-sm flex-center">
        <q-btn
          class="q-mt-xl"
          color="white"
          text-color="blue"
          unelevated
          label="Extend Session"
          @click="extendSession"
        />

        <q-btn class="q-mt-xl" flat to="/" label="Logout" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
  methods: {
    extendSession() {
      const user = this.$authStore.currentUser;
      console.log("user", user);
      this.$api.get(`/accounts/refresh-token/${user.id}`, user).then((res) => {
        console.log("res", res);
      });
    },
  },
});
</script>
