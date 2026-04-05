'use client';

import { useEffect } from 'react';
import { getGsap, getScrollTrigger } from '@/lib/gsap-cdn';

export default function FadeUpInit() {
  useEffect(() => {
    const gsap = getGsap();
    const ScrollTrigger = getScrollTrigger();
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.fade-up').forEach((el: unknown) => {
      gsap.to(el as Element, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: el as Element, start: 'top 88%', once: true },
      });
    });
  }, []);

  return null;
}
