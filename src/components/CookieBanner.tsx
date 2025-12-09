"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

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
      className="z-50 fixed bottom-0 left-0 w-full bg-darkGray border-t-2 border-accentNeon text-white p-4 flex flex-col md:flex-row justify-between items-center gap-4"
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      <p className="text-base text-textSecondary text-center md:text-left">
        🍪 Vi använder anonym statistik för att förbättra sidan. Ingen personlig
        data sparas.{" "}
        <Link
          href="/integritetspolicy"
          className="text-accentNeon hover:underline focus:outline-none focus:ring-2 focus:ring-accentNeon"
        >
          Läs mer
        </Link>
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={declineCookies}
          className="font-press-start-2p text-xs px-4 py-2 border-2 border-mediumGray text-textSecondary hover:border-accentNeon hover:text-accentNeon transition-colors focus:outline-none focus:ring-2 focus:ring-accentNeon"
        >
          Avböj
        </button>
        <button
          type="button"
          onClick={acceptCookies}
          className="font-press-start-2p text-xs px-4 py-2 bg-accentNeon text-darkBg hover:bg-accentMagenta transition-colors focus:outline-none focus:ring-2 focus:ring-accentNeon"
        >
          Godkänn
        </button>
      </div>
    </div>
  );
}
