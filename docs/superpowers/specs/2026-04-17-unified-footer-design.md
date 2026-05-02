# Unified Footer — Design Spec

> **Status: Completed.** Footer.tsx rewritten as unified component. Contact.tsx deleted. page.tsx updated.

## Context

The current site has a separate Contact section (`Contact.tsx` in `page.tsx`) and a minimal Footer (`Footer.tsx` in `layout.tsx`). These overlap in purpose and content. This redesign merges them into a single, bold unified footer inspired by Eduard Bodak's site — black background, generous spacing, structured columns.

## Architecture

**Approach:** Single unified `Footer.tsx` component replaces both `Contact.tsx` and the existing `Footer.tsx`.

**Files modified:**
- `src/components/Footer.tsx` — complete rewrite (unified footer)
- `src/app/page.tsx` — remove `Contact` import and usage
- `src/components/Contact.tsx` — delete entirely

**Files unchanged:**
- `src/app/layout.tsx` — already renders `<Footer />`, no changes needed

**Directive:** `"use client"` — required for motion animations and live clock (`useState`/`useEffect`)

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  <footer id="contact" class="bg-dark">                      │
│  max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20             │
│                                                              │
│  ┌─── TOP ZONE (py-16 md:py-24) ────────────────────────┐   │
│  │                                                        │   │
│  │  LEFT (~50%)              RIGHT (~50%)                 │   │
│  │  ┌──────────────┐        ┌────────────┬──────────┐    │   │
│  │  │ "Let's talk." │        │ Projects   │ LinkedIn ↗│   │   │
│  │  │ (white, h2)   │        │ Skills     │ GitHub   ↗│   │   │
│  │  │               │        │ About      │          │    │   │
│  │  │ Body copy     │        │            │          │    │   │
│  │  │ (white/70)    │        └────────────┴──────────┘    │   │
│  │  │               │                                     │   │
│  │  │ email link    │                                     │   │
│  │  │ (white/70)    │                                     │   │
│  │  └──────────────┘                                      │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─── BOTTOM BAR (py-6, mt spacing, no border) ─────────┐   │
│  │  LEFT                                 RIGHT            │   │
│  │  © 2026 Mahdeen Reza                 9:59 PM EST 🇨🇦   │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Typography & Colors

All text on black (`bg-dark` / `#1A1A1A`) background:

| Element | Font | Size | Color |
|---------|------|------|-------|
| "Let's talk." heading | `font-display font-semibold` | `text-[clamp(28px,4vw,48px)] tracking-[-0.03em] leading-[1.05]` | `text-white` |
| Body copy | `font-body` | `text-[15px] leading-[1.7]` | `text-white/70` |
| Email link | `font-body` | `text-[13px]` | `text-white/70`, hover: `text-terracotta` |
| Nav tab links | `font-body` | `text-[13px]` | `text-white/70`, hover: `text-terracotta` |
| Social links | `font-body` | `text-[13px]` | `text-white/70`, hover: `text-terracotta` |
| Copyright | `font-body` | `text-xs` | `text-white/70` |
| Clock / EST / flag | `font-body` | `text-xs` | `text-white/70` |

No column headers. No "Get in touch" label.

## Content

**Left column:**
- Heading: `Let's talk.`
- Body: `Open to conversations about AI, SaaS, Product, and the future of operations work.`
- Email: `mahdeen.amin@gmail.com` (mailto: link)

**Right column — Nav tabs:**
- Projects → `/projects`
- Skills → `/#skills`
- About → `/#about`

**Right column — Socials:**
- LinkedIn → `https://linkedin.com/in/mahdeen-reza` (new tab, external-link SVG icon)
- GitHub → `https://github.com/mahdeen-reza` (new tab, external-link SVG icon)

**Bottom bar:**
- Left: `© {currentYear} Mahdeen Reza`
- Right: Live 12-hour clock (`America/Toronto` timezone), `EST` label, 🇨🇦 emoji

## External Link Icon

Small inline SVG — a simple arrow-up-right style icon matching Bodak's reference. Sized to match the `text-[13px]` link text (~14px). Same color as the link text, transitions with hover.

## Clock Implementation

- `useState` for current time string
- `useEffect` with `setInterval` every 60 seconds (no seconds displayed, so per-minute is sufficient)
- `Intl.DateTimeFormat` with `timeZone: "America/Toronto"`, `hour12: true`
- Format: `h:mm PM` (e.g. `9:59 PM`)
- Hydration safety: render empty or static on server, populate on client mount

## Animations

Uses existing variants from `src/lib/animations.ts`:

| Element | Variant | Behavior |
|---------|---------|----------|
| Footer wrapper | `staggerContainer` | `whileInView`, `viewport={{ once: true }}` |
| Heading | `fadeUpSubtle` | Staggered child |
| Body copy | `fadeUpSubtle` | Staggered child |
| Email link | `fadeUpSubtle` | Staggered child |
| Right column links | `fadeUpSubtle` | Staggered children |
| Bottom bar | `fadeIn` | Staggered child |

## Responsive Behavior

- **Desktop (lg+):** Two-column grid, right side has two sub-columns
- **Tablet (md):** Same two-column but tighter spacing
- **Mobile (sm and below):** Single column stack — left content first, then right columns side by side, then bottom bar

## Anchor Navigation

`id="contact"` preserved on the footer element. Navbar's "Connect" button continues to scroll to `#contact` with no changes needed.

## Verification

1. `npm run build` — no build errors
2. `npm run dev` — visual check on localhost
3. Verify: black background, white/terracotta text hierarchy
4. Verify: all links work (mailto, nav anchors, external socials in new tab)
5. Verify: clock shows correct Montreal time in 12h format
6. Verify: scroll animation triggers on viewport entry
7. Verify: responsive layout at mobile/tablet/desktop breakpoints
8. Verify: Navbar "Connect" button scrolls to the footer
