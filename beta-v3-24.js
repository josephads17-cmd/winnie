(() => {
  if (document.body.classList.contains("v324-ready")) return;
  document.body.classList.add("v324-ready");

  const hero = document.querySelector(".hero");
  if (hero && !document.querySelector(".v324-french-section")) {
    const frenchSection = document.createElement("section");
    frenchSection.className = "section v324-french-section";
    frenchSection.id = "savoir-faire-francais";
    frenchSection.innerHTML = `
      <div class="container">
        <div class="v324-french-heading">
          <span class="eyebrow">Savoir-faire français</span>
          <h2>Une box pensée ici, préparée pour votre lapin.</h2>
          <p class="lead">
            La Maison Winnie est une marque française. Chaque commande est
            personnalisée, pesée, conditionnée et préparée à la main en France.
          </p>
        </div>
        <div class="v324-french-grid">
          <article class="v324-french-card">
            <span class="v324-french-icon" aria-hidden="true">FR</span>
            <div><h3>Marque française</h3><p>Une maison née en France autour de Winnie.</p></div>
          </article>
          <article class="v324-french-card">
            <span class="v324-french-icon" aria-hidden="true">✦</span>
            <div><h3>Préparée à la main en France</h3><p>Chaque box est composée avec soin avant son expédition.</p></div>
          </article>
          <article class="v324-french-card">
            <span class="v324-french-icon" aria-hidden="true">Aa</span>
            <div><h3>Personnalisée en France</h3><p>Le prénom de votre lapin est ajouté à l’intérieur de sa box.</p></div>
          </article>
          <article class="v324-french-card">
            <span class="v324-french-icon" aria-hidden="true">g</span>
            <div><h3>Pesée et conditionnée en France</h3><p>Chaque sachet est pesé, conditionné et étiqueté par nos soins.</p></div>
          </article>
        </div>
        <p class="v324-origin-note">
          Ces mentions concernent la conception et la préparation de la box. L’origine
          des fleurs et plantes est indiquée séparément lorsqu’elle est disponible.
        </p>
      </div>
    `;
    hero.insertAdjacentElement("afterend", frenchSection);
  }

  const photoSection = document.getElementById("preuves");
  const photoContainer = photoSection?.querySelector(":scope > .container");
  if (photoSection && photoContainer) {
    photoSection.classList.add("v324-milo-section");
    photoContainer.innerHTML = `
      <div class="v324-milo-heading">
        <span class="eyebrow">Une vraie découverte</span>
        <h2>Milo découvre sa box.</h2>
        <p class="lead">
          Une vraie box personnalisée, un vrai prénom et un lapin qui prend le temps
          de sentir, explorer puis goûter sa sélection.
        </p>
      </div>

      <div class="v324-milo-videos">
        <figure class="v324-video-card v324-video-featured">
          <div class="v324-video-frame">
            <video
              src="assets/milo/milo-deguste.mp4"
              muted loop playsinline controls preload="metadata"
              aria-label="Milo mange une sélection de sa box dans la main de sa maîtresse"
            ></video>
          </div>
          <figcaption>
            <span>01</span>
            <div><strong>Milo goûte sa sélection</strong><small>La box personnalisée reste visible derrière lui.</small></div>
          </figcaption>
        </figure>

        <figure class="v324-video-card">
          <div class="v324-video-frame">
            <video
              src="assets/milo/milo-decouvre-box.mp4"
              muted loop playsinline controls preload="metadata"
              aria-label="Milo s’approche et explore sa box personnalisée"
            ></video>
          </div>
          <figcaption>
            <span>02</span>
            <div><strong>Milo explore sa box</strong><small>Il s’approche librement des sachets et découvre les odeurs.</small></div>
          </figcaption>
        </figure>
      </div>

      <div class="v324-milo-gallery" aria-label="Photos de Milo avec sa box La Maison Winnie">
        <figure class="v324-milo-photo v324-photo-tall">
          <img src="assets/milo/milo-box-profile.webp" alt="Milo à côté de sa box personnalisée" loading="lazy" decoding="async" />
        </figure>
        <figure class="v324-milo-photo">
          <img src="assets/milo/milo-box-complete.webp" alt="Box de Milo ouverte avec ses sachets de fleurs et plantes" loading="lazy" decoding="async" />
        </figure>
      </div>

      <div class="v324-milo-footer">
        <div>
          <strong>Du contenu réel, pas une image de catalogue.</strong>
          <p>Les photos et vidéos montrent la box réellement reçue par Milo et partagée par sa maîtresse.</p>
        </div>
        <a class="btn secondary" href="#composer">Composer la box de votre lapin</a>
      </div>
    `;
  }
})();
