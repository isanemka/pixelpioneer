<template>
  <section id="about" class="about-section">
    <div class="terminal">
      <!-- Typing text effect -->
      <p><span class="prompt">> </span><span id="typing-text"></span><span class="cursor">█</span></p>
      
      <!-- Smooth transition to grades -->
      <div v-if="showLoading" class="loading-text">Laddar betyg...</div>
      
      <div v-if="showGrades" class="fade-in">
        <br />
        <h3 class="grades-header">Slutbetyg:</h3>
        <div class="grades">
          <p v-for="(course, index) in courses" :key="index">
            <span class="course">{{ course.name }}</span> - 
            <span class="points">{{ course.points }}p</span> - 
            <span class="grade">{{ course.grade }}</span> 
            <span class="date">({{ course.date }})</span>
          </p>
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
Uppdrag: Att skapa moderna, responsiva och innovativa webbapplikationer.

Efter en lång resa genom arbetslivet, där jag har drivit eget företag, arbetat som fibertekniker och varit arbetsledare, har jag nu äntligen landat där jag alltid egentligen velat vara – i kodens värld. 
I juni 2024 tog jag min examen som webbutvecklare, och nu är jag redo att ta nästa steg.
`;
let index = 0;
const showLoading = ref(false); // Controls the "Laddar betyg..." text
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
  if (!typingElement) return;

  if (index < text.length) {
    typingElement.innerHTML = text.substring(0, index).replace(/\n/g, "<br/>") + "<span class='cursor'>█</span>";
    index++;
    setTimeout(typeEffect, 50);
  } else {
    // After text is fully typed, show "Laddar betyg..." first
    setTimeout(() => {
      showLoading.value = true;
    }, 1000);

    // Then after another second, show the grades
    setTimeout(() => {
      showLoading.value = false;
      showGrades.value = true;
    }, 2500);
  }
}

onMounted(() => {
  setTimeout(typeEffect, 500);
});
</script>

<style scoped>
.about-section {
  background: black;
  color: limegreen;
  font-family: 'VT323', monospace;
  padding: 4rem;
  text-align: left;
}

.terminal {
  width: 80%;
  max-width: 600px;
  margin: auto;
  border: 2px solid limegreen;
  padding: 1rem;
  box-shadow: 0 0 10px limegreen;
}

.prompt {
  color: lime;
}

.cursor {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* Loading text effect */
.loading-text {
  color: orange;
  font-style: italic;
  text-align: center;
  margin-top: 10px;
  animation: fadeBlink 1s infinite alternate;
}

@keyframes fadeBlink {
  0% { opacity: 1; }
  100% { opacity: 0.5; }
}

/* Fade-in effect for grades */
.fade-in {
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Grades section */
.grades-header {
  margin-top: 20px;
  font-size: 1.2rem;
  text-decoration: underline;
}

.grades {
  font-size: 1rem;
  line-height: 1.6;
}

.course {
  color: cyan;
}

.points {
  color: orange;
}

.grade {
  color: limegreen;
}

.date {
  color: gray;
}
</style>