"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

/* ----------------------------------------------------
 * High-Performance Magnetic Glow Cursor
 * Throttled position updates & lightweight hover detection
 * --------------------------------------------------*/

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.3 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let ticking = false;

    const moveCursor = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          cursorX.set(e.clientX);
          cursorY.set(e.clientY);
          ticking = false;
        });
        ticking = true;
      }
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el) return;
      const tagName = el.tagName;
      const isInteractive =
        tagName === "A" ||
        tagName === "BUTTON" ||
        tagName === "INPUT" ||
        tagName === "SELECT" ||
        el.classList.contains("glass-card") ||
        el.getAttribute("role") === "button";

      setHovered(!!isInteractive);
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Magnetic Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 1.6 : 1,
          opacity: hovered ? 0.85 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
        className="fixed w-8 h-8 rounded-full border border-accent/60 bg-accent/5 backdrop-blur-[1px] will-change-transform"
      />

      {/* Inner Precision Glowing Dot */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 0.6 : 1,
        }}
        className="fixed w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--accent)] will-change-transform"
      />
    </div>
  );
}
