<script setup>
import { ref } from "vue";

const activeLink = ref("introduction"); // Set a default active link

const navigation = ref([
  { name: "Introduction", href: "#introduction", isSection: true },
  { name: "Authentication", href: "#authentication", isSection: true },
  {
    name: "Questions API",
    isOpen: false, // Keep this open by default or based on user preference
    links: [
      { name: "Get Questions", href: "#getquestions", id: "getquestions" },
      { name: "Get a Single Question", href: "#getsinglequestion", id: "getsinglequestion" },
    ],
  },
  {
    name: "Lessons API",
    isOpen: false,
    links: [
      { name: "Get Lessons", href: "#getlessons", id: "getlessons" },
      { name: "Get a Single Lesson", href: "#getsinglelesson", id: "getsinglelesson" },
    ],
  },
  {
    name: "Videos API",
    isOpen: false,
    links: [
      { name: "Get Videos", href: "#getvideos", id: "getvideos" },
      { name: "Get a Single Video", href: "#getsinglevideo", id: "getsinglevideo" },
    ],
  },
  { name: "Error Responses", href: "#errorresponses", isSection: true }, // Changed from "Error Handling"
]);

const setActiveLink = (id) => {
  activeLink.value = id;
};
</script>

<template>
  <aside
    class="bg-slate-50 border-r border-slate-200 p-6 h-screen sticky top-0 overflow-y-auto hidden sm:block col-span-1">
    <div class="flex items-center gap-4 mb-8">
      <img
        src="../../assets/icons/back.svg"
        width="19"
        class="cursor-pointer"
        @click="$router.push('/dashboard')" />
      <h1 class="text-2xl font-bold text-blue-600">API Docs</h1>
    </div>
    <nav>
      <ul>
        <li v-for="section in navigation" :key="section.name">
          <!-- Top-level link -->
          <a
            v-if="section.isSection"
            :href="section.href"
            @click="setActiveLink(section.href.substring(1))"
            class="font-semibold py-2 block text-slate-800"
            >{{ section.name }}</a
          >

          <!-- Collapsible section -->
          <details v-else :open="section.isOpen" class="group">
            <summary
              class="font-semibold py-2 cursor-pointer list-none text-slate-800 group-open:text-blue-600">
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
                  ">
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
