(() => {
  const DESKTOP_QUERY = "(min-width: 981px) and (hover: hover) and (pointer: fine)";
  if (!window.matchMedia(DESKTOP_QUERY).matches) return;

  const blobUrl =
    "https://api.github.com/repos/josephads17-cmd/winnie/git/blobs/b51b71f9b6f62bac771b84c36c2017a2b7a18b1e";

  fetch(blobUrl, { cache: "force-cache" })
    .then((response) => {
      if (!response.ok) throw new Error("Le visuel V3.22 n’a pas pu être chargé.");
      return response.json();
    })
    .then((blob) => {
      const content = String(blob.content || "").replace(/\s+/g, "");
      if (!content) throw new Error("Le visuel V3.22 est vide.");
      const image = `url("data:image/webp;base64,${content}")`;
      document.documentElement.style.setProperty("--v322-hero-image", image);
      document.body.classList.add("v322-hero-ready");
    })
    .catch((error) => console.error(error));
})();
