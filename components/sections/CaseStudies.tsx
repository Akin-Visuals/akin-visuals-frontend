'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { loadGsap, getGsap } from '@/lib/gsap-cdn';
import { prefersReducedMotion } from '@/lib/animations';
import { YT_VIDEOS } from '@/lib/data';

function fmtNum(n: number, isTime = false, isDec = false): string {
  if (isTime) {
    const m = Math.floor(n / 60);
    const s = Math.floor(n % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
  if (isDec) return (n / 10).toFixed(1) + '%';
  if (n >= 10000) return Math.round(n / 1000) + 'K';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

function growthPct(before: number, after: number): string {
  return '+' + Math.round(((after - before) / before) * 100).toLocaleString() + '%';
}

const CASES = [
  {
    videoId: YT_VIDEOS[0].id,
    clientKey: 'c1',
    metrics: [
      { labelKey: 'views',     before: 1200,  after: 28400, isTime: false, isDec: false },
      { labelKey: 'subs',      before: 5000,  after: 40000, isTime: false, isDec: false },
      { labelKey: 'watchTime', before: 72,    after: 285,   isTime: true,  isDec: false },
    ],
  },
  {
    videoId: YT_VIDEOS[1].id,
    clientKey: 'c2',
    metrics: [
      { labelKey: 'views',     before: 800,   after: 15200, isTime: false, isDec: false },
      { labelKey: 'followers', before: 8000,  after: 35000, isTime: false, isDec: false },
      { labelKey: 'shares',    before: 45,    after: 890,   isTime: false, isDec: false },
    ],
  },
  {
    videoId: YT_VIDEOS[2].id,
    clientKey: 'c3',
    metrics: [
      { labelKey: 'views',     before: 3000,  after: 52000, isTime: false, isDec: false },
      { labelKey: 'subs',      before: 12000, after: 65000, isTime: false, isDec: false },
      { labelKey: 'ctr',       before: 32,    after: 114,   isTime: false, isDec: true  },
    ],
  },
];

export default function CaseStudies() {
  const t = useTranslations('caseStudies');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const counters = section.querySelectorAll<HTMLElement>('[data-counter]');

        if (prefersReducedMotion()) {
          counters.forEach(el => {
            const after  = Number(el.dataset.after);
            const isTime = el.dataset.time === 'true';
            const isDec  = el.dataset.dec  === 'true';
            el.textContent = fmtNum(after, isTime, isDec);
          });
          return;
        }

        loadGsap().then(() => {
          const gsap = getGsap();
          if (!gsap) return;

          counters.forEach((el, i) => {
            const after  = Number(el.dataset.after);
            const isTime = el.dataset.time === 'true';
            const isDec  = el.dataset.dec  === 'true';
            const obj    = { val: 0 };

            gsap.to(obj, {
              val: after,
              duration: 2,
              delay: i * 0.07,
              ease: 'power2.out',
              onUpdate() {
                el.textContent = fmtNum(Math.round(obj.val), isTime, isDec);
              },
              onComplete() {
                el.textContent = fmtNum(after, isTime, isDec);
              },
            });
          });
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="py-28 px-8 section-snap relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12 fade-up">
          <span
            className="text-[#bdc2ff] tracking-[0.35em] uppercase text-xs mb-4 block font-semibold"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            {t('label')}
          </span>
          <h2
            className="font-bold text-5xl text-[#e1e2e7]"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {t('title')}
          </h2>
          <p
            className="text-[rgba(225,226,231,0.5)] mt-4 text-base max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('sub')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASES.map((c, ci) => (
            <div
              key={ci}
              className="fade-up rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                transitionDelay: `${ci * 0.1}s`,
              }}
            >
              {/* Thumbnail */}
              <div className="relative h-44 bg-[#0d1535] flex-shrink-0">
                <Image
                  src={`https://img.youtube.com/vi/${c.videoId}/maxresdefault.jpg`}
                  alt={t(`${c.clientKey}Client`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <p
                    className="text-white font-bold text-base leading-tight"
                    style={{ fontFamily: 'var(--font-headline)' }}
                  >
                    {t(`${c.clientKey}Client`)}
                  </p>
                  <p
                    className="text-[rgba(225,226,231,0.45)] text-[10px] uppercase tracking-widest mt-0.5"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    {t(`${c.clientKey}Niche`)}
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="p-5 flex flex-col gap-3.5 flex-1">
                {c.metrics.map((m, mi) => (
                  <div key={mi} className="flex items-center justify-between gap-2">
                    <span
                      className="text-[rgba(225,226,231,0.35)] text-[11px] uppercase tracking-widest shrink-0"
                      style={{ fontFamily: 'var(--font-label)' }}
                    >
                      {t(m.labelKey)}
                    </span>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[rgba(225,226,231,0.2)] text-sm line-through tabular-nums shrink-0">
                        {fmtNum(m.before, m.isTime, m.isDec)}
                      </span>
                      <span className="text-[rgba(225,226,231,0.15)] text-xs">→</span>
                      <span
                        className="text-[#e1e2e7] font-bold text-sm tabular-nums shrink-0"
                        data-counter
                        data-after={m.after}
                        data-time={m.isTime ? 'true' : 'false'}
                        data-dec={m.isDec ? 'true' : 'false'}
                      >
                        {fmtNum(0, m.isTime, m.isDec)}
                      </span>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ml-0.5"
                        style={{ background: 'rgba(92,109,255,0.15)', color: '#bdc2ff', border: '1px solid rgba(92,109,255,0.2)' }}
                      >
                        {growthPct(m.before, m.after)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
