// src/store/auth.js

import { defineStore } from "pinia";

export const authStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    currentUser: (state) => state.user,
  },
  actions: {
    setUserAndToken(user, token) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      this.token = token;
      localStorage.setItem("token", token);
    },
    clearUserAndToken() {
      this.user = null;
      this.token = null;
      localStorage.clear();
    },
  },
});
