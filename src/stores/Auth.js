import router from "@/router";
import { defineStore } from "pinia";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const useAuthStore = defineStore("authStore", {
  state: () => ({ ...initialState }),
  actions: {
    resetState() {
      Object.assign(this, initialState);
    },
    setUser(userData) {
      this.user = userData.email;
      this.token = userData.authentication_token;
      this.isAuthenticated = true;
    },
    logoutUser() {
      this.isAuthenticated = false;
      this.resetState();
      localStorage.removeItem("authStore");
      router.push({ name: "login" });
    },
  },

  persist: true,
});
