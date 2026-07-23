(() => {
  if (document.body.classList.contains("v326-desktop-ready")) return;
  document.body.classList.add("v326-desktop-ready");

  const desktopMedia = window.matchMedia("(min-width: 768px)");

  const moveBunnyArmyAfterComposer = () => {
    const composer = document.getElementById("composer");
    const bunnyArmy = document.getElementById("preuves");

    if (!composer || !bunnyArmy || composer.nextElementSibling === bunnyArmy) return;
    composer.insertAdjacentElement("afterend", bunnyArmy);
  };

  const enhanceDesktopComposition = () => {
    if (!desktopMedia.matches) return;

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

  const restoreMobileComposition = () => {
    if (desktopMedia.matches) return;

    const inner = document.querySelector(".v325-composition-inner");
    const productsColumn = inner?.querySelector(":scope > .v326-products");
    const summaryColumn = inner?.querySelector(":scope > .v326-summary");
    if (!inner || !productsColumn || !summaryColumn) return;

    const groups = Array.from(productsColumn.querySelectorAll(":scope > .v325-product-group"));
    const summaryItems = Array.from(summaryColumn.children).filter(
      (element) => !element.classList.contains("v326-summary-heading"),
    );

    groups.forEach((group) => inner.appendChild(group));
    summaryItems.forEach((element) => inner.appendChild(element));
    productsColumn.remove();
    summaryColumn.remove();
  };

  const syncCompositionLayout = () => {
    document.body.classList.toggle("v326-desktop-layout", desktopMedia.matches);
    moveBunnyArmyAfterComposer();
    requestAnimationFrame(() => {
      if (desktopMedia.matches) enhanceDesktopComposition();
      else restoreMobileComposition();
    });
  };

  const baseRender = window.render;
  if (typeof baseRender === "function") {
    window.render = function renderV326() {
      const result = baseRender();
      requestAnimationFrame(() => {
        moveBunnyArmyAfterComposer();
        if (desktopMedia.matches) enhanceDesktopComposition();
        else restoreMobileComposition();
      });
      return result;
    };
  }

  syncCompositionLayout();
  if (desktopMedia.addEventListener) desktopMedia.addEventListener("change", syncCompositionLayout);
  else window.addEventListener("resize", syncCompositionLayout);

  window.addEventListener("pageshow", syncCompositionLayout);
})();