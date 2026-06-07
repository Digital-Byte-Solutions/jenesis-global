"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

// Ambient WebGL background — client only, very lightweight
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
          "linear-gradient(90deg, #ff2d55, #ff4d8d, rgba(255,255,255,0.6))",
        boxShadow: "0 0 12px rgba(255,45,85,0.6)",
      }}
    />
  );
}

/* ----------------------------------------------------
 * Manifesto — refreshed with new design language
 * --------------------------------------------------*/
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
          <span className="pill mb-6 inline-flex">
            <span className="text-accent">◆</span>
            Manifesto
          </span>
          <h2 className="text-h1 text-display-xl gradient-text">
            We don't build software.{" "}
            <span className="font-serif italic text-white/85 font-normal">
              We architect intelligent ecosystems
            </span>{" "}
            that learn, evolve and scale at the speed of vision.
          </h2>
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
                <span className="font-mono text-[10px] text-white/35 tracking-widest">
                  0{i + 1}
                </span>
                <span className="h-px w-8 bg-white/15" />
                <span className="text-xs font-medium text-accent-soft tracking-wide uppercase">
                  {item.k}
                </span>
              </div>
              <p className="text-white/65 text-[15px] leading-relaxed">
                {item.v}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------
 * Marquee — refined
 * --------------------------------------------------*/
function Marquee() {
  const items = [
    "ARCLANE GLOBAL",
    "AI ECOSYSTEMS",
    "CLOUD INFRASTRUCTURE",
    "ENTERPRISE TRANSFORMATION",
    "NEURAL INTELLIGENCE",
    "PREMIUM ENGINEERING",
    "EST. 2026",
  ];
  const loop = [...items, ...items];

  return (
    <div className="relative border-y border-white/[0.06] py-7 lg:py-8 overflow-hidden bg-bg-elevated/40 backdrop-blur-sm">
      <div className="flex ticker-track whitespace-nowrap">
        {loop.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-6 lg:gap-8 px-6 lg:px-8 text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white/90"
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-bg overflow-x-hidden">
      <ScrollProgress />
      <Navigation />

      {/* Ambient background WebGL — sits behind content (low opacity, not in hero) */}
      {mounted && <Background />}

      {/* Hero */}
      <Hero />

      {/* Manifesto / values */}
      <Manifesto />

      {/* Brand marquee */}
      <Marquee />

      {/* Services — bento + alternating deep-dives */}
      <Services />

      {/* Process / 04 phases */}
      <Process />

      {/* Stats / impact numbers */}
      <Stats />

      {/* Testimonials + logo wall */}
      <Testimonials />

      {/* FAQ accordion */}
      <FAQ />

      {/* CTA */}
      <CTASection />

      {/* Footer with newsletter */}
      <Footer />
    </main>
  );
}
