<template lang="">
  <q-card v-if="message">
    <q-card-section class="flex justify-between no-wrap q-gutter-x-lg items-stretch">
      <div>{{ message }}</div>
      <q-btn flat icon="close" color="primary" dense size="sm" @click="$emit('close', '')" />
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
