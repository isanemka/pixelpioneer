"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-darkBg/90 backdrop-blur-sm text-white p-3 border-b border-mediumGray z-50">
      <nav className="section-container flex justify-between items-center">
        <Image
          src="/images/logo-white.png"
          alt="PixelPioneer logo"
          width={64}
          height={64}
          className="w-10 h-10 md:w-12 md:h-12"
        />
        <ul className="flex space-x-4 md:space-x-6 font-press-start-2p text-xs md:text-sm">
          <li>
            <a 
              href="#projects" 
              className="hover:text-accentNeon transition-colors focus:outline-none focus:text-accentNeon"
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className="hover:text-accentNeon transition-colors focus:outline-none focus:text-accentNeon"
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className="hover:text-accentNeon transition-colors focus:outline-none focus:text-accentNeon"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
