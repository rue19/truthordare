'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useOracleStore } from '@/hooks/useOracleState';
import gsap from 'gsap';
import * as THREE from 'three';

export const Dodecahedron: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  const [explodedFragments, setExplodedFragments] = useState<THREE.Mesh[]>([]);
  const animationState = useOracleStore((state) => state.animationState);
  const setAnimationState = useOracleStore((state) => state.setAnimationState);

  // Create dodecahedron geometry
  const dodecGeometry = new THREE.DodecahedronGeometry(1.5, 0);

  const dodecMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ffe1,
    emissive: 0x00ffe1,
    emissiveIntensity: 0.3,
    wireframe: false,
    shininess: 100,
  });

  // Idle animation - slow rotation with pulse
  useFrame((state) => {
    if (!meshRef.current) return;

    const group = meshRef.current;

    // Rotation
    group.rotation.x += 0.0005;
    group.rotation.y += 0.001;

    // Pulsing glow
    const pulseIntensity =
      Math.sin(state.clock.elapsedTime * 1.5) * 0.2 + 0.3;
    if (dodecMaterial.emissiveIntensity !== undefined) {
      dodecMaterial.emissiveIntensity = pulseIntensity;
    }

    // Handle animation state changes
    if (animationState === 'truth') {
      handleTruthAnimation(group);
      setAnimationState('idle');
    } else if (animationState === 'dare') {
      handleDareAnimation(group);
      setAnimationState('idle');
    } else if (animationState === 'complete') {
      handleCompleteAnimation(group);
      setAnimationState('idle');
    }
  });

  const handleTruthAnimation = (group: THREE.Group) => {
    // Crack animation - fragments move outward and reassemble
    gsap.timeline()
      .to(
        group.rotation,
        {
          x: group.rotation.x + Math.PI * 0.5,
          y: group.rotation.y + Math.PI,
          duration: 0.8,
          ease: 'back.out',
        },
        0
      )
      .to(
        group.scale,
        {
          x: 1.2,
          y: 1.2,
          z: 1.2,
          duration: 0.6,
          ease: 'back.out',
        },
        0
      )
      .to(
        group.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.4,
          ease: 'elastic.out',
        },
        0.6
      );
  };

  const handleDareAnimation = (group: THREE.Group) => {
    // Explosive animation - turn red, burst with particles
    gsap.timeline()
      .to(
        group.rotation,
        {
          x: Math.random() * Math.PI * 2,
          y: Math.random() * Math.PI * 2,
          z: Math.random() * Math.PI * 2,
          duration: 0.6,
          ease: 'back.out',
        },
        0
      )
      .to(
        group.scale,
        {
          x: 0.5,
          y: 0.5,
          z: 0.5,
          duration: 0.4,
          ease: 'sine.in',
        },
        0
      )
      .to(
        group.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          ease: 'elastic.out',
        },
        0.4
      );

    // Change color to ember red
    if (dodecMaterial.emissive) {
      gsap.to(dodecMaterial.color, {
        r: 1,
        g: 0.2,
        b: 0,
        duration: 0.3,
      });
      gsap.to(dodecMaterial.emissive, {
        r: 1,
        g: 0.2,
        b: 0,
        duration: 0.3,
      });

      // Revert color
      gsap.to(
        [dodecMaterial.color, dodecMaterial.emissive],
        {
          r: 0,
          g: 1,
          b: 0.88,
          duration: 0.4,
          delay: 0.4,
        }
      );
    }
  };

  const handleCompleteAnimation = (group: THREE.Group) => {
    // Flash white and emit ripple
    gsap.timeline()
      .to(
        group.rotation,
        {
          x: group.rotation.x + Math.PI * 2,
          duration: 0.8,
          ease: 'sine.inOut',
        },
        0
      )
      .to(
        group.scale,
        {
          x: 1.3,
          y: 1.3,
          z: 1.3,
          duration: 0.3,
          ease: 'back.out',
        },
        0
      )
      .to(
        group.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: 'back.in',
        },
        0.3
      );

    // Flash emit
    if (dodecMaterial.emissive) {
      gsap.to(dodecMaterial, {
        emissiveIntensity: 1,
        duration: 0.1,
      });
      gsap.to(dodecMaterial, {
        emissiveIntensity: 0.3,
        duration: 0.4,
        delay: 0.1,
      });
    }
  };

  return (
    <group ref={meshRef}>
      <mesh geometry={dodecGeometry} material={dodecMaterial} />
    </group>
  );
};
