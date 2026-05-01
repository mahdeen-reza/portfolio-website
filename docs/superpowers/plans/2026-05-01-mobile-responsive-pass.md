# Mobile Responsive Pass — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all mobile styling issues (typography, layout, spacing, interactions) across the portfolio site without changing any desktop styles.

**Architecture:** Modify base/default Tailwind classes and add new `md:` or `sm:` prefixes to restore current desktop values. For CSS-based prose styles, use `@media` queries. All existing responsive prefixes (`md:`, `lg:`, `xl:`) remain untouched.

**Tech Stack:** Next.js 16, Tailwind v4 (CSS-first @theme), TypeScript, React 19

**Spec:** `docs/superpowers/specs/2026-05-01-mobile-responsive-pass-design.md`

---

### Task 1: Typography — Homepage Components (Hero, About, Footer)

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/About.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Hero subtitle — reduce mobile font size**

In `src/components/Hero.tsx`, line 107, change the subtitle paragraph class:

```
BEFORE:
className="font-body text-[23px] leading-[1.7] text-muted max-w-md lg:max-w-[55%] mx-auto lg:mx-0"

AFTER:
className="font-body text-[17px] md:text-[23px] leading-[1.7] text-muted max-w-md lg:max-w-[55%] mx-auto lg:mx-0"
```

- [ ] **Step 2: About body paragraphs — reduce mobile font size**

In `src/components/About.tsx`, line 122 and line 128, change both paragraph classes:

Line 122:
```
BEFORE:
<p className="font-body text-[23px] leading-[1.7] text-charcoal">

AFTER:
<p className="font-body text-[17px] md:text-[23px] leading-[1.7] text-charcoal">
```

Line 128:
```
BEFORE:
<p className="font-body text-[23px] leading-[1.7] text-charcoal">

AFTER:
<p className="font-body text-[17px] md:text-[23px] leading-[1.7] text-charcoal">
```

- [ ] **Step 3: Footer — reduce all mobile font sizes**

In `src/components/Footer.tsx`, make these 5 changes:

Line 153 — subtitle:
```
BEFORE:
className="font-body text-[23px] leading-[1.7] text-white/70 mb-6"

AFTER:
className="font-body text-[17px] md:text-[23px] leading-[1.7] text-white/70 mb-6"
```

Line 161 — email link:
```
BEFORE:
className="font-body text-[26px] text-terracotta transition-colors duration-200 hover:text-terracotta-hover"

AFTER:
className="font-body text-[20px] md:text-[26px] text-terracotta transition-colors duration-200 hover:text-terracotta-hover"
```

Line 178 — nav links:
```
BEFORE:
className="font-body text-[23px] text-white/70 transition-colors duration-200 hover:text-terracotta whitespace-nowrap select-none"

AFTER:
className="font-body text-[17px] md:text-[23px] text-white/70 transition-colors duration-200 hover:text-terracotta whitespace-nowrap select-none"
```

Line 193 — social links:
```
BEFORE:
className="font-body text-[23px] text-terracotta transition-colors duration-200 hover:text-terracotta-hover whitespace-nowrap select-none"

AFTER:
className="font-body text-[17px] md:text-[23px] text-terracotta transition-colors duration-200 hover:text-terracotta-hover whitespace-nowrap select-none"
```

Line 219 — clock:
```
BEFORE:
<p className="font-body text-[23px] text-white/70 sm:text-right">

AFTER:
<p className="font-body text-[16px] md:text-[23px] text-white/70 sm:text-right">
```

- [ ] **Step 4: Verify build succeeds**

Run: `npm run build`
Expected: Build completes with no errors.

- [ ] **Step 5: Visual verification at 375px**

Run: `npm run dev`
Open Chrome DevTools → device toolbar → select iPhone SE (375px).
Check: Hero subtitle, About body text, and Footer (subtitle, email, links, clock) are all noticeably smaller than desktop but still readable. Switch to desktop width and confirm nothing changed.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.tsx src/components/About.tsx src/components/Footer.tsx
git commit -m "style(mobile): reduce typography sizes in Hero, About, and Footer

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Typography — Card & Overlay Components (ProjectCard, ProjectsOverlay, Skills)

**Files:**
- Modify: `src/components/ProjectCard.tsx`
- Modify: `src/components/ProjectsOverlay.tsx`
- Modify: `src/components/Skills.tsx`

- [ ] **Step 1: ProjectCard description — reduce mobile font size**

In `src/components/ProjectCard.tsx`, line 32:

```
BEFORE:
<p className="font-body text-[20px] leading-[1.6] text-muted">

AFTER:
<p className="font-body text-[16px] md:text-[20px] leading-[1.6] text-muted">
```

- [ ] **Step 2: ProjectsOverlay ZoomCard description — reduce mobile font size**

In `src/components/ProjectsOverlay.tsx`, line 61:

```
BEFORE:
<p className="font-body text-[20px] leading-[1.6] text-muted">

AFTER:
<p className="font-body text-[16px] md:text-[20px] leading-[1.6] text-muted">
```

- [ ] **Step 3: Skills item text — reduce mobile font size**

In `src/components/Skills.tsx`, line 457:

```
BEFORE:
<span className="font-body text-[17px] font-medium text-charcoal leading-[1.6]">

AFTER:
<span className="font-body text-[15px] sm:text-[17px] font-medium text-charcoal leading-[1.6]">
```

Note: Uses `sm:` (640px) instead of `md:` because skills cards switch to 3-column grid at `md:` and the larger text size is appropriate starting from `sm:` where cards have more room.

- [ ] **Step 4: Verify build succeeds**

Run: `npm run build`
Expected: Build completes with no errors.

- [ ] **Step 5: Visual verification at 375px**

Open Chrome DevTools at 375px. Check:
- Project cards on homepage show smaller description text
- "View all projects" overlay shows smaller card descriptions
- Skills section shows slightly smaller skill names
Switch to desktop width and confirm nothing changed.

- [ ] **Step 6: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/ProjectsOverlay.tsx src/components/Skills.tsx
git commit -m "style(mobile): reduce typography sizes in ProjectCard, ProjectsOverlay, and Skills

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Typography — Case Study & Workflow Pages

**Files:**
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/app/projects/saas-renewal-operations/workflow/page.tsx`

- [ ] **Step 1: Case study metadata values — reduce mobile font size**

In `src/app/projects/[slug]/page.tsx`, change all 4 metadata value spans:

Line 63 (Role):
```
BEFORE:
<span className="font-body text-[18px] text-dark">

AFTER:
<span className="font-body text-[15px] md:text-[18px] text-dark">
```

Line 71 (Status):
```
BEFORE:
<span className="font-body text-[18px] text-dark">

AFTER:
<span className="font-body text-[15px] md:text-[18px] text-dark">
```

Line 79 (Last Updated):
```
BEFORE:
<span className="font-body text-[18px] text-dark">

AFTER:
<span className="font-body text-[15px] md:text-[18px] text-dark">
```

Line 89 (Built With):
```
BEFORE:
<span className="font-body text-[18px] text-dark">

AFTER:
<span className="font-body text-[15px] md:text-[18px] text-dark">
```

- [ ] **Step 2: Case study action links — reduce mobile font size**

In the same file, change the 3 action links:

Line 100 (GitHub):
```
BEFORE:
className="inline-block font-body text-[20px] font-medium text-terracotta transition-all duration-200 hover:text-terracotta-dark hover:scale-105 origin-right"

AFTER:
className="inline-block font-body text-[16px] md:text-[20px] font-medium text-terracotta transition-all duration-200 hover:text-terracotta-dark hover:scale-105 origin-right"
```

Line 110 (Live demo):
```
BEFORE:
className="inline-block font-body text-[20px] font-medium text-terracotta transition-all duration-200 hover:text-terracotta-dark hover:scale-105 origin-right"

AFTER:
className="inline-block font-body text-[16px] md:text-[20px] font-medium text-terracotta transition-all duration-200 hover:text-terracotta-dark hover:scale-105 origin-right"
```

Line 118 (Process map):
```
BEFORE:
className="inline-block font-body text-[20px] font-medium text-terracotta transition-all duration-200 hover:text-terracotta-dark hover:scale-105 origin-right"

AFTER:
className="inline-block font-body text-[16px] md:text-[20px] font-medium text-terracotta transition-all duration-200 hover:text-terracotta-dark hover:scale-105 origin-right"
```

- [ ] **Step 3: Workflow page intro paragraphs — reduce mobile font size**

In `src/app/projects/saas-renewal-operations/workflow/page.tsx`:

Line 204 (subtitle):
```
BEFORE:
<p className="font-body text-[20px] leading-[1.7] text-charcoal/60 mb-8">

AFTER:
<p className="font-body text-[16px] md:text-[20px] leading-[1.7] text-charcoal/60 mb-8">
```

Line 211 (intro body):
```
BEFORE:
<p className="font-body text-[20px] leading-[1.7] text-charcoal">

AFTER:
<p className="font-body text-[16px] md:text-[20px] leading-[1.7] text-charcoal">
```

- [ ] **Step 4: Verify build succeeds**

Run: `npm run build`
Expected: Build completes with no errors.

- [ ] **Step 5: Visual verification at 375px**

Open any case study page (e.g., `/projects/license-cleanup-agent`). Check:
- Metadata values (Role, Status, etc.) are smaller
- GitHub/demo/process map links are smaller
Navigate to `/projects/saas-renewal-operations/workflow`. Check:
- Subtitle and intro paragraph are smaller
Switch to desktop width and confirm nothing changed.

- [ ] **Step 6: Commit**

```bash
git add src/app/projects/[slug]/page.tsx src/app/projects/saas-renewal-operations/workflow/page.tsx
git commit -m "style(mobile): reduce typography sizes in case study and workflow pages

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4: Typography — Case Study Prose CSS

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Reduce prose base font size on mobile**

In `src/app/globals.css`, change the `.prose-case-study` base rule at line 101 and add a new `@media` block.

Change line 101:
```css
/* BEFORE: */
.prose-case-study {
  font-family: var(--font-body);
  font-size: 20px;
  line-height: 1.7;
  color: var(--color-charcoal);
}

/* AFTER: */
.prose-case-study {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-charcoal);
}

@media (min-width: 768px) {
  .prose-case-study {
    font-size: 20px;
  }
}
```

Place the new `@media` block immediately after the `.prose-case-study` closing brace (after line 104) and before the `.prose-case-study p` rule (line 106).

- [ ] **Step 2: Verify build succeeds**

Run: `npm run build`
Expected: Build completes with no errors.

- [ ] **Step 3: Visual verification at 375px**

Open any case study page. Check:
- All markdown body text is 16px on mobile (noticeably smaller)
- Paragraphs, bold text, links all inherit the smaller size
Switch to desktop width and confirm prose text is still 20px.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "style(mobile): reduce prose case study base font size to 16px on mobile

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5: Layout — About Hobbies Grid & Footer Right Column

**Files:**
- Modify: `src/components/About.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: About hobbies card — reduce mobile left padding**

In `src/components/About.tsx`, line 142:

```
BEFORE:
<div className="bg-dark/[0.03] border border-dark/10 rounded-xl pl-12 pr-6 py-6">

AFTER:
<div className="bg-dark/[0.03] border border-dark/10 rounded-xl pl-6 sm:pl-12 pr-6 py-6">
```

- [ ] **Step 2: About hobbies grid — switch to 2 columns on mobile**

In `src/components/About.tsx`, line 146:

```
BEFORE:
<ul className="grid grid-cols-3 gap-x-10 gap-y-2.5">

AFTER:
<ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-3 sm:gap-x-10 gap-y-2.5">
```

- [ ] **Step 3: Footer right column — stack on mobile**

In `src/components/Footer.tsx`, line 170:

```
BEFORE:
className="grid grid-cols-2 gap-4"

AFTER:
className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
```

- [ ] **Step 4: Verify build succeeds**

Run: `npm run build`
Expected: Build completes with no errors.

- [ ] **Step 5: Visual verification at 375px**

Check About section:
- Hobbies grid shows 2 columns on mobile (items like "Economics and Politics" have room)
- Left padding is reduced (24px instead of 48px)
Check Footer:
- Nav links and social links stack vertically on mobile
Switch to desktop width and confirm all layouts unchanged.

- [ ] **Step 6: Commit**

```bash
git add src/components/About.tsx src/components/Footer.tsx
git commit -m "style(mobile): fix About hobbies grid and Footer column layout for mobile

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 6: Layout — Skills Card Padding, ProjectsOverlay, Metadata Gap, Navbar Menu

**Files:**
- Modify: `src/components/Skills.tsx`
- Modify: `src/components/ProjectsOverlay.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Skills card — reduce mobile padding**

In `src/components/Skills.tsx`, line 437. The full className is long — find `py-6 px-10` within it:

```
BEFORE (within the className):
py-6 px-10 md:py-8 md:px-14

AFTER:
py-5 px-5 sm:px-10 md:py-8 md:px-14
```

The `md:py-8` and `md:px-14` are untouched.

- [ ] **Step 2: ProjectsOverlay header — reduce mobile padding**

In `src/components/ProjectsOverlay.tsx`, line 156:

```
BEFORE:
className="sticky top-0 z-10 bg-warm-sand px-8 md:px-12 pt-8 pb-6 border-b border-dark/5 relative"

AFTER:
className="sticky top-0 z-10 bg-warm-sand px-5 md:px-12 pt-8 pb-6 border-b border-dark/5 relative"
```

- [ ] **Step 3: ProjectsOverlay scroll area — reduce mobile padding and bottom space**

In `src/components/ProjectsOverlay.tsx`, line 174:

```
BEFORE:
className="flex-1 overflow-y-auto px-8 md:px-12 pt-8 pb-[50vh]"

AFTER:
className="flex-1 overflow-y-auto px-5 md:px-12 pt-6 pb-[30vh]"
```

- [ ] **Step 4: Case study metadata gap — tighten on mobile**

In `src/app/projects/[slug]/page.tsx`, line 58:

```
BEFORE:
<div className="flex flex-wrap items-end gap-x-6 sm:gap-x-8 gap-y-3 pb-4 mb-0 border-b border-dark/10">

AFTER:
<div className="flex flex-wrap items-end gap-x-4 sm:gap-x-8 gap-y-3 pb-4 mb-0 border-b border-dark/10">
```

- [ ] **Step 5: Navbar mobile menu — increase link gap**

In `src/components/Navbar.tsx`, line 199:

```
BEFORE:
<div className="px-6 py-5 flex flex-col gap-1">

AFTER:
<div className="px-6 py-5 flex flex-col gap-2">
```

- [ ] **Step 6: Verify build succeeds**

Run: `npm run build`
Expected: Build completes with no errors.

- [ ] **Step 7: Visual verification at 375px**

Check Skills section:
- Cards have less horizontal padding, skill names have more room
Check ProjectsOverlay (click "View all projects"):
- Header and card list have tighter padding, less bottom scroll space
Check any case study page:
- Metadata items (Role, Status, etc.) are spaced closer together
Check Navbar hamburger menu:
- Links have slightly more breathing room between them
Switch to desktop width and confirm nothing changed.

- [ ] **Step 8: Commit**

```bash
git add src/components/Skills.tsx src/components/ProjectsOverlay.tsx src/app/projects/[slug]/page.tsx src/components/Navbar.tsx
git commit -m "style(mobile): fix padding and spacing in Skills, Overlay, metadata, and navbar menu

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 7: Interaction Fixes — Hover Scale, Touch Targets, Table Overflow

**Files:**
- Modify: `src/components/Skills.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Skills hover scale — reduce on mobile**

In `src/components/Skills.tsx`, line 446. Find `hover:scale-[1.12]` within the className:

```
BEFORE (within the className):
hover:scale-[1.12] origin-left

AFTER:
hover:scale-[1.04] sm:hover:scale-[1.12] origin-left
```

- [ ] **Step 2: Mobile TOC — improve touch targets**

In `src/app/projects/[slug]/page.tsx`, line 155:

```
BEFORE:
<ul className="space-y-1">

AFTER:
<ul className="space-y-0">
```

Line 160 — add `py-1.5` to the anchor:

```
BEFORE:
className="flex items-center gap-2 font-body text-[13px] text-muted hover:text-dark transition-colors duration-200"

AFTER:
className="flex items-center gap-2 font-body text-[13px] text-muted hover:text-dark transition-colors duration-200 py-1.5"
```

- [ ] **Step 3: Prose tables — add mobile horizontal scroll**

In `src/app/globals.css`, add the following block after the `.prose-case-study tbody td` rule (after the table cell styling, around line 220):

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

- [ ] **Step 4: Verify build succeeds**

Run: `npm run build`
Expected: Build completes with no errors.

- [ ] **Step 5: Visual verification at 375px**

Check Skills section:
- Tap a skill item — it should scale up only slightly (4% instead of 12%)
Check any case study page with a table (e.g., license-cleanup-agent):
- Table should be horizontally scrollable, not overflowing the page
Check case study mobile TOC:
- Links should have more vertical padding, easier to tap
Switch to desktop width and confirm nothing changed.

- [ ] **Step 6: Commit**

```bash
git add src/components/Skills.tsx src/app/projects/[slug]/page.tsx src/app/globals.css
git commit -m "style(mobile): fix hover scale, touch targets, and table overflow on mobile

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 8: Section Spacing — Tighten Vertical Rhythm

**Files:**
- Modify: `src/components/Projects.tsx`
- Modify: `src/components/Skills.tsx`
- Modify: `src/components/About.tsx`
- Modify: `src/app/projects/saas-renewal-operations/workflow/page.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Projects section — tighten mobile spacing**

In `src/components/Projects.tsx`, line 98:

```
BEFORE:
className="bg-warm-sand flex flex-col scroll-mt-16 pt-12 pb-20 md:pt-16 md:pb-28"

AFTER:
className="bg-warm-sand flex flex-col scroll-mt-16 pt-10 pb-16 md:pt-16 md:pb-28"
```

- [ ] **Step 2: Skills section — tighten mobile spacing**

In `src/components/Skills.tsx`, line 412:

```
BEFORE:
className="bg-white min-h-[calc(85vh-54px)] flex flex-col scroll-mt-16 pt-12 pb-20 md:pt-16 md:pb-28"

AFTER:
className="bg-white min-h-[calc(85vh-54px)] flex flex-col scroll-mt-16 pt-10 pb-16 md:pt-16 md:pb-28"
```

- [ ] **Step 3: About section — tighten mobile spacing**

In `src/components/About.tsx`, line 59:

```
BEFORE:
className="bg-warm-sand min-h-[calc(85vh-54px)] flex flex-col pt-12 pb-20 md:pt-16 md:pb-28 origin-center"

AFTER:
className="bg-warm-sand min-h-[calc(85vh-54px)] flex flex-col pt-10 pb-16 md:pt-16 md:pb-28 origin-center"
```

- [ ] **Step 4: Workflow page — tighten mobile spacing**

In `src/app/projects/saas-renewal-operations/workflow/page.tsx`, line 185:

```
BEFORE:
<article id="case-study" className="bg-warm-sand pt-12 pb-20 md:pt-16 md:pb-28">

AFTER:
<article id="case-study" className="bg-warm-sand pt-10 pb-16 md:pt-16 md:pb-28">
```

- [ ] **Step 5: Footer — tighten mobile top zone spacing**

In `src/components/Footer.tsx`, line 135:

```
BEFORE:
<div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">

AFTER:
<div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-24">
```

- [ ] **Step 6: Verify build succeeds**

Run: `npm run build`
Expected: Build completes with no errors.

- [ ] **Step 7: Visual verification at 375px**

Scroll through the entire homepage at 375px. Check:
- Sections feel slightly tighter vertically — less scroll distance between them
- Visual rhythm is consistent across all sections
- No section feels cramped
Navigate to workflow page and check the same.
Switch to desktop width and confirm all spacing is unchanged.

- [ ] **Step 8: Commit**

```bash
git add src/components/Projects.tsx src/components/Skills.tsx src/components/About.tsx src/app/projects/saas-renewal-operations/workflow/page.tsx src/components/Footer.tsx
git commit -m "style(mobile): tighten section spacing for compact mobile scroll

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 9: Final Verification

- [ ] **Step 1: Full build check**

Run: `npm run build`
Expected: Build completes with no errors.

- [ ] **Step 2: Lint check**

Run: `npm run lint`
Expected: No linting errors.

- [ ] **Step 3: Full mobile walkthrough at 375px**

Run `npm run dev` and open Chrome DevTools at 375px (iPhone SE). Walk through every page:

1. **Homepage:** Hero → scroll to Projects → Skills → About → Footer
   - All text is noticeably smaller than desktop
   - Hobbies grid shows 2 columns
   - Footer links stack vertically
   - Skills card padding is comfortable
2. **Projects overlay:** Click "View all projects"
   - Cards have tighter padding
   - Less empty space at bottom of scroll
3. **Case study:** Navigate to `/projects/license-cleanup-agent`
   - Metadata values are smaller
   - Action links are smaller
   - Prose body text is 16px
   - Tables scroll horizontally (if any on this page)
   - Mobile TOC links have good touch targets
4. **Workflow:** Navigate to `/projects/saas-renewal-operations/workflow`
   - Intro text is smaller
   - Section spacing is tighter
5. **No horizontal scrollbar** on any page

- [ ] **Step 4: Desktop regression check**

Switch to 1200px+ width. Walk through the same pages:
- All text, spacing, and layouts look identical to before the changes
- No visual differences from the pre-change state

- [ ] **Step 5: Push**

```bash
git push
```
