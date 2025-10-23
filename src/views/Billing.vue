<!-- views/Billing.vue -->
<script setup>
import { ref, reactive, computed } from "vue";
import CurrentPlanCard from "@/components/billing/CurrentPlanCard.vue";
import PlanCard from "@/components/billing/PlanCard.vue";
import PaymentMethodCard from "@/components/billing/PaymentMethodCard.vue";
import BillingHistoryCard from "@/components/billing/BillingHistoryCard.vue";

// --- Reactive State (Owner Component) ---
// This state is managed by the parent and passed down as props.
const currentPlanId = ref("free");
const currentUsage = reactive({
  questions: 7500,
  notes: 450,
  flashcards: 800,
  videos: 150,
});
const plans = reactive({
  free: {
    name: "Free",
    price: 0,
    priceDetails: "/month",
    features: ["1,000 Questions", "100 Lesson Notes", "100 Flashcards", "20 Videos"],
    limits: { questions: 1000, notes: 100, flashcards: 100, videos: 20 },
  },
  // pro: {
  //   name: "Pro",
  //   price: 25,
  //   priceDetails: "/month",
  //   features: ["10,000 Questions", "1,000 Lesson Notes", "1,000 Flashcards", "200 Videos"],
  //   limits: { questions: 10000, notes: 1000, flashcards: 1000, videos: 200 },
  // },
  // business: {
  //   name: "Business",
  //   price: 100,
  //   priceDetails: "/month",
  //   features: ["50,000 Questions", "5,000 Lesson Notes", "5,000 Flashcards", "1,000 Videos"],
  //   limits: { questions: 50000, notes: 5000, flashcards: 5000, videos: 1000 },
  // },
  custom: {
    name: "Custom",
    price: "Let's Talk",
    priceDetails: "",
    description:
      "Need higher limits or custom features? We can create a plan tailored to your specific needs.",
    isCustom: true,
  },
});
const billingHistory = ref([
  { date: "Oct 15, 2023", amount: "$25.00", status: "Paid", invoiceUrl: "#" },
  { date: "Sep 15, 2023", amount: "$25.00", status: "Paid", invoiceUrl: "#" },
  { date: "Aug 15, 2023", amount: "$25.00", status: "Paid", invoiceUrl: "#" },
]);

// --- Computed Properties ---
const currentPlanData = computed(() => plans[currentPlanId.value]);
const quotas = computed(() => {
  const limits = currentPlanData.value.limits;
  if (!limits) return [];
  return Object.entries(limits).map(([type, limit]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    usage: (currentUsage[type] || 0).toLocaleString(),
    limit: limit.toLocaleString(),
    percentage: Math.min(((currentUsage[type] || 0) / limit) * 100, 100),
  }));
});

// --- Methods ---
const selectPlan = (planId) => {
  if (planId === currentPlanId.value) return;
  console.log(`Switching to ${plans[planId].name} plan...`);
  currentPlanId.value = planId;
};
</script>

<template>
  <main class="w-full p-4 md:p-6">
    <!-- <header>
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Billing & Plans</h2>
    </header> -->

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <!-- Left Column -->
      <div class="lg:col-span-3 flex flex-col gap-10">
        <!-- <CurrentPlanCard :plan-name="currentPlanData.name" :quotas="quotas" /> -->

        <section>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlanCard
              v-for="(plan, id) in plans"
              :key="id"
              :plan="plan"
              :plan-id="id"
              :current-plan-id="currentPlanId"
              :current-plan-price="currentPlanData.price"
              @select-plan="selectPlan" />
          </div>
        </section>
      </div>

      <!-- Right Column -->
      <!-- <div class="flex flex-col gap-8 lg:col-span-2">
        <PaymentMethodCard />
        <BillingHistoryCard :history="billingHistory" />
      </div> -->
    </div>
  </main>
</template>
