"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  Trail,
  Sphere,
  Torus,
  Icosahedron,
  Octahedron,
} from "@react-three/drei";
import * as THREE from "three";

/* ----------------------------------------------------
 * Single floating glass cube
 * --------------------------------------------------*/
function GlassCube({
  position,
  scale = 1,
  speed = 1,
  color = "#ff1744",
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  color?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += 0.003 * speed;
    meshRef.current.rotation.y += 0.004 * speed;
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.6 * speed) * 0.3;
    meshRef.current.position.x =
      position[0] + Math.cos(t * 0.4 * speed) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <MeshTransmissionMaterial
        thickness={0.6}
        roughness={0.1}
        transmission={1}
        ior={1.3}
        chromaticAberration={0.04}
        backside
        color={color}
        attenuationColor="#ff4d8d"
        attenuationDistance={1.5}
      />
    </mesh>
  );
}

/* ----------------------------------------------------
 * Transparent rotating sphere
 * --------------------------------------------------*/
function GlassSphere({
  position,
  radius = 1,
  speed = 1,
}: {
  position: [number, number, number];
  radius?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y += 0.002 * speed;
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.5 * speed) * 0.4;
  });

  return (
    <Sphere ref={meshRef} args={[radius, 64, 64]} position={position}>
      <MeshTransmissionMaterial
        thickness={1.2}
        roughness={0.05}
        transmission={1}
        ior={1.4}
        chromaticAberration={0.06}
        backside
        color="#ffffff"
        attenuationColor="#ff1744"
        attenuationDistance={2}
      />
    </Sphere>
  );
}

/* ----------------------------------------------------
 * Holographic Ring System (multiple energy rings)
 * --------------------------------------------------*/
function HolographicRings({
  position,
}: {
  position: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.z = t * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    groupRef.current.rotation.y = t * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      <Torus args={[1.6, 0.015, 16, 100]}>
        <meshBasicMaterial color="#ff1744" transparent opacity={0.7} />
      </Torus>
      <Torus args={[2.0, 0.012, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color="#ff4d8d" transparent opacity={0.5} />
      </Torus>
      <Torus
        args={[2.4, 0.01, 16, 100]}
        rotation={[Math.PI / 2, Math.PI / 4, 0]}
      >
        <meshBasicMaterial color="#ff6b9d" transparent opacity={0.4} />
      </Torus>
      <Torus
        args={[2.8, 0.008, 16, 100]}
        rotation={[Math.PI / 5, Math.PI / 3, 0]}
      >
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </Torus>
    </group>
  );
}

/* ----------------------------------------------------
 * Central AI Core (icosahedron with inner glow)
 * --------------------------------------------------*/
function AICore({ position }: { position: [number, number, number] }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.15;
      outerRef.current.rotation.y = t * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.3;
      innerRef.current.rotation.y = -t * 0.25;
      const pulse = 1 + Math.sin(t * 2) * 0.05;
      innerRef.current.scale.setScalar(pulse);
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.2;
      wireRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Outer glass shell */}
      <Icosahedron ref={outerRef} args={[1.4, 1]}>
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0.05}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.08}
          backside
          color="#ffffff"
          attenuationColor="#ff1744"
          attenuationDistance={1}
        />
      </Icosahedron>

      {/* Wireframe layer */}
      <Icosahedron ref={wireRef} args={[1.55, 2]}>
        <meshBasicMaterial
          color="#ff4d8d"
          wireframe
          transparent
          opacity={0.4}
        />
      </Icosahedron>

      {/* Inner glowing core */}
      <Icosahedron ref={innerRef} args={[0.6, 0]}>
        <meshStandardMaterial
          color="#ff1744"
          emissive="#ff1744"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </Icosahedron>

      {/* Point light from core */}
      <pointLight color="#ff1744" intensity={3} distance={8} decay={2} />
    </group>
  );
}

/* ----------------------------------------------------
 * Particle field (small floating points)
 * --------------------------------------------------*/
function ParticleField({ count = 250 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color("#ff1744");
    const c2 = new THREE.Color("#ff4d8d");
    const c3 = new THREE.Color("#ffffff");
    for (let i = 0; i < count; i++) {
      // Spherical distribution — tighter for contained hero frame
      const r = 3.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const pick = Math.random();
      const color = pick < 0.4 ? c1 : pick < 0.75 ? c2 : c3;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
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
        size={0.04}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ----------------------------------------------------
 * Orbiting trail particles around the core
 * --------------------------------------------------*/
function OrbitingTrails() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <OrbitingDot key={i} index={i} />
      ))}
    </>
  );
}

function OrbitingDot({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const radius = 2.6 + index * 0.3;
  const speed = 0.6 - index * 0.1;
  const offset = (index * Math.PI * 2) / 3;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.5) * 0.6;
  });

  return (
    <Trail
      width={0.5}
      length={5}
      color={index === 0 ? "#ff1744" : index === 1 ? "#ff4d8d" : "#ffffff"}
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial
          color={index === 0 ? "#ff1744" : index === 1 ? "#ff4d8d" : "#ffffff"}
          toneMapped={false}
        />
      </mesh>
    </Trail>
  );
}

/* ----------------------------------------------------
 * Floating wireframe octahedron
 * --------------------------------------------------*/
function WireframeShape({
  position,
  size = 0.8,
  color = "#ff4d8d",
}: {
  position: [number, number, number];
  size?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.2;
    ref.current.rotation.y = t * 0.3;
    ref.current.position.y = position[1] + Math.sin(t * 0.7) * 0.3;
  });

  return (
    <Octahedron ref={ref} args={[size, 0]} position={position}>
      <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
    </Octahedron>
  );
}

/* ----------------------------------------------------
 * Master export — combines all floating objects
 * Tuned to fit within the hero's RIGHT column (smaller frame)
 * --------------------------------------------------*/
export default function FloatingObjects() {
  return (
    <>
      {/* Central AI Core (the hero of the hero) */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.5}>
        <AICore position={[0, 0, 0]} />
      </Float>

      {/* Holographic Rings around core */}
      <HolographicRings position={[0, 0, 0]} />

      {/* Orbiting trails */}
      <OrbitingTrails />

      {/* Glass cubes — tighter positions, smaller, closer to center */}
      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
        <GlassCube position={[-2.5, 1.2, -1]} scale={0.45} color="#ff1744" />
      </Float>
      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={0.6}>
        <GlassCube position={[2.8, -0.8, -0.5]} scale={0.55} color="#ff4d8d" />
      </Float>
      <Float speed={0.9} rotationIntensity={0.4} floatIntensity={0.7}>
        <GlassCube position={[-2.2, -1.6, 0.5]} scale={0.35} color="#ffffff" />
      </Float>

      {/* Glass spheres — small accent orbs */}
      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.4}>
        <GlassSphere position={[2.4, 1.6, -1.5]} radius={0.32} />
      </Float>
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.5}>
        <GlassSphere position={[-2.8, 0.2, 0.5]} radius={0.25} />
      </Float>

      {/* Wireframe accents */}
      <WireframeShape position={[-1.5, 2, 1.5]} size={0.3} color="#ff4d8d" />
      <WireframeShape position={[1.8, -2, 1]} size={0.35} color="#ff6b9d" />
      <WireframeShape position={[2, 2.4, -2]} size={0.25} color="#ffffff" />

      {/* Particle field (smaller, denser around center) */}
      <ParticleField count={200} />
    </>
  );
}
