"use client";

import { PortfolioItem } from "@/lib/data";
import { X, ExternalLink, ShieldCheck, Zap, Layers } from "lucide-react";
import { audioEngine } from "@/lib/AudioEngine";
import { useEffect } from "react";

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  useEffect(() => {
    if (item) {
      audioEngine.playModalSound();
    }
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-2xl bg-gradient-to-b from-[#121824] to-[#0a0d14] border border-[#00f0ff]/40 p-6 md:p-8 shadow-[0_0_50px_rgba(0,240,255,0.25)] text-white font-sans overflow-hidden">
        {/* Top Wireframe Accents */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent" />

        {/* Close Button */}
        <button
          onClick={() => {
            audioEngine.playClickSound();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-[#00f0ff] text-white hover:text-black transition-all duration-300"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1 mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3 text-xs font-mono text-[#00f0ff] tracking-widest uppercase">
            <span className="px-2 py-0.5 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30">
              {item.code}
            </span>
            <span>{item.category}</span>
            <span>•</span>
            <span className="text-gray-400">{item.date}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold font-mono text-white mt-1">
            {item.title}
          </h2>
          <p className="text-sm font-mono text-gray-300">{item.subtitle}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
          {item.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3 md:p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col items-center justify-center text-center"
            >
              <div className="text-lg md:text-2xl font-extrabold font-mono text-[#00f0ff]">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs font-mono text-gray-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Description & Overview */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-mono uppercase text-[#00f0ff] tracking-wider flex items-center gap-2">
            <Zap size={14} /> Strategic Overview
          </h3>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed font-sans">
            {item.fullContent}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/15 text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action CTA */}
        <div className="flex justify-between items-center border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <ShieldCheck size={16} className="text-[#00f0ff]" /> Verified Enterprise Case Study
          </div>

          <button
            onClick={() => {
              audioEngine.playClickSound();
              onClose();
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#00f0ff] hover:bg-white text-black font-mono font-bold text-xs tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            <span>DISCUSS STRATEGY</span>
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
