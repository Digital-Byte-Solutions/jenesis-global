"use client";

import { ReactNode, useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  rounded?: string;
  intensity?: "light" | "medium" | "strong";
  border?: boolean;
  hoverable?: boolean;
}

/**
 * Apple-style Liquid Glass surface
 * (lightweight version — no framer-motion useTransform arrays)
 *
 *  - True backdrop blur with high saturation
 *  - Inner refraction via layered gradients
 *  - CSS-variable based specular highlight that follows the cursor
 *  - Soft inner shadow + bright top edge ("light entry")
 *  - Optional 3D parallax on hover
 */
export default function LiquidGlass({
  children,
  className = "",
  rounded = "rounded-3xl",
  intensity = "medium",
  border = true,
  hoverable = true,
}: LiquidGlassProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mx", `${x}%`);
    ref.current.style.setProperty("--my", `${y}%`);
    // Subtle tilt via CSS vars
    const tx = ((y - 50) / 50) * 3;
    const ty = ((50 - x) / 50) * 3;
    ref.current.style.setProperty("--rx", `${tx}deg`);
    ref.current.style.setProperty("--ry", `${ty}deg`);
  }

  function handleLeave() {
    setHover(false);
    if (!ref.current) return;
    ref.current.style.setProperty("--mx", "50%");
    ref.current.style.setProperty("--my", "50%");
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
  }

  // Intensity presets
  const blurMap = { light: 16, medium: 24, strong: 40 };
  const satMap = { light: 140, medium: 180, strong: 220 };
  const blur = blurMap[intensity];
  const sat = satMap[intensity];

  return (
    <div
      ref={ref}
      className={`relative ${rounded} ${className}`}
      onMouseMove={hoverable ? handleMove : undefined}
      onMouseEnter={() => hoverable && setHover(true)}
      onMouseLeave={hoverable ? handleLeave : undefined}
      style={
        {
          transformStyle: "preserve-3d",
          perspective: "1400px",
          transform:
            "perspective(1400px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          "--mx": "50%",
          "--my": "50%",
        } as React.CSSProperties
      }
    >
      {/* ───── Layer 1: refracted backdrop ───── */}
      <div
        className={`absolute inset-0 ${rounded} overflow-hidden`}
        style={{
          backdropFilter: `blur(${blur}px) saturate(${sat}%) brightness(1.05)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(${sat}%) brightness(1.05)`,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.08) 100%)",
        }}
      />

      {/* ───── Layer 2: inner refraction gradient ───── */}
      <div
        className={`absolute inset-0 ${rounded} pointer-events-none`}
        style={{
          background:
            "radial-gradient(120% 80% at 30% 0%, rgba(255,255,255,0.18) 0%, transparent 50%), radial-gradient(100% 100% at 100% 100%, rgba(255,77,141,0.10) 0%, transparent 60%)",
          mixBlendMode: "screen",
        }}
      />

      {/* ───── Layer 3: cursor-tracked specular highlight ───── */}
      <div
        className={`absolute inset-0 ${rounded} pointer-events-none transition-opacity duration-500`}
        style={{
          opacity: hover ? 1 : 0.4,
          background:
            "radial-gradient(40% 60% at var(--mx) var(--my), rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 35%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* ───── Layer 4: top edge "light entry" ───── */}
      <div
        className={`absolute inset-x-0 top-0 h-px ${rounded} pointer-events-none`}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
        }}
      />

      {/* ───── Layer 5: bottom shadow edge ───── */}
      <div
        className={`absolute inset-x-0 bottom-0 h-px ${rounded} pointer-events-none`}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
        }}
      />

      {/* ───── Layer 6: side micro-bevels ───── */}
      <div
        className="absolute inset-y-3 left-0 w-px pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-y-3 right-0 w-px pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
        }}
      />

      {/* ───── Layer 7: border ring ───── */}
      {border && (
        <div
          className={`absolute inset-0 ${rounded} pointer-events-none`}
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.18), 0 24px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.4)",
          }}
        />
      )}

      {/* ───── Layer 8: hover neon halo ───── */}
      <div
        className={`absolute -inset-px ${rounded} pointer-events-none transition-opacity duration-700`}
        style={{
          opacity: hover ? 1 : 0,
          boxShadow:
            "0 0 60px -10px rgba(255,23,68,0.4), 0 0 0 1px rgba(255,77,141,0.3)",
        }}
      />

      {/* ───── Content (lifted in Z for parallax) ───── */}
      <div
        className={`relative ${rounded}`}
        style={{ transform: "translateZ(40px)" }}
      >
        {children}
      </div>
    </div>
  );
}
