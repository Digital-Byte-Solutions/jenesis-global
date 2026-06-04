"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Three.js scene — client-only, lazy
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border border-arc-red/30 border-t-arc-red animate-spin" />
    </div>
  ),
});

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-arc-black"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Radial ambient glow on right side (behind 3D scene) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(255,23,68,0.25) 0%, rgba(255,77,141,0.10) 35%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* Noise + vignette */}
      <div className="noise-overlay" />
      <div className="vignette" />

      {/* ───── Top status bar ───── */}
      <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 py-5 flex items-center justify-between text-xs font-mono text-white/60 tracking-widest">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-arc-red animate-pulse shadow-[0_0_10px_#ff1744]" />
          <span>ARCLANE.AI / SYSTEM ONLINE</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:flex gap-6"
        >
          <span>v3.1.4</span>
          <span>NEURAL_CORE: ACTIVE</span>
          <span>LAT 24.71° N</span>
        </motion.div>
      </div>

      {/* ───── Navigation ───── */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-14 left-0 right-0 z-30 px-6 md:px-12 py-5"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-arc-red to-arc-pink animate-pulse-glow" />
              <div className="absolute inset-[2px] rounded-md bg-arc-black flex items-center justify-center">
                <span className="font-display font-bold text-white text-sm">
                  A
                </span>
              </div>
            </div>
            <span className="font-display text-lg tracking-[0.3em] text-white">
              ARCLANE
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden lg:flex items-center gap-10 text-xs font-mono tracking-widest text-white/70">
            {["BRAND", "ENGINEERING", "AI / ML", "CLOUD", "ERP", "CONTACT"].map(
              (item, i) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/[^a-z]/g, "")}`}
                  className="relative hover:text-white transition-colors group"
                >
                  <span className="text-arc-red mr-2">0{i + 1}</span>
                  {item}
                  <span className="absolute -bottom-2 left-0 right-0 h-px bg-arc-red scale-x-0 group-hover:scale-x-100 transition-transform" />
                </a>
              )
            )}
          </div>

          {/* CTA button */}
          <button className="liquid-button px-5 py-2.5 rounded-full text-xs font-mono tracking-widest text-white">
            INITIATE ▸
          </button>
        </div>
      </motion.nav>

      {/* ───── MAIN GRID: text LEFT, 3D scene RIGHT ───── */}
      <div className="relative z-10 min-h-screen pt-32 pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1500px] mx-auto h-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT — text column (NOT inside motion that overlaps 3D) */}
          <div className="lg:col-span-7 relative z-20">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 text-xs font-mono tracking-[0.4em] text-white/50 mb-8">
              <span className="w-12 h-px bg-arc-red" />
              ARCLANE GLOBAL — AI ECOSYSTEM 2026
            </div>

            {/* Headline — static, no scroll animation, just appears */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light leading-[0.95] tracking-[-0.04em] mb-8"
            >
              <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white">
                INTELLIGENT
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl holo-text italic font-normal">
                SOLUTIONS.
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white">
                GLOBAL <span className="text-arc-red neon-glow">IMPACT.</span>
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-xl text-base md:text-lg text-white/65 font-light leading-relaxed mb-10"
            >
              Engineering next-generation{" "}
              <span className="text-white">AI ecosystems</span>, hyperscale{" "}
              <span className="text-white">cloud infrastructure</span>,
              enterprise transformation, and{" "}
              <span className="text-white">premium digital engineering</span> —
              where futuristic innovation meets cinematic execution.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14"
            >
              <button className="group relative liquid-button px-7 py-4 rounded-full font-mono text-sm tracking-widest text-white overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  LAUNCH ECOSYSTEM
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </button>

              <button className="group px-7 py-4 rounded-full font-mono text-sm tracking-widest text-white/80 hover:text-white border border-white/15 hover:border-white/40 transition-all backdrop-blur-sm bg-white/[0.02]">
                <span className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-arc-red animate-pulse" />
                  EXPLORE CAPABILITIES
                </span>
              </button>
            </motion.div>

            {/* Metrics bar (inline, not at bottom) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/8 max-w-xl"
            >
              {[
                { label: "CLIENTS", value: "240+" },
                { label: "AI MODELS", value: "1.4K" },
                { label: "UPTIME", value: "99.99%" },
                { label: "COUNTRIES", value: "37" },
              ].map((m) => (
                <div key={m.label} className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-[0.3em] text-white/40">
                    — {m.label}
                  </span>
                  <span className="metric-number text-2xl text-white">
                    {m.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — 3D scene (its own dedicated column, no text overlap) */}
          <div className="lg:col-span-5 relative h-[400px] sm:h-[500px] lg:h-[700px] w-full">
            <div className="absolute inset-0">
              <Scene />
            </div>

            {/* Floating UI labels around the 3D model (small, glassy) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute top-8 left-0 px-3 py-1.5 rounded-full glass-surface text-[10px] font-mono tracking-widest text-white/70 backdrop-blur-md"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-arc-red animate-pulse" />
                NEURAL.CORE
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute top-20 right-0 px-3 py-1.5 rounded-full glass-surface text-[10px] font-mono tracking-widest text-white/70 backdrop-blur-md"
            >
              v3.1.4
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-surface text-[10px] font-mono tracking-widest text-white/70 backdrop-blur-md whitespace-nowrap"
            >
              <span className="flex items-center gap-3">
                <span>POWERED BY ARCLANE OS</span>
                <span className="text-arc-red">◆</span>
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ───── Bottom scroll indicator ───── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-white/40"
      >
        <span>SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-arc-red to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-4 bg-arc-red"
          />
        </div>
      </motion.div>
    </section>
  );
}
