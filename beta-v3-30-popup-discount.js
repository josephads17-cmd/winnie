(() => {
  if (window.__v330PopupDiscount) return;
  window.__v330PopupDiscount = true;

  const style = document.createElement("style");
  style.textContent = `
    @media (min-width: 768px) {
      #composer .v329-summary-progress-safe { display: none !important; }
      .v330-floating-benefit {
        display: block;
        margin-top: 3px;
        color: #4d7847;
        font: 800 10px/1.2 Jost, sans-serif;
        letter-spacing: .02em;
        white-space: nowrap;
      }
    }
    @media (max-width: 767px) {
      .v330-floating-benefit { display: none !important; }
    }
    .v330-discount-row {
      color: #4d7847;
    }
    .v330-discount-row strong {
      color: #4d7847 !important;
      font-weight: 800;
    }
  `;
  document.head.appendChild(style);

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
      const discounted = count >= 8;
      const final = discounted ? gross * 0.85 : gross;
      return {
        count,
        gross,
        final,
        savings: discounted ? gross - final : 0,
        discounted,
      };
    } catch (_) {
      return null;
    }
  };

  const trackInitiateCheckout = (totals) => {
    if (!totals || totals.count < 1 || typeof window.fbq !== "function") return;
    window.fbq("track", "InitiateCheckout", {
      value: Number(totals.final.toFixed(2)),
      currency: "EUR",
      num_items: totals.count,
    });
  };

  const checkoutSelector = [
    "#orderCta",
    ".v325-review-button",
    "[data-v325-direct-checkout]",
    '#cartDrawer button[onclick*="startCheckout"]',
    '.screen[data-screen="4"] button[onclick*="startCheckout"]',
  ].join(",");

  document.addEventListener("click", (event) => {
    const button = event.target.closest(checkoutSelector);
    if (!button || button.disabled) return;
    trackInitiateCheckout(readTotals());
  }, true);

  const syncFloatingBenefit = (totals) => {
    const copy = document.querySelector("#floatingCart .float-copy");
    if (!copy) return;

    let benefit = copy.querySelector(".v330-floating-benefit");
    if (totals.discounted) {
      if (!benefit) {
        benefit = document.createElement("span");
        benefit.className = "v330-floating-benefit";
        copy.appendChild(benefit);
      }
      benefit.textContent = "Livraison offerte + 15 % débloquées";
    } else if (benefit) {
      benefit.remove();
    }
  };

  const syncDiscountRow = (totals) => {
    const subtotal = document.getElementById("drawerSubtotal");
    const subtotalRow = subtotal?.closest(".total-row");
    if (!subtotal || !subtotalRow) return;

    let row = subtotalRow.parentElement?.querySelector(":scope > .v330-discount-row");
    if (totals.discounted) {
      subtotal.textContent = money(totals.gross);
      if (!row) {
        row = document.createElement("div");
        row.className = "total-row v330-discount-row";
        row.innerHTML = '<span>Réduction 15 %</span><strong></strong>';
        subtotalRow.insertAdjacentElement("afterend", row);
      }
      const amount = row.querySelector("strong");
      if (amount) amount.textContent = `−${money(totals.savings)}`;
    } else {
      subtotal.textContent = money(totals.gross);
      row?.remove();
    }
  };

  const syncDeliveryRoot = (root, totals) => {
    if (!root) return;

    const title = root.querySelector(".delivery-title");
    const detail = root.querySelector(".delivery-detail");
    const meter = root.querySelector(".delivery-progress");
    const fill = meter?.querySelector("span");
    const count = Math.max(0, totals.count);
    const capped = Math.min(8, count);
    const progress = (capped / 8) * 100;

    root.classList.toggle("reached", count >= 4);

    if (count >= 8) {
      if (title) title.textContent = "Livraison offerte et 15 % de réduction débloquées !";
      if (detail) detail.textContent = "Les deux avantages sont appliqués automatiquement à votre sélection.";
    } else if (count >= 4) {
      const remaining = 8 - count;
      if (title) title.textContent = "Livraison offerte débloquée !";
      if (detail) detail.textContent = `${remaining} sachet${remaining > 1 ? "s" : ""} supplémentaire${remaining > 1 ? "s" : ""} avant de débloquer 15 % de réduction.`;
    } else {
      const remaining = 4 - count;
      if (title) title.textContent = "Livraison offerte dès 4 sachets (23,60 €)";
      if (detail) detail.textContent = `${remaining} sachet${remaining > 1 ? "s" : ""} avant de débloquer la livraison offerte.`;
    }

    if (fill) fill.style.width = `${progress}%`;
    if (meter) {
      meter.setAttribute("aria-valuemin", "0");
      meter.setAttribute("aria-valuemax", "8");
      meter.setAttribute("aria-valuenow", String(capped));
    }
  };

  const syncLegacyShippingCopy = (totals) => {
    document.querySelectorAll(".pill").forEach((pill) => {
      if (/livraison offerte dès 29,90\s*€/i.test(pill.textContent || "")) {
        pill.textContent = "Livraison offerte dès 4 sachets · 23,60 €";
      }
    });

    document.querySelectorAll("#faq .faq-item").forEach((item) => {
      const summary = item.querySelector("summary");
      const copy = item.querySelector("p");
      if (!summary || !copy || !/nombre minimum/i.test(summary.textContent || "")) return;
      copy.textContent = "Non. Vous choisissez librement la quantité souhaitée. Sous 4 sachets, les frais de livraison de 4,99 € sont ajoutés lors du paiement. Dès 4 sachets (23,60 €), la livraison est offerte.";
    });

    document.querySelectorAll("#composer .v325-total-summary").forEach((summary) => {
      const copy = summary.querySelector(".v325-total-line + p");
      if (!copy) return;
      const count = totals.count;
      if (count >= 8) {
        copy.textContent = "Livraison offerte et réduction de 15 % débloquées.";
        copy.classList.add("is-reached");
      } else if (count >= 4) {
        copy.textContent = "Livraison offerte — seuil de 4 sachets atteint.";
        copy.classList.add("is-reached");
      } else {
        const remaining = 4 - count;
        copy.textContent = count > 0
          ? `${remaining} sachet${remaining > 1 ? "s" : ""} avant la livraison offerte.`
          : "Livraison offerte dès 4 sachets (23,60 €).";
        copy.classList.remove("is-reached");
      }
    });
  };

  window.updateDeliveryProgress = function updateDeliveryProgressV330() {
    const totals = readTotals();
    if (!totals) return;
    syncDeliveryRoot(document.getElementById("drawerDelivery"), totals);
    syncDeliveryRoot(document.getElementById("deliveryNote"), totals);
  };

  const sync = () => {
    const totals = readTotals();
    if (!totals) return;

    const floatTotal = document.getElementById("floatTotal");
    const drawerTotal = document.getElementById("drawerTotal");
    [floatTotal, drawerTotal].forEach((node) => {
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

    syncDiscountRow(totals);
    syncDeliveryRoot(document.getElementById("drawerDelivery"), totals);
    syncDeliveryRoot(document.getElementById("deliveryNote"), totals);
    syncLegacyShippingCopy(totals);
    syncFloatingBenefit(totals);
  };

  const schedule = () => requestAnimationFrame(sync);
  document.addEventListener("DOMContentLoaded", schedule);
  document.addEventListener("click", schedule, true);
  window.addEventListener("pageshow", schedule);
  setInterval(sync, 400);
})();