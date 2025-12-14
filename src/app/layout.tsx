import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PixelPioneer – Från pixel till plattform",
  description:
    "PixelPioneer hjälper småföretag att växa online med snabba, säkra och affärsdrivande webblösningar. Boka kostnadsfri konsultation.",
  keywords: ["webbutveckling", "hemsida", "småföretag", "SEO", "webbdesign"],
  authors: [{ name: "PixelPioneer" }],
  robots: "index,follow",
  openGraph: {
    type: "website",
    title: "PixelPioneer – Från pixel till plattform",
    description:
      "Snabba, säkra och affärsdrivande webblösningar som ger fler kunder. Kostnadsfri konsultation.",
    images: ["/images/PixelAssistant.png"],
    locale: "sv_SE",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelPioneer – Från pixel till plattform",
    description:
      "Snabba, säkra och affärsdrivande webblösningar som ger fler kunder.",
    images: ["/images/PixelAssistant.png"],
  },
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body
        className={`${pressStart2P.variable} ${vt323.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
