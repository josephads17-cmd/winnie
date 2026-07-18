(() => {
  const DESKTOP_QUERY = "(min-width: 981px) and (hover: hover) and (pointer: fine)";
  if (!window.matchMedia(DESKTOP_QUERY).matches) return;

  const heroImage = new Image();
  heroImage.onload = () => {
    document.documentElement.style.setProperty(
      "--v322-hero-image",
      'url("assets/hero-v3-22-desktop.webp?v=1")',
    );
    document.body.classList.add("v322-hero-ready");
  };
  heroImage.onerror = () => {
    console.error("Le visuel V3.22 n’a pas pu être chargé.");
  };
  heroImage.src = "assets/hero-v3-22-desktop.webp?v=1";
})();
