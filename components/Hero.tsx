"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

// Three.js scene must be dynamically imported with ssr: false
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-arc-black"
    >
      {/* Layer 0 — Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      {/* Layer 1 — Radial ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(255,23,68,0.25) 0%, rgba(255,77,141,0.12) 30%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Layer 2 — Three.js scene */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: sceneScale, opacity: sceneOpacity }}
      >
        <Scene />
      </motion.div>

      {/* Layer 3 — Noise + vignette */}
      <div className="noise-overlay" />
      <div className="vignette" />

      {/* Layer 4 — Top status bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-5 flex items-center justify-between text-xs font-mono text-white/60 tracking-widest">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-arc-red animate-pulse shadow-[0_0_10px_#ff1744]" />
          <span>ARCLANE.AI / SYSTEM ONLINE</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden md:flex gap-6"
        >
          <span>v3.1.4</span>
          <span>NEURAL_CORE: ACTIVE</span>
          <span>LAT 24.7136° N</span>
        </motion.div>
      </div>

      {/* Layer 5 — Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute top-14 left-0 right-0 z-20 px-6 md:px-12 py-5"
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

      {/* Layer 6 — Main headline */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center items-center px-6 md:px-12 text-center pointer-events-none"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-8 flex items-center gap-4 text-xs font-mono tracking-[0.4em] text-white/50"
        >
          <span className="w-12 h-px bg-arc-red" />
          ARCLANE GLOBAL — AI ECOSYSTEM 2026
          <span className="w-12 h-px bg-arc-red" />
        </motion.div>

        {/* Headline */}
        <h1 className="font-display font-light leading-[0.95] tracking-[-0.04em] mb-8">
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="block text-6xl md:text-8xl lg:text-[9rem] text-white"
          >
            INTELLIGENT
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="block text-6xl md:text-8xl lg:text-[9rem] holo-text italic font-normal"
          >
            SOLUTIONS.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-6xl md:text-8xl lg:text-[9rem] text-white"
          >
            GLOBAL <span className="text-arc-red neon-glow">IMPACT.</span>
          </motion.div>
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-2xl text-base md:text-lg text-white/60 font-light leading-relaxed mb-12"
        >
          Engineering next-generation{" "}
          <span className="text-white">AI ecosystems</span>, hyperscale{" "}
          <span className="text-white">cloud infrastructure</span>, enterprise
          transformation, and{" "}
          <span className="text-white">premium digital engineering</span> —
          where futuristic innovation meets cinematic execution.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center gap-5 pointer-events-auto"
        >
          <button className="group relative liquid-button px-8 py-4 rounded-full font-mono text-sm tracking-widest text-white overflow-hidden">
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

          <button className="group px-8 py-4 rounded-full font-mono text-sm tracking-widest text-white/80 hover:text-white border border-white/15 hover:border-white/40 transition-all backdrop-blur-sm bg-white/[0.02]">
            <span className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-arc-red animate-pulse" />
              EXPLORE CAPABILITIES
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Layer 7 — Bottom metrics strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 py-8 border-t border-white/5 backdrop-blur-md bg-black/20"
      >
        <div className="flex flex-wrap items-center justify-between gap-8">
          {[
            { label: "GLOBAL CLIENTS", value: "240+" },
            { label: "AI MODELS DEPLOYED", value: "1.4K" },
            { label: "CLOUD UPTIME", value: "99.99%" },
            { label: "COUNTRIES SERVED", value: "37" },
          ].map((metric, i) => (
            <div key={metric.label} className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-[0.3em] text-white/40">
                — {metric.label}
              </span>
              <span className="metric-number text-2xl md:text-3xl text-white">
                {metric.value}
              </span>
            </div>
          ))}

          {/* Scroll indicator */}
          <div className="hidden md:flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-white/40">
            <span>SCROLL</span>
            <div className="w-px h-10 bg-gradient-to-b from-arc-red to-transparent relative overflow-hidden">
              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 h-4 bg-arc-red"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
