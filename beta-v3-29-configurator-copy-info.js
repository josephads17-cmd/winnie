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

  const addInfoBadge = (imageContainer, index, label) => {
    if (!imageContainer || index < 0) return;
    const host = imageContainer.parentElement || imageContainer;
    if (host.querySelector(":scope > .v329-info-badge-global")) return;
    host.classList.add("v329-info-host");

    const badge = document.createElement("button");
    badge.type = "button";
    badge.className = "v329-info-badge-global";
    badge.textContent = "i";
    badge.dataset.v329InfoIndex = String(index);
    badge.setAttribute("aria-label", `Voir les conseils et le dosage de ${label}`);
    host.appendChild(badge);
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
      ".v328-mini-products > span, .v328-bundle-product > span, .v325-catalog-image"
    ).forEach((container) => {
      const img = container.querySelector("img");
      const index = productIndexFromImage(img);
      const label = index >= 0 && products?.[index] ? products[index].name : normalizeText(img?.alt) || "ce produit";
      addInfoBadge(container, index, label);
    });

    document.querySelectorAll(".v328-feature-products .v329-info-badge-global").forEach((badge) => badge.remove());
  };

  const removeShippingProgress = () => {
    const composer = document.getElementById("composer");
    if (!composer) return;

    composer.querySelectorAll(
      ".v326-summary .progress, .v326-summary .progress-bar, .v326-summary [role='progressbar'], .v325-composition-summary .progress, .v325-composition-summary .progress-bar, .v325-composition-summary [role='progressbar'], .v325-cart-progress, .v324-cart-progress, .delivery-status, .summary-delivery, .v326-summary-delivery, .v325-review-delivery, [data-v325-delivery-copy]"
    ).forEach((node) => node.remove());

    composer.querySelectorAll("p, span, strong, small, div").forEach((node) => {
      if (node.children.length) return;
      const text = normalizeText(node.textContent);
      if (!text) return;
      if (
        /livraison offerte/i.test(text) ||
        /avant la livraison/i.test(text) ||
        /atteindre 4 sachets/i.test(text) ||
        /29,90\s*€/i.test(text)
      ) {
        node.remove();
      }
    });
  };

  const style = document.createElement("style");
  style.textContent = `
    .v329-composer-subtitle{max-width:720px;margin:16px auto 0;color:#765b50;font-size:16px;line-height:1.6;text-align:center}
    .v325-choice-info,.v329-info-host{position:relative}
    .v329-info-host{overflow:visible!important}
    .v328-product-dot,.v328-mini-products>span,.v328-feature-products .v328-product-dot{border-radius:50%!important;overflow:hidden!important}
    .v328-product-dot img,.v328-mini-products>span img,.v328-feature-products .v328-product-dot img{border-radius:50%!important;clip-path:circle(50% at 50% 50%);object-fit:cover!important}
    .v329-info-badge,.v329-info-badge-global{display:inline-grid;place-items:center;width:25px;height:25px;border:1px solid rgba(111,64,50,.34);border-radius:50%;background:#fffaf6;color:#6f4032;font:800 14px/1 Jost,sans-serif;box-shadow:0 3px 10px rgba(70,40,30,.12);transition:transform .18s ease,background .18s ease,color .18s ease}
    .v329-info-badge{flex:0 0 auto;margin-left:8px}
    .v329-info-badge-global{position:absolute;z-index:8;top:-7px;right:-7px;padding:0;cursor:pointer}
    .v328-mini-products>span{position:relative;overflow:visible!important}
    .v328-mini-products>span img{display:block;border-radius:50%!important;clip-path:circle(50% at 50% 50%)}
    .v328-mini-products .v329-info-badge-global{width:19px;height:19px;top:-6px;right:-6px;font-size:10px;box-shadow:0 2px 6px rgba(70,40,30,.12)}
    .v328-bundle-product .v329-info-badge-global{width:20px;height:20px;top:-6px;right:-6px;font-size:11px}
    .v325-choice-info:hover .v329-info-badge,.v325-choice-info:focus-visible .v329-info-badge,.v329-info-badge-global:hover,.v329-info-badge-global:focus-visible{transform:translateY(-1px);background:#6f4032;color:#fff}
    #infoModal{z-index:12050!important}
    #infoModal .modal-content,#infoModal .info-panel{position:relative;z-index:12051!important}
    .v328-bundle-modal{z-index:10050!important}
    #infoModal .quick-add{display:none!important}
    @media(max-width:767px){
      html,body{overflow-x:hidden!important;max-width:100%!important}
      .v329-composer-subtitle{padding:0 20px;font-size:14px}
      .v329-info-badge{width:23px;height:23px;margin-left:6px;font-size:13px}
      .v329-info-badge-global{width:21px;height:21px;font-size:11px;top:-7px;right:-7px}
      .v328-mini-products .v329-info-badge-global{width:19px;height:19px;top:-6px;right:-6px;font-size:10px}
      .v328-bundle-product .v329-info-badge-global{width:19px;height:19px;top:-6px;right:-6px;font-size:10px}
    }
  `;
  document.head.appendChild(style);

  document.addEventListener("click", (event) => {
    const badge = event.target.closest("[data-v329-info-index]");
    if (!badge) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    const index = Number(badge.dataset.v329InfoIndex);
    if (Number.isInteger(index) && typeof window.openInfo === "function") {
      window.openInfo(index);
      requestAnimationFrame(() => {
        const infoModal = document.getElementById("infoModal");
        if (infoModal) infoModal.style.zIndex = "12050";
      });
    }
  }, true);

  const enhance = () => {
    updateHeading();
    decorateProductInfo();
    removeShippingProgress();
  };

  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  enhance();
  requestAnimationFrame(enhance);
  window.addEventListener("pageshow", enhance);
})();