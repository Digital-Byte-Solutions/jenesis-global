"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import ScrollOverlay from "@/components/ScrollOverlay";
import HUDOverlay from "@/components/HUDOverlay";
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
const LOOP_VH = STAGES * 100; // 900vh per loop

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);
  const [soundActive, setSoundActive] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number>(0);
  const isResettingRef = useRef(false);
  const oneLoopPxRef = useRef<number>(0);

  const handleToggleSound = useCallback(() => {
    const newState = audioEngine.toggleSound();
    setSoundActive(newState);
  }, []);

  const handleNavigateToSection = useCallback((index: number) => {
    if (!lenisRef.current || !oneLoopPxRef.current) return;
    const targetPx = (index / STAGES) * oneLoopPxRef.current + 5;
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

    const onScroll = (e: { scroll: number }) => {
      if (isResettingRef.current) return;

      const oneLoop = oneLoopPxRef.current;
      const raw = e.scroll;

      if (raw >= oneLoop && oneLoop > 0) {
        isResettingRef.current = true;
        lenis.scrollTo(raw - oneLoop, { immediate: true });
        requestAnimationFrame(() => { isResettingRef.current = false; });
        return;
      }

      const normalized = oneLoop > 0 ? Math.min(raw / oneLoop, 1) : 0;
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
    <main className="relative bg-[#050507] text-white selection:bg-[#ff1744] selection:text-white">
      {/* ── Fixed WebGL 3D Canvas ─────────────────────────────── */}
      <IglooCanvas
        scrollProgress={scrollProgress}
        onSelectPortfolio={(item) => setSelectedPortfolio(item)}
      />

      {/* ── igloo-style Text Overlay Panels ──────────────────── */}
      <ScrollOverlay scrollProgress={scrollProgress} />

      {/* ── HUD Telemetry (right dot navbar + sound toggle) ───── */}
      <HUDOverlay
        scrollProgress={scrollProgress}
        soundActive={soundActive}
        onToggleSound={handleToggleSound}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* ── Portfolio Modal ───────────────────────────────────── */}
      <PortfolioModal
        item={selectedPortfolio}
        onClose={() => setSelectedPortfolio(null)}
      />

      {/* ── Infinite Scroll height drivers ───────────────────── */}
      <div style={{ height: `${LOOP_VH}vh` }} aria-hidden="true" />
      <div style={{ height: `${LOOP_VH}vh` }} aria-hidden="true" />
    </main>
  );
}
