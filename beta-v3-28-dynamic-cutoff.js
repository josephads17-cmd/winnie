(() => {
  const CUTOFF_HOUR = 13;
  const PARIS_TIME_ZONE = "Europe/Paris";
  const weekdayNames = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const monthNames = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];

  const parisParts = (date = new Date()) => {
    const parts = new Intl.DateTimeFormat("fr-FR", {
      timeZone: PARIS_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(date);
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return {
      year: Number(values.year),
      month: Number(values.month),
      day: Number(values.day),
      hour: Number(values.hour),
      minute: Number(values.minute),
    };
  };

  const easterSunday = (year) => {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(Date.UTC(year, month - 1, day));
  };

  const dateKey = (date) => [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");

  const addDays = (date, days) => {
    const next = new Date(date.getTime());
    next.setUTCDate(next.getUTCDate() + days);
    return next;
  };

  const frenchHolidays = (year) => {
    const easter = easterSunday(year);
    return new Set([
      `${year}-01-01`,
      dateKey(addDays(easter, 1)),
      `${year}-05-01`,
      `${year}-05-08`,
      dateKey(addDays(easter, 39)),
      dateKey(addDays(easter, 50)),
      `${year}-07-14`,
      `${year}-08-15`,
      `${year}-11-01`,
      `${year}-11-11`,
      `${year}-12-25`,
    ]);
  };

  const isBusinessDay = (date) => {
    const day = date.getUTCDay();
    if (day === 0 || day === 6) return false;
    return !frenchHolidays(date.getUTCFullYear()).has(dateKey(date));
  };

  const nextBusinessDay = (date) => {
    let candidate = addDays(date, 1);
    while (!isBusinessDay(candidate)) candidate = addDays(candidate, 1);
    return candidate;
  };

  const formatShippingDate = (date) =>
    `${weekdayNames[date.getUTCDay()]} ${date.getUTCDate()} ${monthNames[date.getUTCMonth()]}`;

  const messageForNow = () => {
    const now = parisParts();
    const today = new Date(Date.UTC(now.year, now.month - 1, now.day));
    const beforeCutoff = now.hour < CUTOFF_HOUR;

    if (isBusinessDay(today) && beforeCutoff) {
      return {
        label: "Commandez avant 13 h",
        result: "expédition aujourd’hui",
      };
    }

    const shippingDay = isBusinessDay(today) ? nextBusinessDay(today) : (() => {
      let candidate = today;
      while (!isBusinessDay(candidate)) candidate = addDays(candidate, 1);
      return candidate;
    })();

    return {
      label: "Commandez maintenant",
      result: `expédition ${formatShippingDate(shippingDay)}`,
    };
  };

  const updateCutoffs = () => {
    const { label, result } = messageForNow();
    document.querySelectorAll(".v328-cutoff").forEach((cutoff) => {
      cutoff.innerHTML = `<span aria-hidden="true">🕘</span> <strong>${label}</strong> : ${result}`;
      cutoff.setAttribute("title", "Expéditions les jours ouvrés uniquement, hors jours fériés français.");
    });
  };

  updateCutoffs();
  window.addEventListener("pageshow", updateCutoffs);
  window.setInterval(updateCutoffs, 60_000);
})();
