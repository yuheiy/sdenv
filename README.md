# sdenv

sdenv（読み方: えすでぃーえんぶ）は、ウェブサイト（not ウェブアプリケーション）のためのフロントエンド開発スターターキットです。モダンなプラクティスを取り入れながらも、より多くのウェブサイト開発者に向けたHTML中心の開発環境を構成しています。

> [!NOTE]
> 「ウェブサイト vs. ウェブアプリケーション」の二分法には反論があります。「[The Website vs. Web App Dichotomy Doesn't Exist](https://jakelazaroff.com/words/the-website-vs-web-app-dichotomy-doesnt-exist/)」では、ウェブサイトを分類するための観点に加えて、開発技術の適用範囲についても言及されています。

次のツールを採用しています:

- [Astro](https://astro.build/): ウェブサイト構築のためのフレームワーク
- [Tailwind CSS](https://tailwindcss.com/): ユーティリティファーストCSSフレームワーク
- [Alpine.js](https://alpinejs.dev/): HTMLに直接振る舞いを記述できるようにするJavaScriptフレームワーク

加えて、これらを快適に使用できるように、[ESLint](https://eslint.org/)、[Prettier](https://prettier.io/)、[VSCode](https://code.visualstudio.com/)の設定が組み込まれています。

sdenvは、これらのツールの使い方を理解していることを前提に構成されています。理解が不十分な点があれば、それぞれの公式ドキュメントなどを参照してください。

またsdenvのアプローチは、次のようなコンセプトにも関係しています:

- [HTML First](https://html-first.com/): HTML中心のシームレスな開発プロセスを実現するためのガイドライン
- [htmx](https://htmx.org/): サーバーとのインタラクションをHTML属性として記述できるようにするライブラリ
- [The AHA Stack](https://ahastack.dev/): Astro、htmx、Alpine.jsを組み合わせてウェブアプリケーションを構築するためのガイド

## コマンドラインインターフェース

セットアップ:

```bash
pnpm install
```

ローカルサーバーの起動:

```bash
pnpm run dev
```

本番用ビルド:

```bash
pnpm run build
```

自動テスト:

```bash
pnpm run test
```

ソースコードの静的検証:

```bash
pnpm run lint
```

ソースコードの自動修正:

```bash
pnpm run fix
```

## ファイル構成

```
.
├── public/             # ビルドによって加工されないアセット
├── src/                # サイトのソースコード
│   ├── assets/         # ビルドによって加工されるアセット
│   ├── components/     # Astroコンポーネント
│   ├── content/        # Astroのコンテンツコレクション
│   ├── icons/          # astro-iconから参照されるSVGファイル
│   ├── layouts/        # ページの構造を規定するAstroコンポーネント
│   ├── pages/          # ページのためのAstroコンポーネント
│   ├── scripts/        # クライアントサイドで利用されるスクリプト
│   └── styles/         # サイトで利用されるCSSファイル
├── astro.config.ts     # Astroの設定
├── package.json        # 依存パッケージを管理するための設定
└── tsconfig.json       # TypeScriptの設定
```

詳しくは、Astro公式ドキュメントの「[Project Structure](https://docs.astro.build/en/core-concepts/project-structure/)」も参照してください。また、大規模なプロジェクトにおいては、[featuresディレクトリ](https://github.com/withastro/storefront?tab=readme-ov-file#project-structure)の導入も検討してください。
