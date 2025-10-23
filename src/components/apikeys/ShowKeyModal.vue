<!-- components/api-keys/ShowKeyModal.vue -->
<template>
  <div
    ref="modalEl"
    tabindex="-1"
    aria-hidden="true"
    class="hidden bg-gray-900/50 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] justify-center items-center w-full md:inset-0 h-full"
  >
    <div class="relative p-4 w-full max-w-2xl h-auto">
      <div class="relative bg-white rounded-lg shadow">
        <div class="flex items-start justify-between p-4 border-b rounded-t">
          <h3 class="text-xl font-semibold text-gray-900">Your Secret Key</h3>
        </div>
        <div class="p-6 space-y-6">
          <div
            class="p-4 bg-yellow-50 text-yellow-800 border-l-4 border-yellow-400 rounded-r-lg"
            role="alert"
          >
            Please save this secret key. <strong>You won't be able to view it again.</strong>
          </div>
          <div
            class="bg-gray-100 p-4 rounded-lg flex justify-between items-center font-mono text-gray-800 break-all"
          >
            <span>{{ newlyGeneratedKey }}</span>
            <button
              @click="handleCopy"
              class="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1 px-3 rounded-md text-sm shrink-0"
            >
              {{ copyBtnText }}
            </button>
          </div>
        </div>
        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
          <button
            @click="$emit('key-creation-confirmed')"
            class="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Modal } from 'flowbite'

const props = defineProps({
  visible: { type: Boolean, default: false },
  newlyGeneratedKey: { type: String, required: true },
})

const emit = defineEmits(['update:visible', 'copy-key', 'key-creation-confirmed'])

const modalEl = ref(null)
let modalInstance = null
const copyBtnText = ref('Copy')

onMounted(() => {
  modalInstance = new Modal(modalEl.value)
})

// Watch the 'visible' prop to programmatically show/hide the modal
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

const handleCopy = () => {
  emit('copy-key', props.newlyGeneratedKey)
  copyBtnText.value = 'Copied!'
  setTimeout(() => {
    copyBtnText.value = 'Copy'
  }, 2000)
}
</script>
