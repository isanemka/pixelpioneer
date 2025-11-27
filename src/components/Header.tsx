"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-darkbg text-white p-3">
      <nav className="container mx-auto flex justify-between items-center">
        <Image
          src="/images/rocket_with_stars.png"
          alt="Rocket with stars"
          width={64}
          height={64}
          className="w-8 h-8 md:w-16 md:h-16 mt-1"
        />
        <ul className="flex space-x-4 text-lg md:text-2xl font-vt323">
          <li>
            <a href="#services" className="hover:text-indigo-400">
              Tjänster
            </a>
          </li>
          <li>
            <a href="#approach" className="hover:text-indigo-400">
              Process &amp; Fördelar
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-indigo-400">
              Få Offert
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
