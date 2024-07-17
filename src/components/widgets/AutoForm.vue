<template lang>
  <div>
    <q-form class="col-md-6 q-gutter-md">
      <q-markup-table flat bordered dense>

        <tbody>
          <tr class="q-tr--no-hover" v-for="field in fields" :key="field.name">
            <td class="text-left">{{field.label}}</td>
            <td class="text-left">

              <q-select v-if="field.choices" v-model="formData[field.name]"
                :options="field.choices"
                option-value="name"
                option-label="value"
                map-options
                emit-value outlined dense />

              <q-input v-else dense outlined v-model="formData[field.name]"
                :type="field.type" />
            </td>
          </tr>

          <tr class="text-right q-tr--no-hover">
            <td colspan="2">
              <q-btn color="primary" label="confirm" @click="onConfirm" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-form>
  </div>
</template>
<script>
export default {
  props:["fields"],
  data() {
    return {
      formData: {},
      fields: [
        {
          name: "first_name",
          label: "First Name",
          value: "",
          type: "text",
        },
        {
          name: "last_name",
          label: "Last Name",
          value: "",
          type: "text",
        },
        { name: "email", label: "Email", value: "", type: "email" },
        {
          name: "phone",
          label: "Telephone",
          value: "",
          type: "telephone",
        },
        {
          name: "designation",
          label: "Designation",
          value: "",
          type: "text",
        },
      ],
    };
  },

  methods: {
    onConfirm(){
      this.$emit('onConfirm', this.formData)
    }
  },
};
</script>
<style lang></style>
