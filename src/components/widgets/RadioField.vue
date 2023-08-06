<template>
  <div>
    <label>{{ label }}</label>
    <div>
      <q-radio
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedOption"
        :val="option.value"
      >
        {{ option.label }}
      </q-radio>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    options: {
      type: Array,
      required: true,
    },
    value: String, // The selected option value
  },
  data() {
    return {
      selectedOption: this.value || null,
    };
  },
  watch: {
    selectedOption(newVal) {
      this.$emit("input", newVal);
    },
  },
};
</script>
