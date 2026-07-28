"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* ----------------------------------------------------
 * Premium inertial scrolling (Lenis).
 * - eases wheel/touch scrolling so sections arrive in stages
 * - handles #anchor links with the same easing
 * - disabled entirely for prefers-reduced-motion users
 * --------------------------------------------------*/
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      anchors: { offset: -72 }, // clear the fixed header
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
