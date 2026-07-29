"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Html, Icosahedron, Torus, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface GlobeCoreProps {
  scrollProgress: number;
}

interface SurroundingObject {
  type: "octahedron" | "sphere" | "cube";
  initialPos: THREE.Vector3;
  explodedPos: THREE.Vector3;
  scale: number;
  color: string;
  wireframe?: boolean;
  label?: string;
}

export default function JenesisGlobeCore({ scrollProgress }: GlobeCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);

  // Explosion factor lerp (0.15 -> 0.55 scroll)
  const explosionFactor = useMemo(() => {
    if (scrollProgress < 0.15) return 0;
    if (scrollProgress > 0.55) return 1;
    return (scrollProgress - 0.15) / 0.4;
  }, [scrollProgress]);

  // Generate floating surrounding objects matching the user's screenshot!
  const surroundingObjects = useMemo(() => {
    const list: SurroundingObject[] = [
      {
        type: "octahedron",
        initialPos: new THREE.Vector3(-2.8, 2.2, -1.0),
        explodedPos: new THREE.Vector3(-5.5, 4.2, -2.0),
        scale: 0.5,
        color: "#ff4d8d",
        wireframe: true,
        label: "86",
      },
      {
        type: "sphere",
        initialPos: new THREE.Vector3(2.4, 1.8, 0.8),
        explodedPos: new THREE.Vector3(4.8, 3.5, 1.5),
        scale: 0.4,
        color: "#111115",
        wireframe: false,
        label: "7.3",
      },
      {
        type: "octahedron",
        initialPos: new THREE.Vector3(2.2, -2.0, -0.5),
        explodedPos: new THREE.Vector3(4.5, -4.0, -1.0),
        scale: 0.45,
        color: "#ff4d8d",
        wireframe: true,
        label: "62",
      },
      {
        type: "cube",
        initialPos: new THREE.Vector3(-2.5, -1.6, 0.5),
        explodedPos: new THREE.Vector3(-4.8, -3.2, 1.2),
        scale: 0.5,
        color: "#ff1744",
        wireframe: false,
        label: "35",
      },
      {
        type: "sphere",
        initialPos: new THREE.Vector3(-2.2, 0.2, 1.8),
        explodedPos: new THREE.Vector3(-4.2, 0.5, 3.5),
        scale: 0.35,
        color: "#15151a",
        wireframe: false,
        label: "54",
      },
      {
        type: "octahedron",
        initialPos: new THREE.Vector3(1.8, 2.5, -1.8),
        explodedPos: new THREE.Vector3(3.8, 4.8, -3.2),
        scale: 0.3,
        color: "#ffffff",
        wireframe: true,
        label: "91.2",
      },
    ];
    return list;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
    }

    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.15;
      outerRef.current.rotation.y = t * 0.1;
      outerRef.current.scale.setScalar(1 + explosionFactor * 0.8);
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.3;
      innerRef.current.rotation.y = -t * 0.25;
      const pulse = (1 + Math.sin(t * 2) * 0.05) * (1 + explosionFactor * 1.2);
      innerRef.current.scale.setScalar(pulse);
    }

    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.2;
      wireRef.current.rotation.z = t * 0.15;
      wireRef.current.scale.setScalar(1 + explosionFactor * 1.5);
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.15;
      ringsRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
      ringsRef.current.rotation.y = t * 0.1;
      ringsRef.current.scale.setScalar(1 + explosionFactor * 1.1);
    }

    if (coreLightRef.current) {
      coreLightRef.current.intensity = 3.0 + Math.sin(t * 3) * 1.0;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* 1. Outer Crimson Geodesic Glass Shell */}
      <Icosahedron ref={outerRef} args={[1.5, 1]}>
        <MeshTransmissionMaterial
          thickness={0.6}
          roughness={0.05}
          transmission={0.95}
          ior={1.5}
          chromaticAberration={0.08}
          backside
          color="#ffffff"
          attenuationColor="#ff1744"
          attenuationDistance={1}
        />
      </Icosahedron>

      {/* 2. Wireframe Geodesic Net Layer */}
      <Icosahedron ref={wireRef} args={[1.65, 2]}>
        <meshBasicMaterial
          color="#ff4d8d"
          wireframe
          transparent
          opacity={0.6 - explosionFactor * 0.3}
        />
      </Icosahedron>

      {/* 3. Inner Glowing Crimson Core */}
      <Icosahedron ref={innerRef} args={[0.7, 0]}>
        <meshStandardMaterial
          color="#ff1744"
          emissive="#ff1744"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </Icosahedron>

      <pointLight ref={coreLightRef} color="#ff1744" intensity={4} distance={10} />

      {/* 4. Holographic Multi-Axis Orbital Rings (Matching Screenshot exactly!) */}
      <group ref={ringsRef}>
        {/* Ring 1 - Crimson Main */}
        <Torus args={[1.9, 0.015, 16, 100]}>
          <meshBasicMaterial color="#ff1744" transparent opacity={0.8} />
        </Torus>

        {/* Ring 2 - Pink Tilted */}
        <Torus args={[2.3, 0.012, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#ff4d8d" transparent opacity={0.7} />
        </Torus>

        {/* Ring 3 - Glowing Pink Vector */}
        <Torus args={[2.7, 0.01, 16, 100]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#ff6b9d" transparent opacity={0.6} />
        </Torus>

        {/* Ring 4 - Silver/White Vertical Orbit */}
        <Torus args={[3.1, 0.008, 16, 100]} rotation={[Math.PI / 5, Math.PI / 3, 0]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </Torus>
      </group>

      {/* 5. Surrounding Floating Objects with Scroll Explosion & Callout Telemetry */}
      {surroundingObjects.map((obj, idx) => {
        const currentPos = new THREE.Vector3().lerpVectors(
          obj.initialPos,
          obj.explodedPos,
          explosionFactor
        );

        return (
          <group key={idx} position={currentPos}>
            {obj.type === "octahedron" && (
              <mesh scale={obj.scale}>
                <octahedronGeometry args={[1, 0]} />
                <meshBasicMaterial
                  color={obj.color}
                  wireframe={obj.wireframe}
                  transparent
                  opacity={0.85}
                />
              </mesh>
            )}

            {obj.type === "sphere" && (
              <Sphere args={[obj.scale, 32, 32]}>
                <meshStandardMaterial
                  color={obj.color}
                  roughness={0.1}
                  metalness={0.9}
                  emissive="#ff1744"
                  emissiveIntensity={0.2}
                />
              </Sphere>
            )}

            {obj.type === "cube" && (
              <mesh scale={obj.scale}>
                <boxGeometry args={[1, 1, 1]} />
                <MeshTransmissionMaterial
                  thickness={0.5}
                  roughness={0.1}
                  transmission={1}
                  ior={1.4}
                  chromaticAberration={0.06}
                  color="#ff1744"
                  attenuationColor="#ff4d8d"
                />
              </mesh>
            )}

            {/* Wireframe HUD Callout Label during scroll explosion */}
            {explosionFactor > 0.2 && obj.label && (
              <Html distanceFactor={8} position={[0, 0.4, 0]} center>
                <div className="flex flex-col items-center pointer-events-none select-none">
                  <div className="w-[1px] h-8 bg-gradient-to-t from-[#ff1744] to-transparent opacity-80" />
                  <div className="px-1.5 py-0.5 rounded bg-black/90 border border-[#ff4d8d]/60 text-[10px] font-mono text-[#ff4d8d] tracking-widest backdrop-blur-md shadow-[0_0_10px_rgba(255,23,68,0.5)]">
                    {obj.label}
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
