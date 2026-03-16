'use client';

import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const VoidBackground: React.FC = () => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.MeshBasicMaterial({ color: 0x05050a });

    // Create nebula-like texture
    ctx.fillStyle = '#05050a';
    ctx.fillRect(0, 0, 512, 512);

    // Add subtle noise/nebula effect
    const imageData = ctx.createImageData(512, 512);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 30;
      const hue = Math.random() > 0.7 ? 200 + Math.random() * 50 : 10;

      data[i] = Math.max(5, value * 0.1); // R
      data[i + 1] = Math.max(5, value * 0.05); // G
      data[i + 2] = Math.max(10, value * 0.15); // B
      data[i + 3] = 255; // A
    }

    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Subtle rotation
    meshRef.current.rotation.x += 0.0001;
    meshRef.current.rotation.y += 0.00005;
  });

  return (
    <mesh ref={meshRef} scale={500}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};
