"use client";

import { motion, type Variants } from "motion/react";
import { fadeUp } from "@/lib/animations";

interface ScrollRevealProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}

export default function ScrollReveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  as = "div",
}: ScrollRevealProps) {
  const Component = motion.create(as);

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </Component>
  );
}
