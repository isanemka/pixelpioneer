"use client";

import Link from "next/link";

export default function Footer() {
  const resetCookieConsent = () => {
    localStorage.removeItem("cookiesAccepted");
    window.location.reload();
  };

  return (
    <footer className="relative bg-gradient-to-t from-black via-gray-900 to-black text-gray-300 text-center py-8 overflow-hidden">
      {/* Links */}
      <div className="flex justify-center gap-4 font-vt323 text-lg mb-4">
        <Link
          href="/integritetspolicy"
          className="text-gray-400 hover:text-[#00ff88] transition-colors"
        >
          Integritetspolicy
        </Link>
        <span className="text-gray-600">|</span>
        <button
          onClick={resetCookieConsent}
          className="text-gray-400 hover:text-[#00ff88] transition-colors cursor-pointer"
        >
          Ändra cookie-val
        </button>
      </div>
      {/* Copyright & Branding */}
      <p className="text-xl font-vt323 text-limegreen">
        © {new Date().getFullYear()} PixelPioneer - Webbsidor som gör skillnad
      </p>
    </footer>
  );
}
