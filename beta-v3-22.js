(() => {
  const DESKTOP_QUERY = "(min-width: 981px) and (hover: hover) and (pointer: fine)";
  if (!window.matchMedia(DESKTOP_QUERY).matches) return;

  Promise.all(
    Array.from({ length: 8 }, (_, index) => index + 1).map((part) =>
      fetch(`v322-assets/hero-desktop-${part}.txt?v=1`, { cache: "force-cache" }).then((response) => {
        if (!response.ok) throw new Error("Le visuel V3.22 n’a pas pu être chargé.");
        return response.text();
      }),
    ),
  )
    .then((parts) => {
      const image = `url("data:image/webp;base64,${parts.join("")}")`;
      document.documentElement.style.setProperty("--v322-hero-image", image);
      document.body.classList.add("v322-hero-ready");
    })
    .catch((error) => console.error(error));
})();
