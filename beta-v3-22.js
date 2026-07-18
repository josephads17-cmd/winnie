(() => {
  const DESKTOP_QUERY = "(min-width: 981px) and (hover: hover) and (pointer: fine)";
  const MOBILE_QUERY = "(max-width: 767px)";

  const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
  const isMobile = window.matchMedia(MOBILE_QUERY).matches;

  let assetPath = null;
  let cssVariable = null;
  let readyClass = null;

  if (isDesktop) {
    assetPath = "ChatGPT Image 18 juil. 2026 à 12_46_32.png?v=2";
    cssVariable = "--v322-hero-bg-image";
    readyClass = "v322-hero-ready";
  } else if (isMobile) {
    assetPath = "assets/hero-mobile-v3-22.webp?v=1";
    cssVariable = "--v322-mobile-hero-bg-image";
    readyClass = "v322-mobile-hero-ready";
  } else {
    return;
  }

  const assetUrl = encodeURI(assetPath);
  const heroImage = new Image();

  heroImage.onload = () => {
    document.documentElement.style.setProperty(
      cssVariable,
      `url("${assetUrl}")`,
    );
    document.body.classList.add(readyClass);
  };

  heroImage.onerror = () => {
    console.error("Le fond photographique V3.22 n’a pas pu être chargé.");
  };

  heroImage.src = assetUrl;
})();
