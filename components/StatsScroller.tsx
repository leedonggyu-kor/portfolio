'use client';

import { stats } from '@/lib/data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function StatsScroller() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 76%'
          }
        }
      );

      ref.current?.querySelectorAll<HTMLElement>('[data-value]').forEach((el) => {
        const target = Number(el.dataset.value || '0');
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          ease: 'power1.out',
          duration: 1.6,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%'
          },
          onUpdate: () => {
            const suffix = el.dataset.suffix || '';
            el.textContent = `${Math.round(state.value)}${suffix}`;
          }
        });
      });
    }, ref);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={ref} id="timeline" className="section grid-section" aria-labelledby="stats-title">
      <p className="section-index">[04]</p>
      <div>
        <h2 id="stats-title" className="section-title">
          Ecosystem / Timeline
        </h2>
        <p className="section-copy">숫자는 결과를 요약하고, 문장은 방향을 설명합니다.</p>
        <div className="stats-grid">
          {stats.map((item) => (
            <article className="stat-item" key={item.label}>
              <p className="stat-label">{item.label}</p>
              <p className="stat-value" data-value={item.value} data-suffix={item.suffix}>
                0
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
