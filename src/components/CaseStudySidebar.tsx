"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import {
  slideFromLeft,
  fadeUpSubtle,
  staggerContainer,
} from "@/lib/animations";
import { toAnchorId, type CaseStudySection } from "@/lib/projects";

interface CaseStudySidebarProps {
  techStack: string[];
  sections: CaseStudySection[];
  fileTree?: string;
  scrollContainerId?: string;
  techStackFooter?: string;
}

export default function CaseStudySidebar({
  techStack,
  sections,
  fileTree,
  scrollContainerId,
  techStackFooter,
}: CaseStudySidebarProps) {
  const [activeId, setActiveId] = useState("");
  const [progress, setProgress] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = document.querySelector("[data-case-study-header]");
    const aside = document.querySelector(
      "[data-case-study-aside]",
    ) as HTMLElement | null;
    if (!header || !aside) return;

    const update = () => {
      const stickyTop = header.getBoundingClientRect().bottom + 4;
      aside.style.top = `${stickyTop}px`;
      const scrollWrapper = aside.querySelector(
        "[data-sidebar-scroll]",
      ) as HTMLElement | null;
      if (scrollWrapper) {
        scrollWrapper.style.maxHeight = `calc(100vh - ${stickyTop + 16}px)`;
      }
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    const aside = document.querySelector(
      "[data-case-study-aside]",
    ) as HTMLElement | null;
    if (!footer || !aside) return;

    aside.style.transition = "transform 0.5s ease-out";

    const observer = new IntersectionObserver(
      ([entry]) => {
        aside.style.transform = entry.isIntersecting
          ? "translateY(calc(-100% - 300px))"
          : "";
      },
      { threshold: 0 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const getScrollContainer = useCallback(() => {
    if (scrollContainerId) {
      return document.getElementById(scrollContainerId);
    }
    return null;
  }, [scrollContainerId]);

  useEffect(() => {
    const container = getScrollContainer();
    const sectionIds = sections.map((s) => toAnchorId(s.heading));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: container,
        rootMargin: "-20px 0px -66%",
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections, getScrollContainer]);

  useEffect(() => {
    const container = getScrollContainer();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (container) {
          const total = container.scrollHeight - container.clientHeight;
          const scrolled = container.scrollTop;
          setProgress(total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0);
        } else {
          const total = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = window.scrollY;
          setProgress(total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0);
        }
        ticking = false;
      });
    };

    const target = container || window;
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [getScrollContainer]);

  const scrollToId = (id: string) => {
    const container = getScrollContainer();
    const el = document.getElementById(id);
    if (!el) return;

    if (container) {
      const offsetTop = el.offsetTop - container.offsetTop;
      container.scrollTo({ top: offsetTop - 24, behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    const container = getScrollContainer();
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div ref={sidebarRef} className="relative pl-3 pb-8">
      {/* Reading progress indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-dark/20 rounded-full">
        <motion.div
          className="w-full bg-terracotta rounded-full origin-top"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {/* Tech Stack */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="pb-4 mb-4 border-b border-dark/10"
      >
        <motion.h4
          variants={slideFromLeft}
          className="font-body text-[11px] uppercase tracking-[0.1em] text-muted mb-3"
        >
          Tech Stack
        </motion.h4>
        <ul className="space-y-1.5">
          {techStack.map((item) => (
            <motion.li
              key={item}
              variants={fadeUpSubtle}
              className="font-body text-[14px] text-charcoal"
            >
              {item}
            </motion.li>
          ))}
        </ul>
        {techStackFooter && (
          <motion.p
            variants={fadeUpSubtle}
            className="font-body text-[13px] italic text-muted mt-3 pt-3 border-t border-dark/10"
          >
            {techStackFooter}
          </motion.p>
        )}
      </motion.div>

      {/* Table of Contents */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className={fileTree ? "pb-4 mb-4 border-b border-dark/10" : ""}
      >
        <motion.h4
          variants={slideFromLeft}
          className="font-body text-[11px] uppercase tracking-[0.1em] text-muted mb-3"
        >
          Contents
        </motion.h4>
        <nav aria-label="Table of contents">
          <ul className="space-y-1.5">
            {sections.map((section, i) => {
              const id = toAnchorId(section.heading);
              const isActive = activeId === id;
              return (
                <motion.li key={section.heading} variants={fadeUpSubtle}>
                  <button
                    type="button"
                    onClick={() => scrollToId(id)}
                    className={`flex items-start gap-2 py-0.5 text-[13px] font-body transition-colors duration-200 border-l-2 pl-2 text-left w-full select-none ${
                      isActive
                        ? "text-terracotta font-medium border-terracotta"
                        : "text-muted hover:text-dark border-transparent"
                    }`}
                  >
                    <span className="text-muted/60 font-mono text-[11px] mt-[2px] shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-[1.4]">{section.heading}</span>
                  </button>
                </motion.li>
              );
            })}
            <motion.li variants={fadeUpSubtle}>
              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-2 py-0.5 pl-2 text-[12px] font-body text-muted/50 hover:text-muted transition-colors duration-200 border-l-2 border-transparent mt-2 select-none"
              >
                &uarr; Back to top
              </button>
            </motion.li>
          </ul>
        </nav>
      </motion.div>

      {/* File Tree */}
      {fileTree && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h4
            variants={slideFromLeft}
            className="font-body text-[11px] uppercase tracking-[0.1em] text-muted mb-3"
          >
            Project Structure
          </motion.h4>
          <motion.pre
            variants={fadeUpSubtle}
            className="font-mono text-[11px] leading-[1.6] text-charcoal/60 whitespace-pre select-none"
          >
            {fileTree}
          </motion.pre>
        </motion.div>
      )}
    </div>
  );
}
