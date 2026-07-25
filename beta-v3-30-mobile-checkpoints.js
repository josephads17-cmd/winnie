(() => {
  if (window.__v330MobileCheckpoints) return;
  window.__v330MobileCheckpoints = true;

  const mobileMedia = window.matchMedia("(max-width: 767px)");

  const readCount = () => {
    try {
      if (typeof st !== "undefined" && Array.isArray(st.p)) {
        return st.p.reduce((sum, item) => sum + Number(item?.q || 0), 0);
      }
    } catch (_) {}
    return 0;
  };

  const restoreTopProgress = () => {
    const progress = document.querySelector("#v325-composition-ui .v328-progress-card");
    if (!progress) return;
    const four = progress.querySelector('.v328-progress-label[data-count="4"]');
    const eight = progress.querySelector('.v328-progress-label[data-count="8"]');
    if (four) {
      four.removeAttribute("data-v330-checkpoint-ready");
      four.innerHTML = "<b>4 sachets</b>Livraison offerte";
    }
    if (eight) {
      eight.removeAttribute("data-v330-checkpoint-ready");
      eight.innerHTML = "<b>8 sachets</b>Livraison offerte + 15 %";
    }
  };

  const decorateTotalProgress = () => {
    if (!mobileMedia.matches) return;
    restoreTopProgress();

    const summary = document.querySelector("#v325-composition-ui .v325-total-summary");
    const track = summary?.querySelector(":scope > .v325-total-progress");
    if (!summary || !track) return;

    const count = readCount();
    const capped = Math.min(8, Math.max(0, count));
    const fill = track.querySelector(":scope > span");
    if (fill) fill.style.width = `${(capped / 8) * 100}%`;

    track.setAttribute("aria-label", "Progression vers les avantages de la box");
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", "8");
    track.setAttribute("aria-valuenow", String(capped));
    track.classList.toggle("is-four", count >= 4);
    track.classList.toggle("is-eight", count >= 8);

    if (!track.querySelector(".v330-total-checkpoint-four")) {
      track.insertAdjacentHTML(
        "beforeend",
        `<i class="v330-total-checkpoint v330-total-checkpoint-four" aria-hidden="true"></i>
         <i class="v330-total-checkpoint v330-total-checkpoint-eight" aria-hidden="true"></i>
         <span class="v330-total-label v330-total-label-four"><b>23,60 €</b><small>4 sachets · livraison offerte</small></span>
         <span class="v330-total-label v330-total-label-eight"><b>47,20 €</b><small>8 sachets · livraison offerte + 15 %</small></span>`,
      );
    }
  };

  const style = document.createElement("style");
  style.textContent = `
    @media(max-width:767px){
      #v325-composition-ui .v325-total-summary{padding-bottom:72px!important}
      #v325-composition-ui .v325-total-progress{position:relative!important;overflow:visible!important;margin-top:18px!important}
      #v325-composition-ui .v325-total-progress>span{transition:width .2s ease!important}
      .v330-total-checkpoint{position:absolute;z-index:3;top:50%;width:18px;height:18px;border:4px solid #fffaf6;border-radius:50%;background:#b59a8c;box-shadow:0 0 0 2px rgba(111,64,50,.16);transform:translate(-50%,-50%)}
      .v330-total-checkpoint-four{left:50%}
      .v330-total-checkpoint-eight{left:100%}
      .v325-total-progress.is-four .v330-total-checkpoint-four,.v325-total-progress.is-eight .v330-total-checkpoint-eight{background:#78945f}
      .v330-total-label{position:absolute;top:24px;display:grid;gap:3px;color:#6f4032;font-family:Jost,sans-serif;line-height:1.15;white-space:nowrap}
      .v330-total-label b{font-size:11px;font-weight:800}
      .v330-total-label small{font-size:8px;font-weight:700;color:#80675c}
      .v330-total-label-four{left:50%;text-align:center;transform:translateX(-50%)}
      .v330-total-label-eight{right:0;text-align:right}
    }
  `;
  document.head.appendChild(style);

  const schedule = () => requestAnimationFrame(decorateTotalProgress);
  document.addEventListener("DOMContentLoaded", schedule);
  document.addEventListener("click", schedule, true);
  window.addEventListener("pageshow", schedule);
  mobileMedia.addEventListener?.("change", schedule);
  setInterval(decorateTotalProgress, 500);
})();