<template>
  <div class="q-field q-my-sm">
    <q-select
      dense
      outlined
      v-model="selectedOption"
      :options="options"
      :label="label"
      :hint="hint"
      :error="error"
    />
  </div>
</template>

<script>
export default {
  name: "OptionsField",
  props: {
    value: {
      type: String,
      // required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    hint: String,
    error: String,
  },
  data() {
    return {
      selectedOption: this.value,
    };
  },
  watch: {
    selectedOption(newVal) {
      this.$emit("input", newVal);
    },
  },
};
</script>
