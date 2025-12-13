"use client";

import { useState, useEffect } from "react";
import { Send, CheckCircle, Rocket, Globe, Palette, Target, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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
  "Företagswebbplats",
  "SaaS-plattform",
  "Portfolio",
  "Landningssida",
  "Redesign",
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-sm w-full"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-[#C026D3] rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle size={28} className="text-white sm:w-8 sm:h-8" />
          </motion.div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#C026D3] mb-3" style={{ fontFamily: 'Delta Block, sans-serif' }}>
            Tack för din förfrågan!
          </h1>
          <p className="text-gray-300 text-sm sm:text-base mb-4" style={{ fontFamily: 'VT323, monospace' }}>
            Jag har tagit emot din förfrågan och återkommer inom 48 timmar. Kolla din e-post för en bekräftelse!
          </p>
          <p className="text-gray-400 text-sm sm:text-base mb-6" style={{ fontFamily: 'VT323, monospace' }}>
            Har du frågor? Kontakta mig på{" "}
            <a href="mailto:hej@pixelpioneer.se" className="text-[#7B2FD1] underline hover:text-[#C026D3]">
              hej@pixelpioneer.se
            </a>
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-[#4F01A4] to-[#7B2FD1] text-white font-bold px-5 py-2.5 text-sm sm:text-base rounded-lg hover:shadow-lg hover:shadow-[#4F01A4]/50 transition-shadow"
            style={{ fontFamily: 'Delta Block, sans-serif' }}
          >
            Tillbaka till startsidan
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-6 sm:py-8 md:py-12 px-4 sm:px-6" style={{ fontFamily: 'VT323, monospace' }}>
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5 sm:mb-8"
        >
          <Link href="/" className="inline-block mb-2 sm:mb-4 group">
            <Rocket size={28} className="text-[#C026D3] mx-auto sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#C026D3] mb-1.5 sm:mb-2" style={{ fontFamily: 'Delta Block, sans-serif' }}>
            Offertförfrågan
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xs mx-auto">
            Tar 2 min – jag hör av mig inom 48h
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <div className="flex justify-between text-sm sm:text-base text-gray-500 mb-1">
            <span>Steg {currentStep}/{totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-linear-to-r from-[#7B2FD1] to-[#C026D3]"
            />
          </div>
        </motion.div>

        {/* Validation errors */}
        {validationErrors.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-start gap-2 mb-4"
          >
            <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
            <ul className="text-red-300 text-base space-y-0.5">
              {validationErrors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Submit error */}
        {submitError && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-start gap-2 mb-4"
          >
            <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
            <p className="text-red-300 text-base">{submitError}</p>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 sm:space-y-6">
          {/* Step 1: Contact details */}
          {currentStep === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-900/70 backdrop-blur-sm border border-[#4F01A4]/30 hover:border-[#7B2FD1]/50 transition-colors rounded-xl p-4 sm:p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-[#C026D3]/20 rounded-full flex items-center justify-center shrink-0">
                  <Target size={14} className="text-[#C026D3]" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#7B2FD1]" style={{ fontFamily: 'Delta Block, sans-serif' }}>
                  Kontaktuppgifter
                </h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-300 text-base mb-1">
                    Namn <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-3 text-lg text-white focus:border-[#C026D3] focus:outline-none focus:ring-2 focus:ring-[#C026D3]/20 transition-all"
                    placeholder="Ditt namn"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-base mb-1">
                    E-post <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-3 text-lg text-white focus:border-[#C026D3] focus:outline-none focus:ring-2 focus:ring-[#C026D3]/20 transition-all"
                    placeholder="din@epost.se"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-300 text-base mb-1">Företag</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-3 text-lg text-white focus:border-[#C026D3] focus:outline-none focus:ring-2 focus:ring-[#C026D3]/20 transition-all"
                      placeholder="Valfritt"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-base mb-1">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-3 text-lg text-white focus:border-[#C026D3] focus:outline-none focus:ring-2 focus:ring-[#C026D3]/20 transition-all"
                      placeholder="Valfritt"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: About the project */}
          {currentStep === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-900/70 backdrop-blur-sm border border-[#4F01A4]/30 hover:border-[#7B2FD1]/50 transition-colors rounded-xl p-4 sm:p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-[#C026D3]/20 rounded-full flex items-center justify-center shrink-0">
                  <Globe size={14} className="text-[#C026D3]" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#7B2FD1]" style={{ fontFamily: 'Delta Block, sans-serif' }}>
                  Ditt projekt
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-gray-300 text-base mb-2">Typ av projekt</label>
                  <div className="grid grid-cols-2 gap-2">
                    {projectTypes.map((type) => (
                      <label
                        key={type}
                        className={`flex items-center justify-center py-2.5 px-2 rounded-lg border cursor-pointer transition-all text-center ${formData.projectType.includes(type) ? "bg-[#C026D3]/20 border-[#C026D3] text-[#C026D3]" : "bg-slate-800/50 border-slate-700 text-gray-300 hover:border-[#7B2FD1]/30"}`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.projectType.includes(type)}
                          onChange={() => handleCheckboxChange("projectType", type)}
                          className="sr-only"
                        />
                        <span className="text-base">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-base mb-1">
                    Beskriv projektet <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-3 text-lg text-white focus:border-[#C026D3] focus:outline-none focus:ring-2 focus:ring-[#C026D3]/20 transition-all resize-none"
                    placeholder="Vad behöver du hjälp med?"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-base mb-1">Deadline</label>
                  <input
                    type="text"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-3 text-lg text-white focus:border-[#C026D3] focus:outline-none focus:ring-2 focus:ring-[#C026D3]/20 transition-all"
                    placeholder="T.ex. inom 2 månader"
                  />
                </div>
              </div>
            </motion.div>
          )}
          {/* Step 3: Design style */}
          {currentStep === 3 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-900/70 backdrop-blur-sm border border-[#4F01A4]/30 hover:border-[#7B2FD1]/50 transition-colors rounded-xl p-4 sm:p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-[#C026D3]/20 rounded-full flex items-center justify-center shrink-0">
                  <Palette size={14} className="text-[#C026D3]" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#7B2FD1]" style={{ fontFamily: 'Delta Block, sans-serif' }}>
                  Vilken känsla?
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-gray-300 text-base mb-1">Önskad stil/känsla</label>
                  <input
                    type="text"
                    name="designStyle"
                    value={formData.designStyle}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-3 text-lg text-white focus:border-[#C026D3] focus:outline-none focus:ring-2 focus:ring-[#C026D3]/20 transition-all"
                    placeholder="Modern, minimalistisk, lekfull..."
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-base mb-1">
                    Inspiration (valfritt)
                  </label>
                  <textarea
                    name="inspirationSites"
                    value={formData.inspirationSites}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-3 text-lg text-white focus:border-[#C026D3] focus:outline-none focus:ring-2 focus:ring-[#C026D3]/20 transition-all resize-none"
                    placeholder="Länka till hemsidor du gillar..."
                  />
                </div>

                <div className="bg-[#4F01A4]/10 border border-[#7B2FD1]/20 rounded-lg p-3">
                  <p className="text-gray-300 text-base">
                    <strong>Osäker?</strong> Vi går igenom allt på mötet.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-2">
            {currentStep > 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={prevStep}
                className="px-3 py-2 text-base text-gray-400 hover:text-[#C026D3] transition-colors"
              >
                ← Tillbaka
              </motion.button>
            ) : (
              <Link
                href="/"
                className="px-3 py-2 text-base text-gray-400 hover:text-[#C026D3] transition-colors"
              >
                ← Avbryt
              </Link>
            )}

            {currentStep < totalSteps ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={nextStep}
                className="bg-linear-to-r from-[#4F01A4] to-[#7B2FD1] text-white font-bold px-6 py-2.5 text-sm rounded-lg hover:shadow-lg hover:shadow-[#4F01A4]/50 transition-all"
                style={{ fontFamily: 'Delta Block, sans-serif' }}
              >
                Nästa →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: canSubmit() && !isSubmitting ? 1.05 : 1 }}
                whileTap={{ scale: canSubmit() && !isSubmitting ? 0.95 : 1 }}
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !canSubmit()}
                className={`bg-linear-to-r from-[#4F01A4] to-[#7B2FD1] text-white font-bold px-5 py-2.5 text-sm rounded-lg transition-all flex items-center gap-1.5 ${isSubmitting || !canSubmit() ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:shadow-[#4F01A4]/50"}`}
                style={{ fontFamily: 'Delta Block, sans-serif' }}
              >
                {isSubmitting ? (
                  "Skickar..."
                ) : (
                  <>
                    <Send size={14} />
                    Skicka
                  </>
                )}
              </motion.button>
            )}
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-5">
          Genom att skicka godkänner du att jag sparar dina uppgifter för att kunna återkomma med en offert.
        </p>
      </div>
    </div>
  );
}
