"use client";

import Link from "next/link";

export default function Footer() {
  const resetCookieConsent = () => {
    localStorage.removeItem("cookiesAccepted");
    window.location.reload();
  };

  return (
    <footer className="relative bg-linear-to-t from-black via-slate-900 to-slate-950 text-gray-300 text-center py-8 overflow-hidden border-t border-[#4F01A4]/20">
      {/* Links */}
      <div className="flex justify-center gap-4 text-lg mb-4" style={{ fontFamily: 'VT323, monospace' }}>
        <Link
          href="/privacy-policy"
          className="text-gray-400 hover:text-[#C026D3] transition-colors"
        >
          Integritetspolicy
        </Link>
        <span className="text-gray-600">|</span>
        <button
          type="button"
          onClick={resetCookieConsent}
          className="text-gray-400 hover:text-[#C026D3] transition-colors"
        >
          Ändra cookie-val
        </button>
      </div>
      {/* Copyright & Branding */}
      <p className="text-xl text-[#7B2FD1]" style={{ fontFamily: 'VT323, monospace' }}>
        © {new Date().getFullYear()} PixelPioneer - Från pixel till plattform
      </p>
    </footer>
  );
}
