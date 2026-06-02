"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

// Background (ambient WebGL behind sections) — client only
const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
  loading: () => null,
});

/* ----------------------------------------------------
 * Custom cursor — futuristic dual ring
 * --------------------------------------------------*/
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dotX = 0,
      dotY = 0,
      ringX = 0,
      ringY = 0;
    let mouseX = 0,
      mouseY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.45;
      dotY += (mouseY - dotY) * 0.45;
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${
          dotY - 4
        }px)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${
          ringY - 20
        }px)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);
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
 * Scroll progress bar at the top
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
  // Render items twice so the loop is seamless
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
 * Manifesto / between-sections block
 * --------------------------------------------------*/
function Manifesto() {
  return (
    <section className="relative py-40 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(255,23,68,0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-4 mb-12 font-mono text-xs tracking-[0.4em] text-white/40"
        >
          <span className="w-12 h-px bg-arc-red" />
          MANIFESTO / 00
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-[-0.03em] max-w-5xl"
        >
          We don't build software.{" "}
          <span className="text-white/40">We architect</span>{" "}
          <span className="holo-text italic font-normal">
            intelligent ecosystems
          </span>{" "}
          <span className="text-white/40">that learn, evolve, and scale</span>{" "}
          <span className="text-arc-red neon-glow">at the speed of vision.</span>
        </motion.h2>

        <div className="mt-24 grid md:grid-cols-3 gap-12">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.15 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-arc-red text-2xl">◆</span>
                <span className="font-mono text-xs tracking-[0.3em] text-arc-red">
                  0{i + 1} — {item.k}
                </span>
              </div>
              <p className="text-base text-white/65 leading-relaxed">
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
 * Footer
 * --------------------------------------------------*/
function Footer() {
  return (
    <footer className="relative pt-32 pb-12 px-6 md:px-12 lg:px-20 border-t border-white/10 bg-arc-black">
      <div className="max-w-7xl mx-auto">
        {/* Top gigantic wordmark */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2 }}
          className="font-display text-[18vw] md:text-[14vw] lg:text-[10rem] font-extralight tracking-[-0.05em] leading-none text-white/[0.06]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ARCLANE
        </motion.h2>

        <div className="grid lg:grid-cols-12 gap-12 mt-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-5 space-y-6">
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
            <div className="flex items-center gap-3 pt-4">
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

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono tracking-widest text-white/40">
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
      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Custom cursor (desktop only) */}
      {mounted && <CustomCursor />}

      {/* Ambient WebGL background behind everything except hero */}
      <Background />

      {/* Hero with its own immersive scene */}
      <Hero />

      {/* Manifesto break */}
      <Manifesto />

      {/* Moving marquee band */}
      <Marquee />

      {/* All 6 service sections */}
      <Services />

      {/* Footer */}
      <Footer />
    </main>
  );
}
