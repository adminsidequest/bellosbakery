/* ============================================================
   Bello's Bakery — page features
   Each block only runs on the page that contains its section,
   so this one file is safe to load everywhere.
   ------------------------------------------------------------
   EASY EDITS:
   - Portfolio photos/captions ......... GALLERY  (below)
   - Products / prices / options ....... MENU     (below)
   - Instagram live feed ............... INSTAGRAM (below)
   ============================================================ */

/* ---------- 1. Portfolio gallery items ----------
   category: "plated" | "chocolate" | "custom" | "bread"
   img:      filename inside the images/ folder            */
const GALLERY = [
  { img: "custom-1.jpg",    title: "Rosette Cake",             category: "custom",    tag: "Custom & Pastry Art" },
  { img: "plated-1.jpg",    title: "Citrus Entremet",          category: "plated",    tag: "Plated Desserts" },
  { img: "chocolate-1.jpg", title: "Painted Bonbons",          category: "chocolate", tag: "Chocolate & Petit Fours" },
  { img: "custom-2.jpg",    title: "Floral Cupcakes",          category: "custom",    tag: "Custom & Pastry Art" },
  { img: "conchas-1.png",   title: "Pink & Chocolate Conchas", category: "bread",     tag: "Conchas & Pan Dulce" },
  { img: "chocolate-5.png", title: "Sunflower Macarons",       category: "chocolate", tag: "Chocolate & Petit Fours" },
  { img: "plated-4.jpg",    title: "Blackberry & Cream",       category: "plated",    tag: "Plated Desserts" },
  { img: "custom-4.webp",   title: "Bow Cupcakes",             category: "custom",    tag: "Custom & Pastry Art" },
  { img: "chocolate-2.jpg", title: "Chocolate Batons",         category: "chocolate", tag: "Chocolate & Petit Fours" },
  { img: "conchas-3.jpg",   title: "Rainbow Conchas & Donuts", category: "bread",     tag: "Conchas & Pan Dulce" },
  { img: "custom-7.png",    title: "Sunflower Cupcake",        category: "custom",    tag: "Custom & Pastry Art" },
  { img: "plated-2.jpg",    title: "Citrus Financier",         category: "plated",    tag: "Plated Desserts" },
  { img: "chocolate-3.jpg", title: "Petit Fours",              category: "chocolate", tag: "Chocolate & Petit Fours" },
  { img: "custom-5.webp",   title: "Black Bow Cupcakes",       category: "custom",    tag: "Custom & Pastry Art" },
  { img: "plated-3.jpg",    title: "Caramel Apple Tart",       category: "plated",    tag: "Plated Desserts" },
  { img: "custom-3.jpg",    title: "Hand-Painted Cookie",      category: "custom",    tag: "Custom & Pastry Art" },
  { img: "chocolate-4.jpg", title: "Gold-Leaf Choux",          category: "chocolate", tag: "Chocolate & Petit Fours" },
  { img: "conchas-2.png",   title: "Fresh-Baked Conchas",      category: "bread",     tag: "Conchas & Pan Dulce" },
  { img: "custom-8.png",    title: "Sunflower Cupcakes",       category: "custom",    tag: "Custom & Pastry Art" },
  { img: "plated-5.jpg",    title: "Saffron Sponge",           category: "plated",    tag: "Plated Desserts" },
  { img: "custom-6.webp",   title: "Powerpuff Cookies",        category: "custom",    tag: "Custom & Pastry Art" },
  { img: "chocolate-6.png", title: "Macaron Table",            category: "chocolate", tag: "Chocolate & Petit Fours" },
  { img: "custom-9.png",    title: "Sunflower Dozen",          category: "custom",    tag: "Custom & Pastry Art" },
];

/* ---------- 2. Shop / menu products ---------- */
const MENU = [
  {
    name: "Signature Macarons",
    price: "$25",
    img: "bellosmacaroons.webp",
    desc: "Assorted box of 6 — our signature flavors, delicate and made fresh.",
    opts: ["Nutella", "Tiramisu", "Passion Fruit", "Box of 6 or 12"],
  },
  {
    name: "Cookies",
    price: "$5",
    img: "belloscookies.webp",
    desc: "Dark chocolate chip with a gooey Nutella & homemade marshmallow center, finished with a marshmallow drizzle.",
    opts: ["Marshmallow", "Nutella", "Dark Chocolate Chip", "Seasonal Shortbread"],
  },
  {
    name: "Croissants",
    price: "$5",
    img: "croissants.webp",
    desc: "Buttery, laminated croissants baked to a golden, flaky finish — sweet or savory.",
    opts: ["Plain", "Everything Seasoned", "Pepperoni Cheese", "Jalapeño Cheddar"],
  },
  {
    name: "Conchas",
    price: "$4",
    img: "conchas-1.png",
    desc: "Soft, fluffy Mexican sweet bread (pan dulce) under a crackly sugar shell — baked fresh in signature pink and chocolate.",
    opts: ["Pink (Vanilla)", "Chocolate", "Marble", "Box of 4 or 6"],
  },
  {
    name: "Custom Desserts",
    price: "Inquire",
    img: "custom-1.jpg",
    desc: "Cakes, plated desserts, and pastry art for celebrations and events — designed around your occasion.",
    opts: ["Cakes", "Cupcakes", "Breads", "Event Orders"],
  },
];

/* ---------- 3. Instagram feed ----------
   For a LIVE auto-updating feed, paste your free LightWidget ID below.
   (See README step 4 — takes ~3 minutes.) Until then a preview grid
   that links to the profile is shown.                                */
const INSTAGRAM = {
  handle: "_bellosbakery",
  lightwidgetId: "",   // <-- paste your LightWidget ID here
  preview: ["custom-1.jpg", "chocolate-1.jpg", "plated-1.jpg", "custom-2.jpg",
            "plated-4.jpg", "chocolate-4.jpg", "plated-2.jpg", "custom-3.jpg"],
};

/* ============================================================
   Portfolio gallery + filtering  (portfolio page)
   ============================================================ */
const gallery = document.getElementById("gallery");
if (gallery) {
  gallery.innerHTML = GALLERY.map((item, i) => `
    <figure class="card" data-category="${item.category}" style="animation-delay:${Math.min(i * 60, 500)}ms">
      <img src="images/${item.img}" alt="${item.title}" loading="lazy"
           onerror="this.classList.add('img--fallback'); this.alt='Add images/${item.img}';" />
      <figcaption class="card__overlay">
        <span>${item.tag}</span>
        <h3>${item.title}</h3>
      </figcaption>
    </figure>`).join("");

  const filters = document.getElementById("filters");
  if (filters) {
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      filters.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      gallery.querySelectorAll(".card").forEach((card) => {
        card.classList.toggle("is-hidden", !(f === "all" || card.dataset.category === f));
      });
    });
  }

  setupLightbox(gallery);
}

/* ============================================================
   Lightbox — click a photo, scroll through fullscreen
   ============================================================ */
function setupLightbox(scope) {
  // Build the overlay once
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("aria-hidden", "true");
  lb.innerHTML = `
    <button class="lightbox__close" aria-label="Close gallery">&times;</button>
    <button class="lightbox__nav lightbox__prev" aria-label="Previous image">&#8249;</button>
    <figure class="lightbox__stage">
      <img src="" alt="" />
      <figcaption></figcaption>
    </figure>
    <button class="lightbox__nav lightbox__next" aria-label="Next image">&#8250;</button>
    <div class="lightbox__count"></div>`;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector("img");
  const lbCap = lb.querySelector("figcaption");
  const lbCount = lb.querySelector(".lightbox__count");
  let list = [], index = 0;

  const build = () => {
    list = [...scope.querySelectorAll(".card:not(.is-hidden)")].map((card) => ({
      src: card.querySelector("img").getAttribute("src"),
      caption: (card.querySelector("h3") || {}).textContent || "",
    }));
  };
  const show = (i) => {
    if (!list.length) return;
    index = (i + list.length) % list.length;
    lbImg.src = list[index].src;
    lbImg.alt = list[index].caption;
    lbCap.textContent = list[index].caption;
    lbCount.textContent = `${index + 1} / ${list.length}`;
  };
  const open = (src) => {
    build();
    show(Math.max(0, list.findIndex((x) => x.src === src)));
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  scope.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) open(card.querySelector("img").getAttribute("src"));
  });
  lb.querySelector(".lightbox__close").addEventListener("click", close);
  lb.querySelector(".lightbox__next").addEventListener("click", () => show(index + 1));
  lb.querySelector(".lightbox__prev").addEventListener("click", () => show(index - 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(index + 1);
    if (e.key === "ArrowLeft") show(index - 1);
  });
  let tx = null;
  lb.addEventListener("touchstart", (e) => { tx = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    tx = null;
  }, { passive: true });
}

/* ============================================================
   Shop / menu  (menu page)
   ============================================================ */
const menuGrid = document.getElementById("menuGrid");
if (menuGrid) {
  menuGrid.innerHTML = MENU.map((p, i) => `
    <article class="menu__card" style="animation-delay:${Math.min(i * 80, 500)}ms">
      <div class="menu__card__img">
        <img src="images/${p.img}" alt="${p.name}" loading="lazy"
             onerror="this.classList.add('img--fallback'); this.alt='Add images/${p.img}';" />
      </div>
      <div class="menu__card__body">
        <div class="menu__card__top">
          <h3>${p.name}</h3>
          <span class="menu__price">${p.price}</span>
        </div>
        <p class="menu__desc">${p.desc}</p>
        <div class="menu__opts">${p.opts.map((o) => `<span>${o}</span>`).join("")}</div>
        <a class="btn btn--ghost" href="contact.html?item=${encodeURIComponent(p.name)}">Order ${p.name}</a>
      </div>
    </article>`).join("");
}

/* ============================================================
   Instagram  (instagram page)
   ============================================================ */
const igFeed = document.getElementById("igFeed");
if (igFeed) {
  if (INSTAGRAM.lightwidgetId) {
    const iframe = document.createElement("iframe");
    iframe.src = `//lightwidget.com/widgets/${INSTAGRAM.lightwidgetId}.html`;
    iframe.className = "lightwidget-widget";
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("allowtransparency", "true");
    igFeed.appendChild(iframe);
    const s = document.createElement("script");
    s.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    document.body.appendChild(s);
  } else {
    const url = `https://www.instagram.com/${INSTAGRAM.handle}/`;
    igFeed.innerHTML = `
      <p class="insta__note">Preview of recent work — tap any photo to open the full feed on Instagram.</p>
      <div class="insta__grid">
        ${INSTAGRAM.preview.map((img) => `
          <a class="insta__tile" href="${url}" target="_blank" rel="noopener" aria-label="View on Instagram">
            <img src="images/${img}" alt="Instagram post" loading="lazy"
                 onerror="this.classList.add('img--fallback');" />
          </a>`).join("")}
      </div>`;
  }
}

/* ============================================================
   Contact / order form  (contact page)
   ============================================================ */
const form = document.getElementById("orderForm");
if (form) {
  const status = document.getElementById("formStatus");
  const orderField = document.getElementById("order");

  // Pre-fill when arriving from a "Order X" button (contact.html?item=...)
  const item = new URLSearchParams(location.search).get("item");
  if (item && orderField) {
    orderField.value = `I'd like to order: ${item} — `;
    setTimeout(() => orderField.focus(), 400);
  }

  form.addEventListener("submit", async (e) => {
    // Fallback to email if the Formspree ID isn't set yet
    if (form.action.includes("YOUR_FORM_ID")) {
      e.preventDefault();
      status.textContent = "Opening your email app…";
      status.className = "form__status";
      const d = new FormData(form);
      const body = `Name: ${d.get("name")}%0AEmail: ${d.get("email")}%0A%0A${encodeURIComponent(d.get("order"))}`;
      window.location.href = `mailto:Bellosbakery04@gmail.com?subject=Bakery%20Order%20Inquiry&body=${body}`;
      return;
    }
    e.preventDefault();
    status.textContent = "Sending…";
    status.className = "form__status";
    try {
      const res = await fetch(form.action, {
        method: "POST", body: new FormData(form), headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      form.reset();
      status.textContent = "Thank you! Your order request was sent — we'll be in touch soon.";
      status.className = "form__status ok";
    } catch {
      status.textContent = "Something went wrong. Please email us at Bellosbakery04@gmail.com.";
      status.className = "form__status err";
    }
  });
}

/* Re-scan for any reveal elements added above */
if (window.observeReveals) window.observeReveals();
