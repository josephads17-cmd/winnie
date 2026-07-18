(() => {
  const STORAGE_KEY = "lmw-checkout-draft-v1";
  const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

  function updateCategoryLabels() {
    document.querySelectorAll(".category").forEach((category) => {
      const label = category.querySelector("span");
      const screen = category.closest("[data-screen]");
      if (!label || !screen) return;

      const categoryName = screen.dataset.screen === "2" ? "flower" : "leaf";
      const count = products.filter((product) => product.cat === categoryName).length;
      label.textContent = `${count} variétés disponibles`;
    });
  }

  window.updateDeliveryProgress = function updateDeliveryProgress(rootId, sub) {
    const root = document.getElementById(rootId);
    if (!root) return;

    const reached = sub >= FREE_SHIPPING_THRESHOLD;
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - sub);
    const progress = Math.min(100, (sub / FREE_SHIPPING_THRESHOLD) * 100);
    const cheapestProduct = Math.min(...products.map((product) => product.p));
    const nextProductUnlocks =
      !reached && sub + cheapestProduct >= FREE_SHIPPING_THRESHOLD;
    const title = root.querySelector(".delivery-title");
    const detail = root.querySelector(".delivery-detail");
    const bar = root.querySelector(".delivery-progress span");
    const meter = root.querySelector(".delivery-progress");

    root.classList.toggle("reached", reached);

    if (reached) {
      title.textContent = "Livraison offerte débloquée !";
      detail.textContent =
        "Aucun frais de livraison ne sera ajouté lors du paiement.";
    } else {
      title.textContent = `Livraison offerte dès ${money(FREE_SHIPPING_THRESHOLD)}`;
      detail.textContent = nextProductUnlocks
        ? `Il manque ${money(remaining)}. Un sachet supplémentaire à ${money(cheapestProduct)} suffit pour en profiter.`
        : `Il vous reste ${money(remaining)} avant d’obtenir la livraison gratuite.`;
    }

    bar.style.width = `${progress}%`;
    meter.setAttribute("aria-valuenow", Math.round(progress));
  };

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

  function buildCancelUrl() {
    const url = new URL(window.location.pathname || "/", window.location.origin);
    url.searchParams.set("checkout", "cancelled");
    url.hash = "composer";
    return url.toString();
  }

  updateCategoryLabels();

  const baseChangeP = window.changeP;
  window.changeP = function changeP(index, delta) {
    baseChangeP(index, delta);
    saveDraft();
  };

  const baseQuickAdd = window.quickAdd;
  window.quickAdd = function quickAdd() {
    baseQuickAdd();
    saveDraft();
  };

  const baseSetDeliveryMode = window.setDeliveryMode;
  window.setDeliveryMode = function setDeliveryMode(mode) {
    baseSetDeliveryMode(mode);
    saveDraft();
  };

  document.getElementById("rabbitName")?.addEventListener("input", saveDraft);

  const wasRestored = restoreDraft();
  if (!wasRestored) render();

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
          cancelUrl: buildCancelUrl(),
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
