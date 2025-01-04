<template>
  <section id="skills" class="bg-white text-gray-800 py-12">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-6">Kompetenser</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="skill in skills" :key="skill" class="p-4 bg-gray-100 rounded shadow">
          <span class="text-lg font-semibold">{{ skill }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skills = ['Vue.js', 'JavaScript', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Git', 'HTML', 'CSS'];
</script>

<style scoped>
</style>