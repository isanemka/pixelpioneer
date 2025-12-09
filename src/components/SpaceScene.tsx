"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export default function SpaceScene() {
  const mouseTrailRef = useRef<HTMLDivElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const customCursorRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const trailElementsRef = useRef<HTMLElement[]>([]);
  const asteroidTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSpawningAsteroidRef = useRef(false);
  const [parallaxY, setParallaxY] = useState(0);

  // Debounce utility
  const debounce = <T extends (...args: unknown[]) => void>(fn: T, delay = 200) => {
    let t: NodeJS.Timeout | undefined;
    return (...args: Parameters<T>) => {
      if (t) clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  };

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Only apply parallax in the hero section
      if (scrollY < viewportHeight) {
        setParallaxY(scrollY * 0.5); // Slow parallax factor
      }
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mouse trail effect
  const createMouseTrail = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target?.closest(".title-container")) return;

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

  // Create asteroids with recursive spawning - use ref to avoid immutability issues
  const asteroidSpawnerRef = useRef<() => void>();

  useEffect(() => {
    asteroidSpawnerRef.current = () => {
      if (isSpawningAsteroidRef.current) return;
      isSpawningAsteroidRef.current = true;

      const scene = sceneRef.current;
      if (!scene) {
        isSpawningAsteroidRef.current = false;
        return;
      }

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

      // Schedule next asteroid spawn
      const nextSpawn = Math.random() * 5000 + 3000;
      asteroidTimeoutRef.current = setTimeout(() => {
        isSpawningAsteroidRef.current = false;
        // Recursively spawn next asteroid
        asteroidSpawnerRef.current?.();
      }, nextSpawn);
    };
  }, []);

  const createAsteroid = useCallback(() => {
    asteroidSpawnerRef.current?.();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    createStars();

    if (!prefersReducedMotion) {
      createAsteroid();
    }

    const scene = sceneRef.current;
    if (scene) {
      scene.addEventListener("mousemove", createMouseTrail);
      scene.addEventListener("mousemove", updateMouseGlow);
      scene.addEventListener("mouseleave", hideMouseGlow);
    }

    const debouncedCreateStars = debounce(createStars, 200);
    window.addEventListener("resize", debouncedCreateStars);

    // Copy ref value for cleanup
    const trailElements = trailElementsRef.current;

    return () => {
      if (asteroidTimeoutRef.current) {
        clearTimeout(asteroidTimeoutRef.current);
      }

      if (scene) {
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
  }, [createStars, createAsteroid, createMouseTrail, updateMouseGlow, hideMouseGlow]);

  return (
    <div className="space-scene" ref={sceneRef}>
      <div 
        className="title-container"
        style={{
          transform: `translateY(${parallaxY}px)`,
        }}
      >
        <h1 className="title text-white font-press-start-2p">
          Pixel
          <br />
          Pioneer
        </h1>
        <p className="text-accentNeon text-lg md:text-xl mt-6 font-body max-w-2xl mx-auto px-4">
          Moderna pixelupplevelser med en skarp, minimal edge.
        </p>
        <div className="mt-8">
          <a
            href="#projects"
            className="inline-block px-8 py-4 bg-accentNeon text-darkBg font-press-start-2p text-sm hover:bg-accentMagenta hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accentNeon/50"
          >
            Se Projekt
          </a>
        </div>
      </div>
      <div 
        className="stars" 
        ref={starsContainerRef}
        style={{
          transform: `translateY(${parallaxY * 0.3}px)`,
        }}
      ></div>
      <div 
        className="rocket" 
        ref={rocketRef}
        style={{
          transform: `translateX(-50%) translateY(${parallaxY * 0.2}px)`,
        }}
      ></div>
      <div className="mouse-trail" ref={mouseTrailRef}></div>
      <div className="mouse-glow" ref={mouseGlowRef}></div>
      <div className="custom-cursor" ref={customCursorRef}>
        <div className="cursor-center"></div>
        <div className="cursor-ring"></div>
      </div>
      
      {/* Scroll Cue Arrow */}
      <div className="scroll-cue">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-accentNeon"
        >
          <path
            d="M12 4L12 20M12 20L6 14M12 20L18 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
          />
        </svg>
      </div>
    </div>
  );
}
