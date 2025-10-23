<template>
  <aside class="w-[20%] bg-sidebar-bg text-text-light p-8 h-screen fixed">
    <h1 class="text-2xl text-center mb-8 text-accent-color font-semibold">GhanaCurriculum API</h1>
    <nav>
      <ul>
        <li class="mb-4">
          <router-link
            to="/dashboard"
            class="block py-3 px-4 rounded-md transition-colors duration-200 hover:bg-gray-700 font-medium"
          >
            Dashboard
          </router-link>
        </li>
        <li class="mb-4">
          <router-link
            to="/analytics"
            class="block py-3 px-4 rounded-md transition-colors duration-200 hover:bg-gray-700 font-medium"
          >
            Analytics
          </router-link>
        </li>
        <li class="mb-4">
          <router-link
            to="/api/documentation"
            class="block py-3 px-4 rounded-md transition-colors duration-200 hover:bg-gray-700 font-medium"
          >
            API Documentation
          </router-link>
        </li>
        <li class="mb-4">
          <router-link
            to="/api/keys"
            class="block py-3 px-4 rounded-md transition-colors duration-200 hover:bg-gray-700 font-medium"
          >
            API Keys
          </router-link>
        </li>
        <li class="mb-4">
          <router-link
            to="/billing"
            class="block py-3 px-4 rounded-md transition-colors duration-200 hover:bg-gray-700 font-medium"
          >
            Billing
          </router-link>
        </li>

        <li class="mt-[90%]">
          <router-link
            to="/"
            class="block py-3 px-4 rounded-md transition-colors duration-200 hover:bg-gray-700 font-medium"
          >
            Logout
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
}
</script>
