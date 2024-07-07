<template>
  <q-page padding v-if="call">
    <q-form @submit="updateCall" class="q-gutter-md flex justify-center">
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">{{ call.title }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-lg q-pb-md">
          <label>Name your call</label>

          <q-input
            v-model="formData.title"
            label="Title of your call"
            outlined
            required
          />

          <div class="row q-col-gutter-xs q-my-sm">
            <q-input
              class="col"
              v-model="formData.date_from"
              type="date"
              label="Period Starts From?"
              outlined
            />
            <q-input
              class="col"
              v-model="formData.date_to"
              type="date"
              label="Period Ends On?"
              outlined
            />
          </div>
          <q-checkbox
            v-model="formData.is_active"
            label="Set as currently active period"
          />
        </q-card-section>
        <q-separator spaced />
        <q-card-actions align="right">
          <!-- <q-btn flat color="primary" label="Cancel" @click="cancelCreate" /> -->
          <q-btn color="primary" label="Update" @click="updateCall" />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "UpdateCall",

  data() {
    return {
      loading: false,
      showDialog: false,
      call: null,
      formData: {
        title: "",
      },
    };
  },
  created() {
    this.getCall();
    if (process.env.DEBUG) this.setFormData();
  },
  methods: {
    getCall() {
      this.$api.get(`calls/${this.$route.params.call_id}/`).then((res) => {
        if (res.status == 200) {
          this.call = res.data;
          this.formData = res.data;
        }
      });
    },
    updateCall() {
      this.$utilsStore.setLoading(true);
      this.$api
        .put(`calls/${this.$route.params.call_id}/`, this.formData)
        .then((res) => {
          if (res.status == 200) {
            this.call = res.data;
            this.$router.push(`/calls/`);
            this.$utilsStore.setLoading(false);
          }
        });
    },

    setFormData() {
      this.formData = {
        title: "Muni RIF Management System",
        is_active: true,
        date_from: "2024-06-24T09:57:11.467359Z",
        date_to: "2024-06-24T09:57:11.467359Z",
      };
    },
  },

  watch: {
    showPopup(newValue, oldValue) {
      this.showDialog = newValue;
    },
    showDialog(newValue, oldValue) {
      this.$emit("showPopupChanged", newValue);
    },
  },
};
</script>
