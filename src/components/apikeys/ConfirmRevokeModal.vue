<!-- components/api-keys/ConfirmRevokeModal.vue -->
<template>
  <div
    ref="modalEl"
    tabindex="-1"
    aria-hidden="true"
    class="hidden bg-gray-900/50 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] justify-center items-center w-full md:inset-0 h-full"
  >
    <div class="relative p-4 w-full max-w-md h-auto">
      <div class="relative bg-white rounded-lg shadow">
        <div class="flex items-start justify-between p-4 border-b rounded-t">
          <h3 class="text-xl font-semibold text-gray-900">Revoke API Key</h3>
        </div>
        <div class="p-6 space-y-6">
          <div class="flex items-start gap-4">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <Trash2 class="h-6 w-6 text-red-600" />
            </div>
            <p class="text-gray-600">
              Are you sure? This action is irreversible and will immediately break any application
              using this key.
            </p>
          </div>
        </div>
        <div class="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b">
          <button
            @click="emit('update:visible', false)"
            class="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="$emit('revocation-confirmed')"
            class="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Yes, Revoke Key
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Modal } from 'flowbite'
import { Trash2 } from 'lucide-vue-next'

const props = defineProps({
  visible: { type: Boolean, default: false },
})

const emit = defineEmits(['update:visible', 'revocation-confirmed'])

const modalEl = ref(null)
let modalInstance = null

onMounted(() => {
  modalInstance = new Modal(modalEl.value)
})

watch(
  () => props.visible,
  (isVisible) => {
    if (isVisible) {
      modalInstance?.show()
    } else {
      modalInstance?.hide()
    }
  },
)
</script>
