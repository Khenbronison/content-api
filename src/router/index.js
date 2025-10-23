import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue'),
        },
        {
          path: '/analytics',
          name: 'analytics',
          component: () => import('../views/Analytics.vue'),
        },
        {
          path: '/billing',
          name: 'billing',
          component: () => import('../views/Billing.vue'),
        },
        {
          path: '/api/keys',
          name: 'keys',
          component: () => import('../views/Keys.vue'),
        },
      ],
    },
    {
      path: '/api/documentation',
      name: 'documentation',
      component: () => import('../views/Documentation.vue'),
    },
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'logout',
      component: LoginView,
    },
  ],
})

export default router
