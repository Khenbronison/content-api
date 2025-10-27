<template>
  <!-- Mobile Menu Button (only visible on mobile) -->
  <button
    @click="toggleMobileMenu"
    class="fixed top-4 left-4 z-50 p-3 bg-blue-950 text-white rounded-md lg:hidden hover:bg-blue-900 transition-colors">
    <Menu :size="24" />
  </button>

  <!-- Mobile Overlay -->
  <div
    v-if="isMobileMenuOpen"
    @click="closeMobileMenu"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"></div>

  <!-- Sidebar -->
  <aside
    :class="[
      'bg-blue-950 text-text-light h-screen fixed transition-all duration-300 ease-in-out z-40',
      // Desktop styles
      'lg:rounded-r-lg',
      isCollapsed ? 'lg:w-28' : 'lg:w-64',
      // Mobile styles - drawer from left
      'lg:translate-x-0',
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
      'w-64 rounded-r-lg',
    ]">
    <div class="p-6 flex flex-col h-full">
      <!-- Header with Toggle -->
      <div class="flex items-center justify-between mb-8">
        <h1
          :class="[
            'text-base font-semibold text-white transition-all duration-300 whitespace-nowrap overflow-hidden',
            isCollapsed && !isMobileMenuOpen ? 'opacity-0 hidden' : 'opacity-100',
          ]">
          GHCurriculum API
        </h1>

        <!-- Desktop Toggle (hidden on mobile) -->
        <button
          @click="toggleSidebar"
          class="hidden lg:block py-3 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
          :class="isCollapsed ? 'mx-auto' : ''">
          <img src="../../assets/icons/collapse.svg" v-if="!isCollapsed" width="20" />
          <img src="../../assets/icons/expand.svg" v-else width="20" />
        </button>

        <!-- Mobile Close Button -->
        <button
          @click="closeMobileMenu"
          class="lg:hidden p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
          <X :size="20" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1">
        <ul class="space-y-2">
          <li v-for="item in navItems" :key="item.path">
            <router-link
              :to="item.path"
              @click="closeMobileMenu"
              class="flex items-center py-3 px-4 rounded-md transition-colors duration-200 hover:bg-gray-700 font-medium relative group">
              <component
                :is="item.icon"
                :size="20"
                :class="['flex-shrink-0', isCollapsed && !isMobileMenuOpen ? 'mx-auto' : 'mr-3']" />
              <span
                :class="[
                  'transition-all duration-300 whitespace-nowrap overflow-hidden',
                  isCollapsed && !isMobileMenuOpen ? 'opacity-0 hidden' : 'opacity-100',
                ]">
                {{ item.label }}
              </span>

              <!-- Tooltip for collapsed state (desktop only) -->
              <div
                v-if="isCollapsed && !isMobileMenuOpen"
                class="hidden lg:block absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                {{ item.label }}
                <div
                  class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
              </div>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Logout at bottom -->
      <div class="mt-auto cursor-pointer">
        <div
          @click="toggleShowLogoutModal"
          class="flex items-center py-3 px-4 rounded-md transition-colors duration-200 hover:bg-gray-700 font-medium relative group">
          <LogOut
            :size="20"
            :class="['flex-shrink-0', isCollapsed && !isMobileMenuOpen ? 'mx-auto' : 'mr-3']" />
          <span
            :class="[
              'transition-all duration-300 whitespace-nowrap overflow-hidden',
              isCollapsed && !isMobileMenuOpen ? 'opacity-0 hidden' : 'opacity-100',
            ]">
            Logout
          </span>

          <!-- Tooltip for collapsed state (desktop only) -->
          <div
            v-if="isCollapsed && !isMobileMenuOpen"
            class="hidden lg:block absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
            Logout
            <div
              class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
          </div>
        </div>
      </div>
    </div>
  </aside>

  <div class="fixed z-[1000]">
    <ConfirmLogout @close="toggleShowLogoutModal" @confirm-logout="logout" v-if="showLogoutModal" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Key,
  CreditCard,
  LogOut,
  Menu,
  X,
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/Auth";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import ConfirmLogout from "../login/ConfirmLogout.vue";

const emit = defineEmits(["toggle"]);
const authStore = useAuthStore();
const router = useRouter();
const { showLogoutModal } = storeToRefs(authStore);

const isCollapsed = ref(false);
const isMobileMenuOpen = ref(false);

// Load collapsed state from localStorage on mount (desktop only)
onMounted(() => {
  const savedState = localStorage.getItem("sidebar-collapsed");
  if (savedState !== null) {
    isCollapsed.value = savedState === "true";
  }
  // Emit initial state
  emit("toggle", isCollapsed.value);
});

// Save collapsed state to localStorage (desktop only)
watch(isCollapsed, (newValue) => {
  localStorage.setItem("sidebar-collapsed", newValue.toString());
  emit("toggle", newValue);
});

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/api/documentation", label: "API Documentation", icon: FileText },
  { path: "/api/keys", label: "API Keys", icon: Key },
  { path: "/billing", label: "Billing", icon: CreditCard },
];

const toggleShowLogoutModal = () => {
  showLogoutModal.value = !showLogoutModal.value;
};

const logout = () => {
  authStore.logoutUser();
  closeMobileMenu();
};
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
