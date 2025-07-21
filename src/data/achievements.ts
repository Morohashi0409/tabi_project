import { Achievement } from '../types';

export const achievements: Achievement[] = [
  {
    id: 'first_unlock',
    type: 'first_unlock',
    title: 'はじめの一歩',
    description: '最初の地域を解禁する',
    icon: '🎯',
    unlocked: true,
    unlockedAt: new Date('2024-01-15')
  },
  {
    id: 'three_regions',
    type: 'three_regions',
    title: 'エクスプローラー',
    description: '3つの地域を解禁する',
    icon: '🗺️',
    unlocked: false
  },
  {
    id: 'five_regions',
    type: 'five_regions',
    title: 'アドベンチャラー',
    description: '5つの地域を解禁する',
    icon: '⛰️',
    unlocked: false
  },
  {
    id: 'all_regions',
    type: 'all_regions',
    title: 'マスターエクスプローラー',
    description: '全8地域を制覇する',
    icon: '👑',
    unlocked: false
  },
  {
    id: 'photo_collector',
    type: 'photo_collector',
    title: 'メモリーキーパー',
    description: '10枚の写真をアップロードする',
    icon: '📸',
    unlocked: false
  }
];