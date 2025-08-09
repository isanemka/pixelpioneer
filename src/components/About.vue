<template>
  <section id="services" class="w-full bg-black font-vt323 px-6 py-12 text-left">
    <div class="max-w-4xl mx-auto text-limegreen border-2 border-limegreen shadow-limegreen p-4 rounded-md">
      <!-- Typing text effect (accessible) -->
      <p
        class="text-md md:text-lg leading-relaxed"
        role="status"
        aria-live="polite"
        :aria-busy="isTyping ? 'true' : 'false'"
      >
        <span class="select-none">&gt; </span>
        <span class="sr-only" v-if="isTyping">Skriver introduktion...</span>
        <span class="whitespace-pre-line">{{ displayedText }}</span>
        <span class="cursor" aria-hidden="true">█</span>
      </p>

      <!-- Controls for typing effect -->
      <div class="mt-3 flex items-center gap-4">
        <button
          v-if="isTyping"
          @click="skipTyping"
          class="text-xs md:text-sm text-black bg-limegreen/90 hover:bg-limegreen px-3 py-1 rounded transition"
        >
          Visa hela texten
        </button>
        <a
          href="#contact"
          class="text-xs md:text-sm underline text-cyan-300 hover:text-cyan-200"
        >
          Få kostnadsfri offert
        </a>
      </div>

      <!-- Services -->
      <div v-if="showServices" class="fade-in">
        <h3 class="mt-8 text-xl md:text-2xl text-orange-400 underline">Tjänster</h3>
        <p class="text-base md:text-lg text-gray-300 mt-2">
          Implementeringar som ger snabb effekt – allt kan kombineras och växa med ditt företag.
        </p>

        <div
          class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
        >
          <article v-for="(svc, i) in services" :key="i" class="border border-lime-400/70 rounded p-3 md:p-4 bg-gray-900/50 hover:bg-gray-900 transition">
            <div class="flex items-start gap-3">
              <component :is="svc.icon" class="text-cyan-300" :size="22" />
              <div>
                <h4 class="text-cyan-400 text-lg">{{ svc.name }}</h4>
                <p class="text-limegreen">{{ svc.value }}</p>
                <p class="text-gray-400 text-sm mt-1">{{ svc.includes }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { Rocket, Globe, Search, ShieldCheck, Gauge, Zap, Wrench } from 'lucide-vue-next'

// Short, effect-focused intro (plain language)
const fullText = `
Jag bygger snabba och tydliga webbsidor som gör jobbet:
• Fokus på ditt mål: fler förfrågningar och bokningar
• Enkelt i vardagen – jag finns kvar efter lansering
• Snabb laddning och bättre synlighet i Google och AI-svar
`.trim()

const displayedText = ref('')
const isTyping = ref(false)
const showServices = ref(false)
let timer: number | undefined

// Respect reduced motion and provide a skip control
function startTyping() {
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    skipTyping()
    return
  }
  isTyping.value = true
  let i = 0
  const speed = 26
  timer = window.setInterval(() => {
    displayedText.value = fullText.slice(0, i++)
    if (i > fullText.length) {
      stopTyping()
      // Small delay before revealing services
      window.setTimeout(() => (showServices.value = true), 300)
    }
  }, speed) as unknown as number
}

function stopTyping() {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
  isTyping.value = false
}

function skipTyping() {
  stopTyping()
  displayedText.value = fullText
  showServices.value = true
}

onMounted(() => {
  // small delay to avoid layout shift on mount
  window.setTimeout(startTyping, 300)
})

onBeforeUnmount(() => stopTyping())

// Modernized service list (plain language)
const services = ref([
  {
    name: 'Ny hemsida som ger fler kunder',
    value: 'Tydlig väg till kontakt',
    includes: 'Design, texter, bilder, kontaktknappar och offertformulär',
    icon: Globe,
  },
  {
    name: 'Bokning och formulär',
    value: 'Färre mail fram och tillbaka',
    includes: 'Smidigt bokningsflöde med bekräftelser och notifieringar',
    icon: Zap,
  },
  {
    name: 'Bli hittad på Google och i AI-svar',
    value: 'Rätt kunder hittar dig där de söker',
    includes: 'SEO-optimering som både Google och AI älskar',
    icon: Search,
  },
  {
    name: 'Snabbare hemsida',
    value: 'Kortare väntetid, fler avslut',
    includes: 'Snabb laddning och optimerade bilder',
    icon: Gauge,
  },
  {
    name: 'Skötsel och säkerhet',
    value: 'Trygg drift i vardagen',
    includes: 'Uppdateringar, backup och hjälp när du behöver',
    icon: ShieldCheck,
  },
  {
    name: 'Automatiseringar som spar tid',
    value: 'Mindre manuellt arbete',
    includes: 'Skapa automatiserade flöden som sparar tid',
    icon: Wrench,
  },
])
</script>

<style scoped>
.cursor {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* Fade-in effect for services */
.fade-in {
  animation: fadeIn 0.9s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>