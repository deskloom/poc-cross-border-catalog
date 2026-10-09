const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const shopifyDir = path.join(__dirname, "..", "shopify");
const ja = require("../shopify/locales/ja.json");
const en = require("../shopify/locales/en.json");
const zh = require("../shopify/locales/zh-Hant.json");

function readCsvRows() {
  const text = fs.readFileSync(path.join(shopifyDir, "products.csv"), "utf8");
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  const header = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    const row = {};
    header.forEach((h, i) => { row[h] = cols[i]; });
    return row;
  });
}

test("ロケール3言語ファイルが同じ40点の商品キーを持っている", () => {
  const jaKeys = Object.keys(ja.products).sort();
  assert.equal(jaKeys.length, 40);
  assert.deepEqual(Object.keys(en.products).sort(), jaKeys);
  assert.deepEqual(Object.keys(zh.products).sort(), jaKeys);
});

test("ロケール3言語の商品名と説明がすべて空でない", () => {
  for (const locale of [ja, en, zh]) {
    for (const key of Object.keys(locale.products)) {
      const p = locale.products[key];
      assert.ok(p.title && p.title.length > 0, key);
      assert.ok(p.body && p.body.length > 0, key);
    }
  }
});

test("商品CSV雛形が4カテゴリー×10点の40点ある", () => {
  const rows = readCsvRows();
  assert.equal(rows.length, 40);
  for (const type of ["skincare", "makeup", "haircare", "bodycare"]) {
    assert.equal(rows.filter((r) => r.Type === type).length, 10, type);
  }
});

test("商品CSVの画像ファイル名が支給形式で40点ぶん入っている", () => {
  const rows = readCsvRows();
  const names = rows.map((r) => r["Image Src"]);
  assert.equal(new Set(names).size, 40);
  for (const n of names) {
    assert.match(n, /^(skincare|makeup|haircare|bodycare)-\d{2}\.jpg$/);
  }
});

test("商品CSVの日本語名と価格がロケールと一致している", () => {
  const rows = readCsvRows();
  const byHandle = {};
  for (const r of rows) byHandle[r.Handle] = r;
  for (const key of Object.keys(ja.products)) {
    const lp = ja.products[key];
    const row = byHandle[lp.handle];
    assert.ok(row, key);
    assert.equal(row.Title, lp.title);
    assert.equal(Number(row["Variant Price"]), lp.priceJpy);
  }
});

test("見本12点の名前と画像ファイル名がロケールと一致している", () => {
  const PRODUCTS = require("../docs/products.js");
  const Catalog = require("../docs/catalog.js");
  assert.equal(PRODUCTS.length, 12);
  for (const p of PRODUCTS) {
    const lp = ja.products[p.id];
    assert.ok(lp, p.id);
    assert.equal(p.name.ja, lp.title);
    assert.equal(p.name.en, en.products[p.id].title);
    assert.equal(p.name.zh, zh.products[p.id].title);
    assert.equal(p.image, lp.image);
    assert.match(p.image, /^(skincare|makeup|haircare|bodycare)-\d{2}\.jpg$/);
  }
  assert.equal(Catalog.UI_TEXTS.ja.sampleBanner.length > 0, true);
});

test("テーマ構成図とマーケット設定メモが同梱されている", () => {  for (const f of ["THEME.md", "MARKETS.md", "products.csv"]) {
    assert.ok(fs.existsSync(path.join(shopifyDir, f)), f);
  }
  for (const f of ["ja.json", "en.json", "zh-Hant.json"]) {
    assert.ok(fs.existsSync(path.join(shopifyDir, "locales", f)), f);
  }
});
