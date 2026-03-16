'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { OracleScene } from '@/components/scene/OracleScene';
import { CrystalButton } from '@/components/ui/CrystalButton';
import { ChallengeCard } from '@/components/ui/ChallengeCard';
import { StatsPanel } from '@/components/ui/StatsPanel';
import { useOracleStore, useGameStore } from '@/hooks/useOracleState';
import { getTruth, getDare } from '@/lib/contract';
import { useFreighter } from '@/hooks/useFreighter';
import { showToast } from '@/components/ui/Toast';
import { shortenAddress } from '@/lib/glitch';

interface GamePageProps {
  params: {
    session_id: string;
  };
}

export default function GamePage({ params }: GamePageProps) {
  const { publicKey } = useFreighter();
  const setAnimationState = useOracleStore((state) => state.setAnimationState);
  const setCurrentChallenge = useOracleStore((state) => state.setCurrentChallenge);
  const currentChallenge = useOracleStore((state) => state.currentChallenge);

  const {
    sessionId,
    currentRound,
    player1Score,
    player2Score,
    setCurrentRound,
    updateScore,
  } = useGameStore();

  const [challengeVisible, setChallengeVisible] = useState(false);
  const [currentType, setCurrentType] = useState<'truth' | 'dare' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock player addresses for demo
  const player1 = publicKey || 'G...';
  const player2 = 'G...'; // In production, fetch from session

  const handleTruth = async () => {
    setIsLoading(true);
    setChallengeVisible(false);
    setCurrentType('truth');

    try {
      const truth = await getTruth();
      setCurrentChallenge(truth);
      setAnimationState('truth');
      setChallengeVisible(true);
      showToast.success('Truth revealed');

      // After 5 seconds, show score increment
      setTimeout(() => {
        updateScore(currentRound % 2 === 0 ? 1 : 2, 1);
        setCurrentRound(currentRound + 1);
      }, 5000);
    } catch (error) {
      showToast.error('Failed to fetch truth');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDare = async () => {
    setIsLoading(true);
    setChallengeVisible(false);
    setCurrentType('dare');

    try {
      const dare = await getDare();
      setCurrentChallenge(dare);
      setAnimationState('dare');
      setChallengeVisible(true);
      showToast.success('Dare issued');

      // After 5 seconds, show score increment
      setTimeout(() => {
        updateScore(currentRound % 2 === 0 ? 1 : 2, 1);
        setCurrentRound(currentRound + 1);
      }, 5000);
    } catch (error) {
      showToast.error('Failed to fetch dare');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <OracleScene
          enablePostProcessing={true}
          player1={player1}
          player2={player2}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-bebas text-6xl text-teal glow-teal mb-12 mt-24"
        >
          THE ARENA
        </motion.h1>

        {/* Challenge Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex gap-12 mb-12"
        >
          <CrystalButton
            label="Truth"
            onClick={handleTruth}
            type="truth"
            disabled={isLoading}
            size="lg"
          />
          <CrystalButton
            label="Dare"
            onClick={handleDare}
            type="dare"
            disabled={isLoading}
            size="lg"
          />
        </motion.div>

        {/* Challenge Card */}
        {currentChallenge && (
          <ChallengeCard
            challenge={currentChallenge}
            type={currentType || 'truth'}
            isVisible={challengeVisible}
          />
        )}

        {/* Stats Panel */}
        <StatsPanel
          player1Name={shortenAddress(player1, 3)}
          player1Score={player1Score}
          player2Name={shortenAddress(player2, 3)}
          player2Score={player2Score}
          currentRound={currentRound}
        />
      </div>
    </div>
  );
}
