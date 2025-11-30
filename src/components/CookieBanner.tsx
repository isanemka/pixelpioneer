"use client";

import { useState, useEffect, useCallback } from "react";

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
    <div className="z-20 fixed bottom-0 left-0 w-full bg-[#1a1a2e] border-t-2 border-[#00ff88] text-white p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="font-vt323 text-lg text-gray-300 text-center md:text-left">
        🍪 Vi använder anonym statistik för att förbättra sidan. Ingen personlig
        data sparas.{" "}
        <a
          href="/integritetspolicy"
          className="text-[#00ff88] hover:underline"
        >
          Läs mer
        </a>
      </p>
      <div className="flex gap-3">
        <button
          onClick={declineCookies}
          className="font-vt323 text-lg px-4 py-2 border-2 border-gray-500 text-gray-300 hover:border-[#00ff88] hover:text-[#00ff88] transition-colors cursor-pointer"
        >
          Avböj
        </button>
        <button
          onClick={acceptCookies}
          className="font-vt323 text-lg px-4 py-2 bg-[#00ff88] text-[#1a1a2e] hover:bg-[#00cc6a] transition-colors cursor-pointer"
        >
          Godkänn
        </button>
      </div>
    </div>
  );
}
