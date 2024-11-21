<template>
  <div>
    <div class="controls">
      <label>
        Start:
        <input type="date" v-model="startDate" />
      </label>
      <label>
        Stop:
        <input type="date" v-model="stopDate" />
      </label>
    </div>

    <div class="calendar-grid">
      <div
        v-for="month in months"
        :key="month.year + '-' + month.month"
        class="month"
      >
        <h6 class="q-ma-sm">
          {{ monthNames[month.month - 1] }} {{ month.year }}
        </h6>
        <table>
          <thead>
            <tr>
              <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="week in month.weeks" :key="week">
              <td v-for="day in week" :key="day">{{ day || "" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: "2024-01-01", // Default start date
      stopDate: "2024-09-30", // Default stop date
      monthNames: [
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
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    };
  },
  computed: {
    months() {
      const start = new Date(this.startDate);
      const stop = new Date(this.stopDate);
      const months = [];

      while (start <= stop) {
        const year = start.getFullYear();
        const month = start.getMonth() + 1;
        const weeks = this.generateWeeks(year, month);
        months.push({ year, month, weeks });

        // Move to the next month
        start.setMonth(start.getMonth() + 1);
      }

      return months;
    },
  },
  methods: {
    generateWeeks(year, month) {
      const weeks = [];
      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0);

      let currentWeek = new Array(firstDay.getDay()).fill(null);
      for (let day = 1; day <= lastDay.getDate(); day++) {
        currentWeek.push(day);

        // If week is complete or it's the last day of the month
        if (currentWeek.length === 7 || day === lastDay.getDate()) {
          weeks.push(currentWeek);
          currentWeek = [];
        }
      }

      // Fill remaining empty days in the last week
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }

      weeks.push(currentWeek);
      return weeks;
    },
  },
};
</script>

<style>
.controls {
  margin-bottom: 20px;
}

.calendar-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.month {
  border: 1px solid #ccc;
  padding: 10px;
  width: 250px;
}

.month h3 {
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: center;
  padding: 5px;
  border: 1px solid #ddd;
}
</style>
