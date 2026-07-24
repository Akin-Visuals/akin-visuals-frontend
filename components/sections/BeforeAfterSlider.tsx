'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

const RAW_SRC = 'https://pub-8f8ca6f5c6854719baa62fc4abbb3086.r2.dev/reels/before-portfolio-3%20%281%29.mp4';   // before (raw)
const EDITED_SRC = 'https://pub-8f8ca6f5c6854719baa62fc4abbb3086.r2.dev/reels/portfolio-3.mp4';        // after (edited)

// Horizontal lean of the divider: top and bottom edges sit SLANT/2 either side
// of `pos`, so the knob (at `pos`, vertically centered) rests on the line.
const SLANT = 5;

export default function BeforeAfterSlider() {
  const t = useTranslations('hero');
  const wrapRef = useRef<HTMLDivElement>(null);
  const rawVideoRef = useRef<HTMLVideoElement | null>(null);
  const editedVideoRef = useRef<HTMLVideoElement | null>(null);
  const draggingRef = useRef(false);
  const [pos, setPos] = useState(50); // percent — centre of the divider
  const [ready, setReady] = useState(false);

  // Wait until BOTH videos can play before showing them together
  useEffect(() => {
    const raw = rawVideoRef.current;
    const edited = editedVideoRef.current;
    if (!raw || !edited) return;

    let rawReady = false;
    let editedReady = false;

    const tryReady = () => {
      if (rawReady && editedReady && !ready) {
        setReady(true);
        raw.play().catch(() => {});
        edited.play().catch(() => {});
      }
    };

    const onRawCanPlay = () => { rawReady = true; tryReady(); };
    const onEditedCanPlay = () => { editedReady = true; tryReady(); };

    // If already cached/canplay through, fire immediately
    if (raw.readyState >= 3) rawReady = true;
    if (edited.readyState >= 3) editedReady = true;
    tryReady();

    raw.addEventListener('canplaythrough', onRawCanPlay);
    edited.addEventListener('canplaythrough', onEditedCanPlay);

    return () => {
      raw.removeEventListener('canplaythrough', onRawCanPlay);
      edited.removeEventListener('canplaythrough', onEditedCanPlay);
    };
  }, []);

  // Keep both video layers playing in sync so motion lines up across the divider
  useEffect(() => {
    if (!ready) return;
    const raw = rawVideoRef.current;
    const edited = editedVideoRef.current;
    if (!raw || !edited) return;

    // Keep the two layers aligned WITHOUT expensive seeks (which stutter on mobile):
    // nudge the before video's playbackRate to gently catch up; only hard-seek on a
    // large gap (e.g. right after a loop wrap).
    const sync = () => {
      const drift = edited.currentTime - raw.currentTime; // >0 → before is behind
      const abs = Math.abs(drift);
      if (abs > 0.5) {
        raw.currentTime = edited.currentTime;
        raw.playbackRate = 1;
      } else if (abs > 0.05) {
        raw.playbackRate = drift > 0 ? 1.08 : 0.92;
      } else {
        raw.playbackRate = 1;
      }
    };
    edited.addEventListener('timeupdate', sync);
    return () => {
      edited.removeEventListener('timeupdate', sync);
      raw.playbackRate = 1;
    };
  }, [ready]);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  // Pointer drag (mouse + touch unified)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      setFromClientX(e.clientX);
    };
    const onUp = () => { draggingRef.current = false; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [setFromClientX]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  { setPos(p => Math.max(0, p - 4)); e.preventDefault(); }
    if (e.key === 'ArrowRight') { setPos(p => Math.min(100, p + 4)); e.preventDefault(); }
    if (e.key === 'Home')       { setPos(0); e.preventDefault(); }
    if (e.key === 'End')        { setPos(100); e.preventDefault(); }
  };

  const xTop = pos + SLANT / 2;
  const xBottom = pos - SLANT / 2;

  return (
    <div
      ref={wrapRef}
      className="ba-slider"
      onPointerDown={(e) => { draggingRef.current = true; setFromClientX(e.clientX); }}
    >
      {/* Loading placeholder — shown until both videos are buffered */}
      {!ready && (
        <div className="ba-loading">
          <span />
        </div>
      )}

      {/* Bottom layer — BEFORE (raw footage) */}
      <video
        ref={rawVideoRef}
        src={RAW_SRC}
        autoPlay muted loop playsInline preload="auto"
        className="ba-video"
        style={{ visibility: ready ? 'visible' : 'hidden' }}
      />

      {/* Top layer — AFTER (edited), revealed by the slanted divider */}
      <div
        className="ba-after"
        style={{ clipPath: `polygon(${xTop}% 0, 100% 0, 100% 100%, ${xBottom}% 100%)`, visibility: ready ? 'visible' : 'hidden' }}
      >
        <video
          ref={editedVideoRef}
          src={EDITED_SRC}
          autoPlay muted loop playsInline preload="auto"
          className="ba-video"
        />
      </div>

      {/* Labels */}
      <span className="ba-label ba-label--before">{t('sliderBefore')}</span>
      <span className="ba-label ba-label--after">{t('sliderAfter')}</span>

      {/* Slanted divider line — same geometry as the clip edge */}
      <svg className="ba-divider" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="ba-line-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-lavender)" />
            <stop offset="1" stopColor="var(--color-lilac)" />
          </linearGradient>
        </defs>
        <line
          x1={xTop} y1={0} x2={xBottom} y2={100}
          stroke="url(#ba-line-grad)"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Draggable knob — sits on the divider's midpoint */}
      <div
        className="ba-handle"
        style={{ left: `${pos}%` }}
        role="slider"
        tabIndex={0}
        aria-label={t('sliderAria')}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => { e.stopPropagation(); draggingRef.current = true; }}
      >
        <div className="ba-knob" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="10 8 6 12 10 16" />
            <polyline points="14 8 18 12 14 16" />
          </svg>
        </div>
      </div>
    </div>
  );
}
