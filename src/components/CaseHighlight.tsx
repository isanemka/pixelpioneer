"use client";

import Image from "next/image";

const caseStudy = {
  title: "Streamlined E-commerce Experience",
  image: "/images/rocket_with_stars.png",
  imageAlt: "E-commerce case study visualization",
  problem: "Complex checkout process caused 65% cart abandonment",
  solution: "Redesigned single-page checkout with real-time validation",
  result: "42% increase in conversions, 3.2s faster checkout",
  metrics: [
    { label: "Conversion", value: "+42%" },
    { label: "Speed", value: "3.2s faster" },
    { label: "Satisfaction", value: "4.8/5" },
  ],
};

export default function CaseHighlight() {
  return (
    <section className="spacing-section bg-darkGray">
      <div className="section-container">
        <h2 className="font-press-start-2p text-2xl md:text-4xl text-accentMagenta mb-4 text-center">
          Case Highlight
        </h2>
        <p className="text-textSecondary text-center mb-12 max-w-2xl mx-auto">
          Deep dive into a recent success story
        </p>

        <div className="max-w-5xl mx-auto">
          {/* Hero Image */}
          <div className="relative aspect-video mb-12 overflow-hidden border-4 border-accentMagenta">
            <Image
              src={caseStudy.image}
              alt={caseStudy.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="pixel-corner-tl text-accentMagenta absolute" />
            <div className="pixel-corner-br text-accentMagenta absolute" />
          </div>

          <h3 className="font-press-start-2p text-xl md:text-2xl text-accentNeon mb-12 text-center">
            {caseStudy.title}
          </h3>

          {/* Problem → Solution → Result */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-darkBg p-6 border-2 border-mediumGray">
              <h4 className="font-press-start-2p text-sm text-accentMagenta mb-4">
                Problem
              </h4>
              <p className="text-textPrimary leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>

            <div className="bg-darkBg p-6 border-2 border-mediumGray">
              <h4 className="font-press-start-2p text-sm text-accentNeon mb-4">
                Solution
              </h4>
              <p className="text-textPrimary leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>

            <div className="bg-darkBg p-6 border-2 border-mediumGray">
              <h4 className="font-press-start-2p text-sm text-accentMagenta mb-4">
                Result
              </h4>
              <p className="text-textPrimary leading-relaxed">
                {caseStudy.result}
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {caseStudy.metrics.map((metric) => (
              <div
                key={metric.label}
                className="text-center p-6 bg-mediumGray border border-accentNeon/30"
              >
                <div className="font-press-start-2p text-2xl md:text-3xl text-accentNeon mb-2">
                  {metric.value}
                </div>
                <div className="text-textSecondary text-sm">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-accentMagenta text-textPrimary font-press-start-2p text-sm hover:bg-accentNeon hover:text-darkBg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-accentMagenta/50"
            >
              View Full Case
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
