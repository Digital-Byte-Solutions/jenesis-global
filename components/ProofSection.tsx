"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

type CaseStudy = {
  id: string;
  number: string;
  category: string;
  clientAlias: string;
  headline: string;
  heroMetric: string;
  heroMetricLabel: string;
  secondaryMetrics: { label: string; value: string }[];
  levers: string[];
  summary: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "fintech",
    number: "01",
    category: "FinTech",
    clientAlias: "Global Wealth Platform",
    headline: "Scaling ARR from $8M to $22.2M via Omni-Channel Acquisition & AI Lead Scoring",
    heroMetric: "+$14.2M",
    heroMetricLabel: "ARR Added (12 Mo.)",
    secondaryMetrics: [
      { label: "MRR Growth", value: "+210%" },
      { label: "CAC Payback", value: "3.4 Mo." },
      { label: "Pipeline Lift", value: "4.8x" },
    ],
    levers: [
      "Omni-channel paid media acquisition engine",
      "Sub-500ms Next.js web flagship CRO overhaul",
      "Real-time AI lead scoring & automated routing",
    ],
    summary:
      "By replacing three fragmented agencies with Jenesis' connected omni-channel system, this wealth platform scaled customer acquisition while cutting CAC by 42%.",
  },
  {
    id: "d2c",
    number: "02",
    category: "D2C Luxury",
    clientAlias: "European Premium Flagship",
    headline: "Achieving 4.2x ROAS & +340% Conversion Lift via 60 FPS WebGL Flagship",
    heroMetric: "4.2x",
    heroMetricLabel: "Blended ROAS",
    secondaryMetrics: [
      { label: "Conversion Lift", value: "+340%" },
      { label: "Incremental GMV", value: "$8.6M" },
      { label: "Page Speed", value: "0.38s" },
    ],
    levers: [
      "High-speed 60 FPS WebGL product experience",
      "Generative AI Answer Engine Optimization (AEO)",
      "Dynamic cross-platform paid social engine",
    ],
    summary:
      "Integrated luxury brand experience with sub-second page performance to eliminate checkout friction, turning high-intent paid traffic into compounding organic revenue.",
  },
  {
    id: "saas",
    number: "03",
    category: "Enterprise SaaS",
    clientAlias: "B2B Cloud Infrastructure",
    headline: "Slashing CAC by 89% while Dominating Generative AI Search Answers",
    heroMetric: "89%",
    heroMetricLabel: "Acquisition CAC Cut",
    secondaryMetrics: [
      { label: "Pipeline Value", value: "$19.4M" },
      { label: "AI Search Rank", value: "#1 Share" },
      { label: "ACV Contract Size", value: "+84%" },
    ],
    levers: [
      "ChatGPT & Perplexity Generative Engine Control",
      "Automated enterprise demo booking loops",
      "Intent-triggered programmatic search campaigns",
    ],
    summary:
      "Captured top-of-funnel decision makers on AI search engines before competitors entered the deal, driving high-ticket enterprise contracts at record velocity.",
  },
];

const CATEGORIES = ["All", "FinTech", "D2C Luxury", "Enterprise SaaS"];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function ProofSection() {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [activeStudyId, setActiveStudyId] = useState<string>("fintech");
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });

  const filteredStudies = CASE_STUDIES.filter(
    (c) => selectedCat === "All" || c.category === selectedCat
  );

  const activeStudy =
    filteredStudies.find((c) => c.id === activeStudyId) || filteredStudies[0] || CASE_STUDIES[0];

  return (
    <section
      ref={sectionRef}
      id="proof"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-bg border-b border-line"
    >
      {/* Ambient glowing background accent */}
      <div className="ambient-glow ambient-glow--center opacity-30" />

      <div className="container-wide px-6 lg:px-10 relative z-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 lg:mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line-strong bg-surface/80 backdrop-blur-md mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider uppercase text-accent font-semibold">
                Proof — Hard Numbers Over Adjectives
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold gradient-text">
              Disguised case studies.{" "}
              <span className="font-serif italic text-accent-soft font-normal">
                Real revenue numbers.
              </span>
            </h2>
          </div>

          {/* Filter Category Pills */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = selectedCat === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCat(cat);
                    const matching = CASE_STUDIES.find(
                      (c) => cat === "All" || c.category === cat
                    );
                    if (matching) setActiveStudyId(matching.id);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 ${
                    active
                      ? "bg-accent text-white shadow-sm border border-accent"
                      : "bg-surface border border-line text-muted hover:text-ink hover:border-line-strong"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Sleek Compact Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Side: Compact Cards List (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {filteredStudies.map((study, i) => {
              const isActive = study.id === activeStudy.id;
              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveStudyId(study.id)}
                    onMouseEnter={() => setActiveStudyId(study.id)}
                    className={`w-full text-left p-4 sm:p-4.5 rounded-xl transition-all duration-300 relative border overflow-hidden group ${
                      isActive
                        ? "bg-surface border-accent shadow-md shadow-accent/10 translate-x-1"
                        : "bg-surface/40 border-line hover:border-line-strong hover:bg-surface/70"
                    }`}
                  >
                    {/* Active Accent Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeProofIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                        transition={{ duration: 0.25, ease: EASE }}
                      />
                    )}

                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-accent font-semibold">
                          {study.number}
                        </span>
                        <span className="text-[10px] text-faint font-mono uppercase">
                          · {study.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-faint">
                        {study.clientAlias}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xs sm:text-sm font-medium text-ink leading-snug line-clamp-2">
                        {study.headline}
                      </h3>
                      <span className="text-base font-mono font-bold text-accent whitespace-nowrap">
                        {study.heroMetric}
                      </span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side: Sleek Compact Impact Panel (7 Cols) */}
          <div className="lg:col-span-7 flex">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="glass-card w-full p-6 sm:p-7 lg:p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between border border-line-strong bg-surface/90 shadow-xl"
            >
              {/* Grid backdrop */}
              <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

              {/* Dynamic Animated Panel Content */}
              <motion.div
                key={activeStudy.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="relative z-10 flex-1 flex flex-col justify-between"
              >
                {/* Top Bar: Hero Metric & Category */}
                <div>
                  <div className="flex items-center justify-between border-b border-line pb-4 mb-5 gap-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
                        Case Study {activeStudy.number} · {activeStudy.category}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-ink mt-0.5">
                        {activeStudy.clientAlias}
                      </h4>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-mono font-extrabold text-accent">
                        {activeStudy.heroMetric}
                      </div>
                      <div className="text-[10px] font-mono text-faint uppercase tracking-wider">
                        {activeStudy.heroMetricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Headline & Summary */}
                  <div className="mb-5">
                    <h5 className="text-sm sm:text-base font-semibold text-ink mb-2 leading-snug">
                      {activeStudy.headline}
                    </h5>
                    <p className="text-body text-xs sm:text-sm leading-relaxed text-muted">
                      {activeStudy.summary}
                    </p>
                  </div>

                  {/* Compact Secondary Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-bg border border-line mb-5">
                    {activeStudy.secondaryMetrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="text-sm sm:text-base font-mono font-bold text-ink">
                          {m.value}
                        </div>
                        <div className="text-[9px] font-mono text-faint uppercase tracking-wider mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Levers Applied */}
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-faint font-mono mb-2">
                    Omni-Channel Levers Implemented
                  </div>
                  <div className="space-y-1.5">
                    {activeStudy.levers.map((lever) => (
                      <div
                        key={lever}
                        className="px-3 py-2 rounded-lg bg-surface border border-line text-xs font-medium text-ink flex items-center gap-2 shadow-xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span className="leading-tight">{lever}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
