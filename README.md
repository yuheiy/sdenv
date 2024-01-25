# sdenv

sdenv（読み方: えすでぃーえんぶ）は、ウェブサイト（not ウェブアプリケーション）開発のためのフロントエンドスターターキットです。モダンなプラクティスを取り入れながらも、より多くのウェブサイト開発者に向けて、HTML中心の開発環境を構成しています。

次のツールを採用しています:

- [Astro](https://astro.build/): ウェブサイト構築のためのフレームワーク
- [Tailwind CSS](https://tailwindcss.com/): ユーティリティファーストCSSフレームワーク
- [Alpine.js](https://alpinejs.dev/): HTMLに直接振る舞いを記述できるようにするJavaScriptフレームワーク

sdenvは、これらの使い方を理解していることを前提に構成されています。理解が不十分な点があれば、それぞれの公式ドキュメントなどを参照してください。

またそれ以外にも、次のようなコンセプトに関係しています:

- [HTML First](https://html-first.com/): HTML中心のシームレスな開発プロセスを実現するためのガイドライン
- [htmx](https://htmx.org/): サーバーとのインタラクションをHTML属性として記述できるようにするライブラリ
- [The AHA Stack](https://ahastack.dev/): Astro、htmx、Alpine.jsを組み合わせてウェブアプリケーションを構築するためのガイド

加えて、これらのツールを快適に使用できるように、[ESLint](https://eslint.org/)、[Prettier](https://prettier.io/)、[VSCode](https://code.visualstudio.com/)の設定が組み込まれています。

## コマンドラインインターフェース

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
npm run test
```

ソースコードの静的検証:

```bash
npm run lint
```

ソースコードの自動修正:

```bash
npm run fix
```

## ファイル構成

```
.
├── @types/             # 依存パッケージ用の型定義
├── public/             # ビルドによって加工されないアセット
├── src/                # メインのソースコード
│   ├── assets/         # ビルドによって加工されるアセット
│   ├── components/     # Astroコンポーネント
│   ├── content/        # Astroのコンテンツコレクション
│   ├── layouts/        # ページの構造を規定するAstroコンポーネント
│   ├── pages/          # ページと対応するAstroコンポーネント
│   ├── scripts/        # クライアントサイドで利用されるスクリプト
│   └── styles/         # Tailwind CSSで読み込まれるCSSファイル
├── astro.config.ts     # Astroの設定
├── package.json        # 依存パッケージを管理するための設定
├── tailwind.config.cjs # Tailwind CSSの設定
└── tsconfig.json       # TypeScriptの設定
```

詳しくは、Astro公式ドキュメントの「[Project Structure](https://docs.astro.build/en/core-concepts/project-structure/)」も参照してください。
