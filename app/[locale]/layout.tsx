import type { Metadata } from 'next';
import { Bebas_Neue, Manrope, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
  preload: true,
});

const manrope = Manrope({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  preload: true,
});

const inter = Inter({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-label',
  preload: true,
});

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
    metadataBase: new URL('https://akinvisual.com'),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://akinvisual.com/${locale}`,
      languages: {
        en: 'https://akinvisual.com/en',
        nl: 'https://akinvisual.com/nl',
      },
    },
    icons: {
      icon: '/brand_assets/logowit.png',
      apple: '/brand_assets/logowit.png',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://akinvisual.com/${locale}`,
      type: 'website',
      images: [{ url: '/brand_assets/screen.png', width: 1200, height: 630, alt: t('title') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/brand_assets/screen.png'],
    },
    other: {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'AKIN Visuals',
        description: 'Video editing agency for coaches and personal brands.',
        url: 'https://akinvisual.com',
        logo: 'https://akinvisual.com/brand_assets/logowit.png',
        serviceType: ['Video Editing', 'Content Strategy', 'Short-Form Content Creation'],
        areaServed: 'Worldwide',
        priceRange: '$$',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '3',
        },
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
    <html lang={locale} className={`dark ${bebasNeue.variable} ${manrope.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
