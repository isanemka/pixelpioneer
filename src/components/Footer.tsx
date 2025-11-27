"use client";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-black via-gray-900 to-black text-gray-300 text-center py-8 overflow-hidden">
      {/* Copyright & Branding */}
      <p className="text-xl mt-6 font-vt323 text-limegreen">
        © {new Date().getFullYear()} PixelPioneer - Webbsidor som gör skillnad
      </p>
    </footer>
  );
}
