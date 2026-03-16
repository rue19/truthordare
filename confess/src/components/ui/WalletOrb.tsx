'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { generateGlitchFrames, shortenAddress } from '@/lib/glitch';

interface WalletOrbProps {
  address: string;
  connected: boolean;
}

export const WalletOrb: React.FC<WalletOrbProps> = ({ address, connected }) => {
  const [glitchText, setGlitchText] = useState(shortenAddress(address));
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (!connected || !address) return;

    // Generate glitch animation frames
    const frames = generateGlitchFrames(shortenAddress(address), 800);

    let currentFrame = 0;
    const interval = setInterval(() => {
      if (currentFrame < frames.length) {
        setGlitchText(frames[currentFrame].text);
        currentFrame++;
      } else {
        clearInterval(interval);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [address, connected]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-6 right-6 z-50"
    >
      <div className="px-6 py-3 border-2 border-teal rounded-lg backdrop-blur-md bg-void/50 glow-teal">
        <p className="font-mono text-sm text-teal">{glitchText}</p>
        <div className="mt-2 flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              connected ? 'bg-teal' : 'bg-red-500'
            }`}
          />
          <span className="font-mono text-xs">
            {connected ? 'CONNECTED' : 'DISCONNECTED'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
