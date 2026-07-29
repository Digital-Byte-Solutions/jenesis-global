"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import FloatingObjects from "./FloatingObjects";

/* Mouse-reactive camera (subtle, doesn't break framing) */
function MouseCamera() {
  const { camera, mouse } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 8));

  useFrame(() => {
    target.current.x = mouse.x * 0.65;
    target.current.y = mouse.y * 0.45;
    camera.position.x += (target.current.x - camera.position.x) * 0.05;
    camera.position.y += (target.current.y - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Scene({ active = true }: { active?: boolean }) {
  // Lower pixel ratio on small screens; frameloop pauses when offscreen
  const maxDpr = useMemo(() => {
    if (typeof window === "undefined") return 1.75;
    return window.matchMedia("(max-width: 768px)").matches ? 1.25 : 1.75;
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, maxDpr]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    >
      <Suspense fallback={null}>
        {/* Lighting — the signature crimson/pink rig */}
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight position={[3, 3, 3]} intensity={0.9} color="#ffffff" />
        <directionalLight position={[-3, -2, -3]} intensity={0.4} color="#ff4d8d" />
        <pointLight position={[0, 0, 4]} intensity={1.5} color="#ff1744" />
        <pointLight position={[-4, 3, 2]} intensity={0.8} color="#ff4d8d" />
        <pointLight position={[4, -3, 2]} intensity={0.8} color="#ff6b9d" />

        {/* Dim night-studio environment generated on the GPU — replaces the
            CDN-fetched HDR preset with zero network requests */}
        <Environment resolution={256} frames={1}>
          <Lightformer
            form="rect"
            intensity={0.5}
            position={[0, 5, -2]}
            scale={[10, 4, 1]}
            color="#b8c4e0"
          />
          <Lightformer
            form="rect"
            intensity={0.35}
            position={[-5, 0, 2]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[6, 3, 1]}
            color="#ff4d8d"
          />
          <Lightformer
            form="rect"
            intensity={0.3}
            position={[5, -1, 2]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[6, 3, 1]}
            color="#ff2d55"
          />
        </Environment>

        <MouseCamera />

        <FloatingObjects />

        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.55}
            luminanceSmoothing={0.4}
            intensity={1.4}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.15} darkness={0.6} />
        </EffectComposer>

        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
}
