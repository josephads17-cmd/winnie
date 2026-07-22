(() => {
  if (document.body.classList.contains("v324-community-ready")) return;
  document.body.classList.add("v324-community-ready");

  const icons = {
    france: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 5 36.5 12.2 40 26.5 31.2 39 16.8 41 7 30.5 9.8 15.4Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M17 17v14M24 14v20M31 17v14" fill="none" stroke-width="4" stroke-linecap="round"/>
        <path d="M17 17v14" stroke="#3457a4"/><path d="M24 14v20" stroke="#f8f2ea"/><path d="M31 17v14" stroke="#d85b5b"/>
      </svg>`,
    hand: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M15 23V12.5a3 3 0 0 1 6 0V21m0-10.5a3 3 0 0 1 6 0V21m0-8.5a3 3 0 0 1 6 0V23m0-6.5a3 3 0 0 1 6 0V29c0 8-5.5 14-14 14h-2c-5.2 0-8.6-2-11.3-6.2L7.5 30a3.2 3.2 0 0 1 5.2-3.7L15 29Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    personalise: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 35.5 12.5 25 30 7.5a4.2 4.2 0 0 1 6 0l4.5 4.5a4.2 4.2 0 0 1 0 6L23 35.5 12.5 38Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="m27.5 10 10.5 10.5M12.5 25 23 35.5M8 42h32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    scale: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 7v32M10 14h28M15 14 8 27h14Zm18 0-7 13h14Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 27c1.7 4.2 4 6 7 6s5.3-1.8 7-6m4 0c1.7 4.2 4 6 7 6s5.3-1.8 7-6M16 41h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    rabbit: `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M23 25C16 17 15 7 20 5c6-2 10 9 11 18m10 2c7-8 8-18 3-20-6-2-10 9-11 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        <path d="M14 40c0-11 8-18 18-18s18 7 18 18-8 18-18 18-18-7-18-18Z" fill="none" stroke="currentColor" stroke-width="3"/>
        <circle cx="25" cy="38" r="2" fill="currentColor"/><circle cx="39" cy="38" r="2" fill="currentColor"/>
        <path d="M29 45c2 2 4 2 6 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
  };

  const hero = document.querySelector(".hero");
  if (hero && !document.querySelector(".v324-trust-rail")) {
    const trustRail = document.createElement("div");
    trustRail.className = "v324-trust-rail";
    trustRail.id = "savoir-faire-francais";
    trustRail.innerHTML = `
      <div class="v324-trust-scroller" data-drag-scroll tabindex="0" aria-label="Nos engagements en France">
        <div class="v324-trust-track">
          <div class="v324-trust-item"><span>${icons.france}</span><strong>Marque française</strong></div>
          <div class="v324-trust-item"><span>${icons.hand}</span><strong>Préparée à la main en France</strong></div>
          <div class="v324-trust-item"><span>${icons.personalise}</span><strong>Personnalisée en France</strong></div>
          <div class="v324-trust-item"><span>${icons.scale}</span><strong>Pesée et conditionnée en France</strong></div>
        </div>
      </div>
    `;
    hero.insertAdjacentElement("afterend", trustRail);
  }

  const photoSection = document.getElementById("preuves");
  const photoContainer = photoSection?.querySelector(":scope > .container");
  if (photoSection && photoContainer) {
    photoSection.classList.remove("v324-milo-section");
    photoSection.classList.add("v324-bunny-section");
    photoContainer.innerHTML = `
      <div class="v324-bunny-heading">
        <div>
          <span class="eyebrow">La communauté La Maison Winnie</span>
          <h2>La Bunny Army a testé pour vous.</h2>
          <p class="lead">De vrais lapins, de vraies box personnalisées et leurs réactions au moment de la découverte.</p>
        </div>
        <div class="v324-bunny-controls" aria-label="Faire défiler la Bunny Army">
          <button type="button" data-bunny-direction="-1" aria-label="Contenus précédents">←</button>
          <button type="button" data-bunny-direction="1" aria-label="Contenus suivants">→</button>
        </div>
      </div>

      <div class="v324-bunny-rail" data-drag-scroll tabindex="0" aria-label="Photos et vidéos de la Bunny Army">
        <article class="v324-bunny-card v324-bunny-featured">
          <div class="v324-bunny-media">
            <span class="v324-bunny-badge">À la une</span>
            <video
              src="PRODUIT%20OFFERT%20merci%20beaucoup%20%40lamaisonwinnie%20%F0%9F%A5%B0%F0%9F%A5%B0%F0%9F%A5%B0%F0%9F%A5%B0%20%23bunny%20%23rabbitsofinstagram%20%23boutique%20%23col.mp4"
              muted playsinline controls preload="metadata"
              aria-label="Pompon découvre sa box La Maison Winnie"
            ></video>
          </div>
          <div class="v324-bunny-caption"><span class="v324-member-avatar">P</span><div><strong>Pompon</strong><small>Sa maîtresse partage leur découverte complète de la box.</small></div></div>
        </article>

        <article class="v324-bunny-card">
          <div class="v324-bunny-media">
            <video
              src="ec6545dc32074694be9a0c717ae7c708%202.MOV"
              poster="18A0E444-170F-4A52-85D7-36E0C7C8931C%202.JPG"
              muted playsinline controls preload="metadata"
              aria-label="Milo découvre sa box personnalisée"
            ></video>
          </div>
          <div class="v324-bunny-caption"><span class="v324-member-avatar">M</span><div><strong>Milo</strong><small>Il découvre sa sélection devant sa box personnalisée.</small></div></div>
        </article>

        <article class="v324-bunny-card">
          <div class="v324-bunny-media">
            <img src="B526E0EA-205A-4A60-9349-5AC123194C3F.JPG" alt="Milo près de sa box La Maison Winnie" loading="lazy" decoding="async" />
          </div>
          <div class="v324-bunny-caption"><span class="v324-member-avatar">M</span><div><strong>Milo</strong><small>Son prénom et sa sélection sont visibles dans la box.</small></div></div>
        </article>

        <article class="v324-bunny-card">
          <div class="v324-bunny-media">
            <video
              src="AQPfXZAJyI2fD5EpSOpvDn0-qfIwwzLUqNe5dgXhYWnSLwk38GDGIPb8YMOk-y157Cco301dd9hSos46RMBKM7xPKIBWFj0-vhHXYT4.mp4"
              muted playsinline controls preload="metadata"
              aria-label="Buzz découvre sa box La Maison Winnie"
            ></video>
          </div>
          <div class="v324-bunny-caption"><span class="v324-member-avatar">B</span><div><strong>Buzz</strong><small>Buzz rejoint à son tour la Bunny Army.</small></div></div>
        </article>

        <article class="v324-bunny-card v324-coming-card" aria-label="Luna rejoint bientôt la Bunny Army">
          <div class="v324-coming-media">
            <span>${icons.rabbit}</span>
            <small>Prochain membre</small>
            <strong>Luna arrive bientôt</strong>
            <p>Ses photos et vidéos rejoindront ce carrousel.</p>
          </div>
        </article>
      </div>
    `;
  }

  const enableDragScroll = (element) => {
    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    element.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch" || event.target.closest("video, button, a")) return;
      dragging = true;
      startX = event.clientX;
      startScroll = element.scrollLeft;
      element.classList.add("is-dragging");
      element.setPointerCapture(event.pointerId);
    });

    element.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      element.scrollLeft = startScroll - (event.clientX - startX);
    });

    const stopDragging = () => {
      dragging = false;
      element.classList.remove("is-dragging");
    };

    element.addEventListener("pointerup", stopDragging);
    element.addEventListener("pointercancel", stopDragging);
  };

  document.querySelectorAll("[data-drag-scroll]").forEach(enableDragScroll);

  const bunnyRail = document.querySelector(".v324-bunny-rail");
  document.querySelectorAll("[data-bunny-direction]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!bunnyRail) return;
      const direction = Number(button.dataset.bunnyDirection || 1);
      bunnyRail.scrollBy({ left: direction * Math.max(300, bunnyRail.clientWidth * 0.72), behavior: "smooth" });
    });
  });
})();