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

    // Scroll progress bar
    const onScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const bar = document.getElementById('progress-bar');
      if (bar) bar.style.width = (scrolled * 100) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Navbar glass
    const onNavScroll = () => {
      document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', onNavScroll, { passive: true });

    // Scroll hint fade
    const onScrollHint = () => {
      if (window.scrollY > 60) {
        const hint = document.getElementById('scroll-hint');
        if (hint) hint.style.opacity = '0';
      }
    };
    window.addEventListener('scroll', onScrollHint, { passive: true, once: true } as EventListenerOptions);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onNavScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
