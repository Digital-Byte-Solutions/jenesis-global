"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ----------------------------------------------------
 * Process — How we work
 * Linear/Stripe-grade craft: numbered rail + dense detail cards
 * -------------------------------------------------- */

type Phase = {
  n: string;
  title: string;
  sub: string;
  body: string;
  duration: string;
  outputs: string[];
};

const PHASES: Phase[] = [
  {
    n: "01",
    title: "Discover",
    sub: "Decode the business behind the brief.",
    body:
      "Strategy workshops, stakeholder interviews and a forensic audit of the current stack. We translate ambition into measurable product hypotheses before a single pixel is drawn.",
    duration: "1–2 weeks",
    outputs: ["Product North Star", "Audit & gap analysis", "Success metrics"],
  },
  {
    n: "02",
    title: "Architect",
    sub: "Map the system, not just the screens.",
    body:
      "Information architecture, data models, design tokens and brand foundations are built in parallel. Every decision is captured so engineering inherits a system, never a sketch.",
    duration: "2–3 weeks",
    outputs: ["Design system v1", "IA & data schema", "Interactive prototype"],
  },
  {
    n: "03",
    title: "Engineer",
    sub: "Ship in fortnightly waves, in production.",
    body:
      "Two-week sprints, shared backlog, no agency theatre. You see every commit. Quality is locked in with type-safety, automated tests and CI/CD from sprint one.",
    duration: "6–14 weeks",
    outputs: ["Production releases", "Test suite & CI/CD", "Live dashboards"],
  },
  {
    n: "04",
    title: "Amplify",
    sub: "Compound the launch into a flywheel.",
    body:
      "Post-launch we instrument, A/B test and iterate. Quarterly business reviews convert telemetry into roadmap so the product keeps paying back, year after year.",
    duration: "Ongoing",
    outputs: ["QBR & roadmap", "Experiment program", "On-call retainer"],
  },
];

function PhaseCard({ phase, i }: { phase: Phase; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="glass-card p-6 sm:p-7 lg:p-8 h-full flex flex-col">
        {/* Step header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/40">{phase.n}</span>
            <span className="h-px w-8 bg-white/15" />
            <span className="pill text-[10px]">
              <span className="live-dot" />
              {phase.duration}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-2">
          {phase.title}
        </h3>
        <p className="text-accent-soft text-sm font-medium mb-4">
          {phase.sub}
        </p>

        {/* Body */}
        <p className="text-white/60 text-[15px] leading-relaxed mb-6 flex-1">
          {phase.body}
        </p>

        {/* Outputs */}
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/35 mb-2.5 font-mono">
            Deliverables
          </div>
          <ul className="space-y-1.5">
            {phase.outputs.map((o) => (
              <li
                key={o}
                className="flex items-center gap-2.5 text-sm text-white/75"
              >
                <span className="text-accent text-xs">▸</span>
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const headRef = useRef<HTMLDivElement>(null);
  const headIn = useInView(headRef, { once: true, margin: "-20%" });

  return (
    <section
      id="process"
      className="relative py-28 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Ambient backdrop */}
      <div className="ambient-glow ambient-glow--left" />

      <div className="container-wide px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16 lg:mb-20"
        >
          <span className="pill mb-6 inline-flex">
            <span className="text-accent">◆</span>
            How we work
          </span>
          <h2 className="text-h1 text-display-lg gradient-text mb-5">
            A predictable path from{" "}
            <span className="font-serif italic text-white/85 font-normal">
              first call
            </span>{" "}
            to compounding outcomes.
          </h2>
          <p className="text-white/55 text-lg leading-relaxed max-w-2xl">
            Four phases. Embedded teams. No black boxes. The same operating
            model that's shipped 240+ enterprise products in 37 countries.
          </p>
        </motion.div>

        {/* Phase grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {PHASES.map((p, i) => (
            <PhaseCard key={p.n} phase={p} i={i} />
          ))}
        </div>

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 lg:mt-16 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-white/[0.06]"
        >
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span className="live-dot" />
            <span>
              Average engagement:{" "}
              <span className="text-white">12 weeks to first launch</span>
            </span>
          </div>
          <a href="#contact" className="btn btn-ghost text-sm">
            See a sample roadmap
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
