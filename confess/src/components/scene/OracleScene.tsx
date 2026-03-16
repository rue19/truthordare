'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing';
import { Dodecahedron } from './Dodecahedron';
import { PlayerOrb } from './PlayerOrb';
import { VoidBackground } from './VoidBackground';
import { ParticleField } from './ParticleField';
import { PostProcessing } from './PostProcessing';

interface OracleSceneProps {
  enablePostProcessing?: boolean;
  player1?: string;
  player2?: string;
  onSceneReady?: () => void;
}

export const OracleScene: React.FC<OracleSceneProps> = ({
  enablePostProcessing = true,
  player1,
  player2,
  onSceneReady,
}) => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 75,
        near: 0.1,
        far: 1000,
      }}
      dpr={[1, 1.5]}
      onCreated={() => onSceneReady?.()}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, 10]} intensity={0.4} color={0x00ffe1} />

        {/* Scene Elements */}
        <VoidBackground />
        <Dodecahedron />
        <ParticleField />

        {/* Player Orbs */}
        {player1 && <PlayerOrb position={[-3, 0, 0]} address={player1} color="teal" />}
        {player2 && <PlayerOrb position={[3, 0, 0]} address={player2} color="magenta" />}

        {/* Post Processing */}
        {enablePostProcessing && <PostProcessing />}
      </Suspense>
    </Canvas>
  );
};
