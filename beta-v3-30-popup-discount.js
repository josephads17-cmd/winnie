(() => {
  if (window.__v330PopupDiscount) return;
  window.__v330PopupDiscount = true;

  const money = (value) =>
    Number(value || 0).toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });

  const readTotals = () => {
    try {
      if (typeof products === "undefined" || typeof st === "undefined" || !Array.isArray(st.p)) return null;
      let count = 0;
      let gross = 0;
      products.forEach((product, index) => {
        const quantity = Number(st.p?.[index]?.q || 0);
        count += quantity;
        gross += quantity * Number(product.p || 0);
      });
      return {
        count,
        gross,
        final: count >= 8 ? gross * 0.85 : gross,
        discounted: count >= 8,
      };
    } catch (_) {
      return null;
    }
  };

  const sync = () => {
    const totals = readTotals();
    if (!totals) return;

    ["floatTotal", "drawerSubtotal", "drawerTotal"].forEach((id) => {
      const node = document.getElementById(id);
      if (!node) return;
      node.textContent = money(totals.final);
      node.classList.toggle("v330-cart-discounted", totals.discounted);
      if (totals.discounted) {
        node.setAttribute("title", `Prix après remise de 15 % — prix initial ${money(totals.gross)}`);
        node.setAttribute("aria-label", `${money(totals.final)}, après remise de 15 pour cent`);
      } else {
        node.removeAttribute("title");
        node.removeAttribute("aria-label");
      }
    });

    const deliveryTitle = document.querySelector("#drawerDelivery .delivery-title");
    if (deliveryTitle) {
      deliveryTitle.textContent = totals.discounted
        ? "Livraison offerte et 15 % de réduction débloquées !"
        : "Livraison offerte débloquée !";
    }
  };

  const schedule = () => requestAnimationFrame(sync);
  document.addEventListener("DOMContentLoaded", schedule);
  document.addEventListener("click", schedule, true);
  window.addEventListener("pageshow", schedule);
  setInterval(sync, 400);
})();