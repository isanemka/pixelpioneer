"use client";

import { useRef, type CSSProperties } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function ExperienceWebAgency() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll progress for this section only.
  // 0 when section enters viewport, 1 when it leaves.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const p = useTransform(scrollYProgress, (v) => Math.min(1, Math.max(0, v)));
  const headingY = useTransform(p, [0, 0.6], [24, 0]);
  const headingOpacity = useTransform(p, [0, 0.25], [0, 1]);

  const gridOpacity = useTransform(p, [0, 0.25], [0, 1]);
  const gridY = useTransform(p, [0, 0.6], [40, 0]);

  const blocks = Array.from({ length: 36 }, (_, i) => i);
  const duration = 0.18;

  return (
    <section
      id="services"
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="relative min-h-[100dvh] overflow-hidden bg-black font-vt323 text-white scroll-mt-24"
    >
      {/* CSS-first overlays */}
      <div className="absolute inset-0 hero-grid" aria-hidden="true" />
      <div className="absolute inset-0 hero-scanlines" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: headingOpacity,
                  y: headingY,
                }
          }
        >
          <p className="hero-badge">
            <span className="select-none">◼</span>
            Web Agency
          </p>
          <h2 className="hero-title font-press-start-2p">Bygger webben som säljer</h2>
          <p className="hero-subtitle max-w-2xl">
            Placeholder copy: design, utveckling och teknik med pixel-känsla —
            men modern execution (prestanda, SEO, analytics, forms, AI-ready).
          </p>
        </motion.div>

        <motion.div
          className="reveal-grid mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          style={
            prefersReducedMotion
              ? ({ "--p": 1 } as CSSProperties)
              : ({
                  opacity: gridOpacity,
                  y: gridY,
                  "--p": p,
                } as unknown as CSSProperties)
          }
        >
          {blocks.map((i) => {
            const col = i % 6;
            const row = Math.floor(i / 6);
            const t0 = 0.12 + (row * 6 + col) * 0.012;

            return (
              <motion.div
                key={i}
                className="pixel-block relative aspect-square rounded-xl border border-limegreen/25 bg-gray-900/40"
                // CSS-first reveal: we drive progress with a CSS var (--p) on the parent.
                // Each block has its own threshold (--t0) and slope (--invD).
                style={
                  {
                    "--t0": t0,
                    "--invD": 1 / duration,
                  } as CSSProperties
                }
              >
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(0,255,136,0.18), transparent 60%)",
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-10 max-w-3xl text-lg text-gray-300">
          <ul className="space-y-2">
            <li>
              <span className="text-limegreen">▶</span> Webbdesign + utveckling
            </li>
            <li>
              <span className="text-limegreen">▶</span> Snabbhet + SEO + AI-svar
            </li>
            <li>
              <span className="text-limegreen">▶</span> Formulär, bokning,
              automation
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
