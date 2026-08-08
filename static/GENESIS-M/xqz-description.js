(function () {
  "use strict";

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // Your title contains <strong>. Only that tag is allowed.
  function safeTitle(value) {
    const escaped = escapeHtml(value);
    return escaped
      .replaceAll("&lt;strong&gt;", "<strong>")
      .replaceAll("&lt;/strong&gt;", "</strong>");
  }

  function parseFanSize(specValue) {
    const numbers = String(specValue || "").match(/\d+(?:\.\d+)?/g) || [];
    if (numbers.length < 3) return null;
    return [
      { value: numbers[0], label: "Width · mm" },
      { value: numbers[1], label: "Height · mm" },
      { value: numbers[2], label: "Thickness · mm" }
    ];
  }

  function featureTemplate(feature) {
    const side = feature.textSide === "right" ? "right" : "left";
    const image = escapeHtml(feature.image || "");

    return `
      <section class="xqz-feature is-${side} xqz-reveal"
        style="background-image: linear-gradient(90deg, rgba(0,0,0,.46), rgba(0,0,0,.08)), url('${image}')">
        <div class="xqz-feature-content">
          <span class="xqz-number">${escapeHtml(feature.number)}</span>
          <h2 class="xqz-title">${safeTitle(feature.title)}</h2>
          <p class="xqz-description-text">${escapeHtml(feature.description)}</p>
        </div>
      </section>`;
  }

  function statementTemplate(statement) {
    if (!statement) return "";
    return `
      <section class="xqz-statement xqz-reveal">
        <div class="xqz-statement-inner">
          <span class="xqz-statement-eyebrow">${escapeHtml(statement.eyebrow)}</span>
          <h2 class="xqz-statement-title">${escapeHtml(statement.title)}</h2>
          <p class="xqz-statement-description">${escapeHtml(statement.description)}</p>
          <div class="xqz-statement-line"></div>
        </div>
      </section>`;
  }

  function sizeTemplate(product) {
    const size = parseFanSize(product?.specs?.["Fan Size"]);
    if (!size) return "";

    return `
      <section class="xqz-feature is-left xqz-reveal">
        <div class="xqz-feature-content">
          <span class="xqz-number">3.5</span>
          <h2 class="xqz-title">PRODUCT <strong>SIZE</strong></h2>
          <p class="xqz-description-text">Standard fan dimensions for compatibility with most PC cases and radiators.</p>
          <div class="xqz-size-grid">
            ${size.map(item => `
              <div class="xqz-size-card">
                <strong>${escapeHtml(item.value)}</strong>
                <span>${escapeHtml(item.label)}</span>
              </div>`).join("")}
          </div>
        </div>
      </section>`;
  }

  function enableAnimation(root) {
    const items = root.querySelectorAll(".xqz-reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(item => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.16 });

    items.forEach(item => observer.observe(item));
  }

  function renderXQZDescription(product, target) {
    const root = typeof target === "string" ? document.querySelector(target) : target;
    if (!root) throw new Error("XQZ target container was not found.");

    const description = product?.xqzDescription;
    if (!description || !Array.isArray(description.features)) {
      root.innerHTML = '<div class="xqz-empty">No xqzDescription data found for this product.</div>';
      return;
    }

    const features = description.features;
    const splitIndex = Math.min(2, features.length);
    const beforeStatement = features.slice(0, splitIndex).map(featureTemplate).join("");
    const afterStatement = features.slice(splitIndex).map(featureTemplate).join("");

    root.innerHTML = `
      ${beforeStatement}
      ${statementTemplate(description.statement)}
      ${afterStatement}
      ${sizeTemplate(product)}
    `;

    enableAnimation(root);
  }

  async function loadXQZFromJson(options) {
    const { jsonUrl, productId, target = "#xqz-description" } = options || {};
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error(`Unable to load ${jsonUrl}: ${response.status}`);

    const data = await response.json();
    const products = Array.isArray(data) ? data : (data.products || []);
    const product = products.find(item => item.id === productId);
    if (!product) throw new Error(`Product id "${productId}" was not found.`);

    renderXQZDescription(product, target);
    return product;
  }

  window.renderXQZDescription = renderXQZDescription;
  window.loadXQZFromJson = loadXQZFromJson;
})();
