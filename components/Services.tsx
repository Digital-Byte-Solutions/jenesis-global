"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

const ServiceCanvas = dynamic(() => import("./ServiceModels"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-7 h-7 rounded-full border border-accent/30 border-t-accent animate-spin" />
    </div>
  ),
});

type ServiceId = "brand" | "engineering" | "apps" | "ai" | "erp" | "cloud";

interface Service {
  id: ServiceId;
  num: string;
  title: string;
  tagline: string;
  body: string;
  capabilities: string[];
  deliverables: string[];
  metrics: { value: string; label: string }[];
}

const SERVICES: Service[] = [
  {
    id: "brand",
    num: "01",
    title: "Premium Brand Strategy",
    tagline: "Luxury identities, engineered.",
    body: "We build luxury digital identities that combine strategic positioning, immersive storytelling, and futuristic visual systems — engineered for global premium audiences.",
    capabilities: [
      "Brand ecosystems",
      "Visual identity systems",
      "Premium positioning",
      "Story architecture",
      "Naming & verbal identity",
      "Scalable brand systems",
    ],
    deliverables: ["Brand book", "Design tokens", "Motion system", "Voice guide"],
    metrics: [
      { value: "180+", label: "Brands launched" },
      { value: "+312%", label: "Avg. uplift" },
    ],
  },
  {
    id: "engineering",
    num: "02",
    title: "Website Development",
    tagline: "Cinematic enterprise web engineering.",
    body: "Cinematic enterprise websites powered by immersive UI/UX and advanced frontend engineering — VFX-grade interfaces, hyper-fast architectures, and scalable design systems.",
    capabilities: [
      "Futuristic websites",
      "VFX-inspired interfaces",
      "Scalable frontend systems",
      "Responsive ecosystems",
      "Ultra-fast architectures",
      "Premium digital experiences",
    ],
    deliverables: ["Production code", "CMS setup", "Performance audit", "Analytics"],
    metrics: [
      { value: "98", label: "Avg. Lighthouse" },
      { value: "0.8s", label: "Time-to-interactive" },
    ],
  },
  {
    id: "apps",
    num: "03",
    title: "Mobile & Web Applications",
    tagline: "Scalable systems built for performance.",
    body: "We craft scalable mobile and web applications designed for performance, automation, and engagement — from SaaS ecosystems to enterprise-grade dashboards.",
    capabilities: [
      "SaaS ecosystems",
      "Enterprise applications",
      "Intelligent dashboards",
      "Cloud-connected systems",
      "Real-time platforms",
      "Engagement systems",
    ],
    deliverables: ["iOS / Android", "Web app", "API layer", "Admin console"],
    metrics: [
      { value: "420+", label: "Apps shipped" },
      { value: "9.2M", label: "Monthly users" },
    ],
  },
  {
    id: "ai",
    num: "04",
    title: "Custom AI Solutions",
    tagline: "Intelligent automation, engineered.",
    body: "We engineer intelligent AI systems for automation, predictive analytics, and machine intelligence — from generative AI ecosystems to enterprise AI infrastructure.",
    capabilities: [
      "AI assistants",
      "ML systems",
      "Generative AI",
      "Intelligent automation",
      "Predictive analytics",
      "AI infrastructure",
    ],
    deliverables: ["Fine-tuned model", "Eval suite", "Inference API", "Monitoring"],
    metrics: [
      { value: "1.4K", label: "Models trained" },
      { value: "23ms", label: "Inference time" },
    ],
  },
  {
    id: "erp",
    num: "05",
    title: "ERP Systems",
    tagline: "One operating system for the enterprise.",
    body: "Centralized ERP ecosystems connecting operations, analytics, finance, and workflow automation — a single intelligent layer across the business.",
    capabilities: [
      "HR management",
      "Financial systems",
      "CRM ecosystems",
      "Inventory infrastructure",
      "Workflow automation",
      "Operational analytics",
    ],
    deliverables: ["Modules suite", "Migration plan", "Integrations", "Training"],
    metrics: [
      { value: "67", label: "Enterprises" },
      { value: "94%", label: "Automation rate" },
    ],
  },
  {
    id: "cloud",
    num: "06",
    title: "Cloud Services",
    tagline: "Scalable infrastructure at planetary scale.",
    body: "Hyperscale cloud infrastructure engineered for security, deployment, and enterprise scalability — distributed architectures with end-to-end automation.",
    capabilities: [
      "Cloud architecture",
      "DevOps systems",
      "Scalable hosting",
      "Cybersecurity",
      "Server automation",
      "Distributed systems",
    ],
    deliverables: ["IaC blueprint", "CI/CD pipeline", "Security audit", "SRE handoff"],
    metrics: [
      { value: "99.99%", label: "Uptime SLA" },
      { value: "37", label: "Regions" },
    ],
  },
];

/* =========================================
 * BENTO OVERVIEW — at-a-glance grid
 * =========================================*/
function BentoOverview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-32">
      {SERVICES.map((s, i) => (
        <motion.a
          key={s.id}
          href={`#${s.id}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.05 }}
          className="group glass-card p-5 hover:-translate-y-1 transition-transform"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
              {s.num}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all"
              aria-hidden
            >
              <path
                d="M3 11L11 3M11 3H5M11 3v6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-white leading-tight">
            {s.title}
          </h3>
          <p className="text-[11px] text-white/40 mt-1.5 leading-relaxed">
            {s.tagline}
          </p>
        </motion.a>
      ))}
    </div>
  );
}

/* =========================================
 * SINGLE SERVICE BLOCK — alternating layout
 * =========================================*/
function ServiceBlock({
  service,
  reverse,
}: {
  service: Service;
  reverse: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <article
      ref={ref}
      id={service.id}
      className="relative py-20 lg:py-32 scroll-mt-24"
    >
      {/* Section ambient glow */}
      <div
        className="ambient-glow opacity-30"
        style={{
          top: "30%",
          [reverse ? "left" : "right"]: "-15%",
          width: "50vw",
          height: "50vw",
          maxWidth: "700px",
          maxHeight: "700px",
          background:
            "radial-gradient(circle, rgba(255,45,85,0.15) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative">
        <div
          className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text column */}
          <div
            className={`lg:col-span-6 ${
              reverse ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
                Service · {service.num}
              </span>
              <span className="h-px w-12 bg-accent/40" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-h1 text-display-lg text-white mb-4"
            >
              {service.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xl text-white/80 font-light mb-4"
            >
              {service.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-white/55 leading-relaxed mb-10 max-w-xl"
            >
              {service.body}
            </motion.p>

            {/* Capabilities grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-10"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-4">
                Capabilities
              </p>
              <div className="grid grid-cols-2 gap-y-2.5 max-w-xl">
                {service.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2.5">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="text-accent flex-shrink-0"
                      aria-hidden
                    >
                      <path
                        d="M2 6l2.5 2.5L10 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm text-white/75">{cap}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Deliverables */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-4">
                Deliverables
              </p>
              <div className="flex flex-wrap gap-2 max-w-xl">
                {service.deliverables.map((d) => (
                  <span
                    key={d}
                    className="text-xs font-medium text-white/70 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Metrics + CTA row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-8 border-t border-white/8"
            >
              <div className="flex gap-8">
                {service.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-3xl font-medium text-white tabular">
                      {m.value}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors group"
              >
                Start a project
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                >
                  <path
                    d="M3 11L11 3M11 3H5M11 3v6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* 3D model column */}
          <div
            className={`lg:col-span-6 ${
              reverse ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative aspect-square max-w-[520px] mx-auto rounded-3xl overflow-hidden glass-strong"
            >
              {/* Top status bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="pill !py-1 !px-2.5 !text-[10px]">
                  <span className="live-dot" />
                  {service.id.toUpperCase()}.SYS
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  ACTIVE
                </span>
              </div>

              {/* 3D model */}
              <div className="absolute inset-0">
                {inView && <ServiceCanvas model={service.id} />}
              </div>

              {/* Bottom info bar */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                    {service.title}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1 h-1 rounded-full bg-accent"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                          animation: "subtle-pulse 1.5s ease-in-out infinite",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================
 * SERVICES SECTION
 * =========================================*/
export default function Services() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, amount: 0.3 });

  return (
    <section id="services" className="relative scroll-mt-24">
      {/* Section heading */}
      <div ref={headRef} className="container-wide section-y text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <span className="pill">
            <span className="text-accent">◆</span>
            What we build
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-h1 text-display-xl max-w-4xl mx-auto gradient-text mb-6"
        >
          A complete operating system{" "}
          <span className="font-serif italic text-white/85 font-normal">
            for next-generation enterprises.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg text-white/55 max-w-2xl mx-auto"
        >
          Six interconnected ecosystems — from brand strategy to AI
          infrastructure — engineered to scale, automate, and amplify every
          layer of modern business.
        </motion.p>

        {/* Bento overview grid */}
        <div className="mt-16">
          <BentoOverview />
        </div>
      </div>

      {/* Alternating detail blocks */}
      <div className="relative">
        {SERVICES.map((s, i) => (
          <ServiceBlock key={s.id} service={s} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
