# CookShare

シェフと飲食店をマッチングするプラットフォーム

## 機能

- シェフ向け求人情報の閲覧・応募
- 飲食店向け求人情報の投稿・管理
- ユーザー認証（シェフ・飲食店）
- プロフィール管理
- 日付別求人検索
- エリア・ジャンル別検索

## 技術スタック

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Xano (バックエンド)

## 開発環境のセットアップ

1. リポジトリのクローン:

```bash
git clone https://github.com/yourusername/cook-share.git
cd cook-share
```

2. 依存関係のインストール:

```bash
npm install
```

3. 環境変数の設定:
   `.env.local`ファイルを作成し、必要な環境変数を設定:

```
NEXT_PUBLIC_API_BASE_URL=your_api_url
```

4. 開発サーバーの起動:

```bash
npm run dev
```

## ライセンス

MIT

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
