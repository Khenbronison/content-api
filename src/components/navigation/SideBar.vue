<template>
  <aside
    :class="[
      'bg-blue-950 text-text-light h-screen rounded-r-lg fixed transition-all duration-300 ease-in-out',
      isCollapsed ? 'w-28' : 'w-64',
    ]">
    <div class="p-6 flex flex-col h-full">
      <!-- Header with Toggle -->
      <div class="flex items-center justify-between mb-8">
        <h1
          :class="[
            'text-base font-semibold text-white transition-all duration-300 whitespace-nowrap overflow-hidden',
            isCollapsed ? 'opacity-0 hidden' : 'opacity-100',
          ]">
          GHCurriculum API
        </h1>
        <button
          @click="toggleSidebar"
          class="py-3 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
          :class="isCollapsed ? 'mx-auto' : ''">
          <img src="../../assets/icons/collapse.svg" v-if="!isCollapsed" width="20" />
          <img src="../../assets/icons/expand.svg" v-else width="20" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1">
        <ul class="space-y-2">
          <li v-for="item in navItems" :key="item.path">
            <router-link
              :to="item.path"
              class="flex items-center py-3 px-4 rounded-md transition-colors duration-200 hover:bg-gray-700 font-medium relative group">
              <component
                :is="item.icon"
                :size="20"
                :class="['flex-shrink-0', isCollapsed ? 'mx-auto' : 'mr-3']" />
              <span
                :class="[
                  'transition-all duration-300 whitespace-nowrap overflow-hidden',
                  isCollapsed ? 'opacity-0 hidden' : 'opacity-100',
                ]">
                {{ item.label }}
              </span>

              <!-- Tooltip for collapsed state -->
              <div
                v-if="isCollapsed"
                class="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                {{ item.label }}
                <div
                  class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
              </div>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Logout at bottom -->
      <div class="mt-auto">
        <router-link
          to="/"
          class="flex items-center py-3 px-4 rounded-md transition-colors duration-200 hover:bg-gray-700 font-medium relative group">
          <LogOut :size="20" :class="['flex-shrink-0', isCollapsed ? 'mx-auto' : 'mr-3']" />
          <span
            :class="[
              'transition-all duration-300 whitespace-nowrap overflow-hidden',
              isCollapsed ? 'opacity-0 hidden' : 'opacity-100',
            ]">
            Logout
          </span>

          <!-- Tooltip for collapsed state -->
          <div
            v-if="isCollapsed"
            class="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
            Logout
            <div
              class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
          </div>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { LayoutDashboard, BarChart3, FileText, Key, CreditCard, LogOut } from "lucide-vue-next";

const emit = defineEmits(["toggle"]);
const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit("toggle", isCollapsed.value);
};

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/api/documentation", label: "API Documentation", icon: FileText },
  { path: "/api/keys", label: "API Keys", icon: Key },
  { path: "/billing", label: "Billing", icon: CreditCard },
];
</script>

<style scoped>
.router-link-active {
  background-color: rgba(198, 210, 213, 0.1);
  color: #ffffff;
}

.router-link-active svg {
  color: #d5f4f0;
}
</style>
