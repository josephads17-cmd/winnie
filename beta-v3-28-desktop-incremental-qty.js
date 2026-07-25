(() => {
  if (document.body.classList.contains("v328-desktop-incremental-ready")) return;
  document.body.classList.add("v328-desktop-incremental-ready");

  const desktop = window.matchMedia("(min-width: 0px)");
  const STORAGE_KEY = "lmw-checkout-draft-v1";
  const formatMoney = (value) => Number(value || 0).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  const totals = () => {
    const entries = products.map((product, index) => ({
      product,
      index,
      quantity: Number(st.p[index]?.q || 0),
    })).filter((entry) => entry.quantity > 0);
    return {
      entries,
      count: entries.reduce((sum, entry) => sum + entry.quantity, 0),
      total: entries.reduce((sum, entry) => sum + entry.quantity * Number(entry.product.p || 0), 0),
    };
  };

  const saveDraft = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        rabbitName: document.getElementById("rabbitName")?.value.trim() || "",
        deliveryMode: st.deliveryMode,
        quantities: st.p.map((item) => Number(item.q) || 0),
        savedAt: Date.now(),
      }));
    } catch {}
  };

  const rowFor = (index) => document.querySelector(`.v325-choice-row [data-v325-info="${index}"]`)?.closest(".v325-choice-row");

  const updateChoiceRow = (index) => {
    const row = rowFor(index);
    if (!row) return;
    const quantity = Number(st.p[index]?.q || 0);
    const product = products[index];
    const action = row.querySelector(".v325-choice-action");
    row.classList.toggle("is-selected", quantity > 0);
    row.classList.toggle("v328-selected", quantity > 0);
    if (!action) return;
    action.innerHTML = quantity > 0
      ? `<div class="v325-choice-qty" role="group" aria-label="Quantité de ${product.name}">
           <button type="button" data-v325-adjust="${index}" data-v325-delta="-1" aria-label="Retirer un sachet de ${product.name}">−</button>
           <span aria-live="polite">${quantity}</span>
           <button type="button" data-v325-adjust="${index}" data-v325-delta="1" aria-label="Ajouter un sachet de ${product.name}">+</button>
         </div>`
      : `<span class="v325-choice-price">dès ${formatMoney(product.p)}</span>
         <button type="button" class="v325-choice-add" data-v325-adjust="${index}" data-v325-delta="1" aria-label="Ajouter ${product.name}">+</button>`;

    const hiddenItems = document.querySelectorAll("#flowers .item, #leaves .item");
    const hiddenQty = hiddenItems[index]?.querySelector(".qty span");
    if (hiddenQty) hiddenQty.textContent = String(quantity);
  };

  const updateProgress = (count) => {
    const card = document.querySelector(".v328-progress-card");
    if (!card) return;
    const width = Math.min(100, (Math.min(8, count) / 8) * 100);
    const missing = count < 4 ? 4 - count : Math.max(0, 8 - count);
    const status = count >= 8
      ? "Livraison offerte et 15 % de réduction débloquées."
      : count >= 4
        ? `${missing} sachet${missing > 1 ? "s" : ""} avant la livraison offerte + 15 % de réduction.`
        : `${missing} sachet${missing > 1 ? "s" : ""} avant la livraison offerte.`;
    const position = count < 4
      ? Math.max(7, Math.min(47, 7 + (count / 4) * 40))
      : Math.max(55, Math.min(95, 55 + ((Math.min(8, count) - 4) / 4) * 40));

    const strong = card.querySelector(".v328-progress-head strong");
    if (strong) strong.textContent = `${count} sachet${count > 1 ? "s" : ""} sélectionné${count > 1 ? "s" : ""}`;
    const fill = card.querySelector(".v328-progress-fill");
    if (fill) fill.style.width = `${width}%`;
    const message = card.querySelector(".v328-progress-message");
    if (message) {
      message.textContent = status;
      message.style.left = `${position}%`;
      message.classList.toggle("is-second-stage", count >= 4);
      message.classList.toggle("is-first-stage", count < 4);
      message.classList.toggle("is-complete", count >= 8);
    }
    [4, 8].forEach((threshold) => {
      card.querySelector(`.v328-progress-marker[data-count="${threshold}"]`)?.classList.toggle("is-reached", count >= threshold);
      let success = card.querySelector(`.v328-checkpoint-success[data-count="${threshold}"]`);
      if (count >= threshold && !success) {
        success = document.createElement("span");
        success.className = "v328-checkpoint-success";
        success.dataset.count = String(threshold);
        success.setAttribute("aria-label", "Objectif atteint");
        success.innerHTML = "<b>✓</b><i></i>";
        card.querySelector(`.v328-progress-marker[data-count="${threshold}"]`)?.insertAdjacentElement("afterend", success);
      } else if (count < threshold) success?.remove();
    });
  };

  const updatePreviewAndTotal = ({ entries, count, total }) => {
    const totalBox = document.querySelector(".v325-total-summary");
    const totalStrong = totalBox?.querySelector(".v325-total-line strong");
    if (totalStrong) totalStrong.textContent = formatMoney(total);
    const delivery = totalBox?.querySelector(".v325-total-line + p");
    if (delivery) {
      const free = count >= 4;
      delivery.textContent = free ? "Livraison offerte — seuil atteint." : `${Math.max(0, 4 - count)} sachet${Math.max(0, 4 - count) > 1 ? "s" : ""} avant la livraison offerte.`;
      delivery.classList.toggle("is-reached", free);
    }
    const meter = totalBox?.querySelector(".v325-total-progress");
    const meterFill = meter?.querySelector("span");
    const percent = Math.min(100, (count / 4) * 100);
    if (meterFill) meterFill.style.width = `${percent}%`;
    meter?.setAttribute("aria-valuenow", String(Math.round(percent)));

    const grid = document.querySelector(".v325-preview-grid");
    if (grid) grid.innerHTML = entries.length
      ? entries.map(({ product, quantity }) => `<div class="v325-preview-chip"><img src="${encodeURI(product.img)}" alt=""><span>${product.name}</span>${quantity > 1 ? `<b aria-label="Quantité ${quantity}">${quantity}</b>` : ""}</div>`).join("")
      : '<p class="v325-preview-empty">Ajoutez vos premières fleurs ou plantes : votre composition apparaîtra ici.</p>';

    const review = document.querySelector(".v325-review-button");
    if (review) {
      review.disabled = count === 0;
      review.textContent = count === 0 ? "Ajoutez un produit pour continuer" : `Passer au paiement sécurisé`;
    }
  };

  const updateLegacyCart = ({ entries, count, total }) => {
    const free = count >= 4;
    const deliveryLabel = st.deliveryMode === "monthly"
      ? "Mensuel · Sans engagement, annulable à tout moment"
      : "Livraison unique";
    const lines = entries.map(({ product, quantity }) => ({
      text: `${quantity} × ${product.name} ${product.w}`,
      value: quantity * Number(product.p || 0),
    }));
    const html = lines.length
      ? lines.map((line) => `<div class="cart-line"><span>${line.text}<br><small>${deliveryLabel}</small></span><strong>${formatMoney(line.value)}</strong></div>`).join("")
      : "Aucun produit sélectionné pour le moment.";

    [["cartContent", html], ["drawerContent", html]].forEach(([id, value]) => {
      const node = document.getElementById(id);
      if (node) node.innerHTML = value;
    });
    ["subtotal", "total", "drawerSubtotal", "drawerTotal", "floatTotal"].forEach((id) => {
      const node = document.getElementById(id);
      if (node) node.textContent = formatMoney(total);
    });
    ["shipping", "drawerShipping"].forEach((id) => {
      const node = document.getElementById(id);
      if (node) node.textContent = free ? "Offerte" : "Calculée lors du paiement";
    });
    const floatCount = document.getElementById("floatCount");
    if (floatCount) floatCount.textContent = String(count);
  };

  document.addEventListener("click", (event) => {
    if (!desktop.matches) return;
    const button = event.target.closest("[data-v325-adjust]");
    if (!button) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const index = Number(button.dataset.v325Adjust);
    const delta = Number(button.dataset.v325Delta);
    if (!Number.isInteger(index) || !delta || !st.p[index]) return;

    st.p[index].q = Math.max(0, Math.min(20, Number(st.p[index].q || 0) + delta));
    updateChoiceRow(index);
    const state = totals();
    updateProgress(state.count);
    updatePreviewAndTotal(state);
    updateLegacyCart(state);
    saveDraft();

    button.blur();
  }, true);
})();