import { useTranslations } from 'next-intl';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  const stars = Array(5).fill(null);

  return (
    <section id="testimonials" className="py-28 px-8 max-w-7xl mx-auto section-snap">
      <h2 className="font-bold text-4xl mb-16 text-center text-[#e1e2e7] fade-up" style={{ fontFamily: 'var(--font-headline)' }}>
        {t('title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="glass-card p-10 fade-up">
          <div className="flex gap-1 mb-6">
            {stars.map((_, i) => (
              <span key={i} className="material-symbols-outlined star-filled">star</span>
            ))}
          </div>
          <p className="text-xl italic text-[#c6c6cb] leading-relaxed mb-8">{t('t1')}</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#000447] to-[#6d11ad] flex items-center justify-center text-white font-bold text-sm ring-2 ring-[rgba(189,194,255,0.2)]" style={{ fontFamily: 'var(--font-headline)' }}>JR</div>
            <div>
              <p className="font-bold text-[#e1e2e7]">{t('t1Name')}</p>
              <p className="text-xs text-[#bdc2ff] uppercase tracking-widest" style={{ fontFamily: 'var(--font-label)' }}>{t('t1Role')}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-10 fade-up" style={{ transitionDelay: '0.1s' }}>
          <div className="flex gap-1 mb-6">
            {stars.map((_, i) => (
              <span key={i} className="material-symbols-outlined star-filled">star</span>
            ))}
          </div>
          <p className="text-xl italic text-[#c6c6cb] leading-relaxed mb-8">{t('t2')}</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6d11ad] to-[#000447] flex items-center justify-center text-white font-bold text-sm ring-2 ring-[rgba(189,194,255,0.2)]" style={{ fontFamily: 'var(--font-headline)' }}>SC</div>
            <div>
              <p className="font-bold text-[#e1e2e7]">{t('t2Name')}</p>
              <p className="text-xs text-[#bdc2ff] uppercase tracking-widest" style={{ fontFamily: 'var(--font-label)' }}>{t('t2Role')}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
