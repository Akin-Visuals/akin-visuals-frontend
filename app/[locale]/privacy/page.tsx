import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: `${t('title')} — AKIN Visuals`,
    alternates: {
      canonical: `https://akinvisual.com/${locale}/privacy`,
    },
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy');

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
            <h3 className="font-bold text-xl text-white mb-3" style={{ fontFamily: 'var(--font-headline)' }}>{t('dataTitle')}</h3>
            <p className="text-[#c6c6cb] leading-relaxed">{t('dataText')}</p>
            <ul className="list-disc pl-6 mt-2 text-[#c6c6cb] space-y-1">
              <li>{t('data1')}</li>
              <li>{t('data2')}</li>
              <li>{t('data3')}</li>
              <li>{t('data4')}</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-xl text-white mb-3" style={{ fontFamily: 'var(--font-headline)' }}>{t('purposeTitle')}</h3>
            <p className="text-[#c6c6cb] leading-relaxed">{t('purposeText')}</p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-white mb-3" style={{ fontFamily: 'var(--font-headline)' }}>{t('sharingTitle')}</h3>
            <p className="text-[#c6c6cb] leading-relaxed">{t('sharingText')}</p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-white mb-3" style={{ fontFamily: 'var(--font-headline)' }}>{t('storageTitle')}</h3>
            <p className="text-[#c6c6cb] leading-relaxed">{t('storageText')}</p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-white mb-3" style={{ fontFamily: 'var(--font-headline)' }}>{t('rightsTitle')}</h3>
            <p className="text-[#c6c6cb] leading-relaxed">{t('rightsText')}</p>
            <ul className="list-disc pl-6 mt-2 text-[#c6c6cb] space-y-1">
              <li>{t('right1')}</li>
              <li>{t('right2')}</li>
              <li>{t('right3')}</li>
              <li>{t('right4')}</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-xl text-white mb-3" style={{ fontFamily: 'var(--font-headline)' }}>{t('cookiesTitle')}</h3>
            <p className="text-[#c6c6cb] leading-relaxed">{t('cookiesText')}</p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-white mb-3" style={{ fontFamily: 'var(--font-headline)' }}>{t('contactTitle')}</h3>
            <p className="text-[#c6c6cb] leading-relaxed">{t('contactText')}</p>
          </section>

          <p className="text-[rgba(225,226,231,0.3)] text-sm pt-8">{t('updated')}</p>
        </div>
      </div>
    </div>
  );
}
