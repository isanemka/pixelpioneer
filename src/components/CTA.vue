<template>
  <section class="relative bg-gradient-to-r from-purple-900 via-blue-900 to-cyan-900 text-white py-16 font-vt323 overflow-hidden">
    <!-- Animated background particles (hidden on mobile, decorative) -->
    <div class="absolute inset-0 opacity-20 hidden md:block cta-particles" aria-hidden="true">
      <div class="absolute top-10 left-10 w-2 h-2 bg-limegreen rounded-full animate-pulse"></div>
      <div class="absolute top-20 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
      <div class="absolute bottom-20 left-20 w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
      <div class="absolute bottom-10 right-10 w-2 h-2 bg-limegreen rounded-full animate-pulse"></div>
    </div>
    
    <div class="container mx-auto px-6 text-center relative z-10">
      <div class="mb-6">
        <component :is="Rocket" :size="48" class="text-yellow-400 mx-auto mb-4 animate-bounce" />
      </div>
      
      <h2 class="text-4xl md:text-5xl font-bold mb-4 text-limegreen">
        Få offert inom 48 timmar
      </h2>
      <p class="text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
        Kostnadsfri genomgång av din befintliga hemsida och en tydlig plan för fler kunder. Enkelt, rakt och tydligt.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
        <a 
          href="#contact" 
          class="group bg-gradient-to-r from-limegreen to-cyan-400 text-black px-8 md:px-10 py-4 rounded-lg font-bold hover:from-cyan-400 hover:to-limegreen transition-all duration-300 text-2xl shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-cyan-500"
          aria-label="Öppna kontaktformuläret för att få offert"
        >
          <span class="group-hover:animate-pulse">Begär offert</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Rocket, Phone } from 'lucide-vue-next'
</script>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .animate-bounce,
  .animate-ping,
  .animate-pulse {
    animation: none !important;
  }
  .cta-particles { display: none !important; }
}
</style>
