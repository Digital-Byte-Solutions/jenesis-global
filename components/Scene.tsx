"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import FloatingObjects from "./FloatingObjects";

/* Mouse-reactive camera (subtle, doesn't break framing) */
function MouseCamera() {
  const { camera, mouse } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 7));

  useFrame(() => {
    target.current.x = mouse.x * 0.4;
    target.current.y = mouse.y * 0.3;
    camera.position.x += (target.current.x - camera.position.x) * 0.04;
    camera.position.y += (target.current.y - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 2]}
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
        {/* Lighting */}
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight
          position={[3, 3, 3]}
          intensity={0.9}
          color="#ffffff"
        />
        <directionalLight
          position={[-3, -2, -3]}
          intensity={0.4}
          color="#ff4d8d"
        />
        <pointLight position={[0, 0, 4]} intensity={1.5} color="#ff1744" />
        <pointLight position={[-4, 3, 2]} intensity={0.8} color="#ff4d8d" />
        <pointLight position={[4, -3, 2]} intensity={0.8} color="#ff6b9d" />

        <Environment preset="night" background={false} />

        <MouseCamera />

        <FloatingObjects />

        <EffectComposer multisampling={0} disableNormalPass>
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
