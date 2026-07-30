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

  function safeTitle(value) {
    const escaped = escapeHtml(value);

    return escaped
      .replaceAll("&lt;strong&gt;", "<strong>")
      .replaceAll("&lt;/strong&gt;", "</strong>");
  }

  function parseFanSize(specValue) {
    const numbers =
      String(specValue || "").match(/\d+(?:\.\d+)?/g) || [];

    if (numbers.length < 3) {
      return null;
    }

    return [
      {
        value: numbers[0],
        label: "Width · mm"
      },
      {
        value: numbers[1],
        label: "Height · mm"
      },
      {
        value: numbers[2],
        label: "Thickness · mm"
      }
    ];
  }
function featureTemplate(feature, index) {
  const side =
    feature.textSide === "right"
      ? "right"
      : "left";

  const image =
    escapeHtml(feature.image || "");

  return `
    <section
      id="xqz-feature-${index}"
      class="xqz-feature is-${side}"
      style="background-image:url('${image}')"
    >
      <div class="xqz-feature-content xqz-reveal">
        <span class="xqz-number">
          ${escapeHtml(feature.number)}
        </span>

        <h2 class="xqz-title">
          ${safeTitle(feature.title)}
        </h2>

        <p class="xqz-description-text">
          ${escapeHtml(feature.description)}
        </p>
      </div>
    </section>
  `;
}

  function statementTemplate(statement) {
    if (!statement) {
      return "";
    }

    const background =
      escapeHtml(statement.background || "");

    return `
      <section
        class="xqz-statement xqz-reveal"
        style="background-image:url('${background}')"
      >
        <div class="xqz-statement-inner">

          <span class="xqz-statement-eyebrow">
            ${escapeHtml(statement.eyebrow)}
          </span>

          <h2 class="xqz-statement-title">
            ${escapeHtml(statement.title)}
          </h2>

          <p class="xqz-statement-description">
            ${escapeHtml(statement.description)}
          </p>

          <div class="xqz-statement-line"></div>

        </div>
      </section>
    `;
  }

  function sizeTemplate(product) {
  const productSize =
    product?.xqzDescription?.productSize;

  if (!productSize) {
    return "";
  }

  const dimensions =
    Array.isArray(productSize.dimensions)
      ? productSize.dimensions
      : [];

  const image =
    escapeHtml(productSize.image || "");

  return `
   <section
  class="xqz-feature is-left"
  style="background-image:url('${image}')"
>
  <div class="xqz-feature-content xqz-reveal">
      <div class="xqz-feature-content">

        <span class="xqz-number">
          ${escapeHtml(productSize.number || "3.5")}
        </span>

        <h2 class="xqz-title">
          ${safeTitle(productSize.title || "")}
        </h2>

        <p class="xqz-description-text">
          ${escapeHtml(productSize.description || "")}
        </p>

        ${
          dimensions.length
            ? `
              <div class="xqz-size-grid">
                ${dimensions.map(item => `
                  <div class="xqz-size-card">
                    <strong>
                      ${escapeHtml(item.value)}
                    </strong>

                    <span>
                      ${escapeHtml(item.label)}
                      ${item.unit ? ` · ${escapeHtml(item.unit)}` : ""}
                    </span>
                  </div>
                `).join("")}
              </div>
            `
            : ""
        }

      </div>
    </section>
  `;
}

  function enableAnimation(root) {
    const items =
      root.querySelectorAll(".xqz-reveal");

    if (!("IntersectionObserver" in window)) {
      items.forEach(item => {
        item.classList.add("is-visible");
      });

      return;
    }

    const observer =
      new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "is-visible"
              );
            } else {
              entry.target.classList.remove(
                "is-visible"
              );
            }
          });
        },
        {
          threshold: 0.16
        }
      );

    items.forEach(item => {
      item.classList.remove("is-visible");
      observer.observe(item);
    });
  }

  function renderXQZDescription(product, target) {
    const root =
      typeof target === "string"
        ? document.querySelector(target)
        : target;

    if (!root) {
      throw new Error(
        "XQZ target container was not found."
      );
    }

    const description =
      product?.xqzDescription;

    if (
      !description ||
      !Array.isArray(description.features)
    ) {
      root.innerHTML = `
        <div class="xqz-empty">
          No xqzDescription data found for this product.
        </div>
      `;

      return;
    }

    const features =
      description.features;

    const statements =
      Array.isArray(description.statements)
        ? description.statements
        : [];

    let html = "";

    features.forEach((feature, index) => {
      html += featureTemplate(feature, index);

      const featurePosition =
        index + 1;

      const matchingStatements =
        statements.filter(
          statement =>
            Number(statement.position) ===
            featurePosition
        );

      matchingStatements.forEach(statement => {
        html += statementTemplate(statement);
      });
    });

    html += sizeTemplate(product);

    root.innerHTML = html;

    enableAnimation(root);
  }

  async function loadXQZFromJson(options) {
    const {
      jsonUrl,
      productId,
      target = "#xqz-description"
    } = options || {};

    const response =
      await fetch(jsonUrl);

    if (!response.ok) {
      throw new Error(
        `Unable to load ${jsonUrl}: ${response.status}`
      );
    }

    const data =
      await response.json();

    const products =
      Array.isArray(data)
        ? data
        : data.products || [];

    const product =
      products.find(
        item => item.id === productId
      );

    if (!product) {
      throw new Error(
        `Product id "${productId}" was not found.`
      );
    }

    renderXQZDescription(
      product,
      target
    );

    return product;
  }

  window.renderXQZDescription =
    renderXQZDescription;

  window.loadXQZFromJson =
    loadXQZFromJson;
})();