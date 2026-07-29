"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ----------------------------------------------------
 * High-performance drifting particle nebula
 * Lightweight GPU particle system
 * --------------------------------------------------*/
function Nebula({ count = 250 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const c1 = new THREE.Color("#ff1744");
    const c2 = new THREE.Color("#ff4d8d");
    const c3 = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      const pick = Math.random();
      const color = pick < 0.4 ? c1 : pick < 0.7 ? c2 : c3;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Background() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.25]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
        depth: false,
      }}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <Nebula count={250} />
      </Suspense>
    </Canvas>
  );
}
