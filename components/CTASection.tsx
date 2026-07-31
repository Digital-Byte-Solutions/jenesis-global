"use client";

import { useState } from "react";
import { audioEngine } from "@/lib/AudioEngine";

const SERVICES_LIST = [
  "Performance Marketing & Paid Media",
  "Web & App Engineering",
  "Enterprise AI Systems",
  "SEO & AEO Strategy",
  "Brand Identity & Design",
  "Data Infrastructure & Analytics",
];

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    revenue: "",
    services: [] as string[],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (svc: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter((s) => s !== svc)
        : [...prev.services, svc],
    }));
    audioEngine.playClickSound();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClickSound();
    setTimeout(() => setSubmitted(true), 300);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-16 py-24 bg-[#050507]/95 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left Content */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ff1744]/40 bg-[#ff1744]/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#ff4d8d] uppercase">
              Free 30-Minute Revenue Audit
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            Ready to grow revenue through an{" "}
            <em className="not-italic text-[#ff1744]">omni-channel</em> approach?
          </h2>

          <p className="text-base text-gray-400 leading-relaxed mb-8">
            In 30 minutes we&apos;ll identify your three highest-leverage growth opportunities and give you a custom omni-channel scorecard — free, no strings attached.
          </p>

          {/* Bullets */}
          <ul className="space-y-4 mb-10">
            {[
              "Custom omni-channel scorecard",
              "Your three highest-leverage opportunities",
              "Competitor gap analysis",
              "Estimated revenue impact ($)",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-5 h-5 rounded-full bg-[#ff1744]/20 border border-[#ff1744]/40 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 2.5" stroke="#ff1744" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>

          {/* Slots badge */}
          <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span>3 audit slots remaining this month.</span>
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-7 rounded-2xl bg-white/[0.04] border border-white/10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff1744]/20 border border-[#ff1744]/40 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14l5.5 5.5L22 7.5" stroke="#ff1744" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Audit Request Submitted!</h3>
              <p className="text-sm text-gray-400 max-w-xs">
                We&apos;ll reach out within one business day to confirm your 30-minute slot.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-gray-500 mb-1 tracking-wider uppercase">Your name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => audioEngine.playHoverSound()}
                    className="w-full bg-black/50 border border-white/10 focus:border-[#ff1744] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all"
                    placeholder="Mira Castellanos"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-gray-500 mb-1 tracking-wider uppercase">Work email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => audioEngine.playHoverSound()}
                    className="w-full bg-black/50 border border-white/10 focus:border-[#ff1744] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all"
                    placeholder="mira@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-gray-500 mb-1 tracking-wider uppercase">Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    onFocus={() => audioEngine.playHoverSound()}
                    className="w-full bg-black/50 border border-white/10 focus:border-[#ff1744] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-gray-500 mb-1 tracking-wider uppercase">Annual Revenue</label>
                  <select
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                    onFocus={() => audioEngine.playHoverSound()}
                    className="w-full bg-black/50 border border-white/10 focus:border-[#ff1744] rounded-xl px-4 py-2.5 text-sm text-gray-400 outline-none transition-all appearance-none"
                  >
                    <option value="">Select range</option>
                    <option>Under $1M</option>
                    <option>$1M – $10M</option>
                    <option>$10M – $50M</option>
                    <option>$50M+</option>
                  </select>
                </div>
              </div>

              {/* Service toggles */}
              <div>
                <label className="block text-[11px] font-mono text-gray-500 mb-2 tracking-wider uppercase">
                  Channels of interest
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES_LIST.map((svc) => {
                    const on = formData.services.includes(svc);
                    return (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => toggleService(svc)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition-all ${
                          on
                            ? "bg-[#ff1744] text-white border border-[#ff1744]"
                            : "bg-transparent text-gray-500 border border-white/10 hover:border-white/30"
                        }`}
                      >
                        {svc}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-500 mb-1 tracking-wider uppercase">Biggest growth challenge</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => audioEngine.playHoverSound()}
                  rows={3}
                  className="w-full bg-black/50 border border-white/10 focus:border-[#ff1744] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all resize-none"
                  placeholder="We're struggling to scale ROAS beyond 2x..."
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="w-full py-3.5 rounded-xl bg-[#ff1744] hover:bg-[#ff4d8d] text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(255,23,68,0.4)] hover:shadow-[0_0_40px_rgba(255,23,68,0.6)]"
              >
                Claim Your Free Revenue Audit →
              </button>

              <p className="text-[10px] text-gray-600 text-center">
                No commitment. No spam. We share a short read on omni-channel benchmarks with every confirmed audit.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
