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
