<!-- components/api-keys/ApiKeyDisplay.vue -->
<template>
  <div
    class="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div class="space-y-2">
      <h4 class="font-semibold text-gray-900">Your Secret Key</h4>
      <code class="bg-gray-100 text-gray-700 py-1 px-2 rounded-md font-mono text-sm">{{
        maskedKey
      }}</code>
      <div class="text-sm text-gray-500">Created on: {{ creationDate }}</div>
    </div>
    <div class="flex items-center gap-2 flex-shrink-0">
      <button
        @click="handleCopy"
        class="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
        {{ copyBtnText }}
      </button>
      <button
        @click="$emit('revoke-key-requested')"
        class="bg-white border border-red-500 text-red-500 font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-colors text-sm">
        Revoke
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  keyId: { type: String, required: true },
  apiKey: { type: String, required: true },
  maskedKey: { type: String, required: true },
  creationDate: { type: String, required: true },
});

const emit = defineEmits(["copy-key", "revoke-key-requested"]);

const copyBtnText = ref("Copy");

const handleCopy = () => {
  // Emit the full key to the parent to handle the copy logic
  emit("copy-key", props.apiKey);
  copyBtnText.value = "Copied!";
  setTimeout(() => {
    copyBtnText.value = "Copy";
  }, 2000);
};
</script>
