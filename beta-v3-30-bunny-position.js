(() => {
  if (window.__v330BunnyPosition) return;
  window.__v330BunnyPosition = true;

  const mobileMedia = window.matchMedia("(max-width: 767px)");

  const placeBunnyArmy = () => {
    if (!mobileMedia.matches) return;

    const hero = document.querySelector(".hero");
    const bunnyArmy = document.getElementById("preuves");
    if (!hero || !bunnyArmy || hero.nextElementSibling === bunnyArmy) return;

    hero.insertAdjacentElement("afterend", bunnyArmy);
  };

  const schedulePlacement = () => {
    requestAnimationFrame(() => requestAnimationFrame(placeBunnyArmy));
  };

  const currentRender = window.render;
  if (typeof currentRender === "function" && !currentRender.__v330BunnyWrapped) {
    const wrappedRender = function renderV330BunnyPosition(...args) {
      const result = currentRender.apply(this, args);
      schedulePlacement();
      return result;
    };
    wrappedRender.__v330BunnyWrapped = true;
    window.render = wrappedRender;
  }

  document.addEventListener("DOMContentLoaded", schedulePlacement);
  window.addEventListener("load", schedulePlacement);
  window.addEventListener("pageshow", schedulePlacement);
  mobileMedia.addEventListener?.("change", schedulePlacement);

  schedulePlacement();
})();