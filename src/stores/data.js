// src/store/auth.js

import { defineStore } from "pinia";

export const dataStore = defineStore({
  id: "data",
  state: () => ({
    call: JSON.parse(localStorage.getItem("call")),
    entity: JSON.parse(localStorage.getItem("entity")),
  }),
  getters: {
    currentCall: (state) => state.call,
    entity: (state) => state.entity,
  },
  actions: {
    setCall(call) {
      this.call = call;
      localStorage.setItem("call", JSON.stringify(call));
    },
    setEntity(entity) {
      // this.entity = entity;
      localStorage.setItem("entity", JSON.stringify(entity));
    },
  },
});
