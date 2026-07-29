(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var header = document.querySelector(".site-header");
  var year = document.getElementById("year");

  function updateThemeLabel() {
    if (!toggle) return;
    var isDark = root.dataset.theme === "dark";
    toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  }

  if (toggle) {
    updateThemeLabel();
    toggle.addEventListener("click", function () {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", root.dataset.theme);
      updateThemeLabel();
    });
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  function updateHeader() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 12);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  var revealItems = document.querySelectorAll(".section-grid, .closing, .archive-page-header, .archive-list");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealItems.forEach(function (item) {
    item.classList.add("reveal");
    observer.observe(item);
  });
})();
