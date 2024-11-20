<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />
        <q-breadcrumbs-el icon="campaign" to="/calls" label="Calls" />
        <q-breadcrumbs-el label="Create New Call" icon="campaign" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced size="0.5px" />
    <q-form @submit="createCall" class="q-gutter-md flex justify-center">
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">New Call</div>
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

          <q-card
            flat
            bordered
            class="flex items-center justify-between q-pa-sm q-mt-sm"
          >
            <div>
              <span class="text-grey text-caption">From : </span>
              {{ $formatDate(formData.date_from) }}
            </div>
            <div>
              <span class="text-grey text-caption">To : </span>
              {{ $formatDate(formData.date_to) }}
            </div>
            <q-btn icon="event" round color="primary">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  @range-end="setDateRange"
                  v-model="formData.date_range"
                  range
                />
              </q-popup-proxy>
            </q-btn>
          </q-card>

          <q-input
            class="q-my-sm"
            v-model="formData.submission_date"
            type="date"
            label="Applications Submission Deadline?"
            outlined
          />
          <q-input
            class="q-my-sm"
            v-model="formData.review_date"
            type="date"
            label="Applications Review Deadline?"
            outlined
          />
          <q-input
            class="q-my-sm"
            v-model="formData.selection_date"
            type="date"
            label="Applications Selection Deadline?"
            outlined
          />
          <q-checkbox
            v-model="formData.is_active"
            label="Set this as currently active period"
          />
        </q-card-section>
        <q-separator spaced />
        <q-card-actions align="right">
          <q-btn type="submit" color="primary" label="Create" />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "CreateCall",
  data() {
    return {
      loading: false,
      showDialog: false,
      proxyDate: "2019/03/01",
      formData: {
        title: "",
        is_active: false,
        date_range: { from: "", to: "" },
        date_from: "",
        date_to: "",
      },
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
        submissionDate: (value) => {
          const { from } = this.formData.date_range;
          const { review_date } = this.formData;
          return (
            ((!from || value > from) &&
              (!review_date || value < review_date)) ||
            "Submission date must be greater than start date and less than review date"
          );
        },
        reviewDate: (value) => {
          const { submission_date, selection_date } = this.formData;
          return (
            ((!submission_date || value > submission_date) &&
              (!selection_date || value < selection_date)) ||
            "Review date must be greater than submission date and less than selection date"
          );
        },
        selectionDate: (value) => {
          const { review_date, date_range } = this.formData;
          return (
            ((!review_date || value > review_date) &&
              (!date_range.to || value < date_range.to)) ||
            "Selection date must be greater than review date and less than the end date"
          );
        },
      },
    };
  },
  created() {
    if (process.env.DEBUG) this.setFormData();
  },
  methods: {
    createCall() {
      console.log(this.formData.date_from);
      this.formData.date_from = new Date(this.formData.date_from)
        .toJSON()
        .split("T")[0];
      this.formData.date_to = new Date(this.formData.date_to)
        .toJSON()
        .split("T")[0];
      // this.$utilsStore.setLoading(true);
      this.$api.post("calls/", this.formData).then((res) => {
        // this.$router.push(`/calls/`);
        window.location = "/calls";
        this.$utilsStore.setLoading(false);
        this.showDialog = false;
      });
    },

    setDateRange() {
      var date = new Date();
      this.formData.date_from = this.formData.date_range.from;
      this.formData.date_to = this.formData.date_range.to;
      return;
    },

    cancelCreate() {
      // Cancel the creation and close the dialog.
      this.showDialog = false;
    },

    setFormData() {
      this.formData = {
        title: "",
        is_active: false,
        date_range: { from: "", to: "" },
        date_from: "",
        date_to: "",
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
