"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeChooser from "@/components/ThemeChooser";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

// Ambient WebGL nebula background — client only, lightweight
const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
  loading: () => null,
});

/* ----------------------------------------------------
 * Scroll progress bar
 * --------------------------------------------------*/
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--accent-deep), var(--accent), var(--accent-soft))",
      }}
    />
  );
}

/* ----------------------------------------------------
 * Manifesto — staged headline with subtle typewriter
 * --------------------------------------------------*/
const LEAD_WORDS = ["We", "don’t", "build", "software."];
const TYPED_PHRASE = "We architect intelligent ecosystems";
const TAIL_WORDS = [
  "that",
  "learn,",
  "evolve",
  "and",
  "scale",
  "at",
  "the",
  "speed",
  "of",
  "vision.",
];
const WORD_EASE = [0.16, 1, 0.3, 1] as const;

function StagedHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  // 0 idle · 1 lead words · 2 typing · 3 tail words · 4 caret retired
  const [stage, setStage] = useState(0);
  const [typed, setTyped] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Stage 1 → 2: lead words settle, then the caret starts
  useEffect(() => {
    if (!inView) return;
    if (reduced.current) {
      setTyped(TYPED_PHRASE.length);
      setStage(4);
      return;
    }
    setStage(1);
    const t = setTimeout(() => setStage(2), 850);
    return () => clearTimeout(t);
  }, [inView]);

  // Stage 2: type the serif phrase character by character
  useEffect(() => {
    if (stage !== 2) return;
    if (typed >= TYPED_PHRASE.length) {
      const t = setTimeout(() => setStage(3), 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTyped((n) => n + 1), 36);
    return () => clearTimeout(t);
  }, [stage, typed]);

  // Stage 3 → 4: tail words settle, caret blinks a moment longer, then retires
  useEffect(() => {
    if (stage !== 3) return;
    const t = setTimeout(() => setStage(4), 1800);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <h2 ref={ref} className="text-h1 text-display-xl gradient-text">
      {LEAD_WORDS.map((w, i) => (
        <motion.span
          key={`lead-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={
            stage >= 1 ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 0.6, delay: i * 0.12, ease: WORD_EASE }}
        >
          {w}
        </motion.span>
      )).flatMap((el, i) => [el, " "])}
      <span className="font-serif italic text-accent-soft font-normal">
        <span className="sr-only">{TYPED_PHRASE}</span>
        {/* Every character occupies its final position from the start —
            revealing them one by one types without any reflow */}
        <span aria-hidden>
          {TYPED_PHRASE.split("").map((ch, i) => (
            <span
              key={i}
              className="relative"
              style={{ visibility: i < typed ? "visible" : "hidden" }}
            >
              {ch}
              {(stage === 2 || stage === 3) &&
                i === Math.max(typed - 1, 0) && (
                  <span className="type-caret" />
                )}
            </span>
          ))}
        </span>
      </span>{" "}
      {TAIL_WORDS.map((w, i) => (
        <motion.span
          key={`tail-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={
            stage >= 3 ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 0.6, delay: i * 0.08, ease: WORD_EASE }}
        >
          {w}
        </motion.span>
      )).flatMap((el) => [el, " "])}
    </h2>
  );
}

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const VALUES = [
    {
      k: "Intelligent",
      v: "Every system we ship has embedded learning loops. Adaptive, predictive, self-optimising from sprint one — not bolted on as a feature.",
    },
    {
      k: "Immersive",
      v: "Cinematic interfaces and motion-led experiences that make complex products feel inevitable. Craft as a competitive moat.",
    },
    {
      k: "Enterprise",
      v: "Built for global scale — multi-region cloud, SOC 2 / ISO 27001 by default, and infrastructure that compounds with usage.",
    },
  ];

  return (
    <section
      ref={ref}
      id="manifesto"
      className="relative py-28 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="ambient-glow ambient-glow--left" />

      <div className="container-wide px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-16 lg:mb-20"
        >
          <span className="pill pill-accent mb-6 inline-flex">
            <span className="text-accent">◆</span>
            Manifesto
          </span>
          <StagedHeadline />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {VALUES.map((item, i) => (
            <motion.div
              key={item.k}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }}
              className="glass-card p-7 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[10px] text-faint tracking-widest">
                  0{i + 1}
                </span>
                <span className="h-px w-8 bg-line-strong" />
                <span className="text-xs font-medium text-accent tracking-wide uppercase">
                  {item.k}
                </span>
              </div>
              <p className="text-body text-[15px] leading-relaxed">{item.v}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------
 * Marquee
 * --------------------------------------------------*/
function Marquee() {
  const items = [
    "JENESIS GLOBAL",
    "AI ECOSYSTEMS",
    "CLOUD INFRASTRUCTURE",
    "ENTERPRISE TRANSFORMATION",
    "NEURAL INTELLIGENCE",
    "PREMIUM ENGINEERING",
    "EST. 2026",
  ];
  const loop = [...items, ...items];

  return (
    <div className="relative border-y border-line py-7 lg:py-8 overflow-hidden bg-surface">
      <div className="flex ticker-track whitespace-nowrap">
        {loop.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-6 lg:gap-8 px-6 lg:px-8 text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ink"
          >
            <span>{item}</span>
            <span className="text-accent text-xl">◆</span>
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
    </div>
  );
}

/* ----------------------------------------------------
 * MAIN PAGE
 * --------------------------------------------------*/
export default function Page() {
  return (
    <main className="relative min-h-screen bg-bg overflow-x-hidden">
      <SmoothScroll />
      <ThemeChooser />
      <ScrollProgress />
      <Navigation />

      {/* Ambient particle nebula behind all content */}
      <Background />

      {/* Hero — minimal lockup + AI core 3D scene */}
      <Hero />

      {/* Manifesto / values */}
      <Manifesto />

      {/* Brand marquee */}
      <Marquee />

      {/* Services */}
      <Services />

      {/* Process */}
      <Process />

      {/* Stats */}
      <Stats />

      {/* Testimonials + logo wall */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
