# Mahdeen Reza — Portfolio Website

Personal portfolio website showcasing systems governance, AI, SaaS management, and compliance work.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **Animations:** motion v12+
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
│   ├── layout.tsx           # Root layout (fonts, Navbar, Footer, ProjectsOverlayProvider)
│   ├── page.tsx             # Homepage (preloader, hero, projects, skills, about)
│   └── projects/
│       ├── [slug]/page.tsx  # Case study pages (4 projects)
│       └── saas-renewal-operations/workflow/page.tsx  # Process map
├── components/              # React components (one per file)
│   ├── Navbar.tsx
│   ├── Preloader.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectsOverlay.tsx
│   ├── Skills.tsx
│   ├── About.tsx
│   ├── Footer.tsx
│   ├── CaseStudySidebar.tsx
│   ├── StickyHeader.tsx
│   ├── ImageLightbox.tsx
│   └── Markdown.tsx
├── context/
│   └── ProjectsOverlayContext.tsx  # Overlay panel state
└── lib/
    ├── fonts.ts             # next/font/local configuration
    ├── projects.ts          # Project metadata (single source of truth)
    ├── animations.ts        # Shared motion animation variants
    └── usePreloaderDone.ts  # Preloader→Hero coordination (pub/sub)
```

## Design System

- **Colors:** Cream (#FAF9F6), Cream-Dark (#D5CEC2), Warm Sand (#DBD6C9), Sand Light (#E5E1D5), Dark (#1A1A1A), Warm (#EDE9DF), Terracotta (#B5654A), Charcoal (#3D3D3A), Muted (#6B6B6B)
- **Fonts:** Clash Display (headings) + Switzer (body/UI)
- **Radius:** Cards 12px, Buttons 8px, Tags 6px

## Domain

mahdeenreza.com (Cloudflare DNS → Vercel)
