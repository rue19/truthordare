'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { OracleScene } from '@/components/scene/OracleScene';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Cinematic landing animation with GSAP
    const timeline = gsap.timeline();

    timeline.fromTo(
      '.landing-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
    );

    timeline.fromTo(
      '.landing-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      0.5
    );

    timeline.fromTo(
      '.landing-cta',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'back.out' },
      1
    );
  }, []);

  const handleEnter = () => {
    router.push('/lobby');
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <OracleScene enablePostProcessing={true} />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8">
        {/* Main Title */}
        <h1 className="landing-title font-bebas text-8xl tracking-wider glow-teal">
          CONFESS
        </h1>

        {/* Subtitle */}
        <p className="landing-subtitle font-mono text-lg text-teal/80 max-w-lg">
          A 3D Psychological Party Game on Stellar — Where Secrets Unfold in the Void
        </p>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="grid grid-cols-3 gap-8 mt-12 max-w-4xl"
        >
          {[
            { step: '01', title: 'Connect', desc: 'Your Stellar Wallet' },
            { step: '02', title: 'Choose', desc: 'Truth or Dare' },
            { step: '03', title: 'Confess', desc: 'Face the Void' },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 border-2 border-teal/30 rounded-lg backdrop-blur-md bg-void/20 text-center"
            >
              <p className="font-bebas text-3xl text-teal mb-2">{item.step}</p>
              <h3 className="font-syne text-lg font-bold mb-1">{item.title}</h3>
              <p className="font-mono text-sm text-teal/60">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          className="landing-cta mt-12 px-16 py-4 border-2 border-teal rounded-lg font-bebas text-xl text-teal uppercase tracking-wider hover:bg-teal/10 transition-colors glow-teal"
          onClick={handleEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter the Void →
        </motion.button>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 text-teal/50 font-mono text-sm"
        >
          ↓ Scroll to Explore ↓
        </motion.div>
      </div>
    </div>
  );
}
