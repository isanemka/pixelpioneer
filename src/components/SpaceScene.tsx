"use client";

import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function SpaceScene() {
  const mouseTrailRef = useRef<HTMLDivElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const customCursorRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const trailElementsRef = useRef<HTMLElement[]>([]);
  const asteroidTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSpawningAsteroidRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  // Scroll progress for the hero itself (0 at top, 1 when hero has scrolled past).
  // Used to gently fade/translate the HUD as the journey begins.
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end start"],
  });
  const hudOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const hudY = useTransform(scrollYProgress, [0, 0.6], [0, -24]);
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.2]);

  // Debounce utility
  const debounce = <T extends (...args: unknown[]) => void>(fn: T, delay = 200) => {
    let t: NodeJS.Timeout | undefined;
    return (...args: Parameters<T>) => {
      if (t) clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  };

  // Mouse trail effect
  const createMouseTrail = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target?.closest(".hero-hud")) return;

    const trail = document.createElement("div");
    trail.className = "trail-particle";

    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return;

    trail.style.left = `${e.clientX - rect.left}px`;
    trail.style.top = `${e.clientY - rect.top}px`;

    const colors = ["#00ff88", "#40ff99", "#60a5fa", "#fbbf24", "#ffffff"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    trail.style.background = randomColor;
    trail.style.boxShadow = `0 0 20px ${randomColor}`;

    mouseTrailRef.current?.appendChild(trail);
    trailElementsRef.current.push(trail);

    setTimeout(() => {
      if (trail.parentNode) {
        trail.parentNode.removeChild(trail);
      }
      const index = trailElementsRef.current.indexOf(trail);
      if (index > -1) {
        trailElementsRef.current.splice(index, 1);
      }
    }, 1000);
  }, []);

  // Mouse glow effect
  const updateMouseGlow = useCallback((e: MouseEvent) => {
    if (!mouseGlowRef.current) return;

    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseGlowRef.current.style.left = `${x - 50}px`;
    mouseGlowRef.current.style.top = `${y - 50}px`;
    mouseGlowRef.current.style.opacity = "0.6";

    if (customCursorRef.current) {
      customCursorRef.current.style.left = `${x - 15}px`;
      customCursorRef.current.style.top = `${y - 15}px`;
      customCursorRef.current.style.opacity = "1";
    }
  }, []);

  // Hide glow when mouse leaves
  const hideMouseGlow = useCallback(() => {
    if (mouseGlowRef.current) {
      mouseGlowRef.current.style.opacity = "0";
    }
    if (customCursorRef.current) {
      customCursorRef.current.style.opacity = "0";
    }
  }, []);

  // Create stars
  const createStars = useCallback(() => {
    const starsContainer = starsContainerRef.current;
    if (!starsContainer) return;

    starsContainer.innerHTML = "";
    const numberOfStars = window.innerWidth < 640 ? 60 : 100;

    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");

      const top = Math.random() * starsContainer.clientHeight;
      const left = Math.random() * starsContainer.clientWidth;
      star.style.top = `${top}px`;
      star.style.left = `${left}px`;

      const size = Math.random() * 4 + 2;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      const colors = ["#ffffff", "#00ff88", "#40ff99", "#60a5fa", "#fbbf24"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      star.style.background = randomColor;
      star.style.boxShadow = `0 0 ${size * 2}px ${randomColor}`;

      const duration = Math.random() * 5 + 5;
      star.style.animation = `moveStars ${duration}s linear infinite`;

      starsContainer.appendChild(star);
    }
  }, []);

  // Create asteroids - using a ref to hold the function for self-reference
  const createAsteroidRef = useRef<() => void>(() => {});
  
  createAsteroidRef.current = () => {
    if (isSpawningAsteroidRef.current) return;
    isSpawningAsteroidRef.current = true;

    const scene = sceneRef.current;
    if (!scene) return;

    const containerWidth = scene.clientWidth;
    const asteroid = document.createElement("div");
    asteroid.classList.add("asteroid");

    let left;
    if (Math.random() < 0.5) {
      left = Math.random() * (containerWidth * 0.35);
    } else {
      left = containerWidth * 0.65 + Math.random() * (containerWidth * 0.1);
    }

    asteroid.style.top = `-50px`;
    asteroid.style.left = `${left}px`;

    const size = Math.random() * 30 + 20;
    asteroid.style.width = `${size}px`;
    asteroid.style.height = `${size}px`;

    const duration = Math.random() * 5 + 5;
    asteroid.style.animation = `moveAsteroids ${duration}s linear`;

    scene.appendChild(asteroid);

    setTimeout(() => {
      asteroid.remove();
    }, duration * 1000);

    const nextSpawn = Math.random() * 5000 + 3000;
    asteroidTimeoutRef.current = setTimeout(() => {
      isSpawningAsteroidRef.current = false;
      createAsteroidRef.current();
    }, nextSpawn);
  };
  
  const createAsteroid = useCallback(() => {
    createAsteroidRef.current();
  }, []);

  useEffect(() => {
    createStars();

    // Use Framer Motion's useReducedMotion hook consistently
    const scene = sceneRef.current;
    if (!prefersReducedMotion) {
      createAsteroid();
      
      if (scene) {
        scene.addEventListener("mousemove", createMouseTrail);
        scene.addEventListener("mousemove", updateMouseGlow);
        scene.addEventListener("mouseleave", hideMouseGlow);
      }
    }

    const debouncedCreateStars = debounce(createStars, 200);
    window.addEventListener("resize", debouncedCreateStars);

    // Copy ref value for cleanup
    const trailElements = trailElementsRef.current;

    return () => {
      if (asteroidTimeoutRef.current) {
        clearTimeout(asteroidTimeoutRef.current);
      }

      if (scene && !prefersReducedMotion) {
        scene.removeEventListener("mousemove", createMouseTrail);
        scene.removeEventListener("mousemove", updateMouseGlow);
        scene.removeEventListener("mouseleave", hideMouseGlow);
      }

      trailElements.forEach((trail) => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      });

      window.removeEventListener("resize", debouncedCreateStars);
    };
  }, [createStars, createAsteroid, createMouseTrail, updateMouseGlow, hideMouseGlow, prefersReducedMotion]);

  return (
    <div className="space-scene" ref={sceneRef}>
      <motion.div
        className="absolute inset-0 hero-grid"
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { opacity: gridOpacity }}
      />
      <div className="absolute inset-0 hero-scanlines" aria-hidden="true" />

      <motion.div
        className="hero-hud"
        style={
          prefersReducedMotion
            ? undefined
            : {
                opacity: hudOpacity,
                y: hudY,
              }
        }
      >
        <p className="hero-badge">
          <span className="select-none">◼</span>
          From pixel to platform
        </p>

        <h1 className="hero-title text-white font-press-start-2p">PixelPioneer</h1>
        <p className="hero-subtitle">
          Experimental web agency & product developer — pixel aesthetics, modern
          execution.
        </p>

        <div className="hero-actions">
          <Link href="/brief" className="hero-btn hero-btn-primary">
            Starta ett projekt
          </Link>
          <a href="#services" className="hero-btn hero-btn-secondary">
            Utforska resan
          </a>
        </div>

        <p className="hero-scroll-hint">
          Scrolla för att börja <span className="hero-scroll-arrow">↓</span>
        </p>
      </motion.div>

      <div className="stars" ref={starsContainerRef}></div>
      <div className="rocket" aria-hidden="true"></div>
      <div className="mouse-trail" ref={mouseTrailRef}></div>
      <div className="mouse-glow" ref={mouseGlowRef}></div>
      <div className="custom-cursor" ref={customCursorRef}>
        <div className="cursor-center"></div>
        <div className="cursor-ring"></div>
      </div>
    </div>
  );
}
