# TabiTabi（タビタビ）- 発見の旅路

日本全国を探索する位置情報ベースの冒険アプリ

## 🎯 プロジェクト概要

ゼルダ（ブレス オブ ザ ワイルド）の探索体験を現実世界に適用した位置情報ベース探索アプリ。
日本全国を旅して地図を段階的に解禁し、「未知を既知にする喜び」と実用的な地域情報・クーポンを組み合わせた新しい旅行体験を提供します。

## 🚀 技術スタック

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Database**: Supabase (PostgreSQL + PostGIS)
- **Maps**: Google Maps API
- **AI**: Dify API (写真認証)
- **Deployment**: TBD

## 📁 プロジェクト構造

```
src/
├── components/     # 再利用可能コンポーネント
├── pages/         # ページコンポーネント
├── data/          # 静的データ
├── lib/           # 外部ライブラリ設定
├── types/         # TypeScript型定義
└── hooks/         # カスタムフック

docs/
├── github-issues-template.md  # 開発課題一覧
└── issues/                    # 詳細なIssueテンプレート
```

## 🛠️ 開発セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# Lint実行
npm run lint
```

## 📋 開発ロードマップ

開発課題は[docs/github-issues-template.md](./docs/github-issues-template.md)で管理しています。

### 🚨 高優先度 - Core機能
- Google Maps API統合とゼルダ風マップデザイン実装
- 3段階制マップシステム（地方/都道府県/市町村）
- GPS位置情報取得・現地滞在確認システム
- 写真撮影・AI認証システム（Dify連携）

### 📈 中優先度 - UX改善
- ホーム画面のゼルダ風ミニマップ実装
- チーム機能（最大4人、色分け表示）

### 🔧 低優先度 - インフラ・マネタイズ
- Supabaseデータベーススキーマの拡張
- プレミアムプラン・決済システム

## 🎮 コアコンセプト

### 解禁システム
- **解禁条件**: 現地5分間滞在 + 証明写真投稿
- **段階制**: イージー（地方ブロック）→ ノーマル（都道府県）→ ハード（市町村）
- **AI認証**: Difyによる写真位置認証

### ゼルダ風UI
- **解禁前**: 深いブルーマスク表示
- **解禁後**: リアル地図表示
- **演出**: モード別の高品質アニメーション

## 📞 お問い合わせ

GitHubのIssuesまたはDiscussionsをご利用ください。
