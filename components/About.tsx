'use client';

import { aboutKeywords } from '@/lib/data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !ref.current) return;

    const q = gsap.utils.selector(ref);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%'
      }
    });

    tl.fromTo(q('.reveal'), { y: 26, opacity: 0, skewY: 4 }, { y: 0, opacity: 1, skewY: 0, duration: 0.7, stagger: 0.08 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section id="about" ref={ref} className="section grid-section" aria-labelledby="about-title">
      <p className="section-index reveal">[02]</p>
      <div>
        <h2 id="about-title" className="section-title reveal">
          About
        </h2>
        <p className="section-copy reveal">
          저는 정책과 커뮤니케이션, 기술의 교차점에서 문제를 정의하고 실행 가능한 결과로 바꾸는 사람입니다.
          학업, 기사 집필, 공공참여 경험을 하나의 시스템처럼 연결해 더 나은 사용자 경험과 사회적 가치를 만듭니다.
        </p>
        <ul className="keyword-list reveal" aria-label="핵심 키워드">
          {aboutKeywords.map((tag) => (
            <li key={tag} className="keyword-tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
