<script setup lang="ts">
import Header from './components/Header.vue'
import About from './components/About.vue'
import GitHubProjects from './components/GitHubProjects.vue'
import Projects from './components/Projects.vue'
import Skills from './components/Skills.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import SpaceScene from './components/SpaceScene.vue'
</script>

<template>
  <div class="w-full max-w-[1400px] mx-auto">
    <Header />
    <SpaceScene />
    <About />
    <GitHubProjects />
    <Projects />
    <Skills />
    <Contact />
    <Footer />
  </div>
</template>
