export type YtVideo = {
  id: string;
  title: string;
  channel: string;
  channelThumb: string;
  views: string;
  ago: string;
  duration: string;
};

const YT_IDS = ['MXuwN8Trfb0', 'xN3KSgaV6yM', 'nz5plOO4v4s', '_Ms5Vvv2WwE', 'f5E9rIRRSis'];

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  const h = parseInt(match[1] || '0');
  const m = parseInt(match[2] || '0');
  const s = parseInt(match[3] || '0');
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatViews(count: string): string {
  const n = parseInt(count);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K views`;
  return `${n} views`;
}

function timeAgo(dateStr: string): string {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86_400_000);
  if (days < 2) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export async function fetchYtVideos(): Promise<YtVideo[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error('Missing YOUTUBE_API_KEY');

  const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${YT_IDS.join(',')}&key=${key}`;
  const videoRes = await fetch(videoUrl, { next: { revalidate: 3600 } });
  if (!videoRes.ok) throw new Error(`YouTube API error: ${videoRes.status}`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const videoData: { items: any[] } = await videoRes.json();

  const channelIds = [...new Set(videoData.items.map((i) => i.snippet.channelId))].join(',');
  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${key}`;
  const channelRes = await fetch(channelUrl, { next: { revalidate: 3600 } });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const channelData: { items: any[] } = channelRes.ok ? await channelRes.json() : { items: [] };
  const thumbMap: Record<string, string> = {};
  for (const ch of channelData.items) {
    thumbMap[ch.id] = ch.snippet.thumbnails?.default?.url ?? '';
  }

  return videoData.items.map((item) => ({
    id: item.id,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    channelThumb: thumbMap[item.snippet.channelId] ?? '',
    views: formatViews(item.statistics.viewCount),
    ago: timeAgo(item.snippet.publishedAt),
    duration: parseDuration(item.contentDetails.duration),
  }));
}
