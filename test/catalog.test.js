const test = require("node:test");
const assert = require("node:assert/strict");
const Catalog = require("../docs/catalog.js");
const PRODUCTS = require("../docs/products.js");

test("架空商品12点が4カテゴリーに3点ずつ入っている", () => {
  assert.equal(PRODUCTS.length, 12);
  for (const c of Catalog.CATEGORIES) {
    assert.equal(Catalog.filterByCategory(PRODUCTS, c.id).length, 3);
  }
});

test("指定したカテゴリーの商品だけに絞り込める", () => {
  const items = Catalog.filterByCategory(PRODUCTS, "makeup");
  assert.ok(items.length > 0);
  assert.ok(items.every((p) => p.category === "makeup"));
});

test("日本円の価格を米ドルに固定レートで換算できる", () => {
  assert.equal(Catalog.convertPrice(1000, "USD"), 6.7);
});

test("日本円の価格を台湾ドルに固定レートで換算できる", () => {
  assert.equal(Catalog.convertPrice(1000, "TWD"), 210);
});

test("通貨ごとの記号つき価格表示ができる", () => {
  assert.equal(Catalog.formatPrice(1000, "JPY"), "¥1,000");
  assert.equal(Catalog.formatPrice(1000, "USD"), "US$6.70");
  assert.equal(Catalog.formatPrice(1000, "TWD"), "NT$210");
});

test("全商品に3言語ぶんの空でない名前と説明がある", () => {
  for (const p of PRODUCTS) {
    for (const lang of Catalog.LANGS) {
      assert.ok(p.name[lang] && p.name[lang].length > 0);
      assert.ok(p.desc[lang] && p.desc[lang].length > 0);
    }
  }
});

test("商品IDが重複せず価格が正の数である", () => {
  const ids = PRODUCTS.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(PRODUCTS.every((p) => Number.isInteger(p.priceJpy) && p.priceJpy > 0));
});

test("未対応の言語と通貨は日本語と日本円に落ち着く", () => {
  assert.equal(Catalog.normalizeLang("fr"), "ja");
  assert.equal(Catalog.normalizeCurrency("EUR"), "JPY");
  assert.equal(Catalog.formatPrice(1000, "EUR"), "¥1,000");
});
