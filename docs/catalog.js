/* 商品カタログの共通ロジック。ブラウザと Node.js の両方で動く。 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.Catalog = api;
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var CATEGORIES = [
    { id: "skincare", name: { ja: "スキンケア", en: "Skincare", zh: "護膚" } },
    { id: "makeup", name: { ja: "メイク", en: "Makeup", zh: "彩妝" } },
    { id: "haircare", name: { ja: "ヘアケア", en: "Haircare", zh: "護髮" } },
    { id: "bodycare", name: { ja: "ボディケア", en: "Bodycare", zh: "身體護理" } }
  ];

  var LANGS = ["ja", "en", "zh"];
  var CURRENCIES = ["JPY", "USD", "TWD"];

  /* 固定為替レート（展示用の仮定値。外部APIは呼ばない）。 */
  var RATES = { JPY: 1, USD: 0.0067, TWD: 0.21 };

  var SYMBOLS = { JPY: "¥", USD: "US$", TWD: "NT$" };

  var UI_TEXTS = {
    ja: {
      shopName: "そらビューティ",
      tagline: "アジアへ届けるスキンケアとコスメの見本市",
      sampleBanner: "これは見本です。店名と商品はすべて架空です。",
      langLabel: "言語",
      currencyLabel: "通貨",
      all: "すべて",
      items: "点の商品",
      note: "価格は固定レートによる表示切り替えの見本です。本番はMarketsの多通貨表示に置き換えます。",
      triNote: "商品名は日・英・繁体、価格は円・米ドル・台湾ドルを同時に表示しています。",
      imageSlot: "画像枠",
      replaceLater: "支給後に差し替え"
    },
    en: {
      shopName: "Sora Beauty",
      tagline: "Sample skincare and cosmetics catalog for Asia",
      sampleBanner: "This is a demo. The shop and products are fictional.",
      langLabel: "Language",
      currencyLabel: "Currency",
      all: "All",
      items: "items",
      note: "Prices use fixed demo rates for display switching. Production uses Markets multi-currency display.",
      triNote: "Names show Japanese, English and Traditional Chinese. Prices show JPY, USD and TWD together.",
      imageSlot: "Image slot",
      replaceLater: "replaced with supplied photo"
    },
    zh: {
      shopName: "Sora 美妝",
      tagline: "面向亞洲的保養與彩妝型錄範例",
      sampleBanner: "這是範例。店名與商品皆為虛構。",
      langLabel: "語言",
      currencyLabel: "貨幣",
      all: "全部",
      items: "件商品",
      note: "價格以固定示範匯率切換顯示。正式版改用 Markets 多貨幣顯示。",
      triNote: "商品名稱同時顯示日文、英文與繁體中文。價格同時顯示日圓、美元與台幣。",
      imageSlot: "圖片框",
      replaceLater: "日後換成提供照片"
    }
  };

  function normalizeLang(lang) {
    return LANGS.indexOf(lang) !== -1 ? lang : "ja";
  }

  function normalizeCurrency(currency) {
    return CURRENCIES.indexOf(currency) !== -1 ? currency : "JPY";
  }

  function categoryName(categoryId, lang) {
    var l = normalizeLang(lang);
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === categoryId) return CATEGORIES[i].name[l];
    }
    return "";
  }

  function productText(product, field, lang) {
    var l = normalizeLang(lang);
    if (product[field] && product[field][l]) return product[field][l];
    return product[field] ? product[field].ja : "";
  }

  function filterByCategory(products, categoryId) {
    if (!categoryId || categoryId === "all") return products.slice();
    return products.filter(function (p) { return p.category === categoryId; });
  }

  function convertPrice(priceJpy, currency) {
    var c = normalizeCurrency(currency);
    var value = priceJpy * RATES[c];
    if (c === "JPY") return Math.round(value);
    if (c === "TWD") return Math.round(value);
    return Math.round(value * 100) / 100;
  }

  function formatPrice(priceJpy, currency) {
    var c = normalizeCurrency(currency);
    var value = convertPrice(priceJpy, c);
    var body = c === "USD"
      ? value.toFixed(2)
      : String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return SYMBOLS[c] + body;
  }

  return {
    CATEGORIES: CATEGORIES,
    LANGS: LANGS,
    CURRENCIES: CURRENCIES,
    RATES: RATES,
    UI_TEXTS: UI_TEXTS,
    normalizeLang: normalizeLang,
    normalizeCurrency: normalizeCurrency,
    categoryName: categoryName,
    productText: productText,
    filterByCategory: filterByCategory,
    convertPrice: convertPrice,
    formatPrice: formatPrice
  };
});
