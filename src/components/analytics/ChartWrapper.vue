<!-- components/analytics/ChartWrapper.vue -->
<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <div class="text-lg font-semibold mb-4">{{ title }}</div>
    <div class="h-80">
      <slot></slot>
      <!-- The chart will be injected here -->
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
