<template>
  <div class="bg-card-bg rounded-xl p-6 shadow-custom border border-border-color mb-6">
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
  </div>
</template>

<script setup>
const props = defineProps({
  currentUsage: {
    type: Object,
    required: true,
  },
})
</script>
