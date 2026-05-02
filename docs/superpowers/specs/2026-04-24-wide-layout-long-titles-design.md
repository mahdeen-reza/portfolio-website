# Wide Layout for Long-Title Case Studies

## Problem

The case study pages for "SaaS Renewal Operations" and "SOX Access Review Controls" have titles that wrap to 2+ lines in the sticky header. The title uses `clamp(38px, 5.5vw, 72px)` uppercase Clash Display, which at 72px exceeds the 1600px container width. Since the header is sticky, the extra lines consume vertical viewport space and shrink the scrollable reading area.

The other two case studies ("License Clean-Up Agent", "SaaS License Monitor") fit on one line and should not be affected.

## Solution

Add a `wideLayout` opt-in flag to project data. When set, the page uses a wider container and a reduced title clamp so the title stays on one line at all viewport sizes.

## Changes

### 1. `src/lib/projects.ts` — data flag

- Add `wideLayout?: boolean` to the `Project` interface (line 6-23)
- Set `wideLayout: true` on projects `sox-access-review-controls` and `saas-renewal-operations`

### 2. `src/app/projects/[slug]/page.tsx` — conditional layout

Line 40 — container max-width:
- Default: `max-w-[1600px]`
- When `wideLayout`: `max-w-[1800px]`

Line 52 — title h1 font size:
- Default: `text-[clamp(38px,5.5vw,72px)]`
- When `wideLayout`: `text-[clamp(34px,4.5vw,60px)]`

### Not changed

- `StickyHeader.tsx` — title is rendered in the page component, not here
- Sidebar widths (`lg:w-[280px]`, `xl:w-[300px]`) — unchanged
- Sidebar sticky position (`top-[16.5rem]`) — valid for both layouts since a single-line 60px title produces roughly the same header height as a single-line 72px title on the shorter-titled pages
- Scroll-margin (`scroll-mt-[16.5rem]`) — unchanged for the same reason
- Mobile layout — unaffected; titles already wrap naturally on small screens

## Verification

1. Run `npm run dev` and visit all four case study pages at 1440px and 1920px viewport widths
2. Confirm the two long-title pages show the title on one line at both sizes
3. Confirm the two short-title pages look identical to before
4. Confirm the scrollable content area is taller on the long-title pages compared to before
5. Run `npm run build` to verify no type errors
