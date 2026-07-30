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
  themeMode?: "dark" | "light" | "cyberpunk";
  onSelectPortfolio: (item: PortfolioItem) => void;
}

/* Dynamic WebGL Atmosphere: ALWAYS keep dark obsidian background for the globe */
function WebGLAtmosphere({ themeMode = "dark" }: { themeMode?: string }) {
  const { scene } = useThree();

  const [bgColor, fogColor] = useMemo(() => {
    if (themeMode === "cyberpunk") {
      return ["#050012", "#050012"];
    }
    // In light and dark modes, keep signature dark obsidian space background for the globe
    return ["#050507", "#050507"];
  }, [themeMode]);

  useFrame(() => {
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(fogColor, 0.04);
  });

  return null;
}

/* Mouse & Scroll-reactive Camera Controller */
function DynamicCameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera, mouse } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (scrollProgress < 0.4) {
      targetPos.current.set(mouse.x * 0.5, mouse.y * 0.4 + 0.2, 7.8);
      targetLook.current.set(0, 0, 0);
    } else if (scrollProgress < 0.75) {
      targetPos.current.set(mouse.x * 0.8, mouse.y * 0.5, 6.5);
      targetLook.current.set(0, 0, 0);
    } else if (scrollProgress < 0.88) {
      targetPos.current.set(mouse.x * 0.4, -0.2, 6.0);
      targetLook.current.set(0, -0.6, 0);
    } else {
      targetPos.current.set(0, 4.5, 2.5);
      targetLook.current.set(0, 0, 0);
    }

    camera.position.lerp(targetPos.current, 0.05);
    camera.lookAt(targetLook.current);
  });

  return null;
}

/* Crimson & Cyberpunk Atmospheric Particles */
function CrimsonAtmosphericParticles({ themeMode = "dark" }: { themeMode?: string }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 1200;
    const posArr = new Float32Array(count * 3);
    const colArr = new Float32Array(count * 3);

    let c1 = new THREE.Color("#ff1744");
    let c2 = new THREE.Color("#ff4d8d");
    let c3 = new THREE.Color("#ffffff");

    if (themeMode === "cyberpunk") {
      c1 = new THREE.Color("#00f0ff");
      c2 = new THREE.Color("#ff0077");
      c3 = new THREE.Color("#00ffff");
    }

    for (let i = 0; i < count; i++) {
      posArr[i * 3] = (Math.random() - 0.5) * 20;
      posArr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const pick = Math.random();
      const col = pick < 0.5 ? c1 : pick < 0.8 ? c2 : c3;
      colArr[i * 3] = col.r;
      colArr[i * 3 + 1] = col.g;
      colArr[i * 3 + 2] = col.b;
    }
    return [posArr, colArr];
  }, [themeMode]);

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
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function IglooCanvas({ scrollProgress, themeMode = "dark", onSelectPortfolio }: IglooCanvasProps) {
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
          <WebGLAtmosphere themeMode={themeMode} />

          {/* Signature Crimson & Pink Lighting Rig */}
          <ambientLight intensity={0.5} color="#ffffff" />
          <directionalLight position={[3, 3, 3]} intensity={0.9} color="#ffffff" />
          <directionalLight position={[-3, -2, -3]} intensity={0.4} color={themeMode === "cyberpunk" ? "#00f0ff" : "#ff4d8d"} />
          <pointLight position={[0, 0, 4]} intensity={2.0} color={themeMode === "cyberpunk" ? "#ff0055" : "#ff1744"} />
          <pointLight position={[-4, 3, 2]} intensity={1.2} color={themeMode === "cyberpunk" ? "#00ffff" : "#ff4d8d"} />
          <pointLight position={[4, -3, 2]} intensity={1.0} color="#ff6b9d" />

          <DynamicCameraController scrollProgress={scrollProgress} />
          <CrimsonAtmosphericParticles themeMode={themeMode} />

          {/* 3D Visual Stages */}
          <JenesisGlobeCore scrollProgress={scrollProgress} themeMode={themeMode} />
          <PortfolioMonoliths
            scrollProgress={scrollProgress}
            onSelectPortfolio={onSelectPortfolio}
          />
          <ParticleHologramPedestal scrollProgress={scrollProgress} />
          <SphericalPortal scrollProgress={scrollProgress} />

          {/* Post-Processing Shaders (Crimson Bloom & Vignette) */}
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.4}
              luminanceSmoothing={0.4}
              intensity={1.6}
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
