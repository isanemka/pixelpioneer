# PixelPioneer

En modern webbplats för småföretag byggd med Next.js, TypeScript och Tailwind CSS.

## Teknologi

- **Next.js 16** - React-ramverk med App Router
- **TypeScript** - Typsäker JavaScript
- **Tailwind CSS** - Utility-first CSS-ramverk
- **Lucide React** - Ikoner
- **Vercel Analytics** - Webbanalys

## Komma igång

### Installation

```bash
npm install
```

### Utveckling

```bash
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

### Bygga för produktion

```bash
npm run build
```

### Starta produktionsserver

```bash
npm start
```

## Projektstruktur

```
src/
├── app/
│   ├── globals.css      # Globala stilar och Tailwind-konfiguration
│   ├── layout.tsx       # Root-layout med metadata
│   └── page.tsx         # Huvudsidan
├── components/
│   ├── Header.tsx       # Navigation och logotyp
│   ├── SpaceScene.tsx   # Animerad rymdscen med stjärnor och raket
│   ├── About.tsx        # Om-sektion med tjänster
│   ├── CTA.tsx          # Call-to-action
│   ├── Separator.tsx    # Animerad separator
│   ├── Approach.tsx     # Arbetssätt och fördelar
│   ├── Contact.tsx      # Kontaktinformation
│   ├── Footer.tsx       # Sidfot
│   └── CookieBanner.tsx # Cookie-samtycke
public/
├── images/              # Bilder
└── fonts/               # Anpassade typsnitt
```

## Deploy

Projektet är optimerat för deploy på [Vercel](https://vercel.com).

## Licens

Privat projekt - © PixelPioneer
