<template lang="">
  <div>
    <q-dialog v-model="show" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar :icon="icon" color="primary" text-color="white" />
          <span class="q-ml-sm">{{message}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="cancelText" color="primary" v-close-popup />
          <q-btn flat @click="doConfirm" :label="confirmText" color="primary"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: "Comfirm action?",
    },
    icon: {
      type: String,
      default: "help_outline",
    },
    title: {
      type: String,
      default: "Confirm",
    },
    confirmText: {
      type: String,
      default: "Confirm",
    },
    cancelText: {
      type: String,
      default: "Cancel",
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showDialog() {
      this.show = true;
    },
    hide() {
      this.show = false;
    },
    doConfirm() {
      this.$emit("confirm", true);
      this.show = false;
    },
  },
}
</script>
<style lang="">

</style>
