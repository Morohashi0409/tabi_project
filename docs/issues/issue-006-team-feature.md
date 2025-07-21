# チーム機能（最大4人、色分け表示）

## 現在の状況
- チーム機能なし
- データモデルにチーム概念なし
- ソーシャル要素の実装なし

## 要件定義からの引用
> ### 👥 チーム機能
> - **最大人数**: 4人（視認性と管理負荷を考慮）
> - **表示方法**: メンバー別色分けでマップ表示
> - **協力要素**: チーム全体の進捗共有
> - **競争要素**: 個人別の貢献度表示

## 受け入れ基準
- [ ] チーム作成・参加機能
- [ ] メンバー別色分け表示（最大4色）
- [ ] チーム進捗共有機能
- [ ] リアルタイム同期
- [ ] 個人貢献度の表示
- [ ] チーム内チャット機能
- [ ] 招待・脱退機能

## 技術実装
### データベーススキーマ
```sql
-- チームテーブル
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  member_limit INTEGER DEFAULT 4
);

-- チームメンバーテーブル
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id),
  user_id UUID REFERENCES users(id),
  role VARCHAR(20) DEFAULT 'member', -- 'owner', 'admin', 'member'
  color VARCHAR(7), -- #FF6B6B, #4ECDC4, #45B7D1, #96CEB4
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);
```

### TypeScript型定義
```typescript
interface Team {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  members: TeamMember[];
}

interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: 'owner' | 'admin' | 'member';
  color: string;
  joinedAt: string;
  user: User;
  stats: MemberStats;
}

interface MemberStats {
  unlockedCount: number;
  contributionScore: number;
  lastActivity: string;
}
```

## 実装ファイル
- `src/types/team.ts` - チーム関連型定義
- `src/services/TeamService.ts` - チーム機能API
- `src/hooks/useTeam.ts` - チーム状態管理
- `src/components/TeamPanel.tsx` - チーム表示パネル
- `src/components/TeamMap.tsx` - チームマップ表示
- `src/pages/TeamManagement.tsx` - チーム管理画面

## UI/UX機能
### メンバー色分け
- プレイヤー1: #FF6B6B（赤）
- プレイヤー2: #4ECDC4（青緑）  
- プレイヤー3: #45B7D1（青）
- プレイヤー4: #96CEB4（緑）

### チーム進捗表示
- 全体制覇率の可視化
- メンバー別貢献度ランキング
- 最近の解禁履歴（チーム内）
- チーム目標の設定・追跡

### リアルタイム機能
- Supabaseリアルタイム購読
- メンバーの解禁イベント通知
- 位置情報のライブ共有（オプション）

## セキュリティ・プライバシー
- 位置情報共有レベルの個人設定
- チーム脱退時のデータ削除
- 招待コードの有効期限設定
- 不適切なチーム名・説明のフィルタ

## 段階的実装
1. **Phase 1**: 基本的なチーム作成・参加
2. **Phase 2**: マップでの色分け表示
3. **Phase 3**: リアルタイム同期・通知
4. **Phase 4**: 高度な統計・ランキング機能
