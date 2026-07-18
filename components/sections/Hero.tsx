'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { loadGsap, getGsap } from '@/lib/gsap-cdn';
import { prefersReducedMotion } from '@/lib/animations';
import BeforeAfterSlider from './BeforeAfterSlider';

export default function Hero() {
  const t = useTranslations('hero');
  const gridRef  = useRef<HTMLDivElement>(null);

  // GSAP tilt on mouse move
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const grid = gridRef.current;
    const hero = document.getElementById('hero');
    if (!grid || !hero) return;

    let onMouseMove: ((e: MouseEvent) => void) | null = null;
    let onMouseLeave: (() => void) | null = null;

    loadGsap().then(() => {
      const gsap = getGsap();
      if (!gsap) return;

      onMouseMove = (e: MouseEvent) => {
        const rect = grid.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width  / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        gsap.to(grid, { rotateY: dx * 8, rotateX: -dy * 5, duration: 0.6, ease: 'power2.out', transformPerspective: 900, transformOrigin: 'center center' });
      };
      onMouseLeave = () => gsap.to(grid, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' });

      hero.addEventListener('mousemove', onMouseMove);
      hero.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      if (onMouseMove) hero.removeEventListener('mousemove', onMouseMove);
      if (onMouseLeave) hero.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section id="hero" className="section-snap">
      <div className="hero-shader" aria-hidden="true">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
      </div>

      <div className="max-w-7xl lg:max-w-[88rem] mx-auto w-full lg:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center relative z-10">

        {/* Left: Text */}
        <div>
          <span id="h-label" className="font-[var(--font-label)] text-[#e0b6ff] tracking-[0.35em] uppercase text-xs mb-6 block font-semibold">
            {t('label')}
          </span>

          <h1 id="h-title" className="font-[var(--font-headline)] font-bold text-[#e1e2e7] mb-7" style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(2.8rem,5.5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '0.01em' }}>
            {t('titleLine1')}<br />
            <span className="gradient-text">{t('titleHighlight')}</span><br />
            {t('titleLine3')}
          </h1>

          <p id="h-sub" className="text-lg text-[#c6c6cb] max-w-lg mb-10 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            {t('sub')}
          </p>

          {/* CTA */}
          <div id="h-cta" className="flex flex-col items-start gap-4">
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #5c6dff, #6d11ad)',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 700,
                padding: '0.85rem 2rem',
                borderRadius: '9px',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                boxShadow: '0 0 32px rgba(109,17,173,0.45)',
                transition: 'filter 0.2s',
              }}
            >
              {t('cta1')}
            </a>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[
                  { initials: 'JR', style: { background: 'linear-gradient(135deg,#000447,#6d11ad)' } },
                  { initials: 'SC', style: { background: 'linear-gradient(135deg,#6d11ad,#3d00b5)' } },
                  { initials: 'MK', style: { background: 'linear-gradient(135deg,#5c6dff,#6d11ad)' } },
                ].map((av, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#0d0520] flex items-center justify-center text-white font-bold text-[9px] flex-shrink-0"
                    style={{ ...av.style, marginLeft: i === 0 ? 0 : '-8px' }}
                  >
                    {av.initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-[#e0b6ff] text-[11px] leading-none mb-0.5">★★★★★</div>
                <div className="text-[rgba(225,226,231,0.35)] text-[11px]" style={{ fontFamily: 'var(--font-label)' }}>
                  {t('trust')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Before / After slider */}
        <div ref={gridRef} id="h-video-wrap">
          <BeforeAfterSlider />
        </div>
      </div>

      <div id="hero-clip" />

      <div id="scroll-hint">
        <span className="text-[10px] text-[rgba(225,226,231,0.3)] uppercase tracking-widest" style={{ fontFamily: 'var(--font-label)' }}>Scroll</span>
        <svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(225,226,231,0.3)" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
