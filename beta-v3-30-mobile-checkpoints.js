(() => {
  if (window.__v330MobileTotalBarHidden) return;
  window.__v330MobileTotalBarHidden = true;

  const style = document.createElement("style");
  style.textContent = `
    @media (max-width: 767px) {
      #v325-composition-ui .v325-total-summary {
        padding-bottom: 0 !important;
      }

      #v325-composition-ui .v325-total-summary > .v325-total-progress {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  const cleanup = () => {
    document
      .querySelectorAll(
        "#v325-composition-ui .v330-total-checkpoint, #v325-composition-ui .v330-total-label",
      )
      .forEach((node) => node.remove());
  };

  document.addEventListener("DOMContentLoaded", cleanup);
  window.addEventListener("pageshow", cleanup);
})();
