<template>
  <section class="py-12">
    <h2 class="text-3xl font-bold font-vt323 text-center text-limegreen mb-8">Skills</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
      <div v-for="skill in skills" :key="skill.name" class="flex flex-col items-center">
        <div class="w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
          <img 
            :src="`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}/${skill.icon}-original.svg`"
            :alt="skill.name" 
            class="w-10 h-10"
            :style="{ filter: 'grayscale(0%)' }"
          />
        </div>
        <p class="mt-2 text-lg lg:text-xl text-indigo-400 font-vt323">{{ skill.name }}</p>
        <div class="w-full bg-gray-700 rounded-full h-2.5 mt-2">
          <div 
            class="h-2.5 rounded-full transition-all glowing-progress"
            :style="{ width: skill.level + '%', background: getSkillColor(skill.level) }">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Define skills with name, icon, and experience level
const skills = ref([
  { name: "Vue.js", icon: "vuejs", level: 65 },
  { name: "JavaScript", icon: "javascript", level: 55 },
  { name: "TypeScript", icon: "typescript", level: 35 },
  { name: "C#", icon: "csharp", level: 25 },
  { name: "Node.js", icon: "nodejs", level: 40 },
  { name: "SQL", icon: "azuresqldatabase", level: 20 }
]);

// Function to determine color based on skill level
const getSkillColor = (level: number) => {
  if (level <= 35) return "rgb(255, 69, 58)"; // Red for low level
  if (level <= 60) return "rgb(255, 214, 10)"; // Yellow for medium level
  return "rgb(50, 205, 50)"; // Green for high level
};
</script>

<style scoped>
/* Subtle glowing effect */
.glowing-progress {
  box-shadow: 0 0 10px rgba(50, 205, 50, 0.7);
  animation: glow 1.5s infinite alternate;
}

@keyframes glow {
  0% {
    box-shadow: 0 0 10px rgba(50, 205, 50, 0.7);
  }
  100% {
    box-shadow: 0 0 20px rgba(50, 205, 50, 0.7);
  }
}
</style>