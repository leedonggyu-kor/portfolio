'use client';

import { PropsWithChildren, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

export default function SmoothScrollProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: true
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
