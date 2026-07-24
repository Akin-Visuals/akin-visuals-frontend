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
      id="project-detail"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — ${client}`}
    >
      <div id="pd-backdrop" onClick={onClose} />
      <div
        id="pd-panel"
        style={{
          width: 'min(96vw, 480px)',
          gridTemplateColumns: '1fr',
          overflowY: 'hidden',
        }}
      >
        <button id="pd-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div id="pd-video">
          <div
            id="pd-video-inner"
            style={{ aspectRatio: '9/16', maxHeight: '70vh' }}
          >
            <video
              src={src}
              autoPlay
              muted={false}
              loop
              playsInline
              controls
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                border: 'none',
              }}
            />
          </div>
          <div id="pd-video-meta">
            <h3 id="pd-video-title">{title}</h3>
            <p id="pd-video-channel">{client}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
