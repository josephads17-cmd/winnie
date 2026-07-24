(() => {
  if (document.body.classList.contains("v328-offers-ready")) return;
  document.body.classList.add("v328-offers-ready");

  const image = (src, alt) => `<img src="${encodeURI(src)}" alt="${alt}" loading="lazy" decoding="async">`;
  const catalog = {
    calendula: ["calendula.png", "Calendula"],
    rose: ["Rose.png", "Rose"],
    camomille: ["Camomille-Bio.jpg", "Camomille bio"],
    hibiscus: ["Hibiscus-Rouge.jpg", "Hibiscus rouge"],
    plantain: ["Plantain.png", "Plantain"],
    pissenlit: ["Pissenlit.png", "Pissenlit"],
    framboisier: ["Framboisier.png", "Framboisier"],
    noisetier: ["Noisetier.png", "Noisetier"],
  };

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
      <button class="v328-button" type="button" data-v328-bundle="${id}">Ajouter la ${name.toLowerCase()}</button>
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
            <li>6 sachets à choisir parmi les 8 références</li>
            <li>Personnalisée au prénom de votre lapin</li>
            <li>Livraison offerte incluse dans le prix</li>
          </ul>
          <button class="v328-button" type="button" data-v328-bundle="complete">Commander la box complète — 29,90 €</button>
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
          ${themeCard({
            id: "flowers",
            name: "Box Fleurs",
            description: "Calendula, rose, camomille bio et hibiscus rouge — les quatre fleurs, un sachet de chaque.",
            products: ["calendula", "rose", "camomille", "hibiscus"],
          })}
          ${themeCard({
            id: "plants",
            name: "Box Plantes",
            description: "Plantain, pissenlit, framboisier et noisetier — les quatre plantes et feuilles, un sachet de chaque.",
            products: ["plantain", "pissenlit", "framboisier", "noisetier"],
          })}
          ${themeCard({
            id: "mixed",
            name: "Box Mélange",
            description: "Deux fleurs et deux plantes sélectionnées pour réunir le meilleur des deux univers.",
            products: ["calendula", "rose", "plantain", "pissenlit"],
          })}
        </div>
      </div>
    </div>`;

  const trustRail = document.querySelector(".v324-trust-rail");
  const hero = document.querySelector(".hero");
  if (trustRail) trustRail.insertAdjacentElement("afterend", section);
  else if (hero) hero.insertAdjacentElement("afterend", section);
  else document.querySelector("main")?.prepend(section);

  section.addEventListener("click", (event) => {
    const button = event.target.closest("[data-v328-bundle]");
    if (!button) return;
    const note = button.nextElementSibling;
    if (note) {
      note.textContent = "Offre prête : il reste à connecter son identifiant Stripe avant l’ouverture des commandes.";
    }
  });
})();
