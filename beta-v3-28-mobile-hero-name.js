(() => {
  const mobileMedia = window.matchMedia("(max-width: 767px)");

  const scrollToCompleteBox = (event) => {
    if (!mobileMedia.matches) return;
    const link = event.target.closest('.v322-mobile-main-cta[href="#offres"]');
    if (!link) return;

    event.preventDefault();
    const scroll = () => {
      const completeBox = document.querySelector("#offres .v328-feature");
      if (!completeBox) return false;
      completeBox.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (scroll()) return;
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (scroll() || attempts >= 20) window.clearInterval(timer);
    }, 50);
  };

  const integrateNameField = () => {
    if (!mobileMedia.matches) return;
    if (document.body.classList.contains("v328-mobile-name-in-hero")) return;

    const heroCard = document.querySelector(".v322-mobile-hero-card");
    const personalisation = document.querySelector("#v322-personalisation");
    const nameField = personalisation?.querySelector(".hero-name-field");
    const mainCta = heroCard?.querySelector(".v322-mobile-main-cta");

    if (!heroCard || !nameField || !mainCta) return;

    document.body.classList.add("v328-mobile-name-in-hero");
    nameField.classList.add("v328-hero-name-field");
    heroCard.insertBefore(nameField, mainCta);

    const label = nameField.querySelector("label");
    if (label) label.textContent = "Quel est le prénom de votre lapin ?";

    const help = nameField.querySelector("#nameHelp");
    if (help) help.textContent = "Son prénom sera placé à l’intérieur de sa box.";

    mainCta.textContent = "Voir nos box personnalisées";
    mainCta.setAttribute("href", "#offres");

    personalisation.remove();
  };

  document.addEventListener("click", scrollToCompleteBox);
  requestAnimationFrame(integrateNameField);
  window.addEventListener("pageshow", integrateNameField);
})();