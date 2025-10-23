<!-- components/api-keys/ApiKeyEmptyState.vue -->
<template>
  <div class="text-center py-16">
    <div
      class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
    >
      <Lock class="w-8 h-8" />
    </div>
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Create your API key to get started</h3>
    <button
      @click="$emit('create-key-requested')"
      class="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
    >
      <KeyRound class="w-5 h-5" />
      Create new secret key
    </button>
  </div>
</template>

<script setup>
import { Lock, KeyRound } from 'lucide-vue-next'

// Define the event this component can emit
defineEmits(['create-key-requested'])
</script>
