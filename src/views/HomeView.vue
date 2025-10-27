<script setup>
import { ref } from "vue";
import SideBar from "@/components/navigation/SideBar.vue";

const isCollapsed = ref(false);

// Sidebar toggles this value through an emitted event
const handleSidebarToggle = (value) => {
  isCollapsed.value = value;
};
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <SideBar @toggle="handleSidebarToggle" />

    <!-- Main content area -->
    <div
      class="flex-1 transition-all duration-300"
      :class="[
        'lg:ml-64', // Default margin on desktop (16rem = 256px)
        { 'lg:!ml-28': isCollapsed }, // Collapsed margin on desktop (7rem = 112px)
      ]">
      <div class="p-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>
