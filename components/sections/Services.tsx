import { useTranslations } from 'next-intl';

export default function Services() {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-28 px-8 relative overflow-hidden section-snap section-muted">
      <div className="blob w-[600px] h-[600px] bg-[rgba(189,194,255,0.06)] top-0 right-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 fade-up">
          <span className="text-[#e0b6ff] tracking-[0.35em] uppercase text-xs mb-4 block font-semibold" style={{ fontFamily: 'var(--font-label)' }}>
            {t('label')}
          </span>
          <h2 className="font-bold text-5xl text-[#e1e2e7] mb-4" style={{ fontFamily: 'var(--font-headline)' }}>
            {t('title')}
          </h2>
          <p className="text-[#c6c6cb] max-w-xl mx-auto">{t('sub')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">

          {/* Long-Form */}
          <div className="glass-card p-6 sm:p-10 relative fade-up flex flex-col">
            <div className="mb-6">
              <span className="material-symbols-outlined text-[#bdc2ff] mb-4 block" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>movie</span>
              <h4 className="font-bold text-lg sm:text-xl text-[#e1e2e7]" style={{ fontFamily: 'var(--font-headline)' }}>{t('s1Title')}</h4>
            </div>
            <p className="text-[#c6c6cb] text-sm leading-relaxed flex-1" style={{ fontFamily: 'var(--font-body)' }}>{t('s1Desc')}</p>
          </div>

          {/* Content System (featured) */}
          <div className="glass-card plan-active p-6 sm:p-10 relative fade-up flex flex-col" style={{ transitionDelay: '0.1s' }}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e0b6ff] text-[#4c007d] px-3 sm:px-5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest whitespace-nowrap" style={{ fontFamily: 'var(--font-label)' }}>
              {t('recommended')}
            </div>
            <div className="mb-6">
              <span className="material-symbols-outlined text-[#e0b6ff] mb-4 block" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>hub</span>
              <h4 className="font-bold text-xl sm:text-2xl text-[#e1e2e7]" style={{ fontFamily: 'var(--font-headline)' }}>{t('s3Title')}</h4>
            </div>
            <p className="text-[#e1e2e7] text-sm leading-relaxed flex-1" style={{ fontFamily: 'var(--font-body)' }}>{t('s3Desc')}</p>
          </div>

          {/* Short-Form */}
          <div className="glass-card p-6 sm:p-10 relative fade-up flex flex-col" style={{ transitionDelay: '0.2s' }}>
            <div className="mb-6">
              <span className="material-symbols-outlined text-[#bdc2ff] mb-4 block" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>smartphone</span>
              <h4 className="font-bold text-lg sm:text-xl text-[#e1e2e7]" style={{ fontFamily: 'var(--font-headline)' }}>{t('s2Title')}</h4>
            </div>
            <p className="text-[#c6c6cb] text-sm leading-relaxed flex-1" style={{ fontFamily: 'var(--font-body)' }}>{t('s2Desc')}</p>
          </div>

        </div>

        <div className="text-center mt-14 fade-up">
          <a href="#contact" className="btn-primary px-10 py-4 rounded-xl font-bold text-base glow-purple inline-block">
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
