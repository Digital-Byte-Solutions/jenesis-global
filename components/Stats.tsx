"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ----------------------------------------------------
 * Stats — impact numbers, counts up when in view
 * -------------------------------------------------- */

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
  decimals?: number;
};

const STATS: Stat[] = [
  {
    value: 240,
    suffix: "+",
    label: "Enterprise clients",
    sub: "Across logistics, finance, health & retail",
  },
  {
    value: 1.4,
    suffix: "K",
    decimals: 1,
    label: "AI models in production",
    sub: "Serving 18M+ requests per day",
  },
  {
    value: 99.99,
    suffix: "%",
    decimals: 2,
    label: "Platform uptime SLA",
    sub: "Multi-region, multi-cloud by default",
  },
  {
    value: 37,
    label: "Countries deployed in",
    sub: "From Reykjavík to Auckland",
  },
];

function CountUp({
  to,
  decimals = 0,
  duration = 1.6,
  start,
}: {
  to: number;
  decimals?: number;
  duration?: number;
  start: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setN(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, start]);

  return <>{n.toFixed(decimals)}</>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="container-wide px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 lg:mb-14"
        >
          <div>
            <span className="pill mb-4 inline-flex">
              <span className="live-dot" />
              Live · updated daily
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-ink max-w-xl">
              Numbers we run the business by.
            </h2>
          </div>
          <a href="#contact" className="btn btn-ghost text-sm w-fit">
            See full impact report
            <span aria-hidden>→</span>
          </a>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-3xl overflow-hidden border border-line">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.08 }}
              className="relative bg-surface p-6 sm:p-8 lg:p-10 group"
            >
              {/* Hover accent line */}
              <div className="absolute top-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />

              {/* Big number */}
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-medium text-ink tracking-tight tabular-nums">
                  {s.prefix}
                  <CountUp to={s.value} decimals={s.decimals ?? 0} start={inView} />
                </span>
                {s.suffix && (
                  <span className="text-2xl sm:text-3xl text-accent font-medium">
                    {s.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-ink mb-1">{s.label}</div>
              <div className="text-xs text-faint leading-relaxed">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
