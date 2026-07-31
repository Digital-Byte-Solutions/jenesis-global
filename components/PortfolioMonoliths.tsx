"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { PORTFOLIO_ITEMS, PortfolioItem } from "@/lib/data";
import { audioEngine } from "@/lib/AudioEngine";

interface PortfolioMonolithsProps {
  scrollProgress: number;
  onSelectPortfolio: (item: PortfolioItem) => void;
}

function SingleMonolith({
  item,
  position,
  active,
  onSelect,
}: {
  item: PortfolioItem;
  position: [number, number, number];
  active: boolean;
  onSelect: (item: PortfolioItem) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    if (hovered) {
      meshRef.current.rotation.y += 0.015;
    }
  });

  const renderGeometry = () => {
    switch (item.shapeType) {
      case "cube":
        return <boxGeometry args={[1.6, 1.6, 1.6]} />;
      case "octahedron":
        return <octahedronGeometry args={[1.4]} />;
      case "prism":
        return <cylinderGeometry args={[0.9, 1.3, 1.8, 6]} />;
      case "crystal":
      default:
        return <dodecahedronGeometry args={[1.3, 1]} />;
    }
  };

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            audioEngine.playHoverSound();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "default";
          }}
          onClick={(e) => {
            e.stopPropagation();
            audioEngine.playClickSound();
            onSelect(item);
          }}
          scale={hovered ? 1.15 : 1}
        >
          {renderGeometry()}
          <MeshTransmissionMaterial
            thickness={1.2}
            roughness={0.08}
            transmission={0.98}
            ior={1.4}
            chromaticAberration={0.08}
            backside
            color={hovered ? "#ff1744" : item.color}
            attenuationColor="#ffffff"
            attenuationDistance={1.8}
          />
        </mesh>
      </Float>

      {/* Wireframe Telemetry Callout Overlay */}
      {active && (
        <Html distanceFactor={6} position={[0.2, 0.4, 0]} center>
          <div
            onClick={() => {
              audioEngine.playClickSound();
              onSelect(item);
            }}
            className="group cursor-pointer select-none relative p-4 rounded-lg bg-black/80 border border-[#ff1744]/50 backdrop-blur-md hover:border-[#ff4d8d] hover:shadow-[0_0_30px_rgba(255,23,68,0.5)] transition-all duration-300 min-w-[240px]"
          >
            {/* Target reticle corner ticks */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#ff1744]" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#ff1744]" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#ff1744]" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#ff1744]" />

            <div className="flex justify-between items-start mb-1 text-[10px] font-mono text-[#ff4d8d] tracking-widest uppercase">
              <span>{item.code}</span>
              <span className="text-white/60">{item.category}</span>
            </div>

            <div className="text-sm font-bold font-mono text-white group-hover:text-[#ff1744] transition-colors">
              {item.title}
            </div>
            <div className="text-[11px] text-gray-300 font-mono mb-2">{item.subtitle}</div>

            <div className="flex justify-between text-[9px] font-mono text-gray-400 border-t border-white/10 pt-2 mb-2">
              <span>
                TEMP <strong className="text-white">{item.temp}</strong>
              </span>
              <span className="text-[#ff4d8d]">{item.delta}</span>
              <span>{item.date}</span>
            </div>

            <div className="text-center py-1 rounded bg-[#ff1744]/15 group-hover:bg-[#ff1744] group-hover:text-white text-[10px] font-mono font-bold tracking-widest text-[#ff4d8d] transition-all">
              [ CLICK TO EXPLORE ]
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function PortfolioMonoliths({
  scrollProgress,
  onSelectPortfolio,
}: PortfolioMonolithsProps) {
  const isVisible = scrollProgress >= 0.32 && scrollProgress <= 0.44;

  const activeIndex = Math.min(
    PORTFOLIO_ITEMS.length - 1,
    Math.max(0, Math.floor(((scrollProgress - 0.45) / 0.35) * PORTFOLIO_ITEMS.length))
  );

  if (!isVisible) return null;

  return (
    <group position={[0, 0, 0]}>
      {PORTFOLIO_ITEMS.map((item, idx) => {
        const isActive = idx === activeIndex;
        const offset = (idx - activeIndex) * 4.5;

        return (
          <SingleMonolith
            key={item.id}
            item={item}
            position={[offset, 0, 0]}
            active={isActive}
            onSelect={onSelectPortfolio}
          />
        );
      })}
    </group>
  );
}
