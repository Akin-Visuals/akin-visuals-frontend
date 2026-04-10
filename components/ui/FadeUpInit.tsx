'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/animations';

export default function FadeUpInit() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.fade-up'));

    if (prefersReducedMotion()) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = el.style.transitionDelay || '0s';
          el.style.animationDelay = delay;
          el.classList.add('is-visible');
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
