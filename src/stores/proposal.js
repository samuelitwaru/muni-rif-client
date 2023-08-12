// src/store/auth.js

import { defineStore } from "pinia";

export const proposalStore = defineStore({
  id: "proposal",
  state: () => ({
    proposal: JSON.parse(localStorage.getItem("proposal")),
  }),
  getters: {
    currentProposal: (state) => state.proposal,
  },
  actions: {
    setProposal(proposal) {
      this.proposal = proposal;
      localStorage.setItem("proposal", JSON.stringify(proposal));
    },
  },
});
