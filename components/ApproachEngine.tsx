"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ----------------------------------------------------
 * Custom Precision Developer SVG Icons
 * Architectural, clean geometry (No generic emojis/AI stock)
 * --------------------------------------------------*/

function AcquisitionIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.5L3.5 7.25V16.75L12 21.5L20.5 16.75V7.25L12 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 21.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.5 7.25L12 12L3.5 7.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.2" fill="var(--accent)" />
    </svg>
  );
}

function ConversionIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3.5 13.5H12L11 22L20.5 10.5H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 10.5L8 16" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function AutomationIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="14" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6.75H14M17.25 10V14M14 17.25H10M6.75 14V10" stroke="var(--accent)" strokeWidth="1.25" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

function DiscoveryIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.75" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2.5 2.5" />
      <circle cx="12" cy="12" r="2" fill="var(--accent)" />
      <path d="M12 3.25V5.25M12 18.75V20.75M3.25 12H5.25M18.75 12H20.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

type ChannelNode = {
  id: string;
  number: string;
  name: string;
  category: string;
  IconComponent: React.ComponentType<{ className?: string }>;
  tagline: string;
  summary: string;
  metric: string;
  metricLabel: string;
  outputs: string[];
};

const CHANNELS: ChannelNode[] = [
  {
    id: "marketing",
    number: "01",
    name: "Performance Marketing",
    category: "Acquisition",
    IconComponent: AcquisitionIcon,
    tagline: "Scalable Customer Acquisition Engine",
    summary: "Omni-channel paid media engines engineered to acquire high-intent buyers at guaranteed ROI thresholds.",
    metric: "4.2x",
    metricLabel: "Average ROAS",
    outputs: ["Cross-platform attribution", "Dynamic CAC caps", "Creative scaling engine"],
  },
  {
    id: "engineering",
    number: "02",
    name: "Web & App Engineering",
    category: "Conversion",
    IconComponent: ConversionIcon,
    tagline: "Sub-Second Digital Flagships",
    summary: "Cinematic, high-converting digital flagships built with Next.js 14 and WebGL for 60 FPS fluid performance.",
    metric: "+340%",
    metricLabel: "Conversion Lift",
    outputs: ["Next.js 14 / WebGL", "Sub-500ms TTFB", "CRO-locked design system"],
  },
  {
    id: "ai",
    number: "03",
    name: "Enterprise AI Workflows",
    category: "Automation",
    IconComponent: AutomationIcon,
    tagline: "Autonomous Operational Intelligence",
    summary: "Embedded predictive models and autonomous AI agent loops operating 24/7 to eliminate operational friction.",
    metric: "89%",
    metricLabel: "Workforce Efficiency",
    outputs: ["Predictive lead scoring", "Custom AI agent loops", "Autonomous routing"],
  },
  {
    id: "seo",
    number: "04",
    name: "SEO & AEO Dominance",
    category: "Discovery",
    IconComponent: DiscoveryIcon,
    tagline: "Generative & Search Engine Control",
    summary: "Dominating traditional search engines and AI generative answers across ChatGPT, Perplexity, and Gemini.",
    metric: "#1",
    metricLabel: "AI Answer Share",
    outputs: ["Generative Engine Optimization", "Entity graph authority", "High-intent organic capture"],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ApproachEngine() {
  const [activeId, setActiveId] = useState<string>("marketing");
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });

  // Guaranteed fallback ensures correct item active data is always rendered
  const activeNode = CHANNELS.find((c) => c.id === activeId) || CHANNELS[0];
  const ActiveIcon = activeNode.IconComponent;

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-bg border-y border-line"
    >
      {/* Background ambient radial lighting */}
      <div className="ambient-glow ambient-glow--left opacity-40" />
      <div className="ambient-glow ambient-glow--right opacity-40" />

      <div className="container-wide px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl mb-8 lg:mb-10 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-line-strong bg-surface/80 backdrop-blur-md mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono tracking-wider uppercase text-accent font-semibold">
              The Approach — Connected Omni-Channel Engine
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold gradient-text mb-4">
            Show, don&rsquo;t tell. <br />
            <span className="font-serif italic text-accent-soft font-normal">
              One connected engine
            </span>{" "}
            driving your revenue.
          </h2>

          <p className="text-body text-base sm:text-lg leading-relaxed max-w-2xl text-muted">
            Instead of disjointed vendors running isolated ads, web dev, or SEO in silos — Jenesis connects all 4 pillars into a single integrated growth ecosystem.
          </p>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: 4 Interactive Channel Selector Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {CHANNELS.map((node, i) => {
              const isActive = node.id === activeId;
              const NodeIcon = node.IconComponent;

              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(node.id)}
                    onMouseEnter={() => setActiveId(node.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl transition-colors duration-200 relative border overflow-hidden group ${
                      isActive
                        ? "bg-surface border-accent shadow-md shadow-accent/10"
                        : "bg-surface/50 border-line hover:border-line-strong hover:bg-surface/80"
                    }`}
                  >
                    {/* Active Accent Indicator Strip (No layout shift) */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent" />
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                            isActive
                              ? "bg-accent/15 border border-accent/30 text-accent"
                              : "bg-line/40 border border-line text-body group-hover:text-ink"
                          }`}
                        >
                          <NodeIcon className="w-5 h-5" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-mono text-[11px] font-semibold text-accent tracking-wider uppercase">
                              {node.number}
                            </span>
                            <span className="text-[11px] text-faint font-mono uppercase tracking-wide">
                              · {node.category}
                            </span>
                          </div>

                          <h3 className="text-base font-medium text-ink">
                            {node.name}
                          </h3>
                        </div>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors duration-200 ${
                          isActive
                            ? "bg-accent text-white shadow-md shadow-accent/30"
                            : "bg-line/60 text-faint group-hover:text-ink"
                        }`}
                      >
                        →
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Connected Telemetry Panel (7 Cols) */}
          <div className="lg:col-span-7 flex">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="glass-card w-full p-7 sm:p-8 lg:p-9 rounded-3xl relative overflow-hidden flex flex-col justify-between border border-line-strong bg-surface/90 shadow-2xl"
            >
              {/* Subtle background mesh grid */}
              <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

              {/* Dynamic Keyed Panel Content (Instant updates, zero hover freeze) */}
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="relative z-10 flex-1 flex flex-col justify-between"
              >
                {/* Top Status & Telemetry Header */}
                <div>
                  <div className="flex items-center justify-between border-b border-line pb-5 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-2xl bg-bg border border-line text-accent">
                        <ActiveIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
                          Channel Stream {activeNode.number}
                        </span>
                        <h4 className="text-lg sm:text-xl font-bold text-ink">
                          {activeNode.name}
                        </h4>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-accent">
                        {activeNode.metric}
                      </div>
                      <div className="text-[10px] font-mono text-faint uppercase tracking-wider">
                        {activeNode.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Tagline & Summary */}
                  <div className="mb-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-accent font-medium mb-1.5">
                      ◆ {activeNode.tagline}
                    </div>
                    <p className="text-ink text-sm sm:text-base leading-relaxed">
                      {activeNode.summary}
                    </p>
                  </div>
                </div>

                {/* Connected Data Flow Diagram Visual */}
                <div className="my-5 p-4 rounded-2xl bg-bg border border-line flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                    <span className="text-xs font-mono text-ink font-semibold uppercase tracking-wider">
                      {activeNode.category} Input
                    </span>
                  </div>

                  {/* Animated Connection Arrow Stream */}
                  <div className="flex-1 flex items-center justify-center gap-2 w-full px-2">
                    <span className="h-px flex-1 bg-gradient-to-r from-accent to-accent-soft" />
                    <span className="font-mono text-[9px] text-accent tracking-widest uppercase font-semibold px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                      LIVE TELEMETRY
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-accent-soft to-accent" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-accent font-bold uppercase tracking-wider">
                      JENESIS REVENUE HUB
                    </span>
                  </div>
                </div>

                {/* Deliverables List */}
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-faint font-mono mb-2.5">
                    System Deliverables &amp; Output
                  </div>
                  <div className="grid sm:grid-cols-3 gap-2.5">
                    {activeNode.outputs.map((item) => (
                      <div
                        key={item}
                        className="px-3 py-2.5 rounded-xl bg-surface border border-line text-xs font-medium text-ink flex items-center gap-2 shadow-sm"
                      >
                        <span className="text-accent text-xs">◆</span>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Strategic Note */}
        <div className="mt-10 text-center">
          <span className="text-xs font-mono text-faint uppercase tracking-widest">
            Strategic Direction: One Integrated Omni-Channel System &gt; Disjointed Service Agencies
          </span>
        </div>
      </div>
    </section>
  );
}
