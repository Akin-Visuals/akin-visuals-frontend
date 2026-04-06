'use client';

import { useEffect } from 'react';
import { loadGsap, getGsap, getScrollTrigger } from '@/lib/gsap-cdn';
import { prefersReducedMotion, getAnimationDuration, getAnimationEase } from '@/lib/animations';

export default function FadeUpInit() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      document.querySelectorAll('.fade-up').forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    loadGsap().then(() => {
      const gsap = getGsap();
      const ScrollTrigger = getScrollTrigger();
      if (!gsap || !ScrollTrigger) return;

      gsap.utils.toArray('.fade-up').forEach((el: unknown) => {
        gsap.to(el as Element, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: el as Element, start: 'top 88%', once: true },
        });
      });
    });
  }, []);

  return null;
}
