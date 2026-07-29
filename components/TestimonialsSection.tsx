"use client";

const TESTIMONIALS = [
  {
    num: "01 / 03",
    stars: 5,
    quote:
      "Jenesis didn't just build us a product — they rebuilt our operating cadence. The platform shipped six weeks ahead of schedule and is now the spine of our European rollout.",
    metric: "3.4×",
    metricLabel: "throughput in 90 days",
    name: "Mira Castellanos",
    role: "COO · Global Wealth Platform",
  },
  {
    num: "02 / 03",
    stars: 5,
    quote:
      "We've worked with the big consultancies. None matched Jenesis on velocity or design fidelity. Our retention curve has a visible inflection from the week we shipped their redesign.",
    metric: "+41%",
    metricLabel: "30-day retention",
    name: "Devon Park",
    role: "Head of Product · European Premium Flagship",
  },
  {
    num: "03 / 03",
    stars: 5,
    quote:
      "The AI agents they architected handle 78% of our tier-1 support volume with higher CSAT than our human team did. Genuinely category-defining work.",
    metric: "78%",
    metricLabel: "tickets auto-resolved",
    name: "Yuki Tanaka",
    role: "CTO · B2B Cloud Infrastructure",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-16 py-24 bg-[#050507]/95 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ff1744]/40 bg-[#ff1744]/10 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744] animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#ff4d8d] uppercase">
            Proof in Their Words
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-2xl">
            Operators who&apos;ve shipped with us{" "}
            <em className="not-italic text-[#ff1744]">tell the story</em>{" "}
            better than we can.
          </h2>
          <div className="flex gap-8 shrink-0">
            <div className="text-right">
              <div className="text-3xl font-extrabold font-mono text-white">4.97</div>
              <div className="text-[10px] font-mono text-gray-500 mt-0.5">avg. client NPS</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-right">
              <div className="text-3xl font-extrabold font-mono text-white">96%</div>
              <div className="text-[10px] font-mono text-gray-500 mt-0.5">renewal rate</div>
            </div>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.num}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#ff1744]/40 transition-all duration-300 flex flex-col"
            >
              {/* Top row */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-1">
                  {Array(t.stars).fill(null).map((_, i) => (
                    <span key={i} className="text-[#ff1744] text-sm">★</span>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-gray-600">{t.num}</span>
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-gray-300 leading-relaxed mb-6 flex-1">
                <span className="text-[#ff1744] text-lg font-serif leading-none mr-1">"</span>
                {t.quote}
              </blockquote>

              {/* Metric */}
              <div className="border-t border-white/10 pt-4 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold font-mono text-white">{t.metric}</span>
                  <span className="text-[10px] font-mono text-gray-500">·</span>
                  <span className="text-[10px] font-mono text-gray-500">{t.metricLabel}</span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#ff1744]/20 border border-[#ff1744]/40 flex items-center justify-center text-[#ff1744] font-mono text-xs font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-[10px] text-gray-500 font-mono">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
