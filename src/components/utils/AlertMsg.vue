<template lang="">
  <div>
    <q-card flat bordered class="q-pa-md">
      <q-icon size="md" :name="icon" />
      {{ message }}</q-card
    >
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: "alert_circle",
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang=""></style>
