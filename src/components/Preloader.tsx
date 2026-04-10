"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/animations";

const SESSION_KEY = "preloader-shown";

export default function Preloader() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"fade-in" | "hold" | "exit">("fade-in");

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    // Lock scroll during preloader
    document.body.style.overflow = "hidden";
    setShow(true);

    // Phase 1: fade-in (0.6s) → Phase 2: hold (0.8s) → Phase 3: exit (0.5s)
    const holdTimer = setTimeout(() => setPhase("hold"), 600);
    const exitTimer = setTimeout(() => {
      setPhase("exit");
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 600 + 800);
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 600 + 800 + 500);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
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
              ? { duration: 0.5, ease: EASE_OUT_EXPO }
              : undefined
          }
        >
          <motion.h1
            className="font-display font-semibold text-[clamp(28px,5vw,48px)] tracking-[-0.03em] text-dark"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            Mahdeen Reza
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
