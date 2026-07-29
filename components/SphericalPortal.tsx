"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SphericalPortalProps {
  scrollProgress: number;
}

export default function SphericalPortal({ scrollProgress }: SphericalPortalProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);

  const isVisible = scrollProgress >= 0.88;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.15;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.22;
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[Math.PI * 0.45, 0, 0]}>
      {/* Outer Glowing Spherical Rim (Matching Screenshot 7!) */}
      <mesh position={[0, 0, -1]}>
        <torusGeometry args={[3.2, 0.4, 32, 100]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00b4d8"
          emissiveIntensity={3}
          roughness={0.1}
        />
      </mesh>

      {/* Concentric Segmented Ring 1 */}
      <group ref={ring1Ref}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, 0, (i / 4) * Math.PI * 2]} position={[0, 0, 0]}>
            <torusGeometry args={[2.1, 0.18, 16, 32, Math.PI * 0.38]} />
            <meshStandardMaterial color="#343a40" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Concentric Segmented Ring 2 */}
      <group ref={ring2Ref}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0, 0, (i / 3) * Math.PI * 2]} position={[0, 0, 0.4]}>
            <torusGeometry args={[1.3, 0.14, 16, 32, Math.PI * 0.5]} />
            <meshStandardMaterial color="#495057" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* Center Energy Vortex */}
      <mesh position={[0, 0, 0.8]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00f0ff"
          emissiveIntensity={4}
        />
      </mesh>
    </group>
  );
}
