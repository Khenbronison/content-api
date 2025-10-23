<!-- components/billing/BillingHistoryCard.vue -->
<template>
  <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm w-full">
    <h3 class="font-semibold text-lg text-gray-900 mb-4">Billing History</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="border-b border-gray-200">
          <tr>
            <th class="text-left font-semibold text-gray-500 uppercase py-3 px-2">Date</th>
            <th class="text-left font-semibold text-gray-500 uppercase py-3 px-2">Amount</th>
            <th class="text-left font-semibold text-gray-500 uppercase py-3 px-2">Status</th>
            <th class="text-left font-semibold text-gray-500 uppercase py-3 px-2">Invoice</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in history" :key="item.date" class="border-b border-gray-200">
            <td class="py-4 px-2 text-gray-600">{{ item.date }}</td>
            <td class="py-4 px-2 text-gray-800 font-medium">{{ item.amount }}</td>
            <td class="py-4 px-2">
              <span
                class="inline-block py-1 px-2.5 rounded-full font-semibold text-xs bg-green-100 text-green-800"
              >
                {{ item.status }}
              </span>
            </td>
            <td class="py-4 px-2">
              <a
                :href="item.invoiceUrl"
                class="font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Download class="h-4 w-4" />
                <span>Download</span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { Download } from 'lucide-vue-next'
defineProps({
  history: {
    type: Array,
    required: true,
  },
})
</script>
