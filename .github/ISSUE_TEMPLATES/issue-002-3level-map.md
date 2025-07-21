# 3段階制マップシステム（地方ブロック/都道府県/市町村）

## 現在の状況
- イージーモード（8地方ブロック）のみ実装
- 都道府県・市町村レベルのデータ構造なし

## 要件定義からの引用
> 1. **イージーモード（地方ブロック単位）**: 8つの地方ブロック（無料ユーザー向け）
> 2. **ノーマルモード（都道府県単位）**: 47都道府県の詳細解禁（プレミアム限定）  
> 3. **ハードモード（市町村単位）**: 1,741市町村の完全制覇（プレミアム限定）

## 受け入れ基準
- [ ] 都道府県レベルのデータ構造追加
- [ ] 市町村レベルのデータ構造追加
- [ ] ズームレベルに応じた表示切り替え
- [ ] モード切替UI実装
- [ ] プレミアムプラン判定ロジック

## 技術実装
### データベーススキーマ拡張
```sql
-- 都道府県テーブル
CREATE TABLE prefectures (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  region_id VARCHAR(50) REFERENCES regions(id),
  bounds GEOMETRY(POLYGON, 4326),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 市町村テーブル  
CREATE TABLE municipalities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  prefecture_id INTEGER REFERENCES prefectures(id),
  bounds GEOMETRY(POLYGON, 4326),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 実装ファイル
- `src/types/index.ts` - Prefecture, Municipality型定義追加
- `src/data/prefectures.ts` - 47都道府県データ
- `src/data/municipalities.ts` - 1,741市町村データ
- `src/components/MapModeSelector.tsx` - モード切替UI

## データ取得方法
- 国土交通省「国土数値情報」API
- OpenStreetMap Nominatim API
- 地理院地図API

## 優先順位
1. 都道府県データ構造（Phase 1）
2. UI/UXでのモード切替（Phase 2）  
3. 市町村データ構造（Phase 3）
