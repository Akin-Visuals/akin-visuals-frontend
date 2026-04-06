'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { loadGsap, getGsap } from '@/lib/gsap-cdn';
import { prefersReducedMotion } from '@/lib/animations';

export default function Hero() {
  const t = useTranslations('hero');
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const wrap = videoWrapRef.current;
    const hero = document.getElementById('hero');
    if (!wrap || !hero) return;

    let onMouseMove: ((e: MouseEvent) => void) | null = null;
    let onMouseLeave: (() => void) | null = null;

    loadGsap().then(() => {
      const gsap = getGsap();
      if (!gsap) return;

      onMouseMove = (e: MouseEvent) => {
        const rect = wrap.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width  / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        gsap.to(wrap, { rotateY: dx * 8, rotateX: -dy * 5, duration: 0.6, ease: 'power2.out', transformPerspective: 900, transformOrigin: 'center center' });
      };
      onMouseLeave = () => gsap.to(wrap, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' });

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

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
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

          <div id="h-cta" className="flex flex-col sm:flex-row gap-4 mb-10">
            <a href="#contact" className="btn-primary px-9 py-4 rounded-xl font-bold text-base glow-purple text-center">
              {t('cta1')}
            </a>
            <a href="#work" className="btn-ghost px-9 py-4 rounded-xl font-bold text-base text-center">
              {t('cta2')}
            </a>
          </div>

          <div id="h-stats">
            <p className="text-sm text-[rgba(225,226,231,0.6)] tracking-wide" style={{ fontFamily: 'var(--font-label)' }}>
              {t('trust')}
            </p>
          </div>
        </div>

        {/* Right: Video */}
        <div ref={videoWrapRef} id="h-video-wrap">
          <div className="video-frame-wrap">
            <div className="video-badge">
              <div className="dot" />
              Showreel
            </div>
            <video autoPlay muted playsInline preload="none">
              <source src="/brand_assets/31b07c0b00407242cdbc56d56d0327fc_1775314448_puougnxu.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div id="hero-clip" />

      <div id="scroll-hint">
        <span className="text-[10px] text-[rgba(225,226,231,0.3)] uppercase tracking-widest" style={{ fontFamily: 'var(--font-label)' }}>Scroll</span>
        <span className="arrow material-symbols-outlined text-[rgba(225,226,231,0.3)] text-lg">keyboard_arrow_down</span>
      </div>
    </section>
  );
}
