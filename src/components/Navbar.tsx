"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/animations";

const NAV_LINKS = [
  { label: "PROJECTS", href: "/projects" },
  { label: "SKILLS", href: "/#skills" },
  { label: "ABOUT", href: "/#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-3 items-center h-18">
        {/* Logo */}
        <Link
          href="/"
          className="justify-self-start bg-dark text-cream rounded-none px-4.5 py-2 font-display font-semibold text-[18px] tracking-[-0.02em] transition-colors duration-200 hover:bg-charcoal"
        >
          Mahdeen Reza Amin
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10 justify-self-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative font-body text-[16px] font-medium text-dark/70 tracking-[0.04em] transition-colors duration-200 hover:text-dark"
            >
              {link.label}
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-terracotta transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/#contact"
          className="hidden md:block justify-self-end bg-warm text-dark font-body text-[16px] font-medium tracking-[0.04em] px-4.5 py-2 rounded-lg transition-colors duration-200 hover:bg-terracotta-dark hover:text-cream"
        >
          CONNECT
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden justify-self-end flex flex-col justify-center items-center w-11 h-11 -mr-1.5 gap-1.5"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-5 h-[1.5px] bg-dark transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-dark transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-dark transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="md:hidden overflow-hidden bg-cream border-b border-border"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
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
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="font-body text-[16px] font-medium text-dark tracking-[0.04em] bg-warm px-4.5 py-2 rounded-lg transition-colors duration-200 hover:bg-terracotta-dark hover:text-cream mt-2"
              >
                CONNECT
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
