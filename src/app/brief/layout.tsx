import type { Metadata } from "next";
import { VT323 } from "next/font/google";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Projektformulär – PixelPioneer",
  description:
    "Fyll i formuläret så får jag en bild av vad du behöver till din nya webbsida. Få kostnadsfri offert inom 48 timmar.",
  robots: "noindex, nofollow",
};

export default function BriefLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={vt323.variable}>{children}</div>;
}
