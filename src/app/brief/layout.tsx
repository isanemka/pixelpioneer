import type { Metadata } from "next";

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
  return <>{children}</>;
}
