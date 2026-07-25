(() => {
  if (document.body.classList.contains("v329-config-copy-info-ready")) return;
  document.body.classList.add("v329-config-copy-info-ready");

  const TITLE = "Ou bien, composez vous-même sa box.";
  const SUBTITLE = "Choisissez librement ses fleurs et ses plantes, puis ajustez chaque quantité selon vos envies.";

  const normalizeText = (value) => String(value || "").replace(/\s+/g, " ").trim();

  const productIndexFromImage = (img) => {
    if (typeof products === "undefined" || !Array.isArray(products)) return -1;
    const src = decodeURIComponent(String(img?.getAttribute("src") || ""));
    const alt = normalizeText(img?.getAttribute("alt")).toLowerCase();
    return products.findIndex((product) => {
      const productSrc = decodeURIComponent(String(product.img || ""));
      const name = normalizeText(product.name).toLowerCase();
      return src.includes(productSrc) || (alt && alt.includes(name));
    });
  };

  const updateHeading = () => {
    document.querySelectorAll(".v325-composer-heading").forEach((heading) => {
      const kicker = heading.querySelector(".v325-kicker");
      const title = heading.querySelector("h2");
      if (kicker) kicker.textContent = "La composition sur mesure";
      if (title) title.textContent = TITLE;

      let subtitle = heading.querySelector(".v329-composer-subtitle");
      if (!subtitle) {
        subtitle = document.createElement("p");
        subtitle.className = "v329-composer-subtitle";
        heading.appendChild(subtitle);
      }
      subtitle.textContent = SUBTITLE;
    });

    const composer = document.getElementById("composer");
    if (composer) {
      composer.querySelectorAll("h2").forEach((title) => {
        const text = normalizeText(title.textContent).toLowerCase();
        if (text.includes("choisissez ses fleurs") && text.includes("plantes")) title.textContent = TITLE;
      });
    }

    const storyCopy = document.querySelector(".v328-story-head > p");
    if (storyCopy) storyCopy.textContent = SUBTITLE;
  };

  const addInfoBadge = (container, index, label) => {
    if (!container || index < 0 || container.querySelector(":scope > .v329-info-badge-global")) return;
    container.classList.add("v329-info-host");
    const badge = document.createElement("button");
    badge.type = "button";
    badge.className = "v329-info-badge-global";
    badge.textContent = "i";
    badge.dataset.v329InfoIndex = String(index);
    badge.setAttribute("aria-label", `Voir les conseils et le dosage de ${label}`);
    container.appendChild(badge);
  };

  const decorateProductInfo = () => {
    document.querySelectorAll(".v325-choice-info[data-v325-info]").forEach((button) => {
      if (!button.querySelector(".v329-info-badge")) {
        const productName = normalizeText(button.querySelector(".v325-choice-copy strong")?.textContent) || "ce produit";
        const badge = document.createElement("span");
        badge.className = "v329-info-badge";
        badge.textContent = "i";
        badge.setAttribute("aria-hidden", "true");
        button.appendChild(badge);
        button.title = `Voir les conseils, le dosage et les informations sur ${productName}`;
      }
    });

    document.querySelectorAll(
      ".v328-product-dot, .v328-mini-products > span, .v328-feature-products .v328-product-dot, .v328-bundle-product > span, .v325-catalog-image"
    ).forEach((container) => {
      const img = container.querySelector("img");
      const index = productIndexFromImage(img);
      const label = index >= 0 && products?.[index] ? products[index].name : normalizeText(img?.alt) || "ce produit";
      addInfoBadge(container, index, label);
    });
  };

  const updateShippingCopy = () => {
    document.querySelectorAll("body *").forEach((node) => {
      if (node.children.length) return;
      const text = normalizeText(node.textContent);
      if (!text) return;

      let next = text
        .replace(/La livraison est offerte dès 29,90\s*€ de produits\.?/gi, "La livraison est offerte dès 4 sachets.")
        .replace(/Livraison offerte dès 29,90\s*€/gi, "Livraison offerte dès 4 sachets")
        .replace(/Encore [^.]*(?:€|euros?) avant la livraison offerte\.?/gi, "Ajoutez encore quelques sachets pour atteindre 4 sachets et profiter de la livraison offerte.")
        .replace(/avant d’obtenir la livraison gratuite/gi, "avant d’atteindre 4 sachets et d’obtenir la livraison gratuite")
        .replace(/avant la livraison offerte/gi, "avant la livraison offerte dès 4 sachets");

      if (next !== text) node.textContent = next;
    });
  };

  const style = document.createElement("style");
  style.textContent = `
    .v329-composer-subtitle{max-width:720px;margin:16px auto 0;color:#765b50;font-size:16px;line-height:1.6;text-align:center}
    .v325-choice-info,.v329-info-host{position:relative}
    .v329-info-badge,.v329-info-badge-global{display:inline-grid;place-items:center;width:25px;height:25px;border:1px solid rgba(111,64,50,.28);border-radius:50%;background:#fffaf6;color:#6f4032;font:800 14px/1 Jost,sans-serif;box-shadow:0 3px 10px rgba(70,40,30,.08);transition:transform .18s ease,background .18s ease,color .18s ease}
    .v329-info-badge{flex:0 0 auto;margin-left:8px}
    .v329-info-badge-global{position:absolute;z-index:4;top:6px;right:6px;padding:0;cursor:pointer}
    .v325-choice-info:hover .v329-info-badge,.v325-choice-info:focus-visible .v329-info-badge,.v329-info-badge-global:hover,.v329-info-badge-global:focus-visible{transform:translateY(-1px);background:#6f4032;color:#fff}
    #infoModal .quick-add{display:none!important}
    @media(max-width:767px){.v329-composer-subtitle{padding:0 20px;font-size:14px}.v329-info-badge,.v329-info-badge-global{width:23px;height:23px;font-size:13px}.v329-info-badge{margin-left:6px}}
  `;
  document.head.appendChild(style);

  document.addEventListener("click", (event) => {
    const badge = event.target.closest("[data-v329-info-index]");
    if (!badge) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    const index = Number(badge.dataset.v329InfoIndex);
    if (Number.isInteger(index) && typeof window.openInfo === "function") window.openInfo(index);
  }, true);

  const enhance = () => {
    updateHeading();
    decorateProductInfo();
    updateShippingCopy();
  };

  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(document.body, { childList: true, subtree: true });

  enhance();
  requestAnimationFrame(enhance);
  window.addEventListener("pageshow", enhance);
})();