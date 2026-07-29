"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import HUDOverlay from "@/components/HUDOverlay";
import PortfolioModal from "@/components/PortfolioModal";
import FooterSection from "@/components/FooterSection";
import { PortfolioItem } from "@/lib/data";
import { audioEngine } from "@/lib/AudioEngine";
import Lenis from "lenis";

// Dynamically import Canvas component with SSR disabled for optimal WebGL performance
const IglooCanvas = dynamic(() => import("@/components/IglooCanvas"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] text-white font-mono">
      <div className="w-12 h-12 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_20px_#00f0ff]" />
      <div className="text-xs tracking-widest text-[#00f0ff] animate-pulse">
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

  // Initialize smooth scroll & scroll progress tracker
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function onScroll(e: { progress: number }) {
      setScrollProgress(e.progress);
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
    <main className="relative bg-[#07090e] text-white min-h-screen selection:bg-[#00f0ff] selection:text-black">
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

      {/* Scrollable Height Canvas (500vh to accommodate all 6 visual stages smoothly!) */}
      <div ref={scrollContainerRef} className="relative z-10 w-full">
        {/* Stage 1: Core Hero Section */}
        <section className="h-screen w-full flex items-center justify-center pointer-events-none">
          {/* Subtle hero overlay if needed */}
        </section>

        {/* Stage 2: Deconstruction / Explosion */}
        <section className="h-screen w-full pointer-events-none" />

        {/* Stage 3: Crystalline Portfolio Monoliths */}
        <section className="h-screen w-full pointer-events-none" />

        {/* Stage 4: Particle Hologram Pedestal */}
        <section className="h-screen w-full pointer-events-none" />

        {/* Stage 5: Spherical Ring Portal & Strategic Consultation Footer */}
        <section className="min-h-screen w-full relative z-20">
          <FooterSection />
        </section>
      </div>
    </main>
  );
}
