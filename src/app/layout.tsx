import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelPioneer – Modern Web Development",
  description:
    "Modern pixel experiences with a sharp, minimal edge. Fast, accessible web solutions built with precision.",
  keywords: ["webbutveckling", "hemsida", "småföretag", "SEO", "webbdesign", "web development", "pixel art"],
  authors: [{ name: "PixelPioneer" }],
  robots: "index,follow",
  openGraph: {
    type: "website",
    title: "PixelPioneer – Modern Web Development",
    description:
      "Modern pixel experiences with a sharp, minimal edge. Fast, accessible web solutions.",
    images: ["/images/PixelAssistant.png"],
    locale: "sv_SE",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelPioneer – Modern Web Development",
    description:
      "Modern pixel experiences with a sharp, minimal edge.",
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
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
