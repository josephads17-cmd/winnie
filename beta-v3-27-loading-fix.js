(() => {
  const desktopMedia = window.matchMedia("(min-width: 768px)");

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
  };

  const restoreStaticDesktopRail = () => {
    if (!desktopMedia.matches) return;

    const rail = document.querySelector(".v324-trust-rail");
    const scroller = rail?.querySelector(".v324-trust-scroller");
    const track = rail?.querySelector(".v324-trust-track");
    if (!rail || !scroller || !track) return;

    rail.classList.remove("v327-trust-carousel");
    scroller.classList.remove("v327-trust-scroller");
    track.classList.remove("v327-trust-track");
    scroller.removeAttribute("aria-roledescription");
    scroller.scrollLeft = 0;

    track.innerHTML = `
      <div class="v324-trust-item"><span>${icons.france}</span><strong>Marque française</strong></div>
      <div class="v324-trust-item"><span>${icons.hand}</span><strong>Préparée à la main en France</strong></div>
      <div class="v324-trust-item"><span>${icons.personalise}</span><strong>Personnalisée en France</strong></div>
      <div class="v324-trust-item"><span>${icons.scale}</span><strong>Pesée et conditionnée en France</strong></div>`;
  };

  requestAnimationFrame(restoreStaticDesktopRail);
  window.addEventListener("pageshow", restoreStaticDesktopRail);
  if (desktopMedia.addEventListener) {
    desktopMedia.addEventListener("change", (event) => {
      if (event.matches) restoreStaticDesktopRail();
    });
  }
})();
