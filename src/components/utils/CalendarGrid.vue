<template lang="">
  <div class="row">
    <MonthView
      :selectedYear="2025"
      :selectedMonth="0"
      :monthName="`January`"
      :markedDates="markedDates"
      :selectedDates="selectedDates"
    />
  </div>
</template>
<script>
import MonthView from "components/utils/MonthView.vue";

export default {
  components: { MonthView },
  data() {
    return {
      markedDates: [new Date(2025, 0, 5), new Date(2025, 0, 15)],
      selectedDates: {
        Start: new Date(2025, 0, 2),
        Submission: new Date(2025, 0, 5),
        Review: new Date(2025, 0, 10),
        Selection: new Date(2025, 0, 15),
        End: new Date(2025, 0, 31),
      },
    };
  },
};
</script>
<style lang=""></style>
