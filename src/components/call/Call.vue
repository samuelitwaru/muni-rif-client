<template>
  <q-page padding v-if="call">
    <div class="flex q-gutter-md">
      <q-timeline style="width: 500px" color="secondary" layout="dense">
        <q-timeline-entry
          v-for="date in timelineDates"
          :key="date"
          :icon="date.icon"
        >
          <template v-slot:title>
            <div>
              {{ $formatDate(date.date) || "Not Added!" }}
              <q-input outlined v-model="formData[date.name]">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover :breakpoint="1000">
                      <q-date mask="YYYY-MM-DD" v-model="formData[date.name]" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </template>
          <template v-slot:subtitle> {{ date.title }} </template>
          <div>
            {{ date.description }}
          </div>
        </q-timeline-entry>
      </q-timeline>
      <q-form @submit="updateCall" class="q-gutter-md flex justify-center">
        <q-card style="width: 500px">
          <q-card-section>
            <div class="text-h6">{{ call.title }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pt-lg q-pb-md">
            <q-input
              v-model="formData.title"
              label="Title of your call"
              outlined
              required
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

            <!-- <div class="row q-col-gutter-xs q-my-sm">
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
            </div> -->
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
    </div>
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
  computed: {
    timelineDates() {
      if (!this.call) return [];
      const options = { year: "numeric", month: "long", day: "numeric" };
      var dates = [
        {
          title: "Call Start",
          name: "date_from",
          date: this.call.date_from,
          description: "",
          icon: "campaign",
        },
        {
          title: "Submission",
          name: "submission_date",
          date: this.call.submission_date,
          description: "",
          icon: "description",
        },
        {
          title: "Review",
          name: "review_date",
          date: this.call.review_date,
          description: "",
          icon: "search",
        },
        {
          title: "Selection",
          name: "selection_date",
          date: this.call.selection_date,
          description: "",
          icon: "check",
        },

        {
          title: "Call End",
          name: "date_to",
          date: this.call.date_to,
          description: "",
          icon: "stop",
        },
      ];
      return dates;
    },
  },
  created() {
    this.getCall();
  },
  methods: {
    getCall() {
      this.$api.get(`calls/${this.$route.params.call_id}/`).then((res) => {
        if (res.status == 200) {
          this.call = res.data;
          this.formData = res.data;
          this.formData.date_range = {
            from: this.formData.date_from,
            to: this.formData.date_to,
          };
        }
      });
    },
    updateCall() {
      this.formData.date_from = new Date(this.formData.date_range.from)
        .toJSON()
        .split("T")[0];
      this.formData.date_to = new Date(this.formData.date_range.to)
        .toJSON()
        .split("T")[0];
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

    setDateRange() {
      this.formData.date_from = this.formData.date_range.from;
      this.formData.date_to = this.formData.date_range.to;
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
