"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { HOLO_PLATFORMS } from "@/lib/data";
import { audioEngine } from "@/lib/AudioEngine";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PedestalProps {
  scrollProgress: number;
}

export default function ParticleHologramPedestal({ scrollProgress }: PedestalProps) {
  const [activePlatformIndex, setActivePlatformIndex] = useState(1);
  const groupRef = useRef<THREE.Group>(null);
  const particleMeshRef = useRef<THREE.Points>(null);

  const isVisible = scrollProgress >= 0.65 && scrollProgress <= 0.76;

  const [positions, originalY] = useMemo(() => {
    const particleCount = 3500;
    const posArr = new Float32Array(particleCount * 3);
    const origYArr = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const layer = Math.random();
      let x = 0;
      let y = 0;
      let z = 0;

      if (layer < 0.3) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 0.55 + Math.random() * 0.05;
        x = r * Math.sin(phi) * Math.cos(theta);
        y = 0.9 + r * Math.cos(phi);
        z = r * Math.sin(phi) * Math.sin(theta);
      } else if (layer < 0.4) {
        const angle = Math.random() * Math.PI * 2;
        const r = 0.62;
        x = Math.cos(angle) * r;
        y = 0.9 + Math.sin(angle) * r;
        z = (Math.random() - 0.5) * 0.2;
      } else if (layer < 0.85) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 0.75 + Math.random() * 0.08;
        x = r * Math.sin(phi) * Math.cos(theta) * 0.85;
        y = 0.0 + r * Math.cos(phi) * 0.75;
        z = r * Math.sin(phi) * Math.sin(theta) * 0.85;
      } else {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 1.5;
        x = Math.cos(angle) * r;
        y = -0.8;
        z = Math.sin(angle) * r;
      }

      posArr[i * 3] = x;
      posArr[i * 3 + 1] = y;
      posArr[i * 3 + 2] = z;
      origYArr[i] = y;
    }

    return [posArr, origYArr];
  }, []);

  useFrame((state) => {
    if (!particleMeshRef.current) return;
    const t = state.clock.elapsedTime;

    particleMeshRef.current.rotation.y = t * 0.25;

    const pos = particleMeshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length / 3; i++) {
      const origY = originalY[i];
      pos[i * 3 + 1] = origY + Math.sin(t * 2 + pos[i * 3] * 3) * 0.03;
    }
    particleMeshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!isVisible) return null;

  const currentPlatform = HOLO_PLATFORMS[activePlatformIndex];

  const handlePrev = () => {
    audioEngine.playClickSound();
    setActivePlatformIndex((prev) => (prev === 0 ? HOLO_PLATFORMS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    audioEngine.playClickSound();
    setActivePlatformIndex((prev) => (prev === HOLO_PLATFORMS.length - 1 ? 0 : prev + 1));
  };

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* 3D Point Cloud Mascot / Emblem (Crimson & Pink Theme) */}
      <points ref={particleMeshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#ff1744"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Concentric Metallic Pedestal Ring Platform (Matching Crimson Theme) */}
      <group position={[0, -0.85, 0]}>
        {/* Outer Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 2.3, 64]} />
          <meshStandardMaterial color="#1a1215" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Middle Glowing Crimson Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[1.2, 1.4, 64]} />
          <meshStandardMaterial
            color="#ff1744"
            emissive="#ff1744"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>

        {/* Center Disc */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <circleGeometry args={[1.1, 64]} />
          <meshStandardMaterial color="#0b0709" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      {/* Hologram Pedestal UI Controls */}
      <Html distanceFactor={7} position={[0, -1.2, 0]} center>
        <div className="flex flex-col items-center select-none">
          <div className="flex items-center gap-6 bg-black/85 border border-[#ff1744]/60 px-6 py-2 rounded-full backdrop-blur-md shadow-[0_0_25px_rgba(255,23,68,0.4)]">
            <button
              onClick={handlePrev}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className="text-[#ff4d8d] hover:text-white transition-colors p-1"
            >
              <ChevronLeft size={20} />
            </button>

            <a
              href={currentPlatform.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => audioEngine.playClickSound()}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className="group flex flex-col items-center px-4"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-white group-hover:text-[#ff1744] transition-colors">
                <span>[</span>
                <span className="text-[#ff4d8d]">{currentPlatform.name}</span>
                <span>]</span>
              </div>
              <div className="text-[9px] font-mono text-gray-400 mt-0.5">
                {currentPlatform.metric} • {currentPlatform.handle}
              </div>
            </a>

            <button
              onClick={handleNext}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className="text-[#ff4d8d] hover:text-white transition-colors p-1"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
}
