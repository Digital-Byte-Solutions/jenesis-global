"use client";

import { useMemo, useState } from "react";
import { audioEngine } from "@/lib/AudioEngine";

interface Props { scrollProgress: number; }

/* ─── Stage opacity helper ────────────────────────────── */
function useStageOpacity(sp: number, start: number, end: number): number {
  return useMemo(() => {
    if (sp < start || sp > end) return 0;
    const range = end - start;
    const local = (sp - start) / range;
    const FADE = 0.18;
    if (local < FADE) return local / FADE;
    if (local > 1 - FADE) return (1 - local) / FADE;
    return 1;
  }, [sp, start, end]);
}

/* ─── Slide-in style helper ───────────────────────────── */
function slideStyle(opacity: number, dir: "left" | "right" | "up" | "down" | "none" = "up") {
  const dist = 36;
  const tx = dir === "left" ? -dist : dir === "right" ? dist : 0;
  const ty = dir === "up" ? dist : dir === "down" ? -dist : 0;
  return {
    opacity,
    transform: `translate(${tx * (1 - opacity)}px, ${ty * (1 - opacity)}px)`,
    transition: "opacity 0.6s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
    pointerEvents: opacity > 0.08 ? ("auto" as const) : ("none" as const),
    visibility: opacity > 0.001 ? ("visible" as const) : ("hidden" as const),
  };
}

/* ════════════════════════════════════════════════════════════ */
/* Stage 0 ” HERO (iOS Liquid Glassmorphic Card)                     */
/* ════════════════════════════════════════════════════════════ */
function StageHero({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.1, 0.2);
  return (
    <div
      className="absolute left-4 md:left-14 top-[10%] md:top-[14%] max-w-[92vw] sm:max-w-[460px] md:max-w-[500px] max-h-[85vh]"
      style={slideStyle(o, "left")}
    >
      <div className="relative p-6 md:p-8 rounded-3xl liquid-glass overflow-hidden">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill border-[var(--gold)]/40 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
          <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-[0.22em] text-[var(--gold)] uppercase">
            Omni-Channel Revenue Engine
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-[clamp(1.5rem,3.5vw,2.5rem)] lg:text-[38px] font-extrabold leading-[1.1] tracking-tight mb-3">
          We help brands grow revenue through an{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]">
            omni-channel
          </span>{" "}
          approach.
        </h1>

        {/* Paragraph Body */}
        <p className="text-[clamp(0.75rem,1.5vw,0.875rem)] opacity-80 leading-relaxed mb-5 font-mono">
          One unified engine driving maximum ROI.
        </p>

        {/* Outcome Metric Badges */}
        <div className="flex gap-3 md:gap-7 mb-5 border-l-2 border-[var(--gold)]/60 pl-4">
          {[["$14.2M+", "Revenue Generated"], ["4.2×", "Avg. ROAS"], ["+340%", "Conversion Lift"]].map(([v, l]) => (
            <div key={l}>
              <div className="text-lg md:text-xl font-extrabold font-mono tracking-tight">{v}</div>
              <div className="text-[9px] font-mono opacity-60 mt-0.5">{l}</div>
            </div>
          ))}
        </div>

        {/* Primary CTA & Capacity Indicator */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#"
            onMouseEnter={() => audioEngine.playHoverSound()}
            onClick={() => audioEngine.playClickSound()}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-full border-[var(--gold)]/50 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#171717] text-xs font-extrabold font-mono transition-all duration-300 shadow-[0_8px_25px_var(--shadow-gold)] hover:scale-105 cursor-pointer"
          >
            Book a strategy call
            <svg className="group-hover:translate-x-1 transition-transform" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <div className="flex items-center gap-1.5 text-[10px] font-mono opacity-70">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
            3 slots open for Q3/Q4
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
/* Stage 1 ” THE APPROACH ENGINE (Liquid Glass 4-Node Cards)          */
/* ════════════════════════════════════════════════════════════ */
const APPROACH_NODES = [
  {
    id: "marketing",
    num: "01",
    title: "Performance Marketing",
    outcome: "4.2× Avg ROAS",
    desc: "Scalable user acquisition and predictive CAC.",
    icon: "🚀",
    pos: "left-1 md:left-4 top-0 md:top-2",
  },
  {
    id: "engineering",
    num: "02",
    title: "Web & App Engineering",
    outcome: "sub-400ms LCP & 60 FPS",
    desc: "High-speed 3D flagships and checkout engines.",
    icon: "⚡",
    pos: "right-4 md:right-16 top-0 md:top-2",
  },
  {
    id: "ai",
    num: "03",
    title: "Enterprise AI Workflows",
    outcome: "89% CAC Reduction",
    desc: "Autonomous 24/7 agents and predictive lead scoring.",
    icon: "🤖",
    pos: "left-1 md:left-4 bottom-0 md:bottom-2",
  },
  {
    id: "seo",
    num: "04",
    title: "SEO & AEO Optimization",
    outcome: "#1 Generative AI Citation",
    desc: "Generative AI search dominance. Compounding authority.",
    icon: "🎯",
    pos: "right-4 md:right-16 bottom-0 md:bottom-2",
  },
];

function StageApproach({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.2, 0.3);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start md:justify-center pt-[15vh] md:pt-0 overflow-y-auto scrollbar-hide pb-[10vh] px-4 sm:px-8 md:px-16 text-center" style={slideStyle(o, "up")}>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[var(--gold)] uppercase">The Approach</span>
        </div>

        <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-extrabold leading-tight max-w-3xl mx-auto mb-1">
          The Connected <span className="text-[var(--gold)]">Omni-Channel</span> Revenue Engine
        </h2>
        <p className="text-xs font-mono opacity-70 max-w-lg mx-auto mb-6">
          Four vectors. One revenue flywheel. Hover to inspect.
        </p>

        {/* Interactive 4-Node Diagram Container */}
        <div
          onMouseLeave={() => setActiveNode(null)}
          className="relative w-full h-[clamp(300px,50vh,440px)] flex items-center justify-center"
        >

          {/* Central Hub Node ” JENESIS REVENUE ENGINE */}
          <div className="relative z-10 flex flex-col items-center justify-center w-36 h-36 md:w-44 md:h-44 rounded-full liquid-glass border-2 border-[var(--gold)] shadow-[0_0_50px_var(--shadow-gold)] backdrop-blur-3xl p-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] shadow-[0_0_10px_var(--gold)] animate-ping mb-1.5" />
            <span className="text-[8px] font-mono font-bold text-[var(--gold)] tracking-[0.2em] uppercase">CENTRAL HUB</span>
            <span className="text-[clamp(0.75rem,1.5vw,0.875rem)] font-extrabold leading-none mt-1">JENESIS REVENUE</span>
            <span className="text-[11px] font-mono font-bold text-[var(--gold)] tracking-widest">ENGINE</span>
            <div className="mt-1.5 text-[8px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
              ARR COMPOUNDING
            </div>
          </div>

          {/* SVG Animated Connecting Data Streams */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <line x1="20%" y1="15%" x2="50%" y2="50%" stroke={activeNode === "marketing" ? "var(--gold)" : "rgba(200,150,12,0.25)"} strokeWidth={activeNode === "marketing" ? "3" : "1"} strokeDasharray="6 4" className="animate-pulse" />
            <line x1="80%" y1="15%" x2="50%" y2="50%" stroke={activeNode === "engineering" ? "var(--gold)" : "rgba(200,150,12,0.25)"} strokeWidth={activeNode === "engineering" ? "3" : "1"} strokeDasharray="6 4" className="animate-pulse" />
            <line x1="20%" y1="85%" x2="50%" y2="50%" stroke={activeNode === "ai" ? "var(--gold)" : "rgba(200,150,12,0.25)"} strokeWidth={activeNode === "ai" ? "3" : "1"} strokeDasharray="6 4" className="animate-pulse" />
            <line x1="80%" y1="85%" x2="50%" y2="50%" stroke={activeNode === "seo" ? "var(--gold)" : "rgba(200,150,12,0.25)"} strokeWidth={activeNode === "seo" ? "3" : "1"} strokeDasharray="6 4" className="animate-pulse" />
          </svg>

          {/* 4 Satellite Nodes */}
          {APPROACH_NODES.map((node) => {
            const isActive = activeNode === node.id;
            return (
              <div
                key={node.id}
                onMouseEnter={() => { setActiveNode(node.id); audioEngine.playHoverSound(); }}
                className={`absolute ${node.pos} transition-all duration-300 ${isActive ? "z-40" : "z-20"}`}
              >
                <div
                  className={`p-4 rounded-2xl liquid-glass transition-all duration-300 text-left overflow-hidden ${
                    isActive
                      ? "border-[var(--gold)] shadow-[0_16px_40px_var(--shadow-gold)] w-[clamp(180px,50vw,230px)] scale-105"
                      : "hover:border-black/30 dark:hover:border-white/40 w-[clamp(130px,40vw,175px)] opacity-90"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-base">{node.icon}</span>
                    <span className="text-[9px] font-mono opacity-50 font-bold">{node.num}</span>
                  </div>
                  <div className="text-[clamp(0.75rem,1.5vw,0.875rem)] font-extrabold mb-0.5 tracking-tight">{node.title}</div>
                  <div className="text-[9px] font-mono font-bold text-[var(--gold)] mb-1">{node.outcome}</div>

                  {/* Only active hovered node emerges with full description */}
                  {isActive && (
                    <div className="animate-fadeIn">
                      <p className="text-[10px] font-mono opacity-80 leading-relaxed border-t border-black/10 dark:border-white/10 pt-1.5 mt-1">
                        {node.desc}
                      </p>
                      <div className="mt-1.5 text-[8px] font-mono text-[var(--gold)] flex items-center gap-1 font-bold">
                        <span>FLOWING INTO REVENUE ENGINE</span>
                        <span>→</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
/* Stage 2 ” SCANNABLE SERVICES (Liquid Glass Quad Cards)             */
/* ════════════════════════════════════════════════════════════ */
const SERVICES = [
  {
    icon: "🚀", num: "01", category: "MARKETING",
    title: "Performance Marketing",
    outcome: "Scalable user acquisition engines.",
    metric: "4.2× ROAS",
    tags: ["Paid Media", "CAC Optimisation", "Cross-Platform Scaling"],
  },
  {
    icon: "⚡", num: "02", category: "WEB & APP",
    title: "Web & App Engineering",
    outcome: "60fps digital experiences.",
    metric: "<0.4s LOAD",
    tags: ["Next.js 14 / WebGL", "Conversion Engineering", "React Native"],
  },
  {
    icon: "🤖", num: "03", category: "AI SYSTEMS",
    title: "Enterprise AI Systems",
    outcome: "Automated AI operational loops.",
    metric: "89% CAC↓",
    tags: ["Autonomous SDRs", "Predictive Lead Scoring", "AI Workflows"],
  },
  {
    icon: "🎯", num: "04", category: "SEO / AEO",
    title: "SEO & AEO Optimization",
    outcome: "AI search optimization to capture high-intent demand.",
    metric: "#1 AI CITATION",
    tags: ["Generative AI Optimization", "Organic Search", "ChatGPT & Perplexity"],
  },
];

function StageServices({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.3, 0.4);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start md:justify-center pt-[15vh] md:pt-0 overflow-y-auto scrollbar-hide pb-[10vh] px-4 sm:px-8 md:px-16 text-center" style={slideStyle(o, "up")}>
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[var(--gold)] uppercase">Scannable Services</span>
        </div>

        <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold leading-tight max-w-3xl mx-auto mb-2">
          Engineered For <span className="text-[var(--gold)]">One Outcome</span>: Growth
        </h2>
        <p className="text-xs font-mono opacity-70 mb-8 max-w-lg mx-auto">Four disciplines. One outcome.</p>

        {/* Services Quad Layout */}
        <div
          onMouseLeave={() => setHoveredIdx(null)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left"
        >
          {SERVICES.map((s, i) => {
            const isActive = hoveredIdx === i;
            return (
              <div
                key={s.num}
                onMouseEnter={() => { setHoveredIdx(i); audioEngine.playHoverSound(); }}
                className={`p-5 rounded-2xl liquid-glass cursor-pointer transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "border-[var(--gold)] shadow-[0_16px_40px_var(--shadow-gold)] scale-[1.02]"
                    : "hover:border-black/30 dark:hover:border-white/40 opacity-90"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[clamp(1.25rem,3vw,1.5rem)]">{s.icon}</span>
                    <div>
                      <span className="text-[9px] font-mono text-[var(--gold)] font-bold tracking-widest">{s.category}</span>
                      <h3 className="text-base font-extrabold leading-none mt-0.5">{s.title}</h3>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-sm font-extrabold text-[var(--gold)]">{s.metric}</span>
                  </div>
                </div>

                <p className="text-xs font-semibold opacity-90 mb-3 leading-snug">
                  {s.outcome}
                </p>

                {/* Only hovered card emerges with tags */}
                {isActive && (
                  <div className="animate-fadeIn pt-2.5 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 text-[9px] font-mono opacity-85 liquid-glass-pill rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
/* Stage 3 ” PROOF SECTION (Liquid Glass Case Card)                  */
/* ════════════════════════════════════════════════════════════ */
const CASES = [
  {
    cat: "CASE STUDY A // FINTECH",
    metric: "+$14.2M",
    metricLabel: "ARR ADDED IN 12 MONTHS",
    title: "Scaling ARR from $8M to $22.2M via Omni-Channel Acquisition & AI Lead Scoring",
    stats: ["+$14.2M ARR", "+210% MRR", "3.4 Mo. Payback"],
    levers: [
      "Omni-channel performance marketing & paid media scale",
      "Sub-400ms LCP Next.js 14 conversion architecture",
      "Autonomous AI lead-scoring model trained on CRM data",
    ],
  },
  {
    cat: "CASE STUDY B // D2C LUXURY",
    metric: "4.2×",
    metricLabel: "BLENDED ROAS ACHIEVED",
    title: "Achieving 4.2× ROAS & +340% Conversion Lift via 60 FPS WebGL Flagship",
    stats: ["4.2× ROAS", "+340% Lift", "–62% Bounce"],
    levers: [
      "Three.js 3D luxury product visualizer & interactive storefront",
      "1,800+ dynamic ad creative variants across Meta & TikTok",
      "Checkout optimization rebuilt on headless Shopify Hydrogen",
    ],
  },
  {
    cat: "CASE STUDY C // ENTERPRISE SAAS",
    metric: "89%",
    metricLabel: "CAC REDUCTION SLASHED",
    title: "Slashing CAC by 89% while Dominating Generative AI Search Answers",
    stats: ["89% CAC↓", "#1 AI Rank", "3.1× Demo Speed"],
    levers: [
      "Generative AEO content engine targeting ChatGPT & Perplexity",
      "Autonomous SDR agents working 24/7 inbound inquiries",
      "Programmatic ABM campaign strategy for Fortune 500 accounts",
    ],
  },
];

function StageProof({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.4, 0.5);
  const [active, setActive] = useState(0);
  const c = CASES[active];

  return (
    <div className="absolute right-5 sm:right-8 md:right-14 top-[10%] md:top-[14%] w-[85vw] max-w-[370px] max-w-[calc(100vw-65px)] max-h-full overflow-visible scrollbar-hide z-20" style={slideStyle(o, "right")}>
      <div className="p-4 sm:p-6 rounded-3xl liquid-glass overflow-hidden">

        {/* Clean single-line header */}
        <div className="flex items-center justify-between gap-2 mb-3 font-mono">
          <span className="text-[10px] font-bold text-[var(--gold)] tracking-[0.18em] uppercase truncate">
            ◆ Proof ” Hard Growth Metrics
          </span>
          <span className="text-[9px] opacity-40 shrink-0 uppercase tracking-widest">
            DISGUISED
          </span>
        </div>

        {/* Case Filter Tabs */}
        <div className="flex gap-1 mb-4 flex-wrap">
          {CASES.map((item, i) => (
            <button
              key={item.cat}
              onClick={() => { setActive(i); audioEngine.playClickSound(); }}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className={`px-2.5 py-1 rounded-full text-[clamp(8px,1.2vw,10px)] font-mono font-bold transition-all ${
                active === i
                  ? "bg-[var(--gold)] text-[#171717] shadow-[0_4px_16px_var(--shadow-gold)]"
                  : "liquid-glass-pill opacity-70 hover:opacity-100"
              }`}
            >
              {item.cat.split(" // ")[1]}
            </button>
          ))}
        </div>

        <div className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold font-mono text-[var(--gold)] mb-0.5 tracking-tight">{c.metric}</div>
        <div className="text-[clamp(8px,1.2vw,10px)] font-mono opacity-60 mb-3 tracking-widest uppercase">{c.metricLabel}</div>
        <p className="text-[clamp(0.75rem,1.5vw,0.875rem)] font-bold leading-snug mb-4">{c.title}</p>

        {/* Highlight Stats */}
        <div className="grid grid-cols-3 gap-1.5 mb-4">
          {c.stats.map((s) => (
            <div key={s} className="px-1.5 py-1.5 rounded-xl liquid-glass-pill text-center overflow-hidden">
              <div className="text-[clamp(8px,1.2vw,10px)] font-mono font-bold truncate">{s}</div>
            </div>
          ))}
        </div>

        <div className="text-[9px] font-mono text-[var(--gold)] tracking-widest uppercase mb-1.5 font-bold">Key Growth Levers</div>
        <ul className="space-y-1.5">
          {c.levers.map((l) => (
            <li key={l} className="flex items-start gap-1.5 text-[clamp(10px,1.5vw,12px)] opacity-80 leading-snug">
              <span className="text-[var(--gold)] mt-0.5 shrink-0">◆</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
/* Stage 4 ” PROCESS (Liquid Glass 4-Phase Path)                      */
/* ════════════════════════════════════════════════════════════ */
const PHASES = [
  {
    num: "01", title: "Discover", dur: "1–2 WKS",
    headline: "Decode the business behind the brief.",
    desc: "Forensic audit and strategy.",
    deliverables: ["Product North Star", "Audit & gap analysis", "Success metrics"],
  },
  {
    num: "02", title: "Architect", dur: "2–3 WKS",
    headline: "Map the system, not just the screens.",
    desc: "IA and data models built in parallel.",
    deliverables: ["Design system v1", "IA & data schema", "Interactive prototype"],
  },
  {
    num: "03", title: "Engineer", dur: "6–14 WKS",
    headline: "Ship in fortnightly waves, in production.",
    desc: "Two-week sprints. Zero agency theatre.",
    deliverables: ["Production releases", "Test suite & CI/CD", "Live dashboards"],
  },
  {
    num: "04", title: "Amplify", dur: "ONGOING",
    headline: "Compound the launch into a flywheel.",
    desc: "Data-driven roadmaps for compounding growth.",
    deliverables: ["QBR & roadmap", "Experiment program", "On-call retainer"],
  },
];

function StageProcess({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.5, 0.6);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="absolute bottom-[8%] left-0 right-0 flex justify-center px-4 sm:px-8 md:px-16" style={slideStyle(o, "down")}>
      <div className="flex flex-col items-center gap-4 max-w-5xl w-full">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill border-[var(--gold)]/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
          <span className="text-[10px] font-mono text-[var(--gold)] tracking-[0.25em] uppercase font-bold">
            A predictable path from first call to compounding outcomes
          </span>
        </div>

        <div
          onMouseLeave={() => setHoveredIdx(null)}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 w-full items-end"
        >
          {PHASES.map((p, i) => {
            const isActive = hoveredIdx === i;
            return (
              <div
                key={p.num}
                onMouseEnter={() => { setHoveredIdx(i); audioEngine.playHoverSound(); }}
                className={`flex flex-col rounded-2xl liquid-glass cursor-pointer transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "border-[var(--gold)] shadow-[0_16px_40px_var(--shadow-gold)] p-5 scale-105"
                    : "hover:border-black/30 dark:hover:border-white/40 p-3.5 opacity-90"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? "text-[var(--gold)]" : "opacity-50"}`}>
                    {p.num}
                  </span>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-mono font-bold ${
                    isActive ? "border border-[var(--gold)]/50 text-[var(--gold)] bg-[var(--gold)]/10" : "liquid-glass-pill opacity-50"
                  }`}>
                    {p.dur}
                  </div>
                </div>

                <div className={`font-extrabold transition-all ${isActive ? "text-xl mb-2" : "text-sm text-center py-1"}`}>
                  {p.title}
                </div>

                {/* ONLY the active hovered card opens its detailed body */}
                {isActive && (
                  <div className="animate-fadeIn">
                    <div className="text-xs font-semibold opacity-90 mb-2">{p.headline}</div>
                    <p className="text-[11px] opacity-75 leading-relaxed mb-3 font-mono">{p.desc}</p>
                    <div className="text-[9px] font-mono text-[var(--gold)] tracking-wider uppercase mb-1.5 font-bold">Key Deliverables</div>
                    <ul className="space-y-1">
                      {p.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-1.5 text-[10px] font-mono opacity-80">
                          <span className="text-[var(--gold)] text-[8px]">◆</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
/* Stage 5 ” STATS & WHY JENESIS (100% PERFECTLY CENTERED)            */
/* ════════════════════════════════════════════════════════════ */
const STATS_DATA = [
  { val: "$14.2M+", label: "Revenue added for clients", sub: "Disguised client ROI total" },
  { val: "240+",   label: "Enterprise clients",       sub: "Logistics, finance, health & retail" },
  { val: "1.4K",   label: "AI models in production",  sub: "18M+ requests / day" },
  { val: "99.99%", label: "Platform uptime SLA",       sub: "Multi-region, multi-cloud" },
];

function StageStats({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.6, 0.7);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start md:justify-center pt-[15vh] md:pt-0 overflow-y-auto scrollbar-hide pb-[10vh] px-4 sm:px-8 md:px-16" style={slideStyle(o, "none")}>
      <div className="w-full max-w-3xl lg:max-w-4xl text-center">
        <div className="text-center mb-6 md:mb-8">
          <div className="text-[9px] font-mono text-[var(--gold)] tracking-[0.35em] uppercase mb-2 font-bold">Why Jenesis ” Premium Positioning</div>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold max-w-xl mx-auto leading-tight">Numbers We Run The Business By.</h2>
        </div>
        <div
          onMouseLeave={() => setHoveredIdx(null)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full"
        >
          {STATS_DATA.map((s, i) => (
            <div
              key={s.val}
              onMouseEnter={() => { setHoveredIdx(i); audioEngine.playHoverSound(); }}
              className={`p-[clamp(1rem,2.5vw,1.25rem)] rounded-2xl liquid-glass cursor-default text-center transition-all duration-300 ${
                hoveredIdx === i
                  ? "border-[var(--gold)] shadow-[0_16px_40px_var(--shadow-gold)] scale-105"
                  : "hover:border-black/30 dark:hover:border-white/40 opacity-90"
              }`}
            >
              <div className={`text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold font-mono mb-1 transition-colors ${hoveredIdx === i ? "text-[var(--gold)]" : ""}`}>
                {s.val}
              </div>
              <div className="text-xs font-bold opacity-90 mb-0.5">{s.label}</div>
              <div className="text-[9px] opacity-60 mt-1 font-mono">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
/* Stage 6 ” TESTIMONIALS & RENEWAL METRICS                          */
/* ════════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { quote: "Jenesis didn't just build us a product ” they rebuilt our operating cadence. Shipped six weeks ahead of schedule and is now the spine of our European rollout.", metric: "3.4×", metricLabel: "throughput in 90 days", name: "Mira Castellanos", role: "COO · Global Wealth Platform" },
  { quote: "We've worked with the big consultancies. None matched Jenesis on velocity or design fidelity. Our retention curve has a visible inflection from the week we shipped their redesign.", metric: "+41%", metricLabel: "30-day retention", name: "Devon Park", role: "Head of Product · European Premium Flagship" },
  { quote: "The AI agents they architected handle 78% of our tier-1 support volume with higher CSAT than our human team did. Genuinely category-defining work.", metric: "78%", metricLabel: "tickets auto-resolved", name: "Yuki Tanaka", role: "CTO · B2B Cloud Infrastructure" },
];

function StageTestimonials({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.7, 0.8);
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start md:justify-center pt-[15vh] md:pt-0 overflow-y-auto scrollbar-hide pb-[10vh] px-4 sm:px-8 md:px-16" style={slideStyle(o, "up")}>
      <div className="relative max-w-2xl w-full p-6 md:p-8 rounded-3xl liquid-glass text-center mb-5 overflow-hidden">
        {/* Metric Header Pill */}
        <div className="inline-flex items-center gap-3 px-3.5 py-1 rounded-full liquid-glass-pill border-[var(--gold)]/35 mb-4">
          <span className="text-[10px] font-mono text-[var(--gold)] font-bold tracking-[0.25em] uppercase">4.97 avg NPS</span>
          <span className="opacity-30">·</span>
          <span className="text-[10px] font-mono text-[var(--gold)] font-bold tracking-[0.25em] uppercase">96% Renewal Rate</span>
        </div>

        <div className="flex justify-center gap-0.5 mb-4">
          {Array(5).fill(null).map((_, i) => <span key={i} className="text-[var(--gold)] text-base">★</span>)}
        </div>
        <blockquote className="text-[clamp(1rem,2vw,1.125rem)] opacity-90 leading-relaxed mb-5 italic">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <div className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-extrabold font-mono text-[var(--gold)] mb-1">{t.metric}</div>
        <div className="text-[10px] opacity-60 font-mono mb-4 uppercase tracking-widest">{t.metricLabel}</div>
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] font-mono text-xs font-bold">
            {t.name.charAt(0)}
          </div>
          <div className="text-left">
            <div className="text-sm font-bold">{t.name}</div>
            <div className="text-[10px] opacity-60 font-mono">{t.role}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); audioEngine.playClickSound(); }}
            onMouseEnter={() => audioEngine.playHoverSound()}
            className={`rounded-full transition-all duration-300 ${active === i ? "w-6 h-2 bg-[var(--gold)] dark:bg-[var(--gold)] shadow-[0_0_8px_var(--gold)]" : "w-2 h-2 opacity-30 hover:opacity-60"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
/* Stage 7 ” FAQ & TRUSTED CLIENTS                                    */
/* ════════════════════════════════════════════════════════════ */
const FAQS = [
  { q: "How does engagement typically start?", a: "A 30-min discovery call followed by a 2-week sprint zero." },
  { q: "What does pricing look like?", a: "Sprint zero from $8,000. Full product builds from $60K–$400K+ depending on scope, team size and timeline." },
  { q: "Do you work as an embedded team or vendor?", a: "Embedded. Your Slack, your standups, your backlog ” with no black-box agency theatre." },
  { q: "Who owns the IP and the code?", a: "You own 100% from day one." },
];

const CLIENTS = ["Helix", "Aurora", "Nimbus", "Obsidian", "Vanta", "Zenith", "Nova", "Echelon"];

function StageFAQ({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.8, 0.9);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start md:justify-center pt-[15vh] md:pt-0 overflow-y-auto scrollbar-hide pb-[10vh] px-4 sm:px-8 md:px-16" style={slideStyle(o, "right")}>
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div>
          <div className="text-[10px] font-mono text-[var(--gold)] tracking-[0.3em] uppercase mb-5 font-bold">Trusted Worldwide</div>
          <div className="flex flex-wrap gap-5 mb-8">
            {CLIENTS.map((c) => (
              <span key={c}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="text-base font-semibold opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default">
                {c}
              </span>
            ))}
          </div>
          <div className="text-[9px] font-mono opacity-50 tracking-widest mb-2">37 Countries · 240+ Clients</div>
          <h3 className="text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">The questions every CTO asks us.</h3>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <div key={i} className={`rounded-2xl liquid-glass transition-all duration-300 overflow-hidden ${
              open === i ? "border-[var(--gold)]/60 shadow-[0_8px_30px_var(--shadow-gold)]" : "hover:border-black/30 dark:hover:border-white/40"
            }`}>
              <button
                onClick={() => { setOpen(open === i ? null : i); audioEngine.playClickSound(); }}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left"
              >
                <span className="text-sm font-bold pr-4">{faq.q}</span>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                  open === i ? "border-[var(--gold)] bg-[var(--gold)] text-[#171717] rotate-45" : "border-black/20 dark:border-white/20 opacity-60"
                }`}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </button>
              {open === i && (
                <div className="px-4 pb-4">
                  <p className="text-xs opacity-80 leading-relaxed font-mono">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
/* Stage 8 ” CTA / CONTACT (Liquid Glass Audit Form)                */
/* ════════════════════════════════════════════════════════════ */
const SERVICES_LIST = ["Performance Marketing", "Web & App Engineering", "Enterprise AI Systems", "SEO & AEO Strategy"];

function StageCTA({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.9, 1.0);
  const [form, setForm] = useState({ name: "", email: "", company: "", services: [] as string[] });
  const [done, setDone] = useState(false);

  const toggle = (s: string) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(s) ? prev.services.filter(x => x !== s) : [...prev.services, s],
    }));
    audioEngine.playClickSound();
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start md:justify-center pt-[15vh] md:pt-0 overflow-y-auto scrollbar-hide pb-[10vh] px-4 sm:px-8 md:px-16" style={slideStyle(o, "up")}>
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill border-[var(--gold)]/40 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[var(--gold)] uppercase">Free 30-Minute Revenue Audit</span>
          </div>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold leading-tight mb-4">
            Ready to grow revenue through an{" "}
            <em className="not-italic text-[var(--gold)]">omni-channel</em> approach?
          </h2>
          <ul className="space-y-3 mb-6">
            {["Custom omni-channel scorecard", "Three highest-leverage opportunities", "Competitor gap analysis", "Estimated revenue impact ($)"].map(item => (
              <li key={item} className="flex items-center gap-2.5 text-sm opacity-80">
                <div className="w-4 h-4 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 flex items-center justify-center shrink-0">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l1.5 1.5L6.5 2" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 text-xs font-mono opacity-70">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
            3 audit slots remaining this month.
          </div>
        </div>

        {/* Right ” form */}
        <div className="relative p-6 md:p-7 rounded-3xl liquid-glass overflow-hidden">
          {done ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l4.5 4.5L19 6" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Audit Request Submitted!</h3>
              <p className="text-xs opacity-60 font-mono">We&apos;ll reach out within one business day.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); audioEngine.playClickSound(); setTimeout(() => setDone(true), 200); }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono opacity-60 mb-1 tracking-wider uppercase">Your name</label>
                  <input type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => audioEngine.playHoverSound()}
                    placeholder="Mira Castellanos"
                    className="w-full liquid-glass-pill rounded-xl px-3 py-2 text-xs outline-none transition-all focus:border-[var(--gold)]" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono opacity-60 mb-1 tracking-wider uppercase">Work email</label>
                  <input type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => audioEngine.playHoverSound()}
                    placeholder="mira@company.com"
                    className="w-full liquid-glass-pill rounded-xl px-3 py-2 text-xs outline-none transition-all focus:border-[var(--gold)]" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono opacity-60 mb-1 tracking-wider uppercase">Company</label>
                <input type="text" required value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  onFocus={() => audioEngine.playHoverSound()}
                  placeholder="Acme Corp"
                  className="w-full liquid-glass-pill rounded-xl px-3 py-2 text-xs outline-none transition-all focus:border-[var(--gold)]" />
              </div>
              <div>
                <label className="block text-[10px] font-mono opacity-60 mb-1.5 tracking-wider uppercase">Channels of interest</label>
                <div className="flex flex-wrap gap-1.5">
                  {SERVICES_LIST.map(s => (
                    <button key={s} type="button" onClick={() => toggle(s)}
                      onMouseEnter={() => audioEngine.playHoverSound()}
                      className={`px-2.5 py-1 rounded-full text-[9px] font-mono transition-all ${form.services.includes(s) ? "bg-[var(--gold)] text-[#171717] shadow-[0_8px_20px_rgba(200,150,12,0.4)]" : "liquid-glass-pill opacity-70 hover:opacity-100"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit"
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="w-full py-3 rounded-xl border-[var(--gold)]/50 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#171717] font-extrabold text-sm font-mono transition-all duration-300 shadow-[0_8px_25px_var(--shadow-gold)] hover:scale-[1.02] cursor-pointer">
                Book A Strategy Call →
              </button>
              <p className="text-[9px] opacity-50 text-center font-mono">No commitment. No spam.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
/* Root orchestrator                                                  */
/* ════════════════════════════════════════════════════════════ */
export default function ScrollOverlay({ scrollProgress }: Props) {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none select-none">
      <StageHero         sp={scrollProgress} />
      <StageApproach     sp={scrollProgress} />
      <StageServices     sp={scrollProgress} />
      <StageProof        sp={scrollProgress} />
      <StageProcess      sp={scrollProgress} />
      <StageStats        sp={scrollProgress} />
      <StageTestimonials sp={scrollProgress} />
      <StageFAQ          sp={scrollProgress} />
      <StageCTA          sp={scrollProgress} />
    </div>
  );
}




