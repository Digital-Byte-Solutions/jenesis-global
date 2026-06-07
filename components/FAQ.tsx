"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ----------------------------------------------------
 * FAQ — Common enterprise objections, answered
 * Accordion with single-open behaviour
 * -------------------------------------------------- */

const FAQS = [
  {
    q: "How does engagement typically start?",
    a: "We begin with a 30-minute discovery call followed by a paid 2-week sprint zero. By the end of week two you have a product brief, design system v1, technical RFC and a fixed-scope SOW for the first production release.",
  },
  {
    q: "What does pricing look like at the engagement level?",
    a: "Most projects are sprint-priced (fortnightly fixed fee per pod) rather than billed by the hour. A typical pod runs $42–68K USD per fortnight. We also offer outcome-based retainers for long-running platform work.",
  },
  {
    q: "Do you work as an embedded team or as a vendor?",
    a: "Embedded by default. Your designers, engineers and PMs sit in your Slack, your standups and your repos. We've found this is the only reliable way to ship at the velocity our clients hire us for.",
  },
  {
    q: "What stack do you build on?",
    a: "TypeScript everywhere — Next.js / React on the front, Node / Bun / Hono on the edge, Postgres + Redis + a vector store on the data layer. For AI we ship on OpenAI, Anthropic, and self-hosted Llama depending on the privacy posture.",
  },
  {
    q: "Who owns the IP and the code?",
    a: "You do. Always. Source, designs, models, prompts — everything we produce is yours under a perpetual, royalty-free license from sprint one. No lock-in, no licensing games.",
  },
  {
    q: "How do you handle security and compliance?",
    a: "SOC 2 Type II, ISO 27001 and GDPR/HIPAA-ready engagements are standard. We can sign your MSA, DPA and BAA on day one and ship through your VPC if required.",
  },
];

function FAQItem({
  item,
  open,
  onToggle,
  i,
}: {
  item: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      className="border-b border-white/[0.06] last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full text-left py-6 flex items-start justify-between gap-6 group"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <span className="font-mono text-xs text-white/35 pt-1 shrink-0">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-lg sm:text-xl font-medium text-white group-hover:text-accent-soft transition-colors">
            {item.q}
          </span>
        </div>
        <span
          className={`shrink-0 mt-1 h-7 w-7 rounded-full grid place-items-center border border-white/15 transition-all ${
            open ? "bg-accent border-accent rotate-45" : "bg-white/[0.02]"
          }`}
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-white"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-10 pr-12 text-white/60 text-[15px] leading-relaxed">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      id="faq"
      className="relative py-28 sm:py-32 lg:py-36 overflow-hidden"
    >
      <div className="container-narrow px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-12 gap-10 mb-14 lg:mb-16"
        >
          <div className="lg:col-span-5">
            <span className="pill mb-6 inline-flex">
              <span className="text-accent">◆</span>
              FAQ
            </span>
            <h2 className="text-h1 text-display-lg gradient-text">
              The questions{" "}
              <span className="font-serif italic text-white/85 font-normal">
                every CTO
              </span>{" "}
              asks us.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-white/55 text-lg leading-relaxed">
              Six things we explain on every introductory call. If something
              else is on your mind, write to us — we'll get back inside the same
              business day.
            </p>
          </div>
        </motion.div>

        {/* Accordion */}
        <div className="glass-card px-6 sm:px-8">
          {FAQS.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              i={i}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="text-white/50">
            Can't find what you're looking for?
          </div>
          <a href="mailto:hello@arclane.global" className="btn btn-ghost">
            Email the team
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
