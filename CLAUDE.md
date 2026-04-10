@AGENTS.md

# Portfolio Website — Mahdeen Reza

## Commands
- `npm run dev` — local dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint

## Tech Stack
Next.js 16 (App Router) · Tailwind v4 (CSS-first @theme) · motion v12+ (import from "motion/react") · TypeScript · React 19

## Design Tokens (src/app/globals.css @theme)
Colors: cream #FAF9F6 | dark #1A1A1A | warm #F0EDE6 | terracotta #B5654A | terracotta-hover #D4A08A | terracotta-dark #8B4332 | charcoal #3D3D3A | muted #6B6B6B | border #E0DED8
Fonts: Clash Display (--font-clash → font-display, headings, 500/600/700) | Switzer (--font-switzer → font-body, body/UI, 400/500)
Font loading: next/font/local in src/lib/fonts.ts → CSS vars on `<html>` → consumed via @theme inline in globals.css
Radius: cards 12px | buttons 8px | tags 6px

## Typography Quick Ref
Hero heading:     font-display font-bold text-[clamp(48px,8vw,100px)] tracking-[-0.04em] leading-[0.98]
Section heading:  font-display font-semibold text-[clamp(28px,4vw,48px)] tracking-[-0.03em] leading-[1.05]
Card heading:     font-display font-semibold text-lg tracking-[-0.02em]
Nav logo:         font-display font-semibold text-base tracking-[-0.02em]
Body:             font-body text-[15px] leading-[1.7]
Small body:       font-body text-sm leading-[1.6]
Section label:    font-body font-medium text-[11px] uppercase tracking-[0.1em]
Nav links:        font-body text-[13px]
Button text:      font-body font-medium text-[13px]
Footer text:      font-body text-xs

## Architecture
- Pages: src/app/page.tsx (home) | src/app/projects/page.tsx (all projects) | src/app/projects/[slug]/page.tsx (case studies)
- Homepage flow: Hero → Marquee → Projects (preview, featured only) → Skills → About (bio-only) → Contact
- Components: src/components/ — one file per component, "use client" only where needed
- Data: src/lib/projects.ts — project metadata array with `featured?: boolean` flag for homepage preview
- Fonts: src/lib/fonts.ts — next/font/local config
- Animations: src/lib/animations.ts — shared motion variants (fadeUp, fadeIn, stagger, slideIn)
- ScrollReveal: src/components/ScrollReveal.tsx — reusable whileInView wrapper for all scroll-triggered entrances

## Component Conventions
- Server Components by default. Add "use client" only for interactivity/motion/hooks.
- All homepage sections use id="" for nav anchor scrolling (id="projects", id="about", id="contact")
- Tailwind utility classes only — no inline styles, no CSS modules, no styled-components
- next/image for all images (with width/height or fill)
- motion from "motion/react" for animations — NOT "framer-motion"
- Consistent max-width container: max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16

## Animation Conventions
- Scroll reveals: `<ScrollReveal>` wrapper with whileInView, viewport={{ once: true }}
- Standard easing: [0.19, 1, 0.22, 1] (expo out) — used for all motion animations
- Standard duration: 0.6s entrance, 0.3s exit
- Stagger: 0.12-0.15s between siblings
- Marquee: pure CSS @keyframes translateX(-50%) — NO JS, NO motion
- Hover states: Tailwind transition-* + duration-* classes

## Key Data
Four projects (in order): License Clean-Up Agent | SaaS License Monitor | SOX Access Review Controls | SaaS Renewal Operations
Slugs: license-cleanup-agent | saas-license-monitor | sox-access-review-controls | saas-renewal-operations

## Constraints
- NO component libraries (no shadcn, no MUI, no Radix, no Headless UI)
- NO CSS frameworks beyond Tailwind (no Bootstrap, no Chakra)
- NO CDN fonts — self-hosted woff2 in public/fonts/
- NO Google Fonts, NO Fontshare CDN links
- NO dark mode — single light theme (cream primary bg)
- All copy is placeholder — structure/design/animation first
- Hero photo: use gray placeholder div with "MR" initials until real PNG provided
