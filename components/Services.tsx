"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import LiquidGlass from "./LiquidGlass";

// 3D models — client only
const ServiceCanvas = dynamic(() => import("./ServiceModels"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border border-arc-red/30 border-t-arc-red animate-spin" />
    </div>
  ),
});

/* ----------------------------------------------------
 * Service data
 * --------------------------------------------------*/
type ServiceId = "brand" | "engineering" | "apps" | "ai" | "erp" | "cloud";

type Service = {
  id: ServiceId;
  index: string;
  title: string;
  italic: string;
  tagline: string;
  description: string;
  capabilities: string[];
  accent: string;
  visualTag: string;
  metric: { label: string; value: string }[];
};

const SERVICES: Service[] = [
  {
    id: "brand",
    index: "01",
    title: "Premium Brand",
    italic: "Strategy",
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
    accent: "#ff1744",
    visualTag: "IDENTITY.SYS",
    metric: [
      { label: "BRANDS LAUNCHED", value: "180+" },
      { label: "AVG. UPLIFT", value: "+312%" },
    ],
  },
  {
    id: "engineering",
    index: "02",
    title: "Website",
    italic: "Development",
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
    accent: "#ff4d8d",
    visualTag: "WEB.ENGINE",
    metric: [
      { label: "AVG. LIGHTHOUSE", value: "98 / 100" },
      { label: "TIME TO INTERACTIVE", value: "0.8s" },
    ],
  },
  {
    id: "apps",
    index: "03",
    title: "Mobile & Web",
    italic: "Applications",
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
    accent: "#ff6b9d",
    visualTag: "APP.RUNTIME",
    metric: [
      { label: "APPS DEPLOYED", value: "420+" },
      { label: "MONTHLY USERS", value: "9.2M" },
    ],
  },
  {
    id: "ai",
    index: "04",
    title: "Custom AI",
    italic: "Solutions",
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
    accent: "#ff1744",
    visualTag: "NEURAL.CORE",
    metric: [
      { label: "MODELS TRAINED", value: "1.4K" },
      { label: "INFERENCE TIME", value: "23ms" },
    ],
  },
  {
    id: "erp",
    index: "05",
    title: "ERP",
    italic: "Systems",
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
    accent: "#ff4d8d",
    visualTag: "ERP.GRID",
    metric: [
      { label: "ENTERPRISES", value: "67" },
      { label: "AUTOMATION RATE", value: "94%" },
    ],
  },
  {
    id: "cloud",
    index: "06",
    title: "Cloud",
    italic: "Services",
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
    accent: "#ff6b9d",
    visualTag: "CLOUD.MESH",
    metric: [
      { label: "UPTIME SLA", value: "99.99%" },
      { label: "REGIONS", value: "37" },
    ],
  },
];

/* ----------------------------------------------------
 * Single Service Block — TEXT IS STATIC, only fades in once
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
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id={service.id}
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20"
    >
      {/* Section-specific ambient glow */}
      <div
        className="absolute pointer-events-none opacity-30"
        style={{
          top: "20%",
          [reverse ? "right" : "left"]: "-10%",
          width: "60vw",
          height: "60vw",
          background: `radial-gradient(circle, ${service.accent}40 0%, transparent 60%)`,
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section index marker — fades in, then static */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10 font-mono text-xs tracking-[0.4em] text-white/40"
        >
          <span className="w-16 h-px bg-arc-red" />
          SERVICE / {service.index} — {service.visualTag}
        </motion.div>

        <div
          className={`grid lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
            reverse ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* ───── TEXT COLUMN ───── */}
          <div className="lg:col-span-7 [direction:ltr] relative">
            {/* Giant translucent index number — purely decorative */}
            <div className="absolute -top-12 left-0 pointer-events-none select-none">
              <span
                className="font-display text-[10rem] md:text-[14rem] leading-none font-extralight text-white/[0.035]"
                style={{ textShadow: `0 0 100px ${service.accent}30` }}
              >
                {service.index}
              </span>
            </div>

            {/* Title — appears once, then static */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-light leading-[1.05] tracking-[-0.02em] mb-6"
            >
              {service.title}{" "}
              <span
                className="italic font-normal"
                style={{
                  background: `linear-gradient(135deg, #ffffff, ${service.accent})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {service.italic}.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-white/85 font-light leading-relaxed max-w-xl mb-5"
            >
              {service.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base text-white/55 leading-relaxed max-w-xl mb-8"
            >
              {service.description}
            </motion.p>

            {/* Capabilities grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-xl"
            >
              {service.capabilities.map((cap) => (
                <div key={cap} className="flex items-center gap-3 group">
                  <div
                    className="w-1.5 h-1.5 rounded-full transition-all group-hover:scale-150 flex-shrink-0"
                    style={{
                      background: service.accent,
                      boxShadow: `0 0 12px ${service.accent}`,
                    }}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                    {cap}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Inline metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-8 pt-6 border-t border-white/8 max-w-xl mb-8"
            >
              {service.metric.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span className="text-[9px] font-mono tracking-[0.3em] text-white/40 mb-1">
                    — {m.label}
                  </span>
                  <span
                    className="metric-number text-2xl"
                    style={{ color: service.accent }}
                  >
                    {m.value}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
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

          {/* ───── 3D MODEL COLUMN ───── */}
          <div className="lg:col-span-5 [direction:ltr]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <LiquidGlass intensity="strong">
                <div className="relative aspect-square p-6 flex flex-col">
                  {/* Top bar */}
                  <div className="flex items-center justify-between text-xs font-mono tracking-widest text-white/50 mb-2">
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

                  {/* 3D MODEL */}
                  <div className="flex-1 w-full relative min-h-[280px]">
                    {inView && (
                      <ServiceCanvas model={service.id} />
                    )}
                  </div>

                  {/* Bottom data strip */}
                  <div className="space-y-2.5 mt-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
                      <span>SYSTEM LOAD</span>
                      <span>{67 + index * 4}%</span>
                    </div>
                    <div className="h-px bg-white/10 relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${67 + index * 4}%` } : {}}
                        transition={{ duration: 1.4, delay: 0.7 }}
                        className="h-full"
                        style={{
                          background: `linear-gradient(90deg, ${service.accent}, #ffffff)`,
                          boxShadow: `0 0 8px ${service.accent}`,
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-1">
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
              </LiquidGlass>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-28 max-w-5xl mx-auto" />
    </section>
  );
}

/* ----------------------------------------------------
 * Services section heading + all blocks
 * --------------------------------------------------*/
export default function Services() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.4 });

  return (
    <section className="relative bg-arc-black">
      {/* Heading */}
      <div
        ref={headingRef}
        className="relative py-32 px-6 md:px-12 lg:px-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-4 mb-8 font-mono text-xs tracking-[0.4em] text-white/40"
        >
          <span className="w-12 h-px bg-arc-red" />
          OUR CAPABILITIES — 06 ECOSYSTEMS
          <span className="w-12 h-px bg-arc-red" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.03em] leading-[1.05] text-white max-w-5xl mx-auto"
        >
          A complete operating system for{" "}
          <span className="holo-text italic font-normal">
            next-generation
          </span>{" "}
          enterprises.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-base md:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed"
        >
          From brand strategy to AI infrastructure — six interconnected
          ecosystems engineered to scale, automate, and amplify every layer of
          modern business.
        </motion.p>
      </div>

      {/* Service blocks */}
      {SERVICES.map((service, i) => (
        <ServiceBlock
          key={service.id}
          service={service}
          reverse={i % 2 === 1}
          index={i}
        />
      ))}
    </section>
  );
}
