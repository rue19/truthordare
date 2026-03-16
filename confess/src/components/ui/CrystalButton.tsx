'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CrystalButtonProps {
  label: string;
  onClick: () => void;
  type?: 'truth' | 'dare';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const CrystalButton: React.FC<CrystalButtonProps> = ({
  label,
  onClick,
  type = 'truth',
  disabled = false,
  size = 'md',
}) => {
  const accentColor = type === 'truth' ? '#00ffe1' : '#ff3d00';
  const glowColor =
    type === 'truth' ? '0 0 20px rgba(0, 255, 225, 0.5)' : '0 0 20px rgba(255, 61, 0, 0.5)';

  const sizeMap = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-12 py-6 text-lg',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        font-mono font-bold uppercase tracking-wider
        border-2 rounded-lg
        backdrop-blur-md
        transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${sizeMap[size]}
        bg-void/30
      `}
      style={{
        borderColor: disabled ? '#666' : accentColor,
        color: disabled ? '#666' : accentColor,
        boxShadow: disabled ? 'none' : glowColor,
        textShadow: disabled ? 'none' : `0 0 10px ${accentColor}`,
      }}
    >
      {label}
    </motion.button>
  );
};
