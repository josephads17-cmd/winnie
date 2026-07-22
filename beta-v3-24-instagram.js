(() => {
  if (document.body.classList.contains("v324-instagram-ready")) return;
  document.body.classList.add("v324-instagram-ready");

  const instagramUrl = "https://www.instagram.com/lamaisonwinnie/";
  const instagramIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.9"/>
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.9"/>
      <circle cx="17.4" cy="6.7" r="1.15" fill="currentColor"/>
    </svg>`;

  const bunnyRail = document.querySelector(".v324-bunny-rail");
  if (bunnyRail && !document.querySelector(".v324-instagram-cta")) {
    const instagramCta = document.createElement("div");
    instagramCta.className = "v324-instagram-cta";
    instagramCta.innerHTML = `
      <a href="${instagramUrl}" target="_blank" rel="noopener noreferrer" aria-label="Suivre La Maison Winnie sur Instagram">
        <span class="v324-instagram-icon">${instagramIcon}</span>
        <span class="v324-instagram-copy">
          <strong>Rejoindre la Bunny Army sur Instagram</strong>
          <small>@lamaisonwinnie</small>
        </span>
        <span class="v324-instagram-arrow" aria-hidden="true">↗</span>
      </a>
    `;
    bunnyRail.insertAdjacentElement("afterend", instagramCta);
  }

  const footerLinks = document.querySelector(".footer-links");
  if (footerLinks && !footerLinks.querySelector(".v324-footer-instagram")) {
    const footerInstagram = document.createElement("a");
    footerInstagram.className = "v324-footer-instagram";
    footerInstagram.href = instagramUrl;
    footerInstagram.target = "_blank";
    footerInstagram.rel = "noopener noreferrer";
    footerInstagram.setAttribute("aria-label", "Instagram La Maison Winnie");
    footerInstagram.innerHTML = `<span>${instagramIcon}</span>@lamaisonwinnie`;
    footerLinks.appendChild(footerInstagram);
  }

  const style = document.createElement("style");
  style.textContent = `
    .v324-instagram-cta {
      display: flex;
      justify-content: center;
      margin-top: 28px;
    }

    .v324-instagram-cta > a {
      display: grid;
      grid-template-columns: 46px minmax(0, 1fr) auto;
      gap: 14px;
      align-items: center;
      width: min(620px, 100%);
      padding: 16px 18px;
      border: 1px solid rgba(190, 129, 102, 0.34);
      border-radius: 24px;
      background: linear-gradient(135deg, #fffaf6, #fff1e8);
      box-shadow: 0 16px 42px rgba(111, 64, 50, 0.08);
      color: var(--dark, #341e17);
      text-align: left;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .v324-instagram-cta > a:hover,
    .v324-instagram-cta > a:focus-visible {
      transform: translateY(-2px);
      box-shadow: 0 20px 52px rgba(111, 64, 50, 0.13);
    }

    .v324-instagram-icon {
      display: grid;
      width: 46px;
      height: 46px;
      place-items: center;
      border-radius: 15px;
      background: var(--brown, #6f4032);
      color: #fffaf6;
    }

    .v324-instagram-icon svg {
      width: 25px;
      height: 25px;
    }

    .v324-instagram-copy strong,
    .v324-instagram-copy small {
      display: block;
    }

    .v324-instagram-copy strong {
      font-size: 16px;
      line-height: 1.25;
    }

    .v324-instagram-copy small {
      margin-top: 3px;
      color: #8e5b48;
      font-size: 13px;
      font-weight: 700;
    }

    .v324-instagram-arrow {
      color: var(--brown, #6f4032);
      font-size: 22px;
      font-weight: 700;
    }

    .v324-footer-instagram {
      display: inline-flex;
      align-items: center;
      gap: 7px;
    }

    .v324-footer-instagram > span {
      display: inline-flex;
    }

    .v324-footer-instagram svg {
      width: 17px;
      height: 17px;
    }

    @media (max-width: 640px) {
      .v324-instagram-cta {
        margin-top: 22px;
      }

      .v324-instagram-cta > a {
        grid-template-columns: 42px minmax(0, 1fr) auto;
        gap: 11px;
        padding: 14px;
        border-radius: 21px;
      }

      .v324-instagram-icon {
        width: 42px;
        height: 42px;
        border-radius: 14px;
      }

      .v324-instagram-copy strong {
        font-size: 14px;
      }

      .v324-instagram-copy small {
        font-size: 12px;
      }
    }
  `;
  document.head.appendChild(style);
})();
