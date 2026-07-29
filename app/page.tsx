"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import HUDOverlay from "@/components/HUDOverlay";
import PortfolioModal from "@/components/PortfolioModal";
import FooterSection from "@/components/FooterSection";
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

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);
  const [soundActive, setSoundActive] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function onScroll(e: { progress: number }) {
      setScrollProgress(e.progress);
      audioEngine.updateScrollPitch(e.progress);
    }

    lenis.on("scroll", onScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleToggleSound = () => {
    const newState = audioEngine.toggleSound();
    setSoundActive(newState);
  };

  return (
    <main className="relative bg-[#050507] text-white min-h-screen selection:bg-[#ff1744] selection:text-white">
      {/* HUD Telemetry UI Overlay */}
      <HUDOverlay
        scrollProgress={scrollProgress}
        soundActive={soundActive}
        onToggleSound={handleToggleSound}
      />

      {/* 3D WebGL Canvas Engine */}
      <IglooCanvas
        scrollProgress={scrollProgress}
        onSelectPortfolio={(item) => setSelectedPortfolio(item)}
      />

      {/* Interactive Detail Drawer Modal */}
      <PortfolioModal
        item={selectedPortfolio}
        onClose={() => setSelectedPortfolio(null)}
      />

      {/* Scrollable Height Canvas (500vh for smooth 6-stage scroll transitions) */}
      <div ref={scrollContainerRef} className="relative z-10 w-full">
        <section className="h-screen w-full flex items-center justify-center pointer-events-none" />
        <section className="h-screen w-full pointer-events-none" />
        <section className="h-screen w-full pointer-events-none" />
        <section className="h-screen w-full pointer-events-none" />
        <section className="min-h-screen w-full relative z-20">
          <FooterSection />
        </section>
      </div>
    </main>
  );
}
