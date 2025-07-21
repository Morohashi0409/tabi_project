# Google Maps API統合とゼルダ風マップデザイン実装

## 現在の状況
- 現在はグリッド表示のみ（src/pages/Map.tsx）
- 実際の地図APIとの連携なし

## 要件定義からの引用
> - **解禁前**: ゼルダ風の枠線のみ表示（内部は深いブルーでマスク）
> - **解禁後**: Googleマップベースのリアル表示
> - **Google Maps Platform（推奨）**: Maps SDK、Places API、Geocoding API

## 受け入れ基準
- [ ] Google Maps JavaScript APIの統合
- [ ] 解禁前エリアの深いブルーマスク表示
- [ ] 解禁後エリアのリアル地図表示
- [ ] ゼルダ風のUI/UXデザイン実装

## 技術実装
```bash
npm install @googlemaps/js-api-loader
```

## 実装ファイル
- `src/pages/Map.tsx` - メインマップコンポーネント
- `src/components/GoogleMap.tsx` - 新規作成
- `src/styles/zelda-map.css` - ゼルダ風スタイル

## API料金見積もり（月間）
- Map loads: 10万回 × $7/1000 = $700
- Geocoding: 5万回 × $5/1000 = $250
- Places API: 3万回 × $17/1000 = $510
- **月額約$1,460（約22万円）**
