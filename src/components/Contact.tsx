"use client";

import { Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="spacing-section bg-darkBg"
    >
      <div className="section-container">
        <h2 className="font-press-start-2p text-2xl md:text-4xl text-accentNeon mb-4 text-center">
          Get in Touch
        </h2>
        <p className="text-textSecondary text-center mb-12 max-w-2xl mx-auto">
          Ready to build something amazing? Let's talk.
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="bg-mediumGray border-2 border-accentNeon p-8 md:p-12 relative">
            {/* Broken corners */}
            <div className="pixel-corner-tl text-accentNeon absolute" />
            <div className="pixel-corner-tr text-accentNeon absolute" />
            <div className="pixel-corner-bl text-accentNeon absolute" />
            <div className="pixel-corner-br text-accentNeon absolute" />

            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-center gap-4 p-4 bg-darkBg border border-accentNeon/30 hover:border-accentNeon transition-colors duration-300">
                <div className="w-12 h-12 bg-accentNeon flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-darkBg" />
                </div>
                <div>
                  <h3 className="font-press-start-2p text-xs text-accentNeon mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:hej@pixelpioneer.se"
                    className="text-textPrimary hover:text-accentNeon transition-colors text-lg"
                  >
                    hej@pixelpioneer.se
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 p-4 bg-darkBg border border-accentNeon/30 hover:border-accentNeon transition-colors duration-300">
                <div className="w-12 h-12 bg-accentNeon flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-darkBg" />
                </div>
                <div>
                  <h3 className="font-press-start-2p text-xs text-accentNeon mb-2">
                    Phone
                  </h3>
                  <a
                    href="tel:+46734644604"
                    className="text-textPrimary hover:text-accentNeon transition-colors text-lg"
                  >
                    0734-64 46 04
                  </a>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center pt-4">
                <p className="text-textSecondary mb-4">
                  Kostnadsfri konsultation – ring eller maila för ett första samtal
                </p>
                <a
                  href="#projects"
                  className="inline-block px-8 py-4 bg-accentMagenta text-textPrimary font-press-start-2p text-sm hover:bg-accentNeon hover:text-darkBg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-accentMagenta/50"
                >
                  View Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
