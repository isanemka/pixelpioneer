# PixelPioneer

A modern portfolio and business website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Technology Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Advanced animations and interactions
- **Lucide React** - Icon library
- **Vercel Analytics** - Web analytics

## Features

- **Purple Brand Identity** - Custom color palette (#4F01A4, #7B2FD1, #C026D3)
- **Smooth Animations** - Scroll-based parallax, particle explosions, and interactive elements
- **Brand Explosion Section** - Animated logo reveal with P-collision effect
- **3D Flip Cards** - Interactive project showcase
- **Fully Responsive** - Optimized for all screen sizes
- **Custom Fonts** - Delta Block for headings, VT323 for body text
- **Cookie Consent** - GDPR-compliant cookie banner
- **Contact Form** - Multi-step project brief form with localStorage persistence

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css           # Global styles and Tailwind configuration
│   ├── layout.tsx            # Root layout with metadata and fonts
│   ├── page.tsx              # Main landing page with all sections
│   ├── brief/
│   │   ├── layout.tsx        # Brief form layout with VT323 font
│   │   └── page.tsx          # 3-step project brief form
│   ├── privacy-policy/
│   │   └── page.tsx          # Privacy policy page
│   └── api/
│       └── send-brief/
│           └── route.ts      # API endpoint for form submissions
├── components/
│   ├── Footer.tsx            # Site footer with links
│   └── CookieBanner.tsx      # Cookie consent banner
public/
├── images/
│   ├── logo-white.png        # White logo for navigation
│   ├── logo_horizon.png      # Horizontal logo for brand explosion
│   ├── single_p.png          # P letter for collision animation
│   └── ...                   # Other project images
└── fonts/
    └── DeltaBlock.ttf        # Custom heading font
```

## Page Sections

### Main Page (`/`)
1. **Navigation** - Fixed navbar with scroll progress indicator
2. **Hero** - Parallax hero section with floating pixels
3. **Journey** - Process steps with click-to-explode particle effects
4. **Services** - Grid of services with tap animations
5. **Brand Explosion** - Animated P-collision revealing logo
6. **Projects** - 3D flip cards showcasing work
7. **Contact** - Contact information and CTA to brief form
8. **Footer** - Links to privacy policy and cookie settings

### Brief Form (`/brief`)
- Multi-step form (Contact → Project → Design)
- LocalStorage persistence
- Project type selection (Website, SaaS, Portfolio, etc.)
- Email submission via API route

### Privacy Policy (`/privacy-policy`)
- GDPR-compliant privacy information
- First-person narrative
- Purple theme styling

## Design System

### Colors
- Primary: `#4F01A4`
- Mid Purple: `#7B2FD1`
- Accent: `#C026D3`
- Highlight: `#E879F9`
- Background: `slate-950`, `slate-900`

### Typography
- **Headings**: Delta Block (custom font)
- **Body**: VT323 (Google Font, monospace)

### Animations
- Scroll-based parallax effects
- Particle explosion interactions
- 3D card flips
- Smooth page transitions
- Hover and tap feedback

## Deploy

This project is optimized for deployment on [Vercel](https://vercel.com).

## License

Private project - © PixelPioneer

