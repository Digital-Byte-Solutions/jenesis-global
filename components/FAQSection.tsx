"use client";

import { useState } from "react";
import { audioEngine } from "@/lib/AudioEngine";

const CLIENTS = ["Helix", "Aurora", "Nimbus", "Obsidian", "Vanta", "Zenith", "Nova", "Echelon"];

const FAQS = [
  {
    q: "How does engagement typically start?",
    a: "We begin with a 30-minute discovery call followed by a paid 2-week sprint zero. By the end of week two you have a product brief, design system v1, technical RFC and a fixed-scope SOW for the first production release.",
  },
  {
    q: "What does pricing look like at the engagement level?",
    a: "Engagements are scoped and fixed — no hourly billing surprises. Sprint zero starts from $8,000. Full product builds range from $60K to $400K+ depending on scope, team size and timeline. We share a detailed breakdown in sprint zero.",
  },
  {
    q: "Do you work as an embedded team or as a vendor?",
    a: "Embedded. Your Slack, your standups, your backlog. We join as a senior extension of your team, not a black-box agency. You see every commit, every decision document, every test result.",
  },
  {
    q: "What stack do you build on?",
    a: "Next.js 14 / React for web, React Native / Expo for mobile, Postgres + Redis for data, AWS / GCP for infra, and OpenAI / Anthropic APIs for AI features. We adapt to your existing stack when a migration would slow you down.",
  },
  {
    q: "Who owns the IP and the code?",
    a: "You own everything 100% from day one. All code is committed to your repository. All design files live in your Figma workspace. No lock-in, ever.",
  },
  {
    q: "How do you handle security and compliance?",
    a: "SOC 2 Type II practices from sprint one: encrypted secrets management, RBAC, audit logs, automated SAST/DAST in CI. We've shipped to HIPAA, PCI-DSS and ISO 27001 environments.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-16 py-24 bg-[#060608]/95 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Client Logo Marquee */}
        <div className="mb-14">
          <div className="text-[10px] font-mono text-gray-600 tracking-widest text-center mb-6 uppercase">
            Trusted by Operators in 37 Countries
          </div>
          <div className="flex justify-center flex-wrap gap-8 md:gap-12">
            {CLIENTS.map((c) => (
              <span
                key={c}
                className="text-base md:text-lg font-semibold text-gray-600 hover:text-gray-300 transition-colors duration-300 cursor-default"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ff1744]/40 bg-[#ff1744]/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744] animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#ff4d8d] uppercase">FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              The questions{" "}
              <em className="not-italic text-[#ff1744]">every CTO</em> asks us.
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-sm text-gray-400 leading-relaxed">
              Six things we explain on every introductory call. If something else is on your mind, write to us — we&apos;ll get back inside the same business day.
            </p>
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen ? "border-[#ff1744]/40 bg-white/[0.04]" : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <button
                  onClick={() => {
                    setOpenIdx(isOpen ? null : idx);
                    audioEngine.playClickSound();
                  }}
                  onMouseEnter={() => audioEngine.playHoverSound()}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-mono text-gray-600 shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-bold text-white">{faq.q}</span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "border-[#ff1744] bg-[#ff1744] text-white rotate-45"
                        : "border-white/20 text-gray-400"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pl-[52px]">
                    <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
