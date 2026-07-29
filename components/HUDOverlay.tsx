"use client";

import { Volume2, VolumeX } from "lucide-react";
import { audioEngine } from "@/lib/AudioEngine";
import { useState } from "react";

interface HUDOverlayProps {
  scrollProgress: number;
  soundActive: boolean;
  onToggleSound: () => void;
}

export default function HUDOverlay({
  scrollProgress,
  soundActive,
  onToggleSound,
}: HUDOverlayProps) {
  const [hoveredSound, setHoveredSound] = useState(false);

  // Active section name based on scroll position
  const getActiveSectionName = () => {
    if (scrollProgress < 0.2) return "01 // CORE APEX";
    if (scrollProgress < 0.45) return "02 // BLUEPRINT EXPLOSION";
    if (scrollProgress < 0.75) return "03 // STRATEGIC MONOLITHS";
    if (scrollProgress < 0.9) return "04 // HOLOGRAM PEDESTAL";
    return "05 // SPHERICAL PORTAL";
  };

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-10 select-none">
      {/* Background Telemetry Grid & Watermark (Matching Screenshots!) */}
      <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center font-mono text-[100px] md:text-[160px] font-extrabold text-[#00f0ff] overflow-hidden whitespace-nowrap blur-sm">
        JENESIS GLOBAL (55) DATA 90.901.22
      </div>

      {/* TOP BAR */}
      <div className="flex justify-between items-start w-full relative z-20 pointer-events-auto">
        {/* Top Left: Logo & Copyright */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="text-2xl md:text-3xl font-extrabold font-mono tracking-widest text-white drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]">
              JENESIS <span className="text-[#00f0ff]">//</span> GLOBAL
            </div>
          </div>
          <div className="text-[10px] md:text-[11px] font-mono text-gray-400 tracking-wider">
            // Copyright © 2026 Jenesis Global, Inc. All Rights Reserved.
          </div>
        </div>

        {/* Top Right: Manifesto */}
        <div className="max-w-[280px] md:max-w-[340px] text-right hidden sm:flex flex-col gap-1">
          <div className="text-[11px] font-mono text-[#00f0ff] tracking-widest uppercase font-bold">
            ////// Manifesto
          </div>
          <div className="text-[11px] md:text-[12px] font-mono text-gray-300 leading-relaxed">
            Our mission is to architect high-stakes digital ecosystems, enterprise AI infrastructure, and next-generation capital strategies at the intersection of Strategy, AI, and Capital.
          </div>
        </div>
      </div>

      {/* CENTER WATERMARK RETICLE TICKS */}
      <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 flex justify-between items-center opacity-30 pointer-events-none">
        <div className="w-4 h-4 border-l border-t border-[#00f0ff]" />
        <div className="w-4 h-4 border-r border-t border-[#00f0ff]" />
      </div>

      {/* RIGHT SECTION INDICATOR TELEMETRY */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3 pointer-events-auto">
        <div className="text-[10px] font-mono text-[#00f0ff] tracking-widest mb-1">
          {getActiveSectionName()}
        </div>
        {[
          { label: "01 CORE", range: [0, 0.2] },
          { label: "02 DECONSTRUCT", range: [0.2, 0.45] },
          { label: "03 MONOLITHS", range: [0.45, 0.75] },
          { label: "04 HOLOGRAM", range: [0.75, 0.9] },
          { label: "05 PORTAL", range: [0.9, 1.0] },
        ].map((sec, idx) => {
          const isActive =
            scrollProgress >= sec.range[0] && scrollProgress <= sec.range[1];
          return (
            <div
              key={idx}
              className="flex items-center gap-2 text-[9px] font-mono tracking-widest transition-all duration-300"
            >
              <span className={isActive ? "text-[#00f0ff] font-bold" : "text-gray-500"}>
                {sec.label}
              </span>
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  isActive
                    ? "bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] scale-125"
                    : "bg-gray-700"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* BOTTOM BAR */}
      <div className="flex justify-between items-end w-full relative z-20 pointer-events-auto">
        {/* Bottom Left: Scroll Prompt & Sound Toggle */}
        <div className="flex flex-col gap-3">
          <div className="text-[11px] font-mono text-gray-400 tracking-widest animate-pulse flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
            Scroll down to discover.
          </div>

          <button
            onClick={() => {
              onToggleSound();
            }}
            onMouseEnter={() => {
              setHoveredSound(true);
              audioEngine.playHoverSound();
            }}
            onMouseLeave={() => setHoveredSound(false)}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/60 border border-white/20 hover:border-[#00f0ff] text-xs font-mono text-gray-300 hover:text-[#00f0ff] backdrop-blur-md transition-all duration-300 w-fit"
          >
            {soundActive ? (
              <Volume2 size={14} className="text-[#00f0ff]" />
            ) : (
              <VolumeX size={14} className="text-gray-400" />
            )}
            <span>Sound: {soundActive ? "On" : "Off"}</span>
          </button>
        </div>

        {/* Bottom Right Coordinates Telemetry */}
        <div className="text-[10px] font-mono text-gray-500 tracking-widest text-right">
          <div>LAT: 37.7749° N</div>
          <div>LON: 122.4194° W</div>
          <div className="text-[#00f0ff]/80 font-bold mt-0.5">SYS.VER // 2.026.4</div>
        </div>
      </div>
    </div>
  );
}
