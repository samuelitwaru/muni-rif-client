// src/store/auth.js

import { defineStore } from "pinia";

export const tableStore = defineStore({
  id: "table",
  state: () => ({
    screening: JSON.parse(localStorage.getItem("screeening")),
  }),
  getters: {
    screeningData: (state) => state.screening,
  },
  actions: {
    setScreening(data) {
      this.screening = data;
      localStorage.setItem("screening", JSON.stringify(data));
    },
  },
});
