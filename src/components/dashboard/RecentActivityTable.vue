<template>
  <div class="bg-card-bg rounded-xl p-6 shadow-custom border border-border-color mt-6">
    <div class="text-lg font-semibold mb-6 text-text-primary">Recent Activity</div>
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th
            class="text-left py-3 px-4 border-b border-border-color text-xs uppercase text-text-secondary"
          >
            Timestamp
          </th>
          <th
            class="text-left py-3 px-4 border-b border-border-color text-xs uppercase text-text-secondary"
          >
            Endpoint
          </th>
          <!-- <th
            class="text-left py-3 px-4 border-b border-border-color text-xs uppercase text-text-secondary"
          >
            Status
          </th> -->
          <!-- <th
            class="text-left py-3 px-4 border-b border-border-color text-xs uppercase text-text-secondary"
          >
            Latency
          </th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in recentActivity" :key="activity.id">
          <td class="py-3 px-4 border-b border-border-color">{{ activity.timestamp }}</td>
          <td class="py-3 px-4 border-b border-border-color">{{ activity.endpoint }}</td>
          <!-- <td class="py-3 px-4 border-b border-border-color">
            <span
              :class="
                activity.status === 'Success'
                  ? 'px-2 py-1 rounded-full font-semibold text-xs bg-green-100 text-green-800'
                  : 'px-2 py-1 rounded-full font-semibold text-xs bg-red-100 text-red-800'
              "
            >
              {{ activity.status }}
            </span>
          </td> -->
          <!-- <td class="py-3 px-4 border-b border-border-color">{{ activity.latency }}</td> -->
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
})
</script>
