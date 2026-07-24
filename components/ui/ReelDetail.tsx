'use client';

import { useEffect, useCallback } from 'react';

export interface ReelDetailProps {
  src: string;
  title: string;
  client: string;
  onClose: () => void;
}

export default function ReelDetail({ src, title, client, onClose }: ReelDetailProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="rd-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — ${client}`}
    >
      <div className="rd-backdrop" onClick={onClose} />

      <button className="rd-close" onClick={onClose} aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="rd-panel">
        <div className="rd-video-wrap">
          <video
            src={src}
            autoPlay
            muted={false}
            loop
            playsInline
            controls
            className="rd-video"
          />
        </div>
        <div className="rd-meta">
          <h3 className="rd-title">{title}</h3>
          <p className="rd-client">{client}</p>
        </div>
      </div>
    </div>
  );
}
