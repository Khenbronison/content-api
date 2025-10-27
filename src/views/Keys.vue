<script setup>
import { ref, computed, onBeforeMount } from "vue";
import ApiKeyEmptyState from "@/components/apikeys/ApiKeyEmptyState.vue";
import ApiKeyDisplay from "@/components/apikeys/ApiKeyDisplay.vue";
import ShowKeyModal from "@/components/apikeys/ShowKeyModal.vue";
import ConfirmRevokeModal from "@/components/apikeys/ConfirmRevokeModal.vue";
import { useNotification } from "@kyvg/vue3-notification";
import { useApiService } from "@/services/apiService";
import { useAuthStore } from "@/stores/Auth";
import { storeToRefs } from "pinia";
import { FwbSpinner } from "flowbite-vue";

const authStore = useAuthStore();
const { notify } = useNotification();
const { get, post, deletes } = useApiService();
const { user } = storeToRefs(authStore);

// --- State ---
const apiKey = ref(null);
const newlyGeneratedKey = ref("");
const isShowKeyModalVisible = ref(false);
const isConfirmRevokeModalVisible = ref(false);
const isGetKeyLoading = ref(false);
const isGenerateApiKeyLoading = ref(false);

// --- Computed Properties ---
const maskedApiKey = computed(() => {
  if (!apiKey.value?.key) return "";
  const key = apiKey.value.key;
  return `${key.substring(0, 11)}...${key.substring(key.length - 4)}`;
});

const creationDate = computed(() => {
  if (!apiKey.value?.createdAt) return "";
  return new Date(apiKey.value.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// --- Business Logic / Event Handlers ---
const getApiKey = async () => {
  isGetKeyLoading.value = true;
  try {
    const userApiKey = await get("/api/v1/api-keys");
    apiKey.value = userApiKey[0];
    console.log(apiKey.value);
  } catch (error) {
  } finally {
    isGetKeyLoading.value = false;
  }
};

const generateApiKey = async () => {
  isGenerateApiKeyLoading.value = true;

  try {
    const generatedApiKey = await post("/api/v1/api-keys", { name: user.value });
    apiKey.value = generatedApiKey;
    return generatedApiKey;
  } catch (error) {
  } finally {
    isGenerateApiKeyLoading.value = false;
  }
};

const handleCreateKeyRequested = async () => {
  apiKey.value = await generateApiKey();
  isShowKeyModalVisible.value = true;
};

const handleRevokeKeyRequested = () => {
  isConfirmRevokeModalVisible.value = true;
};

const closeRevokeModal = () => {
  isConfirmRevokeModalVisible.value = false;
};

const confirmKeyCreation = () => {
  isShowKeyModalVisible.value = false;
};

const confirmKeyRevocation = async () => {
  apiKey.value = null;
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    notify({ type: "success", text: "API Key copied to clipboard!" });
  } catch (err) {
    console.error("Failed to copy text: ", err);
    notify({ type: "error", text: "Failed to copy key." });
  }
};

onBeforeMount(() => {
  getApiKey();
});
</script>

<template>
  <main class="w-full p-4 md:p-8 min-h-screen">
    <header class="pb-4 mb-4 border-b border-gray-200">
      <h2 class="text-2xl font-medium text-gray-800">API Keys</h2>
    </header>

    <div v-if="isGetKeyLoading" class="flex justify-center items-center gap-2 h-[20vh]">
      <FwbSpinner color="blue" size="5" />
      <!-- <p class="text-sm font-medium text-gray-700">Fetching Keys</p> -->
    </div>
    <div v-else>
      <!-- ===== THIS SECTION HAS BEEN UPDATED ===== -->
      <div class="text-gray-600 leading-relaxed space-y-2 mb-12">
        <p>
          Your secret API key is used to authenticate requests to our servers. You can create one
          API key for this project.
        </p>
        <p>
          <strong class="font-semibold text-red-600">Important:</strong> Do not share your API key
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
      <!-- Show spinner while generating -->
      <div v-if="isGenerateApiKeyLoading" class="flex h-[30vh] justify-center">
        <FwbSpinner size="5" color="blue" />
      </div>

      <!-- Show empty state when no key exists and not loading -->
      <ApiKeyEmptyState v-else-if="!apiKey" @create-key-requested="handleCreateKeyRequested" />

      <!-- Show the key when it exists and not loading -->
      <ApiKeyDisplay
        v-else
        :key-id="apiKey.id"
        :api-key="apiKey.key"
        :masked-key="maskedApiKey"
        :creation-date="creationDate"
        @copy-key="copyToClipboard"
        @revoke-key-requested="handleRevokeKeyRequested" />
    </div>

    <!-- Modals are now controlled via v-model -->
    <ShowKeyModal
      v-if="isShowKeyModalVisible"
      v-model:visible="isShowKeyModalVisible"
      :newly-generated-key="apiKey?.key"
      @copy-key="copyToClipboard"
      @key-creation-confirmed="confirmKeyCreation" />

    <ConfirmRevokeModal
      v-if="isConfirmRevokeModalVisible"
      :api-key="apiKey?.id"
      @revocation-confirmed="confirmKeyRevocation"
      @close="closeRevokeModal" />
  </main>
</template>
