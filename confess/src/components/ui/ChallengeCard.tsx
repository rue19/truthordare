'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface ChallengeCardProps {
  challenge: string;
  type: 'truth' | 'dare';
  isVisible: boolean;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  type,
  isVisible,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const accentColor = type === 'truth' ? '#00ffe1' : '#ff3d00';
  const backgroundColor =
    type === 'truth' ? 'rgba(0, 255, 225, 0.1)' : 'rgba(255, 61, 0, 0.1)';

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('');
      return;
    }

    // Typewriter effect
    let index = 0;
    const interval = setInterval(() => {
      if (index < challenge.length) {
        setDisplayedText(challenge.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [challenge, isVisible]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <div
        className="w-96 p-8 border-2 rounded-lg backdrop-blur-md"
        style={{
          borderColor: accentColor,
          backgroundColor,
          boxShadow: `0 0 30px ${accentColor}`,
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h3
            className="text-sm font-mono uppercase tracking-widest mb-2"
            style={{ color: accentColor }}
          >
            {type === 'truth' ? 'TRUTH' : 'DARE'}
          </h3>
        </div>

        {/* Question/Challenge */}
        <div className="min-h-16 mb-6">
          <p
            className="font-mono text-base leading-relaxed"
            style={{ color: '#ffffff' }}
          >
            {displayedText}
            {isVisible && displayedText.length < challenge.length && (
              <span className="animate-pulse">▌</span>
            )}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center gap-2 opacity-50">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
