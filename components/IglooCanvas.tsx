"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import JenesisGlobeCore from "./JenesisGlobeCore";
import PortfolioMonoliths from "./PortfolioMonoliths";
import ParticleHologramPedestal from "./ParticleHologramPedestal";
import SphericalPortal from "./SphericalPortal";
import { PortfolioItem } from "@/lib/data";

interface IglooCanvasProps {
  scrollProgress: number;
  onSelectPortfolio: (item: PortfolioItem) => void;
}

/* Mouse & Scroll-reactive Camera Controller */
function DynamicCameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera, mouse } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Determine target camera positions across scroll sections
    if (scrollProgress < 0.4) {
      // Stage 1 & 2: Frontal view of Globe Core
      targetPos.current.set(mouse.x * 0.5, mouse.y * 0.4 + 0.2, 7.8);
      targetLook.current.set(0, 0, 0);
    } else if (scrollProgress < 0.75) {
      // Stage 3 & 4: Monolith fly-through in space
      targetPos.current.set(mouse.x * 0.8, mouse.y * 0.5, 6.5);
      targetLook.current.set(0, 0, 0);
    } else if (scrollProgress < 0.88) {
      // Stage 5: Hologram Pedestal View
      targetPos.current.set(mouse.x * 0.4, -0.2, 6.0);
      targetLook.current.set(0, -0.6, 0);
    } else {
      // Stage 6: Top-Down Spherical Portal View (Matching Screenshot 7!)
      targetPos.current.set(0, 4.5, 2.5);
      targetLook.current.set(0, 0, 0);
    }

    camera.position.lerp(targetPos.current, 0.05);
    camera.lookAt(targetLook.current);
  });

  return null;
}

/* Floating Snow / Atmospheric Dust Particle Snowfall System */
function AtmosphericParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const count = 1200;
    const posArr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      posArr[i * 3] = (Math.random() - 0.5) * 20;
      posArr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return [posArr];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.02;

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length / 3; i++) {
      pos[i * 3 + 1] -= 0.003;
      if (pos[i * 3 + 1] < -10) pos[i * 3 + 1] = 10;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#00f0ff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* Atmospheric Mountain / Terrain Ground Plane */
function GroundTerrain({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const opacity = Math.max(0, 1 - scrollProgress * 2.2); // Fades out as we fly into space

  if (opacity <= 0.01) return null;

  return (
    <mesh ref={meshRef} position={[0, -1.8, -2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[30, 30, 64, 64]} />
      <meshStandardMaterial
        color="#0d1117"
        roughness={0.8}
        metalness={0.2}
        wireframe={false}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

export default function IglooCanvas({ scrollProgress, onSelectPortfolio }: IglooCanvasProps) {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 48 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting Rig matching Igloo.inc style */}
          <ambientLight intensity={0.6} color="#cce7ff" />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-5, -4, -5]} intensity={0.5} color="#00f0ff" />
          <pointLight position={[0, 2, 3]} intensity={2.0} color="#00d4ff" />

          <DynamicCameraController scrollProgress={scrollProgress} />
          <AtmosphericParticles />
          <GroundTerrain scrollProgress={scrollProgress} />

          {/* 3D Visual Stages */}
          <JenesisGlobeCore scrollProgress={scrollProgress} />
          <PortfolioMonoliths
            scrollProgress={scrollProgress}
            onSelectPortfolio={onSelectPortfolio}
          />
          <ParticleHologramPedestal scrollProgress={scrollProgress} />
          <SphericalPortal scrollProgress={scrollProgress} />

          {/* Post-Processing Shaders (Bloom & Vignette) */}
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.4}
              luminanceSmoothing={0.5}
              intensity={1.5}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.15} darkness={0.7} />
          </EffectComposer>

          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  );
}
