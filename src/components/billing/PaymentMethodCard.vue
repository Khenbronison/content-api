<!-- components/billing/PaymentMethodCard.vue -->
<template>
  <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
    <h3 class="font-semibold text-lg text-gray-900 mb-5">Payment Method</h3>
    <div class="flex items-center gap-4">
      <CreditCard class="h-10 w-10 text-gray-400" />
      <div class="flex-grow">
        <span class="font-medium text-gray-700">Visa ending in 4242</span>
        <span class="block text-sm text-gray-500">Expires 12/2025</span>
      </div>
      <button class="font-medium text-sm text-blue-600 hover:text-blue-700">Update</button>
    </div>
  </div>
</template>

<script setup>
import { CreditCard } from 'lucide-vue-next'
</script>
