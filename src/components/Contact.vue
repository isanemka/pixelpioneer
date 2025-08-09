<template>
  <section id="contact" class="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-16 font-vt323 overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-limegreen via-transparent to-cyan-400"></div>
      <div class="absolute top-20 left-20 w-32 h-32 border border-limegreen rounded-full animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-24 h-24 border border-cyan-400 rounded-full animate-ping"></div>
    </div>
    
    <div class="container mx-auto text-center relative z-10">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-limegreen">FÅ EN KOSTNADSFRI OFFERT</h2>
      <p class="text-gray-300 mb-8 max-w-2xl mx-auto px-4">
        Redo att ta steget? Kontakta mig så får du en skräddarsydd offert inom 24 timmar.
      </p>
      
      <div class="max-w-4xl mx-auto">
        <!-- Contact Information -->
        <div class="bg-gray-800 border-2 border-limegreen p-8 rounded shadow-lg">
          <h3 class="text-2xl text-cyan-400 mb-8">TA KONTAKT</h3>
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Email -->
            <div class="text-center">
              <div class="w-16 h-16 bg-limegreen rounded-full flex items-center justify-center mx-auto mb-4">
                <component :is="Mail" :size="32" class="text-black" />
              </div>
              <h4 class="text-xl text-cyan-400 mb-2">E-post</h4>
              <a href="mailto:hej@pixelpioneer.se" class="text-limegreen hover:text-cyan-400 transition-colors text-lg">
                hej@pixelpioneer.se
              </a>
            </div>
            
            <!-- Phone -->
            <div class="text-center">
              <div class="w-16 h-16 bg-limegreen rounded-full flex items-center justify-center mx-auto mb-4">
                <component :is="Phone" :size="32" class="text-black" />
              </div>
              <h4 class="text-xl text-cyan-400 mb-2">Telefon</h4>
              <a href="tel:+46734644604" class="text-limegreen hover:text-cyan-400 transition-colors text-lg">
                0734-64 46 04
              </a>
            </div>
          </div>
          
          <div class="mt-8 pt-6 border-t border-gray-600">            
            <div class="mt-6 p-4 bg-gray-700 rounded-lg">
              <div class="flex items-center justify-center mb-2">
                <component :is="Gift" :size="20" class="text-limegreen mr-2" />
                <span class="text-limegreen font-bold">KOSTNADSFRI KONSULTATION</span>
              </div>
              <p class="text-gray-300 text-sm text-center">
                Ring eller maila för en första diskussion om ditt projekt - helt utan kostnad!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Mail, Phone, Clock, MapPin, Gift } from 'lucide-vue-next'
</script>

<style scoped>
/* Simple hover effects */
a {
  transition: color 0.3s ease;
}
</style>