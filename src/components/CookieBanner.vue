<template>
  <div v-if="showBanner" class="z-20 fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-col md:flex-row justify-between items-center shadow-lg">
    <p class="text-sm text-gray-300">
      Vi använder cookies för att förbättra din upplevelse på vår webbplats. Genom att fortsätta använda sidan godkänner du användandet av cookies. 
    </p>
    <button @click="acceptCookies" class="mt-2 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
      Stäng
    </button>
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
};
</script>

<style scoped>
</style>