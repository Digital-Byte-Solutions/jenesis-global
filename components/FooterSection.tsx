"use client";

import { useState } from "react";
import { Send, CheckCircle2, ArrowRight } from "lucide-react";
import { audioEngine } from "@/lib/AudioEngine";

export default function FooterSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClickSound(1200, 0.15);
    setSubmitted(true);
  };

  return (
    <footer id="contact" className="relative z-20 w-full min-h-screen flex flex-col justify-end px-6 md:px-16 pb-12 pointer-events-auto">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16 bg-black/60 border border-[#00f0ff]/30 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-[0_0_50px_rgba(0,240,255,0.15)]">
        {/* Left Column: Heading & Global Locations */}
        <div>
          <div className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase mb-3 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            INITIATE STRATEGIC DIALOGUE
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold font-mono text-white tracking-tight leading-tight mb-6">
            READY TO ARCHITECT YOUR <span className="text-[#00f0ff]">NEXT ERA?</span>
          </h2>

          <p className="text-sm md:text-base font-sans text-gray-300 mb-8 leading-relaxed">
            Partner with Jenesis Global to engineer high-throughput digital infrastructure, venture liquidity models, and enterprise AI agent systems.
          </p>

          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-xs font-mono">
            <div>
              <div className="text-[#00f0ff] font-bold">SAN FRANCISCO</div>
              <div className="text-gray-400 text-[10px] mt-1">Silicon Valley HQ</div>
            </div>
            <div>
              <div className="text-[#00f0ff] font-bold">LONDON</div>
              <div className="text-gray-400 text-[10px] mt-1">European Hub</div>
            </div>
            <div>
              <div className="text-[#00f0ff] font-bold">TOKYO</div>
              <div className="text-gray-400 text-[10px] mt-1">APAC Strategy</div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div>
          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff] text-center flex flex-col items-center gap-4">
              <CheckCircle2 size={48} className="text-[#00f0ff]" />
              <div className="text-xl font-mono font-bold text-white">STRATEGIC DISPATCH RECEIVED</div>
              <p className="text-xs font-mono text-gray-300">
                Our executive partner team will analyze your request and connect within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[11px] font-mono text-gray-400 mb-1">
                  FULL NAME / ORGANIZATION
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova / Sovereign Capital"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#00f0ff] text-white text-sm font-mono placeholder:text-gray-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-400 mb-1">
                  EXECUTIVE EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. elena@sovereign.capital"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#00f0ff] text-white text-sm font-mono placeholder:text-gray-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-400 mb-1">
                  STRATEGIC MANDATE BRIEF
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your infrastructure, capital allocation, or AI mandate..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#00f0ff] text-white text-sm font-mono placeholder:text-gray-600 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="w-full py-4 rounded-xl bg-[#00f0ff] hover:bg-white text-black font-mono font-bold text-xs tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.4)]"
              >
                <span>TRANSMIT EXECUTIVE BRIEF</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer Bottom Line */}
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-gray-500 border-t border-white/10 pt-6">
        <div>JENESIS GLOBAL © 2026. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-6 mt-3 sm:mt-0">
          <a href="#privacy" className="hover:text-[#00f0ff] transition-colors">
            PRIVACY PROTOCOL
          </a>
          <a href="#terms" className="hover:text-[#00f0ff] transition-colors">
            TERMS OF SERVICE
          </a>
          <a href="#security" className="hover:text-[#00f0ff] transition-colors">
            SECURITY ARCHITECTURE
          </a>
        </div>
      </div>
    </footer>
  );
}
