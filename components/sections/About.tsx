'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { loadGsap, getGsap } from '@/lib/gsap-cdn';
import { prefersReducedMotion } from '@/lib/animations';

const ABOUT_IMAGES = [
  {
    src: '/brand_assets/hrub7a7fsf7imcze2x2q.avif',
    alt: 'AKIN Visuals — Behind the scenes',
    bg: 'linear-gradient(135deg,#000447,#6d11ad)',
  },
  {
    src: '/brand_assets/kpnsjrchu6opk0rdtbvp.avif',
    alt: 'AKIN Visuals — Content creation',
    bg: 'linear-gradient(135deg,#0a1a3a,#1d2d6e)',
  },
];

export default function About() {
  const t = useTranslations('about');
  const [current, setCurrent] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const pausedRef  = useRef(false);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (next: number) => {
    setCurrent(prev => {
      if (next === prev) return prev;
      return next;
    });
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent(prev => (prev + 1) % ABOUT_IMAGES.length);
      }
    }, 5000);
  };

  useEffect(() => {
    startTimer();

    const gallery = galleryRef.current;
    const wrap    = wrapRef.current;
    if (!gallery || !wrap) return;

    if (prefersReducedMotion()) {
      return;
    }

    let onEnter: (() => void) | null = null;
    let onLeave: (() => void) | null = null;
    let onMove: ((e: MouseEvent) => void) | null = null;

    loadGsap().then(() => {
      const gsap = getGsap();
      if (!gsap) return;

      onEnter = () => { pausedRef.current = true; };
      onLeave = () => {
        pausedRef.current = false;
        gsap.to(gallery, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3.out' });
      };
      onMove = (e: MouseEvent) => {
        const rect = gallery.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
        const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
        gsap.to(gallery, { rotateY: dx * 10, rotateX: -dy * 7, duration: 0.5, ease: 'power2.out', transformPerspective: 900 });
      };

      gallery.addEventListener('mouseenter', onEnter);
      gallery.addEventListener('mouseleave', onLeave);
      wrap.addEventListener('mousemove', onMove);
    });

    const sectionEl = document.getElementById('about');
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) startTimer();
      else if (timerRef.current) clearInterval(timerRef.current);
    }, { threshold: 0.2 });
    if (sectionEl) obs.observe(sectionEl);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (onEnter) gallery.removeEventListener('mouseenter', onEnter);
      if (onLeave) gallery.removeEventListener('mouseleave', onLeave);
      if (onMove) wrap.removeEventListener('mousemove', onMove);
      obs.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="about" className="section-snap relative px-8 min-h-screen flex items-center">

      <div className="max-w-7xl mx-auto w-full relative z-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: image gallery */}
          <div className="lg:col-span-7 order-1">
            <div ref={wrapRef} id="vtabs-gallery-wrap">
              <div ref={galleryRef} id="vtabs-gallery">
                {ABOUT_IMAGES.map((img, i) => {
                  const state = i === current ? 'is-active' : (i < current ? 'is-above' : 'is-below');
                  return (
                    <div
                      key={i}
                      className={`vtab-img ${state}`}
                      style={{ background: img.bg }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        priority={i === 0}
                        quality={85}
                        onError={() => {}}
                      />
                    </div>
                  );
                })}
              </div>
              <div id="vtabs-shadow-frame" />
            </div>
          </div>

          {/* Right: content */}
          <div className="lg:col-span-5 flex flex-col order-2">
            <span className="text-[#bdc2ff] tracking-[0.35em] uppercase text-xs mb-3 block font-semibold" style={{ fontFamily: 'var(--font-label)' }}>
              {t('label')}
            </span>
            <h2 className="font-bold text-[#e1e2e7] mb-8" style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(2.4rem,4vw,3.8rem)', lineHeight: 1 }}>
              {t('title')}
            </h2>
            <p className="text-[#c6c6cb] leading-relaxed mb-12 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
              {t('body')}
            </p>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
              <div>
                <p className="text-3xl font-bold text-[#bdc2ff] mb-1" style={{ fontFamily: 'var(--font-headline)' }}>{t('stat1Val')}</p>
                <p className="text-xs text-[#c6c6cb] uppercase tracking-widest leading-snug" style={{ fontFamily: 'var(--font-label)' }}>{t('stat1Label')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#bdc2ff] mb-1" style={{ fontFamily: 'var(--font-headline)' }}>{t('stat2Val')}</p>
                <p className="text-xs text-[#c6c6cb] uppercase tracking-widest leading-snug" style={{ fontFamily: 'var(--font-label)' }}>{t('stat2Label')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#bdc2ff] mb-1" style={{ fontFamily: 'var(--font-headline)' }}>{t('stat3Val')}</p>
                <p className="text-xs text-[#c6c6cb] uppercase tracking-widest leading-snug" style={{ fontFamily: 'var(--font-label)' }}>{t('stat3Label')}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
