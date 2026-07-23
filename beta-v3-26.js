(() => {
  if (document.body.classList.contains("v326-desktop-ready")) return;
  document.body.classList.add("v326-desktop-ready");

  const desktopMedia = window.matchMedia("(min-width: 768px)");

  const enhanceDesktopComposition = () => {
    const inner = document.querySelector(".v325-composition-inner");
    if (!inner || inner.querySelector(":scope > .v326-products")) return;

    const productGroups = Array.from(inner.querySelectorAll(":scope > .v325-product-group"));
    const mode = inner.querySelector(":scope > .v325-mode-switch");
    const validation = inner.querySelector(":scope > .v325-validation-copy");
    const total = inner.querySelector(":scope > .v325-total-summary");
    const preview = inner.querySelector(":scope > .v325-composition-preview");
    const checkout = inner.querySelector(":scope > .v325-review-button");

    if (productGroups.length !== 2 || !mode || !validation || !total || !preview || !checkout) return;

    const productsColumn = document.createElement("div");
    productsColumn.className = "v326-products";
    productGroups.forEach((group) => productsColumn.appendChild(group));

    const summaryColumn = document.createElement("aside");
    summaryColumn.className = "v326-summary";
    summaryColumn.setAttribute("aria-label", "Résumé de la composition");

    const summaryHeading = document.createElement("div");
    summaryHeading.className = "v326-summary-heading";
    summaryHeading.innerHTML = `
      <span>Votre composition</span>
      <h3>La box prend forme.</h3>
      <p>Vérifiez le rythme de livraison, le total et les références sélectionnées avant le paiement.</p>
    `;

    summaryColumn.append(summaryHeading, mode, validation, total, preview, checkout);
    inner.append(productsColumn, summaryColumn);
  };

  const baseRender = window.render;
  if (typeof baseRender === "function") {
    window.render = function renderV326() {
      const result = baseRender();
      requestAnimationFrame(enhanceDesktopComposition);
      return result;
    };
  }

  const syncDesktopClass = () => {
    document.body.classList.toggle("v326-desktop-layout", desktopMedia.matches);
    requestAnimationFrame(enhanceDesktopComposition);
  };

  syncDesktopClass();
  if (desktopMedia.addEventListener) desktopMedia.addEventListener("change", syncDesktopClass);
  else window.addEventListener("resize", syncDesktopClass);

  window.addEventListener("pageshow", () => requestAnimationFrame(enhanceDesktopComposition));
})();