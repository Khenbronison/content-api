<template>
  <div class="h-[80vh] flex justify-center items-center gap-4" v-if="loading">
    <FwbSpinner color="blue" size="7" />
  </div>
  <main class="md:px-8 pt-14 md:pt-0" v-else>
    <header class="flex justify-between items-center mb-4">
      <div class="flex items-center gap-2">
        <h2 class="text-base font-semibold text-blue-700">
          Welcome back, <span class="hidden md:inline">{{ user }}</span>
        </h2>
        <img src="../assets/icons/wave.svg" alt="" width="15" />
      </div>
      <div class="flex items-center space-x-3 font-medium">
        <Bell color="gray" size="15" strokeWidth="3" />
        <div class="p-2 bg-blue-700/60 rounded-full">
          <User color="white" size="15" />
        </div>
      </div>
    </header>

    <div class="mb-8 flex justify-between items-center">
      <p class="text-2xl font-medium text-gray-800">Dashboard</p>
      <div class="">
        <p class="font-semibold text-gray-600">
          Tokens left: <span class="text-black">2345 / 34567</span>
        </p>
      </div>
    </div>

    <!-- <div class="grid grid-cols-3 gap-6 mb-6">
      <PlanUsageCard
        :plansData="plansData"
        :currentUsage="currentUsage"
        :currentPlanId="currentPlanId"
      />
      <KpiCardGrid />
    </div> -->
    <p class="text-text-secondary mb-4">Here's a summary of your API usage.</p>
    <ContentFetchedCard :currentUsage="currentUsage" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="box">
        <div class="text-base font-medium mb-6">API Calls Over Time (Last 7 Days)</div>
        <LineChart :data="usageOverTimeData" :options="usageOverTimeOptions" class="w-full h-64" />
      </div>
      <div class="box">
        <div class="text-base font-medium mb-6">Endpoint Usage Breakdown</div>
        <BarChart :data="endpointUsageData" :options="endpointUsageOptions" class="w-full h-64" />
      </div>
    </div>

    <RecentActivityTable :recentActivity="recentActivity" />
  </main>
</template>

<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
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
import { Bell, User } from "lucide-vue-next";

// Import child components
import ContentFetchedCard from "@/components/dashboard/ContentFetchedCard.vue";
import RecentActivityTable from "@/components/dashboard/RecentActivityTable.vue";
import { useAuthStore } from "@/stores/Auth";
import { storeToRefs } from "pinia";
import { useApiService } from "@/services/apiService";
import { FwbSpinner } from "flowbite-vue";

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

const authStore = useAuthStore();
const { user, key } = storeToRefs(authStore);
const { get } = useApiService();

const loading = ref(true);
const currentUsage = reactive({
  questions: 0,
  notes: 0,
  flashcards: 0,
  videos: 0,
});

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
      data: [0, 0, 0, 0, 0, 0, 0],
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

const loadData = async () => {
  try {
    const questions = await get(
      `/api/v1/usage-stats/counts?key_id=${key.value.id}&query_type=QUESTIONS&period=${30}`,
    );
    const lessons = await get(
      `/api/v1/usage-stats/counts?key_id=${key.value.id}&query_type=LESSON_NOTES&period=${30}`,
    );
    const videos = await get(
      `/api/v1/usage-stats/counts?key_id=${key.value.id}&query_type=VIDEOS&period=${30}`,
    );
    const cards = await get(
      `/api/v1/usage-stats/counts?key_id=${key.value.id}&query_type=CARDS&period=${30}`,
    );
    console.log(questions, lessons, videos, cards);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onBeforeMount(() => {
  loadData();
});
</script>
