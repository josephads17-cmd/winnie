(() => {
  const BUNDLE_ENDPOINT = "https://lmw-checkout.vercel.app/api/create-bundle-checkout-beta";
  let bundleBusy = false;
  const originalLabels = new WeakMap();

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
          bundleQuantity: 1,
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

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".v329-bundle-quantity").forEach((node) => node.remove());
    moveConfiguratorBeforeReferences();
    resetCheckoutButtons();
  });

  window.addEventListener("pageshow", () => {
    requestAnimationFrame(() => {
      document.querySelectorAll(".v329-bundle-quantity").forEach((node) => node.remove());
      moveConfiguratorBeforeReferences();
      resetCheckoutButtons();
    });
  });
})();