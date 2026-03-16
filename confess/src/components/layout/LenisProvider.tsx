'use client';

import React, { useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const lenis = useLenis();

  return <>{children}</>;
};
