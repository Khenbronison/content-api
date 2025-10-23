<!-- components/billing/CurrentPlanCard.vue -->
<template>
  <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
    <h3 class="font-semibold text-lg text-gray-900 mb-1">Current Plan</h3>
    <p class="text-2xl font-bold text-gray-800">{{ planName }} Plan</p>

    <div v-if="quotas.length > 0" class="mt-6 grid gap-5">
      <div v-for="quota in quotas" :key="quota.name" class="text-sm">
        <div class="flex justify-between mb-1 font-medium text-gray-600">
          <span>{{ quota.name }}</span>
          <span>{{ quota.usage }} / {{ quota.limit }}</span>
        </div>
        <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-green-500 rounded-full transition-all duration-500"
            :style="{ width: quota.percentage + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <div class="mt-6 text-sm text-gray-500">Your plan renews on November 15, 2025.</div>
  </div>
</template>

<script setup>
defineProps({
  planName: {
    type: String,
    required: true,
  },
  quotas: {
    type: Array,
    required: true,
  },
});
</script>
