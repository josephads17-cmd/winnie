const products = [
  {
    name: "Calendula",
    img: "calendula.png",
    cat: "flower",
    w: "20 g",
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
    guarantees: "Ingrédients naturels · Sans additifs ni conservateurs · Sans sucres ajoutés",
    why: "Les pétales non traités peuvent être proposés comme complément floral.",
    benefits: "Une référence parfumée et visuellement premium.",
    dose: "Commencer par environ 0,5 g ou une petite pincée. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
  {
    name: "Camomille bio",
    img: "Camomille-Bio.jpg",
    cat: "flower",
    w: "20 g",
    p: 5.9,
    c: "linear-gradient(135deg,#e8c85c,#fff7d1)",
    desc: "Fleurs de camomille bio séchées, sans additif.",
    composition: "100 % fleurs de camomille bio séchées.",
    analysis: "Fibres brutes : 25,50 % · Protéines brutes : 10,50 %",
    guarantees: "Ingrédients naturels · Sans additifs ni conservateurs · Produit bio",
    notice: "À conserver dans un endroit frais et sec, à l’abri de la lumière. Ne pas conserver dans l’emballage d’origine. DLUO indicative : 1 an à réception si le produit est conservé dans de bonnes conditions.",
    why: "La camomille apporte une nouvelle senteur à une sélection florale variée.",
    benefits: "Une fleur légère et aromatique qui complète le calendula et la rose.",
    dose: "Commencer par environ 0,5 g ou une petite pincée. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
  {
    name: "Hibiscus rouge",
    img: "Hibiscus-Rouge.jpg",
    cat: "flower",
    w: "20 g",
    p: 5.9,
    c: "linear-gradient(135deg,#a92f45,#f3b1bb)",
    desc: "Fleurs d’hibiscus rouge séchées, sans additif.",
    composition: "100 % fleurs d’hibiscus rouge séchées.",
    analysis: "Fibres brutes : 3,70 % · Protéines brutes : 12 %",
    guarantees: "Ingrédients naturels · Sans additifs ni conservateurs · Sans sucres ajoutés",
    notice: "À conserver dans un endroit frais et sec, à l’abri de la lumière. Ne pas conserver dans l’emballage d’origine. DLUO indicative : 1 an à réception si le produit est conservé dans de bonnes conditions.",
    why: "Commercialisé comme complément végétal pour les petits herbivores.",
    benefits: "Une couleur intense et une texture différente des autres fleurs.",
    dose: "Commencer par quelques fragments, soit environ 0,5 g. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
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
    analysis: "Cendres brutes : 11,21 % · Fibres brutes : 17,16 % · Protéines brutes : 11,57 % · Matières grasses brutes : 3,54 %",
    guarantees: "Ingrédients naturels · Sans additifs ni conservateurs · Sans sucres ajoutés",
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
    notice: "Peut contenir de petites épines souples. À conserver au sec, à l’abri de la lumière et de l’humidité.",
    why: "Les feuilles non traitées sont couramment proposées aux lapins.",
    benefits: "Texture feuillue et goût différent.",
    dose: "Commencer par environ 0,5 à 1 g. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
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
    notice: "Plante très fragile : les feuilles sont rarement entières dans le sachet.",
    why: "Les feuilles de noisetier non traitées peuvent être proposées aux lapins.",
    benefits: "Un choix naturel qui complète bien le plantain et le pissenlit.",
    dose: "Commencer par environ 0,5 à 1 g. À inclure dans la quantité totale quotidienne de fleurs et feuilles séchées.",
  },
];
const productIds = [
  "calendula",
  "rose",
  "camomille_bio",
  "hibiscus_rouge",
  "plantain",
  "pissenlit",
  "framboisier",
  "noisetier",
];
products.forEach((product, index) => {
  product.id = productIds[index];
});
const st = {
  name: "votre lapin",
  deliveryMode: "one_time",
  p: products.map(() => ({ q: 0 })),
};
const $ = (id) => document.getElementById(id);
const money = (n) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const FREE_SHIPPING_THRESHOLD = 29.9;
const isMobile = () => window.matchMedia("(max-width: 640px)").matches;
let activeInfoIndex = null;
let quickAmount = 1;

function updateDeliveryProgress(rootId, sub) {
  const root = $(rootId);
  if (!root) return;

  const reached = sub >= FREE_SHIPPING_THRESHOLD;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - sub);
  const progress = Math.min(100, (sub / FREE_SHIPPING_THRESHOLD) * 100);
  const cheapestProduct = Math.min(...products.map((product) => product.p));
  const nextProductUnlocks =
    !reached && sub + cheapestProduct >= FREE_SHIPPING_THRESHOLD;
  const title = root.querySelector(".delivery-title");
  const detail = root.querySelector(".delivery-detail");
  const bar = root.querySelector(".delivery-progress span");
  const meter = root.querySelector(".delivery-progress");

  root.classList.toggle("reached", reached);
  title.textContent = reached
    ? "Livraison offerte débloquée !"
    : `Plus que ${money(remaining)} avant la livraison offerte`;

  if (reached) {
    detail.textContent =
      "La livraison sera automatiquement offerte lors du paiement.";
  } else if (nextProductUnlocks) {
    detail.textContent = `Ajoutez un sachet à ${money(cheapestProduct)} : vous franchissez le seuil et la livraison devient offerte.`;
  } else if (sub === 0) {
    detail.textContent = "Le décompte commence avec le premier sachet ajouté.";
  } else {
    detail.textContent = `Votre panier a atteint ${Math.round(progress)} % du seuil.`;
  }

  bar.style.width = `${progress}%`;
  meter.setAttribute("aria-valuenow", Math.round(progress));
}

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
function setDeliveryMode(mode) {
  st.deliveryMode = mode === "monthly" ? "monthly" : "one_time";
  render();
}
function rows(cat, id) {
  const root = $(id);
  root.innerHTML = products
    .map((p, i) => ({ p, i }))
    .filter((x) => x.p.cat === cat)
    .map(
      ({ p, i }) =>
        `<article class="item"><div class="thumbwrap"><div class="thumb" role="button" tabindex="0" data-product-index="${i}" aria-label="Voir la fiche de ${p.name}"><img src="${encodeURI(p.img)}" alt="${p.name} séché" loading="lazy" decoding="async"></div><button class="info" onclick="openInfo(${i})" aria-label="Informations sur ${p.name}">i</button></div><div><h4>${p.name}</h4><div class="meta">${p.w}</div><div class="price">${money(p.p)}</div></div><div class="qty"><button onclick="changeP(${i},-1)">−</button><span>${st.p[i].q}</span><button onclick="changeP(${i},1)">+</button></div></article>`,
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
  let lines = [],
    sub = 0,
    count = 0;
  products.forEach((p, i) => {
    let x = st.p[i];
    if (x.q) {
      let v = x.q * p.p;
      sub += v;
      count += x.q;
      lines.push({ n: p.name, w: p.w, q: x.q, v });
    }
  });
  const shippingIsFree = sub >= FREE_SHIPPING_THRESHOLD;
  const total = sub;
  $("cartContent").className = lines.length ? "cart-lines" : "empty";
  const deliveryLabel =
    st.deliveryMode === "monthly"
      ? "Mensuel · Sans engagement, annulable à tout moment"
      : "Livraison unique";
  $("cartContent").innerHTML = lines.length
    ? lines
        .map(
          (x) =>
            `<div class="cart-line"><span>${x.q} × ${x.n} ${x.w}<br><small>${deliveryLabel}</small></span><strong>${money(x.v)}</strong></div>`,
        )
        .join("")
    : "Aucun produit sélectionné pour le moment.";
  $("subtotal").textContent = money(sub);
  $("shipping").textContent = shippingIsFree
    ? "Offerte"
    : "Calculée lors du paiement";
  $("total").textContent = money(total);
  document.querySelectorAll("[data-delivery-mode]").forEach((input) => {
    input.checked = input.value === st.deliveryMode;
  });
  $("deliveryModeHelp").textContent =
    st.deliveryMode === "monthly"
      ? "Votre sélection sera préparée chaque mois. Sans engagement, annulable à tout moment."
      : "Une seule préparation et un seul paiement.";
  updateDeliveryProgress("deliveryNote", sub);
  $("floatName").textContent = st.name;
  $("floatCount").textContent = count;
  $("floatTotal").textContent = money(total);
  $("drawerName").textContent = st.name;
  $("drawerContent").className = lines.length ? "cart-lines" : "empty";
  $("drawerContent").innerHTML = lines.length
    ? lines
        .map(
          (x) =>
            `<div class="cart-line"><span>${x.q} × ${x.n} ${x.w}<br><small>${deliveryLabel}</small></span><strong>${money(x.v)}</strong></div>`,
        )
        .join("")
    : "Aucun produit sélectionné pour le moment.";
  $("drawerSubtotal").textContent = money(sub);
  $("drawerShipping").textContent = shippingIsFree
    ? "Offerte"
    : "Calculée lors du paiement";
  $("drawerTotal").textContent = money(total);
  updateDeliveryProgress("drawerDelivery", sub);
  $("orderCta").textContent = `Passer au paiement sécurisé`;
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
  render();
  $("quickFeedback").textContent =
    `${quickAmount} × ${product.name} ajouté${quickAmount > 1 ? "s" : ""} au panier ✓`;
  quickAmount = 1;
  $("quickQty").textContent = "1";
}
function closeInfo() {
  $("infoModal").classList.remove("open");
}
async function startCheckout() {
  const rabbitName = $("rabbitName").value.trim();
  const items = products
    .map((product, index) => ({ id: product.id, quantity: st.p[index].q }))
    .filter((item) => item.quantity > 0);

  if (!rabbitName) {
    focusNameInput();
    window.setTimeout(
      () => $("rabbitName").setAttribute("aria-invalid", "true"),
      450,
    );
    return;
  }
  if (!items.length) {
    showRecap();
    return;
  }

  const button = $("orderCta");
  button.disabled = true;
  button.textContent = "Redirection sécurisée…";
  try {
    const response = await fetch("https://lmw-checkout.vercel.app/api/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rabbitName,
        deliveryMode: st.deliveryMode,
        items,
      }),
    });
    const data = await response.json();
    if (!response.ok || !data.url) {
      throw new Error(data.error || "Impossible de créer le paiement.");
    }
    window.location.assign(data.url);
  } catch (error) {
    button.disabled = false;
    button.textContent = "Passer au paiement sécurisé";
    $("checkoutFeedback").textContent =
      error.message || "Une erreur est survenue. Réessayez dans un instant.";
  }
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
