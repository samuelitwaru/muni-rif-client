// src/store/auth.js

import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    setUserAndToken(user, token) {
      this.user = user;
      this.token = token;
    },
    clearUserAndToken() {
      this.user = null;
      this.token = null;
    },
  },
});
