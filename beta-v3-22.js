(() => {
  const DESKTOP_QUERY = "(min-width: 981px) and (hover: hover) and (pointer: fine)";
  if (!window.matchMedia(DESKTOP_QUERY).matches) return;

  const assetPath = "ChatGPT Image 18 juil. 2026 à 12_46_32.png?v=2";
  const assetUrl = encodeURI(assetPath);
  const heroImage = new Image();

  heroImage.onload = () => {
    document.documentElement.style.setProperty(
      "--v322-hero-bg-image",
      `url("${assetUrl}")`,
    );
    document.body.classList.add("v322-hero-ready");
  };

  heroImage.onerror = () => {
    console.error("Le fond photographique V3.22 n’a pas pu être chargé.");
  };

  heroImage.src = assetUrl;
})();
