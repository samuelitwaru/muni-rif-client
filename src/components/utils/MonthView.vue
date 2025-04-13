<template>
  <div class="month-year-picker">
    <div class="controls">
    </div>

    <table class="calendar">
      <tbody>
        <tr>
          <th colspan="7">{{ monthName }} {{ selectedYear }}</th>
        </tr>
        <tr>
          <th v-for="day in weekDays" :key="day">{{ day }}</th>
        </tr>
        <tr v-for="week in calendar" :key="week[0]">
          <td
            v-for="day in week"
            :key="day.date"
            :class="{
              'other-month': day.otherMonth,
              marked: isSelected(day.date).result && !day.otherMonth,
            }"
          >
            <q-btn v-if="isSelected(day.date).result && !day.otherMonth" round color="primary">
              {{ day.date.getDate() }}
              <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">
                <q-date v-model="formData[`${isSelected(day.date).label}`]" @update:model-value="setSelectedDateValue(`${isSelected(day.date).label}`)">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup />
                    <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn>
            <div v-else>
              {{ day.date.getDate() }}
            </div>

            <div
              v-if="isSelected(day.date).result && !day.otherMonth"
              class="badge"
            >
              {{ isSelected(day.date).label }}
            </div>
          </td>
        </tr>
        <tr v-if="calendar.length == 5">
          <td v-for="day in weekDays" :key="day"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { converDateToString } from "src/utils/helpers";
export default {
  props: [
    "selectedYear",
    "selectedMonth",
    "monthName",
    "markedDates",
    "selectedDates",
  ],
  data() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    return {
      years: Array.from({ length: 21 }, (_, i) => currentYear - 10 + i),
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      // selectedYear: currentYear,
      // selectedMonth: currentMonth,
      calendar: [],
      formData: {
      },
    };
  },
  created() {
    // this.formData = this.selectedDates
    // loop through the selectedDates and set the formData
    for (const [key, value] of Object.entries(this.selectedDates)) {
      this.formData[key] = converDateToString(value);
    }
    console.log('this.formsData: ', this.formData)
  },
  methods: {
    setSelectedDateValue(key) {
      console.log(this.formData)

      let data = {}
      for (const [key, value] of Object.entries(this.formData)) {
        data[key] = new Date(value)
      }
      console.log('data: ', data)

      this.$emit("update:selectedDates", {
       ...data
      })
    },
    updateCalendar() {
      const year = this.selectedYear;
      const month = this.selectedMonth;
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);

      let calendar = [];
      let week = [];

      // Add days from the previous month
      const startDay = firstDayOfMonth.getDay();
      if (startDay !== 0) {
        const prevMonthLastDay = new Date(year, month, 0);
        for (let i = startDay - 1; i >= 0; i--) {
          week.push({
            date: new Date(
              prevMonthLastDay.getFullYear(),
              prevMonthLastDay.getMonth(),
              prevMonthLastDay.getDate() - i
            ),
            otherMonth: true,
          });
        }
      }

      // Add days of the current month
      for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        if (week.length === 7) {
          calendar.push(week);
          week = [];
        }
        week.push({ date: new Date(year, month, day), otherMonth: false });
      }

      // Add days from the next month
      const nextMonthDayCount = 7 - week.length;
      for (let i = 1; i <= nextMonthDayCount; i++) {
        week.push({
          date: new Date(year, month + 1, i),
          otherMonth: true,
        });
      }
      calendar.push(week);

      this.calendar = calendar;
    },

    isMarked(date) {
      return this.markedDates.some(
        (markedDate) =>
          markedDate.getFullYear() === date.getFullYear() &&
          markedDate.getMonth() === date.getMonth() &&
          markedDate.getDate() === date.getDate()
      );
    },

    isSelected(date) {
      let label = "";
      const isSelected = Object.entries(this.selectedDates).some(
        (selectedDate) => {
          label = selectedDate[0];
          return (
            selectedDate[1].getFullYear() === date.getFullYear() &&
            selectedDate[1].getMonth() === date.getMonth() &&
            selectedDate[1].getDate() === date.getDate()
          );
        }
      );

      return { result: isSelected, label: label };
    },
  },
  mounted() {
    this.updateCalendar();
  },
};
</script>

<style>
.month-year-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

.controls {
  margin-bottom: 1rem;
}

.calendar {
  border-collapse: collapse;
  width: 100%;
  max-width: 400px;
}

.calendar th,
.calendar td {
  border: 1px solid #ddd;
  text-align: center;
  padding: 8px;
  position: relative;
  height: 50px;
  width: 50px;
  cursor: pointer;
}

.calendar .other-month {
  color: #aaa;
}

.calendar .marked {
  background-color: #ffeb3b;
  border-radius: 50%;
}

.badge {
  position: absolute;
  top: -1rem; /* Distance from the top */
  left: 2rem; /* Distance from the right */
  background-color: #ff4d4f; /* Alert red color */
  color: white; /* Text color */
  padding: 5px 10px; /* Padding for the badge */
  border-top-right-radius: 20px; /* Rounded corners */
  border-bottom-right-radius: 20px; /* Rounded corners */
  border-top-left-radius: 20px; /* Rounded corners */
  font-size: 14px; /* Font size */
  font-weight: bold; /* Bold text */
  text-align: center; /* Centered text */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Optional shadow for depth */
  opacity: 0.8;
  z-index: 1000;
}
</style>
