"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border border-accent/30 border-t-accent animate-spin" />
    </div>
  ),
});

const TRUST_LOGOS = ["Helix", "Aurora", "Nimbus", "Obsidian", "Vanta", "Zenith"];

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        className="ambient-glow top-[10%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,45,85,0.18) 0%, transparent 60%)",
        }}
      />
      <div
        className="ambient-glow bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,77,141,0.10) 0%, transparent 60%)",
        }}
      />
      <div className="noise" />

      <div className="container-wide relative">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-10"
        >
          <div className="pill pill-accent">
            <span className="live-dot" />
            <span>AI ecosystem · v3.1.4 · live</span>
          </div>
        </motion.div>

        {/* Hero text — centered, balanced */}
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-display-2xl mb-8 gradient-text"
          >
            Intelligent solutions.
            <br />
            <span className="font-serif italic font-normal text-white/90">
              Global impact.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-12"
          >
            We engineer next-generation AI ecosystems, hyperscale cloud
            infrastructure, and premium digital experiences for enterprises
            ready to define the next decade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a href="#contact" className="btn btn-primary px-7 py-3.5">
              Launch your ecosystem
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M5 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#services" className="btn btn-secondary px-7 py-3.5">
              Explore capabilities
            </a>
          </motion.div>
        </div>

        {/* 3D scene panel — contained below text, NOT overlapping */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 lg:mt-24 relative"
        >
          {/* Hero visual frame */}
          <div className="relative mx-auto max-w-5xl aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2/1] rounded-3xl overflow-hidden glass-strong">
            {/* The 3D scene */}
            <div className="absolute inset-0">
              <Scene />
            </div>

            {/* HUD overlays on the scene */}
            <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg/60 backdrop-blur-md border border-white/10">
              <span className="live-dot" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                Neural.core / online
              </span>
            </div>

            <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg/60 backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                v3.1.4
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg/60 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                  Powered by Arclane OS
                </span>
              </div>

              {/* Mini stats inside the hero card */}
              <div className="hidden sm:flex items-center gap-5">
                {[
                  { v: "240+", k: "Clients" },
                  { v: "1.4K", k: "Models" },
                  { v: "99.99%", k: "Uptime" },
                ].map((s) => (
                  <div key={s.k} className="text-right">
                    <div className="text-base font-medium text-white tabular leading-none">
                      {s.v}
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-white/40 mt-1">
                      {s.k}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle scan line gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, transparent 70%, rgba(0,0,0,0.4) 100%)",
              }}
            />
          </div>

          {/* Floating glow behind card */}
          <div
            className="absolute inset-x-10 -bottom-10 h-32 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,45,85,0.4) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </motion.div>

        {/* Trusted by row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 lg:mt-24"
        >
          <p className="text-center text-[11px] font-mono uppercase tracking-[0.25em] text-white/40 mb-6">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            {TRUST_LOGOS.map((logo) => (
              <span
                key={logo}
                className="text-lg font-serif italic text-white/50 hover:text-white/90 transition-colors cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/30"
      >
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
