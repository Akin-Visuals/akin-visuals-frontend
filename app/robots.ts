import type { MetadataRoute } from 'next';

const BASE_URL = 'https://akinvisual.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
