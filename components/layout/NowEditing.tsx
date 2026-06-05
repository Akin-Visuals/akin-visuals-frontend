'use client';

import { useEffect, useRef, useState } from 'react';
import { useMessages } from 'next-intl';

export default function NowEditing() {
  const messages = useMessages();
  const ne = messages.nowEditing as { label: string; liveNow: string; projects: string[] };
  const projects = ne.projects;

  const [project, setProject] = useState(projects[0]);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const idx      = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        idx.current = (idx.current + 1) % projects.length;
        setProject(projects[idx.current]);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(timer);
  }, [projects]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (hovered) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
      vid.currentTime = 0;
    }
  }, [hovered]);

  return (
    <div
      id="now-editing"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`ne-preview${hovered ? ' ne-preview--visible' : ''}`}>
        <video
          ref={videoRef}
          src="/brand_assets/compressed-video.webm"
          muted
          playsInline
          loop
          preload="none"
          className="ne-preview-video"
        />
        <div className="ne-preview-badge">
          <span className="ne-preview-dot" />
          {ne.liveNow}
        </div>
      </div>

      <span className="ne-dot" />
      <span className="ne-label">{ne.label}</span>
      <span className="ne-divider" />
      <span className="ne-project" style={{ opacity: visible ? 1 : 0 }}>{project}</span>
    </div>
  );
}