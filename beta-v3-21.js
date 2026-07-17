(() => {
  const STORAGE_KEY = "lmw-checkout-draft-v1";
  const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

  function readDraft() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const draft = JSON.parse(raw);
      if (!draft || Date.now() - Number(draft.savedAt || 0) > MAX_AGE_MS) {
        window.localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return draft;
    } catch {
      return null;
    }
  }

  function saveDraft() {
    try {
      const rabbitName = document.getElementById("rabbitName")?.value.trim() || "";
      const quantities = st.p.map((item) => Number(item.q) || 0);
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          rabbitName,
          deliveryMode: st.deliveryMode,
          quantities,
          savedAt: Date.now(),
        }),
      );
    } catch (error) {
      console.warn("Impossible de mémoriser le panier :", error);
    }
  }

  function restoreDraft() {
    const draft = readDraft();
    if (!draft) return false;

    const nameInput = document.getElementById("rabbitName");
    if (nameInput && typeof draft.rabbitName === "string") {
      nameInput.value = draft.rabbitName.slice(0, 22);
    }

    st.deliveryMode = draft.deliveryMode === "monthly" ? "monthly" : "one_time";
    if (Array.isArray(draft.quantities)) {
      st.p.forEach((item, index) => {
        const quantity = Number(draft.quantities[index]);
        item.q = Number.isInteger(quantity)
          ? Math.max(0, Math.min(20, quantity))
          : 0;
      });
    }

    render();
    return st.p.some((item) => item.q > 0);
  }

  const baseChangeP = window.changeP;
  window.changeP = function changeP(index, delta) {
    baseChangeP(index, delta);
    saveDraft();
  };

  const baseSetDeliveryMode = window.setDeliveryMode;
  window.setDeliveryMode = function setDeliveryMode(mode) {
    baseSetDeliveryMode(mode);
    saveDraft();
  };

  document.getElementById("rabbitName")?.addEventListener("input", saveDraft);

  const wasRestored = restoreDraft();
  const returnedFromCheckout =
    new URLSearchParams(window.location.search).get("checkout") === "cancelled";

  if (wasRestored && returnedFromCheckout) {
    requestAnimationFrame(() => window.showRecap());
  }

  window.startCheckout = async function startCheckout() {
    const rabbitName = document.getElementById("rabbitName").value.trim();
    const items = products
      .map((product, index) => ({ id: product.id, quantity: st.p[index].q }))
      .filter((item) => item.quantity > 0);

    if (!items.length) {
      const message = "Ajoutez au moins un produit à votre box avant de passer au paiement.";
      document.getElementById("checkoutFeedback").textContent = message;
      window.showRecap();
      window.alert(message);
      return;
    }

    saveDraft();

    const button = document.getElementById("orderCta");
    button.disabled = true;
    button.textContent = "Redirection sécurisée…";

    try {
      const response = await fetch("https://lmw-checkout.vercel.app/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rabbitName,
          deliveryMode: st.deliveryMode,
          items,
          cancelUrl:
            "https://lamaisonwinnie.com/beta-v3-21.html?checkout=cancelled#composer",
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Impossible de créer le paiement.");
      }
      window.location.assign(data.url);
    } catch (error) {
      button.disabled = false;
      button.textContent = "Passer au paiement sécurisé";
      document.getElementById("checkoutFeedback").textContent =
        error.message || "Une erreur est survenue. Réessayez dans un instant.";
    }
  };
})();
