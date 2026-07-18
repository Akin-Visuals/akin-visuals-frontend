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
import StatCard from '@/components/ui/StatCard';

/* ── Types ── */

export interface ProjectDetailProps {
  videoId: string;
  title: string;
  channel: string;
  views: string;
  clientId: ClientId;
  onClose: () => void;
}

/* ── Tooltip ── */

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { value: number; name: string; color: string }[] }) {
  if (!active || !payload?.length) return null;
  // Drop the gradient Area's entry (its name is the raw dataKey) so "this video" isn't listed twice
  const items = payload.filter((entry) => entry.name !== 'thisVideo');
  return (
    <div className="pd-tooltip">
      {items.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span style={{ color: 'rgba(225,226,231,0.6)' }}>{entry.name}</span>
          <span style={{ color: '#e1e2e7', fontWeight: 600 }}>{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Derive plausible watch time / subscribers from a view count ── */

function parseViews(v: string): number {
  if (!v) return 0;
  const s = v.trim().toUpperCase().replace(/\s/g, '');
  const m = s.match(/^([\d.,]+)([KMB]?)$/);
  if (!m) return 0;
  const suffix = m[2];
  if (suffix) {
    let num = parseFloat(m[1].replace(',', '.')); // K/M/B → comma is decimal
    if (suffix === 'K') num *= 1e3;
    else if (suffix === 'M') num *= 1e6;
    else if (suffix === 'B') num *= 1e9;
    return Math.round(num);
  }
  return Math.round(parseFloat(m[1].replace(/[.,]/g, '')) || 0); // plain: strip separators
}

// ~4.5 min average watch per view, in hours (Dutch decimal formatting)
const deriveWatchHours = (viewsNum: number) => (viewsNum * 4.5 / 60).toFixed(1).replace('.', ',');
// ~1.5% of viewers subscribe
const deriveSubscribers = (viewsNum: number) => `+${Math.round(viewsNum * 0.015)}`;

// Build a rising cumulative-views curve (fast early growth, tapering) that ends at `total`
function buildChartData(total: number) {
  const days = 114;
  const step = 3;
  const tau = 22;          // this video: reaches ~99% by ~day 100
  const tauT = 34;         // typical: slower
  const normThis = 1 - Math.exp(-days / tau);
  const normTyp = 1 - Math.exp(-days / tauT);
  const data: { day: number; thisVideo: number; typical: number }[] = [];
  for (let day = 0; day <= days; day += step) {
    const thisVideo = Math.round(total * (1 - Math.exp(-day / tau)) / normThis);
    const typical = Math.round(total * 0.58 * (1 - Math.exp(-day / tauT)) / normTyp);
    data.push({ day, thisVideo, typical });
  }
  return data;
}

/* ── Main component ── */

export default function ProjectDetail({ videoId, title, channel, views, clientId, onClose }: ProjectDetailProps) {
  const t = useTranslations('analytics');
  const client = CLIENTS[clientId];
  const viewsNum = parseViews(views);
  const displayViews = views || client.views;
  const displayWatch = viewsNum > 0 ? deriveWatchHours(viewsNum) : client.watchHours;
  const displaySubs = viewsNum > 0 ? deriveSubscribers(viewsNum) : client.subscribers;
  const chartData = viewsNum > 0 ? buildChartData(viewsNum) : client.chartData;

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
            {t('videoTitle', { views: displayViews, name: channel })}
          </p>

          <div className="analytics-stats-grid" style={{ marginBottom: '1.25rem' }}>
            <StatCard label={t('statViews')} value={displayViews} note={t('statTypical')} positive />
            <StatCard label={t('statWatchTime')} value={displayWatch} note={t('statTypical')} positive />
            <StatCard label={t('statSubs')} value={displaySubs} positive />
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
              <ComposedChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
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
