<script setup>
import { ref } from 'vue'

const activeLink = ref('get-single-quiz')

const navigation = ref([
  { name: 'Introduction', href: '#introduction', isSection: true },
  { name: 'Authentication', href: '#authentication', isSection: true },
  {
    name: 'Quizzes',
    isOpen: true,
    links: [
      { name: 'Get All Quizzes', href: '#get-all-quizzes', id: 'get-all-quizzes' },
      { name: 'Get a Single Quiz', href: '#get-single-quiz', id: 'get-single-quiz' },
    ],
  },
  {
    name: 'Lesson Notes',
    isOpen: false,
    links: [{ name: 'Get All Notes', href: '#get-all-notes', id: 'get-all-notes' }],
  },
  { name: 'Error Handling', href: '#errors', isSection: true },
])

const setActiveLink = (id) => {
  activeLink.value = id
}
</script>

<template>
  <aside class="bg-slate-50 border-r border-slate-200 p-6 h-screen sticky top-0 overflow-y-auto">
    <h1 class="text-2xl font-bold text-blue-600 mb-8">API Docs</h1>
    <nav>
      <ul>
        <li v-for="section in navigation" :key="section.name">
          <!-- Top-level link -->
          <a
            v-if="section.isSection"
            :href="section.href"
            class="font-semibold py-2 block text-slate-800"
            >{{ section.name }}</a
          >

          <!-- Collapsible section -->
          <details v-else :open="section.isOpen" class="group">
            <summary
              class="font-semibold py-2 cursor-pointer list-none text-slate-800 group-open:text-blue-600"
            >
              {{ section.name }}
            </summary>
            <ul class="pl-4 ml-2 border-l-2 border-slate-200 space-y-1">
              <li v-for="link in section.links" :key="link.id">
                <a
                  :href="link.href"
                  @click="setActiveLink(link.id)"
                  class="block py-1.5 text-sm transition-colors"
                  :class="
                    activeLink === link.id
                      ? 'font-medium text-blue-600'
                      : 'text-slate-500 hover:text-slate-700'
                  "
                >
                  {{ link.name }}
                </a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  </aside>
</template>
