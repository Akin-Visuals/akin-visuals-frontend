'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { REEL_VIDEOS, REEL_MARQUEE_ROW1, REEL_MARQUEE_ROW2, type ReelVideo } from '@/lib/data';
import { getGsap } from '@/lib/gsap-cdn';
import type { YtVideo } from '@/lib/youtube';
import { YT_TO_CLIENT, type ClientId } from '@/lib/analytics-data';
import dynamic from 'next/dynamic';

const ProjectDetail = dynamic(() => import('@/components/ui/ProjectDetail'));
const ReelDetail = dynamic(() => import('@/components/ui/ReelDetail'));

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

function YtMockup({ videos, onVideoClick }: { videos: YtVideo[]; onVideoClick: (v: YtVideo) => void }) {
  const [failedThumbs, setFailedThumbs] = useState<Set<string>>(new Set());

  const getThumbSrc = (id: string) =>
    failedThumbs.has(id)
      ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
      : `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  const onThumbError = (id: string) => {
    if (!failedThumbs.has(id)) {
      setFailedThumbs(prev => new Set(prev).add(id));
    }
  };

  return (
    <div id="yt-channel-mockup">
      <div className="yt-chrome-bar">
        <div className="flex items-center gap-2 flex-shrink-0">
          <YtIcon />
          <span className="yt-chrome-wordmark">YouTube</span>
        </div>
        <div className="yt-chrome-url">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          youtube.com
        </div>
        <Image src="/brand_assets/logowit.png" alt="AKIN" width={28} height={28} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
      </div>
      <div className="yt-filter-bar">
        {['All', 'Travel', 'Cinematic', 'Short Film', 'Urban'].map((chip, i) => (
          <button key={chip} className={`yt-filter-chip${i === 0 ? ' yt-filter-active' : ''}`}>{chip}</button>
        ))}
      </div>
      <div className="yt-videos-grid">
        {videos.map(v => (
          <div key={v.id} className="yt-video-card" onClick={() => onVideoClick(v)}>
            <div className="yt-video-thumb-wrap">
              <Image
                className="yt-video-thumb"
                src={getThumbSrc(v.id)}
                alt={v.title}
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                loading="lazy"
                onError={() => onThumbError(v.id)}
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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-index'));
          const video = videoRefs.current[idx];
          if (!video) return;
          
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: [0, 0.5, 1],
        root: null,
      }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div id="tt-channel-mockup">
      <div className="tt-chrome-bar">
        <div className="flex items-center gap-2 flex-shrink-0">
          <TtIcon size={16} />
          <span className="tt-chrome-wordmark">TikTok</span>
        </div>
        <div className="yt-chrome-url">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          tiktok.com
        </div>
        <Image src="/brand_assets/logowit.png" alt="AKIN" width={28} height={28} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
      </div>
      <div className="tt-tab-bar">
        {['Following', 'For You', 'Explore'].map((tab) => (
          <button key={tab} className={`tt-tab${tab === 'For You' ? ' tt-tab-active' : ''}`}>{tab}</button>
        ))}
      </div>
      <div className="tt-videos-feed">
        {REEL_VIDEOS.map((v, i) => (
          <div 
            key={i} 
            ref={(el) => { itemRefs.current[i] = el; }}
            data-index={i}
            className="tt-video-item"
          >
            <div className="tt-video-card">
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                className="tt-video-thumb"
                src={v.src}
                preload="none"
                playsInline
                muted
                loop
                controls={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3-row auto-scrolling YouTube wall (row 1 → left, rows 2 & 3 → right)
function YtMarquee({ videos, onVideoClick }: { videos: YtVideo[]; onVideoClick: (v: YtVideo) => void }) {
  if (!videos.length) return null;

  // Split into 3 distinct groups so each row shows different videos (no cross-row repeat)
  const n = videos.length;
  const s0 = Math.floor(n / 3) + (n % 3 > 0 ? 1 : 0);
  const s1 = Math.floor(n / 3) + (n % 3 > 1 ? 1 : 0);
  const rows: { dir: 'left' | 'right'; items: YtVideo[] }[] = [
    { dir: 'left',  items: videos.slice(0, s0) },        // row 1: right → left
    { dir: 'right', items: videos.slice(s0, s0 + s1) },  // row 2: left → right
    { dir: 'left',  items: videos.slice(s0 + s1) },      // row 3: right → left
  ];

  return (
    <div className="yt-marquee fade-up">
      {rows.map((row, ri) => (
        <div key={ri} className={`yt-marquee-row yt-marquee-${row.dir}`}>
          <div className="yt-marquee-track">
            {[...row.items, ...row.items].map((v, i) => (
              <button
                key={`${v.id}-${i}`}
                type="button"
                className="yt-marquee-card"
                onClick={() => onVideoClick(v)}
                aria-label={v.title || 'YouTube video'}
              >
                <Image
                  src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                  alt={v.title || ''}
                  fill
                  sizes="320px"
                  className="yt-marquee-thumb"
                />
                <span className="yt-marquee-play" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Single auto-scrolling Reel row
function ReelMarquee({ videos, dir, onReelClick }: { videos: ReelVideo[]; dir: 'left' | 'right'; onReelClick: (v: ReelVideo) => void }) {
  if (!videos.length) return null;

  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-vid');
          if (!id) return;
          const video = videoRefs.current.get(id);
          if (!video) return;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25, root: null }
    );
    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });
    return () => observer.disconnect();
  }, []);

  // Duplicate enough times so the track fills the viewport (card width ~286px incl. gap)
  const repeat = Math.max(1, Math.ceil(2400 / ((videos.length || 1) * 286)));
  const track = [...Array(repeat)].flatMap(() => videos);

  return (
    <div className="reel-marquee fade-up">
      <div className={`yt-marquee-row yt-marquee-${dir}`}>
        <div className="yt-marquee-track">
          {[...track, ...track].map((v, i) => {
            const vid = `${v.id}-${i}`;
            return (
            <button
              key={vid}
              ref={(el) => { if (el) itemRefs.current.set(vid, el); }}
              data-vid={vid}
              type="button"
              className="reel-marquee-card"
              onClick={() => onReelClick(v)}
              aria-label={v.title || 'Reel'}
            >
              <video
                ref={(el) => { if (el) videoRefs.current.set(vid, el); }}
                src={v.src}
                muted
                loop
                playsInline
                preload="auto"
                className="reel-marquee-thumb"
              />
              <span className="yt-marquee-play" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio({ ytVideos }: { ytVideos: YtVideo[] }) {
  // Set to true to restore the old YouTube/TikTok platform cards below
  const SHOW_LEGACY_PLATFORMS = false;
  const t = useTranslations('portfolio');
  const [ytOpen, setYtOpen] = useState(false);
  const [ttOpen, setTtOpen] = useState(false);
  const [projectDetail, setProjectDetail] = useState<{
    videoId: string;
    title: string;
    channel: string;
    views: string;
    clientId: ClientId;
  } | null>(null);
  const [reelDetail, setReelDetail] = useState<{
    src: string;
    title: string;
    client: string;
  } | null>(null);

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
      .set(ytMockupRef.current,  { display: 'flex' })
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
      .set(ttMockupRef.current,  { display: 'flex' })
      .fromTo(ttMockupRef.current,
        { opacity: 0, scale: 0.94, y: 32 },
        { opacity: 1, scale: 1,    y: 0, duration: 0.65, ease: 'power3.out' },
      );
    setTtOpen(true);
  };

  const openProjectDetail = (video: YtVideo) => {
    setReelDetail(null);
    const clientId = YT_TO_CLIENT[video.id] || 'coach-x';
    setProjectDetail({
      videoId: video.id,
      title: video.title,
      channel: video.channel,
      views: video.views,
      clientId,
    });
  };
  const closeProjectDetail = () => setProjectDetail(null);

  const openReelDetail = (video: ReelVideo) => {
    setProjectDetail(null);
    setReelDetail({
      src: video.src,
      title: video.title,
      client: video.client,
    });
  };
  const closeReelDetail = () => setReelDetail(null);

  return (
    <section id="work" className="py-28 relative section-snap section-dark">
      <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none" style={{ height: '220px', background: 'linear-gradient(to bottom, #0d1117, #0d1117)' }} />
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

        {/* New: 3-row auto-scrolling YouTube wall */}
        <YtMarquee videos={ytVideos} onVideoClick={openProjectDetail} />

        {/* New: 2-row auto-scrolling Reel wall */}
        <ReelMarquee videos={REEL_MARQUEE_ROW1} dir="left" onReelClick={openReelDetail} />
        <ReelMarquee videos={REEL_MARQUEE_ROW2} dir="right" onReelClick={openReelDetail} />

        {/* Legacy platform cards — preserved, toggle SHOW_LEGACY_PLATFORMS to restore */}
        {SHOW_LEGACY_PLATFORMS && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* YouTube Card */}
          <div className="platform-card fade-up min-h-[280px] h-auto">
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

            <div ref={ytMockupRef} style={{ display: 'none' }} className="flex flex-col h-[500px] lg:h-[550px]">
              <YtMockup videos={ytVideos} onVideoClick={openProjectDetail} />
            </div>
          </div>

          {/* TikTok Card */}
          <div className="platform-card fade-up min-h-[280px] h-auto">
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

            <div ref={ttMockupRef} style={{ display: 'none' }} className="flex flex-col h-[500px] lg:h-[550px]">
              <TtMockup />
            </div>
          </div>

        </div>
        )}
      </div>

      {/* Project Detail overlay */}
      {projectDetail && (
        <ProjectDetail
          videoId={projectDetail.videoId}
          title={projectDetail.title}
          channel={projectDetail.channel}
          views={projectDetail.views}
          clientId={projectDetail.clientId}
          onClose={closeProjectDetail}
        />
      )}

      {/* Reel Detail overlay */}
      {reelDetail && (
        <ReelDetail
          src={reelDetail.src}
          title={reelDetail.title}
          client={reelDetail.client}
          onClose={closeReelDetail}
        />
      )}
    </section>
  );
}
