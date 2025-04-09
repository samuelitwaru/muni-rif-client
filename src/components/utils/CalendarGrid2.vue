<template>
  <div>
    <div class="row q-gutter-sm">
      <q-input
        v-model="formData.title"
        label="Title of your call"
        outlined
        required
      />
      <q-input
        type="date"
        label="Start Date"
        outlined
        v-model="formData.date_from"
        @change="validateDates"
      />
      <q-input
        label="Submission Date"
        type="date"
        outlined
        v-model="formData.submission_date"
        @change="validateDates"
      />

      <q-input
        label="Review Date"
        outlined
        type="date"
        v-model="formData.review_date"
        @change="validateDates"
      />

      <q-input
        label="Selection Date"
        outlined
        type="date"
        v-model="formData.selection_date"
        @change="validateDates"
      />
      <q-input
        label="End Date"
        type="date"
        outlined
        v-model="formData.date_to"
        @change="validateDates"
      />
      <q-btn color="primary" label="Update" @click="updateCall" />
    </div>
    <div class="row q-gutter-sm">
      <MonthView
        v-for="month in calendarMonths"
        :key="month.name"
        :selectedYear="month.year"
        :selectedMonth="month.month"
        :monthName="month.name"
        :markedDates="markedDates"
        :selectedDates="selectedDates"
      />
    </div>
  </div>
</template>

<script>
import MonthView from "components/utils/MonthView.vue";

export default {
  components: { MonthView },
  data() {
    return {
      selectedDates: {
        Start: new Date(2025, 0, 2),
        Submission: new Date(2025, 0, 5),
        Review: new Date(2025, 0, 10),
        Selection: new Date(2025, 0, 15),
        End: new Date(2025, 0, 31),
      },
      formData: {
        title: "",
        date_from: "",
        submission_date: "",
        review_date: "",
        selection_date: "",
        date_to: "",
      },
      calendarMonths: [],
      markedDates: [new Date(2025, 0, 5), new Date(2025, 0, 15)],
    };
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

          console.log(this.call);

          this.formData = {
            title: this.call.title,
            date_from: this.call.date_from,
            submission_date: this.call.submission_date,
            review_date: this.call.review_date,
            selection_date: this.call.selection_date,
            date_to: this.call.date_to,
          };

          this.validateDates();
        }
      });
    },
    validateDates() {
      if (
        this.formData.date_from &&
        this.formData.date_to &&
        new Date(this.formData.date_from) > new Date(this.formData.date_to)
      ) {
        alert("Start Date cannot be later than Stop Date.");
        this.formData.date_to = "";
      }

      if (
        this.formData.date_from &&
        this.formData.submission_date &&
        new Date(this.formData.submission_date) <
          new Date(this.formData.date_from)
      ) {
        alert("Submission Date cannot be before Start Date.");
        this.formData.submission_date = "";
      }

      if (
        this.formData.submission_date &&
        this.formData.review_date &&
        new Date(this.formData.review_date) <
          new Date(this.formData.submission_date)
      ) {
        alert("Review Date cannot be before Submission Date.");
        this.formData.review_date = "";
      }

      if (
        this.formData.review_date &&
        this.formData.selection_date &&
        new Date(this.formData.selection_date) <
          new Date(this.formData.review_date)
      ) {
        alert("Selection Date cannot be before Review Date.");
        this.formData.selection_date = "";
      }

      if (
        this.formData.selection_date &&
        this.formData.date_to &&
        new Date(this.formData.date_to) < new Date(this.formData.selection_date)
      ) {
        alert("Stop Date cannot be before Selection Date.");
        this.formData.date_to = "";
      }

      (this.selectedDates = {
        Start: new Date(this.formData.date_from) || null,
        Submission: new Date(this.formData.submission_date) || null,
        Review: new Date(this.formData.review_date) || null,
        Selection: new Date(this.formData.selection_date) || null,
        End: new Date(this.formData.date_to) || null,
      }),
        console.log(this.formData.date_to);

      this.generateCalendar();
    },
    generateCalendar() {
      if (!this.formData.date_from || !this.formData.date_to) {
        this.calendarMonths = [];
        return;
      }

      const start = new Date(this.formData.date_from);
      const stop = new Date(this.formData.date_to);
      const months = [];

      for (
        let date = new Date(start.getFullYear(), start.getMonth(), 1);
        date <= stop;
        date.setMonth(date.getMonth() + 1)
      ) {
        const daysInMonth = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDate();
        const days = [];

        for (let day = 1; day <= daysInMonth; day++) {
          const current = new Date(date.getFullYear(), date.getMonth(), day);
          let event = null;

          if (
            this.formData.submission_date &&
            current.toISOString().split("T")[0] ===
              this.formData.submission_date
          ) {
            event = "Submission";
          } else if (
            this.formData.review_date &&
            current.toISOString().split("T")[0] === this.formData.review_date
          ) {
            event = "Review";
          } else if (
            this.formData.selection_date &&
            current.toISOString().split("T")[0] === this.formData.selection_date
          ) {
            event = "Selection";
          }

          days.push({ date: day, event });
        }

        months.push({
          name: date.toLocaleString("default", { month: "long" }),
          month: date.getMonth(),
          year: date.getFullYear(),
          days,
        });
      }

      this.calendarMonths = months;
    },
    updateCall() {
      console.log(this.formData);
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
  },
};
</script>

<style>
.inputs {
  margin-bottom: 20px;
}

.calendar {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.month {
  border: 1px solid #ccc;
  padding: 10px;
  width: 300px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.day {
  text-align: center;
  position: relative;
}

.speech-bubble {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: #007bff;
  color: white;
  padding: 5px;
  border-radius: 5px;
}
</style>
