<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
</script>

<template>
  <footer class="relative bg-gradient-to-t from-black via-gray-900 to-black text-gray-300 text-center py-8 overflow-hidden">

    <!-- Social Links -->
    <div class="flex justify-center space-x-6 mt-4">
      <!-- GitHub -->
      <a href="https://github.com/isanemka" target="_blank" class="hover:text-indigo-400">
        <FontAwesomeIcon :icon="faGithub" class="w-8 h-8 text-gray-400 hover:text-white" />
      </a>

      <!-- LinkedIn -->
      <a href="https://www.linkedin.com/in/anton-karlsson-developer" target="_blank" class="hover:text-indigo-400">
        <FontAwesomeIcon :icon="faLinkedin" class="w-8 h-8 text-gray-400 hover:text-white" />
      </a>
    </div>

    <!-- Copyright & Branding -->
    <p class="text-lg mt-4 font-vt323 text-limegreen">
      © {{ new Date().getFullYear() }} PixelPioneer - All Rights Reserved
    </p>
  </footer>
</template>

<style scoped>
</style>