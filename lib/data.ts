import type { YtVideo } from '@/lib/youtube';

export const YT_VIDEOS: YtVideo[] = [
  { id: 'MXuwN8Trfb0', title: '', channel: 'AKIN Visuals', channelThumb: '', views: '', ago: '', duration: '' },
  { id: 'xN3KSgaV6yM', title: '', channel: 'AKIN Visuals', channelThumb: '', views: '', ago: '', duration: '' },
  { id: 'nz5plOO4v4s', title: '', channel: 'AKIN Visuals', channelThumb: '', views: '', ago: '', duration: '' },
  { id: '_Ms5Vvv2WwE', title: '', channel: 'AKIN Visuals', channelThumb: '', views: '', ago: '', duration: '' },
  { id: 'f5E9rIRRSis', title: '', channel: 'AKIN Visuals', channelThumb: '', views: '', ago: '', duration: '' },
  { id: '6yqd4BWQ8_U', title: '', channel: 'AKIN Visuals', channelThumb: '', views: '', ago: '', duration: '' },
  { id: 'Gklxxaml_Tc', title: '', channel: 'AKIN Visuals', channelThumb: '', views: '', ago: '', duration: '' },
  { id: '07yhrPeBT7I', title: '', channel: 'AKIN Visuals', channelThumb: '', views: '689',  ago: '', duration: '' },
  { id: 'lhl5CG4uQ9Q', title: '', channel: 'AKIN Visuals', channelThumb: '', views: '1,1K', ago: '', duration: '' },
  { id: 'ZeYA7AIw9s0', title: '', channel: 'AKIN Visuals', channelThumb: '', views: '3,8K', ago: '', duration: '' },
  { id: 'sQKqWCQCUlI', title: '', channel: 'AKIN Visuals', channelThumb: '', views: '1,7K', ago: '', duration: '' },
  { id: '9JAIWknFYAM', title: '', channel: 'AKIN Visuals', channelThumb: '', views: '3,8K', ago: '', duration: '' },
  { id: 'l6dkYnIkKOg', title: '', channel: 'AKIN Visuals', channelThumb: '', views: '3,9K', ago: '', duration: '' },
];

export const REEL_VIDEOS = [
  { src: '/brand_assets/1.mp4', thumb: '' },
  { src: '/brand_assets/2.mp4', thumb: '' },
  { src: '/brand_assets/3.mp4', thumb: '' },
];

export interface ReelVideo {
  id: string;
  src: string;
  title: string;
  client: string;
}

export const REEL_MARQUEE_ROW1: ReelVideo[] = [
  {
    id: 'tawakkul-v1',
    src: 'https://pub-8f8ca6f5c6854719baa62fc4abbb3086.r2.dev/reels/bilal/Tawakkul_v1.mp4',
    title: 'Tawakkul',
    client: 'AKIN Visuals',
  },
  {
    id: 'verhaal-lahmacun',
    src: 'https://pub-8f8ca6f5c6854719baa62fc4abbb3086.r2.dev/reels/elif/Verhaal%20van%20lahmacun_v2.mp4',
    title: 'Verhaal van lahmacun',
    client: 'Elif',
  },
  {
    id: 'wk-elif',
    src: 'https://pub-8f8ca6f5c6854719baa62fc4abbb3086.r2.dev/reels/elif/WK_ELIF_v2.mp4',
    title: 'WK',
    client: 'Elif',
  },
  {
    id: 'isim-elif',
    src: 'https://pub-8f8ca6f5c6854719baa62fc4abbb3086.r2.dev/reels/elif/isim%20elif_v2.mp4',
    title: 'Isim Elif',
    client: 'Elif',
  },
  {
    id: 'kapsalon',
    src: 'https://pub-8f8ca6f5c6854719baa62fc4abbb3086.r2.dev/reels/elif/kapsalon_v2.mp4',
    title: 'Kapsalon',
    client: 'Elif',
  },
  {
    id: 'vacature',
    src: 'https://pub-8f8ca6f5c6854719baa62fc4abbb3086.r2.dev/reels/elif/vacature_v1.mp4',
    title: 'Vacature',
    client: 'Elif',
  },
];

export const REEL_MARQUEE_ROW2: ReelVideo[] = [
  {
    id: 'verhaal-achter-elif',
    src: 'https://pub-8f8ca6f5c6854719baa62fc4abbb3086.r2.dev/reels/elif/verhaal%20achter%20ELIF_v1.mp4',
    title: 'Verhaal achter ELIF',
    client: 'Elif',
  },
  {
    id: 'allah-yolunda',
    src: 'https://pub-8f8ca6f5c6854719baa62fc4abbb3086.r2.dev/reels/mgt/Allah%20yolunda%20kosmak_V2.mp4',
    title: 'Allah yolunda kosmak',
    client: 'MGT',
  },
  {
    id: 'reel-5',
    src: 'https://pub-8f8ca6f5c6854719baa62fc4abbb3086.r2.dev/reels/mgt/reel_5.mp4',
    title: 'Reel 5',
    client: 'MGT',
  },
  {
    id: 'reel-recap',
    src: 'https://pub-8f8ca6f5c6854719baa62fc4abbb3086.r2.dev/reels/mgt/reel_recap_v2_.mp4',
    title: 'Recap',
    client: 'MGT',
  },
  {
    id: 'tovbe',
    src: 'https://pub-8f8ca6f5c6854719baa62fc4abbb3086.r2.dev/reels/mgt/tovbe_finalerRender_post_1.mp4',
    title: 'Tovbe',
    client: 'MGT',
  },
  {
    id: 'ummeti-ummeti',
    src: 'https://pub-8f8ca6f5c6854719baa62fc4abbb3086.r2.dev/reels/mgt/ummeti%20ummeti_v2.mp4',
    title: 'Ummeti ummeti',
    client: 'MGT',
  },
];
