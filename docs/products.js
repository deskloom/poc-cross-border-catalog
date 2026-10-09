/* 架空商品データ12点（4カテゴリー×3点）。すべて創作の見本品。 */
/* image は支給後に差し替える画像ファイル名の枠。40点ぶんの雛形は shopify/products.csv。 */
(function (root, factory) {
  var data = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = data;
  } else {
    root.PRODUCTS = data;
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  return [
    {
      id: "p01", category: "skincare", priceJpy: 1800, image: "skincare-01.jpg",
      name: { ja: "あわ洗顔フォーム", en: "Foam Face Wash", zh: "泡沫洗面乳" },
      desc: { ja: "きめ細かい泡で洗う洗顔料。", en: "Fine-foam daily face wash.", zh: "綿密泡沫的日常洗面乳。" }
    },
    {
      id: "p02", category: "skincare", priceJpy: 2400, image: "skincare-02.jpg",
      name: { ja: "しっとり化粧水", en: "Moist Lotion", zh: "保濕化妝水" },
      desc: { ja: "乾燥しやすい肌のための化粧水。", en: "Lotion for dry-prone skin.", zh: "適合偏乾肌膚的化妝水。" }
    },
    {
      id: "p03", category: "skincare", priceJpy: 3200, image: "skincare-03.jpg",
      name: { ja: "おやすみ保湿クリーム", en: "Night Moisture Cream", zh: "晚安保濕霜" },
      desc: { ja: "夜のケア用の保湿クリーム。", en: "Night-time moisture cream.", zh: "夜間護理用保濕霜。" }
    },
    {
      id: "p04", category: "makeup", priceJpy: 1500, image: "makeup-01.jpg",
      name: { ja: "さらさら日やけ止め下地", en: "Smooth Sun Base", zh: "清爽防曬妝前乳" },
      desc: { ja: "化粧下地にもなる日やけ止め。", en: "Sunscreen that works as a primer.", zh: "可當妝前乳的防曬乳。" }
    },
    {
      id: "p05", category: "makeup", priceJpy: 1300, image: "makeup-02.jpg",
      name: { ja: "にじみにくいマスカラ", en: "Smudge-proof Mascara", zh: "不易暈染睫毛膏" },
      desc: { ja: "汗や皮脂に強いマスカラ。", en: "Mascara resistant to sweat and oil.", zh: "抗汗抗油的睫毛膏。" }
    },
    {
      id: "p06", category: "makeup", priceJpy: 1600, image: "makeup-03.jpg",
      name: { ja: "うるおい色つきリップ", en: "Moist Tinted Lip", zh: "保濕潤色護唇膏" },
      desc: { ja: "ほんのり色づく保湿リップ。", en: "Lightly tinted moisture lip.", zh: "微微顯色的保濕潤唇膏。" }
    },
    {
      id: "p07", category: "haircare", priceJpy: 1400, image: "haircare-01.jpg",
      name: { ja: "さっぱりシャンプー", en: "Fresh Shampoo", zh: "清爽洗髮精" },
      desc: { ja: "地肌をすっきり洗うシャンプー。", en: "Shampoo that cleanses the scalp.", zh: "清爽洗淨頭皮的洗髮精。" }
    },
    {
      id: "p08", category: "haircare", priceJpy: 1400, image: "haircare-02.jpg",
      name: { ja: "まとまりトリートメント", en: "Smooth Treatment", zh: "柔順護髮素" },
      desc: { ja: "毛先までまとまる洗い流すケア。", en: "Rinse-out care for tidy ends.", zh: "讓髮尾柔順的沖洗式護理。" }
    },
    {
      id: "p09", category: "haircare", priceJpy: 1900, image: "haircare-03.jpg",
      name: { ja: "つや出しヘアオイル", en: "Shine Hair Oil", zh: "亮澤護髮油" },
      desc: { ja: "少量でつやを出す洗い流さないケア。", en: "Leave-in oil for shine.", zh: "免沖洗的亮澤護髮油。" }
    },
    {
      id: "p10", category: "bodycare", priceJpy: 1200, image: "bodycare-01.jpg",
      name: { ja: "やさしいボディソープ", en: "Gentle Body Soap", zh: "溫和沐浴露" },
      desc: { ja: "家族で使える弱酸性の洗浄料。", en: "Mild cleanser for the whole family.", zh: "全家可用的溫和洗淨露。" }
    },
    {
      id: "p11", category: "bodycare", priceJpy: 2100, image: "bodycare-02.jpg",
      name: { ja: "しっとりボディミルク", en: "Soft Body Milk", zh: "保濕身體乳" },
      desc: { ja: "お風呂上がりの保湿ミルク。", en: "After-bath moisture milk.", zh: "沐浴後的保濕身體乳。" }
    },
    {
      id: "p12", category: "bodycare", priceJpy: 980, image: "bodycare-03.jpg",
      name: { ja: "さらさら制汗シート", en: "Fresh Deo Sheets", zh: "清爽制汗濕巾" },
      desc: { ja: "外出先で使える汗ふきシート。", en: "On-the-go sweat wipes.", zh: "外出可用的汗水濕巾。" }
    }
  ];
});
