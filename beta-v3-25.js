(() => {
  if (document.body.classList.contains("v325-mobile-editorial")) return;
  document.body.classList.add("v325-mobile-editorial");

  const catalogProducts = typeof products !== "undefined" ? products : [];
  const mobileMedia = window.matchMedia("(max-width: 767px)");
  const encodeAsset = (path) =>
    String(path || "")
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");

  const rabbitMark = `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <ellipse cx="23" cy="17" rx="8" ry="15" fill="#fff6ea" stroke="currentColor" stroke-width="2" transform="rotate(-12 23 17)"/>
      <ellipse cx="41" cy="17" rx="8" ry="15" fill="#fff6ea" stroke="currentColor" stroke-width="2" transform="rotate(12 41 17)"/>
      <circle cx="32" cy="37" r="19" fill="#fff6ea" stroke="currentColor" stroke-width="2"/>
      <circle cx="25" cy="35" r="2" fill="currentColor"/>
      <circle cx="39" cy="35" r="2" fill="currentColor"/>
      <path d="M29 42c2 2 4 2 6 0M32 39v4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`;

  const brand = document.querySelector(".nav .brand");
  if (brand && !brand.querySelector(".v325-brand-mark")) {
    const mark = document.createElement("span");
    mark.className = "v325-brand-mark";
    mark.innerHTML = rabbitMark;
    brand.prepend(mark);
  }

  const navCta = document.querySelector(".navlinks .btn");
  if (navCta) navCta.textContent = "Composer sa box";

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

  if (composerSection && !composerSection.querySelector(".v325-composer-heading")) {
    const heading = document.createElement("div");
    heading.className = "v325-composer-heading v325-mobile-only";
    heading.innerHTML = `
      <span class="v325-kicker">La composition</span>
      <h2>Choisissez ses fleurs et ses plantes. Nous composons.</h2>
      <p>Ajoutez librement les références et les quantités souhaitées. Le prénom de votre lapin sera placé à l’intérieur de sa box.</p>
    `;
    composerSection.insertBefore(heading, composerSection.firstElementChild);
  }

  const addStepHeading = (screenNumber, step, title) => {
    const screen = document.querySelector(`.screen[data-screen="${screenNumber}"]`);
    if (!screen || screen.querySelector(".v325-step-heading")) return;
    const heading = document.createElement("div");
    heading.className = "v325-step-heading v325-mobile-only";
    heading.innerHTML = `<span>Étape ${step}</span><h3>${title}</h3>`;
    screen.insertBefore(heading, screen.firstElementChild);
  };

  addStepHeading(2, 1, "Ses fleurs");
  addStepHeading(3, 2, "Ses plantes & feuilles");

  const cart = document.querySelector(".builder-grid > .cart");
  let recapPreview = null;
  if (cart && !cart.querySelector(".v325-recap-preview")) {
    recapPreview = document.createElement("div");
    recapPreview.className = "v325-recap-preview v325-mobile-only";
    recapPreview.innerHTML = `
      <h4>Aperçu de votre composition</h4>
      <div class="v325-recap-grid"></div>
    `;
    const deliveryNote = document.getElementById("deliveryNote");
    if (deliveryNote) deliveryNote.insertAdjacentElement("afterend", recapPreview);
    else cart.appendChild(recapPreview);
  } else {
    recapPreview = cart?.querySelector(".v325-recap-preview") || null;
  }

  const readQuantities = () =>
    Array.from(document.querySelectorAll("#flowers .item, #leaves .item")).map((item) =>
      Number(item.querySelector(".qty span")?.textContent || 0),
    );

  const renderRecapPreview = () => {
    if (!recapPreview || !catalogProducts.length) return;
    const grid = recapPreview.querySelector(".v325-recap-grid");
    if (!grid) return;

    const quantities = readQuantities();
    const selected = catalogProducts
      .map((product, index) => ({ product, quantity: quantities[index] || 0 }))
      .filter((entry) => entry.quantity > 0);

    if (!selected.length) {
      grid.innerHTML = '<p class="v325-recap-empty">Votre composition apparaîtra ici dès le premier produit ajouté.</p>';
      return;
    }

    grid.innerHTML = selected
      .map(
        ({ product, quantity }) => `
          <div class="v325-recap-chip">
            <img src="${encodeAsset(product.img)}" alt="" loading="lazy" decoding="async" />
            <span>${product.name}</span>
            ${quantity > 1 ? `<b aria-label="Quantité ${quantity}">${quantity}</b>` : ""}
          </div>`,
      )
      .join("");
  };

  const baseRender = window.render;
  if (typeof baseRender === "function") {
    window.render = function renderV325() {
      const result = baseRender();
      renderRecapPreview();
      return result;
    };
  }

  document.querySelectorAll("[data-delivery-mode]").forEach((input) => {
    input.addEventListener("change", renderRecapPreview);
  });

  renderRecapPreview();

  const centerCatalog = () => {
    if (!mobileMedia.matches) return;
    const rail = document.querySelector(".v325-catalog-rail");
    const cards = rail?.querySelectorAll(".v325-catalog-card");
    if (!rail || !cards?.length || rail.dataset.initialized) return;
    rail.dataset.initialized = "true";
    requestAnimationFrame(() => {
      const secondCard = cards[Math.min(1, cards.length - 1)];
      if (secondCard) {
        rail.scrollLeft = Math.max(0, secondCard.offsetLeft - (rail.clientWidth - secondCard.clientWidth) / 2);
      }
    });
  };

  centerCatalog();
  if (mobileMedia.addEventListener) mobileMedia.addEventListener("change", centerCatalog);
  else window.addEventListener("resize", centerCatalog);
})();
