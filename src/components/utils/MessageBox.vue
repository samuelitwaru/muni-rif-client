<template lang="">
  <q-card v-if="message">
    <q-card-section class="flex justify-between">
      <div></div>
      {{ message }}
      <q-btn icon="close" round dense size="sm" @click="$emit('close', '')" />
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang=""></style>
