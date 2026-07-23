(() => {
  const badge = document.querySelector(".hero .eyebrow");
  if (badge) badge.textContent = "Beta finale";

  const footer = document.querySelector(".footer-meta small");
  if (footer) footer.textContent = "Beta finale consolidée — paiement sécurisé par Stripe";

  const mobile = window.matchMedia("(max-width: 640px)");
  const closeRecap = () => document.body.classList.remove("v324-mobile-recap-open");

  const showRecap = window.showRecap;
  if (typeof showRecap === "function") {
    window.showRecap = function showRecapFinale() {
      if (mobile.matches) document.body.classList.add("v324-mobile-recap-open");
      return showRecap();
    };
  }

  const activateStep = window.activateConfiguratorStep;
  if (typeof activateStep === "function") {
    window.activateConfiguratorStep = function activateStepFinale(step) {
      closeRecap();
      return activateStep(step);
    };
  }

  const returnToConfigurator = window.returnToConfigurator;
  if (typeof returnToConfigurator === "function") {
    window.returnToConfigurator = function returnToConfiguratorFinale() {
      closeRecap();
      return returnToConfigurator();
    };
  }

  const go = window.go;
  if (typeof go === "function") {
    window.go = function goFinale(step) {
      if (Number(step) !== 4) closeRecap();
      return go(step);
    };
  }

  const syncViewport = () => {
    if (!mobile.matches) closeRecap();
  };
  if (mobile.addEventListener) mobile.addEventListener("change", syncViewport);
  else window.addEventListener("resize", syncViewport);

  const returnedFromCheckout =
    new URLSearchParams(window.location.search).get("checkout") === "cancelled";

  if (returnedFromCheckout) {
    closeRecap();
    const url = new URL(window.location.href);
    url.hash = "composer";
    window.history.replaceState(null, "", url);
  }

  const waitForHero = new Promise((resolve) => {
    const started = performance.now();
    const check = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const ready = isMobile
        ? document.body.classList.contains("v322-mobile-hero-ready")
        : document.body.classList.contains("v322-hero-ready");
      if (ready || performance.now() - started > 700) resolve();
      else requestAnimationFrame(check);
    };
    check();
  });

  Promise.race([
    Promise.all([document.fonts?.ready || Promise.resolve(), waitForHero]),
    new Promise((resolve) => setTimeout(resolve, 900)),
  ])
    .then(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    .then(() => {
      closeRecap();
      const targetId = returnedFromCheckout ? "composer" : window.location.hash.slice(1);
      const target = targetId && document.getElementById(targetId);
      if (target) target.scrollIntoView();
      window.clearTimeout(window.__lmwFinalLoadTimeout);
      document.documentElement.classList.remove("v327-app-loading");
      document.documentElement.classList.add("v327-app-ready");
    })
    .catch(() => {
      document.documentElement.classList.remove("v327-app-loading");
      document.documentElement.classList.add("v327-app-ready");
    });
})();