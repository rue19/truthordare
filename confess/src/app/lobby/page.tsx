'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { OracleScene } from '@/components/scene/OracleScene';
import { CrystalButton } from '@/components/ui/CrystalButton';
import { WalletOrb } from '@/components/ui/WalletOrb';
import { useFreighter } from '@/hooks/useFreighter';
import { useGameStore } from '@/hooks/useOracleState';
import { isValidStellarAddress } from '@/lib/contract';
import { showToast } from '@/components/ui/Toast';

export default function LobbyPage() {
  const router = useRouter();
  const { publicKey, isConnected, connect } = useFreighter();
  const { setSessionId } = useGameStore();

  const [opponentAddress, setOpponentAddress] = useState('');
  const [isStarting, setIsStarting] = useState(false);

  const handleStartGame = async () => {
    if (!isConnected || !publicKey) {
      showToast.error('Please connect your wallet first');
      return;
    }

    if (!opponentAddress.trim()) {
      showToast.error('Please enter opponent address');
      return;
    }

    if (!isValidStellarAddress(opponentAddress)) {
      showToast.error('Invalid Stellar address');
      return;
    }

    setIsStarting(true);
    showToast.loading('Initializing game...');

    try {
      // Simulate game creation (in production, call contract)
      const sessionId = Array.from({ length: 8 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');

      setSessionId(sessionId);

      // Animate transition
      gsap.to('.lobby-content', {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          router.push(`/game/${sessionId}`);
        },
      });
    } catch (error) {
      showToast.error('Failed to start game');
      setIsStarting(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <OracleScene
          enablePostProcessing={true}
          player1={isConnected ? publicKey || '' : ''}
        />
      </div>

      {/* Content Overlay */}
      <div className="lobby-content relative z-10 w-full max-w-2xl px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="p-12 border-2 border-teal rounded-lg backdrop-blur-md bg-void/50 glow-teal space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h2 className="font-bebas text-5xl text-teal mb-2">PREPARE</h2>
            <p className="font-mono text-teal/70">Set up your challenge</p>
          </div>

          {/* Wallet Status */}
          {!isConnected ? (
            <motion.button
              onClick={connect}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-6 border-2 border-teal rounded-lg text-teal font-mono uppercase text-lg hover:bg-teal/10 transition-colors"
            >
              🔗 Connect Freighter Wallet
            </motion.button>
          ) : (
            <WalletOrb address={publicKey!} connected={true} />
          )}

          {/* Opponent Address Input */}
          <motion.input
            type="text"
            placeholder="Enter opponent's Stellar address..."
            value={opponentAddress}
            onChange={(e) => setOpponentAddress(e.target.value)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full px-6 py-4 border-2 border-teal rounded-lg bg-void/40 text-teal font-mono placeholder-teal/40 focus:outline-none focus:bg-void/60 transition-colors"
          />

          {/* Game Information */}
          <div className="grid grid-cols-2 gap-4 py-6 border-t border-teal/20 border-b border-teal/20">
            <div>
              <p className="font-mono text-xs uppercase text-teal/70">Players</p>
              <p className="font-mono text-lg text-teal">2</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-teal/70">Wallet Required</p>
              <p className="font-mono text-lg text-teal">✓</p>
            </div>
          </div>

          {/* Start Button */}
          <CrystalButton
            label={isStarting ? 'Initializing...' : 'Enter the Arena'}
            onClick={handleStartGame}
            type="truth"
            disabled={isStarting || !isConnected}
            size="lg"
          />
        </motion.div>
      </div>
    </div>
  );
}
