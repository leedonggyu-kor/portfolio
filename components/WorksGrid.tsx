'use client';

import { WorkCategory, works } from '@/lib/data';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useMemo, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const filters: Array<'ALL' | WorkCategory> = ['ALL', 'DEV', 'WRITING', 'POLICY', 'BRANDING'];

export default function WorksGrid() {
  const [filter, setFilter] = useState<'ALL' | WorkCategory>('ALL');
  const ref = useRef<HTMLElement>(null);

  const items = useMemo(() => (filter === 'ALL' ? works : works.filter((w) => w.category === filter)), [filter]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !ref.current) return;

    const cards = ref.current.querySelectorAll('.work-card');

    const tween = gsap.fromTo(
      cards,
      { y: 44, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
      {
        y: 0,
        opacity: 1,
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 74%'
        }
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [items]);

  return (
    <section id="works" ref={ref} className="section" aria-labelledby="works-title">
      <div className="grid-section">
        <p className="section-index">[03]</p>
        <div>
          <h2 id="works-title" className="section-title">
            Selected Works
          </h2>
          <div className="filter-row" role="tablist" aria-label="작업 필터">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={`text-link ${filter === f ? 'is-active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="works-grid">
        {items.map((work) => (
          <article key={work.id} className="work-card" data-cursor="interactive" tabIndex={0}>
            <div className="work-media">
              <Image
                src={work.image}
                alt={work.title}
                width={1200}
                height={800}
                className="work-image"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
            <div className="work-meta">
              <p className="work-overline">
                {work.category} · {work.year}
              </p>
              <h3>{work.title}</h3>
              <p>{work.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
