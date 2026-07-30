"use client";

import { Volume2, VolumeX, Sun, Moon, Sparkles } from "lucide-react";
import { audioEngine } from "@/lib/AudioEngine";
import { useState, useEffect } from "react";

export type ThemeMode = "dark" | "light" | "cyberpunk";

interface HUDOverlayProps {
  scrollProgress: number;
  soundActive: boolean;
  themeMode: ThemeMode;
  onToggleSound: () => void;
  onToggleTheme: () => void;
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
  themeMode,
  onToggleSound,
  onToggleTheme,
  onNavigateToSection,
}: HUDOverlayProps) {
  const [, setHoveredSound] = useState(false);
  const [hoveredDotIdx, setHoveredDotIdx] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  const activeSectionIdx = SECTIONS.findIndex(
    (s) => scrollProgress >= s.range[0] && scrollProgress < s.range[1]
  );

  const isHero = scrollProgress < 0.11;
  const isLight = themeMode === "light";

  // Live UTC / Global clock timer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utcString = now.toUTCString().split(" ")[4];
      setCurrentTime(utcString || "12:00:00 UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between p-5 md:p-8 select-none">

      {/* ── TOP BAR (Logo Left, Book a call Right) ───────────────── */}
      <div className="flex items-center justify-between w-full pointer-events-auto z-50">

        {/* Brand Logo inside Liquid Glass Capsule */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToSection(0);
          }}
          onMouseEnter={() => audioEngine.playHoverSound()}
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full liquid-glass-pill hover:scale-105 transition-all cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full border border-[#d10037] flex items-center justify-center shadow-[0_0_12px_rgba(209,0,55,0.4)]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#d10037] shadow-[0_0_8px_#d10037]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className={`text-[12px] font-extrabold tracking-[0.22em] font-mono ${isLight ? "text-[#0e0914]" : "text-white"}`}>
              JENESIS
            </span>
            <span className={`text-[8px] tracking-[0.28em] font-mono font-bold ${isLight ? "text-[#d10037]" : "text-[#ff4d8d]"}`}>
              GLOBAL
            </span>
          </div>
        </a>

        {/* Top-Right Liquid Glass CTA Button */}
        <button
          onClick={() => onNavigateToSection(8)}
          onMouseEnter={() => audioEngine.playHoverSound()}
          className="flex items-center gap-2 px-5 py-2 rounded-full liquid-glass-pill border-[#d10037]/50 bg-gradient-to-r from-[#d10037] to-[#ff2d55] text-white text-[12px] font-bold font-mono tracking-wide transition-all shadow-[0_8px_25px_rgba(209,0,55,0.45)] hover:scale-105 cursor-pointer"
        >
          Book a strategy call
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── Background watermark ─────────────────────────────────── */}
      <div className={`absolute inset-0 z-0 pointer-events-none flex items-center justify-center font-mono text-[80px] md:text-[130px] font-extrabold overflow-hidden whitespace-nowrap blur-sm select-none ${
        isLight ? "opacity-[0.03] text-[#0e0914]" : "opacity-[0.012] text-[#ff1744]"
      }`}>
        JENESIS DATA 2026
      </div>

      {/* ── CENTER crosshair reticle ──────────────────────────── */}
      <div className="absolute top-1/2 left-6 right-16 -translate-y-1/2 flex justify-between items-center opacity-15 pointer-events-none">
        <div className={`w-4 h-4 border-l border-t ${isLight ? "border-[#0e0914]" : "border-[#ff1744]"}`} />
        <div className={`w-4 h-4 border-r border-t ${isLight ? "border-[#0e0914]" : "border-[#ff1744]"}`} />
      </div>

      {/* ── RIGHT VERTICAL NAVBAR (Navigation dots + Morphing Pill) ── */}
      <div className="fixed right-4 md:right-7 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3.5 pointer-events-auto z-40">
        {SECTIONS.map((sec, idx) => {
          const isActive = activeSectionIdx === idx || (activeSectionIdx === -1 && idx === 0);
          const isHovered = hoveredDotIdx === idx;

          return (
            <div key={sec.id} className="relative flex items-center justify-end group cursor-pointer">

              {/* Hover text label (floating left of non-pill dots when hovered) */}
              {(isHero || !isActive) && (
                <div
                  className={`absolute right-7 px-3 py-1 rounded-full liquid-glass-pill text-[10px] font-mono font-bold tracking-widest whitespace-nowrap transition-all duration-200 pointer-events-none ${
                    isLight ? "text-[#0e0914] bg-white/95 border-black/15 shadow-[0_4px_16px_rgba(0,0,0,0.12)]" : "text-white shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                  } ${
                    isHovered ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-2 scale-95"
                  }`}
                >
                  <span className={isLight ? "text-[#d10037] mr-1.5" : "text-[#ff4d8d] mr-1.5"}>{sec.label.split(" // ")[0]}</span>
                  <span>{sec.name}</span>
                </div>
              )}

              {/* Navigation Item: Dot or Floating Pill */}
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
                className="focus:outline-none flex items-center justify-center cursor-pointer transition-all duration-300"
                aria-label={sec.label}
              >
                {!isHero && isActive ? (
                  /* Floating Liquid Glass Pill state */
                  <div className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full liquid-glass-pill text-[10px] font-mono font-bold transition-all duration-300 animate-fadeIn hover:scale-105 ${
                    isLight
                      ? "border-[#d10037] bg-white text-[#0e0914] shadow-[0_8px_25px_rgba(209,0,55,0.25)]"
                      : "border-[#ff1744]/60 text-white shadow-[0_8px_25px_rgba(255,23,68,0.45)]"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLight ? "bg-[#d10037]" : "bg-[#ff1744]"}`} />
                    <span className={isLight ? "text-[#d10037]" : "text-[#ff4d8d]"}>{sec.label.split(" // ")[0]}</span>
                    <span>{sec.name}</span>
                  </div>
                ) : (
                  /* Dot state */
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? isLight
                          ? "w-3.5 h-3.5 bg-[#d10037] shadow-[0_0_12px_#d10037] ring-2 ring-[#d10037]/40"
                          : "w-3.5 h-3.5 bg-[#ff1744] shadow-[0_0_12px_#ff1744] ring-2 ring-[#ff4d8d]/50"
                        : isHovered
                        ? isLight
                          ? "w-2.5 h-2.5 bg-[#d10037] scale-110"
                          : "w-2.5 h-2.5 bg-[#ff4d8d] scale-110"
                        : isLight
                        ? "w-2 h-2 bg-[#0e0914]/50 hover:bg-[#0e0914]/80"
                        : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* ── BOTTOM BAR (Sound + Theme Switcher + Clean Non-Overlapping UTC Clock) ── */}
      <div className="flex flex-wrap items-end justify-between w-full pointer-events-auto z-40 gap-3">

        {/* Bottom-left: controls cluster */}
        <div className="flex flex-col gap-2">
          {scrollProgress < 0.04 && (
            <div className={`flex items-center gap-2 text-[10px] font-mono tracking-widest animate-pulse ${
              isLight ? "text-[#0e0914]/60" : "text-white/40"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-[#d10037]" : "bg-[#ff1744]"}`} />
              Scroll or click dots to navigate
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {/* Sound Toggle Button */}
            <button
              onClick={onToggleSound}
              onMouseEnter={() => { setHoveredSound(true); audioEngine.playHoverSound(); }}
              onMouseLeave={() => setHoveredSound(false)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl liquid-glass-pill text-[11px] font-mono transition-all duration-300 cursor-pointer ${
                isLight ? "text-[#0e0914] bg-white/90 border-black/15 hover:border-[#d10037]" : "text-white/70 border-white/15 hover:border-[#ff1744]"
              }`}
            >
              {soundActive ? <Volume2 size={13} className={isLight ? "text-[#d10037]" : "text-[#ff1744]"} /> : <VolumeX size={13} className="opacity-40" />}
              <span>Sound: {soundActive ? "On" : "Off"}</span>
            </button>

            {/* Theme Switcher Button */}
            <button
              onClick={onToggleTheme}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl liquid-glass-pill text-[11px] font-mono transition-all duration-300 cursor-pointer ${
                isLight ? "text-[#0e0914] bg-white/90 border-black/15 hover:border-[#d10037]" : "text-white/70 border-white/15 hover:border-[#ff4d8d]"
              }`}
            >
              {themeMode === "dark" && <Moon size={13} className="text-[#ff4d8d]" />}
              {themeMode === "light" && <Sun size={13} className="text-amber-500 font-bold" />}
              {themeMode === "cyberpunk" && <Sparkles size={13} className="text-cyan-400 animate-pulse" />}
              <span className="uppercase font-bold">{themeMode} Mode</span>
            </button>

            {/* Compact Telemetry Clock (Merged into controls cluster to prevent card overlap) */}
            <div className={`px-3 py-1.5 rounded-xl liquid-glass-pill text-[9px] font-mono tracking-widest leading-none ${
              isLight ? "text-[#0e0914]/80 bg-white/90 border-black/15" : "text-white/40"
            }`}>
              <span>REYKJAVÍK · {currentTime}</span>
              <span className={`ml-2 font-bold ${isLight ? "text-[#d10037]" : "text-[#ff4d8d]"}`}>SYS // 2.026.4</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
