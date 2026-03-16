'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GhostTrailProps {
  challenge: string;
  position?: { x: number; y: number; z: number };
}

export const GhostTrail: React.FC<GhostTrailProps> = ({
  challenge,
  position = { x: 0, y: 0, z: 0 },
}) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: 0, y: 100, scale: 0.5 }}
      transition={{ duration: 3, ease: 'easeOut' }}
      className="fixed pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="px-4 py-2 border border-teal/30 rounded-lg backdrop-blur-md bg-void/20 font-mono text-sm text-teal/40">
        {challenge.substring(0, 20)}...
      </div>
    </motion.div>
  );
};
