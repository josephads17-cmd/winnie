(() => {
  if (document.querySelector(".v323-botanical-guide")) return;

  const normalize = (value) =>
    String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  const heading = Array.from(document.querySelectorAll("h2, h3")).find((element) =>
    normalize(element.textContent).includes("pourquoi avoir choisi ces produits"),
  );

  if (!heading) {
    console.warn("La section ‘Pourquoi avoir choisi ces produits ?’ est introuvable.");
    return;
  }

  const section = heading.closest(".section") || heading.parentElement;
  const container = section?.querySelector(":scope > .container") || heading.parentElement;
  if (!container) return;

  const botanicals = [
    {
      name: "Calendula",
      type: "Fleur",
      image: "calendula.png",
      text: "Une fleur légère et colorée qui apporte une odeur et une texture différentes. Elle permet de varier les petits compléments végétaux sans bouleverser l’alimentation habituelle.",
      interest: "Découverte florale douce, visuelle et facile à proposer en petite quantité.",
    },
    {
      name: "Rose",
      type: "Fleur",
      image: "Rose.png",
      text: "Ses pétales parfumés offrent une expérience sensorielle différente des feuilles. La rose apporte surtout de la variété et une touche florale à la sélection.",
      interest: "Parfum, finesse des pétales et diversité sensorielle.",
    },
    {
      name: "Camomille bio",
      type: "Fleur",
      image: "Camomille-Bio.jpg",
      text: "De petites fleurs fines et aromatiques, choisies pour leur légèreté et leur profil olfactif distinct. Elles se prêtent bien à une introduction très progressive.",
      interest: "Texture délicate et senteur végétale différente des autres fleurs.",
    },
    {
      name: "Hibiscus rouge",
      type: "Fleur",
      image: "Hibiscus-Rouge.jpg",
      text: "Plus charnu et coloré, l’hibiscus apporte une texture et un parfum plus marqués que les autres fleurs de la sélection.",
      interest: "Contraste de texture, couleur intense et découverte d’un parfum différent.",
    },
    {
      name: "Plantain",
      type: "Feuille",
      image: "Plantain.png",
      text: "Une feuille rustique qui rappelle davantage les plantes de prairie. Elle permet de diversifier les végétaux proposés en complément d’une alimentation dominée par le foin.",
      interest: "Profil herbacé, texture feuillue et variété botanique.",
    },
    {
      name: "Pissenlit",
      type: "Feuille",
      image: "Pissenlit.png",
      text: "Une feuille familière aux propriétaires de lapins, au goût herbacé. Elle aide à varier les végétaux et les textures proposés au quotidien.",
      interest: "Saveur végétale familière et diversification de la sélection.",
    },
    {
      name: "Framboisier",
      type: "Feuille",
      image: "Framboisier.png",
      text: "Une feuille sèche et friable, au profil végétal différent. Elle enrichit la diversité des textures et se mélange facilement à d’autres références.",
      interest: "Texture plus sèche, profil feuillu et intérêt dans les mélanges.",
    },
    {
      name: "Noisetier",
      type: "Feuille",
      image: "Noisetier.png",
      text: "Des feuilles et petites tiges au caractère rustique. Leur texture apporte une expérience différente des fleurs plus légères.",
      interest: "Aspect naturel, texture variée et découverte plus proche du fourrage.",
    },
  ];

  const guide = document.createElement("div");
  guide.className = "v323-botanical-guide";
  guide.innerHTML = `
    <div class="v323-botanical-intro">
      <div class="v323-botanical-copy">
        <span class="eyebrow">Notre sélection botanique</span>
        <h3>Huit plantes, huit façons de varier ses découvertes.</h3>
        <p>
          Nous ne recherchons pas des effets médicaux : chaque référence est choisie
          pour apporter une odeur, une texture ou une saveur différente, et rendre
          la découverte plus riche sans multiplier inutilement les quantités.
        </p>
      </div>
      <aside class="v323-feeding-note">
        <strong>Le foin reste la base.</strong>
        <p>
          Ces fleurs et feuilles sont des compléments à proposer en petites quantités.
          Toute nouvelle plante doit être introduite progressivement, en observant la
          tolérance de votre lapin.
        </p>
      </aside>
    </div>

    <div class="v323-botanical-grid">
      ${botanicals
        .map(
          (item) => `
            <article class="v323-botanical-card">
              <div class="v323-botanical-image">
                <img src="${encodeURI(item.image)}" alt="${item.name} séché" loading="lazy" decoding="async" />
              </div>
              <div class="v323-botanical-content">
                <span class="v323-botanical-type">${item.type}</span>
                <h4>${item.name}</h4>
                <p>${item.text}</p>
                <div class="v323-botanical-interest">
                  <strong>Son intérêt :</strong> ${item.interest}
                </div>
              </div>
            </article>
          `,
        )
        .join("")}
    </div>

    <div class="v323-season-card">
      <span class="v323-season-kicker">Au rythme des saisons</span>
      <h3>Chaque saison, de nouvelles découvertes.</h3>
      <p>
        La sélection est amenée à évoluer au fil des récoltes, de la disponibilité
        et de la qualité des lots. Certaines fleurs ou feuilles pourront laisser leur
        place à de nouvelles références : l’objectif est de conserver une liste courte,
        fraîche et renouvelée plutôt que de proposer les mêmes produits toute l’année.
      </p>
      <div class="v323-season-tags" aria-label="Principes de la sélection saisonnière">
        <span>Petits lots</span>
        <span>Récoltes saisonnières</span>
        <span>Nouvelles découvertes</span>
        <span>Sélection renouvelée</span>
      </div>
    </div>
  `;

  container.appendChild(guide);
})();
