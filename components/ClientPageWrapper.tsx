'use client';

import { useState, useEffect, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from '@/components/Preloader';

export default function ClientPageWrapper({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader text="Welcome Home Mocchiers... 🍀" />}
      </AnimatePresence>

      <div className={!mounted || isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {children}
      </div>
    </>
  );
}