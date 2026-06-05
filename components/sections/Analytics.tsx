'use client';

import { useState } from 'react';
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

/* ── Constants ── */

const ANALYTICS_TABS = ['overview', 'reach', 'engagement', 'audience', 'revenue'] as const;
type AnalyticsTab = (typeof ANALYTICS_TABS)[number];

/* ── Sub-components ── */

function StatCard({
  label,
  value,
  note,
  positive,
}: {
  label: string;
  value: string;
  note?: string;
  positive?: boolean;
}) {
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

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { value: number; name: string; color: string }[] }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="analytics-tooltip">
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

export default function Analytics() {
  const t = useTranslations('analytics');
  const [activeClient, setActiveClient] = useState<ClientId>('coach-x');
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('overview');

  const client = CLIENTS[activeClient];

  return (
    <section id="analytics" className="py-28 relative overflow-hidden section-snap section-dark">
      {/* Top fade — blends from previous section */}
      <div
        className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
        style={{ height: '220px', background: 'linear-gradient(to bottom, #0d1117, #0e1220)' }}
      />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-4 fade-up">
          <span
            className="text-[#e0b6ff] tracking-[0.35em] uppercase text-xs mb-4 block font-semibold"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            {t('label')}
          </span>
          <h2
            className="font-bold text-5xl text-[#e1e2e7] mb-5"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {t('title')}
          </h2>
          <p
            className="text-[#c6c6cb] max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('sub')}
          </p>
        </div>

        {/* Client switcher */}
        <div className="flex justify-center gap-1 mb-8 fade-up">
          {(Object.keys(CLIENTS) as ClientId[]).map((id) => (
            <button
              key={id}
              onClick={() => setActiveClient(id)}
              className="analytics-client-tab"
              data-active={activeClient === id}
            >
              {CLIENTS[id].name}
            </button>
          ))}
        </div>

        {/* Analytics dashboard card */}
        <div className="analytics-dashboard glass-card fade-up">
          {/* Sub-tabs */}
          <div className="analytics-tabs">
            {ANALYTICS_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="analytics-tab"
                data-active={activeTab === tab}
              >
                {t(tab)}
              </button>
            ))}
          </div>

          {/* Title */}
          <p className="analytics-video-title">
            {t('videoTitle', { views: client.views, name: client.name })}
          </p>

          {/* Stat cards */}
          <div className="analytics-stats-grid">
            <StatCard label={t('statViews')} value={client.views} note={t('statTypical')} positive />
            <StatCard label={t('statWatchTime')} value={client.watchHours} note={t('statTypical')} positive />
            <StatCard label={t('statSubs')} value={client.subscribers} positive />
          </div>

          {/* Chart */}
          <div className="analytics-chart-wrap">
            {/* Legend */}
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

            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={client.chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5c6dff" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#5c6dff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.04)"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(225,226,231,0.25)', fontSize: 11, fontFamily: 'var(--font-body)' }}
                  ticks={[0, 19, 38, 57, 76, 95, 114]}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(225,226,231,0.25)', fontSize: 11, fontFamily: 'var(--font-body)' }}
                  orientation="right"
                  domain={[0, 'dataMax + 500']}
                  tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v.toString()}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="thisVideo"
                  fill="url(#analyticsGradient)"
                  stroke="none"
                />
                <Line
                  type="monotone"
                  dataKey="typical"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth={1.5}
                  strokeDasharray="6 4"
                  dot={false}
                  name={t('typicalPerf')}
                />
                <Line
                  type="monotone"
                  dataKey="thisVideo"
                  stroke="#5c6dff"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: '#5c6dff', stroke: '#e0b6ff', strokeWidth: 2 }}
                  name={t('thisVideo')}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
