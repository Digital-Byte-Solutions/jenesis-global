"use client";

import { useState } from "react";

/* ----------------------------------------------------
 * Footer — info architecture + newsletter
 * -------------------------------------------------- */

const COLS = [
  {
    title: "Services",
    links: [
      { label: "Brand systems", href: "#services" },
      { label: "Web platforms", href: "#services" },
      { label: "Native apps", href: "#services" },
      { label: "AI engineering", href: "#services" },
      { label: "ERP suite", href: "#services" },
      { label: "Cloud infrastructure", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Process", href: "#process" },
      { label: "Work", href: "#work" },
      { label: "FAQ", href: "#faq" },
      { label: "Careers", href: "#" },
      { label: "Press kit", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@arclane.global", href: "mailto:hello@arclane.global" },
      { label: "Book a call", href: "#contact" },
      { label: "Partnership", href: "mailto:partners@arclane.global" },
      { label: "Support", href: "mailto:support@arclane.global" },
    ],
  },
];

const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Dribbble", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <footer className="relative pt-24 lg:pt-28 pb-10 overflow-hidden border-t border-white/[0.06]">
      <div className="container-wide px-6 lg:px-10 relative z-10">
        {/* Top: brand + newsletter */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16 lg:mb-20">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 mb-6 group"
            >
              <span className="relative inline-grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-accent to-accent-soft shadow-lg shadow-accent/30">
                <span className="text-white font-bold text-sm">A</span>
                <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
              </span>
              <span className="text-xl font-medium tracking-tight text-white">
                ARCLANE<span className="text-accent">.</span>
              </span>
            </a>
            <p className="text-white/55 text-base leading-relaxed max-w-md mb-8">
              An intelligence-first studio building the operating systems for
              tomorrow's category leaders. Independent. Global. Relentlessly
              shipping.
            </p>

            {/* Newsletter */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono mb-3">
                The Briefing · Monthly
              </div>
              <form
                onSubmit={submit}
                className="flex flex-col sm:flex-row gap-2 max-w-md"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-full px-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary text-sm px-5 py-3 whitespace-nowrap"
                >
                  {sent ? "Subscribed ✓" : "Subscribe"}
                </button>
              </form>
              <div className="mt-3 text-xs text-white/35">
                One letter a month. Engineering, design and AI from the field.
                Unsubscribe anytime.
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-10">
            {COLS.map((col) => (
              <div key={col.title}>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono mb-4">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Big wordmark */}
        <div className="relative mb-10 lg:mb-14 select-none pointer-events-none">
          <div
            className="text-[20vw] lg:text-[16vw] font-medium tracking-tighter leading-[0.85] text-transparent text-center"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.08)",
            }}
          >
            ARCLANE
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between pt-8 border-t border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/45">
            <span>© {new Date().getFullYear()} ARCLANE GLOBAL</span>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
            <span className="flex items-center gap-2">
              <span className="live-dot" />
              All systems operational
            </span>
          </div>

          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs text-white/50 hover:text-accent transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
