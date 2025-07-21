export interface Region {
  id: string;
  name: string;
  color: string;
  unlocked: boolean;
  unlockedAt?: Date;
  photoUrl?: string;
  prefecture: string[];
  description: string;
}

export interface User {
  id: string;
  username: string;
  avatar_url?: string;
  premium_status: boolean;
  created_at: string;
}

export interface UnlockedArea {
  id: string;
  user_id: string;
  area_id: string;
  unlocked_at: string;
  photo_url?: string;
  latitude: number;
  longitude: number;
}

export interface Achievement {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}