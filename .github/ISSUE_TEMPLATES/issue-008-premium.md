# プレミアムプラン・決済システム

## 現在の状況
- 決済機能なし
- プレミアム判定ロジックなし
- 月額課金システム未実装

## 要件定義からの引用
> ### 💎 プレミアムプラン
> - **月額**: 580円
> - **年額**: 5,800円（2ヶ月分お得）
> - **Stripe + Revenue Cat**: アプリ内課金管理

## 受け入れ基準
- [ ] Stripe決済連携
- [ ] サブスクリプション管理
- [ ] プレミアム機能制御
- [ ] 課金状態の管理UI
- [ ] 解約・変更機能
- [ ] 請求書・領収書発行

## 技術実装
### Stripe Integration
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// サブスクリプション作成
export async function createSubscription(customerId: string, priceId: string) {
  return await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });
}
```

### プレミアム機能制御
```typescript
interface PremiumFeatures {
  normalMode: boolean;    // 都道府県レベル
  hardMode: boolean;      // 市町村レベル
  teamFeature: boolean;   // チーム機能
  highResPhotos: boolean; // 高解像度写真
  detailedStats: boolean; // 詳細統計
  premiumCoupons: boolean; // プレミアムクーポン
}

const getPremiumFeatures = (user: User): PremiumFeatures => {
  const isPremium = user.premium_status && 
    new Date(user.premium_expires_at) > new Date();
  
  return {
    normalMode: isPremium,
    hardMode: isPremium,
    teamFeature: isPremium,
    highResPhotos: isPremium,
    detailedStats: isPremium,
    premiumCoupons: isPremium,
  };
};
```

## 実装ファイル
- `src/services/StripeService.ts` - Stripe API連携
- `src/services/SubscriptionService.ts` - サブスクリプション管理
- `src/hooks/usePremium.ts` - プレミアム状態管理
- `src/components/PaymentModal.tsx` - 決済UI
- `src/pages/Subscription.tsx` - サブスクリプション管理画面
- `api/webhooks/stripe.ts` - Webhookハンドラ

## 価格設定
```typescript
const PRICING_PLANS = {
  monthly: {
    id: 'price_monthly_premium',
    price: 580,
    currency: 'jpy',
    interval: 'month',
  },
  yearly: {
    id: 'price_yearly_premium', 
    price: 5800,
    currency: 'jpy',
    interval: 'year',
  }
};
```

## 決済フロー
1. **プラン選択**: 月額/年額の選択画面
2. **顧客情報入力**: メール・カード情報
3. **決済処理**: Stripe Checkout
4. **Webhook受信**: 決済完了通知
5. **プレミアム有効化**: データベース更新
6. **確認画面**: 成功/失敗の表示

## セキュリティ対策
### Webhook検証
```typescript
export async function verifyWebhook(
  payload: string, 
  signature: string
): Promise<Stripe.Event> {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  return stripe.webhooks.constructEvent(payload, signature, endpointSecret);
}
```

### 不正検知
- 異常な課金パターンの検出
- 重複決済の防止
- 返金・チャージバック対応

## UI/UX設計
### プレミアムアップセル
- 機能制限時のアップグレード誘導
- 無料体験期間の提供（7日間）
- プレミアム機能のプレビュー表示

### 設定画面
- 現在のプラン状況表示
- 次回課金日の表示
- プラン変更・解約オプション

## 法的コンプライアンス
- 特定商取引法に基づく表記
- プライバシーポリシーの更新
- 利用規約の課金条項追加
- 返金・解約ポリシーの明示

## 分析・監視
- 課金転換率の追跡
- プレミアム機能使用率
- 解約率・理由の分析
- LTV（Life Time Value）計算
