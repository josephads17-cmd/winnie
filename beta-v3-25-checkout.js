(() => {
  if (document.body.classList.contains("v325-direct-checkout-ready")) return;
  document.body.classList.add("v325-direct-checkout-ready");

  const isBetaV328 = window.location.pathname.endsWith("/beta-v3-28.html");
  const endpoint = isBetaV328
    ? "https://lmw-checkout.vercel.app/api/create-checkout-beta"
    : "https://lmw-checkout.vercel.app/api/create-checkout";

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

  const buildCancelUrl = () => {
    const url = new URL(window.location.pathname || "/", window.location.origin);
    url.searchParams.set("checkout", "cancelled");
    url.hash = "composer";
    return url.toString();
  };

  const startDirectCheckout = async (button) => {
    const rabbitName = document.getElementById("rabbitName")?.value.trim() || "";
    const items =
      typeof products !== "undefined" && typeof st !== "undefined"
        ? products
            .map((product, index) => ({
              id: product.id,
              quantity: Number(st.p?.[index]?.q || 0),
            }))
            .filter((item) => item.quantity > 0)
        : [];

    if (!items.length) {
      const message = "Ajoutez au moins un produit à votre box avant de passer au paiement.";
      const feedback = document.getElementById("checkoutFeedback");
      if (feedback) feedback.textContent = message;
      window.alert(message);
      return;
    }

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Redirection sécurisée…";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rabbitName,
          deliveryMode: st?.deliveryMode || "one_time",
          items,
          cancelUrl: buildCancelUrl(),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Impossible de créer le paiement.");
      }

      window.location.assign(data.url);
    } catch (error) {
      console.error("Erreur checkout direct :", error);
      button.disabled = false;
      button.textContent = originalText;
      const feedback = document.getElementById("checkoutFeedback");
      if (feedback) feedback.textContent = error.message || "Une erreur est survenue. Réessayez.";
      else window.alert(error.message || "Une erreur est survenue. Réessayez.");
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
      document.body.classList.remove("v324-mobile-recap-open");
      startDirectCheckout(button);
    },
    true,
  );

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("v324-mobile-recap-open");
    requestAnimationFrame(syncCheckoutButton);
  });

  syncCheckoutButton();
})();