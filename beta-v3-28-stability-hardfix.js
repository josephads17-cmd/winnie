(() => {
  if (document.body.classList.contains("v328-hard-stability-v2-ready")) return;
  document.body.classList.add("v328-hard-stability-v2-ready");

  const nativeScrollTo = window.scrollTo.bind(window);
  const nativeScrollBy = window.scrollBy.bind(window);
  let locked = false;
  let savedX = 0;
  let savedY = 0;
  let releaseTimer = 0;
  let frameToken = 0;

  const holdPosition = () => {
    if (!locked) return;
    nativeScrollTo(savedX, savedY);
  };

  const release = () => {
    const token = ++frameToken;
    const stabilize = () => {
      if (token !== frameToken) return;
      holdPosition();
    };

    stabilize();
    requestAnimationFrame(() => {
      stabilize();
      requestAnimationFrame(() => {
        stabilize();
        window.setTimeout(stabilize, 40);
        window.setTimeout(() => {
          stabilize();
          locked = false;
          window.scrollTo = nativeScrollTo;
          window.scrollBy = nativeScrollBy;
          document.documentElement.classList.remove("v328-hard-stabilizing");
        }, 140);
      });
    });
  };

  const lock = () => {
    savedX = window.scrollX;
    savedY = window.scrollY;
    locked = true;
    document.documentElement.classList.add("v328-hard-stabilizing");

    window.scrollTo = (...args) => {
      if (!locked) return nativeScrollTo(...args);
    };
    window.scrollBy = (...args) => {
      if (!locked) return nativeScrollBy(...args);
    };

    window.clearTimeout(releaseTimer);
    releaseTimer = window.setTimeout(release, 220);
  };

  document.addEventListener(
    "pointerdown",
    (event) => {
      if (!event.target.closest("[data-v325-adjust]")) return;
      lock();
    },
    true,
  );

  document.addEventListener(
    "click",
    (event) => {
      if (!event.target.closest("[data-v325-adjust]")) return;
      const active = document.activeElement;
      if (active instanceof HTMLElement) active.blur();
      window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(release, 20);
    },
    false,
  );
})();