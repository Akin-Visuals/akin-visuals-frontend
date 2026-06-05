'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const FAQ_ITEMS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

export default function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-28 relative overflow-hidden section-snap section-dark">
      <div
        className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
        style={{ height: '220px', background: 'linear-gradient(to bottom, #0d1117, #0d1117)' }}
      />

      <div className="max-w-5xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16 fade-up">
          <span
            className="text-[#e0b6ff] tracking-[0.35em] uppercase text-xs mb-4 block font-semibold"
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
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((key, i) => {
            const isOpen = openIndex === i;
            const num = String(i + 1).padStart(2, '0');

            return (
              <div key={key} className="faq-item fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <button
                  className="faq-trigger"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-num" data-active={isOpen}>{num}</span>
                  <h3 className="faq-question">{t(`${key}Q`)}</h3>
                  <span className={`faq-indicator${isOpen ? ' is-open' : ''}`}>
                    <span className="faq-indicator-bar" />
                    <span className="faq-indicator-bar" />
                  </span>
                </button>
                <div className={`faq-answer-wrap${isOpen ? ' is-open' : ''}`}>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      <p>{t(`${key}A`)}</p>
                    </div>
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
