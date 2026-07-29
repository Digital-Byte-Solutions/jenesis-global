"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* ----------------------------------------------------
 * High-Performance Inertial Smooth Scroll (Lenis)
 * - Lightweight lerp for 60 FPS smooth momentum scroll
 * - Zero CSS variable mutations on scroll to prevent repaints
 * - Respects prefers-reduced-motion
 * --------------------------------------------------*/
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      anchors: { offset: -76 },
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
