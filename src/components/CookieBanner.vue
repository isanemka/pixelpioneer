<template>
  <div v-if="showBanner" class="z-20 fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-col md:flex-row justify-between items-center shadow-lg">
    <p class="text-base text-gray-300">
      Vi använder cookies för att förbättra din upplevelse. Du kan godkänna eller avböja.
    </p>
    <div class="mt-2 md:mt-0 flex gap-2">
      <button @click="declineCookies" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm md:text-base">
        Avböj
      </button>
      <button @click="acceptCookies" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm md:text-base">
        Godkänn
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const showBanner = ref(false);

onMounted(() => {
  const cookiesAccepted = localStorage.getItem("cookiesAccepted");
  if (!cookiesAccepted) {
    showBanner.value = true;
  }
});

const acceptCookies = () => {
  localStorage.setItem("cookiesAccepted", "true");
  showBanner.value = false;
  // Inform app that cookies were accepted (for analytics, etc.)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cookies:accepted'));
  }
};

const declineCookies = () => {
  localStorage.setItem("cookiesAccepted", "false");
  showBanner.value = false;
};
</script>

<style scoped>
</style>