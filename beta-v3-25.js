(() => {
  if (document.body.classList.contains("v325-mobile-editorial")) return;
  document.body.classList.add("v325-mobile-editorial");

  const catalogProducts = typeof products !== "undefined" ? products : [];
  const mobileMedia = window.matchMedia("(max-width: 767px)");
  const FREE_DELIVERY = 29.9;
  const formatMoney = (value) =>
    Number(value || 0).toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });
  const encodeAsset = (path) =>
    String(path || "")
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");

  const personalisationSection = document.querySelector(".v322-personalise");
  const composerSection = document.getElementById("composer");

  if (
    catalogProducts.length &&
    !document.querySelector(".v325-catalog") &&
    (personalisationSection || composerSection)
  ) {
    const catalog = document.createElement("section");
    catalog.className = "v325-catalog v325-mobile-only";
    catalog.id = "v325-references";
    catalog.innerHTML = `
      <div class="v325-catalog-heading">
        <span class="v325-kicker">Les 8 références</span>
        <h2>Ce que votre lapin trouve dans sa box.</h2>
        <p>Quatre fleurs et quatre plantes séchées, proposées en petits formats pour composer une sélection vraiment personnelle.</p>
      </div>
      <div class="v325-catalog-rail" aria-label="Les huit références de La Maison Winnie">
        ${catalogProducts
          .map(
            (product, index) => `
              <article class="v325-catalog-card">
                <div class="v325-catalog-image">
                  <img src="${encodeAsset(product.img)}" alt="${product.name} séché" loading="lazy" decoding="async" />
                </div>
                <strong>${product.name}</strong>
                <small>${product.cat === "flower" ? "Fleur" : "Plante & feuille"} · ${product.w}</small>
                <button type="button" data-v325-product-index="${index}">Découvrir la fiche</button>
              </article>`,
          )
          .join("")}
      </div>
      <div class="v325-swipe-hint" aria-hidden="true"><span>←</span><span>Glisser pour parcourir</span><span>→</span></div>
    `;

    const anchor = personalisationSection || composerSection;
    anchor.insertAdjacentElement("beforebegin", catalog);

    catalog.addEventListener("click", (event) => {
      const button = event.target.closest("[data-v325-product-index]");
      if (!button || typeof window.openInfo !== "function") return;
      window.openInfo(Number(button.dataset.v325ProductIndex));
    });
  }

  let compositionUi = null;

  if (composerSection && catalogProducts.length) {
    const heading = document.createElement("div");
    heading.className = "v325-composer-heading v325-mobile-only";
    heading.innerHTML = `
      <span class="v325-kicker">La composition</span>
      <span class="v325-heading-line" aria-hidden="true"></span>
      <h2>Choisissez ses fleurs et ses plantes. Nous composons.</h2>
    `;
    composerSection.insertBefore(heading, composerSection.firstElementChild);

    compositionUi = document.createElement("div");
    compositionUi.className = "v325-composition-ui v325-mobile-only";
    compositionUi.id = "v325-composition-ui";
    compositionUi.setAttribute("aria-label", "Composer la box de votre lapin");

    const builderGrid = composerSection.querySelector(".builder-grid");
    if (builderGrid) composerSection.insertBefore(compositionUi, builderGrid);
    else composerSection.appendChild(compositionUi);
  }

  const readQuantity = (index) => {
    if (typeof st !== "undefined" && st.p?.[index]) {
      return Number(st.p[index].q || 0);
    }
    const hiddenItems = document.querySelectorAll("#flowers .item, #leaves .item");
    return Number(hiddenItems[index]?.querySelector(".qty span")?.textContent || 0);
  };

  const readDeliveryMode = () => {
    if (typeof st !== "undefined") return st.deliveryMode || "one_time";
    return document.querySelector("[data-delivery-mode]:checked")?.value || "one_time";
  };

  const choiceRow = (product, index) => {
    const quantity = readQuantity(index);
    const selected = quantity > 0;
    return `
      <article class="v325-choice-row${selected ? " is-selected" : ""}">
        <button type="button" class="v325-choice-info" data-v325-info="${index}" aria-label="Voir la fiche de ${product.name}">
          <span class="v325-choice-image">
            <img src="${encodeAsset(product.img)}" alt="" loading="lazy" decoding="async" />
          </span>
          <span class="v325-choice-copy">
            <strong>${product.name}</strong>
            <small>${product.w}</small>
          </span>
        </button>
        <div class="v325-choice-action">
          ${
            selected
              ? `<div class="v325-choice-qty" role="group" aria-label="Quantité de ${product.name}">
                   <button type="button" data-v325-adjust="${index}" data-v325-delta="-1" aria-label="Retirer un sachet de ${product.name}">−</button>
                   <span aria-live="polite">${quantity}</span>
                   <button type="button" data-v325-adjust="${index}" data-v325-delta="1" aria-label="Ajouter un sachet de ${product.name}">+</button>
                 </div>`
              : `<span class="v325-choice-price">dès ${formatMoney(product.p)}</span>
                 <button type="button" class="v325-choice-add" data-v325-adjust="${index}" data-v325-delta="1" aria-label="Ajouter ${product.name}">+</button>`
          }
        </div>
      </article>`;
  };

  const previewChip = (product, quantity) => `
    <div class="v325-preview-chip">
      <img src="${encodeAsset(product.img)}" alt="" loading="lazy" decoding="async" />
      <span>${product.name}</span>
      ${quantity > 1 ? `<b aria-label="Quantité ${quantity}">${quantity}</b>` : ""}
    </div>`;

  const renderComposition = () => {
    if (!compositionUi || !catalogProducts.length) return;

    const quantities = catalogProducts.map((_, index) => readQuantity(index));
    const selected = catalogProducts
      .map((product, index) => ({ product, index, quantity: quantities[index] }))
      .filter((entry) => entry.quantity > 0);
    const total = selected.reduce(
      (sum, entry) => sum + entry.quantity * Number(entry.product.p || 0),
      0,
    );
    const count = selected.reduce((sum, entry) => sum + entry.quantity, 0);
    const remaining = Math.max(0, FREE_DELIVERY - total);
    const progress = Math.min(100, (total / FREE_DELIVERY) * 100);
    const deliveryMode = readDeliveryMode();
    const flowers = catalogProducts
      .map((product, index) => ({ product, index }))
      .filter((entry) => entry.product.cat === "flower");
    const leaves = catalogProducts
      .map((product, index) => ({ product, index }))
      .filter((entry) => entry.product.cat === "leaf");

    const deliveryText =
      total >= FREE_DELIVERY
        ? "Livraison offerte — seuil atteint."
        : total > 0
          ? `Encore ${formatMoney(remaining)} avant la livraison offerte.`
          : "La livraison est offerte dès 29,90 € de produits.";

    compositionUi.innerHTML = `
      <div class="v325-composition-inner">
        <section class="v325-product-group" aria-labelledby="v325-flowers-title">
          <h3 id="v325-flowers-title"><span>Étape 1 —</span> Fleurs</h3>
          <div class="v325-choice-list">
            ${flowers.map(({ product, index }) => choiceRow(product, index)).join("")}
          </div>
        </section>

        <section class="v325-product-group" aria-labelledby="v325-leaves-title">
          <h3 id="v325-leaves-title"><span>Étape 2 —</span> Plantes & feuilles</h3>
          <div class="v325-choice-list">
            ${leaves.map(({ product, index }) => choiceRow(product, index)).join("")}
          </div>
        </section>

        <div class="v325-mode-switch" role="group" aria-label="Rythme de livraison">
          <button type="button" data-v325-mode="one_time" aria-pressed="${deliveryMode === "one_time"}" class="${deliveryMode === "one_time" ? "is-active" : ""}">Achat ponctuel</button>
          <button type="button" data-v325-mode="monthly" aria-pressed="${deliveryMode === "monthly"}" class="${deliveryMode === "monthly" ? "is-active" : ""}">Abonnement mensuel</button>
        </div>

        <div class="v325-validation-copy">
          <p><strong>Étape 3 — validation :</strong> vérifiez votre sélection, le prénom de votre lapin, le total et le statut de livraison avant le paiement.</p>
          <small>${deliveryMode === "monthly" ? "Votre sélection sera préparée chaque mois. Sans engagement, annulable à tout moment." : "Une seule préparation et un seul paiement."}</small>
        </div>

        <div class="v325-total-summary" aria-live="polite">
          <div class="v325-total-line">
            <span>Total estimé</span>
            <strong>${formatMoney(total)}</strong>
          </div>
          <p class="${total >= FREE_DELIVERY ? "is-reached" : ""}">${deliveryText}</p>
          <div class="v325-total-progress" role="progressbar" aria-label="Progression vers la livraison offerte" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(progress)}"><span style="width:${progress}%"></span></div>
        </div>

        <div class="v325-composition-preview">
          <div class="v325-preview-grid">
            ${
              selected.length
                ? selected.map(({ product, quantity }) => previewChip(product, quantity)).join("")
                : '<p class="v325-preview-empty">Ajoutez vos premières fleurs ou plantes : votre composition apparaîtra ici.</p>'
            }
          </div>
          <div class="v325-preview-caption">Aperçu de votre composition</div>
        </div>

        <button type="button" class="v325-review-button" data-v325-show-recap ${count === 0 ? "disabled" : ""}>
          ${count === 0 ? "Ajoutez un produit pour continuer" : `Voir le récapitulatif · ${count} produit${count > 1 ? "s" : ""}`}
        </button>
      </div>
    `;
  };

  if (compositionUi) {
    compositionUi.addEventListener("click", (event) => {
      const adjustment = event.target.closest("[data-v325-adjust]");
      if (adjustment) {
        const index = Number(adjustment.dataset.v325Adjust);
        const delta = Number(adjustment.dataset.v325Delta);
        if (Number.isInteger(index) && delta && typeof window.changeP === "function") {
          window.changeP(index, delta);
        }
        return;
      }

      const info = event.target.closest("[data-v325-info]");
      if (info) {
        const index = Number(info.dataset.v325Info);
        if (Number.isInteger(index) && typeof window.openInfo === "function") {
          window.openInfo(index);
        }
        return;
      }

      const mode = event.target.closest("[data-v325-mode]");
      if (mode && typeof window.setDeliveryMode === "function") {
        window.setDeliveryMode(mode.dataset.v325Mode);
        return;
      }

      const recap = event.target.closest("[data-v325-show-recap]");
      if (recap && !recap.disabled && typeof window.showRecap === "function") {
        window.showRecap();
      }
    });
  }

  const baseRender = window.render;
  if (typeof baseRender === "function") {
    window.render = function renderV325() {
      const result = baseRender();
      renderComposition();
      return result;
    };
  }

  renderComposition();

  const centerCatalog = () => {
    if (!mobileMedia.matches) return;
    const rail = document.querySelector(".v325-catalog-rail");
    const cards = rail?.querySelectorAll(".v325-catalog-card");
    if (!rail || !cards?.length || rail.dataset.initialized) return;
    rail.dataset.initialized = "true";
    requestAnimationFrame(() => {
      const secondCard = cards[Math.min(1, cards.length - 1)];
      if (secondCard) {
        rail.scrollLeft = Math.max(
          0,
          secondCard.offsetLeft - (rail.clientWidth - secondCard.clientWidth) / 2,
        );
      }
    });
  };

  centerCatalog();
  if (mobileMedia.addEventListener) mobileMedia.addEventListener("change", centerCatalog);
  else window.addEventListener("resize", centerCatalog);
})();