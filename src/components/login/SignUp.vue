<template>
  <div>
    <h1 class="text-2xl text-blue-500 mb-2 font-bold">GhanaCurriculum API</h1>
    <h2 class="text-2xl text-gray-800 mb-2 font-semibold">Create an Account</h2>
    <p class="text-gray-600 mb-8 leading-relaxed">Get started by creating your new account.</p>

    <form @submit.prevent="submitForm">
      <!-- Name input -->
      <div class="mb-4">
        <input
          type="text"
          v-model="name"
          placeholder="Enter your Organisation's name"
          autocomplete="text"
          class="w-full p-3 border border-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <!-- Email Input -->
      <div class="mb-4">
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          autocomplete="email"
          class="w-full p-3 border border-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <!-- Password Input -->
      <div class="mb-4">
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          autocomplete="new-password"
          class="w-full p-3 border border-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      <!-- Confirm Password Input -->
      <div class="mb-6">
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm Password"
          autocomplete="new-password"
          class="w-full p-3 border border-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <!-- Error Message Display -->
      <div v-if="localError" class="error-message text-red-500 font-medium mb-4 text-sm">
        {{ localError }}
      </div>

      <div v-if="serverError" class="error-message text-red-500 font-medium mb-4 text-sm">
        {{ serverError }}
      </div>
      <!-- Sign Up Button -->
      <button
        type="submit"
        :disabled="isLoading || !email || !password"
        class="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg"
        :class="{ 'opacity-60 cursor-not-allowed': isLoading }">
        {{ isLoading ? "Creating Account..." : "Sign Up" }}
      </button>
    </form>

    <!-- Link to Login -->
    <div class="helper-links text-center mt-6 text-sm">
      <p class="text-gray-600 font-medium">
        Already have an account?
        <span class="text-blue-500 cursor-pointer" @click="$emit('switch-to-login')">Log In</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  isLoading: { type: Boolean, default: false },
  serverError: { type: String, default: "" },
});

const emit = defineEmits(["signup-requested", "switch-to-login"]);

const name = ref("");
const organisationName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const localError = ref("");

const submitForm = () => {
  // Local validation
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    localError.value = "Please fill out all fields.";
    return;
  }
  if (password.value !== confirmPassword.value) {
    localError.value = "Passwords do not match.";
    return;
  }
  if (password.value.length < 6) {
    localError.value = "Password must be at least 6 characters long.";
    return;
  }
  localError.value = "";
  // Emit the data to the parent component for handling
  const user = {
    username: name.value,
    fullname: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: confirmPassword.value,
  };
  emit("signup-requested", user);
};
</script>
