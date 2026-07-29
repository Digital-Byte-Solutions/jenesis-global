"use client";

import { Volume2, VolumeX } from "lucide-react";
import { audioEngine } from "@/lib/AudioEngine";
import { useState } from "react";

interface HUDOverlayProps {
  scrollProgress: number;
  soundActive: boolean;
  onToggleSound: () => void;
  onNavigateToSection: (index: number) => void;
}

const SECTIONS = [
  { id: 0, label: "01 // HERO",         name: "Hero",         range: [0,    0.11] },
  { id: 1, label: "02 // APPROACH",     name: "Approach",     range: [0.11, 0.22] },
  { id: 2, label: "03 // SERVICES",     name: "Services",     range: [0.22, 0.33] },
  { id: 3, label: "04 // PROOF",        name: "Proof",        range: [0.33, 0.44] },
  { id: 4, label: "05 // PROCESS",      name: "Process",      range: [0.44, 0.55] },
  { id: 5, label: "06 // STATS",        name: "Stats",        range: [0.55, 0.66] },
  { id: 6, label: "07 // TESTIMONIALS", name: "Testimonials", range: [0.66, 0.77] },
  { id: 7, label: "08 // FAQ",          name: "FAQ",          range: [0.77, 0.88] },
  { id: 8, label: "09 // CONTACT",      name: "Contact",      range: [0.88, 1.0]  },
];

export default function HUDOverlay({
  scrollProgress,
  soundActive,
  onToggleSound,
  onNavigateToSection,
}: HUDOverlayProps) {
  const [, setHoveredSound] = useState(false);
  const [hoveredDotIdx, setHoveredDotIdx] = useState<number | null>(null);

  const activeSectionIdx = SECTIONS.findIndex(
    (s) => scrollProgress >= s.range[0] && scrollProgress < s.range[1]
  );

  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between p-5 md:p-8 select-none">

      {/* ── TOP BAR (Clean: Logo Left, Book a call Right) ─────── */}
      <div className="flex items-center justify-between w-full pointer-events-auto">

        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToSection(0);
          }}
          onMouseEnter={() => audioEngine.playHoverSound()}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full border-2 border-[#ff1744] flex items-center justify-center transition-all group-hover:shadow-[0_0_14px_#ff1744]">
            <div className="w-3 h-3 rounded-full bg-[#ff1744] shadow-[0_0_6px_#ff1744] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-extrabold tracking-[0.22em] text-white font-mono drop-shadow-[0_0_10px_rgba(255,23,68,0.7)]">JENESIS</span>
            <span className="text-[9px] tracking-[0.28em] text-[#ff4d8d] font-mono font-bold">GLOBAL</span>
          </div>
        </a>

        {/* Top-Right CTA Button */}
        <button
          onClick={() => onNavigateToSection(8)}
          onMouseEnter={() => audioEngine.playHoverSound()}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff1744]/90 hover:bg-[#ff1744] text-white text-[12px] font-bold font-mono tracking-wide transition-all shadow-[0_0_16px_rgba(255,23,68,0.35)] hover:shadow-[0_0_28px_rgba(255,23,68,0.6)] cursor-pointer"
        >
          Book a call
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── Subtle scan-line watermark ────────────────────────── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center font-mono text-[80px] md:text-[130px] font-extrabold text-[#ff1744] overflow-hidden whitespace-nowrap blur-sm select-none">
        JENESIS DATA 2026
      </div>

      {/* ── CENTER crosshair reticle ──────────────────────────── */}
      <div className="absolute top-1/2 left-6 right-16 -translate-y-1/2 flex justify-between items-center opacity-15 pointer-events-none">
        <div className="w-4 h-4 border-l border-t border-[#ff1744]" />
        <div className="w-4 h-4 border-r border-t border-[#ff1744]" />
      </div>

      {/* ── RIGHT VERTICAL DOT NAVBAR ─────────────────────────── */}
      <div className="fixed right-4 md:right-7 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3.5 pointer-events-auto z-40">
        {SECTIONS.map((sec, idx) => {
          const isActive = activeSectionIdx === idx || (activeSectionIdx === -1 && idx === 0);
          const isHovered = hoveredDotIdx === idx;

          return (
            <div key={sec.id} className="relative flex items-center group cursor-pointer">

              {/* Hover text label (floating left of the dot) */}
              <div
                className={`absolute right-7 px-3 py-1 rounded-md bg-black/90 border border-[#ff1744]/50 backdrop-blur-md text-[10px] font-mono font-bold tracking-widest text-white whitespace-nowrap transition-all duration-200 pointer-events-none shadow-[0_0_12px_rgba(255,23,68,0.4)] ${
                  isHovered ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-2 scale-95"
                }`}
              >
                <span className="text-[#ff4d8d] mr-1.5">{sec.label.split(" // ")[0]}</span>
                <span>{sec.name}</span>
              </div>

              {/* Dot Navigation Button */}
              <button
                onClick={() => {
                  audioEngine.playClickSound();
                  onNavigateToSection(idx);
                }}
                onMouseEnter={() => {
                  setHoveredDotIdx(idx);
                  audioEngine.playHoverSound();
                }}
                onMouseLeave={() => setHoveredDotIdx(null)}
                className="p-1 focus:outline-none flex items-center justify-center"
                aria-label={sec.label}
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-3.5 h-3.5 bg-[#ff1744] shadow-[0_0_12px_#ff1744] ring-2 ring-[#ff4d8d]/50"
                      : isHovered
                      ? "w-2.5 h-2.5 bg-[#ff4d8d] shadow-[0_0_8px_#ff4d8d] scale-110"
                      : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* ── BOTTOM BAR ───────────────────────────────────────── */}
      <div className="flex justify-between items-end w-full pointer-events-auto">

        {/* Bottom-left: scroll cue + sound toggle */}
        <div className="flex flex-col gap-3">
          {scrollProgress < 0.04 && (
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 tracking-widest animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744]" />
              Scroll or click dots to navigate
            </div>
          )}
          <button
            onClick={onToggleSound}
            onMouseEnter={() => { setHoveredSound(true); audioEngine.playHoverSound(); }}
            onMouseLeave={() => setHoveredSound(false)}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/50 border border-white/15 hover:border-[#ff1744] text-[11px] font-mono text-white/50 hover:text-[#ff1744] backdrop-blur-md transition-all duration-300 w-fit cursor-pointer"
          >
            {soundActive ? <Volume2 size={13} className="text-[#ff1744]" /> : <VolumeX size={13} className="text-white/40" />}
            <span>Sound: {soundActive ? "On" : "Off"}</span>
          </button>
        </div>

        {/* Bottom-right: telemetry coordinates */}
        <div className="text-[9px] font-mono text-white/25 tracking-widest text-right leading-relaxed pr-8">
          <div>LAT: 37.7749° N</div>
          <div>LON: 122.4194° W</div>
          <div className="text-[#ff4d8d]/40 font-bold mt-0.5">SYS // 2.026.4</div>
        </div>
      </div>

    </div>
  );
}
