'use client';

import { useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ComposedChart,
} from 'recharts';
import { CLIENTS, type ClientId } from '@/lib/analytics-data';

/* ── Types ── */

export interface ProjectDetailProps {
  videoId: string;
  title: string;
  channel: string;
  clientId: ClientId;
  onClose: () => void;
}

/* ── Tooltip ── */

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { value: number; name: string; color: string }[] }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="pd-tooltip">
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span style={{ color: 'rgba(225,226,231,0.6)' }}>{entry.name}</span>
          <span style={{ color: '#e1e2e7', fontWeight: 600 }}>{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Main component ── */

export default function ProjectDetail({ videoId, title, channel, clientId, onClose }: ProjectDetailProps) {
  const t = useTranslations('analytics');
  const client = CLIENTS[clientId];

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
      aria-label={`${title} — ${channel}`}
    >
      <div id="pd-backdrop" onClick={onClose} />

      <div id="pd-panel">
        {/* Close button */}
        <button id="pd-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Video section */}
        <div id="pd-video">
          <div id="pd-video-inner">
            <iframe
              id="pd-iframe"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={title}
            />
          </div>
          <div id="pd-video-meta">
            <h3 id="pd-video-title">{title}</h3>
            <p id="pd-video-channel">{channel}</p>
          </div>
        </div>

        {/* Analytics section */}
        <div id="pd-analytics">
          <h4 id="pd-analytics-heading">{t('label')}</h4>

          <p className="analytics-video-title" style={{ marginBottom: '1rem' }}>
            {t('videoTitle', { views: client.views, name: channel })}
          </p>

          <div className="analytics-stats-grid" style={{ marginBottom: '1.25rem' }}>
            <StatCard label={t('statViews')} value={client.views} note={t('statTypical')} positive />
            <StatCard label={t('statWatchTime')} value={client.watchHours} note={t('statTypical')} positive />
            <StatCard label={t('statSubs')} value={client.subscribers} positive />
          </div>

          <div className="analytics-chart-wrap">
            <div className="analytics-legend">
              <span className="analytics-legend-item">
                <span className="analytics-legend-dot" style={{ background: '#5c6dff' }} />
                {t('thisVideo')}
              </span>
              <span className="analytics-legend-item">
                <span className="analytics-legend-dot" style={{ background: 'rgba(255,255,255,0.2)' }} />
                {t('typicalPerf')}
              </span>
            </div>

            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart data={client.chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="pdGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5c6dff" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#5c6dff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(225,226,231,0.25)', fontSize: 10, fontFamily: 'var(--font-body)' }}
                  ticks={[0, 19, 38, 57, 76, 95, 114]}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(225,226,231,0.25)', fontSize: 10, fontFamily: 'var(--font-body)' }}
                  orientation="right"
                  domain={[0, 'dataMax + 500']}
                  tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v.toString()}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="thisVideo" fill="url(#pdGradient)" stroke="none" />
                <Line type="monotone" dataKey="typical" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} strokeDasharray="6 4" dot={false} name={t('typicalPerf')} />
                <Line type="monotone" dataKey="thisVideo" stroke="#5c6dff" strokeWidth={2} dot={false} activeDot={{ r: 5, fill: '#5c6dff', stroke: '#e0b6ff', strokeWidth: 2 }} name={t('thisVideo')} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stat card (inline) ── */

function StatCard({ label, value, note, positive }: { label: string; value: string; note?: string; positive?: boolean }) {
  return (
    <div className="analytics-stat-card">
      <span className="analytics-stat-label">{label}</span>
      <span className="analytics-stat-value">{value}</span>
      {note && (
        <span className="analytics-stat-note">
          {positive && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" className="inline-block mr-1 -mt-0.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {note}
        </span>
      )}
    </div>
  );
}
