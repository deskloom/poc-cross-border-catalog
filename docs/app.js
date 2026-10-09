/* 画面の表示切り替え。外部通信なし。切り替え自体は見本用の固定表示。 */
(function () {
  "use strict";

  var state = { lang: "ja", currency: "JPY", category: "all" };

  var LANG_TAG = { ja: "日", en: "EN", zh: "繁中" };

  function t() {
    return window.Catalog.UI_TEXTS[state.lang];
  }

  function otherLangs() {
    return window.Catalog.LANGS.filter(function (l) { return l !== state.lang; });
  }

  function otherCurrencies() {
    return window.Catalog.CURRENCIES.filter(function (c) { return c !== state.currency; });
  }

  function renderSwitcher(id, values, current, onPick) {
    var el = document.getElementById(id);
    el.innerHTML = "";
    values.forEach(function (v) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = v.label;
      b.setAttribute("aria-pressed", v.value === current ? "true" : "false");
      b.addEventListener("click", function () { onPick(v.value); });
      el.appendChild(b);
    });
  }

  function renderCategories() {
    var nav = document.getElementById("category-nav");
    nav.innerHTML = "";
    var all = document.createElement("button");
    all.type = "button";
    all.className = "category-card all";
    all.setAttribute("aria-pressed", state.category === "all" ? "true" : "false");
    all.textContent = t().all;
    all.addEventListener("click", function () {
      state.category = "all";
      render();
    });
    nav.appendChild(all);
    window.Catalog.CATEGORIES.forEach(function (c) {
      var count = window.Catalog.filterByCategory(window.PRODUCTS, c.id).length;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "category-card";
      b.setAttribute("data-cat", c.id);
      b.setAttribute("aria-pressed", state.category === c.id ? "true" : "false");
      var label = document.createElement("span");
      label.textContent = c.name[state.lang];
      var sub = document.createElement("small");
      sub.textContent = count + " " + t().items;
      b.appendChild(label);
      b.appendChild(sub);
      b.addEventListener("click", function () {
        state.category = c.id;
        render();
        document.getElementById("results").scrollIntoView({ block: "start" });
      });
      nav.appendChild(b);
    });
  }

  function renderProducts() {
    var list = document.getElementById("results");
    list.innerHTML = "";
    var items = window.Catalog.filterByCategory(window.PRODUCTS, state.category);
    var langs = otherLangs();
    var currencies = otherCurrencies();
    items.forEach(function (p) {
      var li = document.createElement("li");
      li.className = "card";
      li.setAttribute("data-cat", p.category);
      var slot = document.createElement("div");
      slot.className = "slot";
      slot.setAttribute("aria-hidden", "true");
      var slotName = document.createElement("span");
      slotName.className = "slot-name";
      slotName.textContent = t().imageSlot + ": " + p.image;
      var slotSub = document.createElement("small");
      slotSub.textContent = t().replaceLater;
      slot.appendChild(slotName);
      slot.appendChild(slotSub);
      var body = document.createElement("div");
      body.className = "body";
      var cat = document.createElement("span");
      cat.className = "cat";
      cat.textContent = window.Catalog.categoryName(p.category, state.lang);
      var h = document.createElement("h3");
      h.textContent = window.Catalog.productText(p, "name", state.lang);
      var alt = document.createElement("p");
      alt.className = "alt-names";
      alt.textContent = langs.map(function (l) {
        return LANG_TAG[l] + ": " + window.Catalog.productText(p, "name", l);
      }).join(" / ");
      var d = document.createElement("p");
      d.textContent = window.Catalog.productText(p, "desc", state.lang);
      var price = document.createElement("span");
      price.className = "price";
      price.textContent = window.Catalog.formatPrice(p.priceJpy, state.currency);
      var sub = document.createElement("span");
      sub.className = "sub-prices";
      sub.textContent = currencies.map(function (c) {
        return window.Catalog.formatPrice(p.priceJpy, c);
      }).join(" / ");
      body.appendChild(cat);
      body.appendChild(h);
      body.appendChild(alt);
      body.appendChild(d);
      body.appendChild(price);
      body.appendChild(sub);
      li.appendChild(slot);
      li.appendChild(body);
      list.appendChild(li);
    });
    var line = document.getElementById("result-line");
    var shown = items.length;
    line.textContent = shown + " " + t().items + " / " + state.currency;
  }

  function render() {
    document.documentElement.lang =
      state.lang === "zh" ? "zh-Hant" : state.lang;
    document.getElementById("sample-banner").textContent = t().sampleBanner;
    document.getElementById("shop-name").textContent = t().shopName;
    document.getElementById("tagline").textContent = t().tagline;
    document.getElementById("tri-note").textContent = t().triNote;
    document.getElementById("lang-label").textContent = t().langLabel;
    document.getElementById("currency-label").textContent = t().currencyLabel;
    document.getElementById("note").textContent = t().note;
    renderSwitcher("lang-switcher",
      window.Catalog.LANGS.map(function (l) {
        return { value: l, label: l === "zh" ? "繁體中文" : l === "en" ? "English" : "日本語" };
      }),
      state.lang,
      function (v) { state.lang = v; render(); });
    renderSwitcher("currency-switcher",
      window.Catalog.CURRENCIES.map(function (c) { return { value: c, label: c }; }),
      state.currency,
      function (v) { state.currency = v; render(); });
    renderCategories();
    renderProducts();
  }

  document.addEventListener("DOMContentLoaded", render);
})();
