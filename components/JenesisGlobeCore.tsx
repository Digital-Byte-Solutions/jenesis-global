"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Html, Torus, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { audioEngine } from "@/lib/AudioEngine";

interface GlobeCoreProps {
  scrollProgress: number;
}

interface SurroundingObject {
  id: number;
  type: "octahedron" | "sphere" | "cube";
  initialPos: THREE.Vector3;
  explodedPos: THREE.Vector3;
  scale: number;
  color: string;
  wireframe?: boolean;
  label?: string;
}

/**
 * DeformableIcosahedron
 * Renders an icosahedron whose vertices dynamically bulge outwards near the mouse hit point,
 * and ripple in waves when clicked!
 */
function DeformableIcosahedron({
  radius,
  detail,
  isHovered,
  hoverHitLocal,
  clickTime,
  explosionFactor,
  children,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  onClick,
}: {
  radius: number;
  detail: number;
  isHovered: boolean;
  hoverHitLocal: THREE.Vector3;
  clickTime: number;
  explosionFactor: number;
  children: React.ReactNode;
  onPointerEnter: (e: any) => void;
  onPointerLeave: (e: any) => void;
  onPointerMove: (e: any) => void;
  onClick: (e: any) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Generate base geometry once
  const { geometry, basePositions } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(radius, detail);
    const posAttr = geo.attributes.position;
    const base = new Float32Array(posAttr.count * 3);
    for (let i = 0; i < posAttr.count * 3; i++) {
      base[i] = posAttr.array[i];
    }
    return { geometry: geo, basePositions: base };
  }, [radius, detail]);

  const hoverFactorRef = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position;

    // Smooth lerp hover factor
    const targetHover = isHovered ? 1.0 : 0.0;
    hoverFactorRef.current = THREE.MathUtils.lerp(hoverFactorRef.current, targetHover, 0.1);
    const hoverF = hoverFactorRef.current;

    // Click pulse wave calculations
    const timeSinceClick = t - clickTime;
    let clickBulgeWave = 0;
    if (timeSinceClick > 0 && timeSinceClick < 1.4) {
      // Expanding ripple wave on click
      const progress = timeSinceClick / 1.4;
      clickBulgeWave = Math.sin(progress * Math.PI * 3) * (1 - progress) * 0.45;
    }

    const tempV = new THREE.Vector3();
    const tempNorm = new THREE.Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];

      tempV.set(bx, by, bz);
      tempNorm.copy(tempV).normalize();

      // 1. Mouse hover local bulge: vertices closest to hoverHitLocal bulge outwards!
      let bulge = 0;
      if (hoverF > 0.01) {
        const distToHit = tempV.distanceTo(hoverHitLocal);
        const maxDist = radius * 1.3;
        if (distToHit < maxDist) {
          const falloff = Math.cos((distToHit / maxDist) * (Math.PI / 2));
          bulge = falloff * falloff * hoverF * 0.38;
        }
      }

      // 2. Automated click ripple swell
      const distFromCenter = tempV.length();
      const ripple = Math.sin(distFromCenter * 3 - t * 4) * clickBulgeWave;

      // 3. Scroll explosion factor
      const totalDisplacement = 1 + explosionFactor * 0.8 + bulge + ripple;

      posAttr.setXYZ(i, bx * totalDisplacement, by * totalDisplacement, bz * totalDisplacement);
    }

    posAttr.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      onClick={onClick}
    >
      {children}
    </mesh>
  );
}

export default function JenesisGlobeCore({ scrollProgress }: GlobeCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const burstRingRef = useRef<THREE.Mesh>(null);

  /* ── State & Refs ── */
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredObjId, setHoveredObjId] = useState<number | null>(null);
  const hoverHitLocalRef = useRef(new THREE.Vector3(0, 0, 1.5));
  const clickTimeRef = useRef(-999);
  const mouseInfluenceRef = useRef({ x: 0, y: 0 });

  const { clock } = useThree();

  /* ── Explosion factor: 0→1 over scroll range 0.15–0.55 ─────── */
  const explosionFactor = useMemo(() => {
    if (scrollProgress < 0.15) return 0;
    if (scrollProgress > 0.55) return 1;
    return (scrollProgress - 0.15) / 0.4;
  }, [scrollProgress]);

  /* ── Surrounding floating objects ────────────────────────────── */
  const surroundingObjects = useMemo<SurroundingObject[]>(
    () => [
      { id: 1, type: "octahedron", initialPos: new THREE.Vector3(-2.8, 2.2, -1.0), explodedPos: new THREE.Vector3(-5.5, 4.2, -2.0), scale: 0.5, color: "#ff4d8d", wireframe: true, label: "86" },
      { id: 2, type: "sphere",     initialPos: new THREE.Vector3(2.4, 1.8, 0.8),   explodedPos: new THREE.Vector3(4.8, 3.5, 1.5),   scale: 0.4, color: "#111115",   wireframe: false, label: "7.3" },
      { id: 3, type: "octahedron", initialPos: new THREE.Vector3(2.2, -2.0, -0.5), explodedPos: new THREE.Vector3(4.5, -4.0, -1.0), scale: 0.45, color: "#ff4d8d", wireframe: true, label: "62" },
      { id: 4, type: "cube",       initialPos: new THREE.Vector3(-2.5, -1.6, 0.5), explodedPos: new THREE.Vector3(-4.8, -3.2, 1.2), scale: 0.5, color: "#ff1744",   wireframe: false, label: "35" },
      { id: 5, type: "sphere",     initialPos: new THREE.Vector3(-2.2, 0.2, 1.8),  explodedPos: new THREE.Vector3(-4.2, 0.5, 3.5),  scale: 0.35, color: "#15151a",  wireframe: false, label: "54" },
      { id: 6, type: "octahedron", initialPos: new THREE.Vector3(1.8, 2.5, -1.8),  explodedPos: new THREE.Vector3(3.8, 4.8, -3.2),  scale: 0.3, color: "#ffffff",   wireframe: true, label: "91.2" },
    ],
    []
  );

  /* ── Pointer event handlers ── */
  const handlePointerEnter = () => {
    setIsHovered(true);
    document.body.style.cursor = "pointer";
    audioEngine.playHoverSound();
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    document.body.style.cursor = "default";
  };

  const handlePointerMove = (e: any) => {
    if (e.point && groupRef.current) {
      // Transform world hit point into globe local coordinates
      const localPoint = groupRef.current.worldToLocal(e.point.clone());
      hoverHitLocalRef.current.copy(localPoint);
    }
  };

  const handleClick = () => {
    clickTimeRef.current = clock.elapsedTime;
    audioEngine.playClickSound();
  };

  /* ── Animation loop ── */
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { mouse } = state;

    /* 1 — Mouse parallax: Smooth rotation tracking mouse position across screen */
    mouseInfluenceRef.current.x = THREE.MathUtils.lerp(mouseInfluenceRef.current.x, -mouse.y * 0.45, 0.05);
    mouseInfluenceRef.current.y = THREE.MathUtils.lerp(mouseInfluenceRef.current.y, mouse.x * 0.55, 0.05);

    if (groupRef.current) {
      groupRef.current.rotation.x = mouseInfluenceRef.current.x;
      groupRef.current.rotation.y = t * 0.08 + mouseInfluenceRef.current.y;
    }

    /* 2 — Inner glowing core */
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.3;
      innerRef.current.rotation.y = -t * 0.25;
      const hoverScale = isHovered ? 1.25 : 1;
      const timeSinceClick = t - clickTimeRef.current;
      const clickScale = timeSinceClick > 0 && timeSinceClick < 1.2 ? 1 + Math.sin((timeSinceClick / 1.2) * Math.PI) * 0.5 : 1;
      const pulse = (1 + Math.sin(t * 2) * 0.05) * (1 + explosionFactor * 1.2) * hoverScale * clickScale;
      innerRef.current.scale.setScalar(pulse);
    }

    /* 3 — Wireframe net layer */
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.2;
      wireRef.current.rotation.z = t * 0.15;
      wireRef.current.scale.setScalar(1 + explosionFactor * 1.5 + (isHovered ? 0.08 : 0));
    }

    /* 4 — Orbital rings */
    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.15;
      ringsRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
      ringsRef.current.rotation.y = t * 0.1;
      const timeSinceClick = t - clickTimeRef.current;
      const clickRingScale = timeSinceClick > 0 && timeSinceClick < 1.2 ? 1 + Math.sin((timeSinceClick / 1.2) * Math.PI) * 0.3 : 1;
      ringsRef.current.scale.setScalar((1 + explosionFactor * 1.1) * clickRingScale);
    }

    /* 5 — Dynamic light intensity */
    const timeSinceClick = t - clickTimeRef.current;
    const clickFlash = timeSinceClick > 0 && timeSinceClick < 0.8 ? (1 - timeSinceClick / 0.8) * 8 : 0;
    const hoverGlow = isHovered ? 3.5 : 0;

    if (coreLightRef.current) {
      coreLightRef.current.intensity = 3.0 + Math.sin(t * 3) * 1.0 + hoverGlow + clickFlash;
    }

    /* 6 — Automatic click burst ring */
    if (burstRingRef.current) {
      const mat = burstRingRef.current.material as THREE.MeshBasicMaterial;
      if (timeSinceClick > 0 && timeSinceClick < 1.2) {
        const s = 1 + timeSinceClick * 6;
        burstRingRef.current.scale.setScalar(s);
        mat.opacity = Math.max(0, 0.6 - timeSinceClick * 0.5);
        burstRingRef.current.visible = true;
      } else {
        burstRingRef.current.visible = false;
        mat.opacity = 0;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Expanding click ring */}
      <mesh ref={burstRingRef} visible={false}>
        <ringGeometry args={[1.3, 1.55, 64]} />
        <meshBasicMaterial color="#ff1744" transparent opacity={0} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      {/* 1. Deformable Outer Crimson Geodesic Glass Shell */}
      <DeformableIcosahedron
        radius={1.5}
        detail={2}
        isHovered={isHovered}
        hoverHitLocal={hoverHitLocalRef.current}
        clickTime={clickTimeRef.current}
        explosionFactor={explosionFactor}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
      >
        <MeshTransmissionMaterial
          thickness={0.6}
          roughness={isHovered ? 0.02 : 0.05}
          transmission={0.95}
          ior={1.5}
          chromaticAberration={isHovered ? 0.16 : 0.08}
          backside
          color="#ffffff"
          attenuationColor="#ff1744"
          attenuationDistance={isHovered ? 0.6 : 1}
        />
      </DeformableIcosahedron>

      {/* 2. Wireframe Geodesic Net Layer */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.65, 2]} />
        <meshBasicMaterial
          color={isHovered ? "#ff1744" : "#ff4d8d"}
          wireframe
          transparent
          opacity={(isHovered ? 0.85 : 0.6) - explosionFactor * 0.3}
        />
      </mesh>

      {/* 3. Inner Glowing Core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#ff1744"
          emissive="#ff1744"
          emissiveIntensity={isHovered ? 6 : 3}
          toneMapped={false}
        />
      </mesh>

      {/* Soft halo glow on hover */}
      <mesh scale={isHovered ? 1.1 : 0.9}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial color="#ff4d8d" transparent opacity={isHovered ? 0.15 : 0.04} wireframe={false} />
      </mesh>

      <pointLight ref={coreLightRef} color="#ff1744" intensity={4} distance={10} />

      {/* 4. Multi-Axis Orbital Rings */}
      <group ref={ringsRef}>
        <Torus args={[1.9, isHovered ? 0.022 : 0.015, 16, 100]}>
          <meshBasicMaterial color="#ff1744" transparent opacity={isHovered ? 1 : 0.8} toneMapped={false} />
        </Torus>
        <Torus args={[2.3, 0.012, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#ff4d8d" transparent opacity={isHovered ? 0.9 : 0.7} toneMapped={false} />
        </Torus>
        <Torus args={[2.7, 0.01, 16, 100]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#ff6b9d" transparent opacity={isHovered ? 0.75 : 0.6} toneMapped={false} />
        </Torus>
        <Torus args={[3.1, 0.008, 16, 100]} rotation={[Math.PI / 5, Math.PI / 3, 0]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={isHovered ? 0.65 : 0.5} toneMapped={false} />
        </Torus>
      </group>

      {/* 5. Surrounding Floating Objects with hover bulge & click swell */}
      {surroundingObjects.map((obj) => {
        const isObjHovered = hoveredObjId === obj.id;
        const currentPos = new THREE.Vector3().lerpVectors(obj.initialPos, obj.explodedPos, explosionFactor);
        const objScale = obj.scale * (isObjHovered ? 1.4 : 1.0);

        return (
          <group
            key={obj.id}
            position={currentPos}
            onPointerEnter={(e) => {
              e.stopPropagation();
              setHoveredObjId(obj.id);
              document.body.style.cursor = "pointer";
              audioEngine.playHoverSound();
            }}
            onPointerLeave={(e) => {
              e.stopPropagation();
              setHoveredObjId(null);
              document.body.style.cursor = "default";
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            {obj.type === "octahedron" && (
              <mesh scale={objScale}>
                <octahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color={isObjHovered ? "#ff1744" : obj.color} wireframe={obj.wireframe} transparent opacity={0.9} />
              </mesh>
            )}
            {obj.type === "sphere" && (
              <Sphere args={[objScale, 32, 32]}>
                <meshStandardMaterial color={obj.color} roughness={0.1} metalness={0.9} emissive={isObjHovered ? "#ff1744" : "#ff4d8d"} emissiveIntensity={isObjHovered ? 1.5 : 0.2} />
              </Sphere>
            )}
            {obj.type === "cube" && (
              <mesh scale={objScale}>
                <boxGeometry args={[1, 1, 1]} />
                <MeshTransmissionMaterial thickness={0.5} roughness={0.1} transmission={1} ior={1.4} chromaticAberration={isObjHovered ? 0.15 : 0.06} color="#ff1744" attenuationColor="#ff4d8d" />
              </mesh>
            )}
            {/* HUD Callout Label */}
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

      {/* Hover tooltip indicator */}
      {isHovered && (
        <Html position={[0, 2.4, 0]} center distanceFactor={8}>
          <div className="pointer-events-none select-none flex flex-col items-center gap-1 animate-fadeIn">
            <div className="px-3 py-1 rounded-full bg-black/90 border border-[#ff1744]/70 text-[10px] font-mono text-[#ff4d8d] backdrop-blur-md shadow-[0_0_14px_rgba(255,23,68,0.5)] whitespace-nowrap">
              click to activate pulse wave
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
