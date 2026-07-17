(() => {
  const DESKTOP_VALIDATION_QUERY = "(min-width: 1025px)";
  const grid = document.querySelector(".builder-grid");
  const cart = document.querySelector(".cart");
  const orderButton = document.getElementById("orderCta");

  if (!grid || !cart || !orderButton) return;

  const intro = document.createElement("div");
  intro.className = "desktop-validation-intro";
  intro.innerHTML = `
    <span class="eyebrow">Validation</span>
    <h2>La box est prête.</h2>
    <div class="help">
      Vérifiez votre sélection, choisissez le rythme de livraison, puis passez au paiement sécurisé.
    </div>
  `;
  cart.insertBefore(intro, cart.firstChild);

  const actions = document.createElement("div");
  actions.className = "desktop-validation-actions";

  const backButton = document.createElement("button");
  backButton.className = "btn secondary desktop-validation-back";
  backButton.type = "button";
  backButton.textContent = "Retour aux plantes";
  backButton.addEventListener("click", () => window.activateConfiguratorStep(3));

  orderButton.parentNode.insertBefore(actions, orderButton);
  actions.append(backButton, orderButton);

  const baseActivateConfiguratorStep = window.activateConfiguratorStep;
  const baseShowRecap = window.showRecap;
  const baseGo = window.go;

  const isDesktopValidationViewport = () =>
    window.matchMedia(DESKTOP_VALIDATION_QUERY).matches;

  const getActiveStep = () => {
    const activeScreen = document.querySelector(".screen.active");
    return activeScreen ? Number(activeScreen.dataset.screen) : null;
  };

  const syncDesktopValidationMode = (stepNumber = getActiveStep()) => {
    const enabled = isDesktopValidationViewport() && stepNumber === 4;
    grid.classList.toggle("desktop-validation-mode", enabled);

    if (enabled) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => window.scrollToElement(cart, 18)),
      );
    }
  };

  window.activateConfiguratorStep = function activateConfiguratorStep(stepNumber) {
    baseActivateConfiguratorStep(stepNumber);
    syncDesktopValidationMode(Number(stepNumber));
  };

  window.showRecap = function showRecap() {
    if (isDesktopValidationViewport()) {
      window.activateConfiguratorStep(4);
      return;
    }
    baseShowRecap();
  };

  window.go = function go(stepNumber) {
    if (Number(stepNumber) === 4 && isDesktopValidationViewport()) {
      window.activateConfiguratorStep(4);
      return;
    }
    baseGo(stepNumber);
    syncDesktopValidationMode(Number(stepNumber));
  };

  window.returnToConfigurator = function returnToConfigurator() {
    window.activateConfiguratorStep(3);
  };

  window.addEventListener("resize", () => syncDesktopValidationMode());
  syncDesktopValidationMode();
})();
