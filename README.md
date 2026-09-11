# Adhavan Coach — Website

Ambulance fabrication, Chennai. React + Vite + Tailwind v4. Six pages, no backend.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

---

## Where things live

| What | Where |
|---|---|
| **All website copy** (address, phone, packages, FAQs, gallery captions) | `src/data/site.js` |
| Colours, type, animation primitives | `src/styles.css` |
| Pages | `src/pages/` |
| Reusable pieces (nav, footer, cursor, lightbox…) | `src/components/` |
| Photos | `public/img/` (full size) and `public/img/sm/` (grid thumbnails) |
| Photos pulled from the site — see note below | `_review-images/` |

**To change any text on the site, edit `src/data/site.js`.** Nothing else needs touching.

---

## The typeface

The site asks for **Helvetica World** first and falls back gracefully:

```
"Helvetica World" → "Helvetica Neue" → Helvetica → Inter → Arial
```

Helvetica World is a licensed Linotype font and can't be loaded from a CDN. Right now
visitors see Helvetica Neue (Mac/iOS) or Inter (Windows/Android) — both very close.

**To use the real thing:** buy a webfont licence, drop
`HelveticaWorld-Regular.woff2` and `HelveticaWorld-Bold.woff2` into `public/fonts/`,
then uncomment the `@font-face` block at the top of `src/styles.css`. Done — every
element already points at that family first.

---

## Colours

Light theme, defined once in `src/styles.css` under `@theme`. The hues come from the
Lovable reference build with the lightness inverted; the red is a touch darker than the
original so it still clears AA contrast on white.

| Token | Value | Used for |
|---|---|---|
| `--color-bg` | `oklch(99.2% .001 260)` | page background (white) |
| `--color-ink` | `oklch(96.4% .003 260)` | tinted section bands |
| `--color-surface` | `oklch(97.6% .003 260)` | cards, hover fills |
| `--color-steel` | `oklch(82% .006 260)` | inactive markers |
| `--color-fg` | `oklch(19% .006 260)` | body text |
| `--color-muted` | `oklch(46% .009 260)` | secondary text |
| `--color-primary` | `oklch(53% .215 26)` | the red |
| `--color-onmedia` | `oklch(99% 0 0)` | text sitting on photographs |

Corners are square everywhere (`--radius: 0`), matching the reference.

Anything drawn over a photo (captions, stage chips) uses `--color-onmedia` and stays
light regardless of the page background — don't swap those for `text-fg`.

## Contact routing

There's no form and no server. Every call-to-action goes straight to:

- **WhatsApp** — `wa.me/918838744495`, with a pre-filled message that changes per page
  (the Classic 1 button pre-fills "I'm interested in the Classic 1 build", and so on)
- **Phone** — `tel:` links on both numbers
- **Email** — `mailto:` with a subject line
- **Directions** — Google Maps

All of it is driven by `contact` and `waLink()` in `src/data/site.js`.
Change the number in one place and it updates everywhere.

---

## Deploying

`npm run build`, then upload `dist/`. Config for every common host is already included:

- **Netlify / Cloudflare Pages** — `public/_redirects`
- **Vercel** — `vercel.json`
- **cPanel / Hostinger / any Apache host** — `public/.htaccess`

These matter: without them `/about` returns a 404 on a hard refresh, because the site
is a single-page app that handles its own routing.

After pointing a domain at it, update the URLs in `public/sitemap.xml` and
`public/robots.txt` (both currently assume `adhavancoach.com`).

---

## Two things that need your input

1. **Business hours** are a placeholder — `Mon–Sat 9:00 AM – 7:00 PM, Sunday closed`.
   The source PDF's hours didn't survive text extraction. Correct them in
   `src/data/site.js` → `contact.hours`.

2. **`_review-images/`** holds four photos moved out of the site: three exteriors and one
   interior of a vehicle lettered **"ROYAL SEND OFF"**, which is a funeral coach rather
   than an ambulance. One of them was the original hero. If you do build these and want
   them shown, they need their own section and their own wording — presenting them as
   ambulances would misdescribe the vehicle. Move them back into `public/img/` and add
   them to `gallery` in `src/data/site.js` when you've decided.

---

## Accessibility & performance notes

- Every animation is disabled under `prefers-reduced-motion`.
- The custom cursor and magnetic buttons switch off on touch devices.
- Images below the fold are lazy-loaded; grids use the smaller `sm/` copies.
- Focus rings are visible on keyboard navigation throughout.
- The lightbox traps scroll and supports Escape / ← / →.
