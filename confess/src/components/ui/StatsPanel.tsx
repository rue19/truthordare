'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatsPanelProps {
  player1Name: string;
  player1Score: number;
  player2Name: string;
  player2Score: number;
  currentRound: number;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
  player1Name,
  player1Score,
  player2Name,
  player2Score,
  currentRound,
}) => {
  const [displayScore1, setDisplayScore1] = useState(0);
  const [displayScore2, setDisplayScore2] = useState(0);

  // Animate score updates
  useEffect(() => {
    const interval1 = setInterval(() => {
      setDisplayScore1((prev) => {
        if (prev < player1Score) return prev + 1;
        return prev;
      });
    }, 50);

    return () => clearInterval(interval1);
  }, [player1Score]);

  useEffect(() => {
    const interval2 = setInterval(() => {
      setDisplayScore2((prev) => {
        if (prev < player2Score) return prev + 1;
        return prev;
      });
    }, 50);

    return () => clearInterval(interval2);
  }, [player2Score]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <div className="px-8 py-6 border-2 border-teal rounded-lg backdrop-blur-md bg-void/50 glow-teal space-y-4">
        {/* Round Counter */}
        <div className="text-center">
          <p className="font-mono text-xs uppercase text-teal/70">Round</p>
          <p className="font-bebas text-3xl glow-teal">{currentRound}</p>
        </div>

        {/* Player Stats */}
        <div className="space-y-3">
          <div>
            <p className="font-mono text-xs uppercase text-teal/70">{player1Name}</p>
            <p className="font-mono text-2xl text-teal">{displayScore1}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase text-teal/70">{player2Name}</p>
            <p className="font-mono text-2xl text-teal">{displayScore2}</p>
          </div>
        </div>

        {/* VS Indicator */}
        <div className="text-center pt-2 border-t border-teal/20">
          <p className="font-bebas text-xs uppercase text-teal/50">VS</p>
        </div>
      </div>
    </motion.div>
  );
};
