(() => {
  if (document.body.classList.contains("v328-desktop-freeze-ready")) return;
  document.body.classList.add("v328-desktop-freeze-ready");

  const desktopMedia = window.matchMedia("(min-width: 900px)");
  let frozen = false;
  let savedY = 0;
  let releaseTimer = 0;

  const freezeViewport = () => {
    if (!desktopMedia.matches || frozen) return;
    savedY = window.scrollY;
    frozen = true;

    document.documentElement.classList.add("v328-desktop-quantity-freeze");
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflowY = "scroll";
  };

  const releaseViewport = () => {
    if (!frozen) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflowY = "";
        document.documentElement.classList.remove("v328-desktop-quantity-freeze");
        frozen = false;
        window.scrollTo(0, savedY);
      });
    });
  };

  document.addEventListener(
    "pointerdown",
    (event) => {
      if (!event.target.closest("[data-v325-adjust]")) return;
      freezeViewport();
      window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(releaseViewport, 320);
    },
    true,
  );

  document.addEventListener(
    "click",
    (event) => {
      if (!event.target.closest("[data-v325-adjust]")) return;
      window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(releaseViewport, 180);
    },
    false,
  );

  desktopMedia.addEventListener?.("change", () => {
    if (!desktopMedia.matches) releaseViewport();
  });
})();
