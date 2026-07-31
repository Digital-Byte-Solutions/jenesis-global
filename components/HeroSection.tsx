"use client";

import { audioEngine } from "@/lib/AudioEngine";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-end pb-16 px-6 md:px-16 pt-28 pointer-events-auto"
    >
      {/* Left content — floats over the WebGL */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ff1744]/40 bg-[#ff1744]/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#ff4d8d] uppercase">
              Omni-Channel Revenue Engine
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5">
            We help brands grow revenue through an{" "}
            <span className="text-[#ff1744]">omni-channel</span> approach.
          </h1>

          <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-8 max-w-xl">
            One unified growth engine uniting Performance Marketing, Web &amp; App
            Engineering, Enterprise AI Systems, and Search Engine Dominance for maximum ROI.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="#contact"
              onMouseEnter={() => audioEngine.playHoverSound()}
              onClick={() => audioEngine.playClickSound()}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#ff1744] hover:bg-[#ff4d8d] text-white font-bold text-sm transition-all duration-300 shadow-[0_0_30px_rgba(255,23,68,0.5)]"
            >
              Book a strategy call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              3 slots open for Q3/Q4
            </div>
          </div>

          {/* Hero Stats */}
          <div className="flex gap-10 border-t border-white/10 pt-8">
            {[
              { value: "$14.2M+", label: "Revenue Generated" },
              { value: "4.2x", label: "Average ROAS" },
              { value: "+340%", label: "Conversion Boost" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-extrabold text-white font-mono">
                  {s.value}
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5 font-sans">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side — intentionally empty; WebGL globe renders here via canvas */}
        <div className="hidden lg:block" />
      </div>
    </section>
  );
}
