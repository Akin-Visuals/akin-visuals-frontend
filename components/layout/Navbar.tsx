'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <header id="navbar">
      <div id="navbar-inner" className="mx-4 lg:mx-8">
        <a href="#" className="select-none flex-shrink-0">
          <Image src="/brand_assets/logowit.png" alt="AKIN" width={80} height={28} className="h-7 w-auto object-contain" />
        </a>

        <div className="nav-divider" />

        <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
          <a href="#about"        className="nav-link">{t('about')}</a>
          <a href="#work"         className="nav-link">{t('portfolio')}</a>
          <a href="#testimonials" className="nav-link">{t('testimonials')}</a>
          <a href="#services"     className="nav-link">{t('services')}</a>
        </nav>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="lang-switcher">
            <button
              onClick={() => switchLocale('en')}
              aria-label="English"
              className={`lang-btn ${locale === 'en' ? 'is-active' : 'is-inactive'}`}
            >
              <span className="lang-flag">🇬🇧</span>
              <span>EN</span>
            </button>
            <div className="lang-divider" />
            <button
              onClick={() => switchLocale('nl')}
              aria-label="Nederlands"
              className={`lang-btn ${locale === 'nl' ? 'is-active' : 'is-inactive'}`}
            >
              <span className="lang-flag">🇳🇱</span>
              <span>NL</span>
            </button>
          </div>
          <a href="#contact" className="nav-cta">{t('cta')}</a>
        </div>
      </div>
    </header>
  );
}
