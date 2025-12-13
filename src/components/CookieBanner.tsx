"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState<boolean | null>(null);

  const checkCookieConsent = useCallback(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    return !cookiesAccepted;
  }, []);

  useEffect(() => {
    // Run on next tick to avoid synchronous setState in effect
    const timer = setTimeout(() => {
      setShowBanner(checkCookieConsent());
    }, 0);
    return () => clearTimeout(timer);
  }, [checkCookieConsent]);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cookies:accepted"));
    }
  };

  const declineCookies = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className="z-20 fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-sm border-t-2 border-[#4F01A4] text-white p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg shadow-[#4F01A4]/20"
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      <p className="text-base sm:text-lg text-gray-300 text-center md:text-left flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2" style={{ fontFamily: 'VT323, monospace' }}>
        <span className="flex items-center gap-2">
          <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-[#C026D3] flex-shrink-0" />
          Vi använder anonym statistik för att förbättra sidan.
        </span>
        <Link
          href="/privacy-policy"
          className="text-[#C026D3] hover:underline whitespace-nowrap"
        >
          Läs mer
        </Link>
      </p>
      <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
        <button
          type="button"
          onClick={declineCookies}
          className="text-base sm:text-lg px-3 sm:px-4 py-2 border-2 border-gray-500 text-gray-300 hover:border-[#C026D3] hover:text-[#C026D3] transition-colors cursor-pointer flex-1 sm:flex-initial"
          style={{ fontFamily: 'VT323, monospace' }}
        >
          Avböj
        </button>
        <button
          type="button"
          onClick={acceptCookies}
          className="text-base sm:text-lg px-3 sm:px-4 py-2 bg-gradient-to-r from-[#4F01A4] to-[#7B2FD1] text-white hover:opacity-90 transition-opacity cursor-pointer flex-1 sm:flex-initial"
          style={{ fontFamily: 'VT323, monospace' }}
        >
          Godkänn
        </button>
      </div>
    </div>
  );
}
