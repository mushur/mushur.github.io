(() => {
  const SUPPORTED = new Set(["en", "ar"]);

  function readUrlLang() {
    const params = new URLSearchParams(window.location.search);
    const lang = (params.get("lang") || "").toLowerCase();
    return SUPPORTED.has(lang) ? lang : null;
  }

  function getLang() {
    const stored = (localStorage.getItem("lang") || "").toLowerCase();
    return SUPPORTED.has(stored) ? stored : "en";
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll('[data-lang="en"]').forEach(el => {
      el.classList.toggle("hidden", lang !== "en");
    });
    document.querySelectorAll('[data-lang="ar"]').forEach(el => {
      el.classList.toggle("hidden", lang !== "ar");
    });

    const btn = document.querySelector(".lang-toggle");
    if (btn) btn.textContent = lang === "en" ? "AR" : "EN";

    // Keep language when navigating between site pages
    document.querySelectorAll("a[data-hreflang]").forEach(a => {
      const base = a.getAttribute("data-hreflang");
      if (!base) return;
      a.setAttribute("href", `${base}?lang=${lang}`);
    });
  }

  function setLang(lang) {
    localStorage.setItem("lang", lang);
    applyLang(lang);
  }

  window.toggleLang = function () {
    const current = getLang();
    setLang(current === "en" ? "ar" : "en");
  };

  document.addEventListener("DOMContentLoaded", () => {
    const urlLang = readUrlLang();
    if (urlLang) localStorage.setItem("lang", urlLang);
    applyLang(getLang());
  });
})();