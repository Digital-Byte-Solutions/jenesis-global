"use client";

import { useMemo, useState } from "react";
import { audioEngine } from "@/lib/AudioEngine";

interface Props { scrollProgress: number; }

/* ─── Stage opacity helper ───────────────────────────────────────── */
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

/* ─── Slide-in style helper ──────────────────────────────────────── */
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

/* ══════════════════════════════════════════════════════════════════ */
/* Stage 0 — HERO                                                     */
/* ══════════════════════════════════════════════════════════════════ */
function StageHero({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0, 0.11);
  return (
    <div className="absolute left-8 md:left-14 bottom-[14%] max-w-[520px]" style={slideStyle(o, "left")}>
      <div className="flex items-center gap-2 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744] animate-pulse" />
        <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#ff4d8d] uppercase">
          Omni-Channel Revenue Engine
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.08] tracking-tight mb-4">
        We help brands grow revenue through an{" "}
        <span className="text-[#ff1744]">omni-channel</span> approach.
      </h1>

      <p className="text-sm md:text-base text-white/55 leading-relaxed mb-7 max-w-md">
        One unified growth engine uniting Performance Marketing, Web &amp; App Engineering,
        Enterprise AI Systems, and Search Engine Dominance for maximum ROI.
      </p>

      <div className="flex gap-8 mb-7 border-l-2 border-[#ff1744]/40 pl-5">
        {[["$14.2M+", "Revenue Generated"], ["4.2×", "Avg. ROAS"], ["+340%", "Conversion Lift"]].map(([v, l]) => (
          <div key={l}>
            <div className="text-xl font-extrabold font-mono text-white">{v}</div>
            <div className="text-[10px] text-white/35 mt-0.5">{l}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <a
          href="#"
          onMouseEnter={() => audioEngine.playHoverSound()}
          onClick={() => audioEngine.playClickSound()}
          className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff1744] hover:bg-[#ff4d8d] text-white text-sm font-bold transition-all duration-300 shadow-[0_0_28px_rgba(255,23,68,0.5)] hover:shadow-[0_0_44px_rgba(255,23,68,0.7)]"
        >
          Book a strategy call
          <svg className="group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <div className="flex items-center gap-2 text-xs font-mono text-white/45">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          3 slots open for Q3/Q4
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/* Stage 1 — MANIFESTO  (only hovered pillar opens)                   */
/* ══════════════════════════════════════════════════════════════════ */
const PILLARS = [
  {
    num: "01",
    tag: "INTELLIGENT",
    headline: "Adaptive intelligence, not static playbooks.",
    desc: "Every system we ship has embedded learning loops. Predictive CAC optimisation, dynamic creative rotation and AI-led bidding strategies compound from sprint one.",
    stat: "89% efficiency lift",
  },
  {
    num: "02",
    tag: "IMMERSIVE",
    headline: "60 FPS interfaces that convert, not just impress.",
    desc: "We build WebGL flagships, 3-D product visualisers and sub-400ms LCP storefronts. Every interaction is friction-audited against the conversion funnel.",
    stat: "4.2× avg. ROAS",
  },
  {
    num: "03",
    tag: "ENTERPRISE",
    headline: "Infrastructure that compounds client ARR.",
    desc: "Multi-region cloud architecture, 99.99% uptime SLAs and autonomous agent loops that scale without headcount.",
    stat: "99.99% uptime SLA",
  },
];

function StageManifesto({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.11, 0.22);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={slideStyle(o, "up")}>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744] animate-pulse" />
        <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#ff4d8d] uppercase">Manifesto</span>
      </div>

      <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight max-w-4xl mb-8">
        We don&apos;t build software.{" "}
        <em className="not-italic text-[#ff1744]">We architect omni-channel revenue engines.</em>
      </h2>

      {/* Interactive pillar cards — only hovered pillar emerges */}
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl w-full items-stretch">
        {PILLARS.map((p, i) => {
          const isActive = hoveredIdx === i;
          return (
            <div
              key={p.tag}
              onMouseEnter={() => { setHoveredIdx(i); audioEngine.playHoverSound(); }}
              className={`relative cursor-pointer flex flex-col text-left rounded-2xl border backdrop-blur-xl transition-all duration-400 overflow-hidden ${
                isActive
                  ? "border-[#ff1744] bg-black/90 shadow-[0_0_30px_rgba(255,23,68,0.25)] p-5 w-[300px]"
                  : "border-white/15 bg-black/60 hover:border-white/30 p-4 w-[160px] opacity-75 hover:opacity-100"
              }`}
              style={{ transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff1744] to-[#ff4d8d]" />
              )}

              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono text-white/30">{p.num}</span>
                <span className={`text-[10px] font-mono font-bold tracking-[0.2em] ${isActive ? "text-[#ff1744]" : "text-[#ff4d8d]/70"}`}>
                  {p.tag}
                </span>
              </div>

              <div className={`font-bold text-white leading-snug mb-1 ${isActive ? "text-base" : "text-sm text-center py-2"}`}>
                {isActive ? p.headline : p.tag}
              </div>

              {isActive && (
                <div className="animate-fadeIn mt-2">
                  <p className="text-xs text-white/55 leading-relaxed mb-4">{p.desc}</p>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ff1744]/15 border border-[#ff1744]/30">
                    <span className="w-1 h-1 rounded-full bg-[#ff1744] animate-pulse" />
                    <span className="text-[9px] font-mono text-[#ff4d8d] font-bold">{p.stat}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/* Stage 2 — SERVICES  (only hovered service opens)                  */
/* ══════════════════════════════════════════════════════════════════ */
const SERVICES = [
  {
    icon: "↗",  num: "01", title: "Performance Marketing",  metric: "4.2×",  metricLabel: "ROAS",
    side: "left" as const, top: "top-[20%]",
    desc: "Scalable omni-channel acquisition engines. Paid media, CAC optimisation, and cross-platform scaling built for guaranteed ROAS.",
    tags: ["Paid Media", "CAC Optimisation", "Cross-Platform Scaling"],
  },
  {
    icon: "</>", num: "02", title: "Web & App Engineering",   metric: "<0.4s", metricLabel: "LOAD",
    side: "right" as const, top: "top-[20%]",
    desc: "60 FPS, conversion-optimised digital flagships with sub-second speeds. Next.js 14 / WebGL / React Native.",
    tags: ["Next.js 14 / WebGL", "Conversion Engineering", "React Native"],
  },
  {
    icon: "⬡",  num: "03", title: "Enterprise AI Systems",   metric: "89%",   metricLabel: "EFFICIENCY",
    side: "left" as const, top: "top-[58%]",
    desc: "Autonomous 24/7 operational workflows and predictive intelligence. Agent loops trained on your specific data.",
    tags: ["Autonomous Agents", "Predictive Scoring", "AI Workflows"],
  },
  {
    icon: "⊕",  num: "04", title: "SEO & AEO Strategy",      metric: "#1",    metricLabel: "AI CITATIONS",
    side: "right" as const, top: "top-[58%]",
    desc: "Generative AI answer control across ChatGPT, Perplexity & search engines. Category authority, compounding.",
    tags: ["Generative Optimisation", "Organic Search", "Entity Authority"],
  },
];

function StageServices({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.22, 0.33);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity: o, transition: "opacity 0.6s ease" }}>
      {SERVICES.map((s, i) => {
        const isActive = hoveredIdx === i;
        const hPos = s.side === "left" ? "left-6 md:left-12" : "right-6 md:right-12";
        const delay = i * 70;

        return (
          <div
            key={s.num}
            onMouseEnter={() => { setHoveredIdx(i); audioEngine.playHoverSound(); }}
            style={{
              pointerEvents: o > 0.08 ? "auto" : "none",
              transition: `opacity 0.5s ease ${delay}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
              transform: `translateX(${s.side === "left" ? -28 * (1 - o) : 28 * (1 - o)}px)`,
            }}
            className={`absolute ${s.top} ${hPos} cursor-pointer`}
          >
            <div
              className={`p-4 rounded-2xl border backdrop-blur-xl transition-all duration-400 overflow-hidden ${
                isActive
                  ? "border-[#ff1744] bg-black/90 shadow-[0_0_25px_rgba(255,23,68,0.25)] w-[270px]"
                  : "border-white/15 bg-black/60 hover:border-white/30 w-[210px] opacity-75 hover:opacity-100"
              }`}
              style={{ transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#ff1744]/15 border border-[#ff1744]/30 flex items-center justify-center text-[#ff1744] text-sm font-mono">
                  {s.icon}
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold font-mono text-white">{s.metric}</div>
                  <div className="text-[8px] font-mono text-white/35">{s.metricLabel}</div>
                </div>
              </div>

              <div className="text-sm font-bold text-white mb-1">{s.title}</div>

              {/* ONLY hovered service opens details */}
              {isActive && (
                <div className="animate-fadeIn mt-2">
                  <p className="text-[11px] text-white/55 leading-relaxed mb-3">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[9px] font-mono text-white/50 border border-white/10 rounded-full bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Center label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <div className="text-[9px] font-mono text-white/15 tracking-[0.45em] uppercase">Core Pillars</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/* Stage 3 — PROOF  (case study filter + detail panel)               */
/* ══════════════════════════════════════════════════════════════════ */
const CASES = [
  {
    cat: "FINTECH", metric: "+$14.2M", metricLabel: "ARR ADDED",
    title: "Scaling ARR from $8M to $22.2M via Omni-Channel Acquisition & AI Lead Scoring",
    stats: ["+210% MRR", "3.4 Mo. CAC", "4.8× Pipeline"],
    levers: ["Omni-channel paid media acquisition", "Sub-500ms Next.js CRO overhaul", "AI lead-scoring trained on 18-month CRM data"],
  },
  {
    cat: "D2C LUXURY", metric: "4.2×", metricLabel: "ROAS",
    title: "Achieving 4.2× ROAS & +340% Conversion Lift via 60 FPS WebGL Flagship",
    stats: ["+340% Conv.", "60 FPS", "–62% Bounce"],
    levers: ["Three.js product visualiser", "1,800+ dynamic creative variants", "Checkout rebuilt on Shopify Hydrogen"],
  },
  {
    cat: "ENTERPRISE SAAS", metric: "89%", metricLabel: "CAC REDUCTION",
    title: "Slashing CAC by 89% while Dominating Generative AI Search Answers",
    stats: ["89% CAC↓", "#1 AI Answers", "3.1× Demos"],
    levers: ["AEO content engine targeting ChatGPT & Perplexity", "Autonomous SDR agents 24/7", "Programmatic ABM for Fortune 500"],
  },
];

function StageProof({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.33, 0.44);
  const [active, setActive] = useState(0);
  const c = CASES[active];

  return (
    <div className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 w-[340px] max-w-[90vw]" style={slideStyle(o, "right")}>
      <div className="p-5 rounded-2xl bg-black/85 border border-white/10 backdrop-blur-xl">
        <div className="text-[10px] font-mono text-[#ff4d8d] tracking-[0.25em] mb-3 uppercase">◆ Proof — Hard Numbers</div>

        <div className="flex gap-2 mb-4 flex-wrap">
          {CASES.map((c, i) => (
            <button key={c.cat}
              onClick={() => { setActive(i); audioEngine.playClickSound(); }}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold transition-all ${
                active === i ? "bg-[#ff1744] text-white shadow-[0_0_10px_rgba(255,23,68,0.4)]" : "bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/10"
              }`}
            >
              {c.cat}
            </button>
          ))}
        </div>

        <div className="text-2xl font-extrabold font-mono text-[#ff1744] mb-0.5">{c.metric}</div>
        <div className="text-[9px] font-mono text-white/35 mb-3 tracking-wider">{c.metricLabel}</div>
        <p className="text-xs font-semibold text-white leading-snug mb-4">{c.title}</p>

        <div className="flex gap-2 mb-4">
          {c.stats.map((s) => (
            <div key={s} className="flex-1 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-center">
              <div className="text-[9px] text-white/60 font-mono">{s}</div>
            </div>
          ))}
        </div>

        <div className="text-[9px] font-mono text-[#ff4d8d]/70 tracking-widest uppercase mb-2">Levers Implemented</div>
        <ul className="space-y-1.5">
          {c.levers.map((l) => (
            <li key={l} className="flex items-start gap-2 text-[10px] text-white/45">
              <span className="text-[#ff1744] mt-0.5 shrink-0">◆</span>
              {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/* Stage 4 — PROCESS  (only hovered process card opens)              */
/* ══════════════════════════════════════════════════════════════════ */
const PHASES = [
  {
    num: "01", title: "Discover", dur: "1–2 WKS",
    headline: "Decode the business behind the brief.",
    desc: "Strategy workshops, stakeholder interviews and a forensic audit of the current stack.",
    deliverables: ["Product North Star", "Audit & gap analysis", "Success metrics"],
  },
  {
    num: "02", title: "Architect", dur: "2–3 WKS",
    headline: "Map the system, not just the screens.",
    desc: "Information architecture, data models and design tokens built in parallel.",
    deliverables: ["Design system v1", "IA & data schema", "Interactive prototype"],
  },
  {
    num: "03", title: "Engineer", dur: "6–14 WKS",
    headline: "Ship in fortnightly waves, in production.",
    desc: "Two-week sprints, shared backlog, no agency theatre. You see every commit.",
    deliverables: ["Production releases", "Test suite & CI/CD", "Live dashboards"],
  },
  {
    num: "04", title: "Amplify", dur: "ONGOING",
    headline: "Compound the launch into a flywheel.",
    desc: "Quarterly business reviews convert telemetry into roadmap so the product keeps paying back.",
    deliverables: ["QBR & roadmap", "Experiment program", "On-call retainer"],
  },
];

function StageProcess({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.44, 0.55);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

  return (
    <div className="absolute bottom-[8%] left-0 right-0 flex justify-center px-6" style={slideStyle(o, "down")}>
      <div className="flex flex-col items-center gap-4 max-w-5xl w-full">
        {/* Clean section subtitle header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-[#ff1744]/40 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744] animate-pulse" />
          <span className="text-[10px] font-mono text-[#ff4d8d] tracking-[0.25em] uppercase font-bold">
            A predictable path from first call to compounding outcomes
          </span>
        </div>

        {/* Phase buttons row — only hovered phase emerges & opens */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full items-end">
          {PHASES.map((p, i) => {
            const isActive = hoveredIdx === i;
            return (
              <div
                key={p.num}
                onMouseEnter={() => { setHoveredIdx(i); audioEngine.playHoverSound(); }}
                className={`relative flex flex-col rounded-2xl border cursor-pointer backdrop-blur-xl transition-all duration-400 overflow-hidden ${
                  isActive
                    ? "border-[#ff1744] bg-black/90 shadow-[0_0_30px_rgba(255,23,68,0.3)] p-5"
                    : "border-white/15 bg-black/60 hover:border-white/30 p-3 opacity-75 hover:opacity-100"
                }`}
                style={{ transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }}
              >
                {/* Active Top Crimson Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff1744] via-[#ff4d8d] to-[#ff1744]" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? "text-[#ff4d8d]" : "text-white/40"}`}>
                    {p.num}
                  </span>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[8px] font-mono font-bold ${
                    isActive ? "border-[#ff1744]/50 text-[#ff4d8d] bg-[#ff1744]/15" : "border-white/10 text-white/30"
                  }`}>
                    {p.dur}
                  </div>
                </div>

                <div className={`font-extrabold text-white transition-all ${isActive ? "text-xl mb-2" : "text-sm text-center py-1"}`}>
                  {p.title}
                </div>

                {/* ONLY the active hovered card opens its detailed body */}
                {isActive && (
                  <div className="animate-fadeIn">
                    <div className="text-xs font-semibold text-white/90 mb-2">{p.headline}</div>
                    <p className="text-[11px] text-white/55 leading-relaxed mb-3">{p.desc}</p>
                    <div className="text-[9px] font-mono text-[#ff4d8d] tracking-wider uppercase mb-1.5">Key Deliverables</div>
                    <ul className="space-y-1">
                      {p.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-1.5 text-[10px] text-white/70">
                          <span className="text-[#ff1744] text-[8px]">◆</span>
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

/* ══════════════════════════════════════════════════════════════════ */
/* Stage 5 — STATS                                                    */
/* ══════════════════════════════════════════════════════════════════ */
const STATS_DATA = [
  { val: "240+",   label: "Enterprise clients",       sub: "Logistics, finance, health & retail" },
  { val: "1.4K",   label: "AI models in production",  sub: "18M+ requests / day" },
  { val: "99.99%", label: "Platform uptime SLA",       sub: "Multi-region, multi-cloud" },
  { val: "37",     label: "Countries deployed in",    sub: "Reykjavík to Auckland" },
];

function StageStats({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.55, 0.66);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl px-6" style={slideStyle(o, "none")}>
      <div className="text-center mb-8">
        <div className="text-[9px] font-mono text-white/25 tracking-[0.35em] uppercase mb-2">Live · Updated Daily</div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">Numbers we run the business by.</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS_DATA.map((s, i) => (
          <div
            key={s.val}
            onMouseEnter={() => { setHoveredIdx(i); audioEngine.playHoverSound(); }}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`p-5 rounded-2xl border cursor-default text-center transition-all duration-300 backdrop-blur-xl ${
              hoveredIdx === i
                ? "border-[#ff1744]/60 bg-black/90 shadow-[0_0_24px_rgba(255,23,68,0.2)] scale-105"
                : "border-white/10 bg-black/80 hover:border-white/20"
            }`}
          >
            <div className={`text-4xl md:text-5xl font-extrabold font-mono mb-1 transition-colors ${hoveredIdx === i ? "text-[#ff1744]" : "text-white"}`}>
              {s.val}
            </div>
            <div className="text-xs font-bold text-white/70 mb-0.5">{s.label}</div>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: hoveredIdx === i ? "40px" : "0", opacity: hoveredIdx === i ? 1 : 0 }}
            >
              <div className="text-[9px] text-white/35 mt-1">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/* Stage 6 — TESTIMONIALS                                             */
/* ══════════════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { quote: "Jenesis didn't just build us a product — they rebuilt our operating cadence. Shipped six weeks ahead of schedule and is now the spine of our European rollout.", metric: "3.4×", metricLabel: "throughput in 90 days", name: "Mira Castellanos", role: "COO · Global Wealth Platform" },
  { quote: "We've worked with the big consultancies. None matched Jenesis on velocity or design fidelity. Our retention curve has a visible inflection from the week we shipped their redesign.", metric: "+41%", metricLabel: "30-day retention", name: "Devon Park", role: "Head of Product · European Premium Flagship" },
  { quote: "The AI agents they architected handle 78% of our tier-1 support volume with higher CSAT than our human team did. Genuinely category-defining work.", metric: "78%", metricLabel: "tickets auto-resolved", name: "Yuki Tanaka", role: "CTO · B2B Cloud Infrastructure" },
];

function StageTestimonials({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.66, 0.77);
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={slideStyle(o, "up")}>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">4.97 avg NPS</span>
        <span className="text-white/15">·</span>
        <span className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">96% Renewal</span>
      </div>

      <div className="max-w-2xl w-full p-6 rounded-2xl bg-black/85 border border-white/10 backdrop-blur-xl text-center mb-5">
        <div className="flex justify-center gap-0.5 mb-4">
          {Array(5).fill(null).map((_, i) => <span key={i} className="text-[#ff1744] text-base">★</span>)}
        </div>
        <blockquote className="text-base md:text-lg text-white/80 leading-relaxed mb-5 italic">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <div className="text-xl font-extrabold font-mono text-white mb-1">{t.metric}</div>
        <div className="text-[10px] text-white/35 font-mono mb-4">{t.metricLabel}</div>
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#ff1744]/20 border border-[#ff1744]/40 flex items-center justify-center text-[#ff1744] font-mono text-xs font-bold">
            {t.name.charAt(0)}
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-white">{t.name}</div>
            <div className="text-[10px] text-white/35 font-mono">{t.role}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); audioEngine.playClickSound(); }}
            onMouseEnter={() => audioEngine.playHoverSound()}
            className={`rounded-full transition-all duration-300 ${active === i ? "w-6 h-2 bg-[#ff1744] shadow-[0_0_8px_#ff1744]" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/* Stage 7 — FAQ + CLIENT LOGOS                                       */
/* ══════════════════════════════════════════════════════════════════ */
const FAQS = [
  { q: "How does engagement typically start?", a: "A 30-minute discovery call, then a paid 2-week sprint zero. By week two you have a product brief, design system v1, technical RFC and a fixed SOW." },
  { q: "What does pricing look like?", a: "Sprint zero from $8,000. Full product builds from $60K–$400K+ depending on scope, team size and timeline. We share a detailed breakdown in sprint zero." },
  { q: "Do you work as an embedded team or vendor?", a: "Embedded. Your Slack, your standups, your backlog — with no black-box agency theatre. You see every commit, every decision document." },
  { q: "Who owns the IP and the code?", a: "You own 100% from day one. All code in your repo, all design files in your Figma workspace. No lock-in, ever." },
];

const CLIENTS = ["Helix", "Aurora", "Nimbus", "Obsidian", "Vanta", "Zenith", "Nova", "Echelon"];

function StageFAQ({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.77, 0.88);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="absolute inset-0 flex items-center justify-center px-6" style={slideStyle(o, "right")}>
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="text-[10px] font-mono text-white/25 tracking-[0.3em] uppercase mb-5">Trusted Worldwide</div>
          <div className="flex flex-wrap gap-5 mb-8">
            {CLIENTS.map((c) => (
              <span key={c}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="text-base font-semibold text-white/25 hover:text-white/70 transition-colors duration-300 cursor-default">
                {c}
              </span>
            ))}
          </div>
          <div className="text-[9px] font-mono text-white/20 tracking-widest mb-2">37 Countries · 240+ Clients</div>
          <h3 className="text-2xl font-extrabold text-white">The questions every CTO asks us.</h3>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className={`rounded-xl border backdrop-blur-xl transition-all duration-300 ${
              open === i ? "border-[#ff1744]/40 bg-black/80" : "border-white/10 bg-black/60"
            }`}>
              <button
                onClick={() => { setOpen(open === i ? null : i); audioEngine.playClickSound(); }}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-sm font-bold text-white pr-4">{faq.q}</span>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                  open === i ? "border-[#ff1744] bg-[#ff1744] rotate-45" : "border-white/20 text-white/40"
                }`}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </button>
              {open === i && (
                <div className="px-4 pb-4">
                  <p className="text-xs text-white/50 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/* Stage 8 — CTA / CONTACT  (revenue audit form)                     */
/* ══════════════════════════════════════════════════════════════════ */
const SERVICES_LIST = ["Performance Marketing", "Web & App Engineering", "Enterprise AI Systems", "SEO & AEO Strategy"];

function StageCTA({ sp }: { sp: number }) {
  const o = useStageOpacity(sp, 0.88, 1.0);
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
    <div className="absolute inset-0 flex items-center justify-center px-6" style={slideStyle(o, "up")}>
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left — value prop */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ff1744]/40 bg-[#ff1744]/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744] animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#ff4d8d] uppercase">Free 30-Minute Revenue Audit</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
            Ready to grow revenue through an{" "}
            <em className="not-italic text-[#ff1744]">omni-channel</em> approach?
          </h2>
          <ul className="space-y-3 mb-6">
            {["Custom omni-channel scorecard", "Three highest-leverage opportunities", "Competitor gap analysis", "Estimated revenue impact ($)"].map(item => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-white/55">
                <div className="w-4 h-4 rounded-full bg-[#ff1744]/20 border border-[#ff1744]/40 flex items-center justify-center shrink-0">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l1.5 1.5L6.5 2" stroke="#ff1744" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 text-xs font-mono text-white/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            3 audit slots remaining this month.
          </div>
        </div>

        {/* Right — form */}
        <div className="p-6 rounded-2xl bg-black/85 border border-white/10 backdrop-blur-xl">
          {done ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-[#ff1744]/20 border border-[#ff1744]/40 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l4.5 4.5L19 6" stroke="#ff1744" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Audit Request Submitted!</h3>
              <p className="text-xs text-white/45">We&apos;ll reach out within one business day.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); audioEngine.playClickSound(); setTimeout(() => setDone(true), 200); }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-white/30 mb-1 tracking-wider uppercase">Your name</label>
                  <input type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => audioEngine.playHoverSound()}
                    placeholder="Mira Castellanos"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#ff1744] rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-white/30 mb-1 tracking-wider uppercase">Work email</label>
                  <input type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => audioEngine.playHoverSound()}
                    placeholder="mira@company.com"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#ff1744] rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-white/30 mb-1 tracking-wider uppercase">Company</label>
                <input type="text" required value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  onFocus={() => audioEngine.playHoverSound()}
                  placeholder="Acme Corp"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#ff1744] rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-white/30 mb-1.5 tracking-wider uppercase">Channels of interest</label>
                <div className="flex flex-wrap gap-1.5">
                  {SERVICES_LIST.map(s => (
                    <button key={s} type="button" onClick={() => toggle(s)}
                      onMouseEnter={() => audioEngine.playHoverSound()}
                      className={`px-2.5 py-1 rounded-full text-[9px] font-mono transition-all ${form.services.includes(s) ? "bg-[#ff1744] text-white shadow-[0_0_8px_rgba(255,23,68,0.4)]" : "bg-white/5 text-white/40 border border-white/10 hover:border-white/30"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit"
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="w-full py-3 rounded-xl bg-[#ff1744] hover:bg-[#ff4d8d] text-white font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,23,68,0.4)] hover:shadow-[0_0_35px_rgba(255,23,68,0.6)]">
                Claim Your Free Revenue Audit →
              </button>
              <p className="text-[9px] text-white/20 text-center">No commitment. No spam.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/* Root orchestrator                                                  */
/* ══════════════════════════════════════════════════════════════════ */
export default function ScrollOverlay({ scrollProgress }: Props) {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none select-none">
      <StageHero         sp={scrollProgress} />
      <StageManifesto    sp={scrollProgress} />
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
