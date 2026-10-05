(function () {
  var root = document.documentElement;

  // ---- Theme toggle ----
  var toggle = document.querySelector(".theme-toggle");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return prefersDark.matches ? "dark" : "light";
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // ---- Header border on scroll ----
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Active nav link ----
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  if ("IntersectionObserver" in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("active"); });
        var link = byId[entry.target.id];
        if (link) link.classList.add("active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // ---- BibTeX toggle ----
  document.querySelectorAll("[data-bibtex]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var box = document.getElementById(btn.getAttribute("data-bibtex"));
      if (!box) return;
      var open = box.hasAttribute("hidden");
      if (open) box.removeAttribute("hidden"); else box.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  // ---- Copy BibTeX ----
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var code = btn.parentElement.querySelector("code");
      if (!code) return;
      var label = btn.innerHTML;
      function done(ok) {
        btn.innerHTML = ok
          ? '<i class="fa-solid fa-check" aria-hidden="true"></i>Copied'
          : '<i class="fa-solid fa-xmark" aria-hidden="true"></i>Select &amp; copy';
        setTimeout(function () { btn.innerHTML = label; }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code.textContent).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  });

  // ---- Footer year ----
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
