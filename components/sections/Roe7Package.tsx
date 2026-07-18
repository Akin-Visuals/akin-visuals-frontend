'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

/* ── Category visualisations (line-art, matching the Services cards) ── */

// Content Creatie — video frame with play + REC + timeline
function ContentArt() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect x="30" y="16" width="100" height="46" rx="6" fill="rgba(92,109,255,0.08)" stroke="rgba(92,109,255,0.45)" strokeWidth="1.2" />
      {/* REC dot */}
      <circle cx="40" cy="25" r="2.4" fill="rgba(224,182,255,0.9)" />
      <text x="46" y="27.2" fontSize="5" fill="rgba(189,194,255,0.7)" fontFamily="monospace">REC</text>
      {/* Play triangle */}
      <path d="M74 30 L92 39 L74 48 Z" fill="rgba(224,182,255,0.7)" />
      {/* Timeline */}
      <rect x="30" y="72" width="100" height="6" rx="3" fill="rgba(255,255,255,0.05)" />
      <rect x="30" y="72" width="58" height="6" rx="3" fill="rgba(92,109,255,0.5)" />
      <rect x="86" y="69" width="2" height="12" rx="1" fill="rgba(224,182,255,0.7)" />
    </svg>
  );
}

// Content Strategie — monthly planning grid with linked days
function StrategyArt() {
  const cells = Array.from({ length: 20 });
  const active = new Set([2, 6, 11, 15]);
  return (
    <svg width="100%" height="100%" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {cells.map((_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 34 + col * 20;
        const y = 20 + row * 15;
        const on = active.has(i);
        return (
          <rect
            key={i}
            x={x} y={y} width="13" height="10" rx="2.5"
            fill={on ? 'rgba(224,182,255,0.18)' : 'rgba(255,255,255,0.03)'}
            stroke={on ? 'rgba(224,182,255,0.6)' : 'rgba(189,194,255,0.18)'}
            strokeWidth="1"
          />
        );
      })}
      {/* Path linking the planned days */}
      <path
        d="M47 25 L67 40 L107 55 L67 70"
        fill="none"
        stroke="rgba(189,194,255,0.35)"
        strokeWidth="1.3"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

// Online Zichtbaarheid & Beheer — rising trend with bars
function VisibilityArt() {
  const bars = [
    { x: 34, h: 14 }, { x: 52, h: 22 }, { x: 70, h: 30 },
    { x: 88, h: 26 }, { x: 106, h: 40 }, { x: 124, h: 50 },
  ];
  return (
    <svg width="100%" height="100%" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <line x1="28" y1="72" x2="138" y2="72" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x} y={72 - b.h} width="10" height={b.h} rx="2"
          fill={`rgba(189,194,255,${0.14 + i * 0.06})`}
          stroke="rgba(189,194,255,0.4)"
          strokeWidth="0.8"
        />
      ))}
      {/* Trend line + arrow */}
      <path d="M39 56 L57 48 L75 40 L93 44 L111 30 L129 20" fill="none" stroke="rgba(224,182,255,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M122 18 L131 18 L131 27" fill="none" stroke="rgba(224,182,255,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Promotiemateriaal — poster + QR code
function PromoArt() {
  const qr = [
    [1, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 1, 1],
    [0, 0, 0, 1, 1, 0, 0],
    [1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1],
  ];
  return (
    <svg width="100%" height="100%" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* Poster */}
      <rect x="26" y="16" width="52" height="58" rx="5" fill="rgba(92,109,255,0.07)" stroke="rgba(189,194,255,0.4)" strokeWidth="1.2" />
      <rect x="33" y="24" width="38" height="14" rx="2" fill="rgba(224,182,255,0.25)" />
      <rect x="33" y="44" width="38" height="2.6" rx="1.3" fill="rgba(189,194,255,0.35)" />
      <rect x="33" y="50" width="30" height="2.6" rx="1.3" fill="rgba(189,194,255,0.25)" />
      <rect x="33" y="56" width="34" height="2.6" rx="1.3" fill="rgba(189,194,255,0.25)" />
      <rect x="33" y="65" width="18" height="5" rx="2.5" fill="rgba(92,109,255,0.4)" />
      {/* QR */}
      <g transform="translate(96 26)">
        <rect x="-6" y="-6" width="50" height="50" rx="5" fill="rgba(255,255,255,0.03)" stroke="rgba(224,182,255,0.35)" strokeWidth="1" />
        {qr.map((row, r) =>
          row.map((v, c) =>
            v ? <rect key={`${r}-${c}`} x={c * 5.4} y={r * 5.4} width="4.4" height="4.4" rx="0.8" fill="rgba(224,182,255,0.65)" /> : null
          )
        )}
      </g>
    </svg>
  );
}

// One distinct icon per benefit (order matches roe7.intro.benefits)
const BENEFIT_ICONS = [
  // Vast team
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </>,
  // Consistente output
  <>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </>,
  // Volledig beheer
  <>
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </>,
  // Drukklaar promotiemateriaal
  <>
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </>,
];

const CATEGORIES = [
  { key: 'content',    Art: ContentArt,    accent: '#5c6dff', accentBg: 'rgba(92,109,255,0.05)' },
  { key: 'strategy',   Art: StrategyArt,   accent: '#e0b6ff', accentBg: 'rgba(109,17,173,0.06)' },
  { key: 'visibility', Art: VisibilityArt, accent: '#bdc2ff', accentBg: 'rgba(92,109,255,0.04)' },
  { key: 'promo',      Art: PromoArt,      accent: '#e0b6ff', accentBg: 'rgba(109,17,173,0.05)' },
] as const;

export default function Roe7Package() {
  const t = useTranslations('roe7');
  const [active, setActive] = useState(0);

  const cat = CATEGORIES[active];
  const items = t.raw(`cats.${cat.key}.items`) as string[];
  const benefits = t.raw('intro.benefits') as string[];

  return (
    <section id="partnership" className="py-28 px-8 relative overflow-hidden section-snap">
      {/* Top fade — blends out of the muted Services section */}
      <div
        className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
        style={{ height: '220px', background: 'linear-gradient(to bottom, #0e1220, #0d1117)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12 fade-up flex flex-col items-center">
          <span
            className="text-[#e0b6ff] tracking-[0.35em] uppercase text-xs mb-4 block font-semibold"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            {t('label')}
          </span>
          <h2
            className="font-bold text-4xl sm:text-5xl text-[#e1e2e7]"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {t('title')}
          </h2>
        </div>

        {/* Tabbed container */}
        <div
          className="fade-up rounded-3xl p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-x-8 lg:gap-y-8"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Tab bar — on mobile it sits right above the panel */}
          <div
            role="tablist"
            aria-label={t('title')}
            className="order-2 lg:order-1 lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-2.5 p-2 rounded-2xl"
            style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            {CATEGORIES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className="flex items-center justify-center text-center px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-label)',
                    color: isActive ? '#e1e2e7' : 'rgba(225,226,231,0.45)',
                    background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
                    border: isActive ? '1px solid rgba(224,182,255,0.20)' : '1px solid transparent',
                    boxShadow: isActive ? '0 4px 20px rgba(109,17,173,0.18)' : 'none',
                  }}
                >
                  {t(`cats.${c.key}.title`)}
                </button>
              );
            })}
          </div>

          {/* Left — static: co-branding + intro + key benefits */}
          <div className="order-1 lg:order-2 flex flex-col justify-center lg:justify-start p-2 sm:p-4 lg:py-2">
              {/* Big co-branded lockup */}
              <div className="flex items-center justify-center gap-6 sm:gap-9 mb-9">
                <Image src="/brand_assets/logowit.png" alt="AKIN" width={240} height={84} className="h-16 sm:h-24 w-auto object-contain" />
                <span className="text-3xl sm:text-4xl font-thin text-[rgba(225,226,231,0.3)] select-none">×</span>
                <Image
                  src="/brand_assets/logoroe7.webp"
                  alt="ROE7"
                  width={360}
                  height={314}
                  className="h-16 sm:h-24 w-auto object-contain"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>

              <h3
                className="font-bold leading-tight mb-4"
                style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', color: '#e1e2e7' }}
              >
                {t('intro.heading')}
              </h3>
              <p
                className="text-sm sm:text-base leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-body)', color: 'rgba(225,226,231,0.5)', maxWidth: '440px' }}
              >
                {t('intro.text')}
              </p>

              {/* Trial highlight (replaces price) */}
              <div
                className="w-full flex items-center justify-center rounded-full px-5 py-3 mb-8"
                style={{
                  background: 'rgba(109,17,173,0.10)',
                  border: '1px solid rgba(224,182,255,0.30)',
                  boxShadow: '0 0 32px rgba(109,17,173,0.18)',
                }}
              >
                <span className="gradient-text font-bold text-base sm:text-lg text-center" style={{ fontFamily: 'var(--font-headline)', letterSpacing: '0.02em' }}>
                  {t('trial')}
                </span>
              </div>

              {/* Benefits grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {benefits.map((b, i) => (
                  <div key={i} className="roe7-benefit flex items-center gap-4 rounded-2xl p-5">
                    <div className="roe7-benefit-icon w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {BENEFIT_ICONS[i] ?? BENEFIT_ICONS[0]}
                      </svg>
                    </div>
                    <span className="text-sm leading-snug font-medium" style={{ fontFamily: 'var(--font-body)', color: 'rgba(225,226,231,0.82)' }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — per-tab panel, styled as an app/tab card */}
            <div
              className="order-3 rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.45), 0 0 40px rgba(109,17,173,0.10)',
              }}
            >
              {/* Window chrome header */}
              <div
                className="flex items-center gap-3 px-5 py-3.5 flex-shrink-0"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.22)' }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.14)' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.14)' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.14)' }} />
                </div>
              </div>

              {/* Body (fades on tab switch) */}
              <div key={cat.key} className="ba-fade flex flex-col flex-1">
                {/* Visualisation — fixed min height on mobile, flexes on desktop to match the left column */}
                <div
                  className="relative flex-1 min-h-[200px] lg:min-h-0"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                    background: 'radial-gradient(circle at 50% 42%, rgba(109,17,173,0.16), rgba(92,109,255,0.05) 46%, transparent 72%)',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="w-full" style={{ maxWidth: '240px', aspectRatio: '160 / 90' }}>
                      <cat.Art />
                    </div>
                  </div>
                </div>

                <div className="p-7 sm:p-9 flex-shrink-0">
                <h4
                  className="font-bold leading-tight mb-2"
                  style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#e1e2e7' }}
                >
                  {t(`cats.${cat.key}.title`)}
                </h4>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ fontFamily: 'var(--font-body)', color: 'rgba(225,226,231,0.45)' }}
                >
                  {t(`cats.${cat.key}.desc`)}
                </p>
                <ul className="flex flex-col gap-3">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        className="mt-[9px] flex-shrink-0 rounded-full"
                        style={{ width: '5px', height: '5px', background: cat.accent }}
                      />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)', color: 'rgba(225,226,231,0.65)' }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                </div>
              </div>
            </div>
        </div>

        {/* Exclusions strip */}
        <div
          className="fade-up mt-4 rounded-2xl px-7 py-5 flex flex-col sm:flex-row sm:items-center gap-4"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.10)' }}
        >
          <span
            className="text-[11px] tracking-[0.2em] uppercase font-semibold flex-shrink-0"
            style={{ fontFamily: 'var(--font-label)', color: 'rgba(225,226,231,0.35)' }}
          >
            {t('excludedLabel')}
          </span>
          <div className="flex flex-wrap gap-2.5">
            {(t.raw('excluded') as string[]).map((ex, i) => (
              <span
                key={i}
                className="text-xs rounded-full px-3 py-1"
                style={{ fontFamily: 'var(--font-label)', color: 'rgba(225,226,231,0.45)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {ex}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="fade-up mt-12 flex justify-center">
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
              padding: '0.9rem 2.4rem',
              borderRadius: '9px',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              boxShadow: '0 0 32px rgba(109,17,173,0.45)',
            }}
          >
            {t('cta')}
          </a>
        </div>

      </div>
    </section>
  );
}
