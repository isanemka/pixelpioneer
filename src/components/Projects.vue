<template>
  <section id="projects" class="bg-gray-100 text-gray-800 py-12">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-6">Lorem, ipsum.</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-white shadow-lg rounded p-6 hover:shadow-xl transition"
        >
          <img :src="project.image" :alt="project.title" class="rounded mb-4" />
          <h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
          <p class="text-gray-600 mb-4">{{ project.description }}</p>
          <a
            :href="project.link"
            target="_blank"
            class="text-indigo-500 hover:underline"
          >
            Lorem, ipsum dolor.
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const projects = [
  {
    id: 1,
    title: 'Projekt 1',
    description: 'Beskrivning av projekt 1.',
    link: 'https://anjok.se',
    image: '#',
  },
  {
    id: 2,
    title: 'Projekt 2',
    description: 'Beskrivning av projekt 2.',
    link: 'https://anjok.se',
    image: '#',
  },
  {
    id: 3,
    title: 'Projekt 3',
    description: 'Beskrivning av projekt 3.',
    link: 'https://anjok.se',
    image: '#',
  },
];
</script>

<style scoped>
</style>