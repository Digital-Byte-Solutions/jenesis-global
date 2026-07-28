"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandMark from "./BrandMark";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Approach", href: "#approach" },
  { label: "Proof", href: "#proof" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Active section scroll observer
    const sectionElements = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 flex justify-center ${
          scrolled
            ? "py-3 px-4"
            : "py-5 px-6"
        }`}
      >
        <div className={`container-wide flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-surface/85 backdrop-blur-2xl border border-line-strong rounded-full px-5 py-2 shadow-2xl shadow-black/30 max-w-6xl"
            : "w-full"
        }`}>
          {/* Logo — Jenesis emphasized, Global subdued */}
          <a href="#" className="flex items-center gap-3 group">
            <BrandMark size={30} />
            <span className="flex flex-col leading-none">
              <span className="wordmark text-[15px]">Jenesis</span>
              <span className="wordmark-sub text-[8px] mt-1">Global</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 bg-surface border border-line rounded-full px-2 py-1.5 shadow-sm relative">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-[12px] font-medium transition-colors rounded-full relative z-10 ${
                    isActive ? "text-ink font-semibold" : "text-body hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-accent/15 border border-accent/40 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            <a
              href="#contact"
              className="hidden sm:inline-flex btn btn-primary !py-2 !px-4 text-[13px]"
            >
              Book a call
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M4.5 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* Mobile menu toggle */}
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center"
            >
              <div className="relative w-4 h-3">
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-ink transition-all ${
                    open ? "rotate-45 top-1.5" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-1.5 h-px bg-ink transition-opacity ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-ink transition-all ${
                    open ? "-rotate-45 bottom-1.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-bg/95 backdrop-blur-2xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative pt-24 px-6"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-3xl font-medium tracking-tight text-ink border-b border-line"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full justify-center mt-8 py-4"
              >
                Start a project
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
