"use client";

import { useEffect, useRef } from "react";

const STATS = [
  {
    value: "240",
    suffix: "+",
    label: "Enterprise clients",
    sub: "Across logistics, finance, health & retail",
  },
  {
    value: "1.4",
    suffix: "K",
    label: "AI models in production",
    sub: "Serving 18M+ requests per day",
  },
  {
    value: "99.99",
    suffix: "%",
    label: "Platform uptime SLA",
    sub: "Multi-region, multi-cloud by default",
  },
  {
    value: "37",
    suffix: "",
    label: "Countries deployed in",
    sub: "From Reykjavík to Auckland",
  },
];

function AnimatedNumber({ target, suffix }: { target: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasRun.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const end = parseFloat(target);
          const isDecimal = target.includes(".");
          const duration = 1800;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = end * eased;
            el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current).toString();
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target;
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span className="text-6xl md:text-7xl font-extrabold font-mono text-white">
      <span ref={ref}>0</span>
      <span className="text-[#ff1744]">{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  return (
    <section
      id="why"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-16 py-24 bg-[#060608]/95 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ff1744]/40 bg-[#ff1744]/10 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744] animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#ff4d8d] uppercase">
            Live · Updated Daily
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Numbers we run the business by.
          </h2>
          <a
            href="#proof"
            className="text-sm font-mono text-[#ff4d8d] hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap"
          >
            See full impact report →
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="p-8 bg-[#060608] flex flex-col justify-between gap-4 hover:bg-[#ff1744]/5 transition-colors duration-300"
            >
              <AnimatedNumber target={s.value} suffix={s.suffix} />
              <div>
                <div className="text-sm font-bold text-white mb-0.5">{s.label}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
