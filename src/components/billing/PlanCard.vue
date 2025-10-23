<!-- components/billing/PlanCard.vue -->
<template>
  <div
    :class="[
      'bg-white rounded-lg p-6 text-center transition-all duration-200 border-2',
      isCurrentPlan ? 'border-blue-500 scale-[1.02]' : 'border-gray-200 hover:border-gray-300',
      plan.isCustom ? 'border-dashed' : '',
    ]"
  >
    <h4 class="text-xl font-semibold text-gray-800">{{ plan.name }}</h4>
    <div class="my-4">
      <span class="text-5xl font-bold text-gray-900">
        {{ typeof plan.price === "number" ? `$${plan.price}` : plan.price }}
      </span>
      <span v-if="plan.priceDetails" class="text-base font-normal text-gray-500">{{
        plan.priceDetails
      }}</span>
    </div>

    <p v-if="plan.description" class="text-gray-500 my-8 px-4">{{ plan.description }}</p>

    <ul v-if="plan.features" class="my-8 text-gray-600 text-left space-y-3">
      <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-3">
        <Check class="h-5 w-5 text-green-500 flex-shrink-0" />
        <span>{{ feature }}</span>
      </li>
    </ul>

    <template v-if="plan.isCustom">
      <a
        href="mailto:sales@ghcurriculum.com"
        class="block w-full py-3 px-4 rounded-lg font-semibold text-sm bg-blue-500 text-white hover:bg-blue-600"
      >
        Contact Sales
      </a>
    </template>
    <template v-else>
      <button
        @click="$emit('select-plan', planId)"
        :disabled="isCurrentPlan"
        class="w-full py-3 px-4 rounded-lg font-semibold text-sm border transition-colors disabled:cursor-not-allowed"
        :class="{
          'bg-blue-50 text-blue-600 border-blue-200': isCurrentPlan,
          'bg-blue-500 text-white border-blue-500 hover:bg-blue-600': !isCurrentPlan,
        }"
      >
        {{ buttonText }}
      </button>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Check } from "lucide-vue-next";

const props = defineProps({
  plan: { type: Object, required: true },
  planId: { type: String, required: true },
  currentPlanId: { type: String, required: true },
  currentPlanPrice: { type: Number, required: true },
});

defineEmits(["select-plan"]);

const isCurrentPlan = computed(() => props.planId === props.currentPlanId);

const buttonText = computed(() => {
  if (isCurrentPlan.value) return "Current Plan";
  if (props.plan.price > props.currentPlanPrice) return "Upgrade";
  return "Downgrade";
});
</script>
