import { createPinia, defineStore } from "pinia";

const initialState = {
  user: null,
  token: null,
};

export const useAuthStore = defineStore("authStore", {
  state: () => ({ ...initialState }),
  actions: {
    resetState() {
      Object.assign(this, initialState);
    },
    setUser(userData) {
      ((this.user = userData.email), (this.token = userData.authentication_token));
    },
  },
  persist: true,
});
