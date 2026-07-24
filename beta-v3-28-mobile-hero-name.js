(() => {
  const mobileMedia = window.matchMedia("(max-width: 767px)");

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

    mainCta.textContent = "Choisir ses produits";
    mainCta.setAttribute("href", "#v325-references");

    personalisation.remove();
  };

  requestAnimationFrame(integrateNameField);
  window.addEventListener("pageshow", integrateNameField);
})();
