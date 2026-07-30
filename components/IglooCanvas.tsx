"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from "@react-three/postprocessing";
import * as THREE from "three";

import JenesisGlobeCore from "./JenesisGlobeCore";
import LiquidBackground from "./LiquidBackground";
import { PortfolioItem } from "@/lib/data";

interface IglooCanvasProps {
  scrollProgress: number;
  themeMode?: "dark" | "light";
  onSelectPortfolio: (item: PortfolioItem) => void;
}

/* ─────────────────────────────────────────────────────────────────
   Cinematic camera controller — scroll-driven positions + mouse parallax
   Responsive: Offsets globe for mobile screens to prevent text overlap
   ───────────────────────────────────────────────────────────────── */
function CinematicCamera({ scrollProgress }: { scrollProgress: number }) {
  const { camera, mouse, size } = useThree();
  const pos    = useRef(new THREE.Vector3(0, 0, 8));
  const look   = useRef(new THREE.Vector3(0, 0, 0));
  const mouseS = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const sp = scrollProgress;
    const isMobile = size.width < 768;

    // Smooth mouse parallax
    mouseS.current.x = THREE.MathUtils.lerp(mouseS.current.x, mouse.x, 0.03);
    mouseS.current.y = THREE.MathUtils.lerp(mouseS.current.y, mouse.y, 0.03);

    /* Per-section camera choreography */
    if (sp < 0.11) {
      // HERO — wide shot, gentle mouse parallax
      pos.current.set(mouseS.current.x * 0.6, mouseS.current.y * 0.4 + (isMobile ? 1.5 : 0.1), isMobile ? 9.5 : 8.0);
      look.current.set(0, isMobile ? 1.0 : 0, 0);
    } else if (sp < 0.22) {
      // APPROACH — step closer, tilt up
      pos.current.set(mouseS.current.x * 0.4, isMobile ? 1.8 : 0.6, isMobile ? 8.5 : 6.8);
      look.current.set(0, isMobile ? 1.2 : 0.1, 0);
    } else if (sp < 0.33) {
      // SERVICES — strafe left, globe right
      pos.current.set(mouseS.current.x * 0.3 + (isMobile ? 0 : 0.8), mouseS.current.y * 0.25 + (isMobile ? 2.0 : 0), isMobile ? 9.0 : 7.2);
      look.current.set(0, isMobile ? 1.5 : 0, 0);
    } else if (sp < 0.44) {
      // PROOF — low angle, dramatic upward tilt
      pos.current.set(mouseS.current.x * 0.3, isMobile ? 1.0 : -0.5, isMobile ? 8.5 : 6.5);
      look.current.set(0, isMobile ? 1.5 : 0.3, 0);
    } else if (sp < 0.55) {
      // PROCESS — high overhead sweep
      pos.current.set(mouseS.current.x * 0.2, isMobile ? 3.5 : 2.5, isMobile ? 9.0 : 7.5);
      look.current.set(0, isMobile ? 1.0 : -0.5, 0);
    } else if (sp < 0.66) {
      // STATS — perfectly centered, pushed back
      pos.current.set(mouseS.current.x * 0.1, mouseS.current.y * 0.1 + (isMobile ? 1.5 : 0), isMobile ? 11.0 : 8.5);
      look.current.set(0, isMobile ? 1.0 : 0, 0);
    } else if (sp < 0.77) {
      // TESTIMONIALS — dynamic off-axis
      pos.current.set(mouseS.current.x * 0.5 - (isMobile ? 0 : 0.5), mouseS.current.y * 0.4 - (isMobile ? -2.0 : 0.8), isMobile ? 9.0 : 7.0);
      look.current.set(0, isMobile ? 1.5 : 0, 0);
    } else if (sp < 0.88) {
      // FAQ — far right drift
      pos.current.set(mouseS.current.x * 0.4 + (isMobile ? 0 : 1.2), mouseS.current.y * 0.2 + (isMobile ? 2.5 : 0), isMobile ? 10.0 : 8.5);
      look.current.set(0, isMobile ? 1.5 : 0, 0);
    } else {
      // CTA — grand finale, centered and heroic
      pos.current.set(mouseS.current.x * 0.5, mouseS.current.y * 0.5 + (isMobile ? 1.8 : 0.2), isMobile ? 9.5 : 7.0);
      look.current.set(0, isMobile ? 1.0 : 0, 0);
    }

    camera.position.lerp(pos.current, 0.038);
    camera.lookAt(look.current);
  });

  return null;
}

/* ─────────────────────────────────────────────────────────────────
   Volumetric nebula dust — replaces childlike falling dots
   Ultra-subtle, cinematic depth particles
   ───────────────────────────────────────────────────────────────── */
function NebulaDust({ themeMode = "dark" }: { themeMode?: string }) {
  const ref = useRef<THREE.Points>(null);
  const isCyberpunk = themeMode === "cyberpunk";

  const [positions, colors] = useMemo(() => {
    const count = 700;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const c1 = new THREE.Color(isCyberpunk ? "#003344" : "#1a000a");
    const c2 = new THREE.Color(isCyberpunk ? "#001122" : "#120005");
    const c3 = new THREE.Color(isCyberpunk ? "#004455" : "#0d0003");

    for (let i = 0; i < count; i++) {
      // Distribute in a wide shell around the globe
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 5 + Math.random() * 10;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const pick = Math.random();
      const c = pick < 0.5 ? c1 : pick < 0.8 ? c2 : c3;
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [isCyberpunk]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Very slow, majestic drift rotation
    ref.current.rotation.y = t * 0.006;
    ref.current.rotation.x = Math.sin(t * 0.004) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Distant star field — tiny white pinpoints for depth
   ───────────────────────────────────────────────────────────────── */
function StarField() {
  const positions = useMemo(() => {
    const count = 1800;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 18 + Math.random() * 12;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#ffffff"
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main canvas export
   ───────────────────────────────────────────────────────────────── */
export default function IglooCanvas({ scrollProgress, themeMode = "light", onSelectPortfolio }: IglooCanvasProps) {
  const isDark = themeMode === "dark";

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 46, near: 0.1, far: 100 }}
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: true, // Transparent background!
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <Suspense fallback={null}>


          {/* ── PREMIUM CINEMATIC LIGHTING RIG ─────────────────── */}

          {/* Near-black ambient — mystery and depth */}
          <ambientLight intensity={isDark ? 0.10 : 0.15} color="#ffffff" />

          {/* Key light — cinematic top-right */}
          <directionalLight
            position={[6, 9, 4]}
            intensity={isDark ? 1.1 : 1.3}
            color="#ffffff"
            castShadow={false}
          />

          {/* Fill light — soft opposite side */}
          <directionalLight
            position={[-5, -3, -2]}
            intensity={0.22}
            color="#1a0008"
          />

          {/* Rim / backlight — silhouette halo from behind globe */}
          <pointLight
            position={[0, -3, -7]}
            intensity={isDark ? 3.5 : 2.8}
            color="#8b0020"
            distance={18}
          />

          {/* Gold accent fill — top-left */}
          <pointLight
            position={[-5, 4, 2]}
            intensity={isDark ? 0.9 : 1.2}
            color="#c8960c"
            distance={14}
          />

          {/* Ground bounce */}
          <pointLight
            position={[0, -6, 2]}
            intensity={0.5}
            color="#0d0003"
            distance={12}
          />

          {/* ── CAMERA CONTROLLER ────────────────────────────────── */}
          <CinematicCamera scrollProgress={scrollProgress} />

          {/* ── SCENE ELEMENTS ───────────────────────────────────── */}
          <LiquidBackground themeMode={themeMode} />
          <StarField />
          <NebulaDust themeMode={themeMode} />

          {/* ── GLOBE ────────────────────────────────────────────── */}
          <JenesisGlobeCore
            scrollProgress={scrollProgress}
            themeMode={themeMode}
          />

          {/* ── CINEMATIC POST-PROCESSING ─────────────────────────── */}
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.52}
              luminanceSmoothing={0.5}
              intensity={isDark ? 1.3 : 0.9}
              mipmapBlur
            />
            <ChromaticAberration
              offset={new THREE.Vector2(0.0005, 0.0005)}
              radialModulation={false}
              modulationOffset={0}
            />
            <Noise
              opacity={isDark ? 0.045 : 0.022}
            />
            <Vignette
              eskil={false}
              offset={0.12}
              darkness={isDark ? 0.82 : 0.55}
            />
          </EffectComposer>

          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  );
}
