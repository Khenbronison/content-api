<!-- components/analytics/ChartWrapper.vue -->
<template>
  <div class="box">
    <div class="text-base font-medium mb-4">{{ title }}</div>
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
