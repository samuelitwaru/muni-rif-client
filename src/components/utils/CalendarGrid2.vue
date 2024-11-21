<template>
  <div>
    <div class="inputs">
      <label>
        Start Date:
        <input type="date" v-model="startDate" @change="validateDates" />
      </label>
      <label>
        Submission Date:
        <input type="date" v-model="submissionDate" @change="validateDates" />
      </label>
      <label>
        Review Date:
        <input type="date" v-model="reviewDate" @change="validateDates" />
      </label>
      <label>
        Selection Date:
        <input type="date" v-model="selectionDate" @change="validateDates" />
      </label>
      <label>
        Stop Date:
        <input type="date" v-model="stopDate" @change="validateDates" />
      </label>
    </div>

    <div class="calendar">
      <div v-for="month in calendarMonths" :key="month.name" class="month">
        <h3>{{ month.name }} {{ month.year }}</h3>
        <div class="days">
          <div v-for="day in month.days" :key="day.date" class="day">
            <span>{{ day.date }}</span>
            <div v-if="day.event" class="speech-bubble">
              {{ day.event }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: "",
      submissionDate: "",
      reviewDate: "",
      selectionDate: "",
      stopDate: "",
      calendarMonths: [],
    };
  },
  methods: {
    validateDates() {
      if (
        this.startDate &&
        this.stopDate &&
        new Date(this.startDate) > new Date(this.stopDate)
      ) {
        alert("Start Date cannot be later than Stop Date.");
        this.stopDate = "";
      }

      if (
        this.startDate &&
        this.submissionDate &&
        new Date(this.submissionDate) < new Date(this.startDate)
      ) {
        alert("Submission Date cannot be before Start Date.");
        this.submissionDate = "";
      }

      if (
        this.submissionDate &&
        this.reviewDate &&
        new Date(this.reviewDate) < new Date(this.submissionDate)
      ) {
        alert("Review Date cannot be before Submission Date.");
        this.reviewDate = "";
      }

      if (
        this.reviewDate &&
        this.selectionDate &&
        new Date(this.selectionDate) < new Date(this.reviewDate)
      ) {
        alert("Selection Date cannot be before Review Date.");
        this.selectionDate = "";
      }

      if (
        this.selectionDate &&
        this.stopDate &&
        new Date(this.stopDate) < new Date(this.selectionDate)
      ) {
        alert("Stop Date cannot be before Selection Date.");
        this.stopDate = "";
      }

      this.generateCalendar();
    },
    generateCalendar() {
      if (!this.startDate || !this.stopDate) {
        this.calendarMonths = [];
        return;
      }

      const start = new Date(this.startDate);
      const stop = new Date(this.stopDate);
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
            this.submissionDate &&
            current.toISOString().split("T")[0] === this.submissionDate
          ) {
            event = "Submission";
          } else if (
            this.reviewDate &&
            current.toISOString().split("T")[0] === this.reviewDate
          ) {
            event = "Review";
          } else if (
            this.selectionDate &&
            current.toISOString().split("T")[0] === this.selectionDate
          ) {
            event = "Selection";
          }

          days.push({ date: day, event });
        }

        months.push({
          name: date.toLocaleString("default", { month: "long" }),
          year: date.getFullYear(),
          days,
        });
      }

      this.calendarMonths = months;
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
