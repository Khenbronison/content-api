<!-- components/api-keys/ConfirmRevokeModal.vue -->
<template>
  <FwbModal size="md" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-semibold text-gray-800">Revoke Key</h3>
    </template>
    <template #body
      ><div class="p-2 space-y-6">
        <div class="flex items-start gap-4">
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <Trash2 class="h-6 w-6 text-red-600" />
          </div>
          <p class="text-gray-600">
            Are you sure? This action is irreversible and will immediately break any application
            using this key.
          </p>
        </div>
      </div></template
    >
    <template #footer>
      <div class="flex items-center justify-end space-x-2">
        <button
          @click="emit('close')"
          class="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button @click="revokeKey" class="flex gap-2 items-center red-button" :disabled="loading">
          <FwbSpinner size="4" color="white" v-if="loading" />
          <span>Yes, Revoke Key</span>
        </button>
      </div></template
    >
  </FwbModal>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Trash2 } from "lucide-vue-next";
import { useApiService } from "@/services/apiService";
import { notify } from "@kyvg/vue3-notification";
import { FwbModal, FwbSpinner } from "flowbite-vue";

const props = defineProps({
  apiKey: { type: String },
});

const emit = defineEmits(["close", "revocation-confirmed"]);

const loading = ref(false);
const { deletes } = useApiService();

const revokeKey = async () => {
  loading.value = true;
  try {
    const removeApiKey = await deletes(`/api/v1/api-key/${props.apiKey}`);
    notify({ type: "success", title: "success", text: removeApiKey.message });
  } catch (error) {
  } finally {
    loading.value = false;
    emit("revocation-confirmed");
    emit("close");
  }
};
</script>

<style scoped>
.red-button {
  @apply bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700;
}
</style>
