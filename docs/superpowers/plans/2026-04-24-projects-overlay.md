# Projects Overlay Panel — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the standalone `/projects` page with a slide-in overlay panel triggered from the homepage, creating an integrated browsing experience with scroll-linked zoom/fade animations.

**Architecture:** Portal-based overlay component rendered via `createPortal` to `document.body`. A React context provider (`ProjectsOverlayContext`) at the layout level enables both the Navbar and the homepage Projects section to trigger the overlay. The overlay uses `motion/react` for slide-in/backdrop animations and `useScroll`/`useTransform` for the scroll-linked zoom+fade effect on cards.

**Tech Stack:** Next.js (App Router), React 19, motion/react v12+, Tailwind CSS v4

**Spec:** `docs/superpowers/specs/2026-04-24-projects-overlay-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/context/ProjectsOverlayContext.tsx` | React context: `isOpen` state, `open()`, `close()` methods |
| Create | `src/components/ProjectsOverlay.tsx` | Portal-based overlay: backdrop, panel, sticky header, scroll progress, card list with zoom/fade |
| Modify | `src/app/layout.tsx` | Wrap with `ProjectsOverlayProvider`, render `<ProjectsOverlay />` |
| Modify | `src/components/Projects.tsx` | "View all projects" button calls `open()` instead of `<Link>` |
| Modify | `src/components/Navbar.tsx` | "PROJECTS" link triggers scroll+open choreography |
| Modify | `src/app/projects/[slug]/page.tsx` | Update back link from `/projects` → `/`, text "Back to home" |
| Modify | `next.config.ts` | Add redirect `/projects` → `/` |
| Delete | `src/app/projects/page.tsx` | Remove standalone projects listing page |

---

## Task 1: Create ProjectsOverlayContext

**Files:**
- Create: `src/context/ProjectsOverlayContext.tsx`

- [ ] **Step 1: Create the context file**

```tsx
// src/context/ProjectsOverlayContext.tsx
"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import type { ReactNode } from "react";

interface ProjectsOverlayContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const ProjectsOverlayContext = createContext<ProjectsOverlayContextValue | null>(null);

export function ProjectsOverlayProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    setIsOpen(true);
    window.history.pushState({ overlayOpen: true }, "");
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  return (
    <ProjectsOverlayContext value={{ isOpen, open, close, triggerRef }}>
      {children}
    </ProjectsOverlayContext>
  );
}

export function useProjectsOverlay() {
  const ctx = useContext(ProjectsOverlayContext);
  if (!ctx) throw new Error("useProjectsOverlay must be used within ProjectsOverlayProvider");
  return ctx;
}
```

- [ ] **Step 2: Verify no lint errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors referencing `ProjectsOverlayContext.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/context/ProjectsOverlayContext.tsx
git commit -m "feat: add ProjectsOverlayContext for overlay state management"
```

---

## Task 2: Create ProjectsOverlay component

> **Note:** The spec suggested reusing `ProjectCard` with a `compact` prop. However, `ProjectCard` is tightly coupled to `<Link>` navigation. The overlay needs `onClick → close → delay → router.push` behavior. Rather than refactoring `ProjectCard` (which the user wants untouched), the overlay implements its own `ZoomCard` with the compact card layout (title, description, tags, CTA — no screenshot/impact) and the scroll-linked zoom/fade effect built in.

**Files:**
- Create: `src/components/ProjectsOverlay.tsx`

This is the core component — portal-based overlay with backdrop, slide-in panel, sticky header with scroll progress, and scroll-linked zoom/fade on each card.

- [ ] **Step 1: Create the overlay component**

```tsx
// src/components/ProjectsOverlay.tsx
"use client";

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useRouter } from "next/navigation";
import { useProjectsOverlay } from "@/context/ProjectsOverlayContext";
import { projects } from "@/lib/projects";
import { EASE_OUT_EXPO, EASE_SMOOTH } from "@/lib/animations";
import type { Project } from "@/lib/projects";

function ZoomCard({ project, container }: { project: Project; container: React.RefObject<HTMLElement | null> }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { close } = useProjectsOverlay();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    container,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  const tags = project.cardTags ?? project.tags;

  const handleClick = useCallback(() => {
    close();
    setTimeout(() => {
      router.push(`/projects/${project.slug}`);
    }, 300);
  }, [close, router, project.slug]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="will-change-transform"
    >
      <div
        onClick={handleClick}
        className="group cursor-pointer flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-terracotta/10"
        role="link"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") handleClick(); }}
      >
        {/* Folder tab */}
        <div className="self-start inline-block bg-dark/[0.06] border border-dark/15 border-b-0 rounded-t-lg px-5 py-1.5 transition-all duration-300 group-hover:bg-terracotta/[0.06] group-hover:border-terracotta/30">
          <span className="font-body text-[11px] font-medium uppercase tracking-[0.06em] text-muted">
            {project.status}
          </span>
        </div>

        {/* Card body */}
        <div className="flex-1 border border-dark/15 bg-dark/[0.06] rounded-xl rounded-tl-none p-5 md:p-6 flex flex-col transition-all duration-300 group-hover:bg-terracotta/[0.04] group-hover:border-terracotta/30">
          <div className="flex flex-col gap-3">
            <h3 className="font-display font-semibold text-[clamp(24px,3vw,34px)] tracking-[-0.02em] text-dark">
              {project.name}
            </h3>
            <p className="font-body text-[20px] leading-[1.6] text-muted">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-[13px] font-medium text-terracotta bg-terracotta/15 border border-terracotta/30 px-3 py-1.5 rounded-md transition-colors duration-200 hover:bg-terracotta/25"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 flex justify-end">
            <span className="font-body text-[16px] font-medium text-terracotta tracking-[0.02em] transition-all duration-300 group-hover:text-terracotta-dark group-hover:scale-105 group-hover:translate-x-1 origin-right">
              Read case study <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ScrollProgress({ container }: { container: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ container });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-dark/5">
      <motion.div className="h-full bg-terracotta" style={{ width }} />
    </div>
  );
}

export default function ProjectsOverlay() {
  const { isOpen, close } = useProjectsOverlay();
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    const onPopState = () => {
      if (isOpen) close();
    };
    window.addEventListener("popstate", onPopState);

    setTimeout(() => closeButtonRef.current?.focus(), 500);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPopState);
    };
  }, [isOpen, close]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[60] bg-dark/60"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="fixed top-0 right-0 bottom-0 z-[60] w-full md:w-[55vw] bg-cream border-l-2 border-terracotta/20 shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="All projects"
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 bg-cream px-8 md:px-12 pt-8 pb-6 border-b border-dark/5 relative">
              <button
                ref={closeButtonRef}
                onClick={close}
                className="inline-block font-body text-[13px] font-medium text-terracotta transition-colors duration-200 hover:text-terracotta-dark hover:underline mb-4"
              >
                &larr; Close
              </button>
              <h2 className="font-display font-bold text-[clamp(38px,5.5vw,72px)] uppercase tracking-[-0.03em] text-terracotta -mb-1">
                Projects
              </h2>
              <h3 className="font-display font-bold text-[clamp(26px,3.5vw,34px)] tracking-[-0.02em] text-dark">
                All Projects
              </h3>
              <ScrollProgress container={scrollRef} />
            </div>

            {/* Scrollable card list */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 md:px-12 py-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
                  },
                }}
                className="flex flex-col gap-6"
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.slug}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.4, ease: EASE_SMOOTH },
                      },
                    }}
                  >
                    <ZoomCard project={project} container={scrollRef} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors referencing `ProjectsOverlay.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectsOverlay.tsx
git commit -m "feat: add ProjectsOverlay component with slide-in panel and zoom scroll"
```

---

## Task 3: Wire context and overlay into root layout

**Files:**
- Modify: `src/app/layout.tsx`

The root layout is a Server Component. The `ProjectsOverlayProvider` is a client component. We import and wrap — Next.js handles the boundary automatically since the provider has `"use client"`.

- [ ] **Step 1: Update layout.tsx**

In `src/app/layout.tsx`, add the imports after the existing imports:

```tsx
import { ProjectsOverlayProvider } from "@/context/ProjectsOverlayContext";
import ProjectsOverlay from "@/components/ProjectsOverlay";
```

Then wrap the `<body>` contents with the provider and add the overlay. Change the body from:

```tsx
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
```

to:

```tsx
      <body>
        <ProjectsOverlayProvider>
          <Navbar />
          {children}
          <Footer />
          <ProjectsOverlay />
        </ProjectsOverlayProvider>
      </body>
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: wire ProjectsOverlayProvider and overlay into root layout"
```

---

## Task 4: Update Projects section "View all" button

**Files:**
- Modify: `src/components/Projects.tsx`

Replace the `<Link href="/projects">` button with a `<button>` that calls `open()` from the context.

- [ ] **Step 1: Replace the Link with a button and add context**

In `src/components/Projects.tsx`, add the overlay context import:

```tsx
import { useProjectsOverlay } from "@/context/ProjectsOverlayContext";
```

Inside the component function body, after the destructuring of props, add:

```tsx
  const { open, triggerRef } = useProjectsOverlay();
```

Then replace the "View all projects" `<Link>` block (the `{preview && (...)}` section, lines 143-159). Change:

```tsx
        {preview && (
          <motion.div
            variants={fadeUpSubtle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-4 flex justify-end"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-terracotta text-cream font-body text-[16px] font-medium tracking-[0.04em] px-6 py-2.5 rounded-lg transition-colors duration-200 hover:bg-terracotta-dark w-full justify-center lg:w-auto"
            >
              View all projects
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>
        )}
```

to:

```tsx
        {preview && (
          <motion.div
            variants={fadeUpSubtle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-4 flex justify-end"
          >
            <button
              ref={triggerRef as React.RefObject<HTMLButtonElement>}
              onClick={open}
              className="inline-flex items-center gap-2 bg-terracotta text-cream font-body text-[16px] font-medium tracking-[0.04em] px-6 py-2.5 rounded-lg transition-colors duration-200 hover:bg-terracotta-dark w-full justify-center lg:w-auto cursor-pointer"
            >
              View all projects
              <span aria-hidden="true">&rarr;</span>
            </button>
          </motion.div>
        )}
```

- [ ] **Step 3: Clean up unused imports**

Since the `showBackLink` prop used `Link` for the back link, check if `Link` is still needed. The `showBackLink` feature is only used by the projects page which we'll delete. But to keep this component clean, remove the `showBackLink` prop and its associated JSX, and also remove the `Link` import if no longer needed.

Remove the `showBackLink` prop from the interface and destructuring:

Change:
```tsx
interface ProjectsProps {
  preview?: boolean;
  showBackLink?: boolean;
}

export default function Projects({
  preview = false,
  showBackLink = false,
}: ProjectsProps) {
```

to:

```tsx
interface ProjectsProps {
  preview?: boolean;
}

export default function Projects({
  preview = false,
}: ProjectsProps) {
```

Remove the back link JSX block (lines 99-106):

```tsx
        {/* Back link (projects page only) */}
        {showBackLink && (
          <Link
            href="/"
            className="inline-block font-body text-[13px] font-medium text-terracotta transition-colors duration-200 hover:text-terracotta-dark mb-6"
          >
            &larr; Back to home
          </Link>
        )}
```

Remove the entire block above.

Now remove the `Link` import from the top of the file:

```tsx
import Link from "next/link";
```

Remove this line.

- [ ] **Step 4: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: wire View All Projects button to overlay context"
```

---

## Task 5: Update Navbar with scroll+open choreography

**Files:**
- Modify: `src/components/Navbar.tsx`

The "PROJECTS" link needs to scroll to `#projects` and then open the overlay with overlapping timing.

- [ ] **Step 1: Add imports and context hook**

Add the overlay context import to `src/components/Navbar.tsx`:

```tsx
import { useProjectsOverlay } from "@/context/ProjectsOverlayContext";
```

Inside the `Navbar` component function, add after the existing state declarations:

```tsx
  const { open: openOverlay } = useProjectsOverlay();
```

- [ ] **Step 2: Create the scroll+open handler**

Add this handler function inside the `Navbar` component, after the `useProjectsOverlay` call:

```tsx
  const handleProjectsClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setMenuOpen(false);

      const projectsSection = document.getElementById("projects");
      if (!projectsSection) {
        openOverlay();
        return;
      }

      const rect = projectsSection.getBoundingClientRect();
      const isNearby = Math.abs(rect.top) < 200;

      if (isNearby) {
        openOverlay();
      } else {
        projectsSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => openOverlay(), 400);
      }
    },
    [openOverlay]
  );
```

- [ ] **Step 3: Update the NAV_LINKS and desktop nav rendering**

Change the `NAV_LINKS` constant from:

```tsx
const NAV_LINKS = [
  { label: "PROJECTS", href: "/projects" },
  { label: "SKILLS", href: "/#skills" },
  { label: "ABOUT", href: "/#about" },
];
```

to:

```tsx
const NAV_LINKS = [
  { label: "PROJECTS", href: "/#projects" },
  { label: "SKILLS", href: "/#skills" },
  { label: "ABOUT", href: "/#about" },
];
```

Then update the desktop nav links rendering (the `.map` block, approximately lines 109-118). Change:

```tsx
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`group relative font-body text-[16px] font-medium tracking-[0.04em] transition-colors duration-500 hover:${textColor} ${textMutedColor}`}
            >
              {link.label}
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-terracotta transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
```

to:

```tsx
          {NAV_LINKS.map((link) => {
            const isProjects = link.label === "PROJECTS";
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={isProjects ? handleProjectsClick : undefined}
                className={`group relative font-body text-[16px] font-medium tracking-[0.04em] transition-colors duration-500 hover:${textColor} ${textMutedColor}`}
              >
                {link.label}
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-terracotta transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
```

- [ ] **Step 4: Update mobile menu links**

Update the mobile menu links similarly (approximately lines 163-172). Change:

```tsx
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-[16px] font-medium text-dark/80 tracking-[0.04em] transition-colors duration-200 hover:text-dark py-2"
                >
                  {link.label}
                </Link>
              ))}
```

to:

```tsx
              {NAV_LINKS.map((link) => {
                const isProjects = link.label === "PROJECTS";
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={isProjects ? handleProjectsClick : () => setMenuOpen(false)}
                    className="font-body text-[16px] font-medium text-dark/80 tracking-[0.04em] transition-colors duration-200 hover:text-dark py-2"
                  >
                    {link.label}
                  </Link>
                );
              })}
```

- [ ] **Step 5: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: navbar PROJECTS link triggers scroll + overlay choreography"
```

---

## Task 6: Update case study back link

**Files:**
- Modify: `src/app/projects/[slug]/page.tsx`

The back link currently points to `/projects` with text "← Back to projects". Since `/projects` is being removed, update to `/` with text "← Back to home".

- [ ] **Step 1: Update the back link**

In `src/app/projects/[slug]/page.tsx`, find (around line 44-49):

```tsx
            <Link
              href="/projects"
              className="inline-block font-body text-[13px] font-medium text-terracotta transition-colors duration-200 hover:text-terracotta-dark mb-2"
            >
              &larr; Back to projects
            </Link>
```

Change to:

```tsx
            <Link
              href="/"
              className="inline-block font-body text-[13px] font-medium text-terracotta transition-colors duration-200 hover:text-terracotta-dark mb-2"
            >
              &larr; Back to home
            </Link>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/projects/\[slug\]/page.tsx
git commit -m "fix: update case study back link from /projects to /"
```

---

## Task 7: Add redirect and remove projects page

**Files:**
- Modify: `next.config.ts`
- Delete: `src/app/projects/page.tsx`

- [ ] **Step 1: Add redirect in next.config.ts**

Replace the contents of `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 2: Delete the projects page**

Run: `rm src/app/projects/page.tsx`

Verify the case study route still exists:

Run: `ls src/app/projects/\[slug\]/page.tsx`
Expected: File exists

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git rm src/app/projects/page.tsx
git commit -m "feat: remove /projects page, add redirect to /"
```

---

## Task 8: Build verification and manual testing

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: No errors

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 3: Start dev server and test all flows**

Run: `npm run dev`

Test the following flows in the browser at `http://localhost:3000`:

1. **Homepage "View all projects" button**: Click the button in the projects section → overlay slides in from right at 55% width, dark backdrop appears, cards stagger in with zoom/fade effect
2. **Navbar "PROJECTS" click**: Click PROJECTS in nav → page scrolls to projects section, overlay opens mid-scroll
3. **Close mechanisms**: Test each:
   - Click "← Close" button in overlay header
   - Click the dark backdrop area
   - Press ESC key
   - Click browser back button
4. **Card navigation**: Click a project card in the overlay → overlay closes → case study page loads at `/projects/[slug]`
5. **Case study back link**: On case study page, "← Back to home" links to `/`
6. **Redirect**: Navigate directly to `/projects` → redirected to `/`
7. **Mobile**: Resize browser below 768px → overlay takes full width
8. **Scroll lock**: When overlay is open, background page should not scroll
9. **Scroll progress**: Scroll within overlay → terracotta progress bar in header fills

- [ ] **Step 4: Fix any issues found during testing**

Address any visual or functional issues discovered.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "polish: fix issues found during overlay testing"
```

(Only if there were fixes to commit. Skip if everything passed.)
