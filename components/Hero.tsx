'use client';

import { heroTokens } from '@/lib/data';
import { splitToSpans } from '@/lib/motion';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !rootRef.current) return;

    const tokens = rootRef.current.querySelectorAll('.hero-token .word');
    const captions = rootRef.current.querySelectorAll('.hero-caption');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(
      tokens,
      { yPercent: 130, opacity: 0, filter: 'blur(8px)' },
      { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 1.05, stagger: 0.06 }
    ).fromTo(captions, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 }, '-=0.5');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={rootRef} className="hero section" aria-label="Hero">
      <p className="hero-caption">[01] INTERACTIVE TYPOGRAPHY PORTFOLIO</p>
      <h1 className="hero-title">
        {heroTokens.map((token, idx) => (
          <span key={token} className="hero-token">
            {splitToSpans(token).map((word) => (
              <span key={word.key} className="word-wrap">
                <span className="word">{word.value}</span>
              </span>
            ))}
            {idx < heroTokens.length - 1 ? <span className="hero-symbol"> / </span> : null}
          </span>
        ))}
      </h1>
      <p className="hero-subtitle">
        도시를 설계하는 논리와 사회를 움직이는 문장을 연결합니다.
      </p>
      <div className="scroll-indicator" aria-hidden="true">
        <span>SCROLL</span>
      </div>
    </section>
  );
}
