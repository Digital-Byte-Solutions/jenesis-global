"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying vec2 vUv;
varying vec3 vPosition;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  
  // Slow panning noise
  float noise1 = snoise(uv * 1.5 + uTime * 0.05);
  float noise2 = snoise(uv * 2.5 - uTime * 0.03);
  
  // Create a fluid, organic mix factor
  float mixFactor = (noise1 + noise2) * 0.5 + 0.5; // range 0 to 1
  
  // Multi-step interpolation for a premium look
  vec3 color = mix(uColor1, uColor2, smoothstep(0.0, 0.6, mixFactor));
  color = mix(color, uColor3, smoothstep(0.5, 1.0, mixFactor));
  
  // Slight radial vignette for depth
  float dist = distance(uv, vec2(0.5));
  color *= smoothstep(0.8, 0.2, dist);

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function LiquidBackground({ themeMode = "dark" }: { themeMode?: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Define target colors based on theme
  const targetColors = useMemo(() => {
    if (themeMode === "light") {
      return {
        c1: new THREE.Color("#f5f3ef"), // Warm off-white
        c2: new THREE.Color("#e6e1d6"), // Slightly darker cream
        c3: new THREE.Color("#d4a417").multiplyScalar(0.2), // Very subtle gold tint
      };
    }
    // Dark mode default
    return {
      c1: new THREE.Color("#0a0a0c"), // Very dark slate base
      c2: new THREE.Color("#111827"), // Deep blue/navy
      c3: new THREE.Color("#d4a417").multiplyScalar(0.15), // Subtle gold glow
    };
  }, [themeMode]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      // Initialize with dark mode colors so it doesn't flash white on load if default is dark
      uColor1: { value: new THREE.Color("#0a0a0c") },
      uColor2: { value: new THREE.Color("#111827") },
      uColor3: { value: new THREE.Color("#d4a417").multiplyScalar(0.15) },
    }),
    [] // NEVER RECREATE
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate current uniforms towards target colors
      materialRef.current.uniforms.uColor1.value.lerp(targetColors.c1, 0.05);
      materialRef.current.uniforms.uColor2.value.lerp(targetColors.c2, 0.05);
      materialRef.current.uniforms.uColor3.value.lerp(targetColors.c3, 0.05);
    }
  });

  return (
    <mesh position={[0, 0, -40]}>
      {/* Plane large enough to cover the screen regardless of aspect ratio */}
      <planeGeometry args={[150, 150]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}
