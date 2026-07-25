(() => {
  if (document.body.classList.contains("v331-weight-labels-ready")) return;
  document.body.classList.add("v331-weight-labels-ready");

  const WEIGHTS = {
    calendula: "20 g",
    rose: "15 g",
    camomille: "20 g",
    hibiscus: "20 g",
    plantain: "25 g",
    pissenlit: "25 g",
    framboisier: "25 g",
    noisetier: "25 g",
  };

  const KEY_BY_FILENAME = {
    "calendula.png": "calendula",
    "rose.png": "rose",
    "camomille-bio.jpg": "camomille",
    "hibiscus-rouge.jpg": "hibiscus",
    "plantain.png": "plantain",
    "pissenlit.png": "pissenlit",
    "framboisier.png": "framboisier",
    "noisetier.png": "noisetier",
  };

  const weightFor = (img) => {
    const src = decodeURIComponent(String(img?.getAttribute("src") || "")).toLowerCase();
    const key = Object.keys(KEY_BY_FILENAME).find((name) => src.includes(name));
    return key ? WEIGHTS[KEY_BY_FILENAME[key]] : null;
  };

  const decorate = () => {
    document.querySelectorAll(".v328-mini-products > span, .v328-bundle-product > span").forEach((span) => {
      if (span.querySelector(":scope > .v331-weight")) return;
      const img = span.querySelector("img");
      const weight = weightFor(img);
      if (!weight) return;
      const label = document.createElement("small");
      label.className = "v331-weight";
      label.textContent = weight;
      span.appendChild(label);
    });
  };

  const style = document.createElement("style");
  style.textContent = `
    .v328-mini-products > span, .v328-bundle-product > span { position: relative; }
    .v331-weight {
      position: absolute; left: 0; right: 0; bottom: 0;
      padding: 4px 0 5px;
      font: 700 9px/1 Jost, sans-serif;
      letter-spacing: .04em;
      text-align: center;
      color: #fff;
      background: linear-gradient(to top, rgba(52,30,23,.62), rgba(52,30,23,0));
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  decorate();
})();
