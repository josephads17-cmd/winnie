(() => {
  if (window.__v329SummaryProgressSafe) return;
  window.__v329SummaryProgressSafe = true;

  const readCount = () => {
    try {
      if (typeof st !== "undefined" && Array.isArray(st.p)) {
        return st.p.reduce((sum, item) => sum + Number(item?.q || 0), 0);
      }
    } catch (_) {}
    return Array.from(document.querySelectorAll("#composer .qty span"))
      .reduce((sum, node) => sum + Number(node.textContent || 0), 0);
  };

  const ensureProgress = () => {
    const heading = document.querySelector("#composer .v326-summary-heading");
    if (!heading) return;

    heading.style.display = "none";

    const parent = heading.parentElement;
    if (!parent) return;

    let block = parent.querySelector(":scope > .v329-summary-progress-safe");
    if (!block) {
      block = document.createElement("div");
      block.className = "v329-summary-progress-safe";
      block.innerHTML = `
        <div class="v329-summary-progress-count" data-v329-safe-count>0 sachet sélectionné</div>
        <div class="v329-summary-progress-labels" aria-hidden="true">
          <span></span>
          <span><b>4 sachets</b><small>Livraison offerte</small></span>
          <span><b>8 sachets</b><small>Livraison offerte + 15 %</small></span>
        </div>
        <div class="v329-summary-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="8" aria-valuenow="0">
          <span data-v329-safe-fill></span>
          <i class="v329-summary-progress-dot v329-summary-progress-dot-four"></i>
          <i class="v329-summary-progress-dot v329-summary-progress-dot-eight"></i>
        </div>
      `;
      heading.insertAdjacentElement("afterend", block);
    }

    const count = readCount();
    const countNode = block.querySelector("[data-v329-safe-count]");
    const fill = block.querySelector("[data-v329-safe-fill]");
    const track = block.querySelector(".v329-summary-progress-track");
    if (countNode) countNode.textContent = `${count} sachet${count > 1 ? "s" : ""} sélectionné${count > 1 ? "s" : ""}`;
    if (fill) fill.style.width = `${Math.min(100, (count / 8) * 100)}%`;
    if (track) track.setAttribute("aria-valuenow", String(Math.min(8, count)));
    block.classList.toggle("is-four", count >= 4);
    block.classList.toggle("is-eight", count >= 8);
  };

  const style = document.createElement("style");
  style.textContent = `
    #composer .v326-summary-heading{display:none!important}
    .v329-summary-progress-safe{margin:20px 0 28px;padding:22px 18px 24px;border:1px solid rgba(111,64,50,.12);border-radius:24px;background:rgba(255,250,246,.72)}
    .v329-summary-progress-count{margin-bottom:20px;color:#4b2d24;font:800 17px/1.2 Jost,sans-serif}
    .v329-summary-progress-labels{display:grid;grid-template-columns:1fr 1fr 1fr;align-items:end;margin-bottom:12px;color:#6f4032;text-align:center}
    .v329-summary-progress-labels span:first-child{visibility:hidden}
    .v329-summary-progress-labels b,.v329-summary-progress-labels small{display:block}
    .v329-summary-progress-labels b{font:800 13px/1.2 Jost,sans-serif}
    .v329-summary-progress-labels small{margin-top:3px;font:700 11px/1.2 Jost,sans-serif}
    .v329-summary-progress-track{position:relative;height:12px;border-radius:999px;background:#eadfd7;overflow:visible}
    .v329-summary-progress-track>span{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#ef8f76,#7e9b68);transition:width .2s ease}
    .v329-summary-progress-dot{position:absolute;top:50%;width:22px;height:22px;border:4px solid #fff;border-radius:50%;background:#b59a8c;box-shadow:0 0 0 2px rgba(111,64,50,.12);transform:translate(-50%,-50%)}
    .v329-summary-progress-dot-four{left:50%}
    .v329-summary-progress-dot-eight{left:100%}
    .v329-summary-progress-safe.is-four .v329-summary-progress-dot-four,.v329-summary-progress-safe.is-eight .v329-summary-progress-dot-eight{background:#7e9b68}
    @media(max-width:767px){
      .v329-summary-progress-safe{margin:18px 0 24px;padding:20px 16px 22px}
      .v329-summary-progress-count{font-size:16px}
      .v329-summary-progress-labels b{font-size:12px}
      .v329-summary-progress-labels small{font-size:10px}
    }
  `;
  document.head.appendChild(style);

  const schedule = () => requestAnimationFrame(ensureProgress);
  document.addEventListener("click", schedule, true);
  document.addEventListener("DOMContentLoaded", schedule);
  window.addEventListener("pageshow", schedule);
  setInterval(ensureProgress, 500);
})();
