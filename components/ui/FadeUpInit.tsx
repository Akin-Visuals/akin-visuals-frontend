'use client';

import { useEffect } from 'react';
import { getGsap, getScrollTrigger } from '@/lib/gsap-cdn';
import { prefersReducedMotion, getAnimationDuration, getAnimationEase } from '@/lib/animations';

export default function FadeUpInit() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      // Animations disabled, make all fade-up elements visible instantly
      document.querySelectorAll('.fade-up').forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const gsap = getGsap();
    const ScrollTrigger = getScrollTrigger();
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.fade-up').forEach((el: unknown) => {
      gsap.to(el as Element, {
        opacity: 1,
        y: 0,
        duration: getAnimationDuration(0.85),
        ease: getAnimationEase('power3.out'),
        scrollTrigger: { trigger: el as Element, start: 'top 88%', once: true },
      });
    });
  }, []);

  return null;
}
