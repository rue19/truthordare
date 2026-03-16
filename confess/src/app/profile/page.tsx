'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { OracleScene } from '@/components/scene/OracleScene';
import { useFreighter } from '@/hooks/useFreighter';
import { getStats } from '@/lib/contract';
import { shortenAddress, formatNumber } from '@/lib/glitch';

interface PlayerStats {
  games_played: number;
  challenges_completed: number;
}

export default function ProfilePage() {
  const { publicKey, isConnected } = useFreighter();
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isConnected || !publicKey) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const playerStats = await getStats(publicKey);
        setStats(playerStats);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [publicKey, isConnected]);

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Background - Oracle in distance */}
      <div className="absolute inset-0 z-0">
        <OracleScene enablePostProcessing={false} />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-2xl px-8">
        {!isConnected ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 border-2 border-teal rounded-lg backdrop-blur-md bg-void/50 text-center"
          >
            <p className="font-mono text-teal text-lg">
              Connect your wallet to view your profile
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="space-y-8"
          >
            {/* Profile Header */}
            <div className="text-center">
              <h1 className="font-bebas text-6xl text-teal glow-teal mb-4">
                PROFILE
              </h1>
              <p className="font-mono text-teal/70 text-lg">
                {shortenAddress(publicKey!, 6)}
              </p>
            </div>

            {/* Stats Grid */}
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center"
              >
                <p className="font-mono text-teal">Loading...</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {/* Games Played */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 border-2 border-teal rounded-lg backdrop-blur-md bg-void/50 glow-teal text-center"
                >
                  <p className="font-mono text-xs uppercase text-teal/70 mb-2">
                    Games Played
                  </p>
                  <p className="font-bebas text-5xl text-teal">
                    {stats?.games_played || 0}
                  </p>
                </motion.div>

                {/* Challenges Completed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-8 border-2 border-ember rounded-lg backdrop-blur-md bg-void/50 glow-ember text-center"
                >
                  <p className="font-mono text-xs uppercase text-ember/70 mb-2">
                    Challenges Completed
                  </p>
                  <p className="font-bebas text-5xl text-ember">
                    {stats?.challenges_completed || 0}
                  </p>
                </motion.div>
              </div>
            )}

            {/* Achievement Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-8 border-2 border-teal/50 rounded-lg backdrop-blur-md bg-void/50"
            >
              <h3 className="font-bebas text-2xl text-teal mb-6">ACHIEVEMENTS</h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { emoji: '🎭', label: 'First Game' },
                  { emoji: '🔥', label: 'Streaker' },
                  { emoji: '🏆', label: 'Champion' },
                  { emoji: '⭐', label: 'Legend' },
                ].map((badge) => (
                  <motion.div
                    key={badge.label}
                    whileHover={{ scale: 1.1 }}
                    className="aspect-square flex flex-col items-center justify-center border-2 border-teal/30 rounded-lg bg-void/40 hover:border-teal/70 transition-colors cursor-pointer"
                  >
                    <p className="text-2xl mb-2">{badge.emoji}</p>
                    <p className="font-mono text-xs text-teal/60 text-center">
                      {badge.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Games */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-8 border-2 border-teal/50 rounded-lg backdrop-blur-md bg-void/50"
            >
              <h3 className="font-bebas text-2xl text-teal mb-6">RECENT GAMES</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border-l-2 border-teal/20 hover:border-teal/50 transition-colors"
                  >
                    <span className="font-mono text-sm text-teal/70">
                      Game #{i}
                    </span>
                    <span className="font-bebas text-lg text-teal">7 pts</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
