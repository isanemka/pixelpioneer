"use client";

import { Search, Palette, Zap, Rocket } from "lucide-react";

const processSteps = [
  {
    icon: Search,
    title: "Discover",
    description: "Research user needs and define clear goals",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Create intuitive, pixel-perfect interfaces",
  },
  {
    icon: Zap,
    title: "Build",
    description: "Develop fast, accessible web experiences",
  },
  {
    icon: Rocket,
    title: "Ship",
    description: "Launch and optimize for maximum impact",
  },
];

export default function Process() {
  return (
    <section className="spacing-section bg-mediumGray">
      <div className="section-container">
        <h2 className="font-press-start-2p text-2xl md:text-4xl text-accentNeon mb-4 text-center">
          Process
        </h2>
        <p className="text-textSecondary text-center mb-12 max-w-2xl mx-auto">
          A streamlined approach to deliver quality results
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="text-center relative"
              >
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-accentMagenta flex items-center justify-center font-press-start-2p text-darkBg text-sm">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 bg-darkBg border-2 border-accentNeon flex items-center justify-center relative">
                    <Icon size={40} className="text-accentNeon" strokeWidth={2} />
                    <div className="pixel-corner-tl text-accentNeon absolute" />
                    <div className="pixel-corner-br text-accentNeon absolute" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-press-start-2p text-lg text-accentNeon mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-textSecondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
