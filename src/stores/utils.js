// src/store/auth.js

import { defineStore } from "pinia";

export const utilsStore = defineStore({
  id: "utils",
  state: () => ({
    errorMessageDialog: JSON.parse(localStorage.getItem("errorMessageDialog")),
  }),
  getters: {
    errorMessageDialog: (state) => state.errorMessageDialog,
  },
  actions: {
    setProposal(errorMessageDialog) {
      this.errorMessageDialog = errorMessageDialog;
      localStorage.setItem(
        "errorMessageDialog",
        JSON.stringify(errorMessageDialog)
      );
    },
  },
});
