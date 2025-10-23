<script setup>
import SideBar from '@/components/navigation/SideBar.vue'
</script>

<template>
  <div class="flex min-h-screen">
    <SideBar class="fixed z-[99]" />
    <div class="bg-gray-100 lg:ml-[17%] w-full">
      <div>
        <div class="padding"><RouterView></RouterView></div>
      </div>
    </div>
  </div>
</template>
