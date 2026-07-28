"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ----------------------------------------------------
 * Custom Developer SVGs for CTA Section
 * --------------------------------------------------*/

function CalendarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 2V6M8 2V6M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="7" y="12" width="3" height="3" rx="0.5" fill="var(--accent)" />
      <rect x="14" y="12" width="3" height="3" rx="0.5" fill="currentColor" fillOpacity="0.4" />
      <rect x="7" y="16" width="3" height="3" rx="0.5" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS_STRIP = [
  { label: "Direct Email", value: "hello@jenesis.global", href: "mailto:hello@jenesis.global" },
  { label: "SLA Response Guarantee", value: "Within 4 Hours", href: null },
  { label: "Q3/Q4 Availability", value: "3 Strategy Slots Open", href: null },
];

export default function CTASection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    revenueGoal: "$1M - $5M",
  });

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 800);
  };

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-32 lg:py-40 overflow-hidden bg-bg border-t border-line"
    >
      {/* Background ambient lighting */}
      <div className="ambient-glow ambient-glow--center opacity-40" />

      <div className="container-narrow px-6 lg:px-10 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative"
        >
          {/* Outer glow aura */}
          <div
            className="absolute -inset-6 sm:-inset-10 rounded-[2.5rem] pointer-events-none opacity-60"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, var(--glow-accent), transparent 70%)",
              filter: "blur(50px)",
            }}
          />

          {/* Main Glass Box Enclosure */}
          <div className="relative glass-strong rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 overflow-hidden border border-line-strong bg-surface/90 shadow-2xl">
            {/* Background grid */}
            <div className="absolute inset-0 grid-bg pointer-events-none opacity-25" />

            <div className="relative z-10">
              {/* Eyebrow Badge */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-line-strong bg-surface/80 backdrop-blur-md shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-mono tracking-wider uppercase text-accent font-semibold">
                    Single CTA Focus · Book A Strategy Call
                  </span>
                </div>
              </div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                className="text-xl sm:text-2xl lg:text-3xl font-semibold gradient-text text-center mb-4"
              >
                Ready to grow revenue{" "}
                <span className="font-serif italic text-accent-soft font-normal">
                  through an omni-channel approach?
                </span>
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
                className="text-body text-base sm:text-xl text-center max-w-2xl mx-auto leading-relaxed mb-12 text-muted"
              >
                Rule of Thumb: &ldquo;Book a strategy call&rdquo; beats a contact form. Lock in a 30-minute revenue audit with our partners.
              </motion.p>

              {/* Booking Form & Call Scheduler Container */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
                className="max-w-xl mx-auto mb-14"
              >
                {!formSubmitted ? (
                  <form
                    onSubmit={handleSubmit}
                    className="p-6 sm:p-8 rounded-3xl bg-bg border border-line shadow-xl space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-line pb-4 mb-4">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                        <CalendarIcon className="w-4 h-4" />
                        <span>30-Minute Revenue Audit Session</span>
                      </div>
                      <span className="text-[10px] font-mono text-faint uppercase">
                        Zero Commitment
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-faint mb-1.5">
                          Your Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full px-4 py-3 rounded-xl bg-surface border border-line text-sm text-ink focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-faint mb-1.5">
                          Work Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="sarah@brand.com"
                          className="w-full px-4 py-3 rounded-xl bg-surface border border-line text-sm text-ink focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="website" className="block text-xs font-mono uppercase tracking-wider text-faint mb-1.5">
                          Brand Website
                        </label>
                        <input
                          id="website"
                          type="text"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="brand.com"
                          className="w-full px-4 py-3 rounded-xl bg-surface border border-line text-sm text-ink focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="revenueGoal" className="block text-xs font-mono uppercase tracking-wider text-faint mb-1.5">
                          Target Revenue Goal
                        </label>
                        <select
                          id="revenueGoal"
                          value={formData.revenueGoal}
                          onChange={(e) => setFormData({ ...formData, revenueGoal: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-surface border border-line text-sm text-ink focus:outline-none focus:border-accent transition-colors"
                        >
                          <option value="<$1M">&lt; $1M / year</option>
                          <option value="$1M - $5M">$1M - $5M / year</option>
                          <option value="$5M - $20M">$5M - $20M / year</option>
                          <option value="$20M+">$20M+ Scaleup</option>
                        </select>
                      </div>
                    </div>

                    {/* Single Primary Action Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn btn-primary py-4 text-sm font-semibold tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-accent/20 transition-all mt-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      ) : (
                        <>
                          <span>Book a strategy call</span>
                          <span aria-hidden>→</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-3xl bg-bg border border-accent/40 text-center space-y-4 shadow-2xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center mx-auto">
                      <CheckIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-ink">Strategy Call Slot Reserved!</h3>
                    <p className="text-sm text-muted leading-relaxed">
                      Thank you, <span className="text-ink font-semibold">{formData.name}</span>. We have locked in your 30-minute revenue audit invitation for <span className="text-accent font-mono">{formData.email}</span>. Our partners will reach out within 4 business hours.
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Single SLA Trust Strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line rounded-2xl overflow-hidden border border-line"
              >
                {STATS_STRIP.map((item) => (
                  <div key={item.label} className="bg-surface px-6 py-5 text-center">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-faint font-mono mb-1.5">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-ink text-sm sm:text-base font-medium hover:text-accent transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-ink text-sm sm:text-base font-medium">
                        {item.value}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
