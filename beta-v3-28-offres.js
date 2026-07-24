(() => {
  if (document.body.classList.contains("v328-offers-ready")) return;
  document.body.classList.add("v328-offers-ready");

  const CHECKOUT_ENDPOINT = "https://lmw-checkout.vercel.app/api/create-checkout";
  const image = (src, alt) => `<img src="${encodeURI(src)}" alt="${alt}" loading="lazy" decoding="async">`;
  const cutoff = '<p class="v328-cutoff"><span aria-hidden="true">🕘</span><span class="v328-cutoff-copy"><small>Prochaine expédition</small><strong>Calcul en cours…</strong></span></p>';
  const catalog = {
    calendula: ["calendula.png", "Calendula", "calendula"],
    rose: ["Rose.png", "Rose", "rose"],
    camomille: ["Camomille-Bio.jpg", "Camomille bio", "camomille_bio"],
    hibiscus: ["Hibiscus-Rouge.jpg", "Hibiscus rouge", "hibiscus_rouge"],
    plantain: ["Plantain.png", "Plantain", "plantain"],
    pissenlit: ["Pissenlit.png", "Pissenlit", "pissenlit"],
    framboisier: ["Framboisier.png", "Framboisier", "framboisier"],
    noisetier: ["Noisetier.png", "Noisetier", "noisetier"],
  };
  const completeProducts = Object.entries(catalog);

  const productDots = (ids, mini = false) => ids
    .map((id) => {
      const [src, name] = catalog[id];
      return mini
        ? `<span>${image(src, name)}</span>`
        : `<div class="v328-product-dot">${image(src, name)}</div>`;
    })
    .join("");

  const themeCard = ({ id, name, description, products }) => `
    <article class="v328-theme-card">
      <div class="v328-mini-products">${productDots(products, true)}</div>
      <h3>${name}</h3>
      <p>${description}</p>
      <div class="v328-card-price">23,60 €</div>
      <div class="v328-shipping-pill">✓ Livraison offerte incluse</div>
      <button class="v328-button" type="button" data-v328-bundle="${id}">Commander la ${name.toLowerCase()}</button>
      ${cutoff}
      <p class="v328-offer-note" aria-live="polite"></p>
    </article>`;

  const section = document.createElement("section");
  section.className = "v328-offers";
  section.id = "offres";
  section.setAttribute("aria-labelledby", "v328-offers-title");
  section.innerHTML = `
    <div class="container">
      <header class="v328-offers-header">
        <span class="v328-kicker">Nouveau</span>
        <h2 id="v328-offers-title">Une box prête à offrir, toujours personnalisée.</h2>
        <p>Choisissez une sélection déjà pensée ou continuez à composer librement votre box plus bas.</p>
      </header>

      <article class="v328-feature">
        <div class="v328-feature-products" aria-label="Exemple de six références">
          ${productDots(["calendula", "rose", "camomille", "hibiscus", "plantain", "pissenlit"])}
        </div>
        <div class="v328-feature-copy">
          <span class="v328-eyebrow">La box complète</span>
          <h3>Six sachets, une seule livraison offerte.</h3>
          <p>La sélection la plus complète pour découvrir six références, au meilleur prix au sachet.</p>
          <div class="v328-price-line">
            <strong class="v328-price">29,90 €</strong>
            <span class="v328-old-price">35,40 €</span>
            <span class="v328-saving">−5,50 €</span>
          </div>
          <ul class="v328-benefits">
            <li>6 références à choisir parmi les 8</li>
            <li>Personnalisée au prénom de votre lapin</li>
            <li>Livraison offerte incluse dans le prix</li>
          </ul>
          <button class="v328-button" type="button" data-v328-bundle="complete">Choisir mes 6 références — 29,90 €</button>
          ${cutoff}
          <p class="v328-offer-note" aria-live="polite"></p>
        </div>
      </article>

      <div class="v328-themes">
        <header class="v328-themes-head">
          <span class="v328-eyebrow">Trois profils, un seul prix</span>
          <h3>Ou choisissez une box thématique.</h3>
          <p>Quatre sachets avec livraison offerte incluse, pour aller directement à l’essentiel.</p>
        </header>
        <div class="v328-theme-grid">
          ${themeCard({id:"flowers",name:"Box Fleurs",description:"Calendula, rose, camomille bio et hibiscus rouge — les quatre fleurs, un sachet de chaque.",products:["calendula","rose","camomille","hibiscus"]})}
          ${themeCard({id:"plants",name:"Box Plantes",description:"Plantain, pissenlit, framboisier et noisetier — les quatre plantes et feuilles, un sachet de chaque.",products:["plantain","pissenlit","framboisier","noisetier"]})}
          ${themeCard({id:"mixed",name:"Box Mélange",description:"Calendula, rose, plantain et pissenlit — deux fleurs et deux plantes.",products:["calendula","rose","plantain","pissenlit"]})}
        </div>
      </div>
    </div>`;

  const modal = document.createElement("div");
  modal.className = "v328-bundle-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="v328-bundle-dialog" role="dialog" aria-modal="true" aria-labelledby="v328-bundle-title">
      <button type="button" class="v328-bundle-close" aria-label="Fermer">×</button>
      <span class="v328-eyebrow">Box complète</span>
      <h2 id="v328-bundle-title">Choisissez exactement 6 références.</h2>
      <p class="v328-bundle-lead">Sélectionnez six références différentes parmi les huit. Votre choix sera transmis avec la commande Stripe.</p>
      <div class="v328-bundle-count"><strong data-v328-selected-count>0</strong> / 6 sélectionnées</div>
      <div class="v328-bundle-grid">
        ${completeProducts.map(([key, [src, name, productId]]) => `
          <button type="button" class="v328-bundle-product" data-v328-product="${productId}" aria-pressed="false">
            <span>${image(src, name)}</span>
            <strong>${name}</strong>
            <i aria-hidden="true">✓</i>
          </button>`).join("")}
      </div>
      <button type="button" class="v328-button v328-bundle-checkout" disabled>Passer au paiement sécurisé — 29,90 €</button>
      <p class="v328-bundle-feedback" aria-live="polite"></p>
    </div>`;

  const style = document.createElement("style");
  style.textContent = `
    .v328-bundle-modal{position:fixed;z-index:10050;inset:0;display:none;place-items:center;padding:20px;background:rgba(52,30,23,.58);backdrop-filter:blur(8px)}
    .v328-bundle-modal.is-open{display:grid}.v328-bundle-dialog{position:relative;width:min(760px,100%);max-height:min(820px,92vh);overflow:auto;padding:32px;border:1px solid rgba(111,64,50,.16);border-radius:30px;background:#fffaf6;box-shadow:0 28px 90px rgba(52,30,23,.25)}
    .v328-bundle-dialog h2{margin:8px 44px 8px 0;color:#3f261e;font:600 clamp(28px,4vw,42px)/1.08 "Playfair Display",serif}.v328-bundle-lead{margin:0 0 18px;color:#765b50;line-height:1.55}.v328-bundle-close{position:absolute;top:18px;right:18px;width:42px;height:42px;border:0;border-radius:50%;background:#f6e4d7;color:#6f4032;font-size:27px;cursor:pointer}
    .v328-bundle-count{display:inline-flex;margin:0 0 18px;padding:9px 13px;border-radius:999px;background:#f6e4d7;color:#6f4032;font-weight:700}.v328-bundle-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
    .v328-bundle-product{position:relative;display:grid;gap:8px;padding:12px;border:1px solid rgba(111,64,50,.14);border-radius:20px;background:#fff;cursor:pointer}.v328-bundle-product span{display:block;aspect-ratio:1;border-radius:15px;overflow:hidden;background:#f6e4d7}.v328-bundle-product img{width:100%;height:100%;object-fit:cover}.v328-bundle-product strong{color:#4b3027;font-size:13px}.v328-bundle-product i{position:absolute;top:8px;right:8px;display:none;width:27px;height:27px;place-items:center;border-radius:50%;background:#4f7a55;color:#fff;font-style:normal;font-weight:900}.v328-bundle-product[aria-pressed="true"]{border-color:#4f7a55;background:#edf6eb;box-shadow:inset 0 0 0 1px #4f7a55}.v328-bundle-product[aria-pressed="true"] i{display:grid}.v328-bundle-checkout{width:100%}.v328-bundle-feedback{min-height:20px;margin:10px 0 0;color:#9b4e3d;text-align:center;font-size:13px}
    @media(max-width:640px){.v328-bundle-dialog{padding:24px 16px 20px;border-radius:24px}.v328-bundle-grid{grid-template-columns:repeat(2,1fr)}.v328-bundle-dialog h2{font-size:29px}.v328-bundle-product{padding:9px}}
  `;
  document.head.appendChild(style);

  const trustRail = document.querySelector(".v324-trust-rail");
  const hero = document.querySelector(".hero");
  if (trustRail) trustRail.insertAdjacentElement("afterend", section);
  else if (hero) hero.insertAdjacentElement("afterend", section);
  else document.querySelector("main")?.prepend(section);
  document.body.appendChild(modal);

  const selectedComplete = new Set();
  const countNode = modal.querySelector("[data-v328-selected-count]");
  const completeCheckout = modal.querySelector(".v328-bundle-checkout");
  const completeFeedback = modal.querySelector(".v328-bundle-feedback");

  const updateCompleteSelection = () => {
    countNode.textContent = String(selectedComplete.size);
    completeCheckout.disabled = selectedComplete.size !== 6;
  };

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const checkoutBundle = async (bundleId, button, note, bundleItems = undefined) => {
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Redirection sécurisée…";
    if (note) note.textContent = "";
    try {
      const rabbitName = document.getElementById("rabbitName")?.value.trim() || "";
      const cancelUrl = `${window.location.origin}${window.location.pathname}?checkout=cancelled#offres`;
      const response = await fetch(CHECKOUT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rabbitName, bundleId, bundleItems, cancelUrl }),
      });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error(data.error || "Impossible de créer le paiement.");
      window.location.assign(data.url);
    } catch (error) {
      button.disabled = false;
      button.textContent = originalText;
      if (note) note.textContent = error.message || "Une erreur est survenue. Réessayez.";
    }
  };

  section.addEventListener("click", (event) => {
    const button = event.target.closest("[data-v328-bundle]");
    if (!button) return;
    const bundleId = button.dataset.v328Bundle;
    if (bundleId === "complete") {
      openModal();
      return;
    }
    const note = button.closest(".v328-theme-card")?.querySelector(".v328-offer-note");
    checkoutBundle(bundleId, button, note);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest(".v328-bundle-close")) {
      closeModal();
      return;
    }
    const product = event.target.closest("[data-v328-product]");
    if (product) {
      const id = product.dataset.v328Product;
      const active = product.getAttribute("aria-pressed") === "true";
      if (!active && selectedComplete.size >= 6) return;
      product.setAttribute("aria-pressed", String(!active));
      if (active) selectedComplete.delete(id);
      else selectedComplete.add(id);
      completeFeedback.textContent = "";
      updateCompleteSelection();
    }
  });

  completeCheckout.addEventListener("click", () => {
    if (selectedComplete.size !== 6) return;
    const items = Array.from(selectedComplete).map((id) => ({ id, quantity: 1 }));
    checkoutBundle("complete", completeCheckout, completeFeedback, items);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
})();