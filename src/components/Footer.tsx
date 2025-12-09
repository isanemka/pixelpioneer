"use client";

import Link from "next/link";

export default function Footer() {
  const resetCookieConsent = () => {
    localStorage.removeItem("cookiesAccepted");
    window.location.reload();
  };

  return (
    <footer className="bg-darkBg border-t border-mediumGray text-textSecondary text-center py-8">
      {/* Links */}
      <div className="flex justify-center gap-4 text-sm mb-4">
        <Link
          href="/integritetspolicy"
          className="hover:text-accentNeon transition-colors focus:outline-none focus:text-accentNeon"
        >
          Integritetspolicy
        </Link>
        <span className="text-mediumGray">|</span>
        <button
          type="button"
          onClick={resetCookieConsent}
          className="hover:text-accentNeon transition-colors focus:outline-none focus:text-accentNeon"
        >
          Ändra cookie-val
        </button>
      </div>
      {/* Copyright & Branding */}
      <p className="text-sm font-press-start-2p text-accentNeon">
        © {new Date().getFullYear()} PixelPioneer
      </p>
    </footer>
  );
}
