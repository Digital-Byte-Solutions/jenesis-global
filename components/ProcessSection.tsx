"use client";

import { useState } from "react";
import { audioEngine } from "@/lib/AudioEngine";

const PHASES = [
  {
    num: "01",
    duration: "1–2 WEEKS",
    title: "Discover",
    subtitle: "Decode the business behind the brief.",
    body: "Strategy workshops, stakeholder interviews and a forensic audit of the current stack. We translate ambition into measurable product hypotheses before a single pixel is drawn.",
    deliverables: ["Product North Star", "Audit & gap analysis", "Success metrics"],
  },
  {
    num: "02",
    duration: "2–3 WEEKS",
    title: "Architect",
    subtitle: "Map the system, not just the screens.",
    body: "Information architecture, data models, design tokens and brand foundations are built in parallel. Every decision is captured so engineering inherits a system, never a sketch.",
    deliverables: ["Design system v1", "IA & data schema", "Interactive prototype"],
  },
  {
    num: "03",
    duration: "6–14 WEEKS",
    title: "Engineer",
    subtitle: "Ship in fortnightly waves, in production.",
    body: "Two-week sprints, shared backlog, no agency theatre. You see every commit. Quality is locked in with type-safety, automated tests and CI/CD from sprint one.",
    deliverables: ["Production releases", "Test suite & CI/CD", "Live dashboards"],
  },
  {
    num: "04",
    duration: "ONGOING",
    title: "Amplify",
    subtitle: "Compound the launch into a flywheel.",
    body: "Post-launch we instrument, A/B test and iterate. Quarterly business reviews convert telemetry into roadmap so the product keeps paying back, year after year.",
    deliverables: ["QBR & roadmap", "Experiment program", "On-call retainer"],
  },
];

export default function ProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="process"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-16 py-24 bg-[#050507]/95 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Ticker / marquee */}
        <div className="flex gap-8 text-[11px] font-mono font-bold tracking-widest text-gray-600 mb-10 overflow-hidden">
          {["PREMIUM ENGINEERING", "EST. 2026", "JENESIS GLOBAL", "AI ECOSYSTEMS", "CLOUD INFRASTRUCTURE"].map((t, i) => (
            <span key={i} className="flex items-center gap-4 shrink-0">
              {t} <span className="text-[#ff1744]">◆</span>
            </span>
          ))}
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ff1744]/40 bg-[#ff1744]/10 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744] animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#ff4d8d] uppercase">
            How We Work
          </span>
        </div>

        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            A predictable path from{" "}
            <em className="not-italic text-[#ff1744]">first call</em>{" "}
            to compounding outcomes.
          </h2>
          <p className="text-base text-gray-400 max-w-xl">
            Four phases. Embedded teams. No black boxes. The same operating model that's shipped 240+ enterprise products in 37 countries.
          </p>
          <p className="text-[11px] font-mono text-gray-600 mt-2">
            Average engagement: 12 weeks to first launch{" "}
            <a href="#" className="text-[#ff4d8d] hover:underline">See a sample roadmap →</a>
          </p>
        </div>

        {/* Phase Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PHASES.map((p, idx) => (
            <div
              key={p.num}
              onClick={() => { setActive(idx); audioEngine.playClickSound(); }}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                active === idx
                  ? "border-[#ff1744] bg-[#ff1744]/5"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              {/* Phase header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-gray-600">{p.num}</span>
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider border ${
                  active === idx
                    ? "border-[#ff1744]/50 text-[#ff4d8d] bg-[#ff1744]/10"
                    : "border-white/10 text-gray-500"
                }`}>
                  <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
                  {p.duration}
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-1">{p.title}</h3>
              <div className={`text-xs font-semibold mb-3 ${active === idx ? "text-[#ff1744]" : "text-[#ff4d8d]/60"}`}>
                {p.subtitle}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-5">{p.body}</p>

              <div className="text-[9px] font-mono text-gray-600 tracking-widest uppercase mb-2">DELIVERABLES</div>
              <ul className="space-y-1.5">
                {p.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="text-[#ff1744] mt-0.5">◆</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
