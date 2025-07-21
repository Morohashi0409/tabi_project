import { Region } from '../types';

export const japanRegions: Region[] = [
  {
    id: 'hokkaido',
    name: '北海道',
    color: '#FF6B6B',
    unlocked: false,
    prefecture: ['北海道'],
    description: '日本最北の都道府県。雪まつり、新鮮な海産物、美しい自然景観で知られています。'
  },
  {
    id: 'tohoku',
    name: '東北',
    color: '#4ECDC4',
    unlocked: false,
    prefecture: ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
    description: '温泉、伝統的な祭り、美しい山岳風景の地域です。'
  },
  {
    id: 'kanto',
    name: '関東',
    color: '#45B7D1',
    unlocked: true,
    unlockedAt: new Date('2024-01-15'),
    photoUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    prefecture: ['東京都', '神奈川県', '千葉県', '埼玉県', '茨城県', '栃木県', '群馬県'],
    description: '日本で最も人口が多い地域。東京を中心とする現代日本文化の拠点です。'
  },
  {
    id: 'chubu',
    name: '中部',
    color: '#96CEB4',
    unlocked: false,
    prefecture: ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'],
    description: '日本の心臓部。富士山、日本アルプス、伝統工芸が特色の地域です。'
  },
  {
    id: 'kinki',
    name: '近畿（関西）',
    color: '#FECA57',
    unlocked: true,
    unlockedAt: new Date('2024-02-20'),
    photoUrl: 'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg',
    prefecture: ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'],
    description: '京都、大阪を擁する古都の地域。数多くのユネスコ世界遺産があります。'
  },
  {
    id: 'chugoku',
    name: '中国',
    color: '#FF9FF3',
    unlocked: false,
    prefecture: ['鳥取県', '島根県', '岡山県', '広島県', '山口県'],
    description: '本州西部の地域。広島、伝統的な庭園、瀬戸内海で知られています。'
  },
  {
    id: 'shikoku',
    name: '四国',
    color: '#54A0FF',
    unlocked: false,
    prefecture: ['徳島県', '香川県', '愛媛県', '高知県'],
    description: '最小の本島。八十八箇所巡礼と美しい海岸線で有名です。'
  },
  {
    id: 'kyushu',
    name: '九州・沖縄',
    color: '#5F27CD',
    unlocked: false,
    prefecture: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'],
    description: '活火山、温泉、そして熱帯の沖縄諸島がある南部地域です。'
  }
];