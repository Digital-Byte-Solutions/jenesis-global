"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import LiquidGlass from "./LiquidGlass";

const TESTIMONIALS = [
  {
    quote:
      "Arclane rebuilt our entire AI infrastructure in 90 days. We went from 3 days to 23ms for model inference. The team operates like a tier-1 lab.",
    name: "Dr. Mira Vance",
    role: "CTO, Helix Biotech",
    company: "HELIX",
    accent: "#ff1744",
  },
  {
    quote:
      "The most cinematic, performant interface we have ever shipped. Conversion lifted 312% in the first quarter post-launch. Worth every dollar.",
    name: "Jonas Reiter",
    role: "VP Product, Aurora Capital",
    company: "AURORA",
    accent: "#ff4d8d",
  },
  {
    quote:
      "From ERP migration to brand reinvention — they delivered a cohesive operating system across 14 markets. No other agency could have done this.",
    name: "Anika Sharma",
    role: "Chief Strategy Officer, Nimbus Group",
    company: "NIMBUS",
    accent: "#ff6b9d",
  },
];

const LOGOS = [
  "HELIX",
  "AURORA",
  "NIMBUS",
  "OBSIDIAN",
  "VANTA",
  "ZENITH",
  "NOVA",
  "ECHELON",
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none opacity-50"
        style={{
          top: "20%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(circle, rgba(255,23,68,0.18) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-10 font-mono text-xs tracking-[0.4em] text-white/40"
        >
          <span className="w-12 h-px bg-arc-red" />
          VOICES / TRUSTED BY INDUSTRY LEADERS
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.03em] leading-[1.05] text-white max-w-4xl mb-20"
        >
          The teams building the{" "}
          <span className="holo-text italic font-normal">next economy</span> —
          all run on Arclane.
        </motion.h2>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
            >
              <LiquidGlass intensity="medium" rounded="rounded-2xl">
                <div className="p-8 h-full flex flex-col">
                  {/* Open quote */}
                  <div
                    className="text-6xl font-display leading-none mb-4 select-none"
                    style={{ color: t.accent, opacity: 0.6 }}
                  >
                    "
                  </div>

                  <p className="text-base text-white/85 leading-relaxed mb-8 flex-1">
                    {t.quote}
                  </p>

                  {/* Star rating */}
                  <div className="flex items-center gap-1 mb-5">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <svg
                        key={s}
                        viewBox="0 0 20 20"
                        className="w-3.5 h-3.5"
                        fill={t.accent}
                      >
                        <path d="M10 1l2.7 5.6 6.1.9-4.4 4.3 1 6.1L10 15l-5.5 2.9 1-6.1L1.1 7.5l6.2-.9L10 1z" />
                      </svg>
                    ))}
                  </div>

                  {/* Author block */}
                  <div className="pt-5 border-t border-white/8">
                    <div className="flex items-center gap-3">
                      {/* Avatar gradient orb */}
                      <div
                        className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-display font-bold text-sm text-arc-black"
                        style={{
                          background: `linear-gradient(135deg, ${t.accent}, #ffffff)`,
                          boxShadow: `0 0 16px ${t.accent}50`,
                        }}
                      >
                        {t.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">
                          {t.name}
                        </div>
                        <div className="text-xs text-white/50">{t.role}</div>
                      </div>
                    </div>
                    <div className="mt-3 inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/40">
                      <span>—</span>
                      <span>{t.company}</span>
                    </div>
                  </div>
                </div>
              </LiquidGlass>
            </motion.div>
          ))}
        </div>

        {/* Logo wall */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-12 border-t border-white/8"
        >
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono tracking-[0.4em] text-white/40">
              — TRUSTED BY 240+ TEAMS ACROSS 37 COUNTRIES —
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-8 gap-y-6 items-center">
            {LOGOS.map((logo, i) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.05 }}
                className="text-center"
              >
                <span className="font-display text-lg tracking-[0.25em] text-white/30 hover:text-white/70 transition-colors cursor-pointer">
                  {logo}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
