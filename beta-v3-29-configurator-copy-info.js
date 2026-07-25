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

  const makeInfoBadge = (index, label) => {
    const badge = document.createElement("button");
    badge.type = "button";
    badge.className = "v329-info-badge-global";
    badge.textContent = "i";
    badge.dataset.v329InfoIndex = String(index);
    badge.setAttribute("aria-label", `Voir les conseils et le dosage de ${label}`);
    return badge;
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

    document.querySelectorAll(".v328-mini-products").forEach((row) => {
      row.querySelectorAll(":scope > span").forEach((item) => {
        const img = item.querySelector("img");
        const index = productIndexFromImage(img);
        if (index < 0 || item.querySelector(":scope > .v329-info-badge-global")) return;
        const label = products?.[index]?.name || normalizeText(img?.alt) || "ce produit";
        item.classList.add("v329-info-host");
        item.appendChild(makeInfoBadge(index, label));
      });
    });

    document.querySelectorAll(".v328-bundle-product > span, .v325-catalog-image").forEach((container) => {
      const img = container.querySelector("img");
      const index = productIndexFromImage(img);
      if (index < 0) return;
      const host = container.parentElement || container;
      if (host.querySelector(":scope > .v329-info-badge-global")) return;
      host.classList.add("v329-info-host");
      const label = products?.[index]?.name || normalizeText(img?.alt) || "ce produit";
      host.appendChild(makeInfoBadge(index, label));
    });

    document.querySelectorAll(".v328-feature-products .v329-info-badge-global").forEach((badge) => badge.remove());
  };

  const markShippingUi = () => {
    const composer = document.getElementById("composer");
    if (!composer) return;

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
        node.classList.add("v329-hide-shipping-copy");
      }
    });
  };

  const restyleNamePill = () => {
    const pill = document.querySelector(".v326-name-pill, .v325-name-pill, .v322-name-pill, .name-pill");
    if (!pill) return;
    pill.classList.add("v329-name-pill");

    const edit = pill.querySelector("a, button");
    if (edit) edit.classList.add("v329-name-pill-edit");
  };

  const readSelectedCount = () => {
    if (typeof st !== "undefined" && Array.isArray(st.p)) {
      return st.p.reduce((sum, item) => sum + Number(item?.q || 0), 0);
    }
    return Array.from(document.querySelectorAll("#flowers .qty span, #leaves .qty span"))
      .reduce((sum, node) => sum + Number(node.textContent || 0), 0);
  };

  const ensureValidationProgress = () => {
    const composer = document.getElementById("composer");
    if (!composer) return;

    let validationCopy = null;
    composer.querySelectorAll("p, div, span").forEach((node) => {
      if (validationCopy || node.children.length) return;
      const text = normalizeText(node.textContent).toLowerCase();
      if (text.startsWith("étape 3") && text.includes("validation")) validationCopy = node;
    });

    const review = validationCopy?.parentElement || document.querySelector(".v325-review, .v326-summary, .summary-card");
    if (!review) return;

    if (validationCopy) validationCopy.remove();

    let duplicate = review.querySelector(".v329-validation-progress");
    if (!duplicate) {
      duplicate = document.createElement("div");
      duplicate.className = "v329-validation-progress";
      duplicate.innerHTML = `
        <div class="v329-progress-topline">
          <strong data-v329-progress-count>0 sachet sélectionné</strong>
        </div>
        <div class="v329-progress-labels" aria-hidden="true">
          <span></span>
          <span><b>4 sachets</b><small>Livraison offerte</small></span>
          <span><b>8 sachets</b><small>Livraison offerte + 15 %</small></span>
        </div>
        <div class="v329-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="8" aria-valuenow="0">
          <span data-v329-progress-fill></span>
          <i class="v329-progress-dot v329-progress-dot-four"></i>
          <i class="v329-progress-dot v329-progress-dot-eight"></i>
        </div>
      `;
      review.insertBefore(duplicate, review.firstElementChild);
    }

    const count = readSelectedCount();
    const label = duplicate.querySelector("[data-v329-progress-count]");
    const fill = duplicate.querySelector("[data-v329-progress-fill]");
    const track = duplicate.querySelector(".v329-progress-track");
    if (label) label.textContent = `${count} sachet${count > 1 ? "s" : ""} sélectionné${count > 1 ? "s" : ""}`;
    if (fill) fill.style.width = `${Math.min(100, count / 8 * 100)}%`;
    if (track) track.setAttribute("aria-valuenow", String(Math.min(8, count)));
    duplicate.classList.toggle("is-four", count >= 4);
    duplicate.classList.toggle("is-eight", count >= 8);
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
    #composer .v326-summary .progress,#composer .v326-summary .progress-bar,#composer .v326-summary [role="progressbar"],#composer .v325-composition-summary .progress,#composer .v325-composition-summary .progress-bar,#composer .v325-composition-summary [role="progressbar"],#composer .v325-cart-progress,#composer .v324-cart-progress,#composer .v329-hide-shipping-copy{display:none!important}
    .v329-name-pill{display:flex!important;align-items:center;justify-content:space-between;gap:14px;padding:14px 16px!important;border:1px solid rgba(111,64,50,.16)!important;border-radius:22px!important;background:linear-gradient(135deg,rgba(255,250,246,.96),rgba(249,231,220,.88))!important;box-shadow:0 10px 24px rgba(91,56,43,.08)!important}
    .v329-name-pill::before{content:"🐇";display:grid;place-items:center;flex:0 0 40px;width:40px;height:40px;border-radius:14px;background:#fffaf6;box-shadow:0 5px 14px rgba(91,56,43,.08);font-size:20px}
    .v329-name-pill-edit{margin-left:auto;padding:8px 12px!important;border-radius:999px!important;background:#6f4032!important;color:#fff!important;text-decoration:none!important;font-weight:700!important;white-space:nowrap}
    .v329-validation-progress{margin:0 0 28px;padding:18px 18px 20px;border:1px solid rgba(111,64,50,.12);border-radius:24px;background:rgba(255,250,246,.72);box-shadow:0 12px 26px rgba(91,56,43,.06)}
    .v329-progress-topline{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;color:#4b2d24}
    .v329-progress-topline strong{font-size:16px}
    .v329-progress-labels{display:grid;grid-template-columns:1fr 1fr 1fr;align-items:end;margin-bottom:10px;color:#6f4032;text-align:center}
    .v329-progress-labels span:first-child{visibility:hidden}
    .v329-progress-labels b,.v329-progress-labels small{display:block}.v329-progress-labels b{font-size:13px}.v329-progress-labels small{font-size:11px;font-weight:700}
    .v329-progress-track{position:relative;height:12px;border-radius:999px;background:#eadfd7;overflow:visible}
    .v329-progress-track>span{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#ef8f76,#7e9b68);transition:width .2s ease}
    .v329-progress-dot{position:absolute;top:50%;width:22px;height:22px;border:4px solid #fff;border-radius:50%;background:#cdb9ad;box-shadow:0 0 0 2px rgba(111,64,50,.12);transform:translate(-50%,-50%)}
    .v329-progress-dot-four{left:50%}.v329-progress-dot-eight{left:100%}
    .v329-validation-progress.is-four .v329-progress-dot-four,.v329-validation-progress.is-eight .v329-progress-dot-eight{background:#7e9b68}
    @media(max-width:767px){
      html,body{overflow-x:hidden!important;max-width:100%!important}
      .v329-composer-subtitle{padding:0 20px;font-size:14px}
      .v329-info-badge{width:23px;height:23px;margin-left:6px;font-size:13px}
      .v329-info-badge-global{width:21px;height:21px;font-size:11px;top:-7px;right:-7px}
      .v328-mini-products .v329-info-badge-global{width:19px;height:19px;top:-6px;right:-6px;font-size:10px}
      .v328-bundle-product .v329-info-badge-global{width:19px;height:19px;top:-6px;right:-6px;font-size:10px}
      .v329-name-pill{padding:12px 13px!important;border-radius:20px!important}
      .v329-name-pill::before{flex-basis:36px;width:36px;height:36px;border-radius:12px;font-size:18px}
      .v329-name-pill-edit{padding:7px 10px!important;font-size:13px!important}
      .v329-validation-progress{margin-bottom:22px;padding:16px 14px 18px;border-radius:20px}
      .v329-progress-labels b{font-size:12px}.v329-progress-labels small{font-size:10px}
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
    markShippingUi();
    restyleNamePill();
    ensureValidationProgress();
  };

  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  enhance();
  requestAnimationFrame(enhance);
  window.addEventListener("pageshow", enhance);
})();