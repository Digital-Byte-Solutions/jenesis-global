"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ----------------------------------------------------
 * Custom Precision Developer SVG Glyphs
 * Clean geometry, pixel-perfect balance (No generic AI stock)
 * --------------------------------------------------*/

function MarketingGlyph({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M21 7L13 15L9 11L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7H21V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="7" r="2" fill="var(--accent)" />
    </svg>
  );
}

function EngineeringGlyph({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M7 8L3 12L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 4L10 20" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AiGlyph({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
      <circle cx="15" cy="9" r="1.5" fill="currentColor" />
      <circle cx="12" cy="15" r="2" fill="var(--accent)" />
      <path d="M9 15H15" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

function SeoGlyph({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 21L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 8V14M8 11H14" stroke="var(--accent)" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

type ServicePillar = {
  num: string;
  title: string;
  oneLiner: string;
  metric: string;
  metricLabel: string;
  GlyphComponent: React.ComponentType<{ className?: string }>;
  tags: string[];
};

const PILLARS: ServicePillar[] = [
  {
    num: "01",
    title: "Performance Marketing",
    oneLiner: "Scalable omni-channel acquisition engines built for guaranteed ROAS.",
    metric: "4.2x",
    metricLabel: "Average ROAS",
    GlyphComponent: MarketingGlyph,
    tags: ["Paid Media", "CAC Optimization", "Cross-Platform Scaling"],
  },
  {
    num: "02",
    title: "Web & App Engineering",
    oneLiner: "60 FPS, conversion-optimized digital flagships with sub-second speeds.",
    metric: "<0.4s",
    metricLabel: "Page Load Speed",
    GlyphComponent: EngineeringGlyph,
    tags: ["Next.js 14 / WebGL", "Conversion Engineering", "High-FPS UI/UX"],
  },
  {
    num: "03",
    title: "Enterprise AI Systems",
    oneLiner: "Autonomous 24/7 operational workflows and predictive intelligence.",
    metric: "89%",
    metricLabel: "Efficiency Lift",
    GlyphComponent: AiGlyph,
    tags: ["Autonomous Agent Loops", "Predictive Scoring", "AI Workflows"],
  },
  {
    num: "04",
    title: "SEO & AEO Strategy",
    oneLiner: "Generative AI answer control across ChatGPT, Perplexity, & search engines.",
    metric: "#1",
    metricLabel: "AI Answer Share",
    GlyphComponent: SeoGlyph,
    tags: ["Generative Optimization", "Organic Search", "Entity Authority"],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Services() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-15%" });

  return (
    <section id="services" className="relative py-28 sm:py-32 lg:py-40 bg-bg scroll-mt-24 border-b border-line">
      {/* Background ambient lighting */}
      <div className="ambient-glow ambient-glow--left opacity-30" />

      <div className="container-wide px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl mb-16 lg:mb-20 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-line-strong bg-surface/80 backdrop-blur-md mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono tracking-wider uppercase text-accent font-semibold">
              Scannable Services — Core Pillars
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold gradient-text mb-4">
            Brief, scannable. <br />
            <span className="font-serif italic text-accent-soft font-normal">
              Icons + one line each.
            </span>
          </h2>

          <p className="text-body text-base sm:text-lg leading-relaxed text-muted max-w-2xl">
            Strictly adhering to our core principle: no long paragraphs or endless laundry lists. Just clear, revenue-driven capabilities.
          </p>
        </motion.div>

        {/* Scannable 4-Quadrant Quad Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {PILLARS.map((pillar, i) => {
            const Glyph = pillar.GlyphComponent;
            return (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="glass-card p-8 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between border border-line hover:border-accent/40 group transition-all duration-300 bg-surface/70 hover:bg-surface"
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/60 transition-all duration-500" />

                <div>
                  {/* Top Bar: Icon + Number + Metric Tag */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-bg border border-line flex items-center justify-center text-accent group-hover:border-accent/40 group-hover:scale-105 transition-all">
                        <Glyph className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-accent tracking-wider">
                        {pillar.num}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-mono font-bold text-ink">
                        {pillar.metric}
                      </span>
                      <div className="text-[10px] font-mono text-faint uppercase tracking-wider">
                        {pillar.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Title & Mandatory 1-Line Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-ink mb-3 group-hover:text-accent transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-body text-base font-normal leading-relaxed text-muted mb-8">
                    {pillar.oneLiner}
                  </p>
                </div>

                {/* Bottom Tags Strip */}
                <div className="pt-6 border-t border-line/70 flex flex-wrap items-center gap-2">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-bg border border-line text-[11px] font-mono text-faint group-hover:text-ink transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-surface border border-line">
          <div>
            <h4 className="text-lg font-semibold text-ink">Need a tailored omni-channel proposal?</h4>
            <p className="text-xs text-muted font-mono mt-1">Rule of thumb: Icons + one line each beats endless service lists.</p>
          </div>
          <a
            href="#contact"
            className="btn btn-primary px-7 py-3.5 text-sm font-semibold tracking-wide flex items-center gap-2 whitespace-nowrap shadow-md shadow-accent/20"
          >
            <span>Book a strategy call</span>
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
