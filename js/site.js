/* ============================================================
   Bello's Bakery — shared site chrome (runs on every page)
   Injects the nav + footer so they stay identical everywhere,
   handles the mobile menu, sticky nav, and scroll animations.
   ------------------------------------------------------------
   To add/rename a page link, edit NAV_LINKS below — it updates
   the menu on every page at once.
   ============================================================ */

/* ---------- One-time pink intro splash ----------
   First page-load of a browser session only: a soft-pink screen
   with the Bello's cat popping in, then it lifts to reveal the site.
   Skippable with a click; disabled for reduced-motion users.        */
(function introSplash() {
  try {
    if (sessionStorage.getItem("bb_introSeen")) return;   // already shown this session
    sessionStorage.setItem("bb_introSeen", "1");
  } catch (e) { /* storage blocked — just show it once */ }

  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const overlay = document.createElement("div");
  overlay.className = "intro";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML =
    '<img class="intro__cat" src="images/bello.png" alt="" />';
  document.body.appendChild(overlay);
  document.documentElement.classList.add("intro-lock");

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    overlay.classList.add("intro--out");
    document.documentElement.classList.remove("intro-lock");
    setTimeout(() => overlay.remove(), 1600);
  };
  const hold = setTimeout(finish, 2400);
  overlay.addEventListener("click", () => { clearTimeout(hold); finish(); });
})();

const NAV_LINKS = [
  { href: "index.html",     label: "Home",      page: "home" },
  { href: "about.html",     label: "About",     page: "about" },
  { href: "portfolio.html", label: "Portfolio", page: "portfolio" },
  { href: "menu.html",      label: "Shop",      page: "menu" },
  { href: "instagram.html", label: "Instagram", page: "instagram" },
  { href: "contact.html",   label: "Contact",   page: "contact" },
];

const PAGE = document.body.dataset.page || "home";

/* ---------- Inject nav ---------- */
const navEl = document.getElementById("nav");
if (navEl) {
  navEl.innerHTML = `
    <div class="nav__inner">
      <a href="index.html" class="nav__logo">
        <img src="images/bellosbakerylogo.png" alt="Bello's Bakery" class="nav__logo-img" />
        <span class="nav__logo-text">Bello's<span>Bakery</span></span>
      </a>
      <nav class="nav__links" id="navLinks">
        ${NAV_LINKS.map((l) =>
          `<a href="${l.href}"${l.page === PAGE ? ' class="is-active"' : ""}>${l.label}</a>`
        ).join("")}
        <a href="contact.html" class="nav__cta">Order Now</a>
      </nav>
      <button class="nav__toggle" id="navToggle" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>`;
}

/* ---------- Inject footer ---------- */
const footerEl = document.getElementById("siteFooter");
if (footerEl) {
  footerEl.innerHTML = `
    <div class="footer__inner">
      <a href="index.html" class="nav__logo">
        <img src="images/bellosbakerylogo.png" alt="Bello's Bakery" class="nav__logo-img" />
        <span class="nav__logo-text">Bello's<span>Bakery</span></span>
      </a>
      <div class="footer__links">
        ${NAV_LINKS.filter((l) => l.page !== "home")
          .map((l) => `<a href="${l.href}">${l.label}</a>`).join("")}
      </div>
      <div class="footer__social">
        <a href="https://www.instagram.com/_bellosbakery/" target="_blank" rel="noopener" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="mailto:Bellosbakery04@gmail.com" aria-label="Email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/judith-pacurucu-4553b5252/" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM0 8h5v16H0V8Zm7.5 0h4.8v2.2h.07c.67-1.2 2.3-2.5 4.73-2.5 5.06 0 6 3.3 6 7.6V24h-5v-7.1c0-1.7 0-3.9-2.4-3.9s-2.7 1.9-2.7 3.8V24h-5V8Z"/></svg>
        </a>
      </div>
      <p class="footer__copy">© <span id="year"></span> Bello's Bakery · Judith Pacurucu · Bello Approved, For Every Occasion</p>
    </div>`;
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

/* ---------- Mobile menu toggle ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
    })
  );
}

/* ---------- Sticky nav background on scroll ---------- */
if (navEl) {
  const onScroll = () => navEl.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- Reveal-on-scroll (with optional stagger) ----------
   Any element with class "reveal" fades/slides in when scrolled into
   view. Shared so other scripts can re-scan after injecting content. */
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); revealObserver.unobserve(en.target); }
  }),
  { threshold: 0.12 }
);
window.observeReveals = function (root = document) {
  root.querySelectorAll(".reveal:not(.observed)").forEach((el, i) => {
    el.classList.add("observed");
    // gentle stagger for groups
    if (!el.style.transitionDelay) el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
    revealObserver.observe(el);
  });
};
window.observeReveals();

/* ---------- Mark page as loaded (fade-in) ---------- */
requestAnimationFrame(() => document.body.classList.add("loaded"));
