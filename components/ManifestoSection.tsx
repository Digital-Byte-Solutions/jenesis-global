"use client";

export default function ManifestoSection() {
  return (
    <section
      id="approach"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-16 py-24 bg-[#060608]/95 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ff1744]/40 bg-[#ff1744]/10 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744] animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#ff4d8d] uppercase">
            Manifesto
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-16 max-w-4xl">
          We don&apos;t build software.{" "}
          <em className="not-italic text-[#ff1744]">
            We architect omni-channel revenue engines
          </em>
        </h2>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              tag: "INTELLIGENT",
              body: "Every system we ship has embedded learning loops. Adaptive, predictive CAC optimization from sprint one — built to maximize blended ROAS.",
            },
            {
              num: "02",
              tag: "IMMERSIVE",
              body: "60 FPS WebGL interfaces and conversion-locked digital flagships that eliminate checkout friction and amplify organic discovery.",
            },
            {
              num: "03",
              tag: "ENTERPRISE",
              body: "Built for global scale — multi-region cloud, sub-500ms speeds, and infrastructure that compounds client ARR year after year.",
            },
          ].map((p) => (
            <div
              key={p.num}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#ff1744]/40 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-gray-600">{p.num}</span>
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#ff1744]">
                  {p.tag}
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
