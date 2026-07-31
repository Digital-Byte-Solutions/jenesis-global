"use client";

import { useState, useEffect } from "react";
import { audioEngine } from "@/lib/AudioEngine";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Approach", href: "#approach" },
    { label: "Proof", href: "#proof" },
    { label: "Services", href: "#services" },
    { label: "Why Jenesis", href: "#why" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-500 ${
        scrolled ? "pt-2" : "pt-4"
      }`}
    >
      <div
        className={`flex items-center justify-between w-full max-w-6xl px-5 py-2.5 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-black/90 border-white/15 backdrop-blur-xl shadow-[0_0_30px_rgba(255,23,68,0.15)]"
            : "bg-black/70 border-white/10 backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 shrink-0"
          onMouseEnter={() => audioEngine.playHoverSound()}
          onClick={() => audioEngine.playClickSound()}
        >
          {/* Icon */}
          <div className="w-7 h-7 rounded-full border-2 border-[#ff1744] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#ff1744] shadow-[0_0_8px_#ff1744]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-extrabold tracking-[0.2em] text-white font-mono">
              JENESIS
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#ff4d8d] font-mono font-bold">
              GLOBAL
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => audioEngine.playHoverSound()}
              onClick={() => audioEngine.playClickSound()}
              className="text-[12px] text-gray-300 hover:text-white font-sans transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onMouseEnter={() => audioEngine.playHoverSound()}
            onClick={() => audioEngine.playClickSound()}
            className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-[#ff1744] hover:bg-[#ff4d8d] text-white text-[12px] font-bold tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(255,23,68,0.4)] hover:shadow-[0_0_30px_rgba(255,23,68,0.6)]"
          >
            Book a call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white"
          >
            <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 rounded-2xl bg-black/95 border border-white/15 backdrop-blur-xl p-4 flex flex-col gap-3 md:hidden">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => { setMenuOpen(false); audioEngine.playClickSound(); }}
              className="text-[13px] text-gray-300 hover:text-white font-sans py-2 border-b border-white/10 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => { setMenuOpen(false); audioEngine.playClickSound(); }}
            className="mt-2 text-center px-5 py-2.5 rounded-full bg-[#ff1744] text-white text-[13px] font-bold"
          >
            Book a call →
          </a>
        </div>
      )}
    </nav>
  );
}
