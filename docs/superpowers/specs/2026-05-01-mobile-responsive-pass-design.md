# Mobile Responsive Pass — Design Spec

**Date:** 2026-05-01
**Target viewport:** 375px minimum (iPhone SE / 13 mini)
**Constraint:** Only modify base/default Tailwind classes. Never touch existing `md:` / `lg:` / `xl:` prefixed classes. Desktop rendering must be unchanged.

## Context

The portfolio site has a solid responsive foundation (mobile-first grids, `hidden`/`md:hidden` toggles, `clamp()` headings, hamburger menu). However, many body-level text elements use fixed pixel sizes (20px-26px) that don't scale on mobile, several layouts break or feel cramped at 375px, and section spacing is generous but untightened for small screens. This pass fixes all mobile issues without touching any desktop styles.

## Approach

**Explicit responsive prefix pairs** — change the base (mobile) value and add a new `md:` or `sm:` class to restore the current desktop value.

- Example: `text-[23px]` becomes `text-[17px] md:text-[23px]`
- Zero desktop risk: the added `md:` class exactly matches the current value
- Consistent with existing codebase patterns (`py-6 md:py-8`, `px-6 md:px-12`)
- Stepped transition at the breakpoint rather than fluid, but imperceptible on a portfolio site

## 1. Typography

Mobile sizes are ~74-78% of desktop (noticeably tighter, per user preference).

### Hero (`src/components/Hero.tsx`)

| Line | Element | Before | After |
|------|---------|--------|-------|
| 107 | Subtitle paragraph | `text-[23px]` | `text-[17px] md:text-[23px]` |

### About (`src/components/About.tsx`)

| Line | Element | Before | After |
|------|---------|--------|-------|
| 122 | Body paragraph 1 | `text-[23px]` | `text-[17px] md:text-[23px]` |
| 128 | Body paragraph 2 | `text-[23px]` | `text-[17px] md:text-[23px]` |

### Footer (`src/components/Footer.tsx`)

| Line | Element | Before | After |
|------|---------|--------|-------|
| 153 | Subtitle | `text-[23px]` | `text-[17px] md:text-[23px]` |
| 161 | Email link | `text-[26px]` | `text-[20px] md:text-[26px]` |
| 178 | Nav links | `text-[23px]` | `text-[17px] md:text-[23px]` |
| 193 | Social links | `text-[23px]` | `text-[17px] md:text-[23px]` |
| 219 | Clock | `text-[23px]` | `text-[16px] md:text-[23px]` |

### ProjectCard (`src/components/ProjectCard.tsx`)

| Line | Element | Before | After |
|------|---------|--------|-------|
| 32 | Description | `text-[20px]` | `text-[16px] md:text-[20px]` |

### Skills (`src/components/Skills.tsx`)

| Line | Element | Before | After |
|------|---------|--------|-------|
| 457 | Skill item text | `text-[17px]` | `text-[15px] sm:text-[17px]` |

### ProjectsOverlay ZoomCard (`src/components/ProjectsOverlay.tsx`)

| Line | Element | Before | After |
|------|---------|--------|-------|
| 61 | Card description | `text-[20px]` | `text-[16px] md:text-[20px]` |

### Case Study Page (`src/app/projects/[slug]/page.tsx`)

| Line | Element | Before | After |
|------|---------|--------|-------|
| 63 | Role value | `text-[18px]` | `text-[15px] md:text-[18px]` |
| 71 | Status value | `text-[18px]` | `text-[15px] md:text-[18px]` |
| 79 | Last Updated value | `text-[18px]` | `text-[15px] md:text-[18px]` |
| 89 | Built With value | `text-[18px]` | `text-[15px] md:text-[18px]` |
| 100 | GitHub link | `text-[20px]` | `text-[16px] md:text-[20px]` |
| 110 | Live demo link | `text-[20px]` | `text-[16px] md:text-[20px]` |
| 118 | Process map link | `text-[20px]` | `text-[16px] md:text-[20px]` |

### Workflow Page (`src/app/projects/saas-renewal-operations/workflow/page.tsx`)

| Line | Element | Before | After |
|------|---------|--------|-------|
| 204 | Subtitle paragraph | `text-[20px]` | `text-[16px] md:text-[20px]` |
| 211 | Intro paragraph | `text-[20px]` | `text-[16px] md:text-[20px]` |

### Case Study Prose (`src/app/globals.css`)

```css
/* BEFORE (line 101): */
.prose-case-study {
  font-size: 20px;
}

/* AFTER: */
.prose-case-study {
  font-size: 16px;
}
@media (min-width: 768px) {
  .prose-case-study {
    font-size: 20px;
  }
}
```

Place the new `@media` block between the `.prose-case-study` base rule and the existing `@media (min-width: 768px)` block for `.prose-case-study p` (text-align: justify) at line 110.

## 2. Layout Fixes

### About hobbies grid (`src/components/About.tsx`)

**Line 142 — Hobbies card left padding:**
```
BEFORE: pl-12 pr-6
AFTER:  pl-6 pr-6 sm:pl-12
```
At 375px, `pl-12` (48px) is excessive. Reducing to `pl-6` (24px), restoring at `sm:`.

**Line 146 — Hobbies grid columns:**
```
BEFORE: grid-cols-3 gap-x-10
AFTER:  grid-cols-2 gap-x-6 sm:grid-cols-3 sm:gap-x-10
```
Three columns with 40px gaps in ~255px available width gives ~58px per column. Two columns with 24px gaps gives ~115px per column — enough for labels like "Economics and Politics".

### Footer right column (`src/components/Footer.tsx`)

**Line 170 — Grid layout:**
```
BEFORE: grid grid-cols-2 gap-4
AFTER:  grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4
```
Only 3 nav links + 2 social links — single column stacking is cleaner on mobile.

### Skills card padding (`src/components/Skills.tsx`)

**Line 437 — Card inner padding:**
```
BEFORE: py-6 px-10
AFTER:  py-5 px-5 sm:px-10
```
`px-10` (80px total) leaves only ~247px for content in a 375px viewport. `px-5` (40px total) gives ~287px.

### ProjectsOverlay (`src/components/ProjectsOverlay.tsx`)

**Line 156 — Header padding:**
```
BEFORE: px-8 md:px-12
AFTER:  px-5 md:px-12
```

**Line 174 — Scroll area:**
```
BEFORE: px-8 md:px-12 pt-8 pb-[50vh]
AFTER:  px-5 md:px-12 pt-6 pb-[30vh]
```
`pb-[50vh]` creates ~335px of empty scroll space on mobile. `pb-[30vh]` (~112px) is sufficient.

### Case study metadata gap (`src/app/projects/[slug]/page.tsx`)

**Line 58 — Metadata container:**
```
BEFORE: gap-x-6 sm:gap-x-8
AFTER:  gap-x-4 sm:gap-x-8
```

### Navbar mobile menu (`src/components/Navbar.tsx`)

**Line 199 — Link gap:**
```
BEFORE: gap-1
AFTER:  gap-2
```
`gap-1` (4px) is too tight for visual separation between touch targets.

## 3. Interaction Fixes

### Skills hover scale (`src/components/Skills.tsx`)

**Line 446:**
```
BEFORE: hover:scale-[1.12]
AFTER:  hover:scale-[1.04] sm:hover:scale-[1.12]
```
12% scale causes items to overflow card boundaries on mobile where horizontal margin is minimal. 4% is safe. On touch devices, `:hover` fires on tap and persists, making overflow more noticeable.

### Mobile TOC touch targets (`src/app/projects/[slug]/page.tsx`)

**Line 155 — TOC list spacing:**
```
BEFORE: <ul className="space-y-1">
AFTER:  <ul className="space-y-0">
```

**Line 160 — TOC link padding:**
```
BEFORE: className="flex items-center gap-2 font-body text-[13px] text-muted hover:text-dark transition-colors duration-200"
AFTER:  className="flex items-center gap-2 font-body text-[13px] text-muted hover:text-dark transition-colors duration-200 py-1.5"
```
Adding `py-1.5` (6px top and bottom) to each anchor creates ~30px touch targets (6 + ~18px text + 6). `space-y-1` is removed since `py-1.5` already creates spacing between items.

### Prose tables — mobile overflow (`src/app/globals.css`)

Add after the existing `.prose-case-study td` block (~line 220):

```css
@media (max-width: 767px) {
  .prose-case-study table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    font-size: 14px;
  }
}
```

Tables become horizontally scrollable on mobile with slightly reduced text. Content visibly cut off at the edge indicates scrollability.

## 4. Section Spacing

Tighten vertical rhythm on mobile: `pt-12 pb-20` → `pt-10 pb-16`. Desktop values (`md:pt-16 md:pb-28`) are untouched.

| File | Line | Before | After |
|------|------|--------|-------|
| `src/components/Projects.tsx` | 98 | `pt-12 pb-20` | `pt-10 pb-16` |
| `src/components/Skills.tsx` | 412 | `pt-12 pb-20` | `pt-10 pb-16` |
| `src/components/About.tsx` | 59 | `pt-12 pb-20` | `pt-10 pb-16` |
| `workflow/page.tsx` | 185 | `pt-12 pb-20` | `pt-10 pb-16` |
| `src/components/Footer.tsx` | 135 | `py-16` | `py-12` |

## Files Modified

1. `src/components/Hero.tsx` — 1 change (typography)
2. `src/components/About.tsx` — 4 changes (typography + layout)
3. `src/components/Footer.tsx` — 7 changes (typography + layout + spacing)
4. `src/components/ProjectCard.tsx` — 1 change (typography)
5. `src/components/Skills.tsx` — 4 changes (typography + spacing + interaction)
6. `src/components/ProjectsOverlay.tsx` — 3 changes (typography + spacing)
7. `src/components/Navbar.tsx` — 1 change (spacing)
8. `src/app/projects/[slug]/page.tsx` — 10 changes (typography + spacing + touch targets)
9. `src/app/projects/saas-renewal-operations/workflow/page.tsx` — 3 changes (typography + spacing)
10. `src/app/globals.css` — 3 changes (prose font size + media query + table overflow)

## Verification

1. Run `npm run build` — confirm no compilation errors
2. Run `npm run dev` and open Chrome DevTools mobile emulation at 375px
3. Check each page in order:
   - **Homepage:** Hero → Projects → Skills → About → Footer
   - **Projects overlay:** Click "View all projects"
   - **Case study:** Navigate to any `/projects/[slug]` page
   - **Workflow:** Navigate to `/projects/saas-renewal-operations/workflow`
4. At each page, verify:
   - Text is noticeably smaller than desktop but readable
   - No horizontal overflow / no horizontal scrollbar on body
   - Tables in case studies scroll horizontally
   - Touch targets are tappable (especially mobile TOC, navbar menu)
   - All layouts stack cleanly (hobbies grid 2-col, footer right column single-col)
5. Switch to desktop width (1200px+) and confirm **nothing has changed**
6. Run `npm run lint` — confirm no linting errors
