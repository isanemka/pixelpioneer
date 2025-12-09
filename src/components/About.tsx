"use client";

import Image from "next/image";
import { Code2, Zap, Target } from "lucide-react";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "UI/UX Design",
  "Performance",
  "Accessibility",
];

const strengths = [
  {
    icon: Code2,
    title: "Modern Stack",
    description: "Next.js, TypeScript, Tailwind för snabb, typsäker utveckling",
  },
  {
    icon: Zap,
    title: "Prestanda Först",
    description: "Optimerade byggen, lazy loading och blixtsnabba upplevelser",
  },
  {
    icon: Target,
    title: "Pixelperfekt",
    description: "Uppmärksamhet på detaljer med ren, underhållbar kod",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="spacing-section bg-darkGray"
    >
      <div className="section-container">
        <h2 className="font-press-start-2p text-2xl md:text-4xl text-accentNeon mb-4 text-center">
          Om Mig
        </h2>
        <p className="text-textSecondary text-center mb-12 max-w-2xl mx-auto">
          Bygger moderna webbupplevelser med precision
        </p>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Portrait/Silhouette */}
          <div className="order-2 md:order-1">
            <div className="relative aspect-square max-w-md mx-auto border-4 border-accentNeon bg-darkBg overflow-hidden">
              <Image
                src="/images/logo-white.png"
                alt="PixelPioneer avatar"
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="pixel-corner-tl text-accentNeon absolute" />
              <div className="pixel-corner-tr text-accentNeon absolute" />
              <div className="pixel-corner-bl text-accentNeon absolute" />
              <div className="pixel-corner-br text-accentNeon absolute" />
            </div>
          </div>

          {/* Bio and Details */}
          <div className="order-1 md:order-2">
            <div className="prose prose-invert max-w-none">
              <p className="text-textPrimary text-lg leading-relaxed mb-6">
                Jag bygger snabba och tydliga webbsidor som gör jobbet. Fokus på ditt mål: fler förfrågningar och bokningar.
              </p>

              {/* Strengths */}
              <div className="space-y-4 mb-8">
                {strengths.map((strength) => {
                  const Icon = strength.icon;
                  return (
                    <div
                      key={strength.title}
                      className="flex items-start gap-4 bg-mediumGray p-4 border border-accentNeon/30"
                    >
                      <Icon className="text-accentNeon flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-press-start-2p text-sm text-accentNeon mb-2">
                          {strength.title}
                        </h3>
                        <p className="text-textSecondary text-sm">
                          {strength.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="font-press-start-2p text-sm text-accentMagenta mb-4">
                  Teknikstack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-2 bg-darkBg border border-accentNeon text-accentNeon font-vt323 text-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4">
                <a
                  href="#contact"
                  className="inline-block px-6 py-3 bg-accentNeon text-darkBg font-press-start-2p text-xs hover:bg-accentMagenta hover:text-white transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-accentNeon/50"
                >
                  Kontakta Mig
                </a>
                <a
                  href="#contact"
                  className="inline-block px-6 py-3 border-2 border-accentNeon text-accentNeon font-press-start-2p text-xs hover:bg-accentNeon hover:text-darkBg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-accentNeon/50"
                >
                  Se CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
