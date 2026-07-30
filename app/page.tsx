"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import ScrollOverlay from "@/components/ScrollOverlay";
import HUDOverlay, { ThemeMode } from "@/components/HUDOverlay";
import PortfolioModal from "@/components/PortfolioModal";
import { PortfolioItem } from "@/lib/data";
import { audioEngine } from "@/lib/AudioEngine";
import Lenis from "lenis";

const IglooCanvas = dynamic(() => import("@/components/IglooCanvas"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050507] text-white font-mono">
      <div className="w-12 h-12 border-2 border-[#ff1744] border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_25px_#ff1744]" />
      <div className="text-xs tracking-widest text-[#ff4d8d] animate-pulse">
        INITIALIZING JENESIS WEBGL ENGINE...
      </div>
    </div>
  ),
});

const STAGES = 9;
const LOOP_VH = STAGES * 100; // 900vh per loop block

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);
  const [soundActive, setSoundActive] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");

  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number>(0);
  const isResettingRef = useRef(false);
  const oneLoopPxRef = useRef<number>(0);

  const handleToggleSound = useCallback(() => {
    const newState = audioEngine.toggleSound();
    setSoundActive(newState);
  }, []);

  const handleToggleTheme = useCallback(() => {
    audioEngine.playClickSound();
    setThemeMode((prev) => {
      let next: ThemeMode = "dark";
      if (prev === "dark") next = "light";
      else if (prev === "light") next = "cyberpunk";
      else next = "dark";

      const root = document.documentElement;
      root.classList.remove("dark", "light", "cyberpunk");
      root.classList.add(next);
      return next;
    });
  }, []);

  const handleNavigateToSection = useCallback((index: number) => {
    if (!lenisRef.current || !oneLoopPxRef.current) return;
    const baseOffset = oneLoopPxRef.current; // Navigate within middle loop buffer
    const targetPx = baseOffset + (index / STAGES) * oneLoopPxRef.current + 5;
    lenisRef.current.scrollTo(targetPx, { duration: 1.2 });
  }, []);

  useEffect(() => {
    const measure = () => {
      oneLoopPxRef.current = (LOOP_VH / 100) * window.innerHeight;
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    // Start at middle loop block (oneLoopPx) so scrolling up is immediately enabled
    const oneLoop = oneLoopPxRef.current;
    if (oneLoop > 0) {
      lenis.scrollTo(oneLoop, { immediate: true });
    }

    const onScroll = (e: { scroll: number }) => {
      if (isResettingRef.current) return;

      const loop = oneLoopPxRef.current;
      if (loop <= 0) return;

      const raw = e.scroll;

      // Downward infinite loop teleportation (bottom -> top)
      if (raw >= loop * 2 - 10) {
        isResettingRef.current = true;
        lenis.scrollTo(raw - loop, { immediate: true });
        requestAnimationFrame(() => { isResettingRef.current = false; });
        return;
      }

      // Upward infinite loop teleportation (above top of Hero -> wrap to bottom Contact)
      if (raw <= 10) {
        isResettingRef.current = true;
        lenis.scrollTo(raw + loop, { immediate: true });
        requestAnimationFrame(() => { isResettingRef.current = false; });
        return;
      }

      // Continuous normalized progress calculation [0.0 to 1.0)
      const offset = ((raw % loop) + loop) % loop;
      const normalized = offset / loop;

      setScrollProgress(normalized);
      audioEngine.updateScrollPitch(normalized);
    };

    lenis.on("scroll", onScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("resize", measure);
      lenis.destroy();
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <main className="relative selection:bg-[#ff1744] selection:text-white transition-colors duration-500">
      {/* ── Fixed WebGL 3D Canvas ─────────────────────────────── */}
      <IglooCanvas
        scrollProgress={scrollProgress}
        themeMode={themeMode}
        onSelectPortfolio={(item) => setSelectedPortfolio(item)}
      />

      {/* ── igloo-style Text Overlay Panels ──────────────────── */}
      <ScrollOverlay scrollProgress={scrollProgress} />

      {/* ── HUD Telemetry (right dot navbar + theme + sound) ─── */}
      <HUDOverlay
        scrollProgress={scrollProgress}
        soundActive={soundActive}
        themeMode={themeMode}
        onToggleSound={handleToggleSound}
        onToggleTheme={handleToggleTheme}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* ── Portfolio Modal ───────────────────────────────────── */}
      <PortfolioModal
        item={selectedPortfolio}
        onClose={() => setSelectedPortfolio(null)}
      />

      {/* ── 3-Loop Buffer height drivers for 360° bi-directional infinite scroll ───── */}
      <div style={{ height: `${LOOP_VH}vh` }} aria-hidden="true" />
      <div style={{ height: `${LOOP_VH}vh` }} aria-hidden="true" />
      <div style={{ height: `${LOOP_VH}vh` }} aria-hidden="true" />
    </main>
  );
}
