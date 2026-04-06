'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { TIKTOK_VIDEOS } from '@/lib/data';
import { getGsap } from '@/lib/gsap-cdn';
import type { YtVideo } from '@/lib/youtube';

function YtIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 18/26)} viewBox="0 0 26 18" fill="none">
      <rect width="26" height="18" rx="4" fill="#FF0000"/>
      <polygon points="10,5 10,13 19,9" fill="white"/>
    </svg>
  );
}

function TtIcon({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 18/16)} viewBox="0 0 16 18" fill="none">
      <path d="M11.5 0C11.5 0 12 4 16 4.5V7.5C13 7.3 10.4 5.3 10.4 5.3V12.8C10.4 15.7 8 18 5.2 18C2.4 18 0 15.7 0 13C0 10.3 2.4 8 5.2 8C5.6 8 6 8.1 6.4 8.2V11.4C6 11.3 5.6 11.2 5.2 11.2C4.1 11.2 3.2 12.1 3.2 13.2C3.2 14.3 4.1 15.2 5.2 15.2C6.3 15.2 7.2 14.3 7.2 13.2V0H11.5Z" fill="white"/>
    </svg>
  );
}

function YtMockup({ videos, onVideoClick }: { videos: YtVideo[]; onVideoClick: (id: string) => void }) {
  return (
    <div id="yt-channel-mockup" style={{ display: 'block' }}>
      <div className="yt-chrome-bar">
        <div className="flex items-center gap-2 flex-shrink-0">
          <YtIcon />
          <span className="yt-chrome-wordmark">YouTube</span>
        </div>
        <div className="yt-chrome-url">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          youtube.com
        </div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#bdc2ff] to-[#e0b6ff] flex-shrink-0" />
      </div>
      <div className="yt-filter-bar">
        {['All', 'Travel', 'Cinematic', 'Short Film', 'Urban'].map((chip, i) => (
          <button key={chip} className={`yt-filter-chip${i === 0 ? ' yt-filter-active' : ''}`}>{chip}</button>
        ))}
      </div>
      <div className="yt-videos-grid">
        {videos.map(v => (
          <div key={v.id} className="yt-video-card" onClick={() => onVideoClick(v.id)}>
            <div className="yt-video-thumb-wrap">
              <Image
                className="yt-video-thumb"
                src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`}
                alt={v.title}
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                loading="lazy"
              />
              <span className="yt-video-badge">{v.duration}</span>
            </div>
            <div className="yt-video-info">
              <div className="yt-video-avatar">
                {v.channelThumb && (
                  <Image
                    src={v.channelThumb}
                    alt={v.channel}
                    width={36}
                    height={36}
                    loading="lazy"
                  />
                )}
              </div>
              <div>
                <p className="yt-video-title">{v.title}</p>
                <p className="yt-video-meta">{v.channel}</p>
                <p className="yt-video-meta">{v.views} &nbsp;•&nbsp; {v.ago}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TtMockup() {
  return (
    <div id="tt-channel-mockup" style={{ display: 'block' }}>
      <div className="tt-chrome-bar">
        <div className="flex items-center gap-2 flex-shrink-0">
          <TtIcon size={16} />
          <span className="tt-chrome-wordmark">TikTok</span>
        </div>
        <div className="yt-chrome-url">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          tiktok.com
        </div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#bdc2ff] to-[#e0b6ff] flex-shrink-0" />
      </div>
      <div className="tt-tab-bar">
        {['Following', 'For You', 'Explore'].map((tab) => (
          <button key={tab} className={`tt-tab${tab === 'For You' ? ' tt-tab-active' : ''}`}>{tab}</button>
        ))}
      </div>
      <div className="tt-videos-grid">
        {TIKTOK_VIDEOS.map((v, i) => (
          <a
            key={i}
            className="tt-video-card"
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Bekijk reel ${i + 1} op Instagram`}
          >
            {v.thumb ? (
              <Image
                className="tt-video-thumb"
                src={v.thumb}
                alt={`Reel ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, 200px"
                loading="lazy"
              />
            ) : (
              <div className="tt-video-placeholder" />
            )}
            <div className="tt-video-play">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white" opacity="0.9"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio({ ytVideos }: { ytVideos: YtVideo[] }) {
  const t = useTranslations('portfolio');
  const [ytOpen, setYtOpen] = useState(false);
  const [ttOpen, setTtOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState<string | null>(null);

  const ytTeaserRef = useRef<HTMLDivElement>(null);
  const ytMockupRef = useRef<HTMLDivElement>(null);
  const ttTeaserRef = useRef<HTMLDivElement>(null);
  const ttMockupRef = useRef<HTMLDivElement>(null);

  const openYt = () => {
    const gsap = getGsap();
    if (!gsap || !ytTeaserRef.current || !ytMockupRef.current) return;
    gsap.timeline()
      .to(ytTeaserRef.current,  { opacity: 0, y: -10, duration: 0.3, ease: 'power2.in' })
      .set(ytTeaserRef.current,  { display: 'none' })
      .set(ytMockupRef.current,  { display: 'block' })
      .fromTo(ytMockupRef.current,
        { opacity: 0, scale: 0.94, y: 32 },
        { opacity: 1, scale: 1,    y: 0, duration: 0.65, ease: 'power3.out' },
      );
    setYtOpen(true);
  };

  const openTt = () => {
    const gsap = getGsap();
    if (!gsap || !ttTeaserRef.current || !ttMockupRef.current) return;
    gsap.timeline()
      .to(ttTeaserRef.current,  { opacity: 0, y: -10, duration: 0.3, ease: 'power2.in' })
      .set(ttTeaserRef.current,  { display: 'none' })
      .set(ttMockupRef.current,  { display: 'block' })
      .fromTo(ttMockupRef.current,
        { opacity: 0, scale: 0.94, y: 32 },
        { opacity: 1, scale: 1,    y: 0, duration: 0.65, ease: 'power3.out' },
      );
    setTtOpen(true);
  };

  const openModal = (id: string) => setModalVideo(id);
  const closeModal = () => setModalVideo(null);

  return (
    <section id="work" className="py-28 relative section-snap section-dark">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-12 fade-up">
          <span className="text-[#bdc2ff] tracking-[0.35em] uppercase text-xs mb-4 block font-semibold" style={{ fontFamily: 'var(--font-label)' }}>
            {t('label')}
          </span>
          <h2 className="font-bold text-5xl text-[#e1e2e7] mb-5" style={{ fontFamily: 'var(--font-headline)' }}>
            {t('title')}
          </h2>
          <p className="text-[#c6c6cb] max-w-md mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            {t('sub')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* YouTube Card */}
          <div className="platform-card fade-up">
            <div className="platform-accent platform-accent-yt" />

            <div ref={ytTeaserRef} className="platform-card-teaser" style={{ display: ytOpen ? 'none' : 'flex' }}>
              <div className="platform-card-brand">
                <YtIcon size={36} />
                <div>
                  <h3 className="font-bold text-white text-xl" style={{ fontFamily: 'var(--font-headline)' }}>YouTube</h3>
                </div>
              </div>
              <p className="platform-card-desc">{t('ytCardDesc')}</p>
              <button className="yt-open-btn" onClick={openYt}>
                <svg width="16" height="11" viewBox="0 0 26 18" fill="none">
                  <rect width="26" height="18" rx="4" fill="white" fillOpacity="0.9"/>
                  <polygon points="10,5 10,13 19,9" fill="#FF0000"/>
                </svg>
                {t('openYoutube')}
              </button>
            </div>

            <div ref={ytMockupRef} style={{ display: 'none' }}>
              <YtMockup videos={ytVideos} onVideoClick={openModal} />
            </div>
          </div>

          {/* TikTok Card */}
          <div className="platform-card fade-up">
            <div className="platform-accent platform-accent-tt" />

            <div ref={ttTeaserRef} className="platform-card-teaser" style={{ display: ttOpen ? 'none' : 'flex' }}>
              <div className="platform-card-brand">
                <TtIcon size={30} />
                <div>
                  <h3 className="font-bold text-white text-xl" style={{ fontFamily: 'var(--font-headline)' }}>TikTok &amp; Reels</h3>
                </div>
              </div>
              <p className="platform-card-desc">{t('ttCardDesc')}</p>
              <button className="tt-open-btn" onClick={openTt}>
                <TtIcon size={14} />
                {t('openTiktok')}
              </button>
            </div>

            <div ref={ttMockupRef} style={{ display: 'none' }}>
              <TtMockup />
            </div>
          </div>

        </div>
      </div>

      {/* YouTube Lightbox */}
      {modalVideo && (
        <div
          id="yt-modal"
          style={{ display: 'flex' }}
          onClick={closeModal}
        >
          <div className="yt-modal-inner" onClick={e => e.stopPropagation()}>
            <iframe
              id="yt-iframe"
              src={`https://www.youtube.com/embed/${modalVideo}?autoplay=1&rel=0`}
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
            <button className="yt-modal-close" onClick={closeModal}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
