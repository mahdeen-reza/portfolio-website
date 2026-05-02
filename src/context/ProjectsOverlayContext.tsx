"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

interface ProjectsOverlayContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const ProjectsOverlayContext = createContext<ProjectsOverlayContextValue | null>(null);

function OpenFromSearchParam({ open }: { open: () => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("projects") === "open") {
      const url = new URL(window.location.href);
      url.searchParams.delete("projects");
      window.history.replaceState(history.state, "", url.toString());

      const timer = setTimeout(() => open(), 100);
      return () => clearTimeout(timer);
    }
  }, [searchParams, open]);

  return null;
}

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
      <Suspense fallback={null}>
        <OpenFromSearchParam open={open} />
      </Suspense>
      {children}
    </ProjectsOverlayContext>
  );
}

export function useProjectsOverlay() {
  const ctx = useContext(ProjectsOverlayContext);
  if (!ctx) throw new Error("useProjectsOverlay must be used within ProjectsOverlayProvider");
  return ctx;
}
