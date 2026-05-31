'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

function FlagGB() {
  return (
    <svg width="16" height="12" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="polygon(0% 35%, 100% 35%, 100% 65%, 0% 65%)" />
      <rect y="12" width="60" height="6" fill="#FFF" />
      <rect x="24" width="12" height="30" fill="#FFF" />
      <rect y="12" width="60" height="4" fill="#C8102E" />
      <rect x="26" width="8" height="30" fill="#C8102E" />
    </svg>
  );
}

function FlagNL() {
  return (
    <svg width="16" height="12" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="10" fill="#AE1C28" />
      <rect y="10" width="60" height="10" fill="#FFF" />
      <rect y="20" width="60" height="10" fill="#33A1FD" />
    </svg>
  );
}

const NAV_LINKS = ['services', 'portfolio', 'caseStudies', 'testimonials', 'about'] as const;
const HREF_MAP: Record<string, string> = {
  services: '#services',
  portfolio: '#work',
  caseStudies: '#case-studies',
  testimonials: '#testimonials',
  about: '#about',
};

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
  };

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    if (menuOpen) {
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen, closeMenu]);

  const navLinks = NAV_LINKS.map((key) => (
    <a key={key} href={HREF_MAP[key]} className="nav-link" onClick={closeMenu}>
      {t(key)}
    </a>
  ));

  return (
    <header id="navbar">
      <div id="navbar-inner">
        <a href="#" className="select-none flex-shrink-0">
          <Image src="/brand_assets/logowit.png" alt="AKIN" width={110} height={38} className="h-10 w-auto object-contain" priority />
        </a>

        <nav className="hidden md:flex items-center gap-8 justify-center">
          {navLinks}
        </nav>

        <div className="flex items-center gap-3 justify-end">
          <div className="desktop-only lang-switcher">
            <button
              onClick={() => switchLocale('en')}
              aria-label="English"
              className={`lang-btn ${locale === 'en' ? 'is-active' : 'is-inactive'}`}
            >
              <FlagGB />
              <span>EN</span>
            </button>
            <div className="lang-divider" />
            <button
              onClick={() => switchLocale('nl')}
              aria-label="Nederlands"
              className={`lang-btn ${locale === 'nl' ? 'is-active' : 'is-inactive'}`}
            >
              <FlagNL />
              <span>NL</span>
            </button>
          </div>
          <a href="#contact" className="nav-cta">{t('cta')}</a>

          <button
            id="hamburger"
            className={`flex flex-col items-center justify-center ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-drawer" className={menuOpen ? 'is-open' : ''}>
        <div id="mobile-backdrop" onClick={closeMenu} />

        <div id="mobile-panel">
          <nav id="mobile-nav">
            {navLinks}
          </nav>

          <div id="mobile-lang">
            <button
              onClick={() => switchLocale('en')}
              className={`lang-btn ${locale === 'en' ? 'is-active' : 'is-inactive'}`}
            >
              <FlagGB />
              <span>EN</span>
            </button>
            <div className="lang-divider" />
            <button
              onClick={() => switchLocale('nl')}
              className={`lang-btn ${locale === 'nl' ? 'is-active' : 'is-inactive'}`}
            >
              <FlagNL />
              <span>NL</span>
            </button>
          </div>

          <a href="#contact" className="nav-cta" onClick={closeMenu}>{t('cta')}</a>
        </div>
      </div>
    </header>
  );
}
