<template>
  <FwbModal size="md" @close="closeModal" position="center">
    <template #header>
      <p class="font-semibold text-base">Confirm Logout</p>
    </template>
    <template #body>
      <p class="text-base text-center">Are you sure you want to logout?</p>
    </template>
    <template #footer>
      <div class="flex items-center gap-4">
        <button class="modal-button bg-gray-200" @click="closeModal">No</button>
        <button class="modal-button bg-red-600 text-white" @click="logout">Yes</button>
      </div>
    </template>
  </FwbModal>
</template>

<script setup>
import { FwbModal } from "flowbite-vue";

const emit = defineEmits(["close", "confirm-logout"]);

const closeModal = () => {
  emit("close");
};

const logout = () => {
  emit("confirm-logout");
};
</script>

<style scoped>
.modal-button {
  @apply w-full py-2 rounded-lg text-base font-medium hover:opacity-80;
}
</style>
