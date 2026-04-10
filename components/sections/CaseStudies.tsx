'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { loadGsap, getGsap } from '@/lib/gsap-cdn';
import { prefersReducedMotion } from '@/lib/animations';
import { YT_VIDEOS } from '@/lib/data';

function growthPct(before: number, after: number): number {
  return Math.round(((after - before) / before) * 100);
}

function fmtK(n: number): string {
  if (n >= 10000) return Math.round(n / 1000) + 'K';
  if (n >= 1000)  return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

const CLIENT_DETAILS: Record<string, {
  videoId: string;
  nicheKey: string;
  metrics: { labelKey: string; before: number; after: number }[];
}> = {
  c1: {
    videoId: YT_VIDEOS[0].id,
    nicheKey: 'c1Niche',
    metrics: [
      { labelKey: 'views',     before: 1200,  after: 28400 },
      { labelKey: 'subs',      before: 5000,  after: 40000 },
      { labelKey: 'watchTime', before: 72,    after: 285   },
    ],
  },
  c2: {
    videoId: YT_VIDEOS[1].id,
    nicheKey: 'c2Niche',
    metrics: [
      { labelKey: 'views',     before: 800,   after: 15200 },
      { labelKey: 'followers', before: 8000,  after: 35000 },
      { labelKey: 'shares',    before: 45,    after: 890   },
    ],
  },
  c3: {
    videoId: YT_VIDEOS[2].id,
    nicheKey: 'c3Niche',
    metrics: [
      { labelKey: 'views',     before: 3000,  after: 52000 },
      { labelKey: 'subs',      before: 12000, after: 65000 },
      { labelKey: 'watchTime', before: 95,    after: 312   },
    ],
  },
};

const ROWS = [
  { clientKey: 'c1', platform: 'YouTube',   metricKey: 'views',     before: 1200,  after: 28400 },
  { clientKey: 'c2', platform: 'Instagram', metricKey: 'followers', before: 8000,  after: 35000 },
  { clientKey: 'c3', platform: 'YouTube',   metricKey: 'views',     before: 3000,  after: 52000 },
  { clientKey: 'c1', platform: 'YouTube',   metricKey: 'subs',      before: 5000,  after: 40000 },
  { clientKey: 'c2', platform: 'Instagram', metricKey: 'shares',    before: 45,    after: 890   },
  { clientKey: 'c3', platform: 'YouTube',   metricKey: 'subs',      before: 12000, after: 65000 },
].sort((a, b) => growthPct(b.before, b.after) - growthPct(a.before, a.after));

const PLATFORM_COLORS: Record<string, string> = {
  YouTube:   'rgba(255,80,80,0.15)',
  Instagram: 'rgba(189,194,255,0.1)',
};
const PLATFORM_TEXT: Record<string, string> = {
  YouTube:   '#ff8080',
  Instagram: '#bdc2ff',
};

function fmtWatchTime(n: number): string {
  const m = Math.floor(n / 60);
  const s = Math.floor(n % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function DetailPanel({ clientKey, t }: { clientKey: string; t: (k: string) => string }) {
  const detail = CLIENT_DETAILS[clientKey];
  if (!detail) return null;

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-5 px-6 pb-6 pt-1"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Thumbnail */}
      <div className="relative rounded-xl overflow-hidden bg-[#0d1535]" style={{ height: '180px' }}>
        <Image
          src={`https://img.youtube.com/vi/${detail.videoId}/maxresdefault.jpg`}
          alt={t(`${clientKey}Client`)}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3">
          <p className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-headline)' }}>
            {t(`${clientKey}Client`)}
          </p>
          <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ fontFamily: 'var(--font-label)', color: 'rgba(225,226,231,0.45)' }}>
            {t(`${clientKey}Niche`)}
          </p>
        </div>
      </div>

      {/* All metrics */}
      <div className="flex flex-col justify-center gap-4">
        {detail.metrics.map((m, i) => {
          const isTime = m.labelKey === 'watchTime';
          const beforeFmt = isTime ? fmtWatchTime(m.before) : fmtK(m.before);
          const afterFmt  = isTime ? fmtWatchTime(m.after)  : fmtK(m.after);
          const pct = growthPct(m.before, m.after);
          return (
            <div key={i} className="flex items-center justify-between gap-3">
              <span
                className="text-[10px] uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-label)', color: 'rgba(189,194,255,0.4)' }}
              >
                {t(m.labelKey)}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm line-through tabular-nums" style={{ color: 'rgba(225,226,231,0.2)' }}>
                  {beforeFmt}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.65rem' }}>→</span>
                <span className="text-sm font-bold tabular-nums text-[#e1e2e7]">{afterFmt}</span>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(92,109,255,0.15)', color: '#bdc2ff', border: '1px solid rgba(92,109,255,0.2)', fontFamily: 'var(--font-label)' }}
                >
                  +{pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const t = useTranslations('caseStudies');
  const sectionRef  = useRef<HTMLElement>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);

  // Animated counters on scroll into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const counters = section.querySelectorAll<HTMLElement>('[data-counter]');

        if (prefersReducedMotion()) {
          counters.forEach(el => { el.textContent = fmtK(Number(el.dataset.after)); });
          return;
        }

        loadGsap().then(() => {
          const gsap = getGsap();
          if (!gsap) return;

          counters.forEach((el, i) => {
            const after = Number(el.dataset.after);
            const obj = { val: 0 };
            gsap.to(obj, {
              val: after,
              duration: 1.8,
              delay: i * 0.05,
              ease: 'power2.out',
              onUpdate()  { el.textContent = fmtK(Math.round(obj.val)); },
              onComplete(){ el.textContent = fmtK(after); },
            });
          });
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="py-28 px-8 section-snap section-muted relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none" style={{ height: '140px', background: 'linear-gradient(to bottom, #0d1117, #0e1220)' }} />
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14 fade-up">
          <span
            className="text-[#bdc2ff] tracking-[0.35em] uppercase text-xs mb-4 block font-semibold"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            {t('label')}
          </span>
          <h2 className="font-bold text-5xl text-[#e1e2e7]" style={{ fontFamily: 'var(--font-headline)' }}>
            {t('title')}
          </h2>
          <p
            className="text-[rgba(225,226,231,0.5)] mt-4 text-base max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('sub')}
          </p>
          <p
            className="text-[rgba(189,194,255,0.35)] text-xs mt-3 tracking-wide"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            {t('clickHint')}
          </p>
        </div>

        {/* Leaderboard */}
        <div className="fade-up rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>

          {/* Column headers */}
          <div
            className="grid items-center px-6 py-3"
            style={{
              gridTemplateColumns: '32px 1fr 110px 80px 80px 90px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            {['#', t('colClient'), t('colPlatform'), t('colBefore'), t('colAfter'), t('colGrowth'), ''].map((h, i) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-[0.2em] font-semibold"
                style={{
                  fontFamily: 'var(--font-label)',
                  color: 'rgba(189,194,255,0.4)',
                  textAlign: i >= 3 && i <= 5 ? 'right' : 'left',
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => {
            const pct    = growthPct(row.before, row.after);
            const isTop  = i === 0;
            const rowId  = `${row.clientKey}-${row.metricKey}`;
            const isOpen = openKey === rowId;

            return (
              <div
                key={rowId}
                style={{
                  borderBottom: i < ROWS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  background: isOpen
                    ? 'rgba(92,109,255,0.07)'
                    : isTop
                    ? 'rgba(92,109,255,0.04)'
                    : 'transparent',
                  transition: 'background 0.2s',
                }}
              >
                {/* Clickable row */}
                <button
                  onClick={() => setOpenKey(isOpen ? null : rowId)}
                  className="w-full text-left"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <div
                    className="grid items-center px-6 py-4"
                    style={{ gridTemplateColumns: '32px 1fr 110px 80px 80px 90px 24px' }}
                  >
                    {/* Rank */}
                    <span
                      className="font-bold text-sm tabular-nums"
                      style={{ fontFamily: 'var(--font-label)', color: isTop ? '#e0b6ff' : 'rgba(225,226,231,0.2)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Client + metric */}
                    <div>
                      <p className="text-sm font-semibold text-[#e1e2e7] leading-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                        {t(`${row.clientKey}Client`)}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ fontFamily: 'var(--font-label)', color: 'rgba(189,194,255,0.4)' }}>
                        {t(row.metricKey)}
                      </p>
                    </div>

                    {/* Platform */}
                    <div>
                      <span
                        className="text-[10px] font-bold px-2 py-1 rounded-full"
                        style={{ fontFamily: 'var(--font-label)', background: PLATFORM_COLORS[row.platform], color: PLATFORM_TEXT[row.platform], letterSpacing: '0.08em' }}
                      >
                        {row.platform}
                      </span>
                    </div>

                    {/* Before */}
                    <span className="text-sm tabular-nums line-through text-right block" style={{ color: 'rgba(225,226,231,0.2)' }}>
                      {fmtK(row.before)}
                    </span>

                    {/* After */}
                    <span
                      className="text-sm font-bold tabular-nums text-right block text-[#e1e2e7]"
                      data-counter
                      data-after={row.after}
                    >
                      0
                    </span>

                    {/* Growth */}
                    <div className="flex justify-end">
                      <span
                        className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: isTop ? 'rgba(92,109,255,0.2)' : 'rgba(92,109,255,0.1)',
                          color: isTop ? '#bdc2ff' : 'rgba(189,194,255,0.6)',
                          border: isTop ? '1px solid rgba(92,109,255,0.3)' : '1px solid transparent',
                          fontFamily: 'var(--font-label)',
                        }}
                      >
                        +{pct}%
                      </span>
                    </div>

                    {/* Chevron */}
                    <span
                      className="material-symbols-outlined text-[rgba(189,194,255,0.3)]"
                      style={{ fontSize: '1rem', transition: 'transform 0.25s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      expand_more
                    </span>
                  </div>
                </button>

                {/* Detail panel */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.3s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <DetailPanel clientKey={row.clientKey} t={t} />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
