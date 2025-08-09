<template>
  <div class="space-scene">
    <div class="title-container">
      <h1 class="title text-white font-press-start-2p">Pixel<br>Pioneer</h1>
    </div>
    <div class="stars"></div>
    <div class="rocket"></div>
    <div class="mouse-trail" ref="mouseTrail"></div>
    <div class="mouse-glow" ref="mouseGlow"></div>
    <div class="custom-cursor" ref="customCursor">
      <div class="cursor-center"></div>
      <div class="cursor-ring"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

const mouseTrail = ref<HTMLElement | null>(null);
const mouseGlow = ref<HTMLElement | null>(null);
const customCursor = ref<HTMLElement | null>(null);

let stars: NodeListOf<Element>;
let trailElements: HTMLElement[] = [];

// Simple debounce for resize-heavy work
function debounce<T extends (...args: any[]) => void>(fn: T, delay = 200) {
  let t: number | undefined;
  return (...args: Parameters<T>) => {
    if (t) window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), delay);
  };
}

// Mouse trail effect
function createMouseTrail(e: MouseEvent) {
  // Only create trail if not hovering over text/interactive elements
  if ((e.target as HTMLElement)?.closest('.title-container')) return;
  
  const trail = document.createElement('div');
  trail.className = 'trail-particle';
  
  const rect = (e.currentTarget as HTMLElement)?.getBoundingClientRect();
  if (!rect) return;
  
  trail.style.left = `${e.clientX - rect.left}px`;
  trail.style.top = `${e.clientY - rect.top}px`;
  
  const colors = ['#00ff88', '#40ff99', '#60a5fa', '#fbbf24', '#ffffff'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  trail.style.background = randomColor;
  trail.style.boxShadow = `0 0 20px ${randomColor}`;
  
  mouseTrail.value?.appendChild(trail);
  trailElements.push(trail);
  
  // Remove trail after animation
  setTimeout(() => {
    if (trail.parentNode) {
      trail.parentNode.removeChild(trail);
    }
    const index = trailElements.indexOf(trail);
    if (index > -1) {
      trailElements.splice(index, 1);
    }
  }, 1000);
}

// Mouse glow effect
function updateMouseGlow(e: MouseEvent) {
  if (!mouseGlow.value) return;
  
  const rect = (e.currentTarget as HTMLElement)?.getBoundingClientRect();
  if (!rect) return;
  
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  mouseGlow.value.style.left = `${x - 50}px`;
  mouseGlow.value.style.top = `${y - 50}px`;
  mouseGlow.value.style.opacity = '0.6';
  
  // Update custom cursor
  if (customCursor.value) {
    customCursor.value.style.left = `${x - 15}px`;
    customCursor.value.style.top = `${y - 15}px`;
    customCursor.value.style.opacity = '1';
  }
}

// Hide glow when mouse leaves
function hideMouseGlow() {
  if (mouseGlow.value) {
    mouseGlow.value.style.opacity = '0';
  }
  if (customCursor.value) {
    customCursor.value.style.opacity = '0';
  }
}

// Applies a parallax effect to the stars when scrolling
function parallaxEffect() {
  if (!stars) stars = document.querySelectorAll('.star'); 
  stars.forEach((star, index) => {
    const speed = 0.2 + index * 0.005;
    const scrollY = window.scrollY; 
    (star as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
  });
}

// Creates a starry background with randomly placed stars
function createStars() {
  const starsContainer = document.querySelector('.stars') as HTMLElement | null;
  if (!starsContainer) return;

  starsContainer.innerHTML = ''; // Clear previous stars
  const numberOfStars = window.innerWidth < 640 ? 60 : 100;

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const top = Math.random() * starsContainer.clientHeight;
    const left = Math.random() * starsContainer.clientWidth;
    star.style.top = `${top}px`;
    star.style.left = `${left}px`;

    const size = Math.random() * 4 + 2; 
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random colors for more visual interest
    const colors = ['#ffffff', '#00ff88', '#40ff99', '#60a5fa', '#fbbf24'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    star.style.background = randomColor;
    star.style.boxShadow = `0 0 ${size * 2}px ${randomColor}`;

    const duration = Math.random() * 5 + 5; 
    star.style.animation = `moveStars ${duration}s linear infinite`;

    starsContainer.appendChild(star);
  }
}

let asteroidTimeoutId: number | null = null; // Store active timeout
let isSpawningAsteroid = false; // Toggle asteroid spawning

// Generates asteroids that move across the screen
function createAsteroid() {
  if (isSpawningAsteroid) return; // Prevent multiple asteroid loops
  isSpawningAsteroid = true;

  const scene = document.querySelector('.space-scene') as HTMLElement | null;
  if (!scene) {
    console.error("Asteroid container (.space-scene) not found!");
    return;
  }

  const containerWidth = scene.clientWidth;
  const asteroid = document.createElement('div');
  asteroid.classList.add('asteroid');

  let left;
  if (Math.random() < 0.5) {
    left = Math.random() * (containerWidth * 0.35);
  } else {
    left = containerWidth * 0.65 + Math.random() * (containerWidth * 0.10); // 85-100% (högerkant)
  }

  asteroid.style.top = `-50px`; // Starta ovanför containern
  asteroid.style.left = `${left}px`;

  // Slumpmässig storlek
  const size = Math.random() * 30 + 20;
  asteroid.style.width = `${size}px`;
  asteroid.style.height = `${size}px`;

  // Slumpmässig hastighet (5-10s för att falla genom containern)
  const duration = Math.random() * 5 + 5;
  asteroid.style.animation = `moveAsteroids ${duration}s linear`;

  scene.appendChild(asteroid);

  // Ta bort asteroid när den lämnar containern
  setTimeout(() => {
    asteroid.remove();
  }, duration * 1000);

  // ⏲ Vänta slumpmässigt mellan 3 och 8 sekunder innan nästa asteroid spawnas
  const nextSpawn = Math.random() * 5000 + 3000; // 3000 - 8000ms (3-8 sek)
  asteroidTimeoutId = setTimeout(() => {
    isSpawningAsteroid = false; // Reset flag after timeout
    createAsteroid();
  }, nextSpawn);
}

const debouncedCreateStars = debounce(createStars, 200);

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  createStars();
  // Optional subtle parallax (currently one-shot); skip if reduced motion
  if (!prefersReducedMotion) {
    parallaxEffect();
  }
  // Start asteroid loop only if user does not prefer reduced motion
  if (!prefersReducedMotion) {
    createAsteroid();
  }
  
  // Add mouse event listeners
  const spaceScene = document.querySelector('.space-scene') as HTMLElement;
  if (spaceScene) {
    spaceScene.addEventListener('mousemove', createMouseTrail);
    spaceScene.addEventListener('mousemove', updateMouseGlow);
    spaceScene.addEventListener('mouseleave', hideMouseGlow);
  }
  
  window.addEventListener('resize', debouncedCreateStars);
});

onBeforeUnmount(() => {
  if (asteroidTimeoutId !== null) clearTimeout(asteroidTimeoutId); // Stoppa asteroid-loopen
  
  // Remove mouse event listeners
  const spaceScene = document.querySelector('.space-scene') as HTMLElement;
  if (spaceScene) {
    spaceScene.removeEventListener('mousemove', createMouseTrail);
    spaceScene.removeEventListener('mousemove', updateMouseGlow);
    spaceScene.removeEventListener('mouseleave', hideMouseGlow);
  }
  
  // Clean up trail elements
  trailElements.forEach(trail => {
    if (trail.parentNode) {
      trail.parentNode.removeChild(trail);
    }
  });
  
  window.removeEventListener('resize', debouncedCreateStars);
});
</script>

<style>
/* Space scene background */
.space-scene {
  position: relative;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle, #5200aa, #111);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}

/* Show custom cursor on pointer devices; keep default on touch */
@media (hover: hover) {
  .space-scene { cursor: none; }
  .space-scene a,
  .space-scene button,
  .space-scene .title-container { cursor: auto; }
}

/* Hide custom cursor/glow when hovering title to reduce distraction */
.title-container:hover ~ .custom-cursor { opacity: 0 !important; }
.title-container:hover ~ .mouse-glow { opacity: 0 !important; }

/* Mouse trail container */
.mouse-trail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

/* Trail particles */
.trail-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  pointer-events: none;
  animation: fadeTrail 1s ease-out forwards;
}

@keyframes fadeTrail {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.3);
  }
}

/* Mouse glow effect */
.mouse-glow {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, rgba(0, 255, 136, 0.1) 50%, transparent 100%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 5;
  mix-blend-mode: screen;
}

/* Custom cursor */
.custom-cursor {
  position: absolute;
  width: 30px;
  height: 30px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 10;
}

.cursor-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 4px;
  background: #00ff88;
  border-radius: 50%;
  box-shadow: 0 0 10px #00ff88;
}

.cursor-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  border: 2px solid rgba(0, 255, 136, 0.5);
  border-radius: 50%;
  animation: cursorPulse 2s ease-in-out infinite;
}

@keyframes cursorPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.8;
  }
}

/* Title container for better responsiveness */
.title-container {
  margin-top: 20%;
  max-width: 90%;
  z-index: 4; /* Ensure it stays above other elements */
  pointer-events: none; /* Prevent mouse interference with custom cursor */
}

.title-container * {
  pointer-events: auto;
}

/* Title styling */
.title {
  font-size: clamp(1.5rem, 4vw, 3rem);
  text-shadow: 4px 4px 10px rgba(255, 255, 255, 0.8), 
               0 0 20px rgba(0, 255, 136, 0.6),
               0 0 40px rgba(0, 255, 136, 0.4);
  animation: floatTitle 3s ease-in-out infinite alternate;
  margin-bottom: 1rem;
}

.tagline-text {
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  color: #00ff88;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.8);
  font-weight: bold;
  letter-spacing: 2px;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  0% { 
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.8);
    color: #00ff88;
  }
  100% { 
    text-shadow: 0 0 20px rgba(0, 255, 136, 1), 0 0 30px rgba(0, 255, 136, 0.6);
    color: #40ff99;
  }
}

/* Randomized floating animation */
@keyframes floatTitle {
  0% {
    transform: translateX(2px) translateY(3px) rotate(-1deg);
  }
  20% {
    transform: translateX(-3px) translateY(4px) rotate(1deg);
  }
  40% {
    transform: translateX(4px) translateY(-2px) rotate(-2deg);
  }
  60% {
    transform: translateX(-2px) translateY(3px) rotate(1deg);
  }
  80% {
    transform: translateX(1px) translateY(-3px) rotate(-1deg);
  }
  100% {
    transform: translateX(0px) translateY(0px) rotate(0deg);
  }
}

/* Stars container */
.stars {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

/* Individual star styling */
.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0.8;
  z-index: 2;
  will-change: transform;
  transition: transform 0.1s linear;
}

/* Star movement animation */
@keyframes moveStars {
  from { transform: translateY(0); }
  to { transform: translateY(100vh); }
}

/* Asteroid styling */
.asteroid {
  position: absolute;
  background: url('/images/asteroid.png') no-repeat center;
  background-size: contain;
  z-index: 2;
  animation: moveAsteroids linear infinite, rotateAsteroids linear infinite;
}

/* Moving asteroids from top to bottom */
@keyframes moveAsteroids {
  0% { transform: translateY(-100vh) rotate(0deg); }
  100% { transform: translateY(120vh) rotate(360deg); }
}

/* Rotation animation for asteroids */
@keyframes rotateAsteroids {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Rocket properties */
.rocket {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 100px;
  background: url('/images/rocket.png') no-repeat center;
  background-size: contain;
  animation: flyRocket 3s ease-in-out infinite;
  z-index: 3;
  filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.5));
}

/* Fire effect for the rocket */
.rocket::after {
  content: "";
  position: absolute;
  bottom: -25px; 
  left: 50%;
  transform: translateX(-50%);
  width: 10px; 
  height: 35px;
  background: linear-gradient(
    to bottom,
    rgba(255, 165, 0, 0.9) 0%,  
    rgba(255, 69, 0, 0.8) 50%,  
    rgba(255, 0, 0, 0.6) 80%,  
    transparent 100%  
  );
  opacity: 0.8;
  border-radius: 20% 20% 50% 50%; 
  animation: fireAnimation 0.2s infinite alternate ease-in-out;
}

/* Fire animation for a flickering effect */
@keyframes fireAnimation {
  0% {
    transform: translateX(-50%) scaleY(1) scaleX(1.3);
    opacity: 0.9;
  }
  100% {
    transform: translateX(-50%) scaleY(1.3) scaleX(1.6);
    opacity: 0.5;
  }
}

/* Rocket side movement */
@keyframes flyRocket {
  0% { transform: translateX(-50%) rotate(0deg); }
  50% { transform: translateX(-30%) rotate(2deg); }
  100% { transform: translateX(-50%) rotate(0deg); }
}

/* Reduced motion preference: tone down or remove animations */
@media (prefers-reduced-motion: reduce) {
  .mouse-trail,
  .mouse-glow,
  .custom-cursor { display: none !important; }

  .star,
  .asteroid,
  .rocket,
  .rocket::after,
  .cursor-ring,
  .title { animation: none !important; }
}
</style>