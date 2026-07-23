(() => {
  if (document.body.classList.contains("v327-hero-markers-ready")) return;
  document.body.classList.add("v327-hero-markers-ready");

  const flagMarkup = `
    <span class="v327-france-flag" aria-hidden="true">
      <svg viewBox="0 0 3 2" role="img" focusable="false">
        <rect width="1" height="2" x="0" fill="#0055A4"></rect>
        <rect width="1" height="2" x="1" fill="#FFFFFF"></rect>
        <rect width="1" height="2" x="2" fill="#EF4135"></rect>
      </svg>
    </span>`;

  const createPriceMarker = () => {
    const marker = document.createElement("div");
    marker.className = "v327-price-marker";
    marker.setAttribute("role", "note");
    marker.setAttribute("aria-label", "Information tarifaire");
    marker.innerHTML = `
      <div class="v327-price-box">
        <span class="v327-price-dot" aria-hidden="true"></span>
        <p><strong>Dès 5,90 € le sachet</strong> — vous composez, vous payez ce que vous choisissez.</p>
      </div>`;
    return marker;
  };

  const createFranceBadge = () => {
    const badge = document.createElement("div");
    badge.className = "v327-france-badge";
    badge.setAttribute("role", "note");
    badge.innerHTML = `${flagMarkup}<span>Préparée, pesée et personnalisée à la main en France</span>`;
    return badge;
  };

  const injectMarkers = () => {
    const mobileCard = document.querySelector(".v322-mobile-hero-card");

    if (mobileCard) {
      if (!mobileCard.querySelector(".v327-price-marker")) {
        const kicker = mobileCard.querySelector(".v322-mobile-kicker");
        const priceMarker = createPriceMarker();
        if (kicker) mobileCard.insertBefore(priceMarker, kicker);
        else mobileCard.prepend(priceMarker);
      }

      if (!mobileCard.querySelector(".v327-france-badge")) {
        const intro = mobileCard.querySelector(":scope > p");
        const franceBadge = createFranceBadge();
        if (intro) intro.insertAdjacentElement("afterend", franceBadge);
        else mobileCard.appendChild(franceBadge);
      }
      return;
    }

    const heroCopy = document.querySelector(".hero .hero-grid > :first-child");
    if (!heroCopy) return;

    if (!heroCopy.querySelector(".v327-price-marker")) {
      const eyebrow = heroCopy.querySelector(":scope > .eyebrow");
      const priceMarker = createPriceMarker();
      if (eyebrow) heroCopy.insertBefore(priceMarker, eyebrow);
      else heroCopy.prepend(priceMarker);
    }

    if (!heroCopy.querySelector(".v327-france-badge")) {
      const lead = heroCopy.querySelector(":scope > .lead");
      const franceBadge = createFranceBadge();
      if (lead) lead.insertAdjacentElement("afterend", franceBadge);
      else heroCopy.appendChild(franceBadge);
    }
  };

  const moveBunnyArmyAfterHero = () => {
    const hero = document.querySelector(".hero");
    const bunnyArmy = document.getElementById("preuves");

    if (!hero || !bunnyArmy || hero.nextElementSibling === bunnyArmy) return;
    hero.insertAdjacentElement("afterend", bunnyArmy);
  };

  const applyV327 = () => {
    injectMarkers();
    moveBunnyArmyAfterHero();
  };

  applyV327();
  window.addEventListener("pageshow", applyV327);
})();