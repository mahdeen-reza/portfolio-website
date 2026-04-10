# Product Requirements Document — Portfolio Website

## Overview
Personal portfolio website for Mahdeen Reza — a Systems Governance Analyst specializing in AI, SaaS management, automation, and compliance. The site showcases four portfolio projects with dedicated case study pages.

**Domain:** mahdeenreza.com (Cloudflare → Vercel DNS)

---

## Pages

### Homepage (/)
1. **Hero** — Two-column layout (text left, photo right) on cream (#FAF9F6) background
2. **Marquee Ticker** — Infinite horizontal scroll strip on terracotta (#B5654A) background
3. **Projects** — Dark (#1A1A1A) section with 4 stacked project cards
4. **About** — Warm (#F0EDE6) section with bio and skills grid
5. **Contact** — Cream section with CTA, LinkedIn, email, GitHub links

### Case Study Pages (/projects/[slug])
- `/projects/license-cleanup-agent`
- `/projects/saas-license-monitor`
- `/projects/sox-access-review-controls`
- `/projects/saas-renewal-operations`

Each has: back link, title, metadata bar, content sections with placeholder text.

---

## Projects

| # | Name | Description | Tags | GitHub | Demo |
|---|------|-------------|------|--------|------|
| 01 | License Clean-Up Agent | AI-powered internal tool automating Salesforce license analysis across 5 instances | AI, TypeScript, React, Full-stack | github.com/mahdeen-reza/license-cleanup-agent-demo | TBD |
| 02 | SaaS License Monitor | BigQuery + Looker pipeline replacing manual tracking with automated capacity alerting | BigQuery, Looker, SQL, Fivetran | github.com/mahdeen-reza/saas-license-monitor | mahdeen-reza.github.io/saas-license-monitor |
| 03 | SOX Access Review Controls | Audit infrastructure for SOX ITGC compliance with cell-level edit tracking | Compliance, Google Apps Script, SOX | github.com/mahdeen-reza/systems-governance-toolkit | — |
| 04 | SaaS Renewal Operations | End-to-end process architecture across a 60+ system portfolio | Process Design, Operations, Governance | — | — |

---

## Marquee Content
- "6-figure cost rationalization"
- "Ground-up function established"
- "3+ years in SaaS operations"
- "100% SOX ITGC pass rate"
- "AI-powered tooling built & deployed"
- "60+ system portfolio managed"

---

## Navigation
- **Left:** "Mahdeen Reza" in bordered box → links to home
- **Center:** Projects | About | Contact (anchor links)
- **Right:** "Let's talk" CTA in terracotta
- **Behavior:** Sticky, transparent → bg + border-bottom on scroll
- **Mobile:** Hamburger menu, slide-down panel

---

## Animation Requirements

### Preloader (first visit per session)
1. Cream overlay, z-100
2. "Mahdeen Reza" fades in + scale 0.95→1 (0.6s)
3. Hold 0.8s
4. Overlay slides up translateY(-100%) (0.5s)
5. Skip on repeat visits (sessionStorage)

### Scroll Animations (all once: true)
- Section headings: fadeUp (y:30→0, 0.6s)
- Section labels: slideFromLeft (x:-20→0, 0.5s)
- Hero heading lines: staggered fadeUp (0.12s stagger)
- Hero subtitle/buttons: fadeUp 0.3s delay
- Hero photo: fadeIn + scale 0.97→1 (0.8s)
- Project cards: staggered fadeUp (y:40→0, 0.15s stagger)
- About/Contact: fadeUp

### Hover States
- Nav links: underline width 0→100% left-to-right, terracotta
- Primary button: bg darkens, scale(1.02), 200ms
- Ghost button: bg fills charcoal, text→cream, 250ms
- Project cards: translateY(-2px), border brightens, arrow translateX(4px), 250ms
- Footer links: color→terracotta, 200ms

### Other
- Hero photo: subtle parallax (scroll * 0.1 vertical drift)
- Marquee: CSS @keyframes, ~30-40s per loop, no pause on hover

---

## Responsive Breakpoints
- Desktop: 1200px+ (full layout)
- Tablet: 768-1199px (hero stacks, reduced gaps)
- Mobile: <768px (single column, hamburger nav, reduced fonts)

---

## Lighthouse Targets
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100
