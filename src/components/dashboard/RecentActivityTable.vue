<template>
  <div class="box">
    <div class="text-lg font-semibold mb-6 text-text-primary">Recent Activity</div>
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Endpoint</th>
          <th class="hidden md:block">Status</th>
          <th>NUMBER</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in recentActivity" :key="activity.id">
          <td>{{ activity.timestamp }}</td>
          <td>{{ activity.endpoint }}</td>
          <td class="hidden md:block"> 
            <span
              class="px-2 py-1 rounded-full font-semibold text-xs"
              :class="
                activity.status === 'Success'
                  ? ' bg-green-100 text-green-800'
                  : ' bg-red-100 text-red-800'
              ">
              {{ activity.status }}
            </span>
          </td>
          <td>{{ activity.number }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  recentActivity: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
td {
  @apply py-3 px-4 border-b border-border-color;
}

th {
  @apply text-left py-3 px-4 border-b border-border-color text-xs uppercase text-text-secondary;
}
</style>
