"use client";

import { Mail, Phone, Gift, FileText } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-16 font-vt323 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-limegreen via-transparent to-cyan-400"></div>
        <div className="absolute top-20 left-20 w-32 h-32 border border-limegreen rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-cyan-400 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-limegreen">
          FÅ EN KOSTNADSFRI OFFERT
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto px-4">
          Redo att ta steget? Kontakta mig så får du en skräddarsydd offert inom
          48 timmar.
        </p>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="bg-gray-800 border-2 border-limegreen p-8 rounded shadow-lg">
            <h3 className="text-3xl text-cyan-400 mb-8">TA KONTAKT</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Email */}
              <div className="text-center">
                <div className="w-16 h-16 bg-limegreen rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={32} className="text-black" />
                </div>
                <h4 className="text-2xl text-cyan-400 mb-2">E-post</h4>
                <a
                  href="mailto:hej@pixelpioneer.se"
                  className="text-limegreen hover:text-cyan-400 transition-colors text-xl"
                >
                  hej(at)pixelpioneer.se
                </a>
              </div>

              {/* Phone */}
              <div className="text-center">
                <div className="w-16 h-16 bg-limegreen rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone size={32} className="text-black" />
                </div>
                <h4 className="text-2xl text-cyan-400 mb-2">Telefon</h4>
                <a
                  href="tel:+46734644604"
                  className="text-limegreen hover:text-cyan-400 transition-colors text-xl"
                >
                  0734-64 46 04
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-600">
              {/* Brief form link */}
              <div className="mb-6">
                <Link
                  href="/brief"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-limegreen to-cyan-400 text-black font-bold px-8 py-4 rounded-lg hover:from-cyan-400 hover:to-limegreen transition-all duration-300 text-xl shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FileText size={24} />
                  Fyll i projektbrief
                </Link>
                <p className="text-gray-400 text-base mt-3">
                  Berätta om ditt projekt så tar jag fram en skräddarsydd offert
                </p>
              </div>

              <div className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Gift size={20} className="text-limegreen mr-2" />
                  <span className="text-limegreen font-bold">
                    KOSTNADSFRI KONSULTATION
                  </span>
                </div>
                <p className="text-gray-300 text-base md:text-lg text-center">
                  Ring eller maila för ett första samtal om ditt projekt - helt
                  utan kostnad!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
