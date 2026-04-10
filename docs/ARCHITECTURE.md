# Architecture — Portfolio Website

## Component Tree

```
RootLayout (Server Component)
├── <html> with font CSS variables (--font-clash, --font-switzer)
├── Preloader (Client) — full-screen overlay, sessionStorage-gated
├── Navbar (Client) — sticky, scroll-aware bg transition
├── {children}
│   └── HomePage (Server)
│       ├── Hero (Client) — 2-col, animated heading, photo placeholder
│       ├── Marquee (Server) — CSS-only infinite scroll
│       ├── Projects (Client) — dark bg, staggered card reveals
│       │   └── ProjectCard (Client) × 4 — hover states, Link to case study
│       ├── About (Client) — scroll reveal, skills grid
│       └── Contact (Client) — scroll reveal, CTA links
└── Footer (Server) — static, cream bg
```

## Routing

| Route | File | Type |
|-------|------|------|
| `/` | `src/app/page.tsx` | Server Component (children are client) |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` | Server Component with generateStaticParams |

All 4 case study slugs are statically generated at build time via `generateStaticParams()`.

## Data Flow

```
src/lib/projects.ts (single source of truth)
    ↓
    ├── src/components/Projects.tsx → renders ProjectCard for each project
    ├── src/components/ProjectCard.tsx → links to /projects/{slug}
    └── src/app/projects/[slug]/page.tsx → looks up project by slug, renders case study
```

No API routes. No database. No CMS. All content is in TypeScript files.

## Font Loading Pipeline

```
public/fonts/*.woff2 (5 files, self-hosted)
    ↓
src/lib/fonts.ts → next/font/local → generates CSS variables
    ↓
src/app/layout.tsx → injects --font-clash & --font-switzer on <html>
    ↓
src/app/globals.css → @theme inline references CSS variables
    ↓
Tailwind utilities: font-display, font-body → usable in all components
```

**Why next/font/local:** Zero CLS (font-display: swap + preloading), immutable cache headers on `_next/static`, no external network requests.

## Animation Strategy

| Type | Tool | Location |
|------|------|----------|
| Scroll reveals | motion `whileInView` | `<ScrollReveal>` wrapper component |
| Page entrance | motion `AnimatePresence` | Preloader, Hero |
| Hover states | Tailwind CSS transitions | Inline classes on components |
| Marquee | CSS `@keyframes` | globals.css + Marquee component |
| Parallax | motion `useScroll` + `useTransform` | Hero photo |

Shared animation variants (easing, duration, fadeUp, stagger) are centralized in `src/lib/animations.ts` to ensure consistency.

**Standard easing:** `[0.19, 1, 0.22, 1]` (expo out) — used everywhere.

## Design Token Architecture

```
src/app/globals.css
└── @theme inline {
        --color-cream, --color-dark, --color-warm, --color-terracotta, ...
        --font-display, --font-body
    }
    ↓
    Tailwind auto-generates utility classes:
    bg-cream, text-dark, border-border, font-display, font-body, etc.
```

No `tailwind.config.ts` needed. Tailwind v4 reads `@theme` blocks directly from CSS.

## Responsive Strategy

- **Typography:** All headings use `clamp()` for fluid scaling (no breakpoint jumps)
- **Layout:** CSS Grid / Flexbox with Tailwind responsive prefixes (md:, lg:)
- **Container:** `max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16`
- **Nav:** Full links on desktop (md+), hamburger menu on mobile
- **Hero:** 2-col grid on lg+, single column stacked on mobile

## Build & Deploy

- **Dev:** `npm run dev` (Turbopack for fast HMR)
- **Build:** `npm run build` → all pages statically generated
- **Deploy:** Vercel (auto-deploy from git push)
- **Domain:** mahdeenreza.com via Cloudflare DNS → Vercel

## Key Constraints

1. No component libraries — everything built from scratch with Tailwind
2. No CDN fonts — all self-hosted for reliability and performance
3. Server Components by default — "use client" only where hooks/interactivity needed
4. Single light theme — no dark mode toggle
5. All copy is placeholder — will be refined later
