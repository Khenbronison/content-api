<template>
  <!-- <div class="bg-card-bg rounded-xl p-6 shadow-custom border border-border-color mb-6">
    <div class="text-lg font-semibold mb-6 text-text-primary">Total Content Fetched This Month</div>
    <div class="grid grid-cols-4">
      <div class="text-center">
        <div class="text-4xl mb-2">❓</div>
        <div class="text-2xl font-semibold">
          {{ currentUsage.questions.toLocaleString() }}
        </div>
        <div class="text-sm text-text-secondary">Questions</div>
      </div>
      <div class="text-center">
        <div class="text-4xl mb-2">📝</div>
        <div class="text-2xl font-semibold">
          {{ currentUsage.notes.toLocaleString() }}
        </div>
        <div class="text-sm text-text-secondary">Lesson Notes</div>
      </div>
      <div class="text-center">
        <div class="text-4xl mb-2">🃏</div>
        <div class="text-2xl font-semibold">
          {{ currentUsage.flashcards.toLocaleString() }}
        </div>
        <div class="text-sm text-text-secondary">Flashcards</div>
      </div>
      <div class="text-center">
        <div class="text-4xl mb-2">📹</div>
        <div class="text-2xl font-semibold">
          {{ currentUsage.videos.toLocaleString() }}
        </div>
        <div class="text-sm text-text-secondary">Videos</div>
      </div>
    </div>
  </div> -->
  <div class="mb-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Questions -->
      <div class="box">
        <div class="flex justify-between mb-2">
          <div class="flex">
            <div class="border-2 border-blue-600 rounded-lg"></div>
            <div class="pl-3">
              <p class="text-gray-500 font-medium">Questions</p>
              <p class="font-semibold text-xl">{{ currentUsage.questions.toLocaleString() }}</p>
            </div>
          </div>
          <div><div class="bg-blue-200/70 rounded-lg p-1">❓</div></div>
        </div>
        <div>
          <p class="text-xs text-gray-600">This Month</p>
        </div>
      </div>
      <!-- Lesson -->
      <div class="box">
        <div class="flex justify-between mb-2">
          <div class="flex">
            <div class="border-2 border-emerald-600 rounded-lg"></div>
            <div class="pl-3">
              <p class="text-gray-500 font-medium">Lesson Notes</p>
              <p class="font-semibold text-xl">{{ currentUsage.notes.toLocaleString() }}</p>
            </div>
          </div>
          <div><div class="bg-emerald-200/70 rounded-lg p-1">📝</div></div>
        </div>
        <div>
          <p class="text-xs text-gray-600">This Month</p>
        </div>
      </div>
      <!-- Flash -->
      <div class="box">
        <div class="flex justify-between mb-2">
          <div class="flex">
            <div class="border-2 border-purple-600 rounded-lg"></div>
            <div class="pl-3">
              <p class="text-gray-500 font-medium">Flashcards</p>
              <p class="font-semibold text-xl">{{ currentUsage.flashcards.toLocaleString() }}</p>
            </div>
          </div>
          <div><div class="bg-purple-200/70 rounded-lg p-1">🃏</div></div>
        </div>
        <div>
          <p class="text-xs text-gray-600">This Month</p>
        </div>
      </div>
      <!-- Vids -->
      <div class="box">
        <div class="flex justify-between mb-2">
          <div class="flex">
            <div class="border-2 border-amber-600 rounded-lg"></div>
            <div class="pl-3">
              <p class="text-gray-500 font-medium">Videos</p>
              <p class="font-semibold text-xl">{{ currentUsage.videos.toLocaleString() }}</p>
            </div>
          </div>
          <div><div class="bg-amber-200/70 rounded-lg p-1">📹</div></div>
        </div>
        <div>
          <p class="text-xs text-gray-600">This Month</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentUsage: {
    type: Object,
    required: true,
  },
});
</script>
