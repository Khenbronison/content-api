<template>
  <div>
    <h1 class="text-2xl text-blue-500 mb-2 font-bold">GhanaCurriculum API</h1>
    <h2 class="text-2xl text-gray-800 mb-2 font-semibold">Developer Login</h2>
    <p class="text-gray-600 mb-8 leading-relaxed">
      Enter your email and password to access your dashboard.
    </p>

    <form @submit.prevent="submitForm">
      <!-- Email Input -->
      <div class="mb-4">
        <input
          type="email"
          v-model="email"
          placeholder="e.g. developer@example.com"
          autocomplete="email"
          class="w-full p-3 border border-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      <!-- Password Input -->
      <div class="mb-6">
        <input
          type="password"
          v-model="password"
          placeholder="Enter your password"
          autocomplete="current-password"
          class="w-full p-3 border border-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <!-- Error passed from parent -->
      <div v-if="serverError" class="error-message text-red-500 font-medium mb-4 text-sm">
        {{ serverError }}
      </div>

      <!-- Login Button -->
      <button
        type="submit"
        :disabled="isLoading || !email || !password"
        class="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg"
        :class="{ 'opacity-60 cursor-not-allowed': isLoading }">
        {{ isLoading ? "Logging In..." : "Login" }}
      </button>
    </form>

    <!-- ===== THIS SECTION HAS BEEN UPDATED ===== -->
    <div class="helper-links text-center mt-6 text-sm space-y-2">
      <!-- Use RouterLink for navigating to a new page/route -->
      <RouterLink to="/forgot-password" class="text-blue-500 hover:underline font-medium">
        Forgot Password?
      </RouterLink>

      <p class="text-gray-600 font-medium">
        Don't have an account?
        <!-- Use <a> with @click for actions on the current page -->
        <span @click="$emit('switch-to-signup')" class="text-blue-500 cursor-pointer">Sign Up</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// Make sure RouterLink is available if you're not using it globally
// import { RouterLink } from 'vue-router';

defineProps({
  isLoading: { type: Boolean, default: false },
  serverError: { type: String, default: "" },
});

const emit = defineEmits(["login-requested", "switch-to-signup"]);

const email = ref("");
const password = ref("");

const submitForm = () => {
  if (!email.value || !password.value) {
    return;
  }
  emit("login-requested", { email: email.value, password: password.value });
};
</script>
