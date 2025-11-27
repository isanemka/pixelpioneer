"use client";

import {
  Target,
  Palette,
  Zap,
  BarChart3,
  Rocket,
  TrendingUp,
  DollarSign,
  Users,
  Shield,
  Settings,
  LucideIcon,
} from "lucide-react";

interface ApproachItem {
  id: number;
  title: string;
  phase: string;
  icon: LucideIcon;
  description: string;
  deliverables: string[];
}

interface BenefitItem {
  title: string;
  icon: LucideIcon;
  description: string;
  features: string[];
}

const approaches: ApproachItem[] = [
  {
    id: 1,
    title: "Start: mål & plan",
    phase: "Steg 1",
    icon: Target,
    description:
      "Vi sätter mål, målgrupp och en enkel plan. Rätt saker i rätt ordning – utan krångel.",
    deliverables: [
      "Mål och målgrupp",
      "Enkel projektplan",
      "Prioriterad åtgärdslista",
      "Tidsbild & budgetram",
    ],
  },
  {
    id: 2,
    title: "Design som leder vidare",
    phase: "Steg 2",
    icon: Palette,
    description:
      "Tydlig, modern design som gör det lätt att förstå och lätt att kontakta.",
    deliverables: [
      "Skisser & förslag",
      "Mobilanpassad design",
      "Färger & typsnitt",
      "Snabb feedbackrunda",
    ],
  },
  {
    id: 3,
    title: "Bygga & testa",
    phase: "Steg 3",
    icon: Zap,
    description:
      "Jag bygger snabbt och stabilt. Du kan prova under tiden och ge feedback.",
    deliverables: [
      "Färdig hemsida",
      "Kontaktformulär och bokning",
      "Grundläggande spårning",
      "Trygg driftmiljö",
    ],
  },
  {
    id: 4,
    title: "Synlighet & snabbhet",
    phase: "Steg 4",
    icon: BarChart3,
    description:
      "Gör sidan lätt att hitta och snabb att använda – för både kunder och Google/AI.",
    deliverables: [
      "Tydliga rubriker och texter",
      "Snabb laddning",
      "Synlighet i Google och AI-svar",
      "Enkel uppföljning",
    ],
  },
  {
    id: 5,
    title: "Lansering & överlämning",
    phase: "Steg 5",
    icon: Rocket,
    description:
      "Smidig lansering. Du får en enkel genomgång – jag sköter ändringar åt dig när du vill.",
    deliverables: [
      "Lansering i produktion",
      "Genomgång & tydliga rutiner för ändringar",
      "Backup-lösning",
      "Supportplan vid behov",
    ],
  },
  {
    id: 6,
    title: "Uppföljning & förbättring",
    phase: "Steg 6",
    icon: TrendingUp,
    description: "Vi följer upp och förbättrar det som ger mest effekt",
    deliverables: [
      "Enkel rapport",
      "Förslag på nästa steg",
      "Små förbättringar löpande",
      "Tekniska uppdateringar",
    ],
  },
];

const benefits: BenefitItem[] = [
  {
    title: "Snabba resultat",
    icon: Zap,
    description: "Sidor som laddar snabbt och fungerar på alla enheter.",
    features: [
      "Optimerade laddningstider",
      "Mobilanpassad design",
      "Tydliga kontaktvägar",
      "Enkel navigation",
    ],
  },
  {
    title: "Fler kunder",
    icon: TrendingUp,
    description: "Gör det lätt för rätt kunder att hitta och kontakta dig.",
    features: [
      "Lätt att hitta i Google och AI-svar",
      "Tydliga budskap",
      "Övertygande innehåll",
      "Synliga CTA-knappar",
    ],
  },
  {
    title: "Enkel hantering",
    icon: Settings,
    description: "Snabb ändringsservice utan krångel.",
    features: [
      "Snabb ändringsservice",
      "Tydliga rutiner",
      "Löpande stöd",
      "Säkerhetsuppdateringar",
    ],
  },
  {
    title: "Trygga kostnader",
    icon: DollarSign,
    description: "Tydliga priser utan överraskningar.",
    features: [
      "Tydlig prismodell",
      "Inga dolda kostnader",
      "Flexibla upplägg",
      "Fri offert & konsultation",
    ],
  },
  {
    title: "Personlig service",
    icon: Users,
    description: "En kontakt som lär känna ditt företag och dina behov.",
    features: [
      "Support på svenska",
      "Snabb responstid",
      "Personlig kontakt",
      "Långsiktigt samarbete",
    ],
  },
  {
    title: "Framtidssäkert & oberoende",
    icon: Shield,
    description:
      "Modern lösning som håller länge och som du själv kontrollerar.",
    features: [
      "Kan växa med företaget",
      "Du äger innehåll och domän",
      "Ingen plattformsinlåsning",
      "Hållbar grundteknik",
    ],
  },
];

export default function Approach() {
  return (
    <section
      id="approach"
      className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-16 font-vt323 overflow-hidden"
    >
      <div className="container mx-auto relative z-10">
        {/* HEADLINE */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-limegreen">
          Hur jag jobbar – och vad du får
        </h2>
        <p className="text-center text-gray-300 mb-16 max-w-3xl mx-auto px-4 text-xl md:text-2xl">
          Tydlig process som ger snabb effekt och långsiktigt värde.
        </p>

        {/* WORKFLOW - 6 PHASES */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {approaches.map((approach) => {
              const Icon = approach.icon;
              return (
                <div
                  key={approach.id}
                  className="bg-gray-800 border-2 border-limegreen shadow-lg rounded p-6 hover:shadow-xl hover:border-cyan-400 transition-all duration-300"
                >
                  <div className="mb-4 h-20 flex items-center justify-center">
                    <Icon size={48} strokeWidth={2} className="text-limegreen" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-cyan-400">
                    {approach.title}
                  </h3>
                  <p className="text-orange-400 text-base mb-2">
                    {approach.phase}
                  </p>
                  <p className="text-gray-300 mb-4 text-lg md:text-xl leading-relaxed">
                    {approach.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-limegreen font-bold text-base mb-2">
                      LEVERERAR:
                    </h4>
                    <ul className="text-lg md:text-xl text-gray-300 space-y-1">
                      {approach.deliverables.map((deliverable) => (
                        <li key={deliverable} className="flex items-center">
                          <span className="text-limegreen mr-2">▶</span>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RESULTS & BENEFITS */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 text-orange-400">
            Resultat du märker
          </h3>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto px-6 text-xl md:text-2xl">
            Konkret effekt för din verksamhet: fler förfrågningar, tydligare
            budskap och smidigare upplevelse.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-800 border-2 border-limegreen shadow-lg mb-4">
                    <Icon size={40} strokeWidth={2} className="text-limegreen" />
                  </div>
                  <h3 className="text-3xl text-cyan-400 font-vt323 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 text-xl md:text-2xl leading-relaxed mb-4">
                    {benefit.description}
                  </p>
                  <div className="space-y-2">
                    {benefit.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center text-lg md:text-xl text-limegreen"
                      >
                        <span className="mr-2">▶</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TECHNICAL FOUNDATION */}
        <div className="text-center">
          <h3 className="text-3xl font-vt323 text-orange-400 mb-6">
            MODERN & SÄKER GRUND
          </h3>
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Bygger med beprövad, modern teknik som garanterar säkerhet,
              hastighet och framtidssäkerhet för dig och ditt företag.
            </p>

            {/* Benefit cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 border border-cyan-400 rounded-lg p-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 border border-limegreen mb-3 mx-auto">
                  <Zap size={24} className="text-limegreen" />
                </div>
                <h4 className="text-cyan-400 font-bold mb-2 text-lg">
                  Snabb & responsiv
                </h4>
                <p className="text-gray-300 text-base">
                  Optimerad kod för alla enheter
                </p>
              </div>

              <div className="bg-gray-800 border border-cyan-400 rounded-lg p-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 border border-limegreen mb-3 mx-auto">
                  <Shield size={24} className="text-limegreen" />
                </div>
                <h4 className="text-cyan-400 font-bold mb-2 text-lg">
                  Säker & stabil
                </h4>
                <p className="text-gray-300 text-base">
                  Moderna säkerhetslösningar och regelbundna uppdateringar
                </p>
              </div>

              <div className="bg-gray-800 border border-cyan-400 rounded-lg p-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 border border-limegreen mb-3 mx-auto">
                  <TrendingUp size={24} className="text-limegreen" />
                </div>
                <h4 className="text-cyan-400 font-bold mb-2 text-lg">
                  Framtidssäker
                </h4>
                <p className="text-gray-300 text-base">
                  Skalbar arkitektur som växer med ditt företag
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
