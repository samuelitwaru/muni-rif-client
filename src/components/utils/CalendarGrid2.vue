<template>
  <div>

    <div class="row q-gutter-sm justify-center">
      <DatePicker v-for="item in dateData" :key="item.value" :name="item.name" :label="item.label" :date="item.value" @update:date="onDateChanged($event)"/>
    </div>

    <q-separator spaced  />
    <div class="row q-mt-sm q-gutter-sm justify-center">
      <MonthView
        v-for="month in calendarMonths"
        :key="month.name"
        :selectedYear="month.year"
        :selectedMonth="month.month"
        :monthName="month.name"
        :markedDates="markedDates"
        :selectedDates="selectedDates"
        @update:selectedDates="updateSelectedDates($event)"
      />
    </div>
  </div>
</template>

<script>
import MonthView from "components/utils/MonthView.vue";
import { converDateToString } from "src/utils/helpers";
import DatePicker from "../widgets/DatePicker.vue";
export default {
  components: { MonthView, DatePicker },
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

      rules: {
        required: (value) => !!value || "This field is required",
        dateRangeFrom: (value) => this.validateDateFrom(value),
        dateRangeTo: (value) => this.validateDateTo(value),
        submissionDate: (value) => this.validateSubmisionDate(value),
        reviewDate: (value) => this.validateReviewDate(value),
        selectionDate: (value) => this.validateSelectionDate(value),
      },
      formError: {
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
  computed: {
    dateData() {
      return [
        { name: "date_from", label: "Start Date", value: this.formData.date_from },
        { name: "submission_date", label: "Submission Date", value: this.formData.submission_date },
        { name: "review_date", label: "Review Date", value: this.formData.review_date },
        { name: "selection_date", label: "Selection Date", value: this.formData.selection_date },
        { name: "date_to", label: "End Date", value: this.formData.date_to },
      ];
    },
  },
  methods: {
    onDateChanged(data) {
      this.formData[data.name] = data.date;
      this.updateCall();
    },
    getCall() {
      this.$api.get(`calls/${this.$route.params.call_id}/`).then((res) => {
        if (res.status == 200) {
          this.call = res.data;
          this.formData = res.data;
          this.formData.date_range = {
            from: this.formData.date_from,
            to: this.formData.date_to,
          };

          this.validateDates();

          this.formData = {
            title: this.call.title,
            date_from: this.call.date_from,
            submission_date: this.call.submission_date,
            review_date: this.call.review_date,
            selection_date: this.call.selection_date,
            date_to: this.call.date_to,
          };

          console.log("formdata >>>", this.formData);

        }
      });
    },
    validateDates() {
      if (
        this.formData.date_from &&
        this.formData.date_to &&
        new Date(this.formData.date_from) > new Date(this.formData.date_to)
      ) {
        this.formError.date_from = "Start Date cannot be later than Stop Date.";
        this.formData.date_to = "";
      }

      if (
        this.formData.date_from &&
        this.formData.submission_date &&
        new Date(this.formData.submission_date) <
          new Date(this.formData.date_from)
      ) {
        this.formData.submission_date = "";
      }

      if (
        this.formData.submission_date &&
        this.formData.review_date &&
        new Date(this.formData.review_date) <
          new Date(this.formData.submission_date)
      ) {
        this.formData.review_date = "";
      }

      if (
        this.formData.review_date &&
        this.formData.selection_date &&
        new Date(this.formData.selection_date) <
          new Date(this.formData.review_date)
      ) {
        this.formData.selection_date = "";
      }

      if (
        this.formData.selection_date &&
        this.formData.date_to &&
        new Date(this.formData.date_to) < new Date(this.formData.selection_date)
      ) {
        this.formData.date_to = "";
      }

      (this.selectedDates = {
        Start: new Date(this.formData.date_from) || null,
        Submission: new Date(this.formData.submission_date) || null,
        Review: new Date(this.formData.review_date) || null,
        Selection: new Date(this.formData.selection_date) || null,
        End: new Date(this.formData.date_to) || null,
      }),

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
    updateSelectedDates(selectedDates) {
      this.selectedDates = selectedDates;
      this.formData.date_from = converDateToString(selectedDates.Start, '-');
      this.formData.submission_date = converDateToString(selectedDates.Submission, '-');
      this.formData.review_date = converDateToString(selectedDates.Review, '-');
      this.formData.selection_date = converDateToString(selectedDates.Selection, '-');
      this.formData.date_to = converDateToString(selectedDates.End, '-');
      console.log('final formdata', this.formData);
      this.generateCalendar()
    },
    updateCall() {
      this.validateDates();
      // this.$utilsStore.setLoading(true);
      console.log('formdata', this.formData);
      this.$api
        .put(`calls/${this.$route.params.call_id}/`, this.formData)
        .then((res) => {
          if (res.status == 200) {
            this.call = res.data;
            // this.$router.push(`/calls/`);
            this.$utilsStore.setLoading(false);
          }
        });
    },

    validateDateFrom(value) {
      return (
        !value ||
        !this.formData.date_to ||
        value <= this.formData.date_to ||
        "Start date must be less than end date"
      );
    },
    validateSubmisionDate(value) {
      const from = this.formData.date_from
        .replace("/", "-")
        .replace("/", "-");
      const review_date = this.formData.review_date;
      return (
        ((!from || value > from) &&
          (!review_date || value < review_date)) ||
        "Submission date must be greater than start date and less than review date"
      );
    },
    validateReviewDate(value) {
      const { submission_date, selection_date } = this.formData;
      return (
        ((!submission_date || value > submission_date) &&
          (!selection_date || value < selection_date)) ||
        "Review date must be greater than submission date and less than selection date"
      );
    },
    validateSelectionDate(value) {
      console.log('formdata', this.formData);
      const {date_from, submission_date, review_date, selection_date, date_to} = this.formData;

      return (
        ((!review_date || value > review_date) &&
          (!date_to || value < date_to)) ||
        "Selection date must be greater than review date and less than the end date"
      );
    },
    validateDateTo(value) {
      return (
        !value ||
        !this.formData.date_from ||
        value >= this.formData.date_from ||
        "End date must be greater than start date"
      );
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
