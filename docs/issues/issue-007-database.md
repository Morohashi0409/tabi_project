# Supabaseデータベーススキーマの拡張

## 現在の状況
- 基本的なテーブル構造のみ（src/lib/supabase.ts）
- 地理データベース機能なし
- スケーラブルなデータ設計が不十分

## 要件定義からの引用
> **データベース設計（Firestore）**
> ```
> users/{userId}
>   ├─ profile: {name, email, premiumStatus, createdAt}
>   ├─ unlockedAreas: {areaId: {unlockedAt, photoUrl, mode}}
>   └─ stats: {totalDistance, unlockedCount, teamId}
> ```

## 受け入れ基準
- [ ] PostGIS拡張の有効化
- [ ] 地理データベーステーブル設計
- [ ] インデックス最適化
- [ ] マイグレーション戦略の策定
- [ ] バックアップ・復旧手順
- [ ] パフォーマンス監視設定

## 技術実装
### PostgreSQL + PostGIS設定
```sql
-- PostGIS拡張を有効化
CREATE EXTENSION IF NOT EXISTS postgis;

-- 空間インデックスの作成
CREATE INDEX idx_areas_bounds ON areas USING GIST(bounds);
CREATE INDEX idx_user_locations ON unlocked_areas USING GIST(ST_Point(longitude, latitude));
```

### 主要テーブル設計
```sql
-- ユーザーテーブル
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  avatar_url TEXT,
  premium_status BOOLEAN DEFAULT false,
  premium_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- エリア（地方・都道府県・市町村）
CREATE TABLE areas (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type area_type NOT NULL, -- 'region', 'prefecture', 'municipality'
  parent_id VARCHAR(50) REFERENCES areas(id),
  bounds GEOMETRY(POLYGON, 4326),
  center_point GEOMETRY(POINT, 4326),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- エリア解禁履歴
CREATE TABLE unlocked_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  area_id VARCHAR(50) REFERENCES areas(id),
  unlocked_at TIMESTAMP DEFAULT NOW(),
  photo_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  verification_status VARCHAR(20) DEFAULT 'pending',
  unlock_mode VARCHAR(20) NOT NULL, -- 'easy', 'normal', 'hard'
  UNIQUE(user_id, area_id, unlock_mode)
);
```

## 実装ファイル
- `database/migrations/` - マイグレーションファイル群
- `database/seeds/` - 初期データ投入スクリプト
- `src/types/database.ts` - データベース型定義
- `src/services/DatabaseService.ts` - DB操作抽象化レイヤー

## データ最適化戦略
### インデックス設計
- 地理検索用のGISTインデックス
- ユーザー検索の複合インデックス
- 時系列データの部分インデックス

### パーティショニング
```sql
-- 解禁履歴の年別パーティション
CREATE TABLE unlocked_areas_2024 PARTITION OF unlocked_areas
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

## セキュリティ設定
### Row Level Security (RLS)
```sql
-- ユーザーは自分のデータのみアクセス可能
CREATE POLICY user_data_policy ON users
FOR ALL USING (auth.uid() = id);

-- チームメンバーは互いのデータを参照可能
CREATE POLICY team_data_policy ON unlocked_areas
FOR SELECT USING (
  user_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM team_members tm WHERE tm.user_id = auth.uid() AND tm.team_id = (SELECT team_id FROM users WHERE id = unlocked_areas.user_id))
);
```

## 運用・監視
- Supabase Dashboard でのメトリクス監視
- スロークエリログの分析
- 容量使用量の定期チェック
- 自動バックアップの設定

## 段階的移行計画
1. **Phase 1**: 基本テーブルの作成・移行
2. **Phase 2**: PostGIS機能の追加
3. **Phase 3**: パフォーマンス最適化
4. **Phase 4**: 高度な分析機能の実装
