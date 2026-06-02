"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
  enableTilt?: boolean;
  /* If true, card grows slightly on hover (default true) */
  enableLift?: boolean;
}

/**
 * Advanced glassmorphism card with:
 *  - frosted backdrop blur
 *  - holographic edge glow
 *  - mouse-tracked light reflection
 *  - 3D tilt on hover
 *  - animated scan line
 */
export default function GlassCard({
  children,
  className = "",
  glowColor = "#ff1744",
  intensity = 1,
  enableTilt = true,
  enableLift = true,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position tracked for reflection + tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothed values
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // 3D tilt
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  // Reflection position
  const reflectionX = useTransform(smoothX, [-0.5, 0.5], ["0%", "100%"]);
  const reflectionY = useTransform(smoothY, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      whileHover={enableLift ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Outer holographic glow halo */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${reflectionX.get()} ${reflectionY.get()}, ${glowColor}55, transparent 40%)`,
          filter: "blur(20px)",
        }}
      />

      {/* The glass card itself */}
      <div
        className="relative rounded-2xl overflow-hidden h-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: isHovered
            ? `0 20px 60px rgba(0,0,0,0.4), 0 0 60px ${glowColor}33, inset 0 0 30px rgba(255,255,255,0.03)`
            : `0 12px 40px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.02)`,
          transition: "box-shadow 0.5s ease",
        }}
      >
        {/* Mouse-tracked reflection */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [smoothX, smoothY] as any,
              ([x, y]: number[]) =>
                `radial-gradient(400px circle at ${(x + 0.5) * 100}% ${
                  (y + 0.5) * 100
                }%, rgba(255,255,255,0.12), transparent 50%)`
            ),
          }}
        />

        {/* Top edge highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
        />

        {/* Side neon edges (visible on hover) */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent, ${glowColor}, transparent)`,
            boxShadow: `0 0 10px ${glowColor}`,
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent, ${glowColor}, transparent)`,
            boxShadow: `0 0 10px ${glowColor}`,
          }}
        />

        {/* Animated scan line on hover */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ mixBlendMode: "screen" }}
        >
          <div
            className="absolute left-0 right-0 h-[2px] animate-scan-line"
            style={{
              background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
              boxShadow: `0 0 12px ${glowColor}`,
            }}
          />
        </div>

        {/* Holographic dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, ${glowColor} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full" style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
