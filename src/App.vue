<script setup lang="ts">
import Header from './components/Header.vue'
import SpaceScene from './components/SpaceScene.vue'
import About from './components/About.vue'
import CTA from './components/CTA.vue'
import Separator from './components/Separator.vue'
import Approach from './components/Approach.vue'
// import PixelAssistant from './components/PixelAssistant.vue'
import Contact from './components/Contact.vue'
import CookieBanner from './components/CookieBanner.vue'
import Footer from './components/Footer.vue'
// import Projects from './components/Projects.vue'
</script>

<template>
  <div class="w-full max-w-[1400px] mx-auto">
    <Header />
    <SpaceScene />
    <About />
    <CTA />
    <Separator />
    <Approach />
    <Separator />
    <Contact />
    <Footer />
    <CookieBanner />
  </div>
</template>
