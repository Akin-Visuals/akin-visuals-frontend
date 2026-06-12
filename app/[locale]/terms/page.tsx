import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function TermsPage() {
  const t = await getTranslations('terms');

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e1e2e7]">
      <div className="max-w-3xl mx-auto px-8 py-24">
        <Link href="/" className="text-[#bdc2ff] hover:text-[#e0b6ff] text-sm uppercase tracking-[0.2em] mb-8 inline-block" style={{ fontFamily: 'var(--font-label)' }}>
          ← {t('back')}
        </Link>
        <h1 className="font-bold text-4xl lg:text-5xl mb-12" style={{ fontFamily: 'var(--font-headline)' }}>
          {t('title')}
        </h1>

        <div className="prose prose-invert prose-sm lg:prose-base max-w-none space-y-8" style={{ fontFamily: 'var(--font-body)' }}>
          <p className="text-[#c6c6cb] leading-relaxed">{t('intro')}</p>

          <section>
            <h3 className="font-bold text-xl text-white mb-3" style={{ fontFamily: 'var(--font-headline)' }}>{t('servicesTitle')}</h3>
            <p className="text-[#c6c6cb] leading-relaxed">{t('servicesText')}</p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-white mb-3" style={{ fontFamily: 'var(--font-headline)' }}>{t('clientTitle')}</h3>
            <p className="text-[#c6c6cb] leading-relaxed">{t('clientText')}</p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-white mb-3" style={{ fontFamily: 'var(--font-headline)' }}>{t('paymentTitle')}</h3>
            <p className="text-[#c6c6cb] leading-relaxed">{t('paymentText')}</p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-white mb-3" style={{ fontFamily: 'var(--font-headline)' }}>{t('ipTitle')}</h3>
            <p className="text-[#c6c6cb] leading-relaxed">{t('ipText')}</p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-white mb-3" style={{ fontFamily: 'var(--font-headline)' }}>{t('liabilityTitle')}</h3>
            <p className="text-[#c6c6cb] leading-relaxed">{t('liabilityText')}</p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-white mb-3" style={{ fontFamily: 'var(--font-headline)' }}>{t('terminationTitle')}</h3>
            <p className="text-[#c6c6cb] leading-relaxed">{t('terminationText')}</p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-white mb-3" style={{ fontFamily: 'var(--font-headline)' }}>{t('changesTitle')}</h3>
            <p className="text-[#c6c6cb] leading-relaxed">{t('changesText')}</p>
          </section>

          <p className="text-[rgba(225,226,231,0.3)] text-sm pt-8">{t('updated')}</p>
        </div>
      </div>
    </div>
  );
}
