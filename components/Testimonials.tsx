"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ----------------------------------------------------
 * Testimonials — Social proof at C-suite altitude
 * -------------------------------------------------- */

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  metric: { value: string; label: string };
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "ARCLANE didn't just build us a product — they rebuilt our operating cadence. The platform shipped six weeks ahead of schedule and is now the spine of our European rollout.",
    name: "Mira Castellanos",
    role: "Chief Product Officer",
    company: "Helix Logistics",
    initials: "MC",
    metric: { value: "3.4×", label: "throughput in 90 days" },
  },
  {
    quote:
      "We've worked with the big consultancies. None matched ARCLANE on velocity or design fidelity. Our retention curve has a visible inflection from the week we shipped their redesign.",
    name: "Devon Park",
    role: "CEO",
    company: "Aurora Fintech",
    initials: "DP",
    metric: { value: "+41%", label: "30-day retention" },
  },
  {
    quote:
      "The AI agents they architected handle 78% of our tier-1 support volume with higher CSAT than our human team did. Genuinely category-defining work.",
    name: "Yuki Tanaka",
    role: "VP of Engineering",
    company: "Nimbus Cloud",
    initials: "YT",
    metric: { value: "78%", label: "tickets auto-resolved" },
  },
];

const LOGOS = [
  "Helix",
  "Aurora",
  "Nimbus",
  "Obsidian",
  "Vanta",
  "Zenith",
  "Nova",
  "Echelon",
];

function StarRow() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5 fill-accent"
          aria-hidden
        >
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.7L6 22l1.5-7.2L2 10l7.1-1.1L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TCard({ t, i }: { t: Testimonial; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-7 lg:p-8 flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <StarRow />
        <span className="font-mono text-[10px] text-white/35">
          {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
        </span>
      </div>

      {/* Quote */}
      <blockquote className="text-white/85 text-lg leading-relaxed mb-8 flex-1">
        <span className="text-accent text-2xl leading-none mr-1 align-top">
          "
        </span>
        {t.quote}
      </blockquote>

      {/* Metric strip */}
      <div className="mb-6 pb-6 border-b border-white/[0.06]">
        <div className="text-3xl font-medium text-white tracking-tight">
          {t.metric.value}
          <span className="text-accent ml-1">.</span>
        </div>
        <div className="text-xs text-white/45 mt-1">{t.metric.label}</div>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 rounded-full overflow-hidden grid place-items-center bg-gradient-to-br from-accent to-accent-soft">
          <span className="text-sm font-medium text-white">{t.initials}</span>
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-white truncate">
            {t.name}
          </div>
          <div className="text-xs text-white/45 truncate">
            {t.role} · {t.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      id="work"
      className="relative py-28 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="ambient-glow ambient-glow--right" />

      <div className="container-wide px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20"
        >
          <div className="max-w-2xl">
            <span className="pill mb-6 inline-flex">
              <span className="text-accent">◆</span>
              Proof in production
            </span>
            <h2 className="text-h1 text-display-lg gradient-text">
              Operators who've shipped with us{" "}
              <span className="font-serif italic text-white/85 font-normal">
                tell the story
              </span>{" "}
              better than we can.
            </h2>
          </div>

          <div className="flex items-center gap-4 lg:shrink-0">
            <div className="text-right">
              <div className="text-3xl font-medium text-white">4.97</div>
              <div className="text-xs text-white/45">avg. client NPS</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="text-right">
              <div className="text-3xl font-medium text-white">96%</div>
              <div className="text-xs text-white/45">renewal rate</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-20">
          {TESTIMONIALS.map((t, i) => (
            <TCard key={t.name} t={t} i={i} />
          ))}
        </div>

        {/* Logo wall */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="pt-10 border-t border-white/[0.06]"
        >
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-mono mb-6 text-center">
            Trusted by operators in 37 countries
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-6">
            {LOGOS.map((logo, i) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 0.55, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.04 }}
                whileHover={{ opacity: 1 }}
                className="text-center font-medium tracking-tight text-white text-base sm:text-lg transition-opacity"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
