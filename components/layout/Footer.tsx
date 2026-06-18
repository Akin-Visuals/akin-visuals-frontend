import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { DesignCredit } from '@/components/design-credit';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="section-snap pt-24 px-8 relative overflow-hidden border-t border-white/5">
      <div className="blob w-[500px] h-[300px] bg-[rgba(92,109,255,0.08)] bottom-0 left-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <p className="text-[rgba(225,226,231,0.35)] text-sm uppercase tracking-[0.3em] mb-8" style={{ fontFamily: 'var(--font-label)' }}>
            {t('tagline')}
          </p>
          <h2 className="font-bold leading-none mb-10" style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(3.5rem,9vw,8rem)', letterSpacing: '0.03em' }}>
            <span className="text-[#e1e2e7]">{t('line1')}</span><br />
            <span style={{ background: 'linear-gradient(135deg,#bdc2ff,#e0b6ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t('line2')}</span><br />
            <span className="text-[#e1e2e7]">{t('line3')}</span>
          </h2>
          <a href="#contact" className="btn-primary px-12 py-5 rounded-xl font-bold text-base glow-purple">
            {t('cta')}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
          <p className="text-[rgba(225,226,231,0.2)] text-xs" style={{ fontFamily: 'var(--font-label)' }}>
            © {new Date().getFullYear()} AKIN Visuals. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="footer-link">{t('privacy')}</Link>
            <Link href="/terms" className="footer-link">{t('terms')}</Link>
            <a href="https://www.instagram.com/akin_visuals/" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
          </div>
        </div>
        <DesignCredit />
      </div>
    </footer>
  );
}
