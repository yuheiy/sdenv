# sdenv

sdenvは、ウェブアプリケーションではなくウェブサイトを開発するためのベストプラクティスに基づいて構成されたフロントエンド開発環境です。やりすぎないちょうどいい使い勝手の実現を念頭に置いて設計されている、より多くのウェブサイト開発者のためのツールキットです。

## 特徴

- ウェブサイト構築のためのフレームワークである[Astro](https://astro.build/)を中心に構成されています
- ユーティリティファーストCSSフレームワークの[Tailwind CSS](https://tailwindcss.com/)を採用しています
- HTML上に直接振る舞いを記述できるJavaScriptフレームワークの[Alpine.js](https://alpinejs.dev/)を採用しています
- これらのツールを快適に使用できるように[ESLint](https://eslint.org/)、[Prettier](https://prettier.io/)、[VSCode](https://code.visualstudio.com/)の設定が組み込まれています

## 参考資料

sdenvを利用するためには、前提としてAstro、Tailwind CSS、Alpine.jsの使い方を理解している必要があります。理解が不十分な点がある場合には、それぞれの公式ドキュメントなどを参照してください。

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Alpine.js](https://alpinejs.dev/)

## 使い方

依存パッケージのインストール:

```bash
npm ci
```

ローカルサーバーの起動:

```bash
npm run dev
```

本番用ビルド:

```bash
npm run build
```

自動テスト:

```bash
npm test
```
