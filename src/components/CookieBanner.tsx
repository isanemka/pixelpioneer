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
    <div className="z-20 fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-col md:flex-row justify-between items-center shadow-lg">
      <p className="text-base text-gray-300">
        Vi använder cookies för att förbättra din upplevelse. Du kan godkänna
        eller avböja.
      </p>
      <div className="mt-2 md:mt-0 flex gap-2">
        <button
          onClick={declineCookies}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm md:text-base"
        >
          Avböj
        </button>
        <button
          onClick={acceptCookies}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm md:text-base"
        >
          Godkänn
        </button>
      </div>
    </div>
  );
}
