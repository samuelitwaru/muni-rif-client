// src/store/auth.js

import { defineStore } from "pinia";

export const dataStore = defineStore({
  id: "data",
  state: () => ({
    call: JSON.parse(localStorage.getItem("call")),
  }),
  getters: {
    currentCall: (state) => state.call,
  },
  actions: {
    setCall(call) {
      this.call = call;
      localStorage.setItem("call", JSON.stringify(call));
    },
  },
});
