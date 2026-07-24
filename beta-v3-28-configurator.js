(() => {
  if (document.body.classList.contains("v328-configurator-ready")) return;
  document.body.classList.add("v328-configurator-ready");

  const STORAGE_KEY = "lmw-checkout-draft-v1";
  const popularIndexes = new Set([0, 4]);
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

  const buildIntro = () => {
    const intro = document.createElement("div");
    intro.className = "v328-config-intro";
    intro.innerHTML = `
      <div>
        <span>Votre sélection personnalisée</span>
        <strong>La box de <b data-v328-rabbit-name></b> prend forme.</strong>
      </div>
      <small>Deux références sont déjà proposées pour vous aider à démarrer.</small>`;
    return intro;
  };

  const buildProgress = (count) => {
    const progress = document.createElement("div");
    const capped = Math.min(6, count);
    const width = (capped / 6) * 100;
    const status = count >= 6
      ? "Vous avez atteint le format Box Complète."
      : count >= 4
        ? "Livraison offerte atteinte — encore deux sachets pour le prix Box Complète."
        : `${4 - count} sachet${4 - count > 1 ? "s" : ""} avant la livraison offerte.`;

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

  const applyPopularBadges = () => {
    document.querySelectorAll(".v325-choice-row").forEach((row) => {
      row.querySelector(".v328-popular-badge")?.remove();
      const index = Number(row.querySelector("[data-v325-info]")?.dataset.v325Info);
      if (!popularIndexes.has(index)) return;
      const badge = document.createElement("span");
      badge.className = "v328-popular-badge";
      badge.textContent = "Populaire";
      row.appendChild(badge);
    });
  };

  const enhanceConfigurator = () => {
    const inner = document.querySelector(".v325-composition-inner");
    if (!inner) return;

    inner.querySelectorAll(".v328-config-intro, .v328-progress-card, .v328-match-chip").forEach((node) => node.remove());

    const count = selectedCount();
    const quantities = readQuantities();
    const intro = buildIntro();
    intro.querySelector("[data-v328-rabbit-name]").textContent = rabbitName();

    const productsColumn = inner.querySelector(":scope > .v326-products");
    const firstGroup = inner.querySelector(":scope > .v325-product-group");
    if (productsColumn) productsColumn.prepend(intro);
    else if (firstGroup) inner.insertBefore(intro, firstGroup);
    else inner.prepend(intro);

    const progress = buildProgress(count);
    const summary = inner.querySelector(":scope > .v326-summary");
    const total = inner.querySelector(".v325-total-summary");
    if (summary && total) summary.insertBefore(progress, total);
    else {
      const validation = inner.querySelector(".v325-validation-copy");
      if (validation) inner.insertBefore(progress, validation);
      else inner.appendChild(progress);
    }

    const match = matchingTheme(quantities);
    if (match) {
      const chip = document.createElement("div");
      chip.className = "v328-match-chip";
      chip.innerHTML = `<span>Votre sélection correspond à la <strong>${match.name}</strong>, au même prix de 23,60 €. Vous pouvez conserver cette composition sans changer de parcours.</span>`;
      const preview = inner.querySelector(".v325-composition-preview");
      if (preview) preview.insertAdjacentElement("beforebegin", chip);
      else (summary || inner).appendChild(chip);
    }

    applyPopularBadges();
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
  window.addEventListener("pageshow", () => requestAnimationFrame(enhanceConfigurator));
})();
