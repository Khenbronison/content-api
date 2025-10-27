<!-- components/analytics/KpiCard.vue -->
<template>
  <div class="box">
    <h3 class="text-sm text-gray-500 font-medium">{{ title }}</h3>
    <div class="text-3xl font-bold mt-2">
      {{ value }} <span v-if="unit" class="text-base text-gray-500">{{ unit }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  unit: {
    type: String,
    default: "",
  },
});
</script>
