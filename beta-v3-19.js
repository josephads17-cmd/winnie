const products = [
  {
    name: "Calendula",
    img: "calendula.png",
    cat: "flower",
    w: "15 g",
    p: 5.9,
    c: "linear-gradient(135deg,#f5b94d,#fff2bf)",
    desc: "Fleurs de souci séchées, naturellement colorées et sans additif.",
    composition: "100 % fleurs de calendula (souci) séchées.",
    analysis: "Fibres brutes : 7 % · Protéines brutes : 9 %",
    guarantees: "Ingrédients naturels · Sans additifs ni conservateurs",
    why: "Le calendula est couramment proposé aux lapins comme complément végétal dans une alimentation variée.",
    benefits: "Apporte couleur, variété et texture florale.",
    dose: "Commencer par environ 0,5 g ou une petite pincée. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
  {
    name: "Rose",
    img: "Rose.png",
    cat: "flower",
    w: "15 g",
    p: 5.9,
    c: "linear-gradient(135deg,#d97f89,#ffe8eb)",
    desc: "Pétales et morceaux de rose séchés, 100 % naturels.",
    composition: "100 % pétales et morceaux de rose séchés.",
    analysis: "Fibres brutes : 20,20 % · Protéines brutes : 16,10 %",
    guarantees:
      "Ingrédients naturels · Sans additifs ni conservateurs · Sans sucres ajoutés",
    why: "Les pétales non traités peuvent être proposés comme friandise florale.",
    benefits: "Une référence très parfumée et visuellement premium.",
    dose: "Commencer par environ 0,5 g ou une petite pincée. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
  {
    name: "Bleuet",
    img: "Bleuet.png",
    cat: "flower",
    w: "10 g",
    p: 6.9,
    c: "linear-gradient(135deg,#6388cc,#e6efff)",
    desc: "Pétales et fleurs de bleuet séchés.",
    composition: "100 % pétales et fleurs de bleuet séchés.",
    analysis: "Fibres brutes : 15,80 % · Protéines brutes : 16,10 %",
    guarantees: "Ingrédients naturels · Sans additifs ni conservateurs",
    why: "Le bleuet est utilisé dans les mélanges floraux destinés aux petits herbivores.",
    benefits: "Ajoute une forte variété visuelle et aromatique.",
    dose: "Quelques pétales, soit environ 0,5 g au départ. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
  {
    name: "Mauve",
    img: "Mauve.png",
    cat: "flower",
    w: "10 g",
    p: 6.9,
    c: "linear-gradient(135deg,#aa7dbc,#f3e7fa)",
    desc: "Fleurs de mauve séchées à la couleur violette.",
    composition: "Fleurs de mauve séchées.",
    guarantees:
      "Ingrédients naturels · Sans additifs ni conservateurs · Sans sucres ajoutés",
    notice:
      "À conserver à l’abri de l’air et de la lumière. DLUO indicative : 1 an après réception si le produit est conservé dans de bonnes conditions.",
    why: "La mauve fait partie des plantes proposées en complément aux lapins.",
    benefits: "Texture légère et présentation très élégante.",
    dose: "Une petite pincée, environ 0,5 g au départ. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
  {
    name: "Hibiscus blanc",
    img: "Hibiscus blanc.png",
    cat: "flower",
    w: "15 g",
    p: 5.9,
    c: "linear-gradient(135deg,#d4b77d,#fff0d2)",
    desc: "Fleurs d’hibiscus blanc séchées, sans additif.",
    composition: "Fleurs d’hibiscus blanc séchées.",
    analysis: "Fibres brutes : 3,70 % · Protéines brutes : 12 %",
    guarantees: "Ingrédients naturels",
    why: "Commercialisé comme friandise végétale adaptée aux petits herbivores.",
    benefits: "Une texture différente et un choix original.",
    dose: "Quelques fragments, soit environ 0,5 g au départ. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
  {
    name: "Pétales de tournesol",
    img: "Pe\u0301tales de tournesol.png",
    cat: "flower",
    w: "15 g",
    p: 6.9,
    c: "linear-gradient(135deg,#e8b43c,#fff1a8)",
    desc: "Pétales de tournesol séchés.",
    composition: "Pétales de tournesol séchés.",
    guarantees: "Ingrédients naturels",
    why: "Les pétales propres et non traités peuvent compléter une alimentation variée.",
    benefits: "Une couleur lumineuse et une belle présentation en sachet.",
    dose: "Commencer par environ 0,5 g ou une petite pincée. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
  {
    name: "Plantain",
    img: "Plantain.png",
    cat: "leaf",
    w: "25 g",
    p: 5.9,
    c: "linear-gradient(135deg,#76965d,#edf6e8)",
    desc: "100 % feuilles de plantain séchées.",
    composition: "100 % feuille de plantain séchée.",
    analysis: "Fibres brutes : 12,10 % · Protéines brutes : 31,60 %",
    guarantees: "Ingrédients naturels · Sans additifs ni conservateurs",
    why: "Le plantain est une plante sauvage fréquemment consommée par les lapins.",
    benefits: "Référence simple, végétale et très cohérente avec le foin.",
    dose: "Commencer par environ 0,5 à 1 g. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
  {
    name: "Pissenlit",
    img: "Pissenlit.png",
    cat: "leaf",
    w: "25 g",
    p: 5.9,
    c: "linear-gradient(135deg,#c6a829,#fff5ad)",
    desc: "Feuilles de pissenlit séchées au goût herbacé.",
    composition: "100 % feuilles de pissenlit.",
    analysis:
      "Cendres brutes : 11,21 % · Fibres brutes : 17,16 % · Protéines brutes : 11,57 % · Matières grasses brutes : 3,54 %",
    guarantees:
      "Ingrédients naturels · Sans additifs ni conservateurs · Sans sucres ajoutés",
    why: "Le pissenlit est bien connu des propriétaires de lapins.",
    benefits: "Un choix familier et facile à comprendre.",
    dose: "Commencer par environ 0,5 à 1 g. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
  {
    name: "Framboisier",
    img: "Framboisier.png",
    cat: "leaf",
    w: "25 g",
    p: 5.9,
    c: "linear-gradient(135deg,#6e9968,#edf6e9)",
    desc: "Feuilles de framboisier séchées.",
    composition: "100 % feuilles de framboisier.",
    analysis: "Fibres brutes : 3,7 % · Protéines brutes : 12 %",
    guarantees: "Ingrédients naturels · Sans additifs ni conservateurs",
    notice:
      "Peut contenir de petites épines souples. À conserver au sec, à l’abri de la lumière et de l’humidité.",
    why: "Les feuilles non traitées sont couramment proposées aux lapins.",
    benefits: "Texture feuillue et goût différent.",
    dose: "Commencer par environ 0,5 à 1 g. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
  {
    name: "Fraisier",
    img: "Fraisier.png",
    cat: "leaf",
    w: "25 g",
    p: 5.9,
    c: "linear-gradient(135deg,#719b62,#eef7e9)",
    desc: "Feuilles de fraisier séchées.",
    composition: "100 % feuilles de fraisier séchées.",
    analysis: "Fibres brutes : 25,50 % · Protéines brutes : 10,50 %",
    guarantees:
      "Ingrédients naturels · Sans additifs ni conservateurs · Origine : Allemagne",
    why: "Les feuilles propres et non traitées sont généralement proposées aux lapins en complément du foin.",
    benefits: "Référence familière, douce et naturelle.",
    dose: "Commencer par environ 0,5 à 1 g. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
  {
    name: "Ortie",
    img: "Ortie.png",
    cat: "leaf",
    w: "25 g",
    p: 5.9,
    c: "linear-gradient(135deg,#657f54,#e8f1e2)",
    desc: "Feuilles d’ortie entièrement séchées.",
    composition: "100 % orties entières du Périgord.",
    analysis: "Fibres brutes : 15 % · Protéines brutes : 16 %",
    guarantees:
      "Ingrédients naturels · Sans additifs ni conservateurs · Circuit court français",
    why: "Une fois correctement séchée, l’ortie est couramment utilisée pour les herbivores.",
    benefits: "Apporte une nouvelle texture végétale.",
    dose: "Commencer par environ 0,5 g. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
  {
    name: "Noisetier",
    img: "Noisetier.png",
    cat: "leaf",
    w: "25 g",
    p: 5.9,
    c: "linear-gradient(135deg,#8b765b,#efe6d9)",
    desc: "Feuilles de noisetier séchées.",
    composition: "100 % feuilles et tiges de noisetier.",
    guarantees: "Ingrédients naturels · Sans additifs ni conservateurs",
    notice:
      "Plante très fragile : les feuilles sont rarement entières dans le sachet.",
    why: "Les feuilles de noisetier non traitées peuvent être proposées aux lapins.",
    benefits:
      "Un choix très naturel qui complète bien le plantain et le pissenlit.",
    dose: "Commencer par environ 0,5 à 1 g. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
  {
    name: "Courgette",
    img: "Courgette se\u0301che\u0301e.png",
    cat: "treat",
    w: "20 g",
    p: 4.9,
    c: "linear-gradient(135deg,#78a94b,#dff2bd)",
    desc: "Cubes de courgette séchée, sans additif ni conservateur.",
    composition: "Cubes de courgette séchée.",
    guarantees: "Ingrédients naturels · Sans additifs ni conservateurs",
    why: "La courgette est une friandise végétale peu sucrée par rapport aux fruits.",
    benefits: "Texture croquante et goût doux.",
    dose: "Environ 0,5 à 1 g par distribution, deux à trois fois par semaine.",
  },
  {
    name: "Carotte",
    img: "Carotte se\u0301che\u0301e.png",
    cat: "treat",
    w: "15 g",
    p: 4.9,
    c: "linear-gradient(135deg,#e87832,#ffd5b3)",
    desc: "Rondelles de carotte séchée, 100 % naturelles.",
    composition: "Rondelles de carotte séchée.",
    analysis:
      "Pour 50 g : 443 kJ / 111 kcal · Lipides : 0,8 g, dont acides gras saturés : 0 g · Glucides : 34,5 g, dont sucres : 0 g · Sodium : 0,241 g · Fibres brutes : 1,60 % · Protéines brutes : 16 %",
    guarantees: "Ingrédients naturels · Sans additifs ni conservateurs",
    why: "Elle peut être proposée comme récompense, en petite quantité.",
    benefits: "Très appétente et facile à identifier.",
    dose: "Environ 0,3 à 0,7 g par distribution, une à deux fois par semaine.",
  },
  {
    name: "Fraise",
    img: "Fraise lyophilise\u0301e.png",
    cat: "treat",
    w: "8 g",
    p: 6.9,
    c: "linear-gradient(135deg,#d84c55,#ffd9dc)",
    desc: "100 % fraises lyophilisées, sans sucre ajouté.",
    composition: "100 % fraises lyophilisées.",
    guarantees: "Ingrédients naturels · Sans additifs ni conservateurs",
    notice:
      "Friandise naturellement sucrée à distribuer avec modération. Le fournisseur recommande de ne pas la distribuer aux animaux diabétiques.",
    why: "La fraise est adaptée comme friandise très occasionnelle.",
    benefits: "Référence premium et très gourmande.",
    dose: "Environ 0,2 à 0,5 g par distribution, une à deux fois par semaine.",
  },
];
const st = {
  name: "votre lapin",
  p: products.map(() => ({ q: 0, m: "unique" })),
};
const $ = (id) => document.getElementById(id);
const money = (n) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const isMobile = () => window.matchMedia("(max-width: 640px)").matches;
let activeInfoIndex = null;
let quickAmount = 1;

function scrollToElement(element, extra = 12) {
  if (!element) return;
  const nav = document.querySelector(".nav");
  const offset = (nav ? nav.offsetHeight : 0) + extra;
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

function activateConfiguratorStep(stepNumber) {
  document
    .querySelectorAll(".screen")
    .forEach((screen) =>
      screen.classList.toggle(
        "active",
        Number(screen.dataset.screen) === stepNumber,
      ),
    );
  document
    .querySelectorAll(".step")
    .forEach((step) =>
      step.classList.toggle("active", Number(step.dataset.s) === stepNumber),
    );
  requestAnimationFrame(() =>
    scrollToElement(document.querySelector(".panel"), 18),
  );
}

function go(n) {
  if (n === 4 && isMobile()) return showRecap();
  activateConfiguratorStep(n);
}

function showRecap() {
  if (!isMobile()) return activateConfiguratorStep(4);
  document
    .querySelectorAll(".screen, .step")
    .forEach((element) => element.classList.remove("active"));
  requestAnimationFrame(() =>
    scrollToElement(document.querySelector(".cart"), 12),
  );
}

function returnToConfigurator() {
  activateConfiguratorStep(3);
}

function focusNameInput() {
  scrollToElement(document.querySelector(".hero"), 18);
  window.setTimeout(() => $("rabbitName").focus(), 450);
}

function applyMobileLayout() {
  const validation = document.querySelector(".validation-step");
  const steps = document.querySelector(".steps");
  if (validation) validation.style.display = isMobile() ? "none" : "";
  if (steps)
    steps.style.gridTemplateColumns = isMobile() ? "repeat(2,1fr)" : "";
}
function changeP(i, d) {
  st.p[i].q = Math.max(0, st.p[i].q + d);
  render();
}
function modeP(i, v) {
  st.p[i].m = v;
  render();
}
function rows(cat, id) {
  const root = $(id);
  root.innerHTML = products
    .map((p, i) => ({ p, i }))
    .filter((x) => x.p.cat === cat)
    .map(
      ({ p, i }) =>
        `<article class="item"><div class="thumbwrap"><div class="thumb" role="button" tabindex="0" data-product-index="${i}" aria-label="Voir la fiche de ${p.name}"><img src="${encodeURI(p.img)}" alt="${p.name} séché" loading="lazy" decoding="async"></div><button class="info" onclick="openInfo(${i})" aria-label="Informations sur ${p.name}">i</button></div><div><h4>${p.name}</h4><div class="meta">${p.w}</div><div class="price">${money(p.p)}</div></div><select class="mode" onchange="modeP(${i},this.value)"><option value="unique" ${st.p[i].m === "unique" ? "selected" : ""}>Livraison unique</option><option value="mensuel" ${st.p[i].m === "mensuel" ? "selected" : ""}>Mensuel</option></select><div class="qty"><button onclick="changeP(${i},-1)">−</button><span>${st.p[i].q}</span><button onclick="changeP(${i},1)">+</button></div></article>`,
    )
    .join("");

  root.querySelectorAll(".thumb").forEach((thumb) => {
    const index = Number(thumb.dataset.productIndex);
    const image = thumb.querySelector("img");
    thumb.addEventListener("click", () => openInfo(index));
    thumb.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openInfo(index);
      }
    });
    image.addEventListener(
      "error",
      () => {
        image.hidden = true;
        thumb.style.background = products[index].c;
        console.error(`Image produit introuvable : ${products[index].img}`);
      },
      { once: true },
    );
  });
}
function render() {
  const enteredName = $("rabbitName").value.trim();
  st.name = enteredName || "votre lapin";
  $("insideBoxName").textContent = enteredName || "Son prénom";
  ["titleName", "cartName", "labelName"].forEach(
    (id) => ($(id).textContent = st.name),
  );
  $("heroComposeCta").textContent = enteredName
    ? `Choisir les produits de ${enteredName}`
    : "Choisir ses produits";
  rows("flower", "flowers");
  rows("leaf", "leaves");
  rows("treat", "treats");
  let lines = [],
    sub = 0,
    count = 0;
  products.forEach((p, i) => {
    let x = st.p[i];
    if (x.q) {
      let v = x.q * p.p;
      sub += v;
      count += x.q;
      lines.push({ n: p.name, w: p.w, q: x.q, m: x.m, v });
    }
  });
  let ship = sub >= 29.9 ? 0 : 4.9,
    total = sub + ship;
  $("cartContent").className = lines.length ? "cart-lines" : "empty";
  $("cartContent").innerHTML = lines.length
    ? lines
        .map(
          (x) =>
            `<div class="cart-line"><span>${x.q} × ${x.n} ${x.w}<br><small>${x.m === "mensuel" ? "Mensuel" : "Livraison unique"}</small></span><strong>${money(x.v)}</strong></div>`,
        )
        .join("")
    : "Aucun produit sélectionné pour le moment.";
  $("subtotal").textContent = money(sub);
  $("shipping").textContent = ship ? money(ship) : "Offerte";
  $("total").textContent = money(total);
  $("deliveryNote").textContent =
    sub >= 29.9
      ? "Livraison offerte atteinte."
      : "Encore " + money(29.9 - sub) + " pour obtenir la livraison offerte.";
  $("floatName").textContent = st.name;
  $("floatCount").textContent = count;
  $("floatTotal").textContent = money(total);
  $("drawerName").textContent = st.name;
  $("drawerContent").className = lines.length ? "cart-lines" : "empty";
  $("drawerContent").innerHTML = lines.length
    ? lines
        .map(
          (x) =>
            `<div class="cart-line"><span>${x.q} × ${x.n} ${x.w}<br><small>${x.m === "mensuel" ? "Mensuel" : "Livraison unique"}</small></span><strong>${money(x.v)}</strong></div>`,
        )
        .join("")
    : "Aucun produit sélectionné pour le moment.";
  $("drawerSubtotal").textContent = money(sub);
  $("drawerShipping").textContent = ship ? money(ship) : "Offerte";
  $("drawerTotal").textContent = money(total);
  $("drawerDelivery").textContent =
    sub >= 29.9
      ? "Livraison offerte atteinte."
      : "Encore " + money(29.9 - sub) + " pour obtenir la livraison offerte.";
  $("mobileOrderCta").textContent = `Commander la box de ${st.name}`;
}
function openDrawer() {
  $("cartDrawer").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  $("cartDrawer").classList.remove("open");
  document.body.style.overflow = "";
}
function drawerBackdrop(e) {
  if (e.target.id === "cartDrawer") closeDrawer();
}
function openInfo(i) {
  const p = products[i];
  activeInfoIndex = i;
  quickAmount = 1;

  const modalBox = document.querySelector("#infoModal .modalbox");
  let modalImage = $("productModalImage");
  if (!modalImage) {
    modalImage = document.createElement("img");
    modalImage.id = "productModalImage";
    modalImage.className = "product-modal-image";
    modalBox.insertBefore(modalImage, $("infoTitle"));

    const meta = document.createElement("div");
    meta.className = "product-modal-meta";
    meta.innerHTML =
      '<span id="productModalWeight"></span><strong id="productModalPrice"></strong>';
    $("infoTitle").insertAdjacentElement("afterend", meta);
  }

  modalImage.hidden = false;
  modalImage.src = encodeURI(p.img);
  modalImage.alt = `${p.name} séché`;
  modalImage.onerror = () => {
    modalImage.hidden = true;
    console.error(`Image produit introuvable dans la fiche : ${p.img}`);
  };
  $("infoTitle").textContent = p.name;
  $("productModalWeight").textContent = p.w;
  $("productModalPrice").textContent = money(p.p);
  $("infoDesc").textContent = p.desc;
  $("infoComposition").textContent = p.composition;
  $("infoAnalysis").textContent = p.analysis || "";
  $("infoAnalysisBlock").hidden = !p.analysis;
  $("infoGuarantees").textContent = p.guarantees || "";
  $("infoGuaranteesBlock").hidden = !p.guarantees;
  $("infoNotice").textContent = p.notice || "";
  $("infoNoticeBlock").hidden = !p.notice;
  $("infoWhy").textContent = p.why;
  $("infoBenefits").textContent = p.benefits;
  $("infoDose").textContent = p.dose;
  $("quickProduct").textContent = `${p.name} · ${p.w}`;
  $("quickPrice").textContent = money(p.p);
  $("quickQty").textContent = "1";
  $("quickMode").value = st.p[i].m;
  $("quickFeedback").textContent = "";
  $("infoModal").classList.add("open");
}

function quickQty(delta) {
  quickAmount = Math.max(1, Math.min(20, quickAmount + delta));
  $("quickQty").textContent = quickAmount;
}

function quickAdd() {
  if (activeInfoIndex === null) return;
  const product = products[activeInfoIndex];
  st.p[activeInfoIndex].q += quickAmount;
  st.p[activeInfoIndex].m = $("quickMode").value;
  render();
  $("quickFeedback").textContent =
    `${quickAmount} × ${product.name} ajouté${quickAmount > 1 ? "s" : ""} au panier ✓`;
  quickAmount = 1;
  $("quickQty").textContent = "1";
}
function closeInfo() {
  $("infoModal").classList.remove("open");
}
function openConfirm() {
  $("confirmModal").classList.add("open");
}
function closeConfirm() {
  $("confirmModal").classList.remove("open");
}
$("rabbitName").addEventListener("input", render);
document.querySelectorAll(".modal").forEach(
  (m) =>
    (m.onclick = (e) => {
      if (e.target === m) m.classList.remove("open");
    }),
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .querySelectorAll(".modal")
      .forEach((m) => m.classList.remove("open"));
    closeDrawer();
  }
});
applyMobileLayout();
window.addEventListener("resize", applyMobileLayout);
render();
