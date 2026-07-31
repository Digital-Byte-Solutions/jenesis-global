"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { audioEngine } from "@/lib/AudioEngine";

interface GlobeCoreProps {
  scrollProgress: number;
  themeMode?: "dark" | "light";
}

/* ─────────────────────────────────────────────────────────────────
   GLSL — Data Globe Vertex Shader
   ───────────────────────────────────────────────────────────────── */
const globeVert = `
  varying vec3 vNormal; varying vec3 vWorldPos; varying vec2 vUv; varying float vElev;
  uniform float uTime;
  float h(float n){return fract(sin(n)*43758.5453);}
  float sn(vec3 p){
    vec3 i=floor(p);vec3 f=fract(p);f=f*f*(3.0-2.0*f);
    float n=i.x+i.y*57.0+113.0*i.z;
    return mix(
      mix(mix(h(n),h(n+1.),f.x),mix(h(n+57.),h(n+58.),f.x),f.y),
      mix(mix(h(n+113.),h(n+114.),f.x),mix(h(n+170.),h(n+171.),f.x),f.y),f.z);
  }
  void main(){
    vUv=uv; vNormal=normalize(normalMatrix*normal);
    float n=sn(position*2.5+uTime*0.06)*0.55+sn(position*6.0+uTime*0.12)*0.30+sn(position*14.0+uTime*0.20)*0.15;
    float e=n*0.035; vElev=e;
    vec3 d=position+normal*e;
    vec4 wp=modelMatrix*vec4(d,1.0); vWorldPos=wp.xyz;
    gl_Position=projectionMatrix*viewMatrix*wp;
  }
`;

/* ─────────────────────────────────────────────────────────────────
   GLSL — Data Globe Fragment Shader
   Deep navy sphere with gold grid that makes the J visible through it
   ───────────────────────────────────────────────────────────────── */
const globeFrag = `
  varying vec3 vNormal; varying vec3 vWorldPos; varying vec2 vUv; varying float vElev;
  uniform float uTime; uniform vec3 uDeep; uniform vec3 uGold; uniform vec3 uCrimson; uniform float uOpacity;
  void main(){
    vec3 V=normalize(cameraPosition-vWorldPos);
    float NdotV=clamp(dot(vNormal,V),0.0,1.0);
    float rim1=pow(1.0-NdotV,2.2);
    float rim2=pow(1.0-NdotV,5.5);

    // Gold lat/lon grid (fine + major axes)
    float latF=abs(sin(vUv.y*3.14159*18.0));
    float lonF=abs(sin(vUv.x*3.14159*36.0));
    float gF=smoothstep(0.960,1.0,max(latF,lonF));
    float latM=abs(sin(vUv.y*3.14159*6.0));
    float lonM=abs(sin(vUv.x*3.14159*12.0));
    float gM=smoothstep(0.940,1.0,max(latM,lonM));

    // Equator gold line
    float eq=1.0-abs(vUv.y-0.5)*55.0; eq=clamp(eq,0.0,1.0);

    // Data scan sweep
    float scan=sin(vUv.y*65.0-uTime*1.5)*0.5+0.5;
    scan=pow(scan,20.0)*0.28;

    // Longitude sweep (radar)
    float lSweep=fract(vUv.x-uTime*0.035);
    float sweep=pow(max(lSweep-0.88,0.0)/0.12,2.0)*0.20;

    vec3 col=uDeep;
    col=mix(col,uGold,gF*0.60); col=mix(col,uGold,gM*0.80);
    col=mix(col,uGold,eq*0.45);
    col=mix(col,uGold,rim1*0.30); col=mix(col,uGold*1.5,rim2*0.40);
    col+=uCrimson*scan; col+=uGold*sweep;
    col+=uGold*max(vElev*9.0,0.0)*0.12;

    // KEY: Globe is semi-transparent so J shows through!
    float alpha=(0.28+rim1*0.55)*uOpacity;
    gl_FragColor=vec4(col,alpha);
  }
`;

/* ─────────────────────────────────────────────────────────────────
   Atmosphere shaders
   ───────────────────────────────────────────────────────────────── */
const atmosVert = `varying vec3 vN;varying vec3 vW;void main(){vN=normalize(normalMatrix*normal);vec4 w=modelMatrix*vec4(position,1.0);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}`;
const atmosFrag = `varying vec3 vN;varying vec3 vW;uniform vec3 uC;uniform float uT;void main(){vec3 v=normalize(cameraPosition-vW);float r=pow(1.0-clamp(dot(vN,v),0.0,1.0),1.2);float p=0.82+sin(uT*0.7)*0.18;gl_FragColor=vec4(uC,r*0.52*p);}`;

/* ─────────────────────────────────────────────────────────────────
   Fibonacci surface dot cloud
   ───────────────────────────────────────────────────────────────── */
function fibSphere(n: number, r: number): Float32Array {
  const pos = new Float32Array(n * 3);
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const t = phi * i;
    pos[i*3]=Math.cos(t)*rad*r; pos[i*3+1]=y*r; pos[i*3+2]=Math.sin(t)*rad*r;
  }
  return pos;
}

/* ─────────────────────────────────────────────────────────────────
   J LETTERFORM — Core brand mark
   The letter J traced as glowing tube geometry, visible inside the globe
   ───────────────────────────────────────────────────────────────── */
function makeJCurve(): THREE.CatmullRomCurve3 {
  // J points: top-bar left → right → stem down → hook left
  return new THREE.CatmullRomCurve3([
    // Top horizontal bar (like in the logo)
    new THREE.Vector3(-0.42, 0.58, 0),
    new THREE.Vector3(-0.18, 0.60, 0),
    new THREE.Vector3( 0.10, 0.60, 0),
    new THREE.Vector3( 0.42, 0.60, 0),
    // Vertical stem
    new THREE.Vector3( 0.42, 0.28, 0),
    new THREE.Vector3( 0.42,-0.02, 0),
    new THREE.Vector3( 0.42,-0.32, 0),
    new THREE.Vector3( 0.42,-0.48, 0),
    // Hook curve (logo's J hook)
    new THREE.Vector3( 0.30,-0.65, 0),
    new THREE.Vector3( 0.10,-0.76, 0),
    new THREE.Vector3(-0.06,-0.74, 0),
    new THREE.Vector3(-0.20,-0.60, 0),
    new THREE.Vector3(-0.24,-0.44, 0),
  ], false, "catmullrom", 0.5);
}

function JLetterform({
  color,
  glowColor,
  scrollProgress,
}: {
  color: string;
  glowColor: string;
  scrollProgress: number;
}) {
  const groupRef   = useRef<THREE.Group>(null);
  const innerGlow  = useRef<THREE.Mesh>(null);
  const outerGlow  = useRef<THREE.Mesh>(null);

  const jCurve   = useMemo(() => makeJCurve(), []);
  const tubeGeo  = useMemo(() => new THREE.TubeGeometry(jCurve, 120, 0.028, 10, false), [jCurve]);
  const glowGeo  = useMemo(() => new THREE.TubeGeometry(jCurve, 80,  0.055, 8,  false), [jCurve]);

  // Crimson sweep arc (bottom-right of J — matches the logo)
  const sweepCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3( 0.40, -0.44, 0),
    new THREE.Vector3( 0.55, -0.58, 0),
    new THREE.Vector3( 0.58, -0.46, 0),
    new THREE.Vector3( 0.52, -0.28, 0),
  ], false, "catmullrom", 0.5), []);
  const sweepGeo = useMemo(() => new THREE.TubeGeometry(sweepCurve, 40, 0.016, 8, false), [sweepCurve]);

  // Scroll-driven autonomous J rotation story
  useFrame((state) => {
    if (!groupRef.current) return;
    const t  = state.clock.elapsedTime;
    const sp = scrollProgress;

    let targetRX = 0, targetRY = 0, targetRZ = 0, targetS = 1.0;

    if (sp < 0.11) {
      // HERO: J faces forward — full brand reveal, gentle Y sway
      targetRX = 0;
      targetRY = Math.sin(t * 0.2) * 0.08;
      targetRZ = 0;
      targetS  = 1.0;
    } else if (sp < 0.22) {
      // APPROACH: Tilt forward — J leans toward viewer
      targetRX = -0.38;
      targetRY = 0.18;
      targetRZ = 0;
      targetS  = 1.08;
    } else if (sp < 0.33) {
      // SERVICES: Spin to show side profile
      targetRX = 0.12;
      targetRY = Math.PI * 0.35;
      targetRZ = 0;
      targetS  = 0.92;
    } else if (sp < 0.44) {
      // PROOF: Front-on, red dot highlighted — authority
      targetRX = 0.22;
      targetRY = 0;
      targetRZ = 0.10;
      targetS  = 1.12;
    } else if (sp < 0.55) {
      // PROCESS: J tilts on Z — side banner mode
      targetRX = 0;
      targetRY = 0.08;
      targetRZ = -Math.PI * 0.25;
      targetS  = 0.75;
    } else if (sp < 0.66) {
      // STATS: Breathing pulse — prominence
      const pulse = 1 + Math.sin(t * 2.5) * 0.06;
      targetRX = 0; targetRY = 0; targetRZ = 0;
      targetS  = pulse * 1.05;
    } else if (sp < 0.77) {
      // TESTIMONIALS: Dramatic Z tilt — cinematic lean
      targetRX = -0.25;
      targetRY = -0.35;
      targetRZ = Math.PI * 0.18;
      targetS  = 1.18;
    } else if (sp < 0.88) {
      // FAQ: Recede + slow fade rotation
      targetRX = 0.45;
      targetRY = Math.PI * 0.6;
      targetRZ = 0;
      targetS  = 0.65;
    } else {
      // CTA: Full reveal — facing camera, maximum presence
      targetRX = 0;
      targetRY = 0;
      targetRZ = 0;
      targetS  = 1.25;
    }

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRX, 0.032);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRY, 0.032);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRZ, 0.032);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetS, 0.03));

    // Glow pulse
    const gIntensity = 0.12 + Math.sin(t * 1.8) * 0.06;
    if (innerGlow.current) {
      (innerGlow.current.material as THREE.MeshBasicMaterial).opacity = gIntensity;
    }
    if (outerGlow.current) {
      (outerGlow.current.material as THREE.MeshBasicMaterial).opacity = gIntensity * 0.45;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer soft glow (large radius) */}
      <mesh geometry={glowGeo} ref={outerGlow}>
        <meshBasicMaterial color={glowColor} transparent opacity={0.08} depthWrite={false} toneMapped={false} />
      </mesh>

      {/* Inner glow halo */}
      <mesh geometry={tubeGeo} ref={innerGlow}>
        <meshBasicMaterial color={color} transparent opacity={0.18} depthWrite={false} toneMapped={false} />
      </mesh>

      {/* Core J tube — bright, sharp */}
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial color={color} transparent opacity={0.96} toneMapped={false} />
      </mesh>

      {/* Crimson sweep arc — bottom-right of J (matches logo exactly) */}
      <mesh geometry={sweepGeo}>
        <meshBasicMaterial color="#c40030" transparent opacity={0.88} toneMapped={false} />
      </mesh>
      {/* Sweep glow */}
      <mesh>
        <primitive object={new THREE.TubeGeometry(sweepCurve, 30, 0.030, 6, false)} />
        <meshBasicMaterial color="#c40030" transparent opacity={0.15} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────
   RED DOT — The logo's signature element (dot of the j)
   Large, pulsing crimson sphere above the J's top bar
   ───────────────────────────────────────────────────────────────── */
function RedDot({ scrollProgress }: { scrollProgress: number }) {
  const dotRef   = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const position = useMemo(() => new THREE.Vector3(0.42, 0.88, 0), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t  = state.clock.elapsedTime;
    const sp = scrollProgress;

    // Autonomous position that mirrors the J group's scroll story
    let targetX = 0.42, targetY = 0.88, targetRY = 0, targetRX = 0, targetRZ = 0;

    if (sp < 0.11) { targetRX=0; targetRY=Math.sin(t*0.2)*0.08; targetRZ=0; }
    else if (sp < 0.22) { targetRX=-0.38; targetRY=0.18; targetRZ=0; }
    else if (sp < 0.33) { targetRX=0.12; targetRY=Math.PI*0.35; targetRZ=0; }
    else if (sp < 0.44) { targetRX=0.22; targetRY=0; targetRZ=0.10; }
    else if (sp < 0.55) { targetRX=0; targetRY=0.08; targetRZ=-Math.PI*0.25; }
    else if (sp < 0.66) { targetRX=0; targetRY=0; targetRZ=0; }
    else if (sp < 0.77) { targetRX=-0.25; targetRY=-0.35; targetRZ=Math.PI*0.18; }
    else if (sp < 0.88) { targetRX=0.45; targetRY=Math.PI*0.6; targetRZ=0; }
    else                { targetRX=0; targetRY=0; targetRZ=0; }

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRX, 0.032);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRY, 0.032);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRZ, 0.032);

    // Dot pulse
    if (dotRef.current) {
      const s = 1 + Math.sin(t * 2.8) * 0.22;
      dotRef.current.scale.setScalar(s);
    }

    // Ring 1 expand
    const t1 = (t * 0.7) % 1;
    if (ring1Ref.current) {
      ring1Ref.current.scale.setScalar(1 + t1 * 3.5);
      (ring1Ref.current.material as THREE.MeshBasicMaterial).opacity = (1 - t1) * 0.55;
    }
    // Ring 2 expand (offset)
    const t2 = ((t * 0.7) + 0.5) % 1;
    if (ring2Ref.current) {
      ring2Ref.current.scale.setScalar(1 + t2 * 3.5);
      (ring2Ref.current.material as THREE.MeshBasicMaterial).opacity = (1 - t2) * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Soft outer glow */}
      <mesh position={position} scale={2.5}>
        <sphereGeometry args={[0.065, 10, 10]} />
        <meshBasicMaterial color="#c40030" transparent opacity={0.10} depthWrite={false} toneMapped={false} />
      </mesh>

      {/* Core red dot */}
      <mesh position={position} ref={dotRef}>
        <sphereGeometry args={[0.065, 14, 14]} />
        <meshBasicMaterial color="#c40030" transparent opacity={1.0} toneMapped={false} />
      </mesh>

      {/* Pulsing rings */}
      <mesh position={position} ref={ring1Ref} rotation={[Math.PI/2, 0, 0]}>
        <ringGeometry args={[0.060, 0.075, 32]} />
        <meshBasicMaterial color="#c40030" transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh position={position} ref={ring2Ref} rotation={[Math.PI/2, 0, 0]}>
        <ringGeometry args={[0.060, 0.072, 32]} />
        <meshBasicMaterial color="#c40030" transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────
   GOLD ORBITAL ARC — The logo's signature large arc sweeping around J
   Like the armillary sphere concept but logo-authentic
   ───────────────────────────────────────────────────────────────── */
function LogoOrbitalArc({
  radius,
  tilt,
  color,
  opacity,
  thickness = 0.012,
  pulseSpeed = 0.06,
  scrollProgress,
}: {
  radius: number;
  tilt: THREE.Euler;
  color: string;
  opacity: number;
  thickness?: number;
  pulseSpeed?: number;
  scrollProgress?: number;
}) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const tRef     = useRef(Math.random());

  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return new THREE.CatmullRomCurve3(pts, true);
  }, [radius]);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 160, thickness, 8, true), [curve, thickness]);
  const sphGeo  = useMemo(() => new THREE.SphereGeometry(thickness * 5.5, 10, 10), [thickness]);
  const trailGeo = useMemo(() => new THREE.SphereGeometry(thickness * 3, 8, 8), [thickness]);

  useFrame((_, dt) => {
    tRef.current = (tRef.current + dt * pulseSpeed) % 1;
    const pt = curve.getPoint(tRef.current);
    if (pulseRef.current) pulseRef.current.position.copy(pt);
    const ptT = curve.getPoint((tRef.current + 0.95) % 1);
    if (trailRef.current) trailRef.current.position.copy(ptT);

    // Scroll-driven arc tilt animation
    if (groupRef.current && scrollProgress !== undefined) {
      const sp = scrollProgress;
      let extraTilt = 0;
      if      (sp < 0.11) extraTilt = 0;
      else if (sp < 0.22) extraTilt = 0.25;
      else if (sp < 0.44) extraTilt = -0.15;
      else if (sp < 0.66) extraTilt = 0.35;
      else                extraTilt = -0.20;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, tilt.x + extraTilt, 0.025);
    }
  });

  return (
    <group ref={groupRef} rotation={tilt}>
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial color={color} transparent opacity={opacity} toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh ref={pulseRef} geometry={sphGeo}>
        <meshBasicMaterial color={color} transparent opacity={Math.min(1, opacity * 2.2)} toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh ref={trailRef} geometry={trailGeo}>
        <meshBasicMaterial color={color} transparent opacity={opacity * 1.3} toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────
   LOGO CONSTELLATION — Triangle of nodes (inside the globe, near the J)
   Logo-faithful: 3 gold nodes connected, positioned near the J
   ───────────────────────────────────────────────────────────────── */
function LogoConstellation({
  goldColor,
  visible,
  scrollProgress,
}: {
  goldColor: string;
  visible: boolean;
  scrollProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Logo-accurate triangle positions (matching the logo's inner network)
  const nodes = useMemo(() => [
    new THREE.Vector3(-0.22, 0.18, 0.12),   // left node
    new THREE.Vector3( 0.22, 0.18, 0.08),   // right node
    new THREE.Vector3( 0.02,-0.08, 0.18),   // bottom node
  ], []);

  const linePositions = useMemo(() => {
    const arr = new Float32Array(6 * 3);
    const pairs: [number,number][] = [[0,1],[1,2],[2,0]];
    pairs.forEach(([a,b],i) => {
      arr[i*6]=nodes[a].x; arr[i*6+1]=nodes[a].y; arr[i*6+2]=nodes[a].z;
      arr[i*6+3]=nodes[b].x; arr[i*6+4]=nodes[b].y; arr[i*6+5]=nodes[b].z;
    });
    return arr;
  }, [nodes]);

  const nodeGeo = useMemo(() => new THREE.SphereGeometry(0.032, 10, 10), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t  = state.clock.elapsedTime;
    const sp = scrollProgress;

    // Match J letterform's scroll story (same rotation targets)
    let tRX=0, tRY=0, tRZ=0;
    if      (sp < 0.11) { tRX=0; tRY=Math.sin(t*0.2)*0.08; tRZ=0; }
    else if (sp < 0.22) { tRX=-0.38; tRY=0.18; tRZ=0; }
    else if (sp < 0.33) { tRX=0.12; tRY=Math.PI*0.35; tRZ=0; }
    else if (sp < 0.44) { tRX=0.22; tRY=0; tRZ=0.10; }
    else if (sp < 0.55) { tRX=0; tRY=0.08; tRZ=-Math.PI*0.25; }
    else if (sp < 0.66) { tRX=0; tRY=0; tRZ=0; }
    else if (sp < 0.77) { tRX=-0.25; tRY=-0.35; tRZ=Math.PI*0.18; }
    else if (sp < 0.88) { tRX=0.45; tRY=Math.PI*0.6; tRZ=0; }
    else                { tRX=0; tRY=0; tRZ=0; }

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, tRX, 0.032);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, tRY, 0.032);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, tRZ, 0.032);

    nodeRefs.current.forEach((n, i) => {
      if (!n) return;
      const s = 1 + Math.sin(t * 2.0 + i * 1.4) * 0.3;
      n.scale.setScalar(s);
    });
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={goldColor} transparent opacity={0.65} toneMapped={false} />
      </lineSegments>
      {nodes.map((pos, i) => (
        <mesh key={i} geometry={nodeGeo} position={pos} ref={(el) => { nodeRefs.current[i] = el; }}>
          <meshBasicMaterial color={goldColor} transparent opacity={0.95} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Lat/lon → 3D position
   ───────────────────────────────────────────────────────────────── */
function latLon(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta), r*Math.cos(phi), r*Math.sin(phi)*Math.sin(theta));
}

/* ─────────────────────────────────────────────────────────────────
   Surface node pulsing beacon
   ───────────────────────────────────────────────────────────────── */
function SurfaceNode({ position, color, size=0.038, delay=0 }: { position:THREE.Vector3; color:string; size?:number; delay?:number }) {
  const r1=useRef<THREE.Mesh>(null);
  const r2=useRef<THREE.Mesh>(null);
  const d=useRef<THREE.Mesh>(null);
  const P=2.4;
  useFrame((s) => {
    const t1=((s.clock.elapsedTime+delay)%P)/P;
    const t2=((s.clock.elapsedTime+delay+P*0.5)%P)/P;
    if(r1.current){r1.current.scale.setScalar(1+t1*3.2);(r1.current.material as THREE.MeshBasicMaterial).opacity=(1-t1)*0.45;}
    if(r2.current){r2.current.scale.setScalar(1+t2*3.2);(r2.current.material as THREE.MeshBasicMaterial).opacity=(1-t2)*0.28;}
    if(d.current){const p=1+Math.sin(s.clock.elapsedTime*3+delay)*0.2;d.current.scale.setScalar(p);}
  });
  return (
    <group position={position}>
      <mesh ref={d}><sphereGeometry args={[size,10,10]}/><meshBasicMaterial color={color} transparent opacity={1} toneMapped={false}/></mesh>
      <mesh scale={2}><sphereGeometry args={[size,8,8]}/><meshBasicMaterial color={color} transparent opacity={0.18} toneMapped={false} depthWrite={false}/></mesh>
      <mesh ref={r1} rotation={[Math.PI/2,0,0]}><ringGeometry args={[size*1.4,size*1.7,28]}/><meshBasicMaterial color={color} transparent opacity={0} side={THREE.DoubleSide} toneMapped={false} depthWrite={false}/></mesh>
      <mesh ref={r2} rotation={[Math.PI/2,0,0]}><ringGeometry args={[size*1.4,size*1.6,28]}/><meshBasicMaterial color={color} transparent opacity={0} side={THREE.DoubleSide} toneMapped={false} depthWrite={false}/></mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Great-circle connection arc
   ───────────────────────────────────────────────────────────────── */
function GreatArc({ from, to, color, elev=0.5, speed=0.07, opacity=0.55, delay=0 }: {
  from:THREE.Vector3; to:THREE.Vector3; color:string; elev?:number; speed?:number; opacity?:number; delay?:number;
}) {
  const pRef=useRef<THREE.Mesh>(null);
  const tRef=useRef(delay%1);
  const {curve, tubeGeo, sGeo}=useMemo(()=>{
    const mid=from.clone().add(to).normalize().multiplyScalar(from.length()+elev);
    const pts=[];
    for(let i=0;i<=60;i++){
      const a=i/60;
      const v=new THREE.Vector3().copy(from).multiplyScalar((1-a)*(1-a)).addScaledVector(mid,2*a*(1-a)).addScaledVector(to,a*a);
      pts.push(v);
    }
    const c=new THREE.CatmullRomCurve3(pts);
    return {curve:c,tubeGeo:new THREE.TubeGeometry(c,80,0.004,6,false),sGeo:new THREE.SphereGeometry(0.032,8,8)};
  },[from,to,elev]);
  useFrame((_,dt)=>{
    tRef.current=(tRef.current+dt*speed)%1;
    if(pRef.current)pRef.current.position.copy(curve.getPoint(tRef.current));
  });
  return (
    <group>
      <mesh geometry={tubeGeo}><meshBasicMaterial color={color} transparent opacity={opacity} toneMapped={false} depthWrite={false}/></mesh>
      <mesh ref={pRef} geometry={sGeo}><meshBasicMaterial color={color} transparent opacity={Math.min(1,opacity*2.2)} toneMapped={false} depthWrite={false}/></mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN GLOBE — Logo J Inside The World
   ═══════════════════════════════════════════════════════════════════ */
export default function JenesisGlobeCore({ scrollProgress, themeMode = "light" }: GlobeCoreProps) {
  const groupRef     = useRef<THREE.Group>(null);
  const shaderRef    = useRef<THREE.ShaderMaterial>(null);
  const atmosShader  = useRef<THREE.ShaderMaterial>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const goldLightRef = useRef<THREE.PointLight>(null);
  const mouseXY      = useRef({ x: 0, y: 0 });
  const scaleRef     = useRef(1);
  const [isHovered, setIsHovered] = useState(false);

  const isDark = themeMode === "dark";

  /* ── Brand palette ─── */
  const GOLD    = "#c8960c";
  const CRIMSON = "#c40030";
  const NAVY    = "#1a2744";

  /* ── Globe uniforms — KEY: uOpacity is lower so J shows through ─── */
  const globeUniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uDeep:    { value: new THREE.Color(isDark ? "#010810" : "#020812") },
    uGold:    { value: new THREE.Color(GOLD) },
    uCrimson: { value: new THREE.Color("#5a0012") },
    uOpacity: { value: isDark ? 0.85 : 0.78 },
  }), [isDark]);

  const atmosUniforms = useMemo(() => ({
    uC: { value: new THREE.Color(GOLD) },
    uT: { value: 0 },
  }), []);

  /* ── Surface dots ─── */
  const dotPositions = useMemo(() => fibSphere(900, 1.516), []);

  /* ── Global city positions ─── */
  const R = 1.52;
  const cities = useMemo(() => ({
    london:    latLon( 51.5,  -0.1, R),
    newYork:   latLon( 40.7, -74.0, R),
    dubai:     latLon( 25.2,  55.3, R),
    singapore: latLon(  1.3, 103.8, R),
    sydney:    latLon(-33.9, 151.2, R),
    tokyo:     latLon( 35.7, 139.7, R),
    saoPaulo:  latLon(-23.5, -46.6, R),
    zurich:    latLon( 47.4,   8.5, R),
  }), []);

  /* ── Pointer ─── */
  const onEnter = useCallback(() => { setIsHovered(true); document.body.style.cursor = "crosshair"; audioEngine.playHoverSound(); }, []);
  const onLeave = useCallback(() => { setIsHovered(false); document.body.style.cursor = "default"; }, []);
  const onClick = useCallback(() => { audioEngine.playClickSound(); }, []);

  /* ── Main frame loop ─── */
  useFrame((state) => {
    const t  = state.clock.elapsedTime;
    const sp = scrollProgress;
    const { mouse } = state;

    mouseXY.current.x = THREE.MathUtils.lerp(mouseXY.current.x, -mouse.y * 0.22, 0.04);
    mouseXY.current.y = THREE.MathUtils.lerp(mouseXY.current.y, mouse.x * 0.28, 0.04);

    if (shaderRef.current) shaderRef.current.uniforms.uTime.value = t;
    if (atmosShader.current) atmosShader.current.uniforms.uT.value = t;

    if (coreLightRef.current) coreLightRef.current.intensity = (isHovered ? 5.5 : 3.2) + Math.sin(t * 2.1) * 0.9;
    if (goldLightRef.current) goldLightRef.current.intensity  = 1.8 + Math.sin(t * 1.5 + 1) * 0.5;

    if (!groupRef.current) return;

    /* Scroll-driven outer globe movement (slower, more majestic than J inner) */
    let targetRX = 0, targetS = 1.0, rotSpeed = 0.055;
    if      (sp < 0.11) { targetRX=mouseXY.current.x; targetS=1.0;  rotSpeed=0.048; }
    else if (sp < 0.22) { targetRX=0.32;  targetS=1.12; rotSpeed=0.10; }
    else if (sp < 0.33) { targetRX=-0.18; targetS=0.90; rotSpeed=0.044; }
    else if (sp < 0.44) { targetRX=0.10;  targetS=1.08; rotSpeed=0.22; }
    else if (sp < 0.55) { targetRX=0.48;  targetS=0.68; rotSpeed=0.10; }
    else if (sp < 0.66) { const p=1+Math.sin(t*2.5)*0.03; targetRX=0; targetS=p; rotSpeed=0.07; }
    else if (sp < 0.77) { targetRX=-0.32; targetS=1.30; rotSpeed=0.034; }
    else if (sp < 0.88) { targetRX=0.16;  targetS=0.72; rotSpeed=0.14; }
    else                { targetRX=-0.45; targetS=1.20; rotSpeed=0.28; }

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRX, 0.024);
    groupRef.current.rotation.y += rotSpeed * 0.016;
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetS, 0.028);
    groupRef.current.scale.setScalar(scaleRef.current);
  });

  const orbitsVisible = scrollProgress > 0.025;

  return (
    <group ref={groupRef} position={[0, 0.05, 0]}>

      {/* ── LAYERS (inside → outside) ─────────────────────────────── */}

      {/* ── 1. J LETTERFORM — the brand mark at the heart of the globe ─── */}
      <JLetterform
        color={NAVY}
        glowColor={GOLD}
        scrollProgress={scrollProgress}
      />

      {/* ── 2. RED DOT — the logo's dot above the J ─── */}
      <RedDot scrollProgress={scrollProgress} />

      {/* ── 3. LOGO CONSTELLATION — triangle nodes near the J ─── */}
      <LogoConstellation
        goldColor={GOLD}
        visible={orbitsVisible}
        scrollProgress={scrollProgress}
      />

      {/* ── 4. Globe inner core (darkened, so J is visible) ─── */}
      <mesh>
        <sphereGeometry args={[1.44, 64, 64]} />
        <meshStandardMaterial
          color={isDark ? "#010508" : "#020810"}
          roughness={1} metalness={0}
          transparent opacity={0.70}
          depthWrite={false}
        />
      </mesh>

      {/* ── 5. Main data globe shell — SEMI-TRANSPARENT GLSL ─── */}
      <mesh onPointerEnter={onEnter} onPointerLeave={onLeave} onClick={onClick}>
        <sphereGeometry args={[1.5, 96, 96]} />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={globeVert}
          fragmentShader={globeFrag}
          uniforms={globeUniforms}
          transparent depthWrite={false}
        />
      </mesh>

      {/* ── 6. Surface dot cloud ─── */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.008} color={GOLD} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* ── 7. Lights ─── */}
      <pointLight ref={coreLightRef} color={CRIMSON} intensity={3.2} distance={8} />
      <pointLight ref={goldLightRef} color={GOLD} intensity={1.8} distance={10} position={[1.5, 1.5, 0]} />

      {/* ── 8. LOGO PRIMARY GOLD ARC — the big sweep arc from the logo ─── */}
      <LogoOrbitalArc
        radius={2.08}
        tilt={new THREE.Euler(Math.PI/6, 0, Math.PI/4.5)}
        color={GOLD}
        opacity={0.88}
        thickness={0.015}
        pulseSpeed={0.052}
        scrollProgress={scrollProgress}
      />

      {/* Secondary gold arc */}
      <LogoOrbitalArc
        radius={2.42}
        tilt={new THREE.Euler(Math.PI/2.8, Math.PI/5, 0)}
        color={GOLD}
        opacity={0.42}
        thickness={0.007}
        pulseSpeed={0.038}
        scrollProgress={scrollProgress}
      />

      {/* Navy accent arc */}
      <LogoOrbitalArc
        radius={2.68}
        tilt={new THREE.Euler(Math.PI/2, Math.PI/3.5, Math.PI/6)}
        color={NAVY}
        opacity={0.50}
        thickness={0.006}
        pulseSpeed={0.024}
      />

      {/* Crimson inner arc */}
      <LogoOrbitalArc
        radius={1.86}
        tilt={new THREE.Euler(-Math.PI/8, 0, Math.PI/3)}
        color={CRIMSON}
        opacity={0.62}
        thickness={0.009}
        pulseSpeed={0.088}
        scrollProgress={scrollProgress}
      />

      {/* ── 9. Outer atmosphere ─── */}
      <mesh scale={1.26} renderOrder={10}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <shaderMaterial
          vertexShader={atmosVert}
          fragmentShader={atmosFrag}
          uniforms={atmosUniforms}
          ref={atmosShader}
          transparent depthWrite={false} side={THREE.BackSide}
        />
      </mesh>

      {/* ── 10. GLOBAL CITY NODES ─── */}
      {orbitsVisible && Object.entries(cities).map(([name, pos], i) => (
        <SurfaceNode
          key={name}
          position={pos}
          color={name === "dubai" || name === "london" ? CRIMSON : GOLD}
          size={name === "dubai" ? 0.052 : 0.036}
          delay={i * 0.4}
        />
      ))}

      {/* ── 11. GREAT-CIRCLE CONNECTION ARCS ─── */}
      {orbitsVisible && (
        <>
          <GreatArc from={cities.london}    to={cities.newYork}   color={GOLD}    elev={0.55} speed={0.068} opacity={0.58} delay={0.0} />
          <GreatArc from={cities.london}    to={cities.dubai}     color={GOLD}    elev={0.50} speed={0.054} opacity={0.52} delay={0.2} />
          <GreatArc from={cities.dubai}     to={cities.singapore} color={GOLD}    elev={0.52} speed={0.062} opacity={0.55} delay={0.4} />
          <GreatArc from={cities.singapore} to={cities.tokyo}     color={GOLD}    elev={0.40} speed={0.078} opacity={0.48} delay={0.6} />
          <GreatArc from={cities.newYork}   to={cities.saoPaulo}  color={CRIMSON} elev={0.46} speed={0.058} opacity={0.45} delay={0.1} />
          <GreatArc from={cities.london}    to={cities.zurich}    color={GOLD}    elev={0.28} speed={0.088} opacity={0.40} delay={0.3} />
          <GreatArc from={cities.sydney}    to={cities.singapore} color={GOLD}    elev={0.55} speed={0.048} opacity={0.42} delay={0.7} />
          <GreatArc from={cities.dubai}     to={cities.zurich}    color={CRIMSON} elev={0.36} speed={0.068} opacity={0.40} delay={0.5} />
        </>
      )}
    </group>
  );
}
