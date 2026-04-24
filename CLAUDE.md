# Roofs-N-More Website

Static HTML marketing site for **roofsnmore.com** — a swap-in replacement currently staged on Vercel.

## Stack
- Pure static HTML/CSS — no build step, no Node dependencies
- Vercel serves files from repo root (`cleanUrls: true`, `trailingSlash: false`)
- Home page (`index.html`) uses React 18 + Babel loaded from CDN for JSX components
- All other pages are plain HTML using shared CSS

## Key files
| File | Purpose |
|---|---|
| `colors_and_type.css` | All brand design tokens — import first on every page |
| `site.css` | Shared header, footer, nav, buttons, section chrome |
| `service-page.css` | Service page layout |
| `article.css` | Blog article layout |
| `Header.jsx` / `Hero.jsx` / `Primitives.jsx` / `Sections.jsx` | React components for home page only |
| `assets/logo-mascot.png` | Brand mascot — used in every header and footer |
| `estimate-flow/index.html` | Branded wrapper page for the AI estimate iframe |

## Brand rules (always follow)
- Colors: blue `#2BA6E0`, orange `#F7931E`, ink `#0F1A24`, cream `#FFF8EE`
- Fonts: Fredoka (display), Nunito 600 (body), Caveat (handwritten accents) — all Google Fonts
- Every card/button: 2.5–3.5px ink border + `4px 5px 0 var(--rnm-ink)` sticker shadow
- Voice: neighborly, plain-spoken, sentence case, contractions welcome, no corporate jargon
- Name is always **Roofs-N-More** (hyphenated, capital R/N/M)

## Business info
- Phone: 832-991-0928
- Address: 437 Holly Branch Lane, Kemah, TX 77565
- Owner: Phil Benham
- Estimate tool: https://quote.roofsnmore.com/s/59b06a
- Service areas: Houston, League City, Friendswood, Pearland, Kemah, Webster, Clear Lake, Seabrook, La Marque, Galveston, Pasadena, Alvin, Deer Park

## Deployment
- **Repo:** git@github.com:philbenham/roofsnmore-website.git
- **Vercel:** auto-deploys on push to `main` (project: roofsnmore-website, team: roofs-nm-ore)
- **Custom domain:** roofsnmore.com — not yet wired (deferred)
- Push to `main` → Vercel deploys automatically, no build command

## Nav pattern
All pages share the same header with a JS-powered Services dropdown. When editing any page header, use the Python replacement script pattern from the session rather than editing files one by one.
