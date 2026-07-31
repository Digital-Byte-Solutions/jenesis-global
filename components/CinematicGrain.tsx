"use client";

import { useEffect, useState } from "react";

export default function CinematicGrain() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
      style={{ mixBlendMode: "overlay" }}
    >
      <svg className="w-full h-full opacity-50">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.85" 
            numOctaves="3" 
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
