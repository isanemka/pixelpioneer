"use client";

import { useState } from "react";
import { Send, CheckCircle, Rocket, Globe, Palette, Target } from "lucide-react";
import Link from "next/link";

interface FormData {
  // Contact details
  name: string;
  company: string;
  email: string;
  phone: string;
  
  // About the project
  projectType: string[];
  description: string;
  goals: string;
  targetAudience: string;
  
  // Design & content
  hasLogo: string;
  designStyle: string;
  competitors: string;
  inspirationSites: string;
  
  // Features
  features: string[];
  otherFeatures: string;
  
  // Timeline
  deadline: string;
  
  // Additional info
  additionalInfo: string;
}

const initialFormData: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: [],
  description: "",
  goals: "",
  targetAudience: "",
  hasLogo: "",
  designStyle: "",
  competitors: "",
  inspirationSites: "",
  features: [],
  otherFeatures: "",
  deadline: "",
  additionalInfo: "",
};

const projectTypes = [
  "Företagssida",
  "Uppdatering av befintlig sida",
  "Redesign av befintlig sida",
  "Landningssida",
  "Portfolio",
  "Annat",
];

const featureOptions = [
  "Kontaktformulär",
  "Bildgalleri",
  "Karta/hitta hit",
  "Sökfunktion",
  "Flerspråkig",
  "Sociala medier",
];

export default function BriefPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: "projectType" | "features", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // TODO: Implement AWS SES email sending
    // For now, just simulate submission
    try {
      // API call will go here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to send brief:", error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-3 sm:px-4">
        <div className="text-center max-w-md px-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-limegreen rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle size={36} className="text-gray-900 sm:w-12 sm:h-12" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-limegreen font-vt323 mb-3 sm:mb-4">
            Tack för din brief!
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8">
            Jag har tagit emot din projektbeskrivning och återkommer inom 48 timmar
            med en första bedömning och förslag.
          </p>
          <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
            Har du frågor under tiden? Kontakta mig på{" "}
            <a href="mailto:hej@pixelpioneer.se" className="text-cyan-400 underline">
              hej@pixelpioneer.se
            </a>
          </p>
          <Link
            href="/"
            className="inline-block bg-limegreen text-black font-bold px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Tillbaka till startsidan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 py-8 md:py-12 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <Link href="/" className="inline-block mb-4 md:mb-6">
            <Rocket size={40} className="text-limegreen mx-auto md:w-12 md:h-12" />
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-limegreen font-vt323 mb-3 md:mb-4">
            Projektbrief
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto px-2">
            Fyll i formuläret så får jag en bild av vad du behöver. Ju mer detaljer, desto
            bättre kan jag hjälpa dig!
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between text-xs sm:text-sm text-gray-400 mb-2">
            <span>Steg {currentStep} av {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-limegreen to-cyan-400 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          {/* Step 1: Contact details */}
          {currentStep === 1 && (
            <div className="bg-gray-800/50 border border-limegreen/30 rounded-lg p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-limegreen/20 rounded-full flex items-center justify-center">
                  <Target size={16} className="text-limegreen sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 font-vt323">
                  Kontaktuppgifter
                </h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-1.5 sm:mb-2">
                    Namn <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-limegreen focus:outline-none transition-colors"
                    placeholder="Ditt namn"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-1.5 sm:mb-2">Företag</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-limegreen focus:outline-none transition-colors"
                    placeholder="Företagsnamn (om aktuellt)"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-1.5 sm:mb-2">
                    E-post <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-limegreen focus:outline-none transition-colors"
                    placeholder="din@epost.se"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-1.5 sm:mb-2">Telefon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-limegreen focus:outline-none transition-colors"
                    placeholder="07XX-XX XX XX"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: About the project */}
          {currentStep === 2 && (
            <div className="bg-gray-800/50 border border-limegreen/30 rounded-lg p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-limegreen/20 rounded-full flex items-center justify-center">
                  <Globe size={16} className="text-limegreen sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 font-vt323">
                  Om projektet
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-2 sm:mb-3">Typ av projekt</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                    {projectTypes.map((type) => (
                      <label
                        key={type}
                        className={`flex items-center gap-2 p-2.5 sm:p-3 rounded-lg border cursor-pointer transition-colors ${
                          formData.projectType.includes(type)
                            ? "bg-limegreen/20 border-limegreen text-limegreen"
                            : "bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.projectType.includes(type)}
                          onChange={() => handleCheckboxChange("projectType", type)}
                          className="sr-only"
                        />
                        <span className="text-xs sm:text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-1.5 sm:mb-2">
                    Beskriv projektet <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-limegreen focus:outline-none transition-colors resize-none"
                    placeholder="Berätta kort om ditt företag och vad du vill uppnå med hemsidan..."
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-1.5 sm:mb-2">Mål med hemsidan</label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-limegreen focus:outline-none transition-colors resize-none"
                    placeholder="T.ex. få fler kunder, sälja produkter, visa upp portfolio..."
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-1.5 sm:mb-2">Vem är din målgrupp?</label>
                  <input
                    type="text"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-limegreen focus:outline-none transition-colors"
                    placeholder="T.ex. småföretagare i Stockholm, unga familjer..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Design & content */}
          {currentStep === 3 && (
            <div className="bg-gray-800/50 border border-limegreen/30 rounded-lg p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-limegreen/20 rounded-full flex items-center justify-center">
                  <Palette size={16} className="text-limegreen sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 font-vt323">
                  Design & innehåll
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-1.5 sm:mb-2">Har du en logotyp?</label>
                  <select
                    name="hasLogo"
                    value={formData.hasLogo}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-limegreen focus:outline-none transition-colors"
                  >
                    <option value="">Välj...</option>
                    <option value="Ja, i hög kvalitet">Ja, i hög kvalitet</option>
                    <option value="Ja, men behöver uppdateras">Ja, men behöver uppdateras</option>
                    <option value="Nej, behöver en ny">Nej, behöver en ny</option>
                    <option value="Nej, inte aktuellt">Nej, inte aktuellt</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-1.5 sm:mb-2">Önskad stil/känsla</label>
                  <input
                    type="text"
                    name="designStyle"
                    value={formData.designStyle}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-limegreen focus:outline-none transition-colors"
                    placeholder="T.ex. modern, minimalistisk, lekfull, professionell..."
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-1.5 sm:mb-2">
                    Konkurrenter eller liknande verksamheter
                  </label>
                  <textarea
                    name="competitors"
                    value={formData.competitors}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-limegreen focus:outline-none transition-colors resize-none"
                    placeholder="Länka gärna till deras hemsidor..."
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-1.5 sm:mb-2">
                    Hemsidor du gillar (inspiration)
                  </label>
                  <textarea
                    name="inspirationSites"
                    value={formData.inspirationSites}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-limegreen focus:outline-none transition-colors resize-none"
                    placeholder="Länka gärna och berätta vad du gillar med dem..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Features */}
          {currentStep === 4 && (
            <div className="bg-gray-800/50 border border-limegreen/30 rounded-lg p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-limegreen/20 rounded-full flex items-center justify-center">
                  <Rocket size={16} className="text-limegreen sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 font-vt323">
                  Funktioner
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-2 sm:mb-3">
                    Vilka funktioner behöver du?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {featureOptions.map((feature) => (
                      <label
                        key={feature}
                        className={`flex items-center gap-2 p-2.5 sm:p-3 rounded-lg border cursor-pointer transition-colors ${
                          formData.features.includes(feature)
                            ? "bg-limegreen/20 border-limegreen text-limegreen"
                            : "bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature)}
                          onChange={() => handleCheckboxChange("features", feature)}
                          className="sr-only"
                        />
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-1.5 sm:mb-2">
                    Andra funktioner eller önskemål
                  </label>
                  <textarea
                    name="otherFeatures"
                    value={formData.otherFeatures}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-limegreen focus:outline-none transition-colors resize-none"
                    placeholder="Beskriv eventuella specialfunktioner..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Timeline & additional info */}
          {currentStep === 5 && (
            <div className="bg-gray-800/50 border border-limegreen/30 rounded-lg p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-limegreen/20 rounded-full flex items-center justify-center">
                  <Target size={16} className="text-limegreen sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 font-vt323">
                  Tidplan & övrigt
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-1.5 sm:mb-2">Önskad deadline</label>
                  <input
                    type="text"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-limegreen focus:outline-none transition-colors"
                    placeholder="T.ex. inom 2 månader, före årsskiftet..."
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm sm:text-base mb-1.5 sm:mb-2">
                    Övrig information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-limegreen focus:outline-none transition-colors resize-none"
                    placeholder="Något annat du vill berätta? Frågor, funderingar, speciella omständigheter..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
              >
                ← Tillbaka
              </button>
            ) : (
              <Link
                href="/"
                className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
              >
                ← Avbryt
              </Link>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-gradient-to-r from-limegreen to-cyan-400 text-black font-bold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:from-cyan-400 hover:to-limegreen transition-all"
              >
                Nästa →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-limegreen to-cyan-400 text-black font-bold px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:from-cyan-400 hover:to-limegreen transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Skickar..."
                ) : (
                  <>
                    <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Skicka brief
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          All information behandlas konfidentiellt och används endast för att ta fram en offert.
        </p>
      </div>
    </div>
  );
}
