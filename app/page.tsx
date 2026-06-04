"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import LiquidGlass from "@/components/LiquidGlass";

// Ambient WebGL background — client only, very lightweight
const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
  loading: () => null,
});

/* ----------------------------------------------------
 * Custom dual-ring cursor
 * --------------------------------------------------*/
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dx = 0, dy = 0, rx = 0, ry = 0, mx = 0, my = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      dx += (mx - dx) * 0.45;
      dy += (my - dy) * 0.45;
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

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
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #ff1744, #ff4d8d, #ff6b9d, #ffffff)",
        boxShadow: "0 0 20px #ff1744, 0 0 40px #ff4d8d",
      }}
    />
  );
}

/* ----------------------------------------------------
 * Manifesto
 * --------------------------------------------------*/
function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div
        className="absolute pointer-events-none opacity-50"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(circle, rgba(255,23,68,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-10 font-mono text-xs tracking-[0.4em] text-white/40"
        >
          <span className="w-12 h-px bg-arc-red" />
          MANIFESTO / 00
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-[-0.025em] max-w-5xl"
        >
          We don't build software.{" "}
          <span className="text-white/40">We architect</span>{" "}
          <span className="holo-text italic font-normal">
            intelligent ecosystems
          </span>{" "}
          <span className="text-white/40">that learn, evolve, and scale</span>{" "}
          <span className="text-arc-red neon-glow">at the speed of vision.</span>
        </motion.h2>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {[
            {
              k: "INTELLIGENT",
              v: "Every system we deploy is engineered with embedded AI — adaptive, predictive, and self-optimizing from day one.",
            },
            {
              k: "IMMERSIVE",
              v: "Cinematic interfaces, holographic UX, and motion-driven experiences that feel like the future you were promised.",
            },
            {
              k: "ENTERPRISE",
              v: "Built for global scale — distributed cloud infrastructure, hardened security, and infinite horizontal scalability.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.k}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
            >
              <LiquidGlass intensity="light" rounded="rounded-2xl">
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-arc-red text-2xl leading-none">◆</span>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-arc-red">
                      0{i + 1} — {item.k}
                    </span>
                  </div>
                  <p className="text-base text-white/70 leading-relaxed">
                    {item.v}
                  </p>
                </div>
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------
 * Marquee ticker — moving text band
 * --------------------------------------------------*/
function Marquee() {
  const items = [
    "ARCLANE GLOBAL",
    "AI ECOSYSTEMS",
    "CLOUD INFRASTRUCTURE",
    "ENTERPRISE TRANSFORMATION",
    "NEURAL INTELLIGENCE",
    "PREMIUM DIGITAL ENGINEERING",
    "v3.1.4",
    "EST. 2026",
  ];
  const loop = [...items, ...items];

  return (
    <div className="relative border-y border-white/10 py-8 overflow-hidden bg-black/40 backdrop-blur-sm">
      <div className="flex marquee-track whitespace-nowrap">
        {loop.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-8 px-8 font-display text-3xl md:text-5xl font-light tracking-[-0.02em] text-white/90"
          >
            <span>{item}</span>
            <span className="text-arc-red text-2xl">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------
 * Footer
 * --------------------------------------------------*/
function Footer() {
  return (
    <footer className="relative pt-24 pb-10 px-6 md:px-12 lg:px-20 border-t border-white/10 bg-arc-black">
      <div className="max-w-7xl mx-auto">
        {/* Giant wordmark */}
        <h2
          className="font-display text-[18vw] md:text-[14vw] lg:text-[10rem] font-extralight tracking-[-0.05em] leading-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, transparent 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ARCLANE
        </h2>

        <div className="grid lg:grid-cols-12 gap-10 mt-10 pb-14 border-b border-white/10">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-arc-red to-arc-pink flex items-center justify-center font-display font-bold">
                A
              </div>
              <span className="font-display tracking-[0.3em] text-white">
                ARCLANE GLOBAL
              </span>
            </div>
            <p className="text-white/55 leading-relaxed max-w-md">
              Architects of intelligent ecosystems. Designed for the next
              generation of enterprises — engineered for the world that comes
              after this one.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="w-2 h-2 rounded-full bg-arc-red animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-white/50">
                ACCEPTING NEW DEPLOYMENTS — Q3 / 2026
              </span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-[0.3em] text-white/40 mb-5">
              ECOSYSTEMS
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              {["Brand", "Engineering", "AI / ML", "Cloud", "ERP", "Apps"].map(
                (l) => (
                  <li
                    key={l}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {l}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-[0.3em] text-white/40 mb-5">
              COMPANY
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              {["About", "Manifesto", "Careers", "Press", "Contact"].map(
                (l) => (
                  <li
                    key={l}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {l}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono tracking-[0.3em] text-white/40 mb-5">
              CONNECT
            </h4>
            <p className="text-sm text-white/70 mb-4">
              hello@arclane.global
              <br />
              +1 (415) 555-0199
            </p>
            <div className="flex gap-3">
              {["TW", "IG", "LI", "GH"].map((s) => (
                <button
                  key={s}
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-arc-red hover:text-arc-red transition-all text-xs font-mono tracking-widest text-white/60"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-xs font-mono tracking-widest text-white/40">
          <span>© 2026 ARCLANE GLOBAL — ALL SYSTEMS RESERVED</span>
          <div className="flex items-center gap-6">
            <span>v3.1.4</span>
            <span>NEURAL_CORE: ONLINE</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-arc-red animate-pulse" />
              LIVE
            </span>
          </div>
        </div>
      </div>
    </footer>
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
    <main className="relative min-h-screen bg-arc-black overflow-x-hidden">
      <ScrollProgress />
      {mounted && <CustomCursor />}

      {/* Ambient background WebGL behind sections (NOT hero) */}
      <Background />

      {/* Hero with its own scene */}
      <Hero />

      {/* Manifesto */}
      <Manifesto />

      {/* Marquee */}
      <Marquee />

      {/* All 6 service sections with 3D models */}
      <Services />

      {/* Process / 04 phases */}
      <Process />

      {/* Testimonials + logo wall */}
      <Testimonials />

      {/* Big CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
