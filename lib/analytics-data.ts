export type ClientId = 'coach-x' | 'mindset-pro' | 'fitness-creator';

export interface ClientData {
  name: string;
  views: string;
  watchHours: string;
  subscribers: string;
  revenue: string;
  chartData: { day: number; thisVideo: number; typical: number }[];
}

export const CLIENTS: Record<ClientId, ClientData> = {
  'coach-x': {
    name: 'Coach X',
    views: '2.321',
    watchHours: '189,7',
    subscribers: '+34',
    revenue: '€ 0,01',
    chartData: [
      { day: 0, thisVideo: 0, typical: 0 },
      { day: 10, thisVideo: 1200, typical: 900 },
      { day: 19, thisVideo: 2100, typical: 1600 },
      { day: 28, thisVideo: 2400, typical: 1900 },
      { day: 38, thisVideo: 2600, typical: 2100 },
      { day: 48, thisVideo: 2400, typical: 2000 },
      { day: 57, thisVideo: 2500, typical: 2100 },
      { day: 66, thisVideo: 2350, typical: 1950 },
      { day: 76, thisVideo: 2200, typical: 1800 },
      { day: 86, thisVideo: 2100, typical: 1700 },
      { day: 95, thisVideo: 2050, typical: 1650 },
      { day: 105, thisVideo: 2000, typical: 1600 },
      { day: 114, thisVideo: 1950, typical: 1550 },
    ],
  },
  'mindset-pro': {
    name: 'Mindset Pro',
    views: '5.842',
    watchHours: '412,3',
    subscribers: '+89',
    revenue: '€ 0,03',
    chartData: [
      { day: 0, thisVideo: 0, typical: 0 },
      { day: 10, thisVideo: 2800, typical: 1800 },
      { day: 19, thisVideo: 4500, typical: 3200 },
      { day: 28, thisVideo: 5200, typical: 4000 },
      { day: 38, thisVideo: 5600, typical: 4300 },
      { day: 48, thisVideo: 5400, typical: 4100 },
      { day: 57, thisVideo: 5500, typical: 4200 },
      { day: 66, thisVideo: 5200, typical: 4000 },
      { day: 76, thisVideo: 5000, typical: 3800 },
      { day: 86, thisVideo: 4800, typical: 3600 },
      { day: 95, thisVideo: 4700, typical: 3500 },
      { day: 105, thisVideo: 4600, typical: 3400 },
      { day: 114, thisVideo: 4500, typical: 3300 },
    ],
  },
  'fitness-creator': {
    name: 'Fitness Creator',
    views: '12.450',
    watchHours: '876,1',
    subscribers: '+156',
    revenue: '€ 0,12',
    chartData: [
      { day: 0, thisVideo: 0, typical: 0 },
      { day: 10, thisVideo: 6000, typical: 4000 },
      { day: 19, thisVideo: 9500, typical: 6800 },
      { day: 28, thisVideo: 11000, typical: 8200 },
      { day: 38, thisVideo: 12000, typical: 9000 },
      { day: 48, thisVideo: 11500, typical: 8600 },
      { day: 57, thisVideo: 11800, typical: 8800 },
      { day: 66, thisVideo: 11200, typical: 8400 },
      { day: 76, thisVideo: 10800, typical: 8100 },
      { day: 86, thisVideo: 10400, typical: 7800 },
      { day: 95, thisVideo: 10200, typical: 7600 },
      { day: 105, thisVideo: 10000, typical: 7500 },
      { day: 114, thisVideo: 9800, typical: 7400 },
    ],
  },
};

/** Maps YouTube video IDs to client analytics */
export const YT_TO_CLIENT: Record<string, ClientId> = {
  // Map real YT video IDs to clients — placeholder, fill with real IDs later
};
