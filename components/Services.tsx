"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import GlassCard from "./GlassCard";

/* ----------------------------------------------------
 * Service data
 * --------------------------------------------------*/
type Service = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  icon: string;
  accent: string;
  visualTag: string;
};

const SERVICES: Service[] = [
  {
    id: "brand",
    index: "01",
    title: "Premium Brand Strategy",
    tagline: "Luxury digital identities for the next era.",
    description:
      "We build luxury digital identities that combine strategic positioning, immersive storytelling, and futuristic visual systems — engineered for global premium audiences.",
    capabilities: [
      "Premium branding ecosystems",
      "Visual identity systems",
      "Luxury digital positioning",
      "Emotionally driven storytelling",
      "Enterprise branding architecture",
      "Scalable brand experiences",
    ],
    icon: "◆",
    accent: "#ff1744",
    visualTag: "IDENTITY.SYS",
  },
  {
    id: "engineering",
    index: "02",
    title: "Website Development",
    tagline: "Cinematic enterprise web engineering.",
    description:
      "Cinematic enterprise websites powered by immersive UI/UX and advanced frontend engineering — VFX-grade interfaces, hyper-fast architectures, and scalable design systems.",
    capabilities: [
      "Futuristic websites",
      "VFX-inspired interfaces",
      "Scalable frontend systems",
      "Responsive ecosystems",
      "Ultra-fast architectures",
      "Premium digital experiences",
    ],
    icon: "◈",
    accent: "#ff4d8d",
    visualTag: "WEB.ENGINE",
  },
  {
    id: "apps",
    index: "03",
    title: "Mobile & Web Applications",
    tagline: "Scalable systems built for performance.",
    description:
      "We craft scalable mobile and web applications designed for performance, automation, and engagement — from SaaS ecosystems to enterprise-grade dashboards.",
    capabilities: [
      "SaaS ecosystems",
      "Enterprise applications",
      "Intelligent dashboards",
      "Cloud-connected systems",
      "Real-time applications",
      "Customer engagement platforms",
    ],
    icon: "▤",
    accent: "#ff6b9d",
    visualTag: "APP.RUNTIME",
  },
  {
    id: "ai",
    index: "04",
    title: "Custom AI Solutions",
    tagline: "Intelligent automation, engineered.",
    description:
      "We engineer intelligent AI systems for automation, predictive analytics, and machine intelligence — from generative AI ecosystems to enterprise AI infrastructure.",
    capabilities: [
      "AI assistants",
      "Machine learning systems",
      "Generative AI ecosystems",
      "Intelligent automation",
      "Predictive analytics",
      "Enterprise AI infrastructure",
    ],
    icon: "◉",
    accent: "#ff1744",
    visualTag: "NEURAL.CORE",
  },
  {
    id: "erp",
    index: "05",
    title: "ERP Systems",
    tagline: "One operating system for the enterprise.",
    description:
      "Centralized ERP ecosystems connecting operations, analytics, finance, and workflow automation — a single intelligent layer across the business.",
    capabilities: [
      "HR management",
      "Financial systems",
      "CRM ecosystems",
      "Inventory infrastructure",
      "Workflow automation",
      "Operational analytics",
    ],
    icon: "▦",
    accent: "#ff4d8d",
    visualTag: "ERP.GRID",
  },
  {
    id: "cloud",
    index: "06",
    title: "Cloud Services",
    tagline: "Scalable infrastructure at planetary scale.",
    description:
      "Hyperscale cloud infrastructure engineered for security, deployment, and enterprise scalability — distributed architectures with end-to-end automation.",
    capabilities: [
      "Cloud architecture",
      "DevOps systems",
      "Scalable hosting",
      "Cybersecurity infrastructure",
      "Server automation",
      "Distributed cloud ecosystems",
    ],
    icon: "❖",
    accent: "#ff6b9d",
    visualTag: "CLOUD.MESH",
  },
];

/* ----------------------------------------------------
 * Decorative inline SVG visual per service
 * --------------------------------------------------*/
function ServiceVisual({ service }: { service: Service }) {
  // A small animated SVG diagram representing each service
  switch (service.id) {
    case "brand":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="brand-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={service.accent} stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <motion.rect
              key={i}
              x={50 + i * 5}
              y={50 + i * 5}
              width={100 - i * 10}
              height={100 - i * 10}
              rx="8"
              fill="none"
              stroke="url(#brand-grad)"
              strokeWidth="1.5"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ transformOrigin: "100px 100px" }}
            />
          ))}
          <circle cx="100" cy="100" r="4" fill={service.accent} />
        </svg>
      );
    case "engineering":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {[0, 1, 2].map((i) => (
            <motion.g
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            >
              <rect
                x={40}
                y={50 + i * 35}
                width="120"
                height="25"
                rx="3"
                fill="none"
                stroke={service.accent}
                strokeOpacity={0.6 - i * 0.15}
                strokeWidth="1.2"
              />
              <rect
                x={48}
                y={58 + i * 35}
                width="40"
                height="3"
                fill={service.accent}
                opacity={0.8 - i * 0.2}
              />
              <rect
                x={48}
                y={64 + i * 35}
                width="80"
                height="2"
                fill="#ffffff"
                opacity={0.3}
              />
            </motion.g>
          ))}
        </svg>
      );
    case "apps":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <motion.g
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "100px 100px" }}
          >
            {[0, 1, 2, 3, 4].map((i) => {
              const a = (i * Math.PI * 2) / 5;
              const x = 100 + Math.cos(a) * 50;
              const y = 100 + Math.sin(a) * 50;
              return (
                <g key={i}>
                  <line
                    x1="100"
                    y1="100"
                    x2={x}
                    y2={y}
                    stroke={service.accent}
                    strokeOpacity="0.3"
                    strokeWidth="0.8"
                  />
                  <rect
                    x={x - 10}
                    y={y - 14}
                    width="20"
                    height="28"
                    rx="3"
                    fill="none"
                    stroke={service.accent}
                    strokeWidth="1.2"
                  />
                </g>
              );
            })}
          </motion.g>
          <circle
            cx="100"
            cy="100"
            r="8"
            fill={service.accent}
            opacity="0.9"
          />
        </svg>
      );
    case "ai":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Neural network nodes */}
          {Array.from({ length: 9 }).map((_, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const x = 50 + col * 50;
            const y = 50 + row * 50;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill={service.accent}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            );
          })}
          {/* Connections */}
          {Array.from({ length: 6 }).map((_, i) => {
            const col1 = i % 3;
            const row1 = Math.floor(i / 3);
            return Array.from({ length: 3 }).map((_, j) => (
              <line
                key={`${i}-${j}`}
                x1={50 + col1 * 50}
                y1={50 + row1 * 50}
                x2={50 + j * 50}
                y2={50 + (row1 + 1) * 50}
                stroke={service.accent}
                strokeWidth="0.4"
                strokeOpacity="0.25"
              />
            ));
          })}
        </svg>
      );
    case "erp":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <motion.g
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "100px 100px" }}
          >
            {Array.from({ length: 6 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 6;
              const x = 100 + Math.cos(a) * 55;
              const y = 100 + Math.sin(a) * 55;
              return (
                <g key={i}>
                  <rect
                    x={x - 12}
                    y={y - 12}
                    width="24"
                    height="24"
                    fill="none"
                    stroke={service.accent}
                    strokeOpacity="0.7"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="100"
                    y1="100"
                    x2={x}
                    y2={y}
                    stroke={service.accent}
                    strokeOpacity="0.2"
                  />
                </g>
              );
            })}
          </motion.g>
          <rect
            x="84"
            y="84"
            width="32"
            height="32"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="cloud-grad">
              <stop offset="0%" stopColor={service.accent} stopOpacity="0.4" />
              <stop offset="100%" stopColor={service.accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 12;
            const r = 60;
            const x = 100 + Math.cos(a) * r;
            const y = 100 + Math.sin(a) * r;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill={service.accent}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            );
          })}
          <circle cx="100" cy="100" r="80" fill="url(#cloud-grad)" />
          <motion.circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke={service.accent}
            strokeOpacity="0.4"
            strokeDasharray="2 4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "100px 100px" }}
          />
        </svg>
      );
  }
}

/* ----------------------------------------------------
 * Single Service Block
 * --------------------------------------------------*/
function ServiceBlock({
  service,
  reverse,
  index,
}: {
  service: Service;
  reverse: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div
      ref={ref}
      id={service.id}
      className="relative py-32 md:py-44 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section index marker */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-12 font-mono text-xs tracking-[0.4em] text-white/40"
        >
          <span className="w-16 h-px bg-arc-red" />
          SERVICE / {service.index} — {service.visualTag}
        </motion.div>

        <div
          className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
            reverse ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Text content */}
          <div className="lg:col-span-7 [direction:ltr] space-y-8">
            {/* Service number large */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-baseline gap-6"
            >
              <span
                className="font-display text-[8rem] md:text-[12rem] leading-none font-extralight text-white/[0.04] select-none"
                style={{ textShadow: `0 0 80px ${service.accent}40` }}
              >
                {service.index}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light leading-[1.05] tracking-[-0.02em] -mt-24 md:-mt-32 relative z-10"
            >
              {service.title.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={
                    i === service.title.split(" ").length - 1
                      ? "italic font-normal"
                      : ""
                  }
                  style={
                    i === service.title.split(" ").length - 1
                      ? {
                          background: `linear-gradient(135deg, #ffffff, ${service.accent})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : {}
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.35 }}
              className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-xl"
            >
              {service.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.45 }}
              className="text-base text-white/55 leading-relaxed max-w-xl"
            >
              {service.description}
            </motion.p>

            {/* Capabilities grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.55 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 max-w-xl"
            >
              {service.capabilities.map((cap, i) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.05 }}
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full transition-all group-hover:scale-150"
                    style={{
                      background: service.accent,
                      boxShadow: `0 0 12px ${service.accent}`,
                    }}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                    {cap}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="pt-6"
            >
              <button className="group inline-flex items-center gap-3 text-sm font-mono tracking-widest text-white border-b border-white/20 hover:border-arc-red pb-2 transition-colors">
                EXPLORE {service.visualTag}
                <span
                  className="w-8 h-px transition-all group-hover:w-14"
                  style={{ background: service.accent }}
                />
              </button>
            </motion.div>
          </div>

          {/* Visual side */}
          <div className="lg:col-span-5 [direction:ltr]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard glowColor={service.accent} className="aspect-square">
                <div className="relative w-full h-full p-8 flex flex-col">
                  {/* Top bar */}
                  <div className="flex items-center justify-between text-xs font-mono tracking-widest text-white/40">
                    <span>{service.visualTag}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{
                          background: service.accent,
                          boxShadow: `0 0 8px ${service.accent}`,
                        }}
                      />
                      <span>ACTIVE</span>
                    </div>
                  </div>

                  {/* Main visual */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full h-full max-w-[280px] max-h-[280px]">
                      <ServiceVisual service={service} />
                    </div>
                  </div>

                  {/* Bottom data strip */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
                      <span>LOAD</span>
                      <span>{67 + index * 4}%</span>
                    </div>
                    <div className="h-px bg-white/10 relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${67 + index * 4}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className="h-full"
                        style={{
                          background: `linear-gradient(90deg, ${service.accent}, #ffffff)`,
                          boxShadow: `0 0 8px ${service.accent}`,
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {["LIVE", "v3.1", "AI++"].map((tag) => (
                        <div
                          key={tag}
                          className="text-center py-1.5 text-[10px] font-mono tracking-widest text-white/60 border border-white/10 rounded"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-32 max-w-5xl mx-auto" />
    </div>
  );
}

/* ----------------------------------------------------
 * Services section export — heading + all blocks
 * --------------------------------------------------*/
export default function Services() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.4 });

  return (
    <section className="relative bg-arc-black">
      {/* Section heading */}
      <div
        ref={headingRef}
        className="relative py-40 px-6 md:px-12 lg:px-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-4 mb-10 font-mono text-xs tracking-[0.4em] text-white/40"
        >
          <span className="w-12 h-px bg-arc-red" />
          OUR CAPABILITIES — 06 ECOSYSTEMS
          <span className="w-12 h-px bg-arc-red" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
          animate={
            headingInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.03em] leading-[1.05] text-white max-w-5xl mx-auto"
        >
          A complete operating system for{" "}
          <span className="holo-text italic font-normal">
            next-generation
          </span>{" "}
          enterprises.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-10 text-base md:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed"
        >
          From brand strategy to AI infrastructure — six interconnected
          ecosystems engineered to scale, automate, and amplify every layer of
          modern business.
        </motion.p>
      </div>

      {/* Service blocks alternating layout */}
      {SERVICES.map((service, i) => (
        <ServiceBlock
          key={service.id}
          service={service}
          reverse={i % 2 === 1}
          index={i}
        />
      ))}

      {/* Bottom CTA */}
      <div className="relative py-40 px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2 }}
        >
          <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full glass-surface text-xs font-mono tracking-widest text-white/70">
            <span className="w-2 h-2 rounded-full bg-arc-red animate-pulse" />
            READY FOR DEPLOYMENT
          </div>
          <h3 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] text-white max-w-4xl mx-auto leading-[1.05]">
            Build the future with{" "}
            <span className="holo-text italic font-normal">ARCLANE</span>.
          </h3>
          <p className="mt-8 text-white/55 max-w-xl mx-auto">
            Schedule a strategic session with our AI engineering team and
            architect your next-generation transformation.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center">
            <button className="liquid-button px-10 py-5 rounded-full font-mono text-sm tracking-widest text-white">
              REQUEST DEPLOYMENT ▸
            </button>
            <button className="px-10 py-5 rounded-full font-mono text-sm tracking-widest text-white/80 hover:text-white border border-white/15 hover:border-white/40 backdrop-blur-sm transition-all">
              SCHEDULE CALL
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
