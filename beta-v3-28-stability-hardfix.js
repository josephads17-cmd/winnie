(() => {
  if (document.body.classList.contains("v328-hard-stability-ready")) return;
  document.body.classList.add("v328-hard-stability-ready");

  let snapshot = null;
  let token = 0;

  const locateRow = (index) =>
    document.querySelector(`[data-v325-info="${index}"]`)?.closest(".v325-choice-row");

  const restore = (currentToken) => {
    if (!snapshot || currentToken !== token) return;
    const row = locateRow(snapshot.index);
    if (row) {
      const delta = row.getBoundingClientRect().top - snapshot.top;
      if (Math.abs(delta) > 0.5) window.scrollBy(0, delta);
    } else if (Math.abs(window.scrollY - snapshot.scrollY) > 0.5) {
      window.scrollTo(0, snapshot.scrollY);
    }
  };

  const settle = () => {
    const currentToken = ++token;
    document.documentElement.classList.add("v328-hard-stabilizing");

    requestAnimationFrame(() => {
      restore(currentToken);
      requestAnimationFrame(() => {
        restore(currentToken);
        requestAnimationFrame(() => {
          restore(currentToken);
          snapshot = null;
          document.documentElement.classList.remove("v328-hard-stabilizing");
        });
      });
    });
  };

  document.addEventListener(
    "pointerdown",
    (event) => {
      const control = event.target.closest("[data-v325-adjust]");
      if (!control) return;
      const row = control.closest(".v325-choice-row");
      const index = Number(row?.querySelector("[data-v325-info]")?.dataset.v325Info);
      if (!row || !Number.isInteger(index)) return;

      snapshot = {
        index,
        top: row.getBoundingClientRect().top,
        scrollY: window.scrollY,
      };
      document.documentElement.classList.add("v328-hard-stabilizing");
    },
    true,
  );

  document.addEventListener(
    "click",
    (event) => {
      if (!event.target.closest("[data-v325-adjust]")) return;
      settle();
    },
    true,
  );
})();