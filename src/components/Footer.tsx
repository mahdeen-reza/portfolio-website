"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  fadeUpSubtle,
  fadeIn,
  staggerContainer,
  EASE_SMOOTH,
} from "@/lib/animations";

const NAV_LINKS = [
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mahdeenreza/" },
  { label: "GitHub", href: "https://github.com/mahdeen-reza" },
];

function ExternalLinkIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block ml-1.5"
      aria-hidden="true"
    >
      <path
        d="M4 1.5h8.5V10M12.5 1.5L1.5 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Animated Clock ── */

interface TimeParts {
  hour: string;
  minute: string;
  period: string;
}

function AnimatedDigit({ digit }: { digit: string }) {
  return (
    <span
      className="relative inline-block overflow-hidden"
      style={{ width: "0.62em", height: "1.2em" }}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={digit}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: EASE_SMOOTH }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function AnimatedClock({ timeParts }: { timeParts: TimeParts }) {
  return (
    <span className="inline-flex items-center">
      {/* Hour digits */}
      {timeParts.hour.split("").map((d, i) => (
        <AnimatedDigit key={`h${i}`} digit={d} />
      ))}

      {/* Blinking colon */}
      <span
        className="inline-block"
        style={{ animation: "blink-cursor 1s step-end infinite" }}
      >
        :
      </span>

      {/* Minute digits */}
      {timeParts.minute.split("").map((d, i) => (
        <AnimatedDigit key={`m${i}`} digit={d} />
      ))}

      {/* Period + timezone */}
      <span className="ml-1">
        {timeParts.period} EST 🇨🇦
      </span>
    </span>
  );
}

/* ── Footer ── */

export default function Footer() {
  const [timeParts, setTimeParts] = useState<TimeParts | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Toronto",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const update = () => {
      const parts = formatter.formatToParts(new Date());
      setTimeParts({
        hour: parts.find((p) => p.type === "hour")?.value ?? "",
        minute: parts.find((p) => p.type === "minute")?.value ?? "",
        period: parts.find((p) => p.type === "dayPeriod")?.value ?? "",
      });
    };

    update();
    const interval = setInterval(update, 1_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="contact" className="bg-dark">
      {/* Top Zone */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-12 lg:gap-8"
        >
          {/* Left column — contact content */}
          <div>
            <motion.h2
              variants={fadeUpSubtle}
              className="font-display font-semibold text-[clamp(28px,4vw,48px)] tracking-[-0.03em] leading-[1.05] text-white mb-4"
            >
              Let&apos;s talk.
            </motion.h2>
            <motion.p
              variants={fadeUpSubtle}
              className="font-body text-[17px] md:text-[23px] leading-[1.7] text-white/70 mb-6"
            >
              Open to conversations about AI, SaaS, Product, and the future of
              operations work.
            </motion.p>
            <motion.a
              variants={fadeUpSubtle}
              href="mailto:mahdeen.amin@gmail.com"
              className="font-body text-[20px] md:text-[26px] text-terracotta transition-colors duration-200 hover:text-terracotta-hover"
            >
              mahdeen.amin@gmail.com
            </motion.a>
          </div>

          {/* Right column — nav tabs + socials */}
          <motion.div
            variants={fadeUpSubtle}
            className="grid grid-cols-2 gap-4"
          >
            {/* Nav tabs */}
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body text-[17px] md:text-[23px] text-white/70 transition-colors duration-200 hover:text-terracotta whitespace-nowrap select-none"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[17px] md:text-[23px] text-terracotta transition-colors duration-200 hover:text-terracotta-hover whitespace-nowrap select-none"
                >
                  {link.label}
                  <ExternalLinkIcon />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-6">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 text-center sm:text-left"
        >
          <p className="font-body text-xs text-white/70">
            &copy; {new Date().getFullYear()} Mahdeen Reza
          </p>
          <p className="font-body text-xs text-white/70 sm:text-center">
            Last updated May 2026
          </p>
          <p className="font-body text-[16px] md:text-[23px] text-white/70 sm:text-right">
            {timeParts && <AnimatedClock timeParts={timeParts} />}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
