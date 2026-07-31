"use client";

const SERVICES = [
  {
    num: "01",
    icon: "↗",
    title: "Performance Marketing",
    metric: "4.2x",
    metricLabel: "AVERAGE ROAS",
    body: "Scalable omni-channel acquisition engines built for guaranteed ROAS.",
    tags: ["Paid Media", "CAC Optimization", "Cross-Platform Scaling"],
  },
  {
    num: "02",
    icon: "</>",
    title: "Web & App Engineering",
    metric: "<0.4s",
    metricLabel: "PAGE LOAD SPEED",
    body: "60 FPS, conversion-optimised digital flagships with sub-second speeds.",
    tags: ["Next.js 14 / WebGL", "Conversion Engineering", "High-FPS UI/UX"],
  },
  {
    num: "03",
    icon: "⬡",
    title: "Enterprise AI Systems",
    metric: "89%",
    metricLabel: "EFFICIENCY LIFT",
    body: "Autonomous 24/7 operational workflows and predictive intelligence.",
    tags: ["Autonomous Agent Loops", "Predictive Scoring", "AI Workflows"],
  },
  {
    num: "04",
    icon: "⊕",
    title: "SEO & AEO Strategy",
    metric: "#1",
    metricLabel: "AI ANSWER SHARE",
    body: "Generative AI answer control across ChatGPT, Perplexity, & search engines.",
    tags: ["Generative Optimization", "Organic Search", "Entity Authority"],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-16 py-24 bg-[#050507]/95 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ff1744]/40 bg-[#ff1744]/10 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744] animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#ff4d8d] uppercase">
            Scannable Services — Core Pillars
          </span>
        </div>

        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
            Brief, scannable.
          </h2>
          <div className="text-4xl md:text-5xl font-extrabold italic text-[#ff1744] mb-4">
            Icons + one line each.
          </div>
          <p className="text-sm text-gray-400 max-w-md leading-relaxed">
            Strictly adhering to our core principle: no long paragraphs or endless laundry lists. Just clear, revenue-driven capabilities.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((s) => (
            <div
              key={s.num}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#ff1744]/40 transition-all duration-300 group cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ff1744]/15 border border-[#ff1744]/30 flex items-center justify-center text-[#ff1744] text-sm font-mono">
                    {s.icon}
                  </div>
                  <span className="text-[11px] font-mono text-gray-500">{s.num}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold font-mono text-white">{s.metric}</div>
                  <div className="text-[9px] font-mono text-gray-500 tracking-wider">{s.metricLabel}</div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ff4d8d] transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">{s.body}</p>

              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[10px] font-mono text-gray-500 border border-white/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
