"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="header-overlay text-white px-4 py-3">
      <nav className="container mx-auto flex justify-between items-center">
        <Image
          src="/images/logo-white.png"
          alt="PixelPioneer logo"
          width={64}
          height={64}
          className="w-8 h-8 md:w-12 md:h-12"
        />
        <ul className="flex space-x-4 text-lg md:text-2xl font-vt323">
          <li>
            <a href="#services" className="hover:text-cyan-300 transition-colors">
              Tjänster
            </a>
          </li>
          <li>
            <a href="#approach" className="hover:text-cyan-300 transition-colors">
              Process &amp; Fördelar
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">
              Få Offert
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
