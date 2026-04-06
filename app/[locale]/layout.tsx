import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../globals.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://akinvisuals.com'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://akinvisuals.com',
      type: 'website',
      images: [{ url: '/brand_assets/screen.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    other: {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'AKIN Visuals',
        description: 'Video editing agency for coaches and personal brands.',
        url: 'https://akinvisuals.com',
        serviceType: ['Video Editing', 'Content Strategy', 'Short-Form Content Creation'],
        areaServed: 'Worldwide',
        priceRange: '$$',
      }),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'nl')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://akinvisuals.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;600;700&family=Inter:wght@400;600&display=optional&subset=latin"
          rel="stylesheet"
          fetchPriority="high"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0&display=optional"
          rel="stylesheet"
        />
      </head>
      <body className="selection:bg-[#bdc2ff] selection:text-[#000447]">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
