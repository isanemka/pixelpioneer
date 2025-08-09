<template>
  <section class="bg-gradient-to-r from-black via-gray-900 to-black py-8 font-vt323 overflow-hidden">
    <div class="container mx-auto px-6">
      <!-- Animated separator line -->
      <div class="flex items-center justify-center space-x-4">
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-limegreen to-transparent"></div>
        <div class="flex space-x-2">
          <div class="w-2 h-2 bg-limegreen rounded-full animate-pulse"></div>
          <div class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 0.5s"></div>
          <div class="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style="animation-delay: 1s"></div>
        </div>
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-limegreen to-transparent"></div>
      </div>
      
      <!-- Scrolling text effect -->
      <div class="mt-4 text-center text-gray-600 text-base md:text-lg">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
