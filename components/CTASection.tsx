"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ----------------------------------------------------
 * CTA — closing conversion block
 * -------------------------------------------------- */

const INFO = [
  {
    label: "Email",
    value: "hello@jenesis.global",
    href: "mailto:hello@jenesis.global",
  },
  {
    label: "Response window",
    value: "Within 4 business hours",
    href: null,
  },
  {
    label: "Timezone coverage",
    value: "Follow-the-sun · 3 hubs",
    href: null,
  },
];

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="ambient-glow ambient-glow--center" />

      <div className="container-narrow px-6 lg:px-10 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Outer glow */}
          <div
            className="absolute -inset-6 sm:-inset-10 rounded-[2.5rem] pointer-events-none opacity-70"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, var(--glow-accent), transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Main panel */}
          <div className="relative glass-strong rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 overflow-hidden">
            {/* Decorative grid */}
            <div className="absolute inset-0 grid-bg pointer-events-none" />

            <div className="relative">
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="pill pill-accent">
                  <span className="live-dot" />
                  Now booking Q3 cohorts
                </span>
              </div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="text-h1 text-display-xl gradient-text text-center mb-6"
              >
                Build what&rsquo;s next{" "}
                <span className="font-serif italic text-accent-soft font-normal">
                  with us.
                </span>
              </motion.h2>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="text-body text-lg sm:text-xl text-center max-w-2xl mx-auto leading-relaxed mb-10"
              >
                Tell us what you&rsquo;re trying to ship. We&rsquo;ll respond
                with a tailored proposal — usually inside the same business day.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
              >
                <a
                  href="mailto:hello@jenesis.global"
                  className="btn btn-primary text-base px-7 py-3.5"
                >
                  Start a project
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#process"
                  className="btn btn-secondary text-base px-7 py-3.5"
                >
                  See the process
                </a>
              </motion.div>

              {/* Info row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line rounded-2xl overflow-hidden border border-line"
              >
                {INFO.map((item) => (
                  <div key={item.label} className="bg-surface px-6 py-5 text-center">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-faint font-mono mb-2">
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
