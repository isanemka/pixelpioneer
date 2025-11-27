"use client";

import { useState, useEffect } from "react";
import { Send, CheckCircle, Rocket, Globe, Palette, Target, AlertCircle } from "lucide-react";
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
  deadline: string;
  
  // Design
  designStyle: string;
  inspirationSites: string;
}

const initialFormData: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: [],
  description: "",
  deadline: "",
  designStyle: "",
  inspirationSites: "",
};

const STORAGE_KEY = "pixelpioneer-brief-form";

const projectTypes = [
  "Ny hemsida",
  "Uppdatering av befintlig sida",
  "Redesign",
  "Landningssida",
  "Portfolio",
  "Annat",
];

export default function BriefPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const totalSteps = 3;

  // Load saved form data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save form data to localStorage on change
  useEffect(() => {
    if (formData !== initialFormData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  // Clear localStorage on successful submission
  const clearSavedData = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors([]);
  };

  const handleCheckboxChange = (field: "projectType", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
    setValidationErrors([]);
  };

  // Validation for each step
  const validateStep = (step: number): string[] => {
    const errors: string[] = [];
    
    switch (step) {
      case 1:
        if (!formData.name.trim()) errors.push("Namn är obligatoriskt");
        if (!formData.email.trim()) errors.push("E-post är obligatoriskt");
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.push("Ange en giltig e-postadress");
        }
        break;
      case 2:
        if (!formData.description.trim()) errors.push("Projektbeskrivning är obligatoriskt");
        break;
    }
    
    return errors;
  };

  // Check if form can be submitted (all required fields filled)
  const canSubmit = (): boolean => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.description.trim() !== ""
    );
  };

  const handleSubmit = async () => {
    if (!canSubmit()) {
      setSubmitError("Vänligen fyll i alla obligatoriska fält (namn, e-post, projektbeskrivning)");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/send-brief", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Något gick fel");
      }

      clearSavedData();
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to send brief:", error);
      
      let errorMessage = "Något gick fel vid skickandet. Vänligen försök igen eller kontakta mig direkt på hej@pixelpioneer.se";
      if (error instanceof Error && error.message && error.message !== "Något gick fel") {
        errorMessage = error.message;
      }
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    const errors = validateStep(currentStep);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors([]);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };
  
  const prevStep = () => {
    setValidationErrors([]);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4 py-8 font-vt323">
        <div className="text-center max-w-sm w-full">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-limegreen rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-gray-900 sm:w-8 sm:h-8" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-limegreen font-vt323 mb-3">
            Tack för din förfrågan!
          </h1>
          <p className="text-gray-300 text-sm sm:text-base mb-4">
            Jag har tagit emot din förfrågan och återkommer inom 48 timmar. Kolla din e-post för en bekräftelse!
          </p>
          <p className="text-gray-400 text-sm sm:text-base mb-6">
            Har du frågor? Kontakta mig på{" "}
            <a href="mailto:hej@pixelpioneer.se" className="text-cyan-400 underline">
              hej@pixelpioneer.se
            </a>
          </p>
          <Link
            href="/"
            className="inline-block bg-limegreen text-black font-bold px-5 py-2.5 text-sm sm:text-base rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Tillbaka till startsidan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 py-6 sm:py-8 md:py-12 px-4 sm:px-6 font-vt323">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-5 sm:mb-8">
          <Link href="/" className="inline-block mb-2 sm:mb-4">
            <Rocket size={28} className="text-limegreen mx-auto sm:w-8 sm:h-8" />
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-limegreen font-vt323 mb-1.5 sm:mb-2">
            Offertförfrågan
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xs mx-auto">
            Tar 2 min – jag hör av mig inom 48h
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-1">
            <span>Steg {currentStep}/{totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-limegreen to-cyan-400 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Validation errors */}
        {validationErrors.length > 0 && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-start gap-2 mb-4">
            <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={16} />
            <ul className="text-red-300 text-sm space-y-0.5">
              {validationErrors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit error */}
        {submitError && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-start gap-2 mb-4">
            <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={16} />
            <p className="text-red-300 text-sm">{submitError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 sm:space-y-6">
          {/* Step 1: Contact details */}
          {currentStep === 1 && (
            <div className="bg-gray-800/50 border border-limegreen/30 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-limegreen/20 rounded-full flex items-center justify-center shrink-0">
                  <Target size={14} className="text-limegreen" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-cyan-400 font-vt323">
                  Kontaktuppgifter
                </h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    Namn <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 text-base text-white focus:border-limegreen focus:outline-none"
                    placeholder="Ditt namn"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    E-post <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 text-base text-white focus:border-limegreen focus:outline-none"
                    placeholder="din@epost.se"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Företag</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 text-base text-white focus:border-limegreen focus:outline-none"
                      placeholder="Valfritt"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 text-base text-white focus:border-limegreen focus:outline-none"
                      placeholder="Valfritt"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: About the project */}
          {currentStep === 2 && (
            <div className="bg-gray-800/50 border border-limegreen/30 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-limegreen/20 rounded-full flex items-center justify-center shrink-0">
                  <Globe size={14} className="text-limegreen" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-cyan-400 font-vt323">
                  Ditt projekt
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Typ av projekt</label>
                  <div className="grid grid-cols-2 gap-2">
                    {projectTypes.map((type) => (
                      <label
                        key={type}
                        className={`flex items-center justify-center py-2.5 px-2 rounded-lg border cursor-pointer transition-colors text-center ${formData.projectType.includes(type) ? "bg-limegreen/20 border-limegreen text-limegreen" : "bg-gray-700 border-gray-600 text-gray-300"}`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.projectType.includes(type)}
                          onChange={() => handleCheckboxChange("projectType", type)}
                          className="sr-only"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    Beskriv projektet <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 text-base text-white focus:border-limegreen focus:outline-none resize-none"
                    placeholder="Vad behöver du hjälp med?"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-1">Deadline</label>
                  <input
                    type="text"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 text-base text-white focus:border-limegreen focus:outline-none"
                    placeholder="T.ex. inom 2 månader"
                  />
                </div>
              </div>
            </div>
          )}
          {/* Step 3: Design style */}
          {currentStep === 3 && (
            <div className="bg-gray-800/50 border border-limegreen/30 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-limegreen/20 rounded-full flex items-center justify-center shrink-0">
                  <Palette size={14} className="text-limegreen" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-cyan-400 font-vt323">
                  Vilken känsla?
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Önskad stil/känsla</label>
                  <input
                    type="text"
                    name="designStyle"
                    value={formData.designStyle}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 text-base text-white focus:border-limegreen focus:outline-none"
                    placeholder="Modern, minimalistisk, lekfull..."
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    Inspiration (valfritt)
                  </label>
                  <textarea
                    name="inspirationSites"
                    value={formData.inspirationSites}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 text-base text-white focus:border-limegreen focus:outline-none resize-none"
                    placeholder="Länka till hemsidor du gillar..."
                  />
                </div>

                <div className="bg-gray-700/40 rounded-lg p-3">
                  <p className="text-gray-300 text-sm">
                    <strong>Osäker?</strong> Vi går igenom allt på mötet.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-2">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← Tillbaka
              </button>
            ) : (
              <Link
                href="/"
                className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← Avbryt
              </Link>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-gradient-to-r from-limegreen to-cyan-400 text-black font-bold px-6 py-2.5 text-sm rounded-lg hover:from-cyan-400 hover:to-limegreen transition-all"
              >
                Nästa →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !canSubmit()}
                className={`bg-gradient-to-r from-limegreen to-cyan-400 text-black font-bold px-5 py-2.5 text-sm rounded-lg transition-all flex items-center gap-1.5 ${isSubmitting || !canSubmit() ? "opacity-50 cursor-not-allowed" : "hover:from-cyan-400 hover:to-limegreen"}`}
              >
                {isSubmitting ? (
                  "Skickar..."
                ) : (
                  <>
                    <Send size={14} />
                    Skicka
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-5">
          Genom att skicka godkänner du att jag sparar dina uppgifter för att kunna återkomma med en offert.
        </p>
      </div>
    </div>
  );
}
