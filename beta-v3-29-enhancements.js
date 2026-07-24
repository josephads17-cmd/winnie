(() => {
  const BUNDLE_ENDPOINT = "https://lmw-checkout.vercel.app/api/create-bundle-checkout-beta";
  const quantities = new Map([
    ["complete", 1],
    ["flowers", 1],
    ["plants", 1],
    ["mixed", 1],
  ]);
  let bundleBusy = false;

  const money = (value) => Number(value).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  const unitPrices = {
    complete: 29.9,
    flowers: 23.6,
    plants: 23.6,
    mixed: 23.6,
  };

  const originalLabels = new WeakMap();

  const quantityControl = (bundleId) => {
    const wrapper = document.createElement("div");
    wrapper.className = "v329-bundle-quantity";
    wrapper.dataset.v329Quantity = bundleId;
    wrapper.innerHTML = `
      <span>Quantité de box</span>
      <div role="group" aria-label="Quantité de box">
        <button type="button" data-v329-qty-delta="-1" aria-label="Retirer une box">−</button>
        <strong data-v329-qty-value>1</strong>
        <button type="button" data-v329-qty-delta="1" aria-label="Ajouter une box">+</button>
      </div>
      <small data-v329-qty-total>${money(unitPrices[bundleId])}</small>
    `;
    return wrapper;
  };

  const injectQuantityControls = () => {
    document.querySelectorAll("[data-v328-bundle]").forEach((checkoutButton) => {
      const bundleId = checkoutButton.dataset.v328Bundle;
      if (!unitPrices[bundleId]) return;
      const container = checkoutButton.parentElement;
      if (!container || container.querySelector(`[data-v329-quantity="${bundleId}"]`)) return;
      container.insertBefore(quantityControl(bundleId), checkoutButton);
    });

    const modalCheckout = document.querySelector(".v328-bundle-checkout");
    const modalDialog = modalCheckout?.closest(".v328-bundle-dialog");
    if (modalCheckout && modalDialog && !modalDialog.querySelector('[data-v329-quantity="complete"]')) {
      modalDialog.insertBefore(quantityControl("complete"), modalCheckout);
    }
  };

  const syncQuantity = (bundleId) => {
    const quantity = quantities.get(bundleId) || 1;
    document.querySelectorAll(`[data-v329-quantity="${bundleId}"]`).forEach((control) => {
      const value = control.querySelector("[data-v329-qty-value]");
      const total = control.querySelector("[data-v329-qty-total]");
      if (value) value.textContent = String(quantity);
      if (total) total.textContent = `${quantity} × ${money(unitPrices[bundleId])} = ${money(quantity * unitPrices[bundleId])}`;
      const minus = control.querySelector('[data-v329-qty-delta="-1"]');
      const plus = control.querySelector('[data-v329-qty-delta="1"]');
      if (minus) minus.disabled = quantity <= 1;
      if (plus) plus.disabled = quantity >= 10;
    });
  };

  const resetCheckoutButtons = () => {
    bundleBusy = false;
    document.querySelectorAll("[data-v328-bundle], .v328-bundle-checkout").forEach((button) => {
      button.disabled = false;
      const label = originalLabels.get(button);
      if (label) button.textContent = label;
    });
    document.querySelectorAll("#orderCta, .v325-review-button, [data-v325-direct-checkout]").forEach((button) => {
      button.disabled = false;
      button.textContent = "Passer au paiement sécurisé";
    });
    const feedback = document.getElementById("checkoutFeedback");
    if (feedback?.textContent === "Connexion à Stripe…") feedback.textContent = "";
  };

  const moveConfiguratorBeforeReferences = () => {
    const composer = document.getElementById("composer");
    const references = document.getElementById("v325-references");
    if (composer && references && composer.nextElementSibling !== references) {
      references.insertAdjacentElement("beforebegin", composer);
    }
  };

  const selectedCompleteItems = () => Array.from(
    document.querySelectorAll('.v328-bundle-product[aria-pressed="true"]'),
  ).map((button) => ({ id: button.dataset.v328Product, quantity: 1 }));

  const checkoutBundle = async (bundleId, button, note, bundleItems) => {
    if (bundleBusy) return;
    const quantity = quantities.get(bundleId) || 1;
    if (bundleId === "complete" && (!bundleItems || bundleItems.length !== 6)) return;

    bundleBusy = true;
    if (!originalLabels.has(button)) originalLabels.set(button, button.textContent);
    button.disabled = true;
    button.textContent = "Redirection sécurisée…";
    if (note) note.textContent = "Connexion à Stripe…";

    try {
      const rabbitName = document.getElementById("rabbitName")?.value.trim() || "";
      const cancelUrl = `${location.origin}${location.pathname}?checkout=cancelled#offres`;
      const response = await fetch(BUNDLE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rabbitName,
          bundleId,
          bundleItems,
          bundleQuantity: quantity,
          cancelUrl,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.url) throw new Error(data.error || "Impossible de créer le paiement.");
      location.assign(data.url);
    } catch (error) {
      bundleBusy = false;
      button.disabled = false;
      button.textContent = originalLabels.get(button) || "Commander";
      if (note) note.textContent = error?.message || "Une erreur est survenue. Réessayez.";
    }
  };

  document.addEventListener("click", (event) => {
    const deltaButton = event.target.closest("[data-v329-qty-delta]");
    if (deltaButton) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const control = deltaButton.closest("[data-v329-quantity]");
      const bundleId = control?.dataset.v329Quantity;
      if (!bundleId) return;
      const delta = Number(deltaButton.dataset.v329QtyDelta);
      quantities.set(bundleId, Math.max(1, Math.min(10, (quantities.get(bundleId) || 1) + delta)));
      syncQuantity(bundleId);
      return;
    }

    const completeCheckout = event.target.closest(".v328-bundle-checkout");
    if (completeCheckout) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (completeCheckout.disabled) return;
      checkoutBundle("complete", completeCheckout, document.querySelector(".v328-bundle-feedback"), selectedCompleteItems());
      return;
    }

    const bundleButton = event.target.closest("[data-v328-bundle]");
    if (!bundleButton) return;
    const bundleId = bundleButton.dataset.v328Bundle;
    if (bundleId === "complete") return;

    event.preventDefault();
    event.stopImmediatePropagation();
    const note = bundleButton.closest(".v328-theme-card")?.querySelector(".v328-offer-note");
    checkoutBundle(bundleId, bundleButton, note);
  }, true);

  const style = document.createElement("style");
  style.textContent = `
    .v329-bundle-quantity{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:14px 0;padding:11px 13px;border:1px solid rgba(111,64,50,.14);border-radius:16px;background:rgba(255,255,255,.72);color:#5c3b30}
    .v329-bundle-quantity>span{font-size:13px;font-weight:700}.v329-bundle-quantity>div{display:flex;align-items:center;gap:8px}.v329-bundle-quantity button{display:grid;place-items:center;width:34px;height:34px;border:1px solid rgba(111,64,50,.18);border-radius:50%;background:#fff7f1;color:#6f4032;font-size:20px;font-weight:700;cursor:pointer}.v329-bundle-quantity button:disabled{opacity:.35;cursor:not-allowed}.v329-bundle-quantity strong{min-width:24px;text-align:center}.v329-bundle-quantity small{font-size:12px;font-weight:700;color:#7b5141;text-align:right}
    @media(max-width:640px){.v329-bundle-quantity{flex-wrap:wrap}.v329-bundle-quantity small{width:100%;text-align:center}}
  `;
  document.head.appendChild(style);

  document.addEventListener("DOMContentLoaded", () => {
    injectQuantityControls();
    quantities.forEach((_, id) => syncQuantity(id));
    moveConfiguratorBeforeReferences();
    resetCheckoutButtons();
  });

  window.addEventListener("pageshow", () => {
    requestAnimationFrame(() => {
      injectQuantityControls();
      quantities.forEach((_, id) => syncQuantity(id));
      moveConfiguratorBeforeReferences();
      resetCheckoutButtons();
    });
  });
})();
