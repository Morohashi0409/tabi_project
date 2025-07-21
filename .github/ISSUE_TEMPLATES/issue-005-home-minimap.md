# ホーム画面のゼルダ風ミニマップ実装

## 現在の状況
- 統計情報のみ表示（src/pages/Home.tsx）
- ミニマップ機能なし
- 現在地周辺の情報表示なし

## 要件定義からの引用
> ### 1. メイン画面（ホーム）
> - **現在地周辺マップ**: ゼルダ風ミニマップ表示
> - **おすすめスポット**: 近隣の未解禁エリア提案
> - **チーム状況**: チームメンバーの今日の活動

## 受け入れ基準
- [ ] 現在地中心のミニマップ表示
- [ ] ゼルダ風デザインの実装
- [ ] 周辺解禁エリアのハイライト
- [ ] 未解禁エリアの神秘的表現
- [ ] インタラクティブなタップ操作
- [ ] リアルタイム位置更新

## 技術実装
### ミニマップコンポーネント
```typescript
interface MiniMapProps {
  centerLocation: {lat: number; lng: number};
  radius: number; // 表示範囲（km）
  unlockedAreas: Area[];
  userLocation: {lat: number; lng: number};
}

const MiniMap: React.FC<MiniMapProps> = ({
  centerLocation, radius, unlockedAreas, userLocation
}) => {
  // Google Maps を円形にクリップ
  // ゼルダ風のスタイリング適用
  // 解禁/未解禁エリアの色分け
};
```

### ゼルダ風スタイリング
```css
.zelda-minimap {
  border: 3px solid #8B4513;
  border-radius: 50%;
  background: radial-gradient(circle, #1B2E57 0%, #0F1B3C 100%);
  position: relative;
  overflow: hidden;
}

.unlocked-area {
  filter: brightness(1.2) saturate(1.3);
  border: 2px solid #F39C12;
}

.locked-area {
  filter: grayscale(1) brightness(0.3);
  background-color: #1B2E57;
}
```

## 実装ファイル
- `src/components/MiniMap.tsx` - メインコンポーネント
- `src/hooks/useCurrentLocation.ts` - 現在地取得フック
- `src/styles/minimap.css` - ゼルダ風スタイル
- `src/utils/mapUtils.ts` - 地図計算ユーティリティ

## デザイン要素
- 円形のマップ表示
- 古地図風のテクスチャ
- 解禁エリアの金色の輝き効果
- 未解禁エリアの霧の表現
- ユーザー位置のアイコン表示

## インタラクション
- ミニマップタップでフルマップ画面へ遷移
- 周辺エリアへのクイックナビゲーション
- 解禁可能エリアのアニメーション強調

## パフォーマンス最適化
- 表示範囲の動的調整
- 不要なエリアデータの除外
- アニメーションのフレームレート制御
