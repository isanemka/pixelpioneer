<template>
  <section id="contact" class="bg-gray-900 text-white py-12">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-6">Kontakt</h2>
      <form class="max-w-lg mx-auto bg-gray-800 p-6 rounded shadow">
        <div class="mb-4">
          <label for="name" class="block text-gray-400 mb-2">Namn</label>
          <input
            id="name"
            type="text"
            class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-400 mb-2">E-post</label>
          <input
            id="email"
            type="email"
            class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div class="mb-4">
          <label for="message" class="block text-gray-400 mb-2">Meddelande</label>
          <textarea
            id="message"
            rows="4"
            class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
          ></textarea>
        </div>
        <button
          type="submit"
          class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded"
        >
          Skicka
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>