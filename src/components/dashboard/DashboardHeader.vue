<template>
  <header class="flex justify-between items-center mb-8">
    <div>
      <h2 class="text-2xl font-semibold text-text-primary">Welcome back, {{ user }}!</h2>
      <p class="text-text-secondary">Here's a summary of your API usage.</p>
    </div>
    <!-- <div class="flex items-center space-x-2 font-medium">
      <div class="w-3 h-3 bg-success-color rounded-full"></div>
      <span>All Systems Operational</span>
    </div> -->
  </header>
</template>

<script setup>
import { useAuthStore } from "@/stores/Auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>
