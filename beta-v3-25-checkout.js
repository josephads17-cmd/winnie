(() => {
  if (document.body.classList.contains("v325-direct-checkout-ready")) return;
  document.body.classList.add("v325-direct-checkout-ready");

  const syncCheckoutButton = () => {
    const button = document.querySelector(".v325-review-button");
    if (!button) return;

    button.removeAttribute("data-v325-show-recap");
    button.setAttribute("data-v325-direct-checkout", "");

    if (!button.disabled) {
      button.textContent = "Passer au paiement sécurisé";
      button.setAttribute("aria-label", "Passer au paiement sécurisé avec Stripe");
    }
  };

  const baseRender = window.render;
  if (typeof baseRender === "function") {
    window.render = function renderV325DirectCheckout() {
      const result = baseRender();
      requestAnimationFrame(syncCheckoutButton);
      return result;
    };
  }

  document.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest("[data-v325-direct-checkout], .v325-review-button");
      if (!button || button.disabled) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      const rabbitName = document.getElementById("rabbitName")?.value.trim();
      if (rabbitName) {
        const url = new URL(window.location.href);
        url.hash = "composer";
        window.history.replaceState(null, "", url);
      }

      document.body.classList.remove("v324-mobile-recap-open");
      if (typeof window.startCheckout === "function") window.startCheckout();
    },
    true,
  );

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("v324-mobile-recap-open");
    requestAnimationFrame(syncCheckoutButton);
  });

  syncCheckoutButton();
})();