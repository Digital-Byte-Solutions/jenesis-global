"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandMark from "./BrandMark";

/* ----------------------------------------------------
 * Theme Engine — 4 Signature Themes:
 * 1. Dark Velvet (Default Signature)
 * 2. Obsidian Noir (Deep Midnight Black)
 * 3. Cyberpunk Crimson (High Contrast Neon)
 * 4. Clean Light (Luminous Minimal)
 * --------------------------------------------------*/

export type ThemeVariant = "dark-velvet" | "obsidian" | "cyberpunk" | "light";

const THEMES: { id: ThemeVariant; label: string; bg: string; accent: string }[] = [
  { id: "dark-velvet", label: "Dark Velvet", bg: "#050507", accent: "#ff2d55" },
  { id: "obsidian", label: "Obsidian Noir", bg: "#000000", accent: "#e4184a" },
  { id: "cyberpunk", label: "Cyberpunk Crimson", bg: "#08000a", accent: "#ff0055" },
  { id: "light", label: "Clean Light", bg: "#faf9fb", accent: "#e4184a" },
];

export function applyThemeVariant(variant: ThemeVariant) {
  const html = document.documentElement;
  html.classList.remove("dark", "theme-obsidian", "theme-cyberpunk");

  if (variant === "dark-velvet") {
    html.classList.add("dark");
  } else if (variant === "obsidian") {
    html.classList.add("dark", "theme-obsidian");
  } else if (variant === "cyberpunk") {
    html.classList.add("dark", "theme-cyberpunk");
  }

  try {
    localStorage.setItem("theme-variant", variant);
    localStorage.setItem("theme", variant === "light" ? "light" : "dark");
  } catch {}

  window.dispatchEvent(new Event("jenesis-theme"));
}

export function applyTheme(dark: boolean) {
  applyThemeVariant(dark ? "dark-velvet" : "light");
}

function MoonIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Persistent 4-Theme Selector Floating Widget */
function FloatingThemeWidget() {
  const [activeTheme, setActiveTheme] = useState<ThemeVariant>("dark-velvet");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const sync = () => {
      const stored = (localStorage.getItem("theme-variant") as ThemeVariant) || "dark-velvet";
      setActiveTheme(stored);
      applyThemeVariant(stored);
    };
    sync();
    setMounted(true);
    window.addEventListener("jenesis-theme", sync);
    return () => window.removeEventListener("jenesis-theme", sync);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mb-3 p-2.5 rounded-2xl bg-surface/95 backdrop-blur-2xl border border-line-strong shadow-2xl shadow-black/40 flex flex-col gap-1.5 min-w-[170px]"
          >
            <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-faint border-b border-line pb-1.5 mb-1">
              Select Palette
            </div>
            {THEMES.map((t) => {
              const selected = activeTheme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    applyThemeVariant(t.id);
                    setActiveTheme(t.id);
                    setMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selected
                      ? "bg-accent/15 text-ink border border-accent/40 font-semibold"
                      : "text-muted hover:text-ink hover:bg-surface/60"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/20"
                      style={{ background: t.accent }}
                    />
                    <span>{t.label}</span>
                  </div>
                  {selected && <span className="text-accent text-[10px]">✓</span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle theme palette menu"
        className="w-12 h-12 rounded-full grid place-items-center bg-surface/90 backdrop-blur-xl border border-line-strong text-accent shadow-[0_8px_32px_-8px_rgba(255,45,85,0.45)] cursor-pointer"
      >
        <MoonIcon size={18} />
      </motion.button>
    </div>
  );
}

export default function ThemeChooser() {
  return <FloatingThemeWidget />;
}
