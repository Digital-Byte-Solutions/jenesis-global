"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ----------------------------------------------------
 * Drifting particle nebula for non-hero sections
 * --------------------------------------------------*/
function Nebula({ count = 600 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const c1 = new THREE.Color("#ff1744");
    const c2 = new THREE.Color("#ff4d8d");
    const c3 = new THREE.Color("#ffffff");
    const c4 = new THREE.Color("#ff6b9d");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;

      const pick = Math.random();
      const color =
        pick < 0.3 ? c1 : pick < 0.55 ? c2 : pick < 0.8 ? c4 : c3;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.04 + 0.01;
    }
    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.015;
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
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
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ----------------------------------------------------
 * Slow rotating wireframe planes (neural network feel)
 * --------------------------------------------------*/
function NeuralLattice() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.z = t * 0.04;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          rotation={[
            (i * Math.PI) / 4,
            (i * Math.PI) / 3,
            (i * Math.PI) / 5,
          ]}
        >
          <torusGeometry args={[6 + i * 0.8, 0.005, 8, 80]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#ff1744" : "#ff4d8d"}
            transparent
            opacity={0.15 - i * 0.02}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ----------------------------------------------------
 * Background canvas — lightweight, ambient
 * --------------------------------------------------*/
export default function Background() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
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
        <ambientLight intensity={0.6} />
        <Nebula count={500} />
        <NeuralLattice />
      </Suspense>
    </Canvas>
  );
}
