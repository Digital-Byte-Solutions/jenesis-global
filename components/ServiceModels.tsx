"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
  RoundedBox,
  Text,
  Trail,
  Sphere,
  Torus,
  Icosahedron,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ============================================================
 * SHARED: lighting + environment used by every service canvas
 * ==========================================================*/
function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={0.9} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={1.5} color="#ff1744" />
      <pointLight position={[3, -2, 2]} intensity={1.2} color="#ff4d8d" />
      <pointLight position={[0, 0, 4]} intensity={0.8} color="#ffffff" />
      <Environment preset="night" />
    </>
  );
}

/* ============================================================
 * MODEL 1 — Premium Brand Strategy: Rotating Diamond Logo Cube
 * ==========================================================*/
function BrandModel() {
  const group = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.25;
      group.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5;
      innerRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={group}>
        {/* Outer glass diamond */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <octahedronGeometry args={[1.4, 0]} />
          <MeshTransmissionMaterial
            thickness={0.8}
            roughness={0.05}
            transmission={1}
            ior={1.6}
            chromaticAberration={0.06}
            backside
            color="#ffffff"
            attenuationColor="#ff1744"
            attenuationDistance={1.2}
          />
        </mesh>

        {/* Inner glowing core */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#ff1744"
            emissive="#ff1744"
            emissiveIntensity={2.5}
            toneMapped={false}
          />
        </mesh>

        {/* Floating "A" mark */}
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
          <Text
            position={[0, 0, 1.45]}
            fontSize={0.35}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            A
          </Text>
        </Float>

        {/* Orbital ring */}
        <Torus args={[1.9, 0.01, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
          <meshBasicMaterial color="#ff4d8d" transparent opacity={0.6} />
        </Torus>
      </group>
    </Float>
  );
}

/* ============================================================
 * MODEL 2 — Website Development: Floating Browser Windows
 * ==========================================================*/
function WebsiteModel() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    }
  });

  // Three stacked browser windows
  const windows = [
    { pos: [-0.4, 0.5, -0.3] as [number, number, number], rot: 0.1, color: "#ff1744" },
    { pos: [0, 0, 0] as [number, number, number], rot: 0, color: "#ff4d8d" },
    { pos: [0.4, -0.5, 0.3] as [number, number, number], rot: -0.1, color: "#ff6b9d" },
  ];

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={group}>
        {windows.map((w, i) => (
          <Float
            key={i}
            speed={1.3 + i * 0.2}
            rotationIntensity={0.05}
            floatIntensity={0.3}
          >
            <group position={w.pos} rotation={[0, w.rot, 0]}>
              {/* Window frame */}
              <RoundedBox args={[2.4, 1.6, 0.08]} radius={0.08} smoothness={4}>
                <MeshTransmissionMaterial
                  thickness={0.3}
                  roughness={0.1}
                  transmission={0.95}
                  ior={1.3}
                  chromaticAberration={0.03}
                  backside
                  color="#ffffff"
                  attenuationColor={w.color}
                  attenuationDistance={1.5}
                />
              </RoundedBox>

              {/* Top bar with dots */}
              <mesh position={[0, 0.65, 0.05]}>
                <planeGeometry args={[2.3, 0.2]} />
                <meshBasicMaterial color="#0a0a14" transparent opacity={0.6} />
              </mesh>
              {[-0.95, -0.75, -0.55].map((x, idx) => (
                <mesh key={idx} position={[x, 0.65, 0.06]}>
                  <circleGeometry args={[0.04, 16]} />
                  <meshBasicMaterial
                    color={["#ff5f56", "#ffbd2e", "#27c93f"][idx]}
                    toneMapped={false}
                  />
                </mesh>
              ))}

              {/* Content lines */}
              {[0.3, 0.1, -0.1, -0.3, -0.5].map((y, idx) => (
                <mesh
                  key={idx}
                  position={[-0.6 + (idx % 2) * 0.3, y, 0.05]}
                >
                  <planeGeometry args={[1 - idx * 0.1, 0.04]} />
                  <meshBasicMaterial
                    color={w.color}
                    transparent
                    opacity={0.5 - idx * 0.05}
                  />
                </mesh>
              ))}

              {/* Accent corner */}
              <mesh position={[0.9, 0.3, 0.06]}>
                <circleGeometry args={[0.12, 32]} />
                <meshBasicMaterial color={w.color} toneMapped={false} />
              </mesh>
            </group>
          </Float>
        ))}
      </group>
    </Float>
  );
}

/* ============================================================
 * MODEL 3 — Mobile Apps: Floating Phone
 * ==========================================================*/
function AppsModel() {
  const phoneRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(t * 0.4) * 0.4 + 0.2;
      phoneRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
    if (screenRef.current) {
      const m = screenRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.5 + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={phoneRef}>
        {/* Phone body */}
        <RoundedBox args={[1.3, 2.6, 0.15]} radius={0.18} smoothness={6}>
          <MeshTransmissionMaterial
            thickness={0.6}
            roughness={0.05}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.04}
            backside
            color="#ffffff"
            attenuationColor="#ff4d8d"
            attenuationDistance={1.2}
          />
        </RoundedBox>

        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.085]}>
          <planeGeometry args={[1.1, 2.35]} />
          <meshBasicMaterial color="#ff1744" transparent opacity={0.6} />
        </mesh>

        {/* Notch */}
        <mesh position={[0, 1.05, 0.09]}>
          <planeGeometry args={[0.4, 0.08]} />
          <meshBasicMaterial color="#020205" />
        </mesh>

        {/* App icons grid */}
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2].map((col) => (
            <mesh
              key={`${row}-${col}`}
              position={[
                -0.35 + col * 0.35,
                0.4 - row * 0.4,
                0.092,
              ]}
            >
              <planeGeometry args={[0.22, 0.22]} />
              <meshBasicMaterial
                color={
                  (row + col) % 3 === 0
                    ? "#ffffff"
                    : (row + col) % 3 === 1
                    ? "#ff4d8d"
                    : "#ff6b9d"
                }
                transparent
                opacity={0.85}
                toneMapped={false}
              />
            </mesh>
          ))
        )}

        {/* Home indicator */}
        <mesh position={[0, -1.15, 0.092]}>
          <planeGeometry args={[0.35, 0.04]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>

        {/* Side rim glow */}
        <Torus
          args={[0.9, 0.015, 16, 100]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <meshBasicMaterial color="#ff1744" transparent opacity={0.4} />
        </Torus>
      </group>

      {/* Floating mini-phone behind */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <group position={[1.4, -0.4, -0.8]} rotation={[0, -0.5, 0.2]} scale={0.5}>
          <RoundedBox args={[1.3, 2.6, 0.15]} radius={0.18} smoothness={4}>
            <meshStandardMaterial
              color="#ff4d8d"
              emissive="#ff1744"
              emissiveIntensity={0.4}
              metalness={0.5}
              roughness={0.2}
              transparent
              opacity={0.6}
            />
          </RoundedBox>
        </group>
      </Float>
    </Float>
  );
}

/* ============================================================
 * MODEL 4 — Custom AI: Neural Brain (icosphere + connected nodes)
 * ==========================================================*/
function AIModel() {
  const group = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.2;
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.4;
      innerRef.current.rotation.z = t * 0.3;
      const p = 1 + Math.sin(t * 2.5) * 0.06;
      innerRef.current.scale.setScalar(p);
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.3;
      wireRef.current.rotation.y = t * 0.2;
    }
  });

  // Neural node positions (around the brain)
  const nodes: [number, number, number][] = [];
  for (let i = 0; i < 18; i++) {
    const phi = Math.acos(2 * (i / 18) - 1);
    const theta = i * 2.4;
    const r = 1.85;
    nodes.push([
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi),
    ]);
  }

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={group}>
        {/* Outer glass brain shell */}
        <Icosahedron args={[1.3, 1]}>
          <MeshTransmissionMaterial
            thickness={0.5}
            roughness={0.05}
            transmission={1}
            ior={1.4}
            chromaticAberration={0.08}
            backside
            color="#ffffff"
            attenuationColor="#ff1744"
            attenuationDistance={1}
          />
        </Icosahedron>

        {/* Wireframe layer */}
        <Icosahedron ref={wireRef} args={[1.45, 2]}>
          <meshBasicMaterial
            color="#ff4d8d"
            wireframe
            transparent
            opacity={0.4}
          />
        </Icosahedron>

        {/* Inner pulsing core */}
        <Icosahedron ref={innerRef} args={[0.55, 0]}>
          <meshStandardMaterial
            color="#ff1744"
            emissive="#ff1744"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </Icosahedron>

        {/* Neural nodes */}
        {nodes.map((pos, i) => (
          <NeuralNode key={i} position={pos} delay={i * 0.15} />
        ))}

        {/* Inner light */}
        <pointLight color="#ff1744" intensity={2} distance={6} />
      </group>
    </Float>
  );
}

function NeuralNode({
  position,
  delay,
}: {
  position: [number, number, number];
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.4 + Math.sin(t * 2) * 0.4;
    const s = 1 + Math.sin(t * 3) * 0.3;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshBasicMaterial color="#ff4d8d" transparent toneMapped={false} />
    </mesh>
  );
}

/* ============================================================
 * MODEL 5 — ERP Systems: Interconnected Data Cubes Grid
 * ==========================================================*/
function ERPModel() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.2;
      group.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
  });

  // 3x3 grid of cubes — corner cubes are larger
  const cubes: { pos: [number, number, number]; size: number; color: string }[] = [];
  const spacing = 0.9;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const isCenter = x === 0 && y === 0;
      const isCorner = Math.abs(x) === 1 && Math.abs(y) === 1;
      cubes.push({
        pos: [x * spacing, y * spacing, 0],
        size: isCenter ? 0.45 : isCorner ? 0.35 : 0.28,
        color: isCenter ? "#ff1744" : isCorner ? "#ff4d8d" : "#ff6b9d",
      });
    }
  }

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={group}>
        {cubes.map((c, i) => (
          <ERPCube key={i} {...c} index={i} />
        ))}

        {/* Connecting lines (just visual rings around the grid) */}
        <Torus args={[1.6, 0.008, 16, 100]} rotation={[0, 0, 0]}>
          <meshBasicMaterial color="#ff1744" transparent opacity={0.5} />
        </Torus>
        <Torus args={[1.6, 0.008, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#ff4d8d" transparent opacity={0.5} />
        </Torus>
        <Torus args={[1.6, 0.008, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
          <meshBasicMaterial color="#ff6b9d" transparent opacity={0.5} />
        </Torus>

        {/* Center cube emits light */}
        <pointLight color="#ff1744" intensity={2.5} distance={4} />
      </group>
    </Float>
  );
}

function ERPCube({
  pos,
  size,
  color,
  index,
}: {
  pos: [number, number, number];
  size: number;
  color: string;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + index * 0.3;
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.y = t * 0.3;
  });
  return (
    <mesh ref={ref} position={pos}>
      <boxGeometry args={[size, size, size]} />
      <MeshTransmissionMaterial
        thickness={0.3}
        roughness={0.1}
        transmission={1}
        ior={1.4}
        chromaticAberration={0.04}
        backside
        color="#ffffff"
        attenuationColor={color}
        attenuationDistance={1}
      />
    </mesh>
  );
}

/* ============================================================
 * MODEL 6 — Cloud Services: Sphere with orbiting satellites
 * ==========================================================*/
function CloudModel() {
  const group = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.15;
    if (sphereRef.current) sphereRef.current.rotation.y = t * 0.1;
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={group}>
        {/* Earth-like glass sphere */}
        <Sphere ref={sphereRef} args={[1.2, 64, 64]}>
          <MeshTransmissionMaterial
            thickness={1.5}
            roughness={0.05}
            transmission={1}
            ior={1.45}
            chromaticAberration={0.06}
            backside
            color="#ffffff"
            attenuationColor="#ff1744"
            attenuationDistance={2}
          />
        </Sphere>

        {/* Wireframe overlay (globe lines) */}
        <Sphere args={[1.22, 16, 12]}>
          <meshBasicMaterial
            color="#ff4d8d"
            wireframe
            transparent
            opacity={0.3}
          />
        </Sphere>

        {/* Orbiting satellites */}
        {[0, 1, 2, 3].map((i) => (
          <Satellite key={i} index={i} />
        ))}

        {/* Orbital rings */}
        <Torus args={[1.7, 0.005, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#ff1744" transparent opacity={0.6} />
        </Torus>
        <Torus
          args={[2.0, 0.005, 16, 100]}
          rotation={[Math.PI / 2, Math.PI / 4, 0]}
        >
          <meshBasicMaterial color="#ff4d8d" transparent opacity={0.5} />
        </Torus>
        <Torus
          args={[2.3, 0.005, 16, 100]}
          rotation={[Math.PI / 5, Math.PI / 3, 0]}
        >
          <meshBasicMaterial color="#ff6b9d" transparent opacity={0.4} />
        </Torus>

        {/* Core light */}
        <pointLight color="#ff1744" intensity={1.8} distance={5} />
      </group>
    </Float>
  );
}

function Satellite({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const radius = 1.7 + index * 0.2;
  const speed = 0.5 - index * 0.08;
  const offset = (index * Math.PI) / 2;
  const tilt = (index * Math.PI) / 6;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.3 + tilt) * 0.5;
  });

  return (
    <Trail
      width={0.4}
      length={4}
      color={index % 2 === 0 ? "#ff1744" : "#ff4d8d"}
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial
          color={index % 2 === 0 ? "#ff1744" : "#ff4d8d"}
          emissive={index % 2 === 0 ? "#ff1744" : "#ff4d8d"}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </Trail>
  );
}

/* ============================================================
 * CANVAS WRAPPER — used by ServiceCanvas with model id
 * ==========================================================*/
const MODELS: Record<string, () => JSX.Element> = {
  brand: BrandModel,
  engineering: WebsiteModel,
  apps: AppsModel,
  ai: AIModel,
  erp: ERPModel,
  cloud: CloudModel,
};

interface ServiceCanvasProps {
  model: keyof typeof MODELS;
  className?: string;
}

export default function ServiceCanvas({
  model,
  className = "",
}: ServiceCanvasProps) {
  const Model = MODELS[model];
  if (!Model) return null;

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      >
        <Suspense fallback={null}>
          <StudioLighting />
          <Model />
          <EffectComposer multisampling={0} disableNormalPass>
            <Bloom
              luminanceThreshold={0.5}
              luminanceSmoothing={0.4}
              intensity={1.2}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
