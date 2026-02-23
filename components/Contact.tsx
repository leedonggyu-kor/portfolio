'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function Contact() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) return;

    const move = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' });
    };

    const leave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.45)' });
    };

    btn.addEventListener('mousemove', move);
    btn.addEventListener('mouseleave', leave);

    return () => {
      btn.removeEventListener('mousemove', move);
      btn.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <section id="contact" className="section grid-section" aria-labelledby="contact-title">
      <p className="section-index">[05]</p>
      <div>
        <h2 id="contact-title" className="section-title">
          Let&apos;s build meaningful momentum.
        </h2>
        <p className="section-copy">도시, 정책, 커뮤니케이션, 디지털 경험이 만나는 프로젝트를 함께 만듭니다.</p>

        <div className="contact-stack">
          <a href="mailto:crock1234@naver.com" className="text-link">
            Email · crock1234@naver.com
          </a>
          <a href="https://www.instagram.com/ldg.lab" target="_blank" rel="noopener noreferrer" className="text-link">
            Instagram · @ldg.lab
          </a>
          <a href="https://open.kakao.com/o/sleedonggyu" target="_blank" rel="noopener noreferrer" className="text-link">
            KakaoTalk · @leedonggyu.u
          </a>
        </div>

        <a ref={buttonRef} href="mailto:crock1234@naver.com" className="cta-btn" data-cursor="interactive">
          Start a conversation
        </a>
      </div>
    </section>
  );
}
