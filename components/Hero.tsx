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
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-20"
    >
      {/* Marble-light backdrop */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        className="absolute top-[-10%] right-[-15%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--glow-accent) 0%, transparent 62%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[-10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--glow-soft) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container-wide relative w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-6 items-center">
          {/* ------- Left: the lockup ------- */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="leading-none"
            >
              <span className="block wordmark text-[clamp(2.4rem,7vw,4.75rem)]">
                Jenesis
              </span>
              <span className="block wordmark-sub text-[clamp(0.7rem,1.6vw,1.05rem)] mt-3 opacity-90">
                Global
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="eyebrow eyebrow-accent mt-8 !text-[12px]"
            >
              Building What&rsquo;s Next
            </motion.p>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              className="divider-accent w-16 mt-6 mb-10 mx-auto lg:mx-0 origin-left"
            />

            {/* Keyword column — the logo's word list */}
            <ul className="flex flex-wrap justify-center lg:flex-col lg:justify-start gap-x-6 gap-y-3 lg:gap-y-3.5">
              {KEYWORDS.map((word, i) => (
                <motion.li
                  key={word}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: EASE }}
                  className="text-[11px] lg:text-[12px] font-medium tracking-[0.3em] uppercase text-body"
                >
                  {word}
                </motion.li>
              ))}
            </ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
              className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-3 mt-12"
            >
              <a href="#contact" className="btn btn-primary px-7 py-3.5">
                Build with us
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

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="eyebrow mt-12 !tracking-[0.3em]"
            >
              Global Vision. Human Future.
            </motion.p>
          </motion.div>

          {/* ------- Right: the sculpture ------- */}
          <motion.div
            ref={sceneRef}
            style={{ y: sceneY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            className="order-1 lg:order-2 relative h-[300px] sm:h-[380px] lg:h-[620px]"
          >
            <Scene active={sceneActive} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-faint"
      >
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-line-strong to-transparent" />
      </motion.div>
    </section>
  );
}
