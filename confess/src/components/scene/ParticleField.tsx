'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 2000;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30; // x
      positions[i + 1] = (Math.random() - 0.5) * 30; // y
      positions[i + 2] = (Math.random() - 0.5) * 30; // z

      velocities[i] = (Math.random() - 0.5) * 0.01; // vx
      velocities[i + 1] = (Math.random() - 0.5) * 0.01; // vy
      velocities[i + 2] = (Math.random() - 0.5) * 0.01; // vz
    }

    return { positions, velocities };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Update particle positions
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] += velocities[i];
      posArray[i + 1] += velocities[i + 1];
      posArray[i + 2] += velocities[i + 2];

      // Bounds wrapping
      if (posArray[i] > 20) posArray[i] = -20;
      if (posArray[i] < -20) posArray[i] = 20;
      if (posArray[i + 1] > 20) posArray[i + 1] = -20;
      if (posArray[i + 1] < -20) posArray[i + 1] = 20;
      if (posArray[i + 2] > 20) posArray[i + 2] = -20;
      if (posArray[i + 2] < -20) posArray[i + 2] = 20;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={0x00ffe1}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
      />
    </points>
  );
};
