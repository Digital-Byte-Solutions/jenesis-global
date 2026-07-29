"use client";

import { useState } from "react";
import { audioEngine } from "@/lib/AudioEngine";

const CASE_STUDIES = [
  {
    num: "01",
    category: "FINTECH",
    client: "Global Wealth Platform",
    title: "Scaling ARR from $8M to $22.2M via Omni-Channel Acquisition & AI Lead Scoring",
    metric: "+$14.2M",
    metricLabel: "ARR ADDED (17 MO.)",
    stats: [
      { val: "+210%", label: "MRR GROWTH" },
      { val: "3.4 Mo.", label: "CAC PAYBACK" },
      { val: "4.8x", label: "PIPELINE LIFT" },
    ],
    description:
      "By replacing three fragmented agencies with Jenesis' connected omni-channel system, this wealth platform scaled customer acquisition while cutting CAC by 42%.",
    levers: [
      "Omni-channel paid media acquisition engine",
      "Sub-500ms Next.js web flagship CRO overhaul",
      "AI lead-scoring model trained on 18-month CRM data",
      "Programmatic SEO targeting 4,200+ long-tail keywords",
    ],
    tags: ["FINTECH"],
  },
  {
    num: "02",
    category: "D2C LUXURY",
    client: "European Premium Flagship",
    title: "Achieving 4.2x ROAS & +340% Conversion Lift via 60 FPS WebGL Flagship",
    metric: "4.2x",
    metricLabel: "BLENDED ROAS",
    stats: [
      { val: "+340%", label: "CONVERSION LIFT" },
      { val: "60 FPS", label: "SITE PERFORMANCE" },
      { val: "–62%", label: "BOUNCE RATE" },
    ],
    description:
      "A European luxury brand struggling with checkout abandonment rebuilt their flagship as a 60 FPS WebGL experience. The immersive product visualiser lifted conversion 340% in 90 days.",
    levers: [
      "Three.js product visualiser with real-time colour & material switching",
      "Dynamic creative testing across Meta & TikTok (1,800+ variants)",
      "Checkout funnel rebuilt on Shopify Hydrogen with sub-400ms LCP",
      "Retargeting AI that predicts purchase intent 72 hrs in advance",
    ],
    tags: ["D2C LUXURY"],
  },
  {
    num: "03",
    category: "ENTERPRISE SAAS",
    client: "B2B Cloud Infrastructure",
    title: "Slashing CAC by 89% while Dominating Generative AI Search Answers",
    metric: "89%",
    metricLabel: "CAC REDUCTION",
    stats: [
      { val: "89%", label: "CAC REDUCTION" },
      { val: "#1", label: "AI ANSWER SHARE" },
      { val: "3.1x", label: "DEMO PIPELINE" },
    ],
    description:
      "Enterprise SaaS infrastructure platform achieved category dominance in AI-generated search results while cutting cost-per-demo by 89% through AEO and autonomous demand-gen workflows.",
    levers: [
      "AEO content engine targeting ChatGPT & Perplexity citations",
      "Autonomous SDR agents qualifying inbound leads 24/7",
      "Programmatic ABM targeting Fortune 500 buying committees",
      "Thought-leadership flywheel compounding domain authority",
    ],
    tags: ["ENTERPRISE SAAS"],
  },
];

const FILTERS = ["ALL", "FINTECH", "D2C LUXURY", "ENTERPRISE SAAS"];

export default function ProofSection() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeCase, setActiveCase] = useState(0);

  const filtered = activeFilter === "ALL"
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.category === activeFilter);

  const detail = CASE_STUDIES[activeCase];

  return (
    <section
      id="proof"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-16 py-24 bg-[#060608]/95 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ff1744]/40 bg-[#ff1744]/10 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744] animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#ff4d8d] uppercase">
            Proof — Hard Numbers Over Adjectives
          </span>
        </div>

        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Disguised case studies.{" "}
            <em className="not-italic text-[#ff1744]">Real revenue numbers.</em>
          </h2>

          {/* Filter pills */}
          <div className="flex gap-2 flex-wrap shrink-0">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => { setActiveFilter(f); audioEngine.playClickSound(); }}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className={`px-4 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider transition-all ${
                  activeFilter === f
                    ? "bg-[#ff1744] text-white shadow-[0_0_15px_rgba(255,23,68,0.4)]"
                    : "bg-white/5 text-gray-400 border border-white/10 hover:border-[#ff1744]/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: case list */}
          <div className="flex flex-col gap-3">
            {filtered.map((cs, idx) => {
              const globalIdx = CASE_STUDIES.indexOf(cs);
              const isActive = globalIdx === activeCase;
              return (
                <button
                  key={cs.num}
                  onClick={() => { setActiveCase(globalIdx); audioEngine.playClickSound(); }}
                  onMouseEnter={() => audioEngine.playHoverSound()}
                  className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? "border-[#ff1744] bg-[#ff1744]/5"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                      <span className="font-bold">{cs.num}</span>
                      <span>·</span>
                      <span className={isActive ? "text-[#ff4d8d]" : ""}>{cs.category}</span>
                      <span className="hidden sm:inline text-gray-600">{cs.client}</span>
                    </div>
                    <span className={`text-sm font-extrabold font-mono ${isActive ? "text-[#ff1744]" : "text-gray-400"}`}>
                      {cs.metric}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white leading-snug">{cs.title}</p>
                </button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#ff4d8d] tracking-wider mb-1">
              <span>CASE STUDY {detail.num}</span>
              <span>·</span>
              <span>{detail.category}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{detail.client}</h3>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-extrabold font-mono text-[#ff1744]">{detail.metric}</span>
              <span className="text-[10px] font-mono text-gray-500">{detail.metricLabel}</span>
            </div>

            <p className="text-sm font-bold text-white leading-snug mb-3">{detail.title}</p>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">{detail.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {detail.stats.map((s) => (
                <div key={s.label} className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                  <div className="text-lg font-extrabold font-mono text-white">{s.val}</div>
                  <div className="text-[9px] font-mono text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="text-[10px] font-mono text-[#ff4d8d] tracking-widest mb-3 uppercase">
              Omni-Channel Levers Implemented
            </div>
            <ul className="space-y-2">
              {detail.levers.map((l) => (
                <li key={l} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-[#ff1744] mt-0.5">◆</span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
