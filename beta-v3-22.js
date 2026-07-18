(() => {
  const DESKTOP_QUERY = "(min-width: 981px) and (hover: hover) and (pointer: fine)";
  const MOBILE_QUERY = "(max-width: 767px)";

  const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
  const isMobile = window.matchMedia(MOBILE_QUERY).matches;

  if (isDesktop) {
    const assetPath = "ChatGPT Image 18 juil. 2026 à 12_46_32.png?v=2";
    const assetUrl = encodeURI(assetPath);
    const heroImage = new Image();

    heroImage.onload = () => {
      document.documentElement.style.setProperty(
        "--v322-hero-bg-image",
        `url("${assetUrl}")`,
      );
      document.body.classList.add("v322-hero-ready");
    };

    heroImage.onerror = () => {
      console.error("Le fond photographique desktop V3.22 n’a pas pu être chargé.");
    };

    heroImage.src = assetUrl;
    return;
  }

  if (!isMobile || document.body.classList.contains("v322-mobile-layout")) return;

  const hero = document.querySelector(".hero");
  const nameField = hero?.querySelector(".hero-name-field");

  if (!hero || !nameField) return;

  document.body.classList.add("v322-mobile-layout");

  const mobileAssetPath = "ChatGPT Image 18 juil. 2026 à 14_03_05.png?v=1";
  const mobileAssetUrl = encodeURI(mobileAssetPath);
  const mobileHeroImage = new Image();

  mobileHeroImage.onload = () => {
    document.documentElement.style.setProperty(
      "--v322-mobile-hero-bg-image",
      `url("${mobileAssetUrl}")`,
    );
    document.body.classList.add("v322-mobile-hero-ready");
  };

  mobileHeroImage.onerror = () => {
    console.error("Le fond photographique mobile V3.22 n’a pas pu être chargé.");
  };

  mobileHeroImage.src = mobileAssetUrl;

  nameField.remove();
  hero.classList.add("v322-mobile-hero");
  hero.innerHTML = `
    <div class="v322-mobile-hero-overlay">
      <div class="v322-mobile-hero-card">
        <span class="v322-mobile-kicker">Box personnalisée pour lapin</span>
        <h1>
          Une box composée pour lui.
          <em>Personnalisée à son prénom.</em>
        </h1>
        <p>
          Choisissez librement ses fleurs et plantes séchées, dans de petits
          formats pensés pour découvrir plusieurs variétés sans gaspiller.
        </p>
        <a class="v322-mobile-main-cta" href="#v322-personalisation">Créer la box</a>
        <div class="v322-mobile-notes" aria-label="Avantages principaux">
          <span>Aucun minimum</span>
          <span>Livraison offerte dès 29,90 €</span>
          <span>8 variétés disponibles</span>
        </div>
      </div>
    </div>
    <span id="insideBoxName" class="v322-visually-hidden">Son prénom</span>
  `;

  const personalise = document.createElement("section");
  personalise.className = "v322-personalise";
  personalise.id = "v322-personalisation";
  personalise.innerHTML = `
    <div class="container v322-personalise-inner">
      <div class="v322-personalise-copy">
        <span class="v322-section-kicker">Une attention rien que pour lui</span>
        <h2>À qui prépare-t-on cette box&nbsp;?</h2>
        <p>
          Son prénom sera placé à l’intérieur de la box avant son envoi.
          Vous pourrez ensuite composer librement sa sélection.
        </p>
      </div>
      <div class="v322-name-card"></div>
    </div>
  `;

  personalise.querySelector(".v322-name-card").appendChild(nameField);
  hero.insertAdjacentElement("afterend", personalise);
})();
