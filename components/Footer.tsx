"use client";

import { useState } from "react";
import BrandMark from "./BrandMark";

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
      { label: "hello@jenesis.global", href: "mailto:hello@jenesis.global" },
      { label: "Start a project", href: "#contact" },
      { label: "Partnership", href: "mailto:partners@jenesis.global" },
      { label: "Support", href: "mailto:support@jenesis.global" },
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
    <footer className="relative pt-24 lg:pt-28 pb-10 overflow-hidden border-t border-line">
      <div className="container-wide px-6 lg:px-10 relative z-10">
        {/* Top: brand + newsletter */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16 lg:mb-20">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <a href="#" className="inline-flex items-center gap-3 mb-6 group">
              <BrandMark size={34} />
              <span className="flex flex-col leading-none">
                <span className="wordmark text-[17px]">Jenesis</span>
                <span className="wordmark-sub text-[9px] mt-1">Global</span>
              </span>
            </a>
            <p className="text-body text-base leading-relaxed max-w-md mb-8">
              An intelligence-first studio building the operating systems for
              tomorrow&rsquo;s category leaders. Independent. Global.
              Relentlessly shipping.
            </p>

            {/* Newsletter */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-faint font-mono mb-3">
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
                  className="flex-1 bg-surface border border-line rounded-full px-5 py-3 text-sm text-ink placeholder:text-faint focus:outline-none focus:border-accent transition-all"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary text-sm px-5 py-3 whitespace-nowrap"
                >
                  {sent ? "Subscribed ✓" : "Subscribe"}
                </button>
              </form>
              <div className="mt-3 text-xs text-faint">
                One letter a month. Engineering, design and AI from the field.
                Unsubscribe anytime.
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-10">
            {COLS.map((col) => (
              <div key={col.title}>
                <div className="text-[10px] uppercase tracking-[0.18em] text-faint font-mono mb-4">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-body hover:text-ink transition-colors"
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
            className="text-[17vw] lg:text-[13vw] font-semibold tracking-[0.18em] leading-[0.85] text-transparent text-center uppercase"
            style={{
              WebkitTextStroke: "1px var(--line-strong)",
            }}
          >
            Jenesis
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between pt-8 border-t border-line">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-faint">
            <span>
              © {new Date().getFullYear()}{" "}
              <span className="text-body font-medium">JENESIS</span>{" "}
              <span className="tracking-widest">GLOBAL</span>
            </span>
            <a href="#" className="hover:text-ink transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-ink transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-ink transition-colors">
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
                className="text-xs text-body hover:text-accent transition-colors"
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
