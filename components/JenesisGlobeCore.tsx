"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface GlobeCoreProps {
  scrollProgress: number;
}

interface BlockData {
  initialPos: THREE.Vector3;
  explodedPos: THREE.Vector3;
  initialRot: THREE.Euler;
  explodedRot: THREE.Euler;
  scale: [number, number, number];
  ringIndex: number;
  label?: string;
}

export default function JenesisGlobeCore({ scrollProgress }: GlobeCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);

  // Generate concentric 3D blocks in a globe / dome formation
  const blocks = useMemo(() => {
    const list: BlockData[] = [];
    const rings = 6;
    const labelsMap: Record<number, string> = {
      2: "35",
      5: "62",
      8: "7.3",
      12: "86",
      15: "54",
      18: "91.2",
    };

    let count = 0;
    for (let r = 0; r < rings; r++) {
      const phi = (r / (rings - 1)) * (Math.PI * 0.45); // Latitude angle
      const radius = 2.4 * Math.sin(phi) + 0.4;
      const yPos = 2.4 * Math.cos(phi) - 1.2;
      const blocksInRing = Math.max(6, Math.floor(16 * Math.sin(phi)));

      for (let i = 0; i < blocksInRing; i++) {
        const theta = (i / blocksInRing) * Math.PI * 2;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;

        const initialPos = new THREE.Vector3(x, yPos, z);

        // Explosion trajectory vector (outwards and upwards)
        const explodeDir = initialPos.clone().normalize();
        explodeDir.y += 0.5;
        const distance = 2.5 + Math.random() * 3.5;
        const explodedPos = initialPos.clone().add(explodeDir.multiplyScalar(distance));

        const initialRot = new THREE.Euler(0, -theta, 0);
        const explodedRot = new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        );

        const width = 0.45 + Math.random() * 0.15;
        const height = 0.35 + Math.random() * 0.1;
        const depth = 0.5 + Math.random() * 0.1;

        list.push({
          initialPos,
          explodedPos,
          initialRot,
          explodedRot,
          scale: [width, height, depth],
          ringIndex: r,
          label: labelsMap[count],
        });

        count++;
      }
    }
    return list;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Slow ambient rotation
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.08;

    // Core light pulse intensity
    if (coreLightRef.current) {
      coreLightRef.current.intensity = 2.5 + Math.sin(t * 3) * 0.8;
    }
  });

  // Calculate explosion lerp factor based on scroll (0.2 -> 0.55)
  const explosionFactor = useMemo(() => {
    if (scrollProgress < 0.15) return 0;
    if (scrollProgress > 0.55) return 1;
    return (scrollProgress - 0.15) / 0.4;
  }, [scrollProgress]);

  // Elevation of top blocks (Stage 2: 0.15 -> 0.35)
  const topElevation = useMemo(() => {
    if (scrollProgress < 0.1) return 0;
    if (scrollProgress > 0.35) return 1;
    return (scrollProgress - 0.1) / 0.25;
  }, [scrollProgress]);

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Inner glowing core sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00b4d8"
          emissiveIntensity={2.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      <pointLight ref={coreLightRef} color="#00f0ff" intensity={3} distance={10} />

      {/* Render concentric block rings */}
      {blocks.map((b, idx) => {
        // Position interpolation
        const currentPos = new THREE.Vector3().lerpVectors(
          b.initialPos,
          b.explodedPos,
          explosionFactor
        );

        // Top ring elevation offset for stage 2
        if (b.ringIndex <= 1 && explosionFactor < 0.8) {
          currentPos.y += topElevation * 0.9 * (2 - b.ringIndex);
        }

        // Rotation interpolation
        const rotX = THREE.MathUtils.lerp(b.initialRot.x, b.explodedRot.x, explosionFactor);
        const rotY = THREE.MathUtils.lerp(b.initialRot.y, b.explodedRot.y, explosionFactor);
        const rotZ = THREE.MathUtils.lerp(b.initialRot.z, b.explodedRot.z, explosionFactor);

        return (
          <group key={idx} position={currentPos} rotation={[rotX, rotY, rotZ]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={b.scale} />
              <meshStandardMaterial
                color="#222831"
                roughness={0.2}
                metalness={0.85}
                emissive="#00d4ff"
                emissiveIntensity={0.2 + (1 - explosionFactor) * 0.4}
              />
            </mesh>

            {/* Glowing seam wireframe outline */}
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(...b.scale)]} />
              <lineBasicMaterial color="#00f0ff" linewidth={1.5} transparent opacity={0.7} />
            </lineSegments>

            {/* Telemetry line callout when exploding (matching screenshot 3!) */}
            {explosionFactor > 0.25 && b.label && (
              <Html distanceFactor={8} position={[0, 0.4, 0]} center>
                <div className="flex flex-col items-center pointer-events-none select-none">
                  <div className="w-[1px] h-8 bg-gradient-to-t from-[#00f0ff] to-transparent opacity-80" />
                  <div className="px-1.5 py-0.5 rounded bg-black/80 border border-[#00f0ff]/60 text-[10px] font-mono text-[#00f0ff] tracking-widest backdrop-blur-md shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                    {b.label}
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
