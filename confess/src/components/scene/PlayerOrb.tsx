'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { hashToColor } from '@/lib/glitch';
import * as THREE from 'three';

interface PlayerOrbProps {
  position: [number, number, number];
  address: string;
  color: 'teal' | 'magenta';
}

export const PlayerOrb: React.FC<PlayerOrbProps> = ({
  position,
  address,
  color,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Generate color from address hash
  const orbColor = color === 'teal' ? 0x00ffe1 : 0xff00ff;

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;

    // Orbit around center
    const angle = state.clock.elapsedTime * 0.5;
    const radius = 3;
    meshRef.current.position.x = Math.cos(angle) * radius;
    meshRef.current.position.z = Math.sin(angle) * radius;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;

    // Rotate self
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;

    // Glow pulsation
    if (glowRef.current.material instanceof THREE.MeshBasicMaterial) {
      const intensity = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
      glowRef.current.material.opacity = intensity;
    }
  });

  return (
    <group position={position}>
      {/* Core orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshPhongMaterial
          color={orbColor}
          emissive={orbColor}
          emissiveIntensity={0.8}
          shininess={100}
        />
      </mesh>

      {/* Glow corona */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color={orbColor}
          transparent={true}
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Inner glow layer */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color={orbColor}
          transparent={true}
          opacity={0.2}
        />
      </mesh>
    </group>
  );
};
