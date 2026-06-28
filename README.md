# Bello's Bakery 🩷🖤

The website for **Bello's Bakery** by Judith Pacurucu — a black & pink portfolio
and shop. Plain HTML/CSS/JS, built to be hosted **free** on GitHub Pages.

```
bellos bakery/
├── index.html          ← Home (hero + 3 buttons + previews)
├── about.html          ← About / Meet the Baker
├── portfolio.html      ← Portfolio gallery (click photos → fullscreen)
├── menu.html           ← Shop / menu
├── instagram.html      ← Instagram feed
├── contact.html        ← Place an order (form + buttons)
├── css/styles.css      ← the black & pink styling + animations
├── js/
│   ├── site.js         ← shared nav + footer (edit the menu once, here)
│   └── main.js         ← gallery, menu, instagram, form  ← edit products/photos here
├── images/             ← all photos (see images/README.md)
└── README.md           ← you are here
```

**Multi-page note:** the nav bar and footer are written **once** in `js/site.js`
and appear on every page automatically — so to add or rename a menu link you only
edit `NAV_LINKS` at the top of that one file.

---

## 1) Add the photos
Open `images/README.md` and drop in Judith's photos using the listed file names.
Everything still works before then — missing photos just show a placeholder.

---

## 2) Put it online with GitHub Pages (free)

**A. Create the repo**
1. Make a free account at <https://github.com> (use Judith's email or yours).
2. Click **New repository**. Name it `bellos-bakery`. Set it to **Public**. Create it.

**B. Upload the files**
- Easiest way: on the new repo page click **uploading an existing file**, then drag
  *everything inside this `bellos bakery` folder* (the `index.html`, `css`, `js`,
  `images` folder, `.nojekyll`) into the browser and **Commit changes**.
- *(Or, if you use Git: `git init`, `git add .`, `git commit -m "site"`, then push.)*

**C. Turn on Pages**
1. In the repo go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)**. Click **Save**.
4. Wait ~1 minute. Your site appears at:

   ```
   https://<your-username>.github.io/bellos-bakery/
   ```

Done — that's the free address. (A custom domain like `bellosbakery.com` can be
added later in this same Pages settings screen.)

---

## 3) Turn on the order form (2 minutes, free)
The contact form already works without setup — if left as-is, clicking **Send**
opens the visitor's email app addressed to Judith. To receive submissions as nice
emails instead:

1. Go to <https://formspree.io> → sign up free → **+ New form**.
2. Set the form's email to **Bellosbakery04@gmail.com**.
3. Copy the form's endpoint — it looks like `https://formspree.io/f/abcdwxyz`.
4. Open `index.html`, find this line:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   and replace `YOUR_FORM_ID` with your real id (e.g. `abcdwxyz`).
5. Save & re-upload `index.html`. Submissions now arrive in the inbox. ✅

---

## 4) Turn on the live Instagram feed (free, ~3 min)
The "Fresh from the Kitchen" section shows a **preview grid** of recent work that
links to Instagram. To turn it into a **live feed that auto-updates** with the
newest posts:

1. Go to <https://lightwidget.com> and click **Sign in with Instagram** (free).
2. Choose @_bellosbakery, pick a grid layout, and click **Get the code**.
3. In the code you get, find the iframe URL — e.g.
   `//lightwidget.com/widgets/`**`abc123def456`**`.html`. The bold part is your **ID**.
4. Open `js/main.js`, find:
   ```js
   lightwidgetId: "",
   ```
   and put your ID in the quotes: `lightwidgetId: "abc123def456",`
5. Save & re-upload `js/main.js`. The section now shows live posts. ✅

*(Why a widget? Instagram doesn't allow a plain website to read a feed directly —
a free connector like LightWidget is the standard, safe way to do it.)*

## 5) Everyday edits
| I want to…                        | Edit this                                   |
|-----------------------------------|---------------------------------------------|
| Change products, prices, options  | `MENU` list at the top of `js/main.js`      |
| Change portfolio photos/captions  | `GALLERY` list at the top of `js/main.js`   |
| Connect the live Instagram feed   | `INSTAGRAM.lightwidgetId` in `js/main.js` (see step 4) |
| Change the About text             | the `#about` section in `index.html`        |
| Change email / Instagram links    | search `Bellosbakery04` / `_bellosbakery` in `index.html` |
| Swap a photo                      | replace the file in `images/` (same name)   |

## Preview locally
Just double-click `index.html` to open it in a browser. (The form's email
fallback works; the Formspree send only works once it's online.)
