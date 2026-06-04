"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import LiquidGlass from "./LiquidGlass";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    sub: "Deep audit + strategic alignment",
    body: "We map your business, audience, infrastructure, and existing systems — uncovering opportunities, friction points, and strategic leverage.",
    glyph: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
        <circle cx="28" cy="28" r="16" stroke="currentColor" strokeWidth="1.5" />
        <line x1="40" y1="40" x2="52" y2="52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="28" cy="28" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Architect",
    sub: "Design systems + technical blueprint",
    body: "We architect the entire ecosystem — from UX systems and design tokens to data flow, AI models, and cloud topology.",
    glyph: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
        <rect x="8" y="14" width="20" height="14" stroke="currentColor" strokeWidth="1.5" />
        <rect x="36" y="14" width="20" height="14" stroke="currentColor" strokeWidth="1.5" />
        <rect x="22" y="36" width="20" height="14" stroke="currentColor" strokeWidth="1.5" />
        <line x1="18" y1="28" x2="32" y2="36" stroke="currentColor" strokeWidth="1" />
        <line x1="46" y1="28" x2="32" y2="36" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Engineer",
    sub: "Build, train, deploy at scale",
    body: "Our engineering and AI teams build production-grade systems — clean code, scalable infrastructure, fine-tuned models, and immersive interfaces.",
    glyph: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
        <path d="M20 18 L8 32 L20 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M44 18 L56 32 L44 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="36" y1="14" x2="28" y2="50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Amplify",
    sub: "Iterate, optimize, scale globally",
    body: "Post-launch, we measure, learn, and amplify — continuous AI training, performance optimization, and global rollouts powered by data.",
    glyph: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
        <path d="M8 48 L20 36 L28 42 L40 24 L52 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M44 24 L52 24 L52 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="36" r="2" fill="currentColor" />
        <circle cx="28" cy="42" r="2" fill="currentColor" />
        <circle cx="40" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="process" className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none opacity-40"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "50vw",
          background:
            "radial-gradient(ellipse, rgba(255,77,141,0.15) 0%, transparent 60%)",
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
          PROCESS / 04 PHASES
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.03em] leading-[1.05] text-white max-w-4xl mb-6"
        >
          From discovery to{" "}
          <span className="holo-text italic font-normal">launch</span> — in{" "}
          <span className="text-arc-red neon-glow">four phases</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base md:text-lg text-white/55 max-w-2xl leading-relaxed mb-20"
        >
          A proven engineering methodology refined across 240+ enterprise
          deployments — built for clarity, speed, and predictable outcomes.
        </motion.p>

        {/* Process steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
              className="relative"
            >
              <LiquidGlass intensity="medium" rounded="rounded-2xl">
                <div className="p-7 h-full flex flex-col">
                  {/* Step number badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs tracking-[0.3em] text-arc-red">
                      PHASE {step.n}
                    </span>
                    <div className="w-10 h-10 text-arc-red opacity-80">
                      {step.glyph}
                    </div>
                  </div>

                  <h3 className="font-display text-3xl text-white font-light mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono tracking-widest text-white/40 mb-4">
                    {step.sub}
                  </p>
                  <p className="text-sm text-white/65 leading-relaxed flex-1">
                    {step.body}
                  </p>

                  {/* Bottom progress indicator */}
                  <div className="mt-6 pt-4 border-t border-white/8 flex items-center gap-2">
                    {[0, 1, 2, 3].map((p) => (
                      <div
                        key={p}
                        className="h-px flex-1 rounded-full"
                        style={{
                          background:
                            p <= i
                              ? "linear-gradient(90deg, #ff1744, #ff4d8d)"
                              : "rgba(255,255,255,0.1)",
                          boxShadow:
                            p <= i ? "0 0 8px rgba(255,23,68,0.5)" : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </LiquidGlass>

              {/* Connector line to next step (hidden on last + mobile) */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-arc-red/40 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
