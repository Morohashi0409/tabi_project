# 写真撮影・AI認証システム（Dify連携）

## 現在の状況
- 写真撮影機能なし
- AI位置認証なし
- 静的な写真URL表示のみ

## 要件定義からの引用
> - **写真認証**: AI による位置情報との整合性チェック
> - **Dify（特化用途）**: 写真位置認証（AI画像解析）
> - **Firebase連携フロー**: 写真アップロード → Cloud Storage → Cloud Functions → Dify API → 認証結果 → Firestore更新

## 受け入れ基準
- [ ] カメラ機能実装（Web Camera API）
- [ ] 写真アップロード機能
- [ ] Dify APIとの連携
- [ ] AI位置認証結果の処理
- [ ] 写真メタデータ検証
- [ ] 不正写真の検出・排除

## 技術実装
### Web Camera API
```javascript
// カメラアクセス
const stream = await navigator.mediaDevices.getUserMedia({
  video: { 
    facingMode: 'environment', // 背面カメラ優先
    width: { ideal: 1920 },
    height: { ideal: 1080 }
  }
});

// 写真撮影
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
context.drawImage(video, 0, 0, canvas.width, canvas.height);
const photoBlob = await new Promise(resolve => 
  canvas.toBlob(resolve, 'image/jpeg', 0.8)
);
```

### Dify AI認証フロー
```typescript
interface PhotoVerificationRequest {
  imageUrl: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  areaId: string;
}

interface PhotoVerificationResponse {
  isValid: boolean;
  confidence: number; // 0-1
  detectedLocation?: string;
  reasoning: string;
}
```

## 実装ファイル
- `src/hooks/useCamera.ts` - カメラ機能フック
- `src/services/PhotoService.ts` - 写真管理サービス
- `src/services/DifyService.ts` - Dify API連携
- `src/components/CameraCapture.tsx` - 撮影UIコンポーネント
- `src/components/PhotoVerification.tsx` - 認証結果表示

## AI認証項目
1. **地理的整合性**: 撮影場所と位置情報の一致
2. **時間的整合性**: 撮影時刻の妥当性
3. **景観一致度**: その地域らしい景観の確認
4. **不正検出**: 過去の写真・ネット画像の検出

## セキュリティ機能
- EXIF データの除去（プライバシー保護）
- 写真の透かし・加工検出
- 不適切コンテンツフィルタ
- アップロード容量制限（最大5MB）

## エラーハンドリング
- カメラアクセス拒否時の代替手段
- ネットワークエラー時の再試行
- AI認証失敗時のマニュアル審査
