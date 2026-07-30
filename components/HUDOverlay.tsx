"use client";

import { Volume2, VolumeX, Sun, Moon, Settings2, X } from "lucide-react";
import { audioEngine } from "@/lib/AudioEngine";
import { useState, useEffect } from "react";

export type ThemeMode = "dark" | "light";

interface HUDOverlayProps {
  scrollProgress: number;
  soundActive: boolean;
  themeMode: ThemeMode;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  onNavigateToSection: (index: number) => void;
}

const SECTIONS = [
  { id: 0, label: "01", name: "Hero",         range: [0.1, 0.2] },
  { id: 1, label: "02", name: "Approach",     range: [0.2, 0.3] },
  { id: 2, label: "03", name: "Services",     range: [0.3, 0.4] },
  { id: 3, label: "04", name: "Proof",        range: [0.4, 0.5] },
  { id: 4, label: "05", name: "Process",      range: [0.5, 0.6] },
  { id: 5, label: "06", name: "Stats",        range: [0.6, 0.7] },
  { id: 6, label: "07", name: "Testimonials", range: [0.7, 0.8] },
  { id: 7, label: "08", name: "FAQ",          range: [0.8, 0.9] },
  { id: 8, label: "09", name: "Contact",      range: [0.9, 1.0] },
];

export default function HUDOverlay({
  scrollProgress,
  soundActive,
  themeMode,
  onToggleSound,
  onToggleTheme,
  onNavigateToSection,
}: HUDOverlayProps) {
  const [hoveredDotIdx, setHoveredDotIdx] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);

  const activeSectionIdx = SECTIONS.findIndex(
    (s) => scrollProgress >= s.range[0] && scrollProgress < s.range[1]
  );

  const isDark = themeMode === "dark";

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().split(" ")[4] + " UTC");
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none">

      {/* ── TOP BAR ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between w-full pointer-events-auto z-50">

        {/* Brand Logo Mark */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); onNavigateToSection(0); }}
          onMouseEnter={() => audioEngine.playHoverSound()}
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl liquid-glass-pill hover:scale-[1.03] transition-all cursor-pointer"
        >
          {/* SVG Logo mark — J + gold orbital arc + constellation + red dot */}
          <svg width="34" height="34" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
            {/* Gold orbital arc — solid main sweep */}
            <path d="M 12 34 A 22 22 0 0 1 50 18" stroke="#c8960c" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.95" />
            {/* Dashed completion arc */}
            <path d="M 12 34 A 22 22 0 1 0 52 46" stroke="#c8960c" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="2.5 4" fill="none" opacity="0.40" />
            {/* Triangle constellation lines */}
            <line x1="23" y1="29" x2="37" y2="29" stroke="#c8960c" strokeWidth="0.9" opacity="0.70" />
            <line x1="23" y1="29" x2="30" y2="20" stroke="#c8960c" strokeWidth="0.9" opacity="0.70" />
            <line x1="37" y1="29" x2="30" y2="20" stroke="#c8960c" strokeWidth="0.9" opacity="0.70" />
            {/* Constellation nodes */}
            <circle cx="23" cy="29" r="1.6" fill="#c8960c" />
            <circle cx="37" cy="29" r="1.6" fill="#c8960c" />
            <circle cx="30" cy="20" r="1.6" fill="#c8960c" />
            {/* J letterform */}
            <path d="M 38 11 L 38 43 Q 38 55 26 55 Q 19 55 17 51" stroke={isDark ? "#c8d8f8" : "#171717"} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="30" y1="11" x2="45" y2="11" stroke={isDark ? "#c8d8f8" : "#171717"} strokeWidth="6.5" strokeLinecap="round" />
            {/* Crimson sweep arc */}
            <path d="M 37 43 Q 48 50 50 38" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.92" />
            {/* Red dot — logo signature */}
            <circle cx="44" cy="7" r="4.5" fill="var(--gold)" />
            <circle cx="44" cy="7" r="7" fill="var(--gold)" opacity="0.18" />
          </svg>

          <div className="flex flex-col leading-tight gap-0.5">
            <span
              className="text-[12px] font-extrabold tracking-[0.20em]"
              style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: isDark ? "#e8e4d8" : "#171717" }}
            >
              JENESIS
            </span>
            <span className="flex items-center gap-1 text-[8px] font-bold tracking-[0.32em]" style={{ color: "#c8960c" }}>
              <span className="block w-3 h-px opacity-60" style={{ background: "#c8960c" }} />
              GLOBAL
              <span className="block w-3 h-px opacity-60" style={{ background: "#c8960c" }} />
            </span>
          </div>
        </a>

        {/* CTA Button */}
        <button
          onClick={() => onNavigateToSection(8)}
          onMouseEnter={() => audioEngine.playHoverSound()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[#171717] text-[11px] font-bold tracking-wide cursor-pointer transition-all hover:scale-105"
          style={{
            fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
            background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)",
            boxShadow: "0 6px 28px var(--shadow-gold)",
          }}
        >
          <span className="hidden sm:inline">Book a strategy call</span><span className="sm:hidden">Book Call</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── RIGHT VERTICAL NAV DOTS ─────────────────────────── */}
      <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3.5 pointer-events-auto z-50">
        {SECTIONS.map((sec, idx) => {
          const isActive = activeSectionIdx === idx;
          const isHov = hoveredDotIdx === idx;

          return (
            <div key={sec.id} className="relative flex items-center justify-end group cursor-pointer">

              {/* Label tooltip */}
              <div
                className="absolute right-7 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest whitespace-nowrap transition-all duration-200 pointer-events-none"
                style={{
                  fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
                  background: isDark ? "rgba(22,30,48,0.92)" : "rgba(255,255,255,0.95)",
                  border: `1px solid ${isDark ? "rgba(200,150,12,0.25)" : "rgba(23,23,23,0.15)"}`,
                  color: isDark ? "#e8e4d8" : "#171717",
                  boxShadow: isDark ? "0 4px 16px rgba(0,0,0,0.4)" : "0 4px 16px rgba(23,23,23,0.10)",
                  opacity: isHov ? 1 : 0,
                  transform: isHov ? "translateX(0)" : "translateX(6px)",
                }}
              >
                <span style={{ color: "#c8960c", marginRight: 4 }}>{sec.label}</span>
                {sec.name}
              </div>

              <button
                onClick={() => { audioEngine.playClickSound(); onNavigateToSection(idx); }}
                onMouseEnter={() => { setHoveredDotIdx(idx); audioEngine.playHoverSound(); }}
                onMouseLeave={() => setHoveredDotIdx(null)}
                className="focus:outline-none flex items-center justify-center cursor-pointer transition-all duration-300"
                aria-label={sec.name}
              >
                {isActive ? (
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold animate-fadeIn"
                    style={{
                      fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
                      background: isDark ? "rgba(22,30,48,0.90)" : "rgba(255,255,255,0.95)",
                      border: "1px solid #c8960c",
                      color: isDark ? "#e8e4d8" : "#171717",
                      boxShadow: `0 4px 16px rgba(200,150,12,0.25)`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--gold)" }} />
                    <span style={{ color: "#c8960c" }}>{sec.label}</span>
                    <span>{sec.name}</span>
                  </div>
                ) : (
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: isHov ? 10 : 6,
                      height: isHov ? 10 : 6,
                      background: isHov ? "#c8960c" : isDark ? "rgba(200,180,140,0.35)" : "rgba(23,23,23,0.30)",
                      boxShadow: isHov ? "0 0 8px rgba(200,150,12,0.6)" : "none",
                    }}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* ── BOTTOM BAR ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-end justify-between w-full pointer-events-auto z-40 gap-2">
        <div className="flex flex-col gap-2">
          {scrollProgress < 0.04 && (
            <div
              className="flex items-center gap-2 text-[10px] font-bold tracking-widest animate-pulse"
              style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: isDark ? "rgba(232,228,216,0.45)" : "rgba(23,23,23,0.50)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#c8960c" }} />
              Scroll or click dots to navigate
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2">
            
            {/* Mobile Toggle Button */}
            <button
              onClick={() => { audioEngine.playClickSound(); setIsMobileControlsOpen(!isMobileControlsOpen); }}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass-pill cursor-pointer transition-all hover:scale-105"
              style={{
                fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
                fontSize: "10px",
                fontWeight: 700,
                color: isDark ? "rgba(232,228,216,0.75)" : "#171717",
              }}
            >
              {isMobileControlsOpen 
                ? <X size={14} style={{ color: "#c8960c" }} /> 
                : <Settings2 size={14} style={{ color: "#c8960c" }} />
              }
              <span>Controls</span>
            </button>

            {/* Actual Controls */}
            <div className={`${isMobileControlsOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row items-start sm:items-center gap-2 animate-fadeIn`}>
              {/* Sound Toggle */}
              <button
                onClick={onToggleSound}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass-pill cursor-pointer transition-all hover:scale-105"
                style={{
                  fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: isDark ? "rgba(232,228,216,0.75)" : "#171717",
                }}
              >
                {soundActive
                  ? <Volume2 size={13} style={{ color: "var(--gold)" }} />
                  : <VolumeX size={13} style={{ opacity: 0.4, color: isDark ? "#e8e4d8" : "#171717" }} />
                }
                <span>Sound: {soundActive ? "On" : "Off"}</span>
              </button>

              {/* Theme Toggle — Light ↔ Dark */}
              <button
                onClick={onToggleTheme}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass-pill cursor-pointer transition-all hover:scale-105"
                style={{
                  fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: isDark ? "rgba(232,228,216,0.75)" : "#171717",
                }}
              >
                {isDark
                  ? <Moon size={13} style={{ color: "#c8960c" }} />
                  : <Sun size={13} style={{ color: "#c8960c" }} />
                }
                <span style={{ color: "#c8960c", fontWeight: 800 }}>
                  {isDark ? "Dark" : "Light"} Mode
                </span>
              </button>

              {/* Telemetry Clock */}
              <div
                className="px-3 py-1.5 rounded-xl liquid-glass-pill text-[9px] font-bold tracking-widest leading-none"
                style={{
                  fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
                  color: isDark ? "rgba(232,228,216,0.45)" : "rgba(23,23,23,0.50)",
                }}
              >
                <span>UTC · {currentTime}</span>
                <span className="ml-2 font-extrabold" style={{ color: "#c8960c" }}>JG·2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}


