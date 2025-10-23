<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center">
      <!-- Conditionally render the correct form component -->
      <LoginFormComponent
        v-if="formState === 'login'"
        :is-loading="isLoading"
        :server-error="errorMessage"
        @login-requested="handleLogin"
        @switch-to-signup="formState = 'signup'" />

      <SignUpFormComponent
        v-else
        :is-loading="isLoading"
        :server-error="errorMessage"
        @signup-requested="handleSignUp"
        @switch-to-login="formState = 'login'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import LoginFormComponent from "@/components/login/LoginForm.vue"; // Adjust path if needed
import SignUpFormComponent from "@/components/login/SignUp.vue"; // Adjust path if needed
import router from "@/router";
import { useApiService } from "@/services/apiService";
import { useAuthStore } from "@/stores/Auth";

// --- State Management (in the Parent) ---
const formState = ref("login"); // 'login' or 'signup'
const errorMessage = ref("");
const isLoading = ref(false);

const { notify } = useNotification();

const { post } = useApiService();
const authStore = useAuthStore();
// --- Logic (in the Parent) ---
const handleLogin = async ({ email, password }) => {
  if (!email || !password) {
    errorMessage.value = "Please enter both email and password.";
    return;
  }
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const userDataFromApi = await post("api/v1/auth/login", {
      email: email,
      password: password,
    });

    authStore.setUser(userDataFromApi);

    router.push("/dashboard");
  } catch (error) {
    errorMessage.value = error;
  } finally {
    isLoading.value = false;
  }
};

const handleSignUp = async (user) => {
  isLoading.value = true;
  errorMessage.value = ""; // Reset errors

  try {
    const userDataFromApi = await post("/api/v1/auth/register", user);

    authStore.setUser(userDataFromApi);
    router.push("/dashboard");
  } catch (error) {
    errorMessage.value = error;
  } finally {
    isLoading.value = false;
  }
};
</script>
