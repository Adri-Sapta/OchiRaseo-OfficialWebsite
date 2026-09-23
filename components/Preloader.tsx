'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  text?: string;
}

export default function Preloader({ text = 'Tunggu Sebentar Bang...' }: PreloaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
    >
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-ochi-primary/20 border-t-ochi-primary rounded-full animate-spin"></div>
        <div className="absolute text-2xl">🍀</div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
        className="mt-4 font-semibold text-ochi-dark text-sm tracking-wide"
      >
        {text}
      </motion.p>
    </motion.div>
  );
}