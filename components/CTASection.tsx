"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import LiquidGlass from "./LiquidGlass";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Strong ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          height: "60vw",
          background:
            "radial-gradient(ellipse, rgba(255,23,68,0.25) 0%, rgba(255,77,141,0.10) 40%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <LiquidGlass intensity="strong" rounded="rounded-[2rem]">
            <div className="relative p-10 md:p-16 lg:p-20 text-center">
              {/* Top tag */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-widest text-white/70"
              >
                <span className="w-2 h-2 rounded-full bg-arc-red animate-pulse" />
                ACCEPTING DEPLOYMENTS — Q3 / 2026
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.03em] leading-[1.05] text-white mb-6"
              >
                Build the future with{" "}
                <span className="holo-text italic font-normal">ARCLANE</span>.
              </motion.h2>

              {/* Subline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-12"
              >
                Schedule a strategic session with our AI engineering team and
                architect your next-generation transformation. Limited
                deployments available this quarter.
              </motion.p>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
              >
                <button className="liquid-button px-10 py-5 rounded-full font-mono text-sm tracking-widest text-white">
                  <span className="flex items-center gap-3">
                    REQUEST DEPLOYMENT
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </button>
                <button className="px-10 py-5 rounded-full font-mono text-sm tracking-widest text-white/80 hover:text-white border border-white/20 hover:border-white/50 backdrop-blur-sm bg-white/[0.02] transition-all">
                  SCHEDULE STRATEGY CALL
                </button>
              </motion.div>

              {/* Bottom info trio */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-white/10"
              >
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 mb-2">
                    — EMAIL
                  </span>
                  <span className="text-white text-sm">
                    hello@arclane.global
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 mb-2">
                    — RESPONSE TIME
                  </span>
                  <span className="text-white text-sm">Under 4 hours</span>
                </div>
                <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 mb-2">
                    — TIMEZONE
                  </span>
                  <span className="text-white text-sm">Global · 24 / 7</span>
                </div>
              </motion.div>
            </div>
          </LiquidGlass>
        </motion.div>
      </div>
    </section>
  );
}
