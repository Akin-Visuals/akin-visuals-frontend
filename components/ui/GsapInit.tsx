'use client';

import { useEffect } from 'react';

export default function GsapInit() {
  useEffect(() => {
    // Custom cursor
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    };
    document.addEventListener('mousemove', onMouseMove);

    let rafId: number;
    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      rafId = requestAnimationFrame(animRing);
    };
    animRing();

    // Single scroll handler for all scroll-dependent UI
    const bar     = document.getElementById('progress-bar');
    const navbar  = document.getElementById('navbar');
    const hint    = document.getElementById('scroll-hint');
    let hintGone  = false;

    const onScroll = () => {
      const y        = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (bar) bar.style.width = (y / maxScroll * 100) + '%';
      navbar?.classList.toggle('scrolled', y > 80);

      if (!hintGone && y > 60) {
        if (hint) hint.style.opacity = '0';
        hintGone = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
