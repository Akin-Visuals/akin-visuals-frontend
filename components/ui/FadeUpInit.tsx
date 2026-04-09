'use client';

import { useEffect } from 'react';
import { loadGsap, getGsap, getScrollTrigger } from '@/lib/gsap-cdn';
import { prefersReducedMotion } from '@/lib/animations';

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
        gsap.fromTo(
          el as Element,
          { opacity: 0, y: 32, force3D: true },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: { trigger: el as Element, start: 'top 88%', once: true },
          }
        );
      });
    });
  }, []);

  return null;
}
