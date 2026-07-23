import fs from "node:fs";
import crypto from "node:crypto";

const read = (path) => fs.readFileSync(path, "utf8");
const write = (path, content) => fs.writeFileSync(path, content.replace(/\r\n/g, "\n"), "utf8");

const cssSources = [
  "beta-v3-19.css",
  "beta-v3-20.css",
  "beta-v3-22.css",
  "beta-v3-23.css",
  "beta-v3-24.css",
  "beta-v3-24-cart.css",
  "beta-v3-25.css",
  "beta-v3-26.css",
  "beta-v3-27.css",
];

const jsSources = [
  "beta-v3-19.js",
  "beta-v3-20.js",
  "beta-v3-22.js",
  "beta-v3-21.js",
  "beta-v3-23.js",
  "beta-v3-24.js",
  "beta-v3-24-instagram.js",
  "beta-v3-25.js",
  "beta-v3-25-checkout.js",
  "beta-v3-26.js",
  "beta-v3-27.js",
  "beta-v3-27-loading-fix.js",
];

const missing = [...cssSources, ...jsSources, "beta-v3-19.html", "beta-v3-27.html"].filter(
  (path) => !fs.existsSync(path),
);
if (missing.length) {
  throw new Error(`Fichiers sources manquants : ${missing.join(", ")}`);
}

const baseHtml = read("beta-v3-19.html");
const currentWrapper = read("beta-v3-27.html");
const bodyMatch = baseHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyMatch) throw new Error("Le body de beta-v3-19.html est introuvable.");

const bodyContent = bodyMatch[1]
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/^\s+|\s+$/g, "");

const wrapperStyles = Array.from(
  currentWrapper.matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/gi),
  (match) => match[1].trim(),
).join("\n\n");

const cssBundle = [
  "/* La Maison Winnie — Beta finale consolidée. Fichier généré automatiquement. */",
  ...cssSources.map((path) => `\n/* ===== ${path} ===== */\n${read(path).trim()}\n`),
  `\n/* ===== styles auparavant intégrés à beta-v3-27.html ===== */\n${wrapperStyles}\n`,
].join("\n");

const finalRuntime = `
/* ===== Initialisation finale consolidée ===== */
(() => {
  const heroBadge = document.querySelector(".hero .eyebrow");
  if (heroBadge) heroBadge.textContent = "Beta finale";

  const footerVersion = document.querySelector(".footer-meta small");
  if (footerVersion) footerVersion.textContent = "Beta finale consolidée — paiement sécurisé par Stripe";

  const mobileRecapMedia = window.matchMedia("(max-width: 640px)");
  const originalShowRecap = window.showRecap;
  const originalActivateConfiguratorStep = window.activateConfiguratorStep;
  const originalReturnToConfigurator = window.returnToConfigurator;
  const originalGo = window.go;

  const closeMobileRecap = () => {
    document.body.classList.remove("v324-mobile-recap-open");
  };

  if (typeof originalShowRecap === "function") {
    window.showRecap = function showRecapFinale() {
      if (mobileRecapMedia.matches) {
        document.body.classList.add("v324-mobile-recap-open");
      }
      return originalShowRecap();
    };
  }

  if (typeof originalActivateConfiguratorStep === "function") {
    window.activateConfiguratorStep = function activateConfiguratorStepFinale(stepNumber) {
      closeMobileRecap();
      return originalActivateConfiguratorStep(stepNumber);
    };
  }

  if (typeof originalReturnToConfigurator === "function") {
    window.returnToConfigurator = function returnToConfiguratorFinale() {
      closeMobileRecap();
      return originalReturnToConfigurator();
    };
  }

  if (typeof originalGo === "function") {
    window.go = function goFinale(stepNumber) {
      if (Number(stepNumber) !== 4) closeMobileRecap();
      return originalGo(stepNumber);
    };
  }

  const syncMobileRecapViewport = () => {
    if (!mobileRecapMedia.matches) closeMobileRecap();
  };

  if (mobileRecapMedia.addEventListener) {
    mobileRecapMedia.addEventListener("change", syncMobileRecapViewport);
  } else {
    window.addEventListener("resize", syncMobileRecapViewport);
  }

  const waitForHero = () =>
    new Promise((resolve) => {
      const startedAt = performance.now();
      const check = () => {
        const mobile = window.matchMedia("(max-width: 767px)").matches;
        const ready = mobile
          ? document.body.classList.contains("v322-mobile-hero-ready")
          : document.body.classList.contains("v322-hero-ready");
        if (ready || performance.now() - startedAt > 700) resolve();
        else requestAnimationFrame(check);
      };
      check();
    });

  const reveal = async () => {
    await Promise.race([
      Promise.all([
        document.fonts?.ready || Promise.resolve(),
        waitForHero(),
      ]),
      new Promise((resolve) => setTimeout(resolve, 900)),
    ]);

    const targetId = window.location.hash.slice(1);
    const target = targetId && document.getElementById(targetId);
    if (target) target.scrollIntoView();

    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    window.clearTimeout(window.__lmwFinalLoadTimeout);
    document.documentElement.classList.remove("v327-app-loading");
    document.documentElement.classList.add("v327-app-ready");
  };

  reveal().catch(() => {
    document.documentElement.classList.remove("v327-app-loading");
    document.documentElement.classList.add("v327-app-ready");
  });
})();
`;

const jsBundle = [
  "/* La Maison Winnie — Beta finale consolidée. Fichier généré automatiquement. */",
  ...jsSources.map((path) => `\n/* ===== ${path} ===== */\n${read(path).trim()}\n;`),
  finalRuntime,
].join("\n");

const digest = crypto
  .createHash("sha256")
  .update(cssBundle)
  .update("\n---JS---\n")
  .update(jsBundle)
  .digest("hex")
  .slice(0, 12);

const criticalLoader = `
      html.v327-app-loading {
        overflow: hidden;
        background: #fdf6f0;
      }
      html.v327-app-loading body {
        opacity: 0;
        pointer-events: none;
      }
      html.v327-app-loading::before {
        content: "Préparation de La Maison Winnie…";
        position: fixed;
        z-index: 10000;
        inset: 0;
        display: grid;
        place-items: center;
        padding-top: 70px;
        background:
          radial-gradient(circle at 50% 38%, rgba(255, 255, 255, 0.96), transparent 25%),
          linear-gradient(180deg, #fffaf6, #f6e4d7);
        color: #6f4032;
        font: 700 15px/1.4 Jost, sans-serif;
        letter-spacing: 0.08em;
        text-align: center;
        text-transform: uppercase;
      }
      html.v327-app-loading::after {
        content: "";
        position: fixed;
        z-index: 10001;
        top: calc(50% - 38px);
        left: calc(50% - 18px);
        width: 36px;
        height: 36px;
        border: 3px solid rgba(111, 64, 50, 0.16);
        border-top-color: #6f4032;
        border-radius: 50%;
        animation: lmw-final-spin 0.8s linear infinite;
      }
      html.v327-app-ready body { animation: lmw-final-reveal 0.24s ease both; }
      @keyframes lmw-final-spin { to { transform: rotate(360deg); } }
      @keyframes lmw-final-reveal { from { opacity: 0; } to { opacity: 1; } }
      @media (prefers-reduced-motion: reduce) {
        html.v327-app-loading::after,
        html.v327-app-ready body { animation: none; }
      }
`;

const finalHtml = `<!doctype html>
<html lang="fr" class="v327-app-loading">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="robots" content="noindex,nofollow" />
    <title>La Maison Winnie — Beta finale consolidée</title>
    <meta name="description" content="Version de test consolidée du configurateur La Maison Winnie." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600&display=swap" rel="stylesheet" />
    <link rel="preload" as="image" href="ChatGPT%20Image%2018%20juil.%202026%20a%CC%80%2014_03_05.png?v=1" media="(max-width: 767px)" />
    <link rel="preload" as="image" href="ChatGPT%20Image%2018%20juil.%202026%20a%CC%80%2012_46_32.png?v=2" media="(min-width: 768px)" />
    <link rel="stylesheet" href="beta-finale.css?v=${digest}" />
    <style>${criticalLoader}</style>
    <script>
      window.__lmwFinalLoadTimeout = setTimeout(() => {
        document.documentElement.classList.remove("v327-app-loading");
        document.documentElement.classList.add("v327-app-ready");
      }, 6000);
    </script>
    <script defer src="beta-finale.js?v=${digest}"></script>
  </head>
  <body>
${bodyContent}
  </body>
</html>
`;

if (!bodyContent.includes('id="composer"')) {
  throw new Error("La section #composer manque dans le HTML consolidé.");
}
if (!jsBundle.includes("Passer au paiement sécurisé")) {
  throw new Error("Le paiement Stripe direct n'est pas présent dans le bundle final.");
}
if (!jsBundle.includes("moveBunnyArmyAfterHero")) {
  throw new Error("Le déplacement de la Bunny Army manque dans le bundle final.");
}
if (!jsBundle.includes("setupInfiniteCarousel")) {
  throw new Error("Le carrousel infini des références manque dans le bundle final.");
}
if (/fetch\s*\(\s*["']https:\/\/cdn\.jsdelivr\.net/.test(finalHtml)) {
  throw new Error("La Beta finale ne doit plus télécharger une ancienne base HTML.");
}

write("beta-finale.css", cssBundle);
write("beta-finale.js", jsBundle);
write("beta-finale.html", finalHtml);
write(
  "beta-finale-manifest.json",
  `${JSON.stringify(
    {
      generated_at: new Date().toISOString(),
      digest,
      html_source: "beta-v3-19.html",
      wrapper_source: "beta-v3-27.html",
      css_sources: cssSources,
      js_sources: jsSources,
      output: ["beta-finale.html", "beta-finale.css", "beta-finale.js"],
    },
    null,
    2,
  )}\n`,
);

console.log(`Beta finale générée — version ${digest}`);
