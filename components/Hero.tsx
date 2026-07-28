"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* Seamless placeholder — a soft accent bloom, no spinner */
function ScenePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
      <div
        className="w-[60%] aspect-square rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, var(--glow-accent) 0%, transparent 65%)",
          filter: "blur(30px)",
        }}
      />
    </div>
  );
}

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});

const KEYWORDS = [
  "Innovation",
  "Intelligence",
  "Engineering",
  "Investment",
  "Impact",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [sceneActive, setSceneActive] = useState(true);

  // Staged scroll-away: content recedes and fades as the hero leaves the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.08]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Pause the WebGL frameloop whenever the sculpture is out of view
  useEffect(() => {
    const el = sceneRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setSceneActive(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        className="absolute top-[-10%] right-[-15%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle, var(--glow-accent) 0%, transparent 62%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[-10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, var(--glow-soft) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container-wide relative w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* ------- Left Column: Revenue Headline & Single CTA (7 Cols) ------- */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="lg:col-span-7 text-center lg:text-left z-10"
          >
            {/* Pill Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-line-strong bg-surface/80 backdrop-blur-md mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono tracking-wider uppercase text-accent font-semibold">
                Omni-Channel Revenue Engine
              </span>
            </motion.div>

            {/* Strategic 5-Second Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-ink mb-5"
            >
              We help brands{" "}
              <span className="gradient-text font-semibold">
                grow revenue
              </span>{" "}
              through an omni-channel approach.
            </motion.h1>

            {/* Single Core Value Sub-statement */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="text-body text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8 text-muted"
            >
              One unified growth engine uniting Performance Marketing, Web &amp; App Engineering, Enterprise AI Systems, and Search Engine Dominance for maximum ROI.
            </motion.p>

            {/* Strategic Single CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#contact"
                className="btn btn-primary px-8 py-4 text-sm font-semibold tracking-wide flex items-center gap-3 shadow-lg hover:shadow-accent/20 transition-all"
              >
                <span>Book a strategy call</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M6 3.5L10.5 8L6 12.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <div className="flex items-center gap-2 text-xs font-mono text-faint tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>3 slots open for Q3/Q4</span>
              </div>
            </motion.div>

            {/* Proof Teaser Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.65 }}
              className="mt-14 pt-8 border-t border-line/60 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
            >
              <div>
                <div className="text-xl sm:text-2xl font-semibold text-ink font-mono">
                  $14.2M+
                </div>
                <div className="text-[11px] text-muted tracking-wide mt-0.5">
                  Revenue Generated
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-semibold text-ink font-mono">
                  4.2x
                </div>
                <div className="text-[11px] text-muted tracking-wide mt-0.5">
                  Average ROAS
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-semibold text-ink font-mono">
                  +340%
                </div>
                <div className="text-[11px] text-muted tracking-wide mt-0.5">
                  Conversion Boost
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ------- Right Column: 3D Interactive Canvas (5 Cols) ------- */}
          <motion.div
            ref={sceneRef}
            style={{ y: sceneY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
            className="lg:col-span-5 relative h-[360px] sm:h-[460px] lg:h-[580px] w-full"
          >
            <Scene active={sceneActive} />
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-faint"
      >
        <span>Explore Omni-Engine</span>
        <div className="w-px h-8 bg-gradient-to-b from-line-strong to-transparent" />
      </motion.div>
    </section>
  );
}
