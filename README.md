# Mahdeen Reza — Portfolio Website

Personal portfolio website showcasing systems governance, AI, SaaS management, and compliance work.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **Animations:** motion (framer-motion v12+)
- **Fonts:** Clash Display + Switzer (self-hosted from Fontshare)
- **Language:** TypeScript
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind + @theme design tokens
│   ├── layout.tsx           # Root layout with fonts + metadata
│   ├── page.tsx             # Homepage (hero, marquee, projects, about, contact)
│   └── projects/[slug]/     # Case study pages (4 projects)
├── components/              # React components (one per file)
│   ├── Navbar.tsx
│   ├── Preloader.tsx
│   ├── Hero.tsx
│   ├── Marquee.tsx
│   ├── Projects.tsx
│   ├── ProjectCard.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ScrollReveal.tsx
└── lib/
    ├── fonts.ts             # next/font/local configuration
    ├── projects.ts          # Project metadata (single source of truth)
    └── animations.ts        # Shared motion animation variants
```

## Design System

- **Colors:** Cream (#FAF9F6), Dark (#1A1A1A), Warm (#F0EDE6), Terracotta (#B5654A), Charcoal (#3D3D3A), Muted (#6B6B6B)
- **Fonts:** Clash Display (headings) + Switzer (body/UI)
- **Radius:** Cards 12px, Buttons 8px, Tags 6px

## Domain

mahdeenreza.com (Cloudflare DNS → Vercel)
