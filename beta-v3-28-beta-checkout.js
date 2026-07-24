(() => {
  const ENDPOINT = "https://lmw-checkout.vercel.app/api/create-checkout-beta";

  window.startCheckout = async function startCheckoutBetaV328() {
    const rabbitName = document.getElementById("rabbitName")?.value.trim() || "";
    const items = (typeof products !== "undefined" && typeof st !== "undefined")
      ? products
          .map((product, index) => ({ id: product.id, quantity: Number(st.p?.[index]?.q || 0) }))
          .filter((item) => item.quantity > 0)
      : [];

    if (!items.length) {
      const message = "Ajoutez au moins un produit à votre box avant de passer au paiement.";
      const feedback = document.getElementById("checkoutFeedback");
      if (feedback) feedback.textContent = message;
      if (typeof window.showRecap === "function") window.showRecap();
      window.alert(message);
      return;
    }

    const button = document.getElementById("orderCta");
    const originalText = button?.textContent || "Commander";
    if (button) {
      button.disabled = true;
      button.textContent = "Redirection sécurisée…";
    }

    try {
      const cancelUrl = `${window.location.origin}${window.location.pathname}?checkout=cancelled#composer`;
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rabbitName,
          deliveryMode: st?.deliveryMode || "one_time",
          items,
          cancelUrl,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Impossible de créer le paiement.");
      }

      window.location.assign(data.url);
    } catch (error) {
      console.error("Erreur Checkout Beta V3.28 :", error);
      if (button) {
        button.disabled = false;
        button.textContent = originalText;
      }
      const feedback = document.getElementById("checkoutFeedback");
      if (feedback) feedback.textContent = error.message || "Une erreur est survenue. Réessayez.";
      else window.alert(error.message || "Une erreur est survenue. Réessayez.");
    }
  };
})();
