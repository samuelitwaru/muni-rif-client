<template>
  <div>
    <q-btn
      v-if="showButton"
      label="New Call"
      color="primary"
      @click="showDialog = true"
    />
    <div>
      <q-form @submit="createCall" class="justify-center">
        <q-dialog v-model="showDialog" persistent>
          <q-card style="width: 500px">
            <q-card-section class="row justify-between">
              <div class="text-h6">New Call</div>
              <q-btn color="primary" icon="close" dense flat @click="cancelCreate" />
            </q-card-section>
            <q-separator />
            <q-card-section class="q-pt-lg q-pb-md">
              <q-input
                v-model="formData.title"
                label="Title of your call"
                outlined
                required
                :rules="[rules.required]"
              />

              <div class="q-mt-md">
                <label class="text-grey text-caption">
                  Select Call Duration
                </label>
                <div class="row q-gutter-sm col">
                  <q-input
                    class="col"
                    v-model="formData.date_from"
                    type="text"
                    label="From?"
                    outlined
                    :disable="true"
                  />

                  <q-input
                    class="col"
                    v-model="formData.date_to"
                    type="text"
                    label="To?"
                    outlined
                    :disable="true"

                  />

                  <q-btn icon="event" outline color="primary">
                    <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                          v-model="showPop"
                        >
                          <q-date
                            @range-end="setDateRange"
                            v-model="formData.date_range"
                            range
                          />
                        </q-popup-proxy>
                  </q-btn>
                </div>
              </div>
            </q-card-section>
            <q-separator spaced />
            <q-card-actions align="right">
              <q-btn flat color="primary" label="Cancel" @click="cancelCreate" />
              <q-btn color="primary" label="Create" @click="createCall" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-form>
    </div>
  </div>
</template>

<script>
import { getThemes } from "src/utils/api";

export default {
  props: {
    showButton: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      showModal: false,
      loading: false,
      showDialog: false,
      showPop: false,
      themes: [],
      formData: {
        title: "",
        is_active: false,
        date_range: { from: "", to: "" },
        date_from: "",
        date_to: "",
      },
      formErrors: {},
      rules: {
        required: (value) => !!value || "This field is required",
        dateRangeFrom: (value) =>
          !value ||
          !this.formData.date_range.to ||
          value <= this.formData.date_range.to ||
          "Start date must be less than end date",
        dateRangeTo: (value) =>
          !value ||
          !this.formData.date_range.from ||
          value >= this.formData.date_range.from ||
          "End date must be greater than start date",
      }
    };
  },
  created() {
    if (process.env.DEBUG) this.setFormData();
    getThemes().then((data) => (this.themes = data));
    this.formData.call = this.$dataStore?.currentCall?.id;
  },
  methods: {
    createCall() {
      this.formData.date_from = this.formData.date_range.from.replaceAll(
        "/",
        "-"
      );
      this.formData.date_to = this.formData.date_range.to.replaceAll("/", "-");
      console.log(this.formData);
      // this.$utilsStore.setLoading(true);
      this.$api.post("calls/", this.formData).then((res) => {
        // this.$router.push(`/calls/`);
        console.log("Call created successfully", res.data.id);
        if (res.status === 201 && res.data.id) {
          this.$router.push(`/calls/${res.data.id}`);
        }
        // window.location = "/calls";
        // this.$utilsStore.setLoading(false);
        // this.showDialog = false;
      });
    },

    setDateRange() {
      var date = new Date();
      console.log(this.formData.date_range.from, this.formData.date_range.to);
      this.formData.date_from = this.formData.date_range.from;
      this.formData.date_to = this.formData.date_range.to;
      this.showPop = false;
      return;
    },

    cancelCreate() {
      // Cancel the creation and close the dialog.
      this.showDialog = false;
    },

    setFormData() {
      this.formData = {
        title: "sd;d;wdw",
        is_active: false,
        date_range: {
          from: "2025/04/01",
          to: "2025/04/30",
        },
        date_from: "2025-04-01",
        date_to: "2025-04-30",
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
