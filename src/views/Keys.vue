<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import ApiKeyEmptyState from '@/components/apikeys/ApiKeyEmptyState.vue'
import ApiKeyDisplay from '@/components/apikeys/ApiKeyDisplay.vue'
import ShowKeyModal from '@/components/apikeys/ShowKeyModal.vue'
import ConfirmRevokeModal from '@/components/apikeys/ConfirmRevokeModal.vue'
import { useNotification } from '@kyvg/vue3-notification'
import { useApiService } from '@/services/apiService'
import { useAuthStore } from '@/stores/Auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { notify } = useNotification()
const { get, post, deletes } = useApiService()
const { user } = storeToRefs(authStore)
// --- State Owner ---
const apiKey = ref(null)
const newlyGeneratedKey = ref('')
const isShowKeyModalVisible = ref(false)
const isConfirmRevokeModalVisible = ref(false)
const isGetKeyLoading = ref(false)
const isGenerateApiKeyLoading = ref(false)
const isRemoveApiKeyLoading = ref(false)
// --- Computed Properties ---
const maskedApiKey = computed(() => {
  if (!apiKey.value?.key) return ''
  const key = apiKey.value.key
  return `${key.substring(0, 11)}...${key.substring(key.length - 4)}`
})

const creationDate = computed(() => {
  if (!apiKey.value?.createdAt) return ''
  return new Date(apiKey.value.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

// --- Business Logic / Event Handlers ---
const getApiKey = async () => {
  isGetKeyLoading.value = true
  try {
    const userApiKey = await get('/api/v1/api-keys')
    apiKey.value = userApiKey[0]
    console.log(apiKey.value)
  } catch (error) {
  } finally {
    isGetKeyLoading.value = false
  }
}

const generateApiKey = async () => {
  isGenerateApiKeyLoading.value = true

  try {
    const generatedApiKey = await post('/api/v1/api-keys', { name: user.value })
    newlyGeneratedKey.value = generatedApiKey
    console.log(newlyGeneratedKey.value)
  } catch (error) {
  } finally {
    isGenerateApiKeyLoading.value = false
  }
}

const handleCreateKeyRequested = () => {
  newlyGeneratedKey.value = generateApiKey()
  isShowKeyModalVisible.value = true
}

const handleRevokeKeyRequested = () => {
  isConfirmRevokeModalVisible.value = true
}

const confirmKeyCreation = () => {
  apiKey.value = {
    key: newlyGeneratedKey.value,
    createdAt: new Date().toISOString(),
  }
  isShowKeyModalVisible.value = false
  newlyGeneratedKey.value = ''
}

const confirmKeyRevocation = async () => {
  isRemoveApiKeyLoading.value = true
  try {
    const removeApiKey = await deletes(`/api/v1/api-key/${apiKey.value.id}`)
    notify({ type: 'success', title: 'success', text: removeApiKey.message })
    apiKey.value = null
  } catch (error) {
  } finally {
    isRemoveApiKeyLoading.value = false
    isConfirmRevokeModalVisible.value = false
  }
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    // notify({ type: 'success', text: 'API Key copied to clipboard!' });
  } catch (err) {
    console.error('Failed to copy text: ', err)
    // notify({ type: 'error', text: 'Failed to copy key.' });
  }
}

onBeforeMount(() => {
  getApiKey()
})
</script>

<template>
  <main class="w-full p-4 md:p-8 min-h-screen">
    <header class="pb-4 mb-4 border-b border-gray-200">
      <h2 class="text-3xl font-bold text-gray-800">API Keys</h2>
    </header>

    <div class="max-w-4xl">
      <!-- ===== THIS SECTION HAS BEEN UPDATED ===== -->
      <div class="text-gray-600 leading-relaxed space-y-2 mb-12">
        <p>
          Your secret API key is used to authenticate requests to our servers. You can create one
          API key for this project.
        </p>
        <p>
          <strong class="font-semibold text-gray-800">Important:</strong> Do not share your API key
          with others or expose it in the browser or other client-side code. For security, we will
          only show you the key once upon creation. View usage per API key on the
          <!-- Use RouterLink for internal navigation in a Vue app -->
          <RouterLink to="/analytics" class="text-blue-600 hover:underline font-medium"
            >Analytics page</RouterLink
          >.
        </p>
      </div>
      <!-- ===== END OF UPDATED SECTION ===== -->

      <!-- Conditionally render child components based on state -->
      <ApiKeyEmptyState v-if="!apiKey" @create-key-requested="handleCreateKeyRequested" />

      <ApiKeyDisplay
        v-else
        :key-id="apiKey.id"
        :api-key="apiKey.key"
        :masked-key="maskedApiKey"
        :creation-date="creationDate"
        @copy-key="copyToClipboard"
        @revoke-key-requested="handleRevokeKeyRequested"
      />
    </div>

    <!-- Modals are now controlled via v-model -->
    <ShowKeyModal
      v-model:visible="isShowKeyModalVisible"
      :newly-generated-key="newlyGeneratedKey"
      @copy-key="copyToClipboard"
      @key-creation-confirmed="confirmKeyCreation"
    />

    <ConfirmRevokeModal
      v-model:visible="isConfirmRevokeModalVisible"
      @revocation-confirmed="confirmKeyRevocation"
    />
  </main>
</template>
