// src/store/auth.js

import { defineStore } from "pinia";

export const utilsStore = defineStore({
  id: "utils",
  state: () => ({
    // errorMessageDialog: JSON.parse(localStorage.getItem("errorMessageDialog")),
    ProposalList_status: Boolean(
      parseInt(localStorage.getItem("ProposalList_status"))
    ),
  }),
  getters: {
    // errorMessageDialog: (state) => state.errorMessageDialog,
    isLoading: (state) => state.loading,
  },
  actions: {
    setLoading(isLoading) {
      let value = 1;
      this.loading = isLoading;
      if (isLoading === false) {
        value = 0;
      }
      localStorage.setItem("loading", value);
    },
  },
});
