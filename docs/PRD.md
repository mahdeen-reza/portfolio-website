# Product Requirements Document — Portfolio Website

## Overview
Personal portfolio website for Mahdeen Reza — a Systems Governance Analyst specializing in AI, SaaS management, automation, and compliance. The site showcases four portfolio projects with dedicated case study pages.

**Domain:** mahdeenreza.com (Cloudflare → Vercel DNS)

---

## Pages

### Homepage (/)
1. **Preloader** — Full-screen "Mahdeen Reza Amin" reveal, sessionStorage-gated (first visit per session)
2. **Hero** — Two-column layout (text left, photo right) on cream (#FAF9F6) background
3. **Projects** — Warm sand (#DBD6C9) section with featured project cards and impact metrics
4. **Skills** — White section with 3-column grid (Domain Expertise, Software & Tools, Technical Competencies)
5. **About** — Warm sand section with bio, portrait, hobbies, career paths

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
2. "Mahdeen Reza Amin" fades in + scale 0.95→1 (1.0s, EASE_OUT_EXPO)
3. Exit: overlay slides up translateY(-100%) (1.8s, ease [0.45, 0, 0.15, 1])
4. Hero animations trigger 0.5s into exit via markPreloaderDone() pub/sub
5. Skip on repeat visits (sessionStorage + isPreloaderDone() check)

### Scroll Animations (all once: true)
- Section headings: fadeUp (y:20→0, 0.8s)
- Section labels: slideFromLeft (x:-14→0, 0.7s)
- Hero heading lines: staggered fadeUp (0.12s stagger)
- Hero subtitle/buttons: fadeUp 0.3s delay
- Hero photo: fadeIn + scale 0.97→1 (0.8s)
- Project cards: staggered fadeUpLarge (y:28→0, 0.15s stagger)
- Skills: fadeUpFast (y:16→0, 0.4s snappy, 0.08s stagger)
- About: fadeUp

### Hover States
- Nav links: underline width 0→100% left-to-right, terracotta
- Primary button: bg darkens, scale(1.02), 200ms
- Ghost button: bg fills charcoal, text→cream, 250ms
- Project cards: translateY(-2px), border brightens, arrow translateX(4px), 250ms
- Footer links: color→terracotta, 200ms

### Other
- Hero photo: subtle parallax (scroll * 0.1 vertical drift)
- ProjectsOverlay: scroll-linked card scale + opacity via useScroll/useTransform

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
