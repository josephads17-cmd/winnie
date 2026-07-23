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

  const trustIcons = {
    hand: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M15 23V12.5a3 3 0 0 1 6 0V21m0-10.5a3 3 0 0 1 6 0V21m0-8.5a3 3 0 0 1 6 0V23m0-6.5a3 3 0 0 1 6 0V29c0 8-5.5 14-14 14h-2c-5.2 0-8.6-2-11.3-6.2L7.5 30a3.2 3.2 0 0 1 5.2-3.7L15 29Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    personalise: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 35.5 12.5 25 30 7.5a4.2 4.2 0 0 1 6 0l4.5 4.5a4.2 4.2 0 0 1 0 6L23 35.5 12.5 38Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="m27.5 10 10.5 10.5M12.5 25 23 35.5M8 42h32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    scale: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 7v32M10 14h28M15 14 8 27h14Zm18 0-7 13h14Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 27c1.7 4.2 4 6 7 6s5.3-1.8 7-6m4 0c1.7 4.2 4 6 7 6s5.3-1.8 7-6M16 41h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
  };

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

  const loopStates = new WeakMap();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const getDirectCards = (track, selector) =>
    Array.from(track.children).filter((element) => element.matches(selector));

  const setupInfiniteCarousel = ({
    scroller,
    track,
    selector,
    autoplayMs = 0,
    onActive = null,
  }) => {
    if (!scroller || !track || loopStates.has(scroller)) return loopStates.get(scroller) || null;

    const originals = getDirectCards(track, selector).filter(
      (card) => !card.classList.contains("v327-loop-clone"),
    );
    if (originals.length < 2) return null;

    originals.forEach((card, index) => {
      card.dataset.v327OriginalIndex = String(index);
    });

    const cloneCards = () =>
      originals.map((card, index) => {
        const clone = card.cloneNode(true);
        clone.classList.add("v327-loop-clone");
        clone.dataset.v327OriginalIndex = String(index);
        clone.setAttribute("aria-hidden", "true");
        clone.querySelectorAll("a, button, input, select, textarea, [tabindex]").forEach((control) => {
          control.setAttribute("tabindex", "-1");
        });
        return clone;
      });

    const before = cloneCards();
    const after = cloneCards();
    track.prepend(...before);
    track.append(...after);

    let scrollTimer = 0;
    let autoplayTimer = 0;
    let hoverPaused = false;
    let pauseUntil = 0;

    const cards = () => getDirectCards(track, selector);
    const targetFor = (card) =>
      card.offsetLeft - Math.max(0, (scroller.clientWidth - card.offsetWidth) / 2);

    const nearestCard = () => {
      const list = cards();
      const center = scroller.scrollLeft + scroller.clientWidth / 2;
      let nearest = list[0];
      let nearestIndex = 0;
      let distance = Number.POSITIVE_INFINITY;

      list.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const candidateDistance = Math.abs(cardCenter - center);
        if (candidateDistance < distance) {
          distance = candidateDistance;
          nearest = card;
          nearestIndex = index;
        }
      });

      return { card: nearest, index: nearestIndex, list };
    };

    const updateActive = () => {
      const { card, list } = nearestCard();
      list.forEach((item) => item.classList.toggle("is-loop-active", item === card));
      const originalIndex = Number(card?.dataset.v327OriginalIndex || 0);
      if (typeof onActive === "function") onActive(originalIndex);
    };

    const normalize = () => {
      const { card, index, list } = nearestCard();
      const count = originals.length;
      let equivalent = null;

      if (index < count) equivalent = list[index + count];
      else if (index >= count * 2) equivalent = list[index - count];

      if (equivalent && card) {
        scroller.scrollLeft += equivalent.offsetLeft - card.offsetLeft;
      }
      updateActive();
    };

    const onScroll = () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(normalize, 90);
    };

    const pauseTemporarily = (duration = 5000) => {
      pauseUntil = Date.now() + duration;
    };

    const onPointerDown = () => pauseTemporarily();
    const onWheel = () => pauseTemporarily();
    const onKeyDown = () => pauseTemporarily();
    const onMouseEnter = () => {
      hoverPaused = true;
    };
    const onMouseLeave = () => {
      hoverPaused = false;
      pauseTemporarily(1200);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("pointerdown", onPointerDown, { passive: true });
    scroller.addEventListener("touchstart", onPointerDown, { passive: true });
    scroller.addEventListener("wheel", onWheel, { passive: true });
    scroller.addEventListener("keydown", onKeyDown);
    scroller.addEventListener("mouseenter", onMouseEnter);
    scroller.addEventListener("mouseleave", onMouseLeave);

    const centerOnFirstOriginal = () => {
      const list = cards();
      const firstOriginal = list[originals.length];
      if (!firstOriginal) return;
      scroller.scrollLeft = targetFor(firstOriginal);
      updateActive();
    };

    requestAnimationFrame(() => requestAnimationFrame(centerOnFirstOriginal));

    if (autoplayMs > 0 && !reducedMotion.matches) {
      autoplayTimer = window.setInterval(() => {
        if (document.hidden || hoverPaused || Date.now() < pauseUntil) return;
        normalize();
        const { index, list } = nearestCard();
        const next = list[index + 1] || list[originals.length];
        if (next) scroller.scrollTo({ left: targetFor(next), behavior: "smooth" });
      }, autoplayMs);
    }

    const destroy = () => {
      window.clearTimeout(scrollTimer);
      window.clearInterval(autoplayTimer);
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("touchstart", onPointerDown);
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("keydown", onKeyDown);
      scroller.removeEventListener("mouseenter", onMouseEnter);
      scroller.removeEventListener("mouseleave", onMouseLeave);
      track.querySelectorAll(":scope > .v327-loop-clone").forEach((clone) => clone.remove());
      originals.forEach((card) => card.classList.remove("is-loop-active"));
      loopStates.delete(scroller);
    };

    const state = { destroy, normalize, updateActive };
    loopStates.set(scroller, state);
    return state;
  };

  const enhanceTrustRail = () => {
    const trustRail = document.querySelector(".v324-trust-rail");
    const scroller = trustRail?.querySelector(".v324-trust-scroller");
    const track = trustRail?.querySelector(".v324-trust-track");
    if (!trustRail || !scroller || !track || trustRail.dataset.v327Enhanced) return;

    const miniFlag = `<span class="v327-trust-mini-flag" aria-hidden="true">${flagMarkup}</span>`;
    track.innerHTML = `
      <article class="v327-trust-card">
        <span class="v327-trust-icon v327-trust-icon-flag">${flagMarkup}</span>
        <span class="v327-trust-copy"><small>La Maison Winnie</small><strong>Marque française</strong></span>
      </article>
      <article class="v327-trust-card">
        <span class="v327-trust-icon">${trustIcons.hand}</span>
        <span class="v327-trust-copy"><small>Chaque commande</small><strong>Préparée à la main en France</strong></span>${miniFlag}
      </article>
      <article class="v327-trust-card">
        <span class="v327-trust-icon">${trustIcons.personalise}</span>
        <span class="v327-trust-copy"><small>Pour votre lapin</small><strong>Personnalisée en France</strong></span>${miniFlag}
      </article>
      <article class="v327-trust-card">
        <span class="v327-trust-icon">${trustIcons.scale}</span>
        <span class="v327-trust-copy"><small>Avec attention</small><strong>Pesée et conditionnée en France</strong></span>${miniFlag}
      </article>`;

    trustRail.dataset.v327Enhanced = "true";
    trustRail.classList.add("v327-trust-carousel");
    scroller.classList.add("v327-trust-scroller");
    track.classList.add("v327-trust-track");
    scroller.setAttribute("aria-roledescription", "carrousel");

    setupInfiniteCarousel({
      scroller,
      track,
      selector: ".v327-trust-card",
      autoplayMs: 3200,
    });
  };

  const catalogMedia = window.matchMedia("(max-width: 767px)");
  let catalogLoopState = null;

  const updateCatalogDots = (index) => {
    document.querySelectorAll(".v327-catalog-dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  };

  const syncCatalogLoop = () => {
    const catalog = document.querySelector(".v325-catalog");
    const rail = catalog?.querySelector(".v325-catalog-rail");
    const hint = catalog?.querySelector(".v325-swipe-hint");
    if (!catalog || !rail || !hint) return;

    if (!catalogMedia.matches) {
      if (catalogLoopState) catalogLoopState.destroy();
      catalogLoopState = null;
      catalog.classList.remove("v327-catalog-loop-ready");
      hint.innerHTML = '<span>←</span><span>Glisser pour parcourir</span><span>→</span>';
      return;
    }

    if (catalogLoopState) return;

    const originalCards = Array.from(rail.querySelectorAll(":scope > .v325-catalog-card:not(.v327-loop-clone)"));
    if (originalCards.length < 2) return;

    catalog.classList.add("v327-catalog-loop-ready");
    rail.classList.add("v327-infinite-catalog");
    hint.innerHTML = `
      <span class="v327-catalog-dots" aria-hidden="true">
        ${originalCards.map((_, index) => `<i class="v327-catalog-dot${index === 0 ? " is-active" : ""}"></i>`).join("")}
      </span>
      <span class="v327-catalog-loop-label">Glisser pour parcourir · boucle infinie</span>`;

    catalogLoopState = setupInfiniteCarousel({
      scroller: rail,
      track: rail,
      selector: ".v325-catalog-card",
      onActive: updateCatalogDots,
    });
  };

  const applyV327 = () => {
    injectMarkers();
    moveBunnyArmyAfterHero();
    enhanceTrustRail();
    syncCatalogLoop();
  };

  applyV327();
  window.addEventListener("pageshow", applyV327);
  if (catalogMedia.addEventListener) catalogMedia.addEventListener("change", syncCatalogLoop);
  else window.addEventListener("resize", syncCatalogLoop);
})();