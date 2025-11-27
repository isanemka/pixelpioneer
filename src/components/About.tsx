"use client";

import { useEffect, useState, useRef } from "react";
import {
  Globe,
  Search,
  ShieldCheck,
  Gauge,
  Zap,
  Wrench,
  LucideIcon,
} from "lucide-react";

interface Service {
  name: string;
  value: string;
  includes: string;
  icon: LucideIcon;
}

const services: Service[] = [
  {
    name: "Ny hemsida som ger fler kunder",
    value: "Tydlig väg till kontakt",
    includes: "Design, texter, bilder, kontaktknappar och projektformulär",
    icon: Globe,
  },
  {
    name: "Bokning och formulär",
    value: "Färre mail fram och tillbaka",
    includes: "Smidigt bokningsflöde med bekräftelser och notifieringar",
    icon: Zap,
  },
  {
    name: "Bli hittad på Google och i AI-svar",
    value: "Rätt kunder hittar dig där de söker",
    includes: "SEO-optimering som både Google och AI älskar",
    icon: Search,
  },
  {
    name: "Snabbare hemsida",
    value: "Kortare väntetid, fler avslut",
    includes: "Snabb laddning och optimerade bilder",
    icon: Gauge,
  },
  {
    name: "Skötsel och säkerhet",
    value: "Trygg drift i vardagen",
    includes: "Uppdateringar, backup och hjälp när du behöver",
    icon: ShieldCheck,
  },
  {
    name: "Automatiseringar som spar tid",
    value: "Mindre manuellt arbete",
    includes: "Skapa automatiserade flöden som sparar tid",
    icon: Wrench,
  },
];

const fullText = `
Jag bygger snabba och tydliga webbsidor som gör jobbet:
• Fokus på ditt mål: fler förfrågningar och bokningar
• Enkelt i vardagen – jag finns kvar efter lansering
• Snabb laddning och bättre synlighet i Google och AI-svar
`.trim();

export default function About() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const stopTyping = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
    setIsTyping(false);
  };

  const skipTyping = () => {
    stopTyping();
    setDisplayedText(fullText);
    setShowServices(true);
  };

  const startTyping = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      skipTyping();
      return;
    }

    setIsTyping(true);
    let i = 0;
    const speed = 26;

    timerRef.current = setInterval(() => {
      setDisplayedText(fullText.slice(0, i++));
      if (i > fullText.length) {
        stopTyping();
        setTimeout(() => setShowServices(true), 300);
      }
    }, speed);
  };

  useEffect(() => {
    const timeout = setTimeout(startTyping, 300);
    return () => {
      clearTimeout(timeout);
      stopTyping();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="services"
      className="w-full bg-black font-vt323 px-6 py-12 text-left"
    >
      <div className="max-w-4xl mx-auto text-limegreen border-2 border-limegreen shadow-limegreen p-4 rounded-md">
        {/* Typing text effect */}
        <p
          className="text-lg md:text-xl leading-relaxed"
          role="status"
          aria-live="polite"
          aria-busy={isTyping ? "true" : "false"}
        >
          <span className="select-none">&gt; </span>
          {isTyping && (
            <span className="sr-only">Skriver introduktion...</span>
          )}
          <span className="whitespace-pre-line">{displayedText}</span>
          <span className="cursor" aria-hidden="true">
            █
          </span>
        </p>

        {/* Controls */}
        <div className="mt-3 flex items-center gap-4">
          {isTyping && (
            <button
              onClick={skipTyping}
              className="text-sm md:text-base text-black bg-limegreen/90 hover:bg-limegreen px-3 py-1 rounded transition"
            >
              Visa hela texten
            </button>
          )}
          <a
            href="#contact"
            className="text-sm md:text-base underline text-cyan-300 hover:text-cyan-200"
          >
            Få kostnadsfri offert
          </a>
        </div>

        {/* Services */}
        {showServices && (
          <div className="fade-in">
            <h3 className="mt-8 text-2xl md:text-3xl text-orange-400 underline">
              Tjänster
            </h3>
            <p className="text-lg md:text-xl text-gray-300 mt-2">
              Implementeringar som ger snabb effekt – allt kan kombineras och
              växa med ditt företag.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {services.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <article
                    key={i}
                    className="border border-lime-400/70 rounded p-3 md:p-4 bg-gray-900/50 hover:bg-gray-900 transition"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="text-cyan-300" size={22} />
                      <div>
                        <h4 className="text-cyan-400 text-xl">{svc.name}</h4>
                        <p className="text-limegreen text-base md:text-lg">
                          {svc.value}
                        </p>
                        <p className="text-gray-400 text-base md:text-lg mt-1">
                          {svc.includes}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
