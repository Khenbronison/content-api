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
      :style="{ marginLeft: isCollapsed ? '5rem' : '16rem' }">
      <div class="p-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>
