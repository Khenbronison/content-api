<template>
  <main class="flex-1 p-8">
    <DashboardHeader />
    <div class="mb-4">
      <p class="font-semibold">Tokens left:</p>
      <span class="text-text-secondary">2345 out of 34567</span>
    </div>

    <!-- <div class="grid grid-cols-3 gap-6 mb-6">
      <PlanUsageCard
        :plansData="plansData"
        :currentUsage="currentUsage"
        :currentPlanId="currentPlanId"
      />
      <KpiCardGrid />
    </div> -->
    <ContentFetchedCard :currentUsage="currentUsage" />

    <div class="grid grid-cols-2 gap-6">
      <div class="bg-card-bg rounded-xl p-6 shadow-custom border border-border-color">
        <div class="text-lg font-semibold mb-6 text-text-primary">
          API Calls Over Time (Last 7 Days)
        </div>
        <LineChart :data="usageOverTimeData" :options="usageOverTimeOptions" class="w-full h-64" />
      </div>
      <div class="bg-card-bg rounded-xl p-6 shadow-custom border border-border-color">
        <div class="text-lg font-semibold mb-6 text-text-primary">Endpoint Usage Breakdown</div>
        <BarChart :data="endpointUsageData" :options="endpointUsageOptions" class="w-full h-64" />
      </div>
    </div>

    <RecentActivityTable :recentActivity="recentActivity" />
  </main>
</template>

<script setup>
import { computed, reactive } from "vue";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line as LineChart, Bar as BarChart } from "vue-chartjs";

// Import child components
import DashboardHeader from "@/components/dashboard/DashboardHeader.vue";
import PlanUsageCard from "@/components/dashboard/PlanUsageCard.vue";
import KpiCardGrid from "@/components/dashboard/KpiCardGrid.vue";
import ContentFetchedCard from "@/components/dashboard/ContentFetchedCard.vue";
import RecentActivityTable from "@/components/dashboard/RecentActivityTable.vue";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

// Data that was in the original script setup
const plansData = {
  free: { name: "Free", limits: { questions: 1000, notes: 100, flashcards: 100, videos: 20 } },
  pro: { name: "Pro", limits: { questions: 10000, notes: 1000, flashcards: 1000, videos: 200 } },
  business: {
    name: "Business",
    limits: { questions: 50000, notes: 5000, flashcards: 5000, videos: 1000 },
  },
};

const currentUsage = reactive({
  questions: 7500,
  notes: 450,
  flashcards: 800,
  videos: 150,
});

const currentPlanId = "pro";

const recentActivity = [
  {
    id: 1,
    timestamp: "2023-10-27 14:30:01",
    endpoint: "/questions/search",
    status: "Success",
    latency: "78ms",
    number: "38",
  },
  {
    id: 2,
    timestamp: "2023-10-27 14:28:15",
    endpoint: "/notes/get",
    status: "Success",
    latency: "92ms",
    number: "879",
  },
  {
    id: 3,
    timestamp: "2023-10-27 14:25:50",
    endpoint: "/flashcards/list",
    status: "Error",
    latency: "110ms",
    number: "2000",
  },
  {
    id: 4,
    timestamp: "2023-10-27 14:22:05",
    endpoint: "/videos/play",
    status: "Success",
    latency: "65ms",
    number: "1",
  },
  {
    id: 5,
    timestamp: "2023-10-27 14:19:30",
    endpoint: "/questions/search",
    status: "Success",
    latency: "88ms",
    number: "500",
  },
];

// Chart data and options (these remain in the parent as they directly use `currentUsage`)
const usageOverTimeData = computed(() => ({
  labels: ["Oct 21", "Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26", "Today"],
  datasets: [
    {
      label: "API Calls",
      data: [1200, 1900, 1500, 2100, 1800, 2400, 2800],
      borderColor: "rgba(59, 130, 246, 1)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
}));

const usageOverTimeOptions = {
  responsive: true,
  maintainAspectRatio: true, // Set to false so height: 64 will work
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false,
  },
};

const endpointUsageData = computed(() => ({
  labels: ["Questions", "Notes", "Flashcards", "Videos"],
  datasets: [
    {
      label: "Number of Calls",
      data: [
        currentUsage.questions,
        currentUsage.notes,
        currentUsage.flashcards,
        currentUsage.videos,
      ],
      backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      borderRadius: 4,
      borderSkipped: false,
    },
  ],
}));

const endpointUsageOptions = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: true, // Set to false so height: 64 will work
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.parsed.x.toLocaleString()} calls`;
        },
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};
</script>
