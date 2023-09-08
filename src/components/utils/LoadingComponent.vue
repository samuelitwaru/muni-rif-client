<!-- components/Loading.vue -->
<template>
  <div v-if="show" class="loading">
    dfklkdf
    <q-dialog v-model="show">
      <q-spinner-ios color="primary" size="3rem" :thickness="5" />
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean, // The selected option value
  },
  data() {
    return {
      show: this.$utilsStore.isLoading,
    };
  },

  created() {
    this.$utilsStore.setLoading(true);
  },
};
</script>
