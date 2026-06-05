'use client';

import { useState } from 'react';
import Script from 'next/script';
import { useTranslations } from 'next-intl';

const CALENDLY_URL = 'https://calendly.com/ramazanaliakin2006/30min';

export default function Contact() {
  const t = useTranslations('contact');
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="contact" className="py-28 px-8 fade-up section-snap relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none" style={{ height: '220px', background: 'linear-gradient(to bottom, #0e1220, #0d1117)' }} />

      <div className="max-w-6xl mx-auto relative z-10">

        <div className="text-center mb-16">
          <span
            className="text-[#e0b6ff] tracking-[0.35em] uppercase text-xs mb-4 block font-semibold"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            {t('label')}
          </span>
          <h2
            className="font-bold text-[#e1e2e7] mb-5"
            style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.05 }}
          >
            {t('title')}
          </h2>
          <p
            className="text-[#c6c6cb] text-lg max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('sub')}
          </p>
        </div>

        <div className="contact-grid">

          {/* Left — Context */}
          <div className="contact-context">
            <div className="contact-context-card">
              <span className="contact-context-label">{t('ctaLabel')}</span>
              <h3 className="contact-context-heading">{t('ctaTitle')}</h3>
              <p className="contact-context-sub">{t('ctaSub')}</p>

              <ul className="contact-checklist">
                {(['item1', 'item2', 'item3', 'item4'] as const).map((key) => (
                  <li key={key}>
                    <span className="contact-checklist-dot" />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Calendly */}
          <div className="contact-widget-wrap">
            <div className="contact-widget">
              {!loaded && (
                <div className="contact-loader">
                  <div className="calendly-loader" />
                  <p>{t('loading')}</p>
                </div>
              )}
              <div
                className="calendly-inline-widget"
                data-url={CALENDLY_URL}
                data-color-scheme="dark"
                data-hide-branding="true"
                style={{ minWidth: '320px', height: '680px' }}
              />
            </div>
          </div>

        </div>
      </div>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />
    </section>
  );
}
