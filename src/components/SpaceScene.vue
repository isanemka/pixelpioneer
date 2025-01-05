<template>
  <div class="space-scene">
    <div class="stars"></div>
    <div class="rocket"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

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

// Generates asteroids that move across the screen
function createAsteroids() {
  const scene = document.querySelector('.space-scene') as HTMLElement | null;
  if (!scene) {
    console.error("Asteroid container (.space-scene) not found!");
    return;
  }

  const numberOfAsteroids = 0.1; // Number of asteroids

  for (let i = 0; i < numberOfAsteroids; i++) {
    const asteroid = document.createElement('div');
    asteroid.classList.add('asteroid');

    let top = Math.random() * -20; // Start offscreen
    let left;
    if (Math.random() < 0.5) {
      // Generate a number between 0 and 30
      left = Math.random() * 30;
    } else {
      // Generate a number between 70 and 100
      left = 60 + Math.random() * 14;
    } 

    asteroid.style.top = `${top}vh`;
    asteroid.style.left = `${left}vw`;

    // Random size
    const size = Math.random() * 30 + 20;
    asteroid.style.width = `${size}px`;
    asteroid.style.height = `${size}px`;

    // Assign different speeds
    const duration = Math.random() * 5 + 5; // Speed between 5-10s
    asteroid.style.animation = `moveAsteroids ${duration}s linear infinite`;

    scene.appendChild(asteroid);

    // Remove asteroid once it moves offscreen
    setTimeout(() => {
      asteroid.remove();
    }, duration * 1000);
  }
}

onMounted(() => {
  createStars();
  parallaxEffect();
  createAsteroids();
  setInterval(createAsteroids, 4000); 
  window.addEventListener('resize', createStars);
});

onBeforeUnmount(() => {
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
  background: url('/public/asteroid.png') no-repeat center;
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
  background: url('/public/rocket.png') no-repeat center;
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
  50% { transform: translateX(-40%) rotate(2deg); }
  100% { transform: translateX(-50%) rotate(0deg); }
}
</style>