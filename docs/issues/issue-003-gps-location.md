# GPS位置情報取得・現地滞在確認システム

## 現在の状況
- 位置情報取得機能なし
- 滞在時間確認機能なし
- モックデータでの解禁状態管理のみ

## 要件定義からの引用
> - **共通解禁条件**: 現地5分間滞在 + 証明写真投稿
> - **位置確認**: GPS による正確な現地滞在確認
> - **安全考慮**: 危険地域・夜間は制限あり

## 受け入れ基準
- [ ] GPS位置情報取得実装
- [ ] 5分間滞在時間の計測機能
- [ ] 位置精度の検証機能（誤差50m以内）
- [ ] バックグラウンド位置追跡
- [ ] 危険エリア・夜間制限機能
- [ ] バッテリー最適化

## 技術実装
### Geolocation API
```javascript
// 高精度位置情報取得
const watchId = navigator.geolocation.watchPosition(
  (position) => {
    const { latitude, longitude, accuracy } = position.coords;
    if (accuracy <= 50) { // 50m以内の精度
      checkAreaUnlock(latitude, longitude);
    }
  },
  (error) => handleLocationError(error),
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 30000
  }
);
```

### 滞在確認システム
```typescript
interface LocationStay {
  areaId: string;
  startTime: Date;
  currentDuration: number; // seconds
  requiredDuration: number; // 300 seconds (5 minutes)
  isValid: boolean;
}
```

## 実装ファイル
- `src/hooks/useGeolocation.ts` - GPS取得カスタムフック
- `src/services/LocationService.ts` - 位置情報管理サービス
- `src/utils/geoUtils.ts` - 地理計算ユーティリティ
- `src/components/LocationTracker.tsx` - 位置追跡UI

## 安全機能
- 夜間制限: 22:00-6:00は解禁不可
- 危険エリア除外: 崖地・立入禁止区域の自動フィルタ
- プライバシー保護: 解禁判定後の詳細位置情報削除

## パフォーマンス考慮
- バッテリー消費最適化
- 不要時の位置追跡停止
- 精度に応じた取得頻度調整
