import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integritetspolicy – PixelPioneer",
  description: "Information om hur PixelPioneer hanterar data och analys.",
};

export default function IntegritetspolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-[#C026D3] hover:text-[#E879F9] transition-colors text-lg mb-8 inline-block"
          style={{ fontFamily: 'VT323, monospace' }}
        >
          ← Tillbaka till startsidan
        </Link>

        <h1 className="text-4xl sm:text-5xl text-[#C026D3] mb-8" style={{ fontFamily: 'Delta Block, sans-serif' }}>
          Integritetspolicy
        </h1>

        <div className="text-lg sm:text-xl space-y-6 text-gray-300" style={{ fontFamily: 'VT323, monospace' }}>
          <p>
            <strong className="text-white">Senast uppdaterad:</strong> 30
            november 2025
          </p>

          <section>
            <h2 className="text-2xl text-[#7B2FD1] mb-3 font-bold" style={{ fontFamily: 'Delta Block, sans-serif' }}>
              Anonym statistik
            </h2>
            <p>
              Jag använder Vercel Analytics för att samla in anonym statistik om
              hur besökare använder webbplatsen. Detta hjälper mig att
              förbättra användarupplevelsen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#7B2FD1] mb-3 font-bold" style={{ fontFamily: 'Delta Block, sans-serif' }}>
              Vad samlas in?
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Sidvisningar (vilka sidor som besöks)</li>
              <li>Ungefärlig geografisk plats (land/region)</li>
              <li>Webbläsare och enhet</li>
              <li>Varifrån besökaren kom (referrer)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#7B2FD1] mb-3 font-bold" style={{ fontFamily: 'Delta Block, sans-serif' }}>
              Vad samlas INTE in?
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>IP-adresser</li>
              <li>Personlig identifierbar information</li>
              <li>Cookies för spårning</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#7B2FD1] mb-3 font-bold" style={{ fontFamily: 'Delta Block, sans-serif' }}>
              Kontaktformulär
            </h2>
            <p>
              När du skickar in en projektförfrågan via formuläret sparas
              dina uppgifter (namn, e-post, företag och projektdetaljer) för att
              jag ska kunna kontakta dig. Jag delar aldrig dina uppgifter med
              tredje part.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#7B2FD1] mb-3 font-bold" style={{ fontFamily: 'Delta Block, sans-serif' }}>
              Kontakt
            </h2>
            <p>
              Har du frågor om hur jag hanterar data? Kontakta mig på{" "}
              <a
                href="mailto:hej@pixelpioneer.se"
                className="text-[#C026D3] hover:text-[#E879F9] transition-colors"
              >
                hej@pixelpioneer.se
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
