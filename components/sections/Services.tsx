'use client';

import { useTranslations } from 'next-intl';

// Timeline track art — represents long-form video editing
function TimelineArt() {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-2" aria-hidden="true">
      {[
        { w: '85%', color: 'rgba(92,109,255,0.5)',  delay: 0 },
        { w: '60%', color: 'rgba(189,194,255,0.25)', delay: 0.05 },
        { w: '92%', color: 'rgba(109,17,173,0.45)', delay: 0.1 },
        { w: '45%', color: 'rgba(92,109,255,0.3)',  delay: 0.15 },
        { w: '75%', color: 'rgba(189,194,255,0.2)', delay: 0.2 },
      ].map((t, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: t.color }} />
          <div
            className="h-1.5 rounded-full"
            style={{ width: t.w, background: t.color, opacity: 0.9 }}
          />
        </div>
      ))}
      {/* Playhead */}
      <div
        className="absolute top-0 bottom-0 w-px"
        style={{ left: '38%', background: 'rgba(224,182,255,0.4)' }}
      />
    </div>
  );
}

// Vertical phone shapes — represents short-form / reels
function ReelsArt() {
  const phones = [
    { x: '8%',  scale: 0.85, opacity: 0.25, rotate: '-8deg' },
    { x: '28%', scale: 0.92, opacity: 0.4,  rotate: '-3deg' },
    { x: '50%', scale: 1,    opacity: 0.7,  rotate: '0deg'  },
  ];
  return (
    <div className="w-full h-full relative" aria-hidden="true">
      {phones.map((p, i) => (
        <div
          key={i}
          className="absolute top-1/2"
          style={{
            left: p.x,
            transform: `translateY(-50%) rotate(${p.rotate}) scale(${p.scale})`,
            opacity: p.opacity,
          }}
        >
          <div
            className="rounded-xl"
            style={{
              width: '36px',
              height: '64px',
              border: '2px solid rgba(189,194,255,0.6)',
              background: i === 2 ? 'rgba(92,109,255,0.12)' : 'transparent',
              position: 'relative',
            }}
          >
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(189,194,255,0.4)' }} />
            {i === 2 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div style={{ width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '10px solid rgba(224,182,255,0.6)' }} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Flow diagram — long + short merging into one output
function SystemArt() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 160 80" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* Source nodes */}
      <rect x="4"  y="12" width="44" height="14" rx="4" fill="rgba(92,109,255,0.2)"  stroke="rgba(92,109,255,0.5)"  strokeWidth="1" />
      <rect x="4"  y="54" width="44" height="14" rx="4" fill="rgba(109,17,173,0.2)" stroke="rgba(109,17,173,0.5)" strokeWidth="1" />
      {/* Connecting lines */}
      <path d="M48 19 Q90 19 90 40" stroke="rgba(189,194,255,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
      <path d="M48 61 Q90 61 90 40" stroke="rgba(189,194,255,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
      {/* Center merge node */}
      <circle cx="90" cy="40" r="7" fill="rgba(92,109,255,0.15)" stroke="rgba(189,194,255,0.6)" strokeWidth="1.5" />
      <circle cx="90" cy="40" r="3" fill="rgba(224,182,255,0.7)" />
      {/* Output line */}
      <path d="M97 40 L125 40" stroke="rgba(189,194,255,0.4)" strokeWidth="1.5" />
      {/* Output node */}
      <rect x="125" y="30" width="32" height="20" rx="4" fill="rgba(224,182,255,0.12)" stroke="rgba(224,182,255,0.5)" strokeWidth="1.5" />
      {/* Labels */}
      <text x="26" y="22" textAnchor="middle" fontSize="5" fill="rgba(189,194,255,0.7)" fontFamily="monospace">LONG</text>
      <text x="26" y="64" textAnchor="middle" fontSize="5" fill="rgba(189,194,255,0.7)" fontFamily="monospace">SHORT</text>
      <text x="141" y="43" textAnchor="middle" fontSize="5" fill="rgba(224,182,255,0.8)" fontFamily="monospace">OUTPUT</text>
    </svg>
  );
}

const SERVICES = [
  {
    num: '01',
    key: 's1',
    Art: TimelineArt,
    accent: '#5c6dff',
    accentBg: 'rgba(92,109,255,0.06)',
  },
  {
    num: '02',
    key: 's3',
    Art: SystemArt,
    accent: '#e0b6ff',
    accentBg: 'rgba(109,17,173,0.08)',
    featured: true,
  },
  {
    num: '03',
    key: 's2',
    Art: ReelsArt,
    accent: '#bdc2ff',
    accentBg: 'rgba(92,109,255,0.04)',
  },
];

export default function Services() {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-28 px-8 relative overflow-hidden section-snap section-muted">
      {/* Top fade — blends into previous section */}
      <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none" style={{ height: '140px', background: 'linear-gradient(to bottom, #0d1117, #0e1220)' }} />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-16 fade-up">
          <span
            className="text-[#e0b6ff] tracking-[0.35em] uppercase text-xs mb-4 block font-semibold"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            {t('label')}
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-bold text-5xl text-[#e1e2e7]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              {t('title')}
            </h2>
            <p
              className="text-[rgba(225,226,231,0.35)] text-sm max-w-xs md:text-right leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t('sub')}
            </p>
          </div>
        </div>

        {/* Service panels */}
        <div className="flex flex-col gap-4">
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              className="fade-up group relative rounded-2xl overflow-hidden"
              style={{
                animationDelay: `${i * 0.1}s`,
                background: s.accentBg,
                border: s.featured
                  ? '1px solid rgba(224,182,255,0.18)'
                  : '1px solid rgba(255,255,255,0.06)',
                boxShadow: s.featured
                  ? '0 0 60px rgba(109,17,173,0.12), inset 0 0 40px rgba(109,17,173,0.04)'
                  : 'none',
              }}
            >
              {/* Featured top accent */}
              {s.featured && (
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(224,182,255,0.5), transparent)' }}
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-[1fr_140px_1fr] gap-0 items-stretch">

                {/* Left: number + title + desc */}
                <div className="p-8 md:p-10 flex flex-col justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <span
                      className="font-bold leading-none select-none flex-shrink-0"
                      style={{
                        fontFamily: 'var(--font-headline)',
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        color: s.featured ? 'rgba(224,182,255,0.18)' : 'rgba(255,255,255,0.05)',
                        lineHeight: 1,
                      }}
                    >
                      {s.num}
                    </span>
                    <div className="pt-1.5">
                      {s.featured && (
                        <span
                          className="text-[9px] font-bold tracking-[0.25em] uppercase mb-2 block"
                          style={{ color: '#e0b6ff', fontFamily: 'var(--font-label)' }}
                        >
                          {t('recommended')}
                        </span>
                      )}
                      <h3
                        className="font-bold leading-tight"
                        style={{
                          fontFamily: 'var(--font-headline)',
                          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                          color: '#e1e2e7',
                        }}
                      >
                        {t(`${s.key}Title`)}
                      </h3>
                    </div>
                  </div>

                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: s.featured ? 'rgba(225,226,231,0.6)' : 'rgba(225,226,231,0.35)',
                      maxWidth: '380px',
                    }}
                  >
                    {t(`${s.key}Desc`)}
                  </p>
                </div>

                {/* Center: decorative art */}
                <div
                  className="hidden md:block relative"
                  style={{
                    borderLeft: '1px solid rgba(255,255,255,0.05)',
                    borderRight: '1px solid rgba(255,255,255,0.05)',
                    minHeight: '160px',
                    overflow: 'hidden',
                  }}
                >
                  <s.Art />
                </div>

                {/* Right: CTA area */}
                <div className="p-8 md:p-10 flex flex-col justify-end items-end gap-4">
                  <a
                    href="#contact"
                    className="group/btn flex items-center gap-2 font-bold text-sm transition-all duration-200"
                    style={{
                      color: s.featured ? '#e0b6ff' : 'rgba(189,194,255,0.5)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-label)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {t('cta')}
                    <span
                      className="material-symbols-outlined transition-transform duration-200 group-hover/btn:translate-x-1"
                      style={{ fontSize: '1rem' }}
                    >
                      arrow_forward
                    </span>
                  </a>
                  <p
                    className="text-[10px] text-right"
                    style={{ fontFamily: 'var(--font-label)', color: 'rgba(225,226,231,0.2)', maxWidth: '160px' }}
                  >
                    {t('ctaSub')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
