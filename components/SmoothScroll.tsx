"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* ----------------------------------------------------
 * Premium inertial scrolling (Lenis) with Igloo.inc Scroll Velocity tracking.
 * - Eases wheel/touch scrolling so sections arrive in stages
 * - Calculates scroll velocity & updates --scroll-velocity CSS token for motion effects
 * - Handles #anchor links with offset for fixed glass header
 * - Disabled for prefers-reduced-motion users
 * --------------------------------------------------*/
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easeOut
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      anchors: { offset: -76 }, // Clear fixed glass pill navigation
    });

    // Velocity listener to inject dynamic CSS scroll velocity
    lenis.on("scroll", (e: { velocity: number }) => {
      const velocity = Math.min(Math.max(e.velocity, -15), 15);
      document.documentElement.style.setProperty("--scroll-velocity", `${velocity}`);
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
      document.documentElement.style.removeProperty("--scroll-velocity");
    };
  }, []);

  return null;
}
