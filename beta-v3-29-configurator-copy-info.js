(() => {
  if (document.body.classList.contains("v329-config-copy-info-ready")) return;
  document.body.classList.add("v329-config-copy-info-ready");

  const TITLE = "Ou bien, composez vous-même sa box.";
  const SUBTITLE = "Choisissez librement ses fleurs et ses plantes, puis ajustez chaque quantité selon vos envies.";

  const updateHeading = () => {
    document.querySelectorAll(".v325-composer-heading").forEach((heading) => {
      const kicker = heading.querySelector(".v325-kicker");
      const title = heading.querySelector("h2");
      if (kicker) kicker.textContent = "La composition sur mesure";
      if (title) title.textContent = TITLE;

      let subtitle = heading.querySelector(".v329-composer-subtitle");
      if (!subtitle) {
        subtitle = document.createElement("p");
        subtitle.className = "v329-composer-subtitle";
        heading.appendChild(subtitle);
      }
      subtitle.textContent = SUBTITLE;
    });

    const composer = document.getElementById("composer");
    if (!composer) return;

    composer.querySelectorAll("h2").forEach((title) => {
      const text = title.textContent.replace(/\s+/g, " ").trim().toLowerCase();
      if (text.includes("choisissez ses fleurs") && text.includes("plantes")) {
        title.textContent = TITLE;
      }
    });

    const storyCopy = document.querySelector(".v328-story-head > p");
    if (storyCopy) storyCopy.textContent = SUBTITLE;
  };

  const decorateProductInfo = () => {
    document.querySelectorAll(".v325-choice-info[data-v325-info]").forEach((button) => {
      if (button.querySelector(".v329-info-badge")) return;
      const productName = button.querySelector(".v325-choice-copy strong")?.textContent.trim() || "ce produit";
      const badge = document.createElement("span");
      badge.className = "v329-info-badge";
      badge.textContent = "i";
      badge.setAttribute("aria-hidden", "true");
      button.appendChild(badge);
      button.title = `Voir les conseils, le dosage et les informations sur ${productName}`;
    });
  };

  const style = document.createElement("style");
  style.textContent = `
    .v329-composer-subtitle {
      max-width: 720px;
      margin: 16px auto 0;
      color: #765b50;
      font-size: 16px;
      line-height: 1.6;
      text-align: center;
    }
    .v325-choice-info {
      position: relative;
    }
    .v329-info-badge {
      display: inline-grid;
      flex: 0 0 auto;
      place-items: center;
      width: 25px;
      height: 25px;
      margin-left: 8px;
      border: 1px solid rgba(111,64,50,.28);
      border-radius: 50%;
      background: #fffaf6;
      color: #6f4032;
      font: 800 14px/1 Jost, sans-serif;
      box-shadow: 0 3px 10px rgba(70,40,30,.08);
      transition: transform .18s ease, background .18s ease, color .18s ease;
    }
    .v325-choice-info:hover .v329-info-badge,
    .v325-choice-info:focus-visible .v329-info-badge {
      transform: translateY(-1px);
      background: #6f4032;
      color: #fff;
    }
    #infoModal .quick-add {
      display: none !important;
    }
    @media (max-width: 767px) {
      .v329-composer-subtitle { padding: 0 20px; font-size: 14px; }
      .v329-info-badge { width: 23px; height: 23px; margin-left: 6px; font-size: 13px; }
    }
  `;
  document.head.appendChild(style);

  const enhance = () => {
    updateHeading();
    decorateProductInfo();
  };

  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  const composer = document.getElementById("composer");
  if (composer) observer.observe(composer, { childList: true, subtree: true });

  enhance();
  requestAnimationFrame(enhance);
  window.addEventListener("pageshow", enhance);
})();