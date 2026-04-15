@AGENTS.md

# Portfolio — Mahdeen Reza

## Commands
`npm run dev` | `npm run build` | `npm run lint`

## Stack
Next.js 16 (App Router) · Tailwind v4 (CSS-first @theme) · motion v12+ (`"motion/react"`) · TypeScript · React 19

## Tokens (globals.css @theme)
Colors: cream #FAF9F6 | dark #1A1A1A | warm #F0EDE6 | terracotta #B5654A | terracotta-hover #D4A08A | terracotta-dark #8B4332 | charcoal #3D3D3A | muted #6B6B6B | border #E0DED8
Fonts: Clash Display → font-display (headings) | Switzer → font-body (body/UI). Self-hosted woff2 via next/font/local (src/lib/fonts.ts).
Radius: cards 12px | buttons 8px | tags 6px

## Typography
Hero: font-display font-bold text-[clamp(48px,8vw,100px)] tracking-[-0.04em] leading-[0.98]
Section h2: font-display font-semibold text-[clamp(28px,4vw,48px)] tracking-[-0.03em] leading-[1.05]
Body: font-body text-[15px] leading-[1.7] | Small: text-sm leading-[1.6] | Label: text-[11px] uppercase tracking-[0.1em]
Nav/Button: font-body text-[13px] | Footer: text-xs

## Architecture
Pages: / (home) | /projects (listing) | /projects/[slug] (case study)
Home flow: Hero → Marquee → Projects(preview) → Skills → About → Contact
Components: src/components/ — "use client" only for motion/hooks
Data: src/lib/projects.ts — `featured?: boolean` for homepage preview
Animations: src/lib/animations.ts — shared variants + easing constants

## Conventions
- Server Components default; "use client" only when needed
- Container: max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16
- Sections: py-24 md:py-32, id="" for anchor scroll
- motion from "motion/react" — NOT "framer-motion"
- next/image for all images
- Tailwind only — no inline styles, no CSS modules

## Animation System
Easing: EASE_OUT_EXPO [0.19,1,0.22,1] (preloader) | EASE_SMOOTH [0.33,1,0.68,1] (page elements)
Variants: fadeUp (y:30, 1.8s) | fadeUpSubtle (y:12, 1.8s, for body text) | fadeUpLarge (y:40, 2.0s) | fadeIn (1.8s) | slideFromLeft (x:-20, 1.8s)
Stagger: 0.3s (standard) | 0.35s (wide)
Preloader: fade-in 1.5s → exit slide-up 2.5s ease-in [0.5,0,0.9,0.2] — shows every refresh
Hero: explicit per-element delays (heading 0/0.2/0.4s, subtitle 0.8s, buttons 1.0s, photo 1.0s)
Scroll: whileInView + viewport={{ once: true }}
Marquee: pure CSS @keyframes — NO JS
Hover: Tailwind transition-* + duration-*

## Data
Projects: license-cleanup-agent | saas-license-monitor | sox-access-review-controls | saas-renewal-operations

## Design Collaboration
- Act as a professional web designer collaborating with the user
- NEVER build on assumptions — ask clarifying questions until the design intent is fully understood
- When the user describes a layout or visual, confirm understanding with specific technical terms before implementing
- If a reference site is provided, identify the exact CSS/layout technique being used and confirm with the user
- Iterate in a question→confirm→implement loop, not a guess→build→fix loop

## Constraints
NO component libs (shadcn/MUI/Radix) · NO CSS beyond Tailwind · NO CDN/Google fonts · NO dark mode · Placeholder copy — design first

## Plugins
Installed via Claude Code plugin marketplace (claude-plugins-official):

**frontend-design** — Generates distinctive, production-grade UI. Auto-invoked for frontend work. Avoids generic AI aesthetics; favors bold typography, color, and animation choices.

**superpowers** (v5.0.7) — Core skills library. Key skills:
- `/brainstorming` `/writing-plans` `/executing-plans` — structured planning workflow
- `/test-driven-development` `/systematic-debugging` — TDD and debugging patterns
- `/subagent-driven-development` `/dispatching-parallel-agents` — multi-agent coordination
- `/verification-before-completion` — quality checks before marking work done
- `/finishing-a-development-branch` `/using-git-worktrees` — git workflow patterns
- `/requesting-code-review` `/receiving-code-review` — code review patterns

**context7** (MCP) — Pulls up-to-date, version-specific library documentation into context. Use when referencing Next.js, Tailwind, motion, or any npm package docs.

**github** (MCP) — GitHub API access: issues, PRs, code review, repo search. Requires `GITHUB_PERSONAL_ACCESS_TOKEN` env var (currently not connected).
