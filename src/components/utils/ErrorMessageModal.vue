<template>
  <q-dialog v-model="show">
    <q-card>
      <q-card-section>
        <div class="text-h6">Errors</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-markup-table flat bordered>
          <tbody>
            <tr v-for="(value, key) in errorMessages" :key="key">
              <td class="text-left">
                <strong>{{ key }}</strong>
              </td>
              <td class="text-right">
                <ul>
                  <li v-for="(item, index) in value" :key="index">
                    {{ item }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="primary" label="Close" @click="show = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    showModal: Boolean, // Whether to show the modal or not
    errorResponse: Object, // Array of error messages
  },
  data() {
    return {
      show: false,
      errorMessages: {},
    };
  },
  methods: {},

  watch: {
    errorResponse(newVal) {
      this.errorMessages = newVal.data;
      this.show = true;
    },
  },
};
</script>
