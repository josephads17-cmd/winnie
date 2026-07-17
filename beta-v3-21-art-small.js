(() => {
  if (document.body.classList.contains("v321-art")) return;

  const hero = document.querySelector(".hero");
  const builder = document.getElementById("composer");
  const nav = document.querySelector(".nav");
  const nameField = hero?.querySelector(".hero-name-field");

  if (!hero || !builder || !nameField) return;

  document.body.classList.add("v321-art");

  async function loadHeroImage(variableName, assetName, count) {
    try {
      const parts = await Promise.all(
        Array.from({ length: count }, (_, index) =>
          fetch(`v321-assets/${assetName}-${index + 1}.txt?v=2`, { cache: "force-cache" })
            .then((response) => {
              if (!response.ok) throw new Error(`Image ${assetName} indisponible.`);
              return response.text();
            }),
        ),
      );
      const value = `url("data:image/webp;base64,${parts.join("")}")`;
      document.documentElement.style.setProperty(`--v321-${variableName}-image`, value);
    } catch (error) {
      console.error(error);
    }
  }

  loadHeroImage("desktop", "desktop-small", 3);
  loadHeroImage("mobile", "mobile-small", 3);

  const brand = nav?.querySelector(".brand");
  if (brand) {
    brand.innerHTML = '<span>La Maison Winnie</span><i aria-hidden="true">❦</i>';
    brand.setAttribute("aria-label", "La Maison Winnie — retour en haut");
  }

  nameField.remove();
  hero.classList.add("v321-hero");
  hero.innerHTML = `
    <div class="v321-hero-overlay">
      <div class="v321-hero-copy">
        <span class="v321-kicker">Box personnalisée pour lapin</span>
        <h1>
          Une box composée pour lui.
          <em>Personnalisée à son prénom.</em>
        </h1>
        <p>
          Choisissez librement ses fleurs et plantes séchées, dans de petits
          formats pensés pour découvrir plusieurs variétés sans gaspiller.
        </p>
        <a class="v321-main-cta" href="#personalisation-start">Créer la box</a>
        <div class="v321-hero-notes" aria-label="Avantages principaux">
          <span>Aucun minimum</span>
          <span>Livraison offerte dès 29,90 €</span>
          <span>8 variétés disponibles</span>
        </div>
      </div>
    </div>
    <span id="insideBoxName" class="v321-visually-hidden">Son prénom</span>
  `;

  const personalise = document.createElement("section");
  personalise.className = "v321-personalise";
  personalise.id = "personalisation-start";
  personalise.innerHTML = `
    <div class="container v321-personalise-inner">
      <div class="v321-personalise-copy">
        <span class="v321-section-kicker">Une attention rien que pour lui</span>
        <h2>À qui prépare-t-on cette box&nbsp;?</h2>
        <p>
          Son prénom sera placé à l’intérieur de la box avant son envoi.
          Vous pourrez ensuite composer librement sa sélection.
        </p>
      </div>
      <div class="v321-name-card"></div>
    </div>
  `;
  personalise.querySelector(".v321-name-card").appendChild(nameField);
  hero.insertAdjacentElement("afterend", personalise);

  const commitments = document.createElement("section");
  commitments.className = "v321-commitments";
  commitments.innerHTML = `
    <div class="container">
      <div class="v321-commitments-head">
        <span class="v321-section-kicker">Le meilleur de la nature, pour lui</span>
        <h2>Une découverte pensée pour votre compagnon.</h2>
      </div>
      <div class="v321-commitment-grid">
        <article class="v321-commitment-card">
          <span class="v321-commitment-icon" aria-hidden="true">❧</span>
          <h3>Fleurs et plantes naturelles</h3>
          <p>Des références simples, sans additifs ni conservateurs, proposées en complément du foin.</p>
        </article>
        <article class="v321-commitment-card">
          <span class="v321-commitment-icon" aria-hidden="true">◌</span>
          <h3>Formats découverte</h3>
          <p>De petits conditionnements pour tester plusieurs goûts avant de choisir les préférés de votre lapin.</p>
        </article>
        <article class="v321-commitment-card">
          <span class="v321-commitment-icon" aria-hidden="true">♡</span>
          <h3>Personnalisée à son prénom</h3>
          <p>Chaque composition est préparée pour votre lapin, avec son prénom placé à l’intérieur de la box.</p>
        </article>
        <article class="v321-commitment-card">
          <span class="v321-commitment-icon" aria-hidden="true">□</span>
          <h3>Composée librement</h3>
          <p>Aucun nombre minimum imposé : vous choisissez uniquement les variétés et les quantités qui vous conviennent.</p>
        </article>
      </div>
    </div>
  `;
  personalise.insertAdjacentElement("afterend", commitments);

  const heroCta = document.getElementById("heroComposeCta");
  if (heroCta) heroCta.classList.add("v321-name-cta");

  const footerVersion = document.querySelector(".footer-meta small");
  if (footerVersion) {
    footerVersion.textContent = "Beta V3.21 artistique — paiement sécurisé par Stripe";
  }
})();
