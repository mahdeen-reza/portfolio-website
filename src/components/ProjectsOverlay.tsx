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
        className="group cursor-pointer flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-terracotta/10 select-none"
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
            <p className="font-body text-[16px] md:text-[20px] leading-[1.6] text-muted">
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
            className="fixed top-0 right-0 bottom-0 z-[60] w-full md:w-[55vw] bg-warm-sand border-l-2 border-terracotta/20 shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="All projects"
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 bg-warm-sand px-8 md:px-12 pt-8 pb-6 border-b border-dark/5 relative">
              <button
                ref={closeButtonRef}
                onClick={close}
                className="inline-block font-body text-[13px] font-medium text-terracotta transition-colors duration-200 hover:text-terracotta-dark hover:underline mb-4 select-none"
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
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 md:px-12 pt-8 pb-[50vh]">
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
