'use client';

import { useEffect, useRef, useState } from 'react';

const interactiveSelector = 'a, button, [data-cursor="interactive"], .work-card';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || reduced) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let fx = mx;
    let fy = my;
    let hoverLabel = false;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const updateHover = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      const isInteractive = !!el?.closest(interactiveSelector);
      hoverLabel = !!el?.closest('.work-card');
      followerRef.current?.classList.toggle('is-hover', isInteractive);
      followerRef.current?.classList.toggle('is-work', hoverLabel);
    };

    const animate = () => {
      fx += (mx - fx) * 0.14;
      fy += (my - fy) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${fx}px, ${fy}px, 0)`;
      }

      raf = requestAnimationFrame(animate);
    };

    const down = () => followerRef.current?.classList.add('is-down');
    const up = () => followerRef.current?.classList.remove('is-down');

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', (e) => updateHover(e.target));
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={followerRef} className="cursor-follower" aria-hidden="true">
        <span>VIEW</span>
      </div>
    </>
  );
}
