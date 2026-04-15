"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { markPreloaderDone } from "@/lib/usePreloaderDone";

export default function Preloader() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"fade-in" | "exit">("fade-in");

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";
    setShow(true);

    // Phase 1: fade-in (1.0s) → Phase 2: exit slide-up (1.8s)
    const exitTimer = setTimeout(() => setPhase("exit"), 1000);
    // Trigger hero animations 0.5s into exit (overlay ~30% moved, content starts revealing)
    const heroTimer = setTimeout(() => markPreloaderDone(), 1000 + 500);
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 1000 + 1800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(heroTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-cream flex items-center justify-center"
          animate={
            phase === "exit"
              ? { y: "-100%" }
              : { y: 0 }
          }
          transition={
            phase === "exit"
              ? { duration: 1.8, ease: [0.45, 0, 0.15, 1] }
              : undefined
          }
        >
          <motion.h1
            className="font-display font-bold text-[clamp(36px,10vw,110px)] tracking-[-0.03em] text-dark text-center whitespace-nowrap px-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO }}
          >
            Mahdeen Reza Amin
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
