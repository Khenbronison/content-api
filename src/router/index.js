import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { useAuthStore } from "@/stores/Auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/Dashboard.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/analytics",
          name: "analytics",
          component: () => import("../views/Analytics.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/billing",
          name: "billing",
          component: () => import("../views/Billing.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/api/keys",
          name: "keys",
          component: () => import("../views/Keys.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/api/documentation",
      name: "documentation",
      component: () => import("../views/Documentation.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
  ],
});

// ✅ Single unified navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  window.scrollTo(0, 0);

  if (to.name === "login" && authStore.isAuthenticated) {
    return next({ name: "dashboard" });
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: "login" });
  }

  next();
});

export default router;
