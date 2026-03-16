'use client';

import React from 'react';
import {
  Bloom,
  Vignette,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export const PostProcessing: React.FC = () => {
  return (
    <>
      {/* Bloom effect for glowing elements */}
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.1}
        luminanceSmoothing={0.9}
        blendFunction={BlendFunction.ADD}
      />

      {/* Vignette for depth */}
      <Vignette
        offset={0.5}
        darkness={0.5}
        blendFunction={BlendFunction.NORMAL}
      />

      {/* Subtle noise overlay */}
      <Noise
        opacity={0.05}
        blendFunction={BlendFunction.OVERLAY}
      />
    </>
  );
};
