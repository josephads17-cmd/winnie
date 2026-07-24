(() => {
  if (document.body.classList.contains("v328-configurator-ready")) return;
  document.body.classList.add("v328-configurator-ready");

  const STORAGE_KEY = "lmw-checkout-draft-v1";
  const desktopMedia = window.matchMedia("(min-width: 900px)");
  const popularIndexes = new Set([1, 4]);
  const thematicBoxes = [
    { name: "Box Fleurs", indexes: [0, 1, 2, 3] },
    { name: "Box Plantes", indexes: [4, 5, 6, 7] },
    { name: "Box Mélange", indexes: [0, 1, 4, 5] },
  ];

  const readQuantities = () =>
    typeof st !== "undefined" && Array.isArray(st.p)
      ? st.p.map((item) => Number(item.q || 0))
      : [];

  const selectedCount = () => readQuantities().reduce((sum, quantity) => sum + quantity, 0);

  const matchingTheme = (quantities) =>
    thematicBoxes.find((box) =>
      quantities.every((quantity, index) =>
        box.indexes.includes(index) ? quantity === 1 : quantity === 0,
      ),
    );

  const rabbitName = () => {
    const value = document.getElementById("rabbitName")?.value.trim();
    return value || "votre lapin";
  };

  const buildStoryHeader = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "v328-story-head";
    wrapper.innerHTML = `
      <div class="v328-story-pill">
        <span aria-hidden="true">🐇</span>
        <span>La box de <strong data-v328-rabbit-name></strong> prend forme</span>
        <a href="#top">Modifier le prénom</a>
      </div>
      <p>Choisissez ses fleurs, puis ses plantes. Votre composition se met à jour sous vos yeux.</p>`;
    wrapper.querySelector("[data-v328-rabbit-name]").textContent = rabbitName();
    return wrapper;
  };

  const buildProgress = (count) => {
    const progress = document.createElement("div");
    const capped = Math.min(6, count);
    const width = (capped / 6) * 100;
    const status = count >= 6
      ? "Votre Box Complète est prête."
      : count >= 4
        ? "Livraison offerte débloquée — encore deux sachets pour le format Box Complète."
        : `${Math.max(0, 4 - count)} sachet${Math.max(0, 4 - count) > 1 ? "s" : ""} avant la livraison offerte.`;

    progress.className = "v328-progress-card";
    progress.innerHTML = `
      <div class="v328-progress-head">
        <strong>${count} sachet${count > 1 ? "s" : ""} sélectionné${count > 1 ? "s" : ""}</strong>
        <span>${status}</span>
      </div>
      <div class="v328-progress-track" role="progressbar" aria-label="Progression de la composition" aria-valuemin="0" aria-valuemax="6" aria-valuenow="${Math.min(count, 6)}">
        <span class="v328-progress-fill" style="width:${width}%"></span>
        <span class="v328-progress-label" data-count="4"><b>4 sachets</b>Livraison offerte</span>
        <i class="v328-progress-marker${count >= 4 ? " is-reached" : ""}" data-count="4" aria-hidden="true"></i>
        <span class="v328-progress-label" data-count="6"><b>6 sachets</b>Box Complète</span>
        <i class="v328-progress-marker${count >= 6 ? " is-reached" : ""}" data-count="6" aria-hidden="true"></i>
      </div>`;
    return progress;
  };

  const decorateChoiceRows = () => {
    document.querySelectorAll(".v325-choice-row").forEach((row) => {
      row.querySelector(".v328-popular-badge")?.remove();
      const index = Number(row.querySelector("[data-v325-info]")?.dataset.v325Info);
      const quantity = Number(row.querySelector(".v325-choice-qty span")?.textContent || 0);
      row.classList.toggle("v328-selected", quantity > 0);

      if (!popularIndexes.has(index)) return;
      const badge = document.createElement("span");
      badge.className = "v328-popular-badge";
      badge.textContent = "Populaire";
      row.appendChild(badge);
    });
  };

  const normalizeArtisticLayout = (inner) => {
    const productsWrapper = inner.querySelector(":scope > .v326-products");
    if (productsWrapper) {
      Array.from(productsWrapper.querySelectorAll(":scope > .v325-product-group"))
        .forEach((group) => inner.insertBefore(group, productsWrapper));
      productsWrapper.remove();
    }

    const groups = Array.from(inner.querySelectorAll(":scope > .v325-product-group"));
    const summary = inner.querySelector(":scope > .v326-summary");
    if (!summary || groups.length !== 2) return;

    groups[0].classList.add("v328-stage-card", "v328-stage-flowers");
    groups[1].classList.add("v328-stage-card", "v328-stage-leaves");
    summary.classList.add("v328-stage-card", "v328-stage-summary");

    const headings = [
      [groups[0], "Étape 1", "Choisir ses fleurs"],
      [groups[1], "Étape 2", "Choisir ses plantes"],
    ];
    headings.forEach(([group, step, title]) => {
      const heading = group.querySelector("h3");
      if (heading) heading.innerHTML = `<span>${step}</span>${title}`;
    });

    const summaryHeading = summary.querySelector(".v326-summary-heading");
    if (summaryHeading) {
      summaryHeading.innerHTML = `
        <span>Étape 3 — validation</span>
        <h3>La box de ${rabbitName()}</h3>
        <p>Vérifiez les références, le rythme de livraison et le total avant le paiement sécurisé.</p>`;
    }
  };

  const addMatchChip = (inner, quantities) => {
    inner.querySelectorAll(".v328-match-chip").forEach((node) => node.remove());
    const match = matchingTheme(quantities);
    if (!match) return;

    const chip = document.createElement("div");
    chip.className = "v328-match-chip";
    chip.innerHTML = `
      <span>Cette sélection correspond à la <strong>${match.name}</strong>, au même prix.</span>
      <a href="#offres">Voir la box</a>`;

    const summary = inner.querySelector(":scope > .v326-summary");
    const checkout = summary?.querySelector(".v325-review-button");
    if (summary && checkout) summary.insertBefore(chip, checkout);
  };

  const enhanceConfigurator = () => {
    const compositionUi = document.getElementById("v325-composition-ui");
    const inner = document.querySelector(".v325-composition-inner");
    if (!compositionUi || !inner) return;

    compositionUi.querySelectorAll(":scope > .v328-story-head, :scope > .v328-progress-card")
      .forEach((node) => node.remove());

    normalizeArtisticLayout(inner);

    const count = selectedCount();
    const story = buildStoryHeader();
    const progress = buildProgress(count);
    compositionUi.insertBefore(progress, inner);
    compositionUi.insertBefore(story, progress);

    addMatchChip(inner, readQuantities());
    decorateChoiceRows();

    inner.classList.toggle("v328-artistic-desktop", desktopMedia.matches);
  };

  const preselectDefaults = () => {
    if (typeof st === "undefined" || !Array.isArray(st.p)) return;
    let hasSavedDraft = false;
    try {
      hasSavedDraft = Boolean(window.localStorage.getItem(STORAGE_KEY));
    } catch {}
    if (hasSavedDraft || selectedCount() > 0) return;

    if (typeof window.changeP === "function") {
      window.changeP(0, 1);
      window.changeP(4, 1);
    } else {
      st.p[0].q = 1;
      st.p[4].q = 1;
      if (typeof window.render === "function") window.render();
    }
  };

  const baseRender = window.render;
  if (typeof baseRender === "function") {
    window.render = function renderV328Configurator() {
      const result = baseRender();
      requestAnimationFrame(() => requestAnimationFrame(enhanceConfigurator));
      return result;
    };
  }

  preselectDefaults();
  requestAnimationFrame(() => requestAnimationFrame(enhanceConfigurator));
  document.getElementById("rabbitName")?.addEventListener("input", () => {
    requestAnimationFrame(enhanceConfigurator);
  });
  if (desktopMedia.addEventListener) desktopMedia.addEventListener("change", enhanceConfigurator);
  else window.addEventListener("resize", enhanceConfigurator);
  window.addEventListener("pageshow", () => requestAnimationFrame(enhanceConfigurator));
})();