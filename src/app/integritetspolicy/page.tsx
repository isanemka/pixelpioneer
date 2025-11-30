import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integritetspolicy – PixelPioneer",
  description: "Information om hur PixelPioneer hanterar data och analys.",
};

export default function IntegritetspolicyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a1a] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="font-vt323 text-[#00ff88] hover:underline text-lg mb-8 inline-block"
        >
          ← Tillbaka till startsidan
        </Link>

        <h1 className="font-press-start text-2xl sm:text-3xl text-[#00ff88] mb-8">
          Integritetspolicy
        </h1>

        <div className="font-vt323 text-lg sm:text-xl space-y-6 text-gray-300">
          <p>
            <strong className="text-white">Senast uppdaterad:</strong> 30
            november 2025
          </p>

          <section>
            <h2 className="font-press-start text-sm text-[#00ff88] mb-3">
              Anonym statistik
            </h2>
            <p>
              Vi använder Vercel Analytics för att samla in anonym statistik om
              hur besökare använder vår webbplats. Detta hjälper oss att
              förbättra användarupplevelsen.
            </p>
          </section>

          <section>
            <h2 className="font-press-start text-sm text-[#00ff88] mb-3">
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
            <h2 className="font-press-start text-sm text-[#00ff88] mb-3">
              Vad samlas INTE in?
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>IP-adresser</li>
              <li>Personlig identifierbar information</li>
              <li>Cookies för spårning</li>
            </ul>
          </section>

          <section>
            <h2 className="font-press-start text-sm text-[#00ff88] mb-3">
              Kontaktformulär
            </h2>
            <p>
              När du skickar in en projektförfrågan via vårt formulär sparas
              dina uppgifter (namn, e-post, företag och projektdetaljer) för att
              vi ska kunna kontakta dig. Vi delar aldrig dina uppgifter med
              tredje part.
            </p>
          </section>

          <section>
            <h2 className="font-press-start text-sm text-[#00ff88] mb-3">
              Kontakt
            </h2>
            <p>
              Har du frågor om hur vi hanterar data? Kontakta oss på{" "}
              <a
                href="mailto:hej@pixelpioneer.se"
                className="text-[#00ff88] hover:underline"
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
