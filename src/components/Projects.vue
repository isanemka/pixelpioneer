<template>
  <section id="projects" class="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 font-vt323 overflow-hidden">
    <div class="container mx-auto px-6 relative z-10">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-limegreen">CASE</h2>
      <p class="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
        Ett utvalt kundcase som visar hur jag jobbar för resultat.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="c in cases"
          :key="c.title"
          class="bg-gray-800 border-2 border-limegreen rounded p-5 shadow-lg hover:shadow-xl transition-transform hover:scale-[1.02]"
        >
          <div class="flex items-center gap-3 mb-3">
            <component :is="c.icon" :size="28" class="text-limegreen" aria-hidden="true" />
            <h3 class="text-xl text-cyan-400">{{ c.title }}</h3>
          </div>
          <p class="text-sm text-orange-400 mb-2">{{ c.industry }}</p>
          <p class="text-gray-300 text-sm leading-relaxed mb-4">{{ c.summary }}</p>

          <div class="mb-4">
            <h4 class="text-limegreen font-bold text-sm mb-2">RESULTAT</h4>
            <ul class="text-xs text-gray-300 space-y-1">
              <li v-for="r in c.results" :key="r" class="flex items-center">
                <span class="text-limegreen mr-2">▶</span>{{ r }}
              </li>
            </ul>
          </div>

          <div class="text-xs text-gray-400 mb-4">
            <span class="text-gray-500">Stack:</span> {{ c.stack }}
          </div>

          <div class="mt-2">
            <a
              v-if="c.link"
              :href="c.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-cyan-400 text-black px-4 py-2 rounded font-bold hover:bg-limegreen transition-colors"
              :aria-label="`Besök webbplatsen för ${c.title}`"
            >
              Besök webbplats
              <component :is="ExternalLink" :size="16" aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>

      <div class="text-center mt-10">
        <a href="#contact" class="inline-block bg-limegreen text-black px-8 py-3 rounded font-bold hover:bg-cyan-400 transition-colors">
          Boka kostnadsfri konsultation
        </a>
      </div>
    </div>

    <!-- subtle background accents -->
    <div class="absolute inset-0 pointer-events-none opacity-10">
      <div class="absolute -top-10 -left-10 w-72 h-72 rounded-full border border-limegreen"></div>
      <div class="absolute bottom-0 right-0 w-64 h-64 rounded-full border border-cyan-400"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Hammer, ExternalLink } from 'lucide-vue-next'

interface CaseItem {
  title: string
  industry: string
  summary: string
  results: string[]
  stack: string
  icon: any
  link?: string
}

const cases: CaseItem[] = [
  {
    title: 'Rutputs',
    industry: 'Tjänsteföretag (RUT)',
    summary: 'Tydlig, snabb och säljande webbplats för hushållsnära tjänster.',
    results: ['Klart erbjudande med tydliga CTA:er', 'Struktur och copy för bättre konvertering', 'Grundläggande SEO & prestanda'],
    stack: 'Vue, Tailwind, Vite',
    icon: Hammer,
    link: 'https://rutputs.nu',
  },
]
</script>

<script lang="ts">
export default {
  name: 'ProjectsSection'
}
</script>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .hover\:scale-\[1\.02\]:hover { transform: none; }
}
</style>
