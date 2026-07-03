import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://akinvisual.com';

const staticPages = ['', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date('2026-07-03'),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.3,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((alt) => [alt, `${BASE_URL}/${alt}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
