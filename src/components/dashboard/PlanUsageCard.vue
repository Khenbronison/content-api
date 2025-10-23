<template>
  <div class="bg-card-bg rounded-xl p-6 shadow-custom border border-border-color col-span-2">
    <div class="text-lg font-semibold mb-6 text-text-primary">Your Plan & Usage</div>
    <p class="text-text-primary">
      You are currently on the <strong class="font-bold">{{ currentPlanName }} Plan</strong>.
    </p>

    <div id="granularQuotasDashboard" class="grid gap-4 mt-4">
      <div v-for="(limit, type) in planQuotas" :key="type" class="text-sm">
        <div class="flex justify-between mb-1 font-medium">
          <span>{{ capitalize(type) }}</span>
          <span
            >{{ (currentUsage[type] || 0).toLocaleString() }} / {{ limit.toLocaleString() }}</span
          >
        </div>
        <div class="w-full h-2 bg-border-color rounded-md overflow-hidden">
          <div
            class="h-full bg-success-color rounded-md"
            :style="{ width: calculatePercentage(type) + '%' }"></div>
        </div>
      </div>
    </div>

    <div class="mt-6 text-sm text-text-secondary">This billing cycle ends in 12 days.</div>
    <RouterLink
      to="/billing"
      class="inline-block mt-4 py-2.5 px-5 bg-accent-color text-white no-underline rounded-lg font-medium transition-colors duration-200 hover:bg-blue-600"
      >Manage Plan</RouterLink
    >
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  plansData: {
    type: Object,
    required: true,
  },
  currentUsage: {
    type: Object,
    required: true,
  },
  currentPlanId: {
    type: String,
    required: true,
  },
});

const currentPlanName = computed(() => {
  return props.plansData[props.currentPlanId]?.name || "Unknown";
});

const planQuotas = computed(() => {
  return props.plansData[props.currentPlanId]?.limits || {};
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function calculatePercentage(type) {
  const usage = props.currentUsage[type] || 0;
  const limit = planQuotas.value[type] || 1;
  return Math.min((usage / limit) * 100, 100);
}
</script>
