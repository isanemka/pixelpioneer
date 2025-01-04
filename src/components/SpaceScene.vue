<template>
  <div class="space-scene">
    <div class="stars"></div>
    <div class="rocket"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';

function createStars() {
  const starsContainer = document.querySelector('.stars') as HTMLElement | null;
  if (!starsContainer) {
    console.error('Element with class ".stars" could not be found.');
    return;
  }

  // Remove existing stars before generating new ones
  starsContainer.innerHTML = '';

  const numberOfStars = 100;

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Random position within the container
    const top = Math.random() * starsContainer.clientHeight;
    const left = Math.random() * starsContainer.clientWidth;
    star.style.top = `${top}px`;
    star.style.left = `${left}px`;

    // Random size
    const size = Math.random() * 4 + 2; // Between 2px and 6px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Add movement animation
    const duration = Math.random() * 5 + 5; // Varying speed (5-10s)
    star.style.animation = `moveStars ${duration}s linear infinite`;

    starsContainer.appendChild(star);
  }

  console.log(`${numberOfStars} stars created!`);
}

onMounted(() => {
  createStars();
  window.addEventListener('resize', createStars);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', createStars);
});
</script>

<style>
/* Ensures that only `.space-scene` contains the stars */
.space-scene {
  position: relative;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle, #5200aa, #111);
  overflow: hidden;
}

/* Container for the stars */
.stars {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

/* Individual star properties */
.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0.8;
  z-index: 2;
}

/* Star movement animation */
@keyframes moveStars {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100vh);
  }
}

/* Rocket properties */
.rocket {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 100px;
  background: url('/public/symmetric_rocket.png') no-repeat center;
  background-size: contain;
  animation: flyRocket 3s ease-in-out infinite;
  z-index: 3;
}

/* Fire effect for the rocket */
.rocket::after {
  content: "";
  position: absolute;
  bottom: -25px; /* Position the fire below the rocket */
  left: 50%;
  transform: translateX(-50%);
  width: 10px; /* Narrow flame */
  height: 35px; /* Longer flame */
  background: linear-gradient(
    to bottom,
    rgba(255, 165, 0, 0.9) 0%,  /* Orange at the top */
    rgba(255, 69, 0, 0.8) 50%,  /* Red in the middle */
    rgba(255, 0, 0, 0.6) 80%,  /* Dark red towards the bottom */
    transparent 100% /* Fade out at the bottom */
  );
  opacity: 0.8;
  border-radius: 20% 20% 50% 50%; /* Makes the bottom wider */
  animation: fireAnimation 0.2s infinite alternate ease-in-out;
}

/* Fire animation for a flickering effect */
@keyframes fireAnimation {
  0% {
    transform: translateX(-50%) scaleY(1) scaleX(1.3);
    opacity: 0.9;
  }
  100% {
    transform: translateX(-50%) scaleY(1.3) scaleX(1.6); /* Fire becomes taller and thinner */
    opacity: 0.5;
  }
}

/* Rocket side movement */
@keyframes flyRocket {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  50% {
    transform: translateX(-40%) rotate(2deg);
  }
  100% {
    transform: translateX(-50%) rotate(0deg);
  }
}
</style>