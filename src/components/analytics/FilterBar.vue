<!-- components/analytics/FilterBar.vue -->
<template>
  <div class="box mb-8 flex items-end gap-6 flex-wrap">
    <!-- Date Range -->
    <div class="flex flex-col">
      <label for="dateRangeSelect" class="text-xs font-semibold text-gray-500 mb-1"
        >Date Range</label
      >
      <select
        id="dateRangeSelect"
        v-model="filters.dateRange"
        class="px-3 py-2 border border-gray-300 rounded-md text-sm">
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="90">Last 90 Days</option>
        <option value="custom">Custom Range</option>
      </select>
    </div>

    <!-- Custom Date Inputs -->
    <div v-show="filters.dateRange === 'custom'" class="flex gap-2">
      <div class="flex flex-col">
        <label for="startDate" class="text-xs font-semibold text-gray-500 mb-1">Start Date</label>
        <input
          type="date"
          id="startDate"
          v-model="filters.startDate"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm" />
      </div>
      <div class="flex flex-col">
        <label for="endDate" class="text-xs font-semibold text-gray-500 mb-1">End Date</label>
        <input
          type="date"
          id="endDate"
          v-model="filters.endDate"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm" />
      </div>
    </div>

    <!-- Content Type -->
    <div class="flex flex-col">
      <label for="contentTypeSelect" class="text-xs font-semibold text-gray-500 mb-1"
        >Content Type</label
      >
      <select
        id="contentTypeSelect"
        v-model="filters.contentType"
        class="px-3 py-2 border border-gray-300 rounded-md text-sm">
        <option value="all">All Content Types</option>
        <option value="Quizzes">Quiz Questions</option>
        <option value="Lesson Notes">Lesson Notes</option>
        <option value="Videos">Videos</option>
        <option value="Flashcards">Flashcards</option>
      </select>
    </div>

    <!-- Apply Button -->
    <button
      @click="emitFilters"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition-colors">
      Apply Filters
    </button>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import { format, subDays } from "date-fns";

const emit = defineEmits(["apply-filters"]);

const filters = reactive({
  dateRange: "30",
  startDate: format(subDays(new Date(), 30), "yyyy-MM-dd"),
  endDate: format(new Date(), "yyyy-MM-dd"),
  contentType: "all",
});

const emitFilters = () => {
  emit("apply-filters", { ...filters });
};

// Watch for changes in predefined ranges and apply filters automatically
watch(
  () => filters.dateRange,
  (newRange) => {
    if (newRange !== "custom") {
      emitFilters();
    }
  },
);

// Emit initial filters on component mount
emitFilters();
</script>
