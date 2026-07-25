(() => {
  const countSelected = () => {
    if (typeof st !== "undefined" && Array.isArray(st.p)) {
      return st.p.reduce((sum, item) => sum + Number(item?.q || 0), 0);
    }
    return 0;
  };

  const rabbitName = () => document.getElementById("rabbitName")?.value.trim() || "votre lapin";

  const styleNamePill = () => {
    const pill = document.querySelector(".v328-story-pill");
    if (!pill) return;
    pill.classList.add("v329-story-pill-final");

    const name = pill.querySelector("[data-v328-rabbit-name]");
    if (name) name.textContent = rabbitName();

    const link = pill.querySelector("a");
    if (link) link.classList.add("v329-story-edit-final");
  };

  const buildProgress = () => {
    const count = countSelected();
    const progress = Math.min(100, (count / 8) * 100);
    const wrapper = document.createElement("div");
    wrapper.className = `v329-summary-progress-final${count >= 4 ? " is-four" : ""}${count >= 8 ? " is-eight" : ""}`;
    wrapper.innerHTML = `
      <div class="v329-summary-progress-head">
        <strong>${count} sachet${count > 1 ? "s" : ""} sélectionné${count > 1 ? "s" : ""}</strong>
      </div>
      <div class="v329-summary-progress-labels" aria-hidden="true">
        <span></span>
        <span><b>4 sachets</b><small>Livraison offerte</small></span>
        <span><b>8 sachets</b><small>Livraison offerte + 15 %</small></span>
      </div>
      <div class="v329-summary-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="8" aria-valuenow="${Math.min(8, count)}">
        <span style="width:${progress}%"></span>
        <i class="is-four-dot"></i>
        <i class="is-eight-dot"></i>
      </div>`;
    return wrapper;
  };

  const replaceValidationHeading = () => {
    const summary = document.querySelector(".v326-summary, .v325-composition-summary");
    if (!summary) return;

    const heading = summary.querySelector(".v326-summary-heading");
    if (!heading) return;

    heading.querySelectorAll(".v329-summary-progress-final").forEach((node) => node.remove());
    heading.replaceChildren(buildProgress());
  };

  const apply = () => {
    styleNamePill();
    replaceValidationHeading();
  };

  const css = document.createElement("style");
  css.textContent = `
    .v328-story-pill.v329-story-pill-final{
      display:grid!important;
      grid-template-columns:42px minmax(0,1fr) auto;
      align-items:center!important;
      gap:12px!important;
      width:100%!important;
      padding:12px 14px!important;
      border:1px solid rgba(111,64,50,.14)!important;
      border-radius:22px!important;
      background:linear-gradient(135deg,#fffaf6,#f7e6db)!important;
      box-shadow:0 12px 28px rgba(82,48,35,.08)!important;
      color:#5d382c!important;
    }
    .v328-story-pill.v329-story-pill-final>span:first-child{
      display:grid!important;
      place-items:center!important;
      width:42px!important;
      height:42px!important;
      border-radius:14px!important;
      background:#fff!important;
      box-shadow:0 5px 14px rgba(82,48,35,.08)!important;
      font-size:20px!important;
    }
    .v328-story-pill.v329-story-pill-final>span:nth-child(2){font-size:16px!important;line-height:1.3!important}
    .v328-story-pill .v329-story-edit-final{
      padding:8px 11px!important;
      border-radius:999px!important;
      background:#6f4032!important;
      color:#fff!important;
      text-decoration:none!important;
      font-size:12px!important;
      font-weight:800!important;
      white-space:nowrap!important;
    }
    .v329-summary-progress-final{width:100%;padding:16px 0 10px}
    .v329-summary-progress-head{margin-bottom:14px;color:#432a22}
    .v329-summary-progress-head strong{font-size:16px!important}
    .v329-summary-progress-labels{display:grid;grid-template-columns:1fr 1fr 1fr;align-items:end;margin-bottom:10px;text-align:center;color:#6f4032}
    .v329-summary-progress-labels>span:first-child{visibility:hidden}
    .v329-summary-progress-labels b,.v329-summary-progress-labels small{display:block}
    .v329-summary-progress-labels b{font-size:12px}.v329-summary-progress-labels small{font-size:10px;font-weight:700}
    .v329-summary-progress-track{position:relative;height:11px;border-radius:999px;background:#e8ddd5;overflow:visible}
    .v329-summary-progress-track>span{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#ef8f76,#7d9b68);transition:width .18s ease}
    .v329-summary-progress-track i{position:absolute;top:50%;width:22px;height:22px;border:4px solid #fff;border-radius:50%;background:#cdb9ad;box-shadow:0 0 0 2px rgba(111,64,50,.12);transform:translate(-50%,-50%)}
    .v329-summary-progress-track .is-four-dot{left:50%}.v329-summary-progress-track .is-eight-dot{left:100%}
    .v329-summary-progress-final.is-four .is-four-dot,.v329-summary-progress-final.is-eight .is-eight-dot{background:#7d9b68}
    @media(max-width:767px){
      .v328-story-pill.v329-story-pill-final{grid-template-columns:38px minmax(0,1fr);padding:11px 12px!important}
      .v328-story-pill.v329-story-pill-final>span:first-child{width:38px!important;height:38px!important}
      .v328-story-pill .v329-story-edit-final{grid-column:2;justify-self:start;margin-top:2px;padding:6px 10px!important}
      .v329-summary-progress-labels b{font-size:11px}.v329-summary-progress-labels small{font-size:9px}
    }
  `;
  document.head.appendChild(css);

  const observer = new MutationObserver(() => requestAnimationFrame(apply));
  observer.observe(document.body, { childList: true, subtree: true });
  apply();
  requestAnimationFrame(apply);
  window.addEventListener("pageshow", apply);
})();