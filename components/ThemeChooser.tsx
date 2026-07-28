"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandMark from "./BrandMark";

/* ----------------------------------------------------
 * First-visit experience chooser:
 * the screen splits — dark slides over one half, light
 * over the other — and the visitor clicks the side they
 * want. The choice persists; a floating wiggle button
 * lets them switch anytime after.
 * --------------------------------------------------*/

const EASE = [0.16, 1, 0.3, 1] as const;

export function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
  window.dispatchEvent(new Event("jenesis-theme"));
}

/* ---------- icons ---------- */
function MoonIcon({ size = 22 }: { size?: number }) {
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

function SunIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------- the split-screen overlay ---------- */
function ChooserOverlay({ onDone }: { onDone: () => void }) {
  const [hovered, setHovered] = useState<null | "dark" | "light">(null);
  const [picked, setPicked] = useState<null | "dark" | "light">(null);
  // Rendered post-mount only, so window is available
  const [vertical] = useState(
    () => window.matchMedia("(max-width: 767px)").matches
  );
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Lock scrolling while the chooser is up
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  const pick = (side: "dark" | "light") => {
    if (picked) return;
    applyTheme(side === "dark");
    setPicked(side);
    setTimeout(onDone, reduced ? 150 : 1150);
  };

  // Hover grows a side; picking expands it to fill, collapsing the other
  const flexFor = (side: "dark" | "light") =>
    picked
      ? picked === side
        ? 30
        : 0.0001
      : hovered === side
      ? 1.35
      : hovered
      ? 0.75
      : 1;

  const slideIn = (side: "dark" | "light") =>
    reduced
      ? { opacity: 1 }
      : vertical
      ? { y: "0%" }
      : { x: "0%" };

  const slideFrom = (side: "dark" | "light") =>
    reduced
      ? { opacity: 0 }
      : vertical
      ? { y: side === "dark" ? "-100%" : "100%" }
      : { x: side === "dark" ? "-100%" : "100%" };

  const halves: {
    side: "dark" | "light";
    bg: string;
    fg: string;
    sub: string;
    accent: string;
    icon: React.ReactNode;
    label: string;
    tagline: string;
  }[] = [
    {
      side: "dark",
      bg: "#050507",
      fg: "#ffffff",
      sub: "rgba(255,255,255,0.55)",
      accent: "#ff4d8d",
      icon: <MoonIcon />,
      label: "Dark",
      tagline: "The signature experience",
    },
    {
      side: "light",
      bg: "#faf9fb",
      fg: "#191322",
      sub: "rgba(25,19,34,0.55)",
      accent: "#e4184a",
      icon: <SunIcon />,
      label: "Light",
      tagline: "Clean and luminous",
    },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col md:flex-row overflow-hidden"
      animate={picked ? { opacity: [1, 1, 0] } : { opacity: 1 }}
      transition={
        picked ? { duration: reduced ? 0.15 : 1.15, times: [0, 0.72, 1] } : {}
      }
      aria-label="Choose your experience"
    >
      {halves.map((h, i) => [
        // Zero-size divider between the halves — the seam and brand badge
        // live here so they track the moving boundary as sides grow/shrink
        i === 1 && (
          <div
            key="divider"
            className="relative z-10 h-0 w-full md:h-auto md:w-0 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: picked ? 0 : 1 }}
              transition={{
                duration: picked ? 0.25 : 0.6,
                delay: picked || reduced ? 0 : 0.7,
              }}
            >
              {/* Seam line */}
              <div
                className="absolute inset-x-0 top-0 h-px md:inset-x-auto md:inset-y-0 md:left-0 md:h-auto md:w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(255,45,85,0.7), transparent)",
                  boxShadow: "0 0 24px rgba(255,45,85,0.5)",
                }}
              />
              {/* Brand badge riding the seam */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-20 h-20 rounded-full bg-[#0a0a0f] border border-white/15 shadow-[0_0_60px_rgba(255,45,85,0.45)]">
                <BrandMark size={40} />
              </div>
            </motion.div>
          </div>
        ),
        <motion.button
          key={h.side}
          onClick={() => pick(h.side)}
          onHoverStart={() => setHovered(h.side)}
          onHoverEnd={() => setHovered(null)}
          initial={slideFrom(h.side)}
          animate={{ ...slideIn(h.side), flex: flexFor(h.side) }}
          transition={{
            x: { duration: 0.85, ease: EASE, delay: h.side === "light" ? 0.08 : 0 },
            y: { duration: 0.85, ease: EASE, delay: h.side === "light" ? 0.08 : 0 },
            opacity: { duration: 0.4 },
            flex: { duration: 0.65, ease: EASE },
          }}
          className="relative flex items-center justify-center min-w-0 min-h-0 overflow-hidden cursor-pointer"
          style={{
            background: h.bg,
            // Depth shadow on the leading edge as the panel slides in
            boxShadow:
              h.side === "dark"
                ? vertical
                  ? "0 16px 56px rgba(0,0,0,0.55)"
                  : "16px 0 56px rgba(0,0,0,0.55)"
                : vertical
                ? "0 -16px 56px rgba(0,0,0,0.35)"
                : "-16px 0 56px rgba(0,0,0,0.35)",
          }}
          aria-label={`Enter the ${h.label.toLowerCase()} experience`}
        >
          {/* Soft accent glow behind the content */}
          <div
            className="absolute w-[60vmin] h-[60vmin] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${
                h.side === "dark"
                  ? "rgba(255,45,85,0.14)"
                  : "rgba(255,45,85,0.08)"
              } 0%, transparent 65%)`,
              filter: "blur(30px)",
            }}
          />

          <motion.div
            animate={{ opacity: picked ? 0 : 1, scale: hovered === h.side ? 1.04 : 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative flex flex-col items-center gap-4 px-8"
          >
            <span
              className="grid place-items-center w-14 h-14 rounded-full border"
              style={{
                color: h.accent,
                borderColor:
                  h.side === "dark"
                    ? "rgba(255,255,255,0.18)"
                    : "rgba(25,19,34,0.18)",
                boxShadow: `0 0 32px ${
                  h.side === "dark"
                    ? "rgba(255,45,85,0.35)"
                    : "rgba(255,45,85,0.18)"
                }`,
              }}
            >
              {h.icon}
            </span>

            <span
              className="text-3xl md:text-4xl font-semibold tracking-[0.28em] uppercase"
              style={{ color: h.fg }}
            >
              {h.label}
            </span>

            <span
              className="text-[11px] font-mono tracking-[0.25em] uppercase"
              style={{ color: h.sub }}
            >
              {h.tagline}
            </span>

            <motion.span
              animate={{ opacity: hovered === h.side ? 1 : 0.45 }}
              className="mt-2 inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.18em] uppercase"
              style={{ color: h.accent }}
            >
              Click to enter
              <span aria-hidden>→</span>
            </motion.span>
          </motion.div>
        </motion.button>,
      ])}

      {/* Prompt pill — screen-centered header */}
      <AnimatePresence>
        {!picked && (
          <motion.div
            className="absolute left-1/2 top-8 pointer-events-none px-5 py-2 rounded-full bg-black/55 border border-white/15 backdrop-blur-md"
            initial={{ opacity: 0, y: -8, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.7 }}
          >
            <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-white/85 whitespace-nowrap">
              Choose your experience
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- floating wiggle toggle ---------- */
function FloatingToggle() {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const sync = () =>
      setDark(document.documentElement.classList.contains("dark"));
    sync();
    setMounted(true);
    window.addEventListener("jenesis-theme", sync);
    return () => window.removeEventListener("jenesis-theme", sync);
  }, []);

  if (!mounted) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.7, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => applyTheme(!dark)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full grid place-items-center bg-surface border border-line-strong text-accent shadow-[0_8px_32px_-8px_rgba(255,45,85,0.45)]"
    >
      {/* Wiggle lives on an inner span so it never fights the button's transforms */}
      <span className="wiggle-periodic">
        {dark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
      </span>
    </motion.button>
  );
}

/* ---------- default export: overlay (first visit) + wiggle button ---------- */
export default function ThemeChooser() {
  // hidden until we know localStorage; open only when no stored choice
  const [phase, setPhase] = useState<"hidden" | "open" | "done">("hidden");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {}
    if (stored) {
      setPhase("done");
      return;
    }
    // Let the visitor land on the dark site and watch the hero settle,
    // then slide the chooser in front of them
    const t = setTimeout(() => setPhase("open"), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {phase === "open" && (
          <ChooserOverlay key="chooser" onDone={() => setPhase("done")} />
        )}
      </AnimatePresence>
      {phase === "done" && <FloatingToggle />}
    </>
  );
}
