(() => {
  if (document.body.classList.contains("v328-no-image-flicker-ready")) return;
  document.body.classList.add("v328-no-image-flicker-ready");

  const productImageSelector = [
    "#v325-composition-ui .v325-choice-row img",
    "#v325-composition-ui .item img",
  ].join(",");

  const imageKey = (image) => {
    const src = image.currentSrc || image.getAttribute("src") || "";
    const alt = image.getAttribute("alt") || "";
    return `${src.split("?")[0]}|${alt}`;
  };

  const captureImages = () => {
    const cache = new Map();
    document.querySelectorAll(productImageSelector).forEach((image) => {
      const key = imageKey(image);
      if (key && !cache.has(key) && image.complete && image.naturalWidth > 0) {
        cache.set(key, image);
      }
    });
    return cache;
  };

  const restoreImages = (cache) => {
    if (!cache.size) return;
    document.querySelectorAll(productImageSelector).forEach((freshImage) => {
      const preservedImage = cache.get(imageKey(freshImage));
      if (!preservedImage || preservedImage === freshImage) return;

      preservedImage.className = freshImage.className;
      preservedImage.alt = freshImage.alt;
      preservedImage.loading = freshImage.loading;
      preservedImage.decoding = freshImage.decoding;
      freshImage.replaceWith(preservedImage);
    });
  };

  const previousRender = window.render;
  if (typeof previousRender !== "function") return;

  window.render = function renderWithoutImageFlicker(...args) {
    const preservedImages = captureImages();
    const result = previousRender.apply(this, args);

    // The base render is synchronous: restoring here happens before the browser paints.
    restoreImages(preservedImages);
    requestAnimationFrame(() => restoreImages(preservedImages));
    return result;
  };
})();
