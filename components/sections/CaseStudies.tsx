'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { loadGsap, getGsap } from '@/lib/gsap-cdn';
import { prefersReducedMotion } from '@/lib/animations';
import { YT_VIDEOS } from '@/lib/data';

/* ─── helpers ─── */
function growthPct(before: number, after: number): number {
  return Math.round(((after - before) / before) * 100);
}
function fmtK(n: number): string {
  if (n >= 10000) return Math.round(n / 1000) + 'K';
  if (n >= 1000)  return (n / 1000).toFixed(1) + 'K';
  return String(n);
}
function fmtWatchTime(n: number): string {
  const m = Math.floor(n / 60);
  const s = Math.floor(n % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
function fmtDisplay(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000)    return Math.round(n / 1000) + 'K';
  return String(Math.round(n));
}

/* ─── data ─── */
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

/* ─── Detail panel (uitklap) ─── */
function DetailPanel({ clientKey, t }: { clientKey: string; t: (k: string) => string }) {
  const detail = CLIENT_DETAILS[clientKey];
  if (!detail) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-6 pb-6 pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="relative rounded-xl overflow-hidden bg-[#0d1535]" style={{ height: '160px' }}>
        <Image src={`https://img.youtube.com/vi/${detail.videoId}/maxresdefault.jpg`} alt={t(`${clientKey}Client`)} fill sizes="50vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3">
          <p className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-headline)' }}>{t(`${clientKey}Client`)}</p>
          <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ fontFamily: 'var(--font-label)', color: 'rgba(225,226,231,0.45)' }}>{t(`${clientKey}Niche`)}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-3.5">
        {detail.metrics.map((m, i) => {
          const isTime = m.labelKey === 'watchTime';
          const pct = growthPct(m.before, m.after);
          return (
            <div key={i} className="flex items-center justify-between gap-3">
              <span className="text-[10px] uppercase tracking-widest" style={{ fontFamily: 'var(--font-label)', color: 'rgba(189,194,255,0.4)' }}>{t(m.labelKey)}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm line-through tabular-nums" style={{ color: 'rgba(225,226,231,0.2)' }}>{isTime ? fmtWatchTime(m.before) : fmtK(m.before)}</span>
                <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: '0.65rem' }}>→</span>
                <span className="text-sm font-bold tabular-nums text-[#e1e2e7]">{isTime ? fmtWatchTime(m.after) : fmtK(m.after)}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(92,109,255,0.15)', color: '#bdc2ff', border: '1px solid rgba(92,109,255,0.2)', fontFamily: 'var(--font-label)' }}>+{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── ROI Calculator ─── */
const MULTIPLIERS = {
  platform: { youtube: 1.0, instagram: 1.3, tiktok: 1.5 },
  niche:    { coaching: 1.2, business: 1.15, fitness: 1.35, tech: 1.1, lifestyle: 1.25 },
};
const SUBS_RATE: Record<string, number> = { youtube: 0.08, instagram: 0.12, tiktok: 0.15 };

function RoiCalculator({ t }: { t: (k: string) => string }) {
  const [platform, setPlatform] = useState<'youtube' | 'instagram' | 'tiktok'>('youtube');
  const [niche, setNiche]       = useState<keyof typeof MULTIPLIERS.niche>('coaching');
  const [views, setViews]       = useState(1000);
  const [freq, setFreq]         = useState(2);

  const pm       = MULTIPLIERS.platform[platform];
  const nm       = MULTIPLIERS.niche[niche];
  const viewMult = pm * nm * 1.8;
  const newViews = Math.round(views * viewMult);
  const viewGrowth = Math.round((viewMult - 1) * 100);
  const subsPerMonth = Math.round(newViews * freq * SUBS_RATE[platform]);
  const extraContent = Math.round(freq * 1.8) - freq;
  const barPct = Math.min(88, 15 + viewGrowth / 5);

  const platforms = [
    { val: 'youtube' as const,   label: 'YouTube' },
    { val: 'instagram' as const, label: 'Instagram' },
    { val: 'tiktok' as const,    label: 'TikTok' },
  ];
  const niches = [
    { val: 'coaching' as const,   label: t('roiCoaching') },
    { val: 'business' as const,   label: t('roiBusiness') },
    { val: 'fitness' as const,    label: t('roiFitness') },
    { val: 'tech' as const,       label: t('roiTech') },
    { val: 'lifestyle' as const,  label: t('roiLifestyle') },
  ];
  const freqs = [
    { val: 1,  label: t('roiFreq1') },
    { val: 2,  label: t('roiFreq2') },
    { val: 4,  label: t('roiFreq4') },
    { val: 12, label: t('roiFreq12') },
  ];

  const chipBase: React.CSSProperties = { fontFamily: 'var(--font-label)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', padding: '5px 12px', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'rgba(225,226,231,0.35)', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' };
  const chipActive: React.CSSProperties = { ...chipBase, background: 'rgba(92,109,255,0.15)', border: '1px solid rgba(92,109,255,0.4)', color: '#bdc2ff' };

  return (
    <div className="rounded-2xl overflow-hidden flex flex-col h-full" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Header */}
      <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase block mb-1" style={{ fontFamily: 'var(--font-label)', color: 'rgba(189,194,255,0.45)' }}>{t('roiLabel')}</span>
        <h3 className="font-bold text-[#e1e2e7] leading-tight" style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)' }}>{t('roiTitle')}</h3>
      </div>

      <div className="p-6 flex flex-col gap-5 flex-1">
        {/* Platform */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2.5" style={{ fontFamily: 'var(--font-label)', color: 'rgba(189,194,255,0.35)' }}>Platform</p>
          <div className="flex flex-wrap gap-2">
            {platforms.map(p => (
              <button key={p.val} style={platform === p.val ? chipActive : chipBase} onClick={() => setPlatform(p.val)}>{p.label}</button>
            ))}
          </div>
        </div>

        {/* Niche */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2.5" style={{ fontFamily: 'var(--font-label)', color: 'rgba(189,194,255,0.35)' }}>Niche</p>
          <div className="flex flex-wrap gap-2">
            {niches.map(n => (
              <button key={n.val} style={niche === n.val ? chipActive : chipBase} onClick={() => setNiche(n.val)}>{n.label}</button>
            ))}
          </div>
        </div>

        {/* Views slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-label)', color: 'rgba(189,194,255,0.35)' }}>{t('roiViews')}</p>
            <span className="font-bold text-[#bdc2ff] text-base tabular-nums" style={{ fontFamily: 'var(--font-headline)' }}>{fmtDisplay(views)}</span>
          </div>
          <input
            type="range" min={100} max={100000} step={100} value={views}
            onChange={e => setViews(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: '#5c6dff', height: '4px', cursor: 'pointer' }}
          />
          <div className="flex justify-between mt-1">
            <span className="text-[9px]" style={{ color: 'rgba(225,226,231,0.2)', fontFamily: 'var(--font-label)' }}>100</span>
            <span className="text-[9px]" style={{ color: 'rgba(225,226,231,0.2)', fontFamily: 'var(--font-label)' }}>100K</span>
          </div>
        </div>

        {/* Freq */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2.5" style={{ fontFamily: 'var(--font-label)', color: 'rgba(189,194,255,0.35)' }}>{t('roiFreqLabel')}</p>
          <div className="flex flex-wrap gap-2">
            {freqs.map(f => (
              <button key={f.val} style={freq === f.val ? chipActive : chipBase} onClick={() => setFreq(f.val)}>{f.label}</button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="rounded-xl p-5 flex flex-col gap-4 mt-auto" style={{ background: 'rgba(92,109,255,0.06)', border: '1px solid rgba(92,109,255,0.12)' }}>
          <p className="text-[9px] font-bold tracking-[0.25em] uppercase" style={{ fontFamily: 'var(--font-label)', color: 'rgba(189,194,255,0.4)' }}>{t('roiResult')}</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: t('roiResViews'), value: fmtDisplay(newViews), sub: `+${viewGrowth}%`, highlight: true },
              { label: t('roiResSubs'),  value: '+' + fmtDisplay(subsPerMonth), sub: t('roiPerMonth') },
              { label: t('roiResContent'), value: '+' + extraContent + '×', sub: t('roiSameHours') },
            ].map((r, i) => (
              <div key={i}>
                <p className="text-[9px] uppercase tracking-widest mb-1" style={{ fontFamily: 'var(--font-label)', color: 'rgba(189,194,255,0.35)' }}>{r.label}</p>
                <p className="font-bold tabular-nums leading-none" style={{ fontFamily: 'var(--font-headline)', fontSize: '1.4rem', background: r.highlight ? 'linear-gradient(135deg, #bdc2ff, #e0b6ff)' : undefined, WebkitBackgroundClip: r.highlight ? 'text' : undefined, WebkitTextFillColor: r.highlight ? 'transparent' : undefined, color: r.highlight ? undefined : '#e1e2e7' }}>{r.value}</p>
                <p className="text-[9px] mt-0.5" style={{ color: 'rgba(225,226,231,0.25)', fontFamily: 'var(--font-label)' }}>{r.sub}</p>
              </div>
            ))}
          </div>
          {/* Bar */}
          <div>
            <div className="flex justify-between text-[9px] mb-1.5" style={{ color: 'rgba(225,226,231,0.25)', fontFamily: 'var(--font-label)' }}>
              <span>{t('roiNow')}</span><span>{t('roiAfter')}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="h-full rounded-full" style={{ width: `${barPct}%`, background: 'linear-gradient(90deg, #5c6dff, #6d11ad, #e0b6ff)', transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)' }} />
            </div>
          </div>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="w-full flex items-center justify-center gap-2 font-bold text-sm text-white"
          style={{ background: 'linear-gradient(135deg, #5c6dff, #6d11ad)', padding: '0.85rem', borderRadius: '9px', textDecoration: 'none', boxShadow: '0 0 28px rgba(109,17,173,0.4)', fontFamily: 'var(--font-label)', letterSpacing: '0.05em', transition: 'filter 0.2s' }}
        >
          {t('roiCta')} →
        </a>
        <p className="text-[9px] text-center" style={{ color: 'rgba(225,226,231,0.18)', fontFamily: 'var(--font-label)' }}>{t('roiDisclaimer')}</p>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function CaseStudies() {
  const t = useTranslations('caseStudies');
  const sectionRef = useRef<HTMLElement>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
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
          gsap.to(obj, { val: after, duration: 1.8, delay: i * 0.05, ease: 'power2.out', onUpdate() { el.textContent = fmtK(Math.round(obj.val)); }, onComplete() { el.textContent = fmtK(after); } });
        });
      });
    }, { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="case-studies" className="py-28 px-8 section-snap section-muted relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none" style={{ height: '220px', background: 'linear-gradient(to bottom, #0d1117, #0e1220)' }} />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12 fade-up">
          <span className="text-[#bdc2ff] tracking-[0.35em] uppercase text-xs mb-4 block font-semibold" style={{ fontFamily: 'var(--font-label)' }}>{t('label')}</span>
          <h2 className="font-bold text-5xl text-[#e1e2e7]" style={{ fontFamily: 'var(--font-headline)' }}>{t('title')}</h2>
          <p className="text-[rgba(225,226,231,0.5)] mt-4 text-base max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{t('sub')}</p>
          <p className="text-[rgba(189,194,255,0.3)] text-xs mt-2 tracking-wide" style={{ fontFamily: 'var(--font-label)' }}>{t('clickHint')}</p>
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch fade-up">

          {/* Left: Leaderboard */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            {/* Column headers */}
            <div className="grid items-center px-5 py-3" style={{ gridTemplateColumns: '28px 1fr 90px 70px 70px 76px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              {['#', t('colClient'), t('colPlatform'), t('colBefore'), t('colAfter'), t('colGrowth'), ''].map((h, i) => (
                <span key={i} className="text-[9px] uppercase tracking-[0.18em] font-semibold" style={{ fontFamily: 'var(--font-label)', color: 'rgba(189,194,255,0.4)', textAlign: i >= 3 && i <= 5 ? 'right' : 'left' }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {ROWS.map((row, i) => {
              const pct    = growthPct(row.before, row.after);
              const isTop  = i === 0;
              const rowId  = `${row.clientKey}-${row.metricKey}`;
              const isOpen = openKey === rowId;
              return (
                <div key={rowId} style={{ borderBottom: i < ROWS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: isOpen ? 'rgba(92,109,255,0.07)' : isTop ? 'rgba(92,109,255,0.04)' : 'transparent', transition: 'background 0.2s' }}>
                  <button onClick={() => setOpenKey(isOpen ? null : rowId)} className="w-full text-left" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <div className="grid items-center px-5 py-3.5" style={{ gridTemplateColumns: '28px 1fr 90px 70px 70px 76px 20px' }}>
                      <span className="font-bold text-xs tabular-nums" style={{ fontFamily: 'var(--font-label)', color: isTop ? '#e0b6ff' : 'rgba(225,226,231,0.2)' }}>{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <p className="text-xs font-semibold text-[#e1e2e7] leading-tight" style={{ fontFamily: 'var(--font-headline)' }}>{t(`${row.clientKey}Client`)}</p>
                        <p className="text-[9px] uppercase tracking-widest mt-0.5" style={{ fontFamily: 'var(--font-label)', color: 'rgba(189,194,255,0.4)' }}>{t(row.metricKey)}</p>
                      </div>
                      <div><span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ fontFamily: 'var(--font-label)', background: PLATFORM_COLORS[row.platform], color: PLATFORM_TEXT[row.platform], letterSpacing: '0.06em' }}>{row.platform}</span></div>
                      <span className="text-xs tabular-nums line-through text-right block" style={{ color: 'rgba(225,226,231,0.2)' }}>{fmtK(row.before)}</span>
                      <span className="text-xs font-bold tabular-nums text-right block text-[#e1e2e7]" data-counter data-after={row.after}>0</span>
                      <div className="flex justify-end"><span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: isTop ? 'rgba(92,109,255,0.2)' : 'rgba(92,109,255,0.1)', color: isTop ? '#bdc2ff' : 'rgba(189,194,255,0.55)', border: isTop ? '1px solid rgba(92,109,255,0.3)' : '1px solid transparent', fontFamily: 'var(--font-label)' }}>+{pct}%</span></div>
                      <span className="material-symbols-outlined text-[rgba(189,194,255,0.3)]" style={{ fontSize: '0.9rem', transition: 'transform 0.25s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                    </div>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s cubic-bezier(0.22,1,0.36,1)' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <DetailPanel clientKey={row.clientKey} t={t} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: ROI Calculator */}
          <div>
            <RoiCalculator t={t} />
          </div>

        </div>
      </div>
    </section>
  );
}
