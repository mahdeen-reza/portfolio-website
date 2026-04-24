# Projects Overlay Panel — Design Spec

## Context

The portfolio currently has a separate `/projects` page that lists all 4 projects. With only 4 projects, this dedicated page feels redundant — the homepage already shows featured projects. This spec replaces the standalone page with a slide-in overlay panel triggered from the homepage, creating a more integrated, dramatic browsing experience.

## Overview

Remove `/projects` page. Add a right-side overlay panel (55% viewport width on desktop, 100% on mobile) that slides in when the user clicks "View all projects" on the homepage or the "PROJECTS" tab in the navbar. The overlay contains a simplified project list with scroll-linked zoom/fade animation on each card.

## Component Architecture

### New Files

**`src/context/ProjectsOverlayContext.tsx`** — React context provider
- State: `isOpen: boolean`
- Methods: `open()`, `close()`
- Wraps the root layout so both Navbar and Projects section can trigger it

**`src/components/ProjectsOverlay.tsx`** — Client component, portal-based
- Renders via `createPortal` to `document.body`
- Wrapped in `AnimatePresence` for enter/exit animations
- Contains: sticky header, scrollable card list, backdrop

### Modified Files

- **`src/app/layout.tsx`** — Wrap children with `ProjectsOverlayProvider`, render `<ProjectsOverlay />`
- **`src/components/Projects.tsx`** — "View all projects" button calls `open()` instead of `<Link href="/projects">`
- **`src/components/Navbar.tsx`** — "PROJECTS" link triggers scroll+open choreography instead of routing to `/projects`

### Removed Files

- **`src/app/projects/page.tsx`** — Standalone projects listing page

### Untouched

- `src/app/projects/[slug]/page.tsx` — Case study pages remain as-is
- `src/components/ProjectCard.tsx` — Reused inside overlay. The component already conditionally renders `screenshot` and `impact` (only when present on the project object). For the overlay, pass a `compact` prop that suppresses screenshot/impact rendering regardless of data, keeping the folder container + title + description + tags + CTA.
- Homepage projects section layout, metrics bar — unchanged

## Overlay Panel Layout

```
┌──────────────────────────────────────┐
│  STICKY HEADER                        │
│  ← Close              [progress bar]  │
│  Projects                             │
│  All Projects                         │
├───────────────────────────────────────┤
│  SCROLLABLE CONTENT                   │
│                                       │
│  ┌─ Phase 1 complete ───────────┐    │
│  │  License Clean-Up Agent       │    │
│  │  Automated deprovisioning...  │    │
│  │  [TypeScript] [Express] [...] │    │
│  │           Read case study →   │    │
│  └───────────────────────────────┘    │
│                                       │
│  ┌─ Live + Expanding ───────────┐    │
│  │  SaaS License Monitor         │    │
│  │  Real-time license tracking.. │    │
│  │  [React] [TypeScript] [...]   │    │
│  │           Read case study →   │    │
│  └───────────────────────────────┘    │
│                                       │
│  ... (remaining projects)             │
│                                       │
└──────────────────────────────────────┘
```

### Panel Styling

- **Width**: 55% viewport on desktop (md+), 100% on mobile
- **Background**: `bg-cream` (#FAF9F6)
- **Position**: Fixed, right-aligned, full height
- **Z-index**: `z-[60]` (above navbar's `z-50`)
- **Left edge**: `shadow-2xl` + `border-l-2 border-terracotta/20`
- **Padding**: `px-8 md:px-12 py-8`
- **Scroll**: `overflow-y-auto` on the content area below the sticky header

### Sticky Header

- **Position**: Sticky at top of overlay scroll container
- **Background**: `bg-cream` with subtle bottom border
- **Close button**: "← Close" at top-left, `font-body text-[13px]`, terracotta text, hover underline
- **Heading**: "Projects" — `font-display font-bold text-[clamp(38px,5.5vw,72px)]` terracotta
- **Subheading**: "All Projects" — `font-display font-semibold text-[clamp(20px,3vw,34px)]`
- **Scroll progress**: `h-[2px] bg-terracotta` bar spanning full header width, positioned at the very bottom of the sticky header. Width transitions from 0% → 100% as user scrolls through the card list. Driven by `useScroll` on the scroll container.

### Card Content

Each card uses the existing folder-shaped container pattern from `ProjectCard` but stripped down:

**Included:** Project number, title, description, tags, "Read case study →" CTA, folder tab with status
**Excluded:** Screenshot image, impact statement, metrics bar

Cards are single-column stacked with `gap-6`.

### Card Click Behavior

Clicking a card: overlay exit animation plays (300ms), then navigates to `/projects/[slug]`.

## Animation Specification

### Overlay Entrance

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Backdrop | `opacity: 0 → 1` (max `bg-dark/60`) | 0.3s | ease-out |
| Panel | `translateX(100%) → translateX(0)` | 0.5s | EASE_OUT_EXPO `[0.19, 1, 0.22, 1]` |
| Cards | Staggered fadeUp entrance | 0.4s each, 0.12s stagger | EASE_SMOOTH `[0.33, 1, 0.68, 1]` |

Backdrop and panel animate simultaneously. Cards stagger in after the panel is ~60% done (0.3s delay).

### Overlay Exit

Reverse of entrance: panel slides right, backdrop fades out. 0.3s total.

### Scroll-Linked Zoom + Fade

Each card's scale and opacity are driven by its vertical position within the overlay's scroll container:

| Card Position | Scale | Opacity |
|---------------|-------|---------|
| Top edge | 0.88 | 0.5 |
| Center | 1.0 | 1.0 |
| Bottom edge | 0.88 | 0.5 |

Implementation: `useScroll({ target: cardRef, container: scrollContainerRef })` + `useTransform` to map each card's scroll progress to scale/opacity values. Smooth, continuous interpolation.

### Navbar Scroll + Open Choreography

When "PROJECTS" is clicked in the navbar:
1. Programmatic scroll to `#projects` section via `scrollIntoView({ behavior: "smooth" })`
2. After **400ms delay** (scroll ~70% complete), trigger `open()`
3. If user is already within 200px of the projects section, skip scroll and open immediately

## Interaction Design

### Close Mechanisms

- "← Close" button (top-left of overlay)
- Click backdrop (desktop only — backdrop not visible on mobile)
- Press ESC key
- Browser back button (push history state on open, listen for `popstate`)

### Body Scroll Locking

When overlay is open: `document.body.style.overflow = "hidden"` — prevents background page from scrolling.

### Keyboard Accessibility

Focus trap inside overlay when open. Tab cycles through: close button → project card links. Focus returns to the trigger element on close.

### Transition to Case Study

Click card → overlay exit animation (0.3s) → `router.push(/projects/[slug])`. Brief pause so the exit animation completes before navigation.

## Edge Cases

### Direct URL `/projects`

Since the page is removed, add a redirect in `next.config` to send `/projects` → `/`. Handles bookmarks and existing links.

### Already at Projects Section

If user clicks navbar "PROJECTS" while the projects section is in view, skip the scroll step and open overlay immediately.

### Overlay Already Open

If `isOpen` is already true, ignore subsequent open triggers.

### Case Study Back Navigation

Case study pages' "← Back to home" link continues to point to `/`. The overlay is not restored on back navigation from a case study — the user lands on the homepage.

## Verification Plan

1. **Build**: `npm run build` passes with no errors
2. **Lint**: `npm run lint` passes
3. **Desktop flow**: Click "View all projects" → overlay slides in from right at 55% width, dark backdrop, staggered card entrance, scroll-linked zoom works
4. **Navbar flow**: Click "PROJECTS" in nav → page scrolls to projects section, overlay opens mid-scroll
5. **Mobile flow**: Overlay takes full width, slide-in animation works
6. **Close mechanisms**: Test close button, backdrop click, ESC key, browser back
7. **Card navigation**: Click a card → overlay closes → case study page loads
8. **Redirect**: Navigate to `/projects` directly → redirected to `/`
9. **Case study pages**: Verify `/projects/[slug]` pages still work unchanged
10. **Scroll lock**: Background doesn't scroll when overlay is open
