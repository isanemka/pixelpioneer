<template>
  <section class="w-full bg-black font-vt323 px-6 py-12 text-left">
    <div class="max-w-3xl mx-auto text-limegreen border-2 border-limegreen shadow-limegreen p-4">
      <!-- Typing text effect -->
      <p class="text-md md:text-lg leading-relaxed">
        <span>> </span><span id="typing-text"></span><span class="cursor">█</span>
      </p>
      
      <!-- Smooth transition to grades -->
      <div v-if="showLoading" class="text-orange-400 text-center mx-5 animate-pulse">Laddar betyg...</div>
      
      <div v-if="showGrades" class="fade-in">
        <br />
        <h3 class="mt-5 text-xl text-orange-400 underline">Slutbetyg:</h3>
        <div class="text-base leading-relaxed">
          
          <!-- Desktop view -->
          <div class="hidden md:block">
            <table class="w-full border-collapse border border-lime-400">
              <thead>
                <tr class="bg-limegreen text-black">
                  <th class="border border-lime-400 p-2 text-left">Kurs</th>
                  <th class="border border-lime-400 p-2">Poäng</th>
                  <th class="border border-lime-400 p-2">Betyg</th>
                  <th class="border border-lime-400 p-2">Datum</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(course, index) in courses" :key="index" class="border-b border-lime-400 hover:bg-gray-900">
                  <td class="p-2">{{ course.name }}</td>
                  <td class="p-2 text-center">{{ course.points }}p</td>
                  <td class="p-2 text-center text-limegreen">{{ course.grade }}</td>
                  <td class="p-2 text-center text-gray-400">{{ course.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile view -->
          <div class="md:hidden space-y-4">
            <div v-for="(course, index) in courses" :key="index" class="border border-lime-400 p-1 rounded shadow-md bg-gray-900">
              <h4 class="text-cyan-400 font-bold">{{ course.name }}</h4>
              <p class="text-orange-400"><strong>Poäng:</strong> {{ course.points }}p</p>
              <p class="text-limegreen"><strong>Betyg:</strong> {{ course.grade }}</p>
              <p class="text-gray-400"><strong>Datum:</strong> {{ course.date }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';


const text = `
INKOMMANDE MEDDELANDE…
Avsändare: Anton Karlsson
Status: Nyexaminerad Webbutvecklare
Specialisering: Vue.js, TypeScript, Node.js
Uppdrag: Skapa moderna, responsiva och innovativa webbapplikationer.

Efter en lång resa genom arbetslivet, där jag har drivit eget företag, arbetat som fibertekniker och varit arbetsledare, har jag nu äntligen landat där jag alltid egentligen velat vara – i kodens värld. 

I juni 2024 tog jag min examen som webbutvecklare, och nu är jag redo att ta nästa steg.

För att ge en bättre bild av min utbildning och de tekniker jag har arbetat med, följer här en sammanställning av kurserna och resultat:
`;
let index = 0;
const showLoading = ref(false); // Controls the "Loading" text
const showGrades = ref(false); // Controls visibility of grades

// Course grades data
const courses = ref([
  { name: "JavaScript", points: 40, grade: "Väl godkänd", date: "2024-01-19" },
  { name: "Entreprenörskap och affärskommunikation", points: 20, grade: "Väl godkänd", date: "2022-11-09" },
  { name: "Grundläggande programmering", points: 25, grade: "Godkänd", date: "2023-02-10" },
  { name: "Publiceringsverktyg", points: 20, grade: "Väl godkänd", date: "2023-09-14" },
  { name: "Design och UX", points: 20, grade: "Väl godkänd", date: "2023-06-12" },
  { name: "LIA 1", points: 50, grade: "Väl godkänd", date: "2023-11-27" },
  { name: "LIA 2", points: 75, grade: "Väl godkänd", date: "2024-05-27" },
  { name: "Fördjupning programmering", points: 80, grade: "Väl godkänd", date: "2023-05-29" },
  { name: "Examensarbete", points: 30, grade: "Väl godkänd", date: "2024-07-01" },
  { name: "HTML och CSS med agila utvecklingsmetoder", points: 40, grade: "Väl godkänd", date: "2022-12-28" }
]);

function typeEffect() {
  const typingElement = document.getElementById("typing-text");
  if (!typingElement || index >= text.length) return;

  typingElement.innerHTML = text.substring(0, index).replace(/\n/g, "<br/>") + "<span class='cursor'></span>";
  index++;
  if (index < text.length) {
    setTimeout(typeEffect, 40);
  } else {
    showLoading.value = true;

    setTimeout(() => { 
      showLoading.value = false; 
      showGrades.value = true;
    }, 3500);
  }
}

onMounted(() => {
  setTimeout(typeEffect, 1000);
});
</script>

<style scoped>
.cursor {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* Fade-in effect for grades */
.fade-in {
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>