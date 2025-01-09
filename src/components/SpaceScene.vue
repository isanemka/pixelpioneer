<template>
  <div class="space-scene">
    <div class="title-container">
      <h1 class="title text-white font-press-start-2p">Pixel<br>Pioneer</h1>
    </div>
    <div class="stars"></div>
    <div class="rocket"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';

let stars: NodeListOf<Element>;

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
  const numberOfStars = 100;

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

  // 🕒 Vänta slumpmässigt mellan 3 och 8 sekunder innan nästa asteroid spawnas
  const nextSpawn = Math.random() * 5000 + 3000; // 3000 - 8000ms (3-8 sek)
  asteroidTimeoutId = setTimeout(() => {
    isSpawningAsteroid = false; // Reset flag after timeout
    createAsteroid();
  }, nextSpawn);
}

onMounted(() => {
  createStars();
  parallaxEffect();
  createAsteroid(); // Starta asteroid-loop
  window.addEventListener('resize', createStars);
});

onBeforeUnmount(() => {
  if (asteroidTimeoutId !== null) clearTimeout(asteroidTimeoutId); // Stoppa asteroid-loopen
  window.removeEventListener('resize', createStars);
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

/* Title container for better responsiveness */
.title-container {
  margin-top: 20%;
  max-width: 90%;
  z-index: 4; /* Ensure it stays above other elements */
}

/* Title styling */
.title {
  font-size: clamp(1.5rem, 4vw, 3rem);
  text-shadow: 4px 4px 10px rgba(255, 255, 255, 0.8);
  animation: floatTitle 3s ease-in-out infinite alternate;
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
</style>