<!-- views/Analytics.vue -->
<template>
  <main class="flex-1 p-8">
    <header class="mb-6">
      <h2 class="text-2xl font-medium text-gray-800">Detailed Analytics</h2>
    </header>

    <!-- The FilterBar emits its state, which we handle here -->
    <FilterBar @apply-filters="handleFiltersUpdate" />

    <!-- KPI Grid using the reusable KpiCard component -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <KpiCard title="Total API Calls" :value="formatNumber(kpis.totalCalls)" />
      <KpiCard title="Success Rate" :value="kpis.successRate" unit="%" />
      <KpiCard title="Total Errors" :value="formatNumber(kpis.totalErrors)" />
      <KpiCard title="Avg. Latency" :value="kpis.avgLatency" unit="ms" />
    </div>

    <!-- Charts are placed inside the reusable ChartWrapper -->
    <div class="space-y-6">
      <ChartWrapper title="API Calls Over Time">
        <Line :data="usageChartData" :options="usageChartOptions" :key="chartKey" />
      </ChartWrapper>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper title="Error Breakdown">
          <Doughnut
            :data="errorChartData"
            :options="errorChartOptions"
            :key="chartKey + '-error'" />
        </ChartWrapper>
        <ChartWrapper title="Content Type Distribution">
          <Bar
            :data="contentDistributionChartData"
            :options="contentDistributionChartOptions"
            :key="chartKey + '-content'" />
        </ChartWrapper>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import FilterBar from "@/components/analytics/FilterBar.vue";
import KpiCard from "@/components/analytics/KpiCard.vue";
import ChartWrapper from "@/components/analytics/ChartWrapper.vue";
import { Line, Doughnut, Bar } from "vue-chartjs";
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
  ArcElement,
  Filler,
} from "chart.js";
import {
  subDays,
  startOfDay,
  endOfDay,
  isAfter,
  isBefore,
  isEqual,
  format,
  addDays,
} from "date-fns";

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
  ArcElement,
  Filler,
);

// --- STATE MANAGEMENT ---
const activeFilters = ref(null);
const chartKey = ref(0);
const dummyLogs = generateDummyData(); // Your data generation function

// --- EVENT HANDLER ---
// This function is called when the FilterBar component emits its state
const handleFiltersUpdate = (filters) => {
  activeFilters.value = filters;
};

// --- REACTIVE COMPUTED PROPERTIES ---
// These automatically recalculate whenever `activeFilters` changes.

const dateRange = computed(() => {
  if (!activeFilters.value) return { startDate: new Date(), endDate: new Date() };

  const { dateRange, startDate, endDate } = activeFilters.value;
  const now = new Date();

  if (dateRange === "custom") {
    return { startDate: startOfDay(new Date(startDate)), endDate: endOfDay(new Date(endDate)) };
  }
  return { startDate: startOfDay(subDays(now, parseInt(dateRange))), endDate: endOfDay(now) };
});

const filteredLogs = computed(() => {
  if (!activeFilters.value) return [];

  const { startDate, endDate } = dateRange.value;
  const { contentType } = activeFilters.value;

  return dummyLogs.filter((log) => {
    const logDate = log.timestamp;
    const isAfterStart = isAfter(logDate, startDate) || isEqual(logDate, startDate);
    const isBeforeEnd = isBefore(logDate, endDate) || isEqual(logDate, endDate);
    const contentTypeMatch = contentType === "all" || log.contentType === log.contentType;
    return isAfterStart && isBeforeEnd && contentTypeMatch;
  });
});

const kpis = computed(() => {
  const logs = filteredLogs.value;
  const totalCalls = logs.length;
  const successfulCalls = logs.filter((l) => l.status < 400).length;
  const totalErrors = totalCalls - successfulCalls;
  const successRate = totalCalls > 0 ? ((successfulCalls / totalCalls) * 100).toFixed(1) : "100.0";
  const avgLatency =
    totalCalls > 0 ? (logs.reduce((sum, l) => sum + l.latency, 0) / totalCalls).toFixed(0) : "0";

  return { totalCalls, successRate, totalErrors, avgLatency };
});

// --- CHART DATA (NOW FULLY IMPLEMENTED) ---

const usageChartData = computed(() => {
  const logs = filteredLogs.value;
  const { startDate, endDate } = dateRange.value;

  if (!logs.length || !startDate || !endDate) {
    return { labels: [], datasets: [{ data: [] }] };
  }

  const callsByDay = {};
  let currentDate = startDate;
  while (isBefore(currentDate, endDate) || isEqual(currentDate, endDate)) {
    callsByDay[format(currentDate, "MMM dd")] = 0;
    currentDate = addDays(currentDate, 1);
  }

  logs.forEach((log) => {
    const day = format(log.timestamp, "MMM dd");
    if (callsByDay[day] !== undefined) callsByDay[day]++;
  });

  return {
    labels: Object.keys(callsByDay),
    datasets: [
      {
        label: "API Calls",
        data: Object.values(callsByDay),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.1,
        fill: true,
      },
    ],
  };
});

const errorChartData = computed(() => {
  const logs = filteredLogs.value;
  const errorCounts = {};
  logs
    .filter((l) => l.status >= 400)
    .forEach((log) => {
      errorCounts[log.status] = (errorCounts[log.status] || 0) + 1;
    });

  return {
    labels: Object.keys(errorCounts),
    datasets: [
      {
        label: "Error Count",
        data: Object.values(errorCounts),
        backgroundColor: ["#ef4444", "#f97316", "#eab308", "#84cc16"],
      },
    ],
  };
});

const contentDistributionChartData = computed(() => {
  const logs = filteredLogs.value;
  const contentCounts = {};
  logs.forEach((log) => {
    contentCounts[log.contentType] = (contentCounts[log.contentType] || 0) + 1;
  });

  const sortedContent = Object.entries(contentCounts).sort(([, a], [, b]) => b - a);

  return {
    labels: sortedContent.map((entry) => entry[0]),
    datasets: [
      {
        label: "Request Count",
        data: sortedContent.map((entry) => entry[1]),
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"],
        borderRadius: 4,
      },
    ],
  };
});

// --- WATCHER FOR FORCING CHART RE-RENDERS ---
// This ensures charts gracefully update when the data changes.
watch(filteredLogs, () => {
  chartKey.value++;
});

// --- CHART OPTIONS (Unchanged) ---
const usageChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { beginAtZero: true } },
};
const errorChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "top" } },
};
const contentDistributionChartOptions = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { x: { beginAtZero: true } },
};

// --- HELPER & DUMMY DATA FUNCTIONS (Unchanged) ---
const formatNumber = (num) => {
  return num ? num.toLocaleString() : "0";
};

function generateDummyData() {
  const logs = [];
  const TOTAL_LOGS = 15000;
  const today = new Date();

  for (let i = 0; i < TOTAL_LOGS; i++) {
    const daysAgo = Math.floor(Math.pow(Math.random(), 2) * 90);
    const timestamp = subDays(today, daysAgo);

    let contentType;
    const contentTypeRand = Math.random();
    if (contentTypeRand < 0.45) contentType = "Quizzes";
    else if (contentTypeRand < 0.75) contentType = "Lesson Notes";
    else if (contentTypeRand < 0.9) contentType = "Videos";
    else contentType = "Flashcards";

    let status;
    const statusRand = Math.random();
    if (statusRand < 0.97) status = 200;
    else if (statusRand < 0.99) status = 404;
    else if (statusRand < 0.995) status = 401;
    else if (statusRand < 0.998) status = 429;
    else status = 500;

    const latency =
      contentType === "Videos"
        ? Math.floor(Math.random() * 200) + 150
        : Math.floor(Math.random() * 100) + 40;

    logs.push({ timestamp, contentType, status, latency });
  }
  return logs;
}
</script>
