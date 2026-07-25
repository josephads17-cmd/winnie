(() => {
  if (window.__v330MobileCheckpoints) return;
  window.__v330MobileCheckpoints = true;

  const mobileMedia = window.matchMedia("(max-width: 767px)");

  const decorate = () => {
    if (!mobileMedia.matches) return;

    const progress = document.querySelector("#v325-composition-ui .v328-progress-card");
    if (!progress) return;

    const four = progress.querySelector('.v328-progress-label[data-count="4"]');
    const eight = progress.querySelector('.v328-progress-label[data-count="8"]');

    if (four && !four.dataset.v330CheckpointReady) {
      four.dataset.v330CheckpointReady = "true";
      four.innerHTML = '<strong>23,60 €</strong><b>4 sachets</b><small>Livraison offerte</small>';
    }

    if (eight && !eight.dataset.v330CheckpointReady) {
      eight.dataset.v330CheckpointReady = "true";
      eight.innerHTML = '<strong>47,20 €</strong><b>8 sachets</b><small>Livraison offerte + 15 %</small>';
    }
  };

  const style = document.createElement("style");
  style.textContent = `
    @media(max-width:767px){
      #v325-composition-ui .v328-progress-card{padding-bottom:54px!important}
      #v325-composition-ui .v328-progress-track{margin-top:70px!important}
      #v325-composition-ui .v328-progress-label{display:grid!important;gap:2px;min-width:118px;padding:7px 9px;border:1px solid rgba(111,64,50,.14);border-radius:13px;background:#fffaf6;box-shadow:0 6px 15px rgba(74,43,32,.08);line-height:1.05!important}
      #v325-composition-ui .v328-progress-label[data-count="4"]{transform:translateX(-50%)}
      #v325-composition-ui .v328-progress-label[data-count="8"]{transform:translateX(-100%)}
      #v325-composition-ui .v328-progress-label strong{display:block;color:#4b2d24;font:800 11px/1 Jost,sans-serif}
      #v325-composition-ui .v328-progress-label b{display:block;color:#6f4032;font:800 10px/1.1 Jost,sans-serif}
      #v325-composition-ui .v328-progress-label small{display:block;color:#765b50;font:700 8px/1.15 Jost,sans-serif}
      #v325-composition-ui .v328-progress-marker[data-count="4"],
      #v325-composition-ui .v328-progress-marker[data-count="8"]{width:24px;height:24px;border:5px solid #fffaf6;box-shadow:0 0 0 2px rgba(111,64,50,.18),0 6px 14px rgba(74,43,32,.12)}
    }
  `;
  document.head.appendChild(style);

  const schedule = () => requestAnimationFrame(decorate);
  document.addEventListener("DOMContentLoaded", schedule);
  document.addEventListener("click", schedule, true);
  window.addEventListener("pageshow", schedule);
  mobileMedia.addEventListener?.("change", schedule);
  setInterval(decorate, 500);
})();