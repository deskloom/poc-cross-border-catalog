# テーマ構成図（無料テーマ想定）

このPOCの `docs/` 画面を、Shopify の公式無料テーマに移すときの対応表です。
画面の切り替え自体は見本用の固定表示で、本番は Markets と翻訳アプリに置き換えます。

```
shopify-theme/
├── layout/
│   └── theme.liquid          … 店名ヘッダー + 言語・通貨スイッチャー（docs/index.html の header・controls に対応）
├── templates/
│   ├── index.liquid          … トップ（4カテゴリー導線 + 商品一覧。docs の初期表示に対応）
│   ├── product.liquid        … 商品詳細（未実装）
│   ├── page.company.liquid   … 会社概要（未実装）
│   ├── page.shop.liquid      … 店舗情報（未実装）
│   ├── page.faq.liquid       … FAQ（未実装）
│   └── page.contact.liquid   … お問い合わせ（未実装。規約ページも同様に未実装）
├── sections/
│   └── featured-collection.liquid × 4 … カテゴリー別コレクション表示
├── snippets/
│   └── price.liquid          … 多通貨価格表示（本番は Markets 連動。見本の固定レートは使わない）
├── locales/
│   ├── ja.json               … 日本語（shopify/locales/ja.json と同じ内容）
│   ├── en.json               … 英語（shopify/locales/en.json と同じ内容）
│   └── zh-Hant.json          … 繁体字（shopify/locales/zh-Hant.json と同じ内容）
├── config/
│   └── settings_data.json    … カラー・フォント・レイアウト（無料テーマの範囲で調整）
└── assets/
    └── skincare-01.jpg 等40点 … 支給画像の配置先（商品カードの画像枠に対応）
```

## POCファイルとの対応

| POCのファイル | Shopify側の置き場所 | 備考 |
|---|---|---|
| docs/index.html | templates/index.liquid + layout/theme.liquid | 静的見本。本番は Liquid で書き直す |
| docs/app.js の言語切り替え | 翻訳アプリ + locales 3言語 | 見本の手書き切り替えは本番では使わない |
| docs/app.js の通貨切り替え | Markets + price.liquid | 見本の固定レートは本番では使わない |
| docs/products.js（12点） | shopify/products.csv（40点雛形） | 商品登録の原本は CSV |
| docs/styles.css | テーマの CSS・テーマ設定 | 色・フォントは無料テーマの範囲 |

## 未実装（本番作業として残る）

商品詳細・会社概要・店舗情報・FAQ・お問い合わせ・規約ページ、SEO設定、実画像の配置、
マーケット・送料・決済の管理画面設定。`poc.json` の `notBuilt` に列挙しています。
