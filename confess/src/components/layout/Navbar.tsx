'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useFreighter } from '@/hooks/useFreighter';

export const Navbar: React.FC = () => {
  const { isConnected, connect, disconnect, publicKey, error, freighterReady, isFreighterInstalled } = useFreighter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Log wallet status for debugging
    console.log('Navbar mounted. Wallet status:', {
      isInstalled: isFreighterInstalled(),
      isConnected,
      publicKey,
    });
  }, [isConnected, publicKey, isFreighterInstalled]);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 px-8 py-6 backdrop-blur-md border-b border-teal/20 bg-void/50"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center border-2 border-teal rounded-lg glow-teal">
              <span className="font-bebas text-lg">C</span>
            </div>
            <h1 className="font-bebas text-xl glow-teal">CONFESS</h1>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link href="/lobby">
            <div className="font-mono text-sm uppercase text-teal hover:text-ember transition-colors">
              Lobby
            </div>
          </Link>
          <Link href="/profile">
            <div className="font-mono text-sm uppercase text-teal hover:text-ember transition-colors">
              Profile
            </div>
          </Link>

          {/* Wallet Connect Button */}
          <button
            onClick={isConnected ? disconnect : connect}
            disabled={!isFreighterInstalled()}
            title={!isFreighterInstalled() ? 'Freighter extension not detected. Check console for details.' : ''}
            className={`px-6 py-2 font-mono text-sm uppercase border-2 rounded-lg transition-colors ${
              isConnected
                ? 'border-ember text-ember hover:bg-ember/10'
                : isFreighterInstalled()
                ? 'border-teal text-teal hover:bg-teal/10'
                : 'border-red-500 text-red-500 opacity-50 cursor-not-allowed'
            }`}
          >
            {isConnected 
              ? `${publicKey?.slice(0, 6)}...${publicKey?.slice(-4)}` 
              : isFreighterInstalled() 
              ? 'Connect Wallet' 
              : 'Freighter Not Found'}
          </button>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="text-xs text-red-500 mt-2 text-center font-mono">
          {error}
        </div>
      )}
      
      {/* Debug Info */}
      {!isFreighterInstalled() && (
        <div className="text-xs text-yellow-500/70 mt-2 text-center font-mono">
          Open DevTools Console (F12) to check wallet status: window.stellar
        </div>
      )}
    </motion.nav>
  );
};
