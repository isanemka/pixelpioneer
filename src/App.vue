<script setup lang="ts">
import Header from './components/Header.vue'
import About from './components/About.vue'
import GitHubProjects from './components/GitHubProjects.vue'
import Skills from './components/Skills.vue'
import PixelAssistant from './components/PixelAssistant.vue'
// import Projects from './components/Projects.vue'
// import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import SpaceScene from './components/SpaceScene.vue'
import CookieBanner from './components/CookieBanner.vue'
</script>

<template>
  <div class="w-full max-w-[1400px] mx-auto">
    <Header />
    <SpaceScene />
    <About />
    <GitHubProjects />
    <Skills />
    <PixelAssistant />
    <!--
      <Projects /> 
      <Contact />
    -->
    <Footer />
    <CookieBanner />
  </div>
</template>
