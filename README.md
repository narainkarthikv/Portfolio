[![SVG Banners](https://svg-banners.vercel.app/api?type=luminance&text1=Wisdom%20Fox&width=1000&height=200)](https://github.com/narainkarthikv/svg-banners)
[![Deploy static content to Pages](https://github.com/narainkarthikv/Portfolio/actions/workflows/static.yml/badge.svg)](https://github.com/narainkarthikv/Portfolio/actions/workflows/static.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

# Personal Portfolio — Quick, Interactive Guide

Welcome! This repo is a modern, static portfolio built with Astro and optimized for fast, accessible delivery. The sections below make it easy to get the code running locally, build for production, and contribute.

---

## 🚀 Quick Links
- Live site: https://narainkarthikv.com
- Portfolio preview (Pages): https://narainkarthikv.github.io/Portfolio
- CI: .github/workflows/static.yml

---

## 🧰 Prerequisites
- Node.js >= 18.x
- npm >= 9.x (or yarn / pnpm)
- (Optional) Git for cloning

Check Node: `node -v`  •  Check npm: `npm -v`

---

## 🛠️ Interactive Setup (copy-paste)
1) Clone and install dependencies:

```bash
git clone https://github.com/narainkarthikv/Portfolio.git
cd Portfolio
npm install
```

2) Start the dev server (hot reload):

```bash
npm run dev
# opens at http://localhost:4321
```

3) Build for production:

```bash
npm run build
```

4) Preview the production build locally:

```bash
npm run preview
# serves the built site (default port printed by the command)
```

5) Run the type/astro check (optional but recommended):

```bash
npx astro check
```

Notes:
- If the site is served from the legacy folder for GitHub Pages, you can preview that output with `npx serve legacy` or `python -m http.server` as a fallback.

---

## 🔎 Project Structure (at-a-glance)

- src/ — components, layouts, pages
  - components/sections — page sections (Hero, About, Projects, etc.)
  - layouts/ — global layout wrappers
  - lib/ — small utilities (e.g., contextCursor)
- public/ — static assets (images, icons)
- cv.json — primary content used by the site
- legacy/ — static export used for GitHub Pages (if present)
- package.json — scripts & dependencies
- astro.config.mjs — Astro configuration

---

## 🧪 Useful npm Scripts
- `npm run dev` — local dev server (Astro)
- `npm run build` — build static output
- `npm run preview` — preview built output
- `npm run format` — (if configured) format code
- `npx astro check` — type and config checks

---

## ✅ Deploying
This repo uses GitHub Actions to build and deploy static content. The workflow `.github/workflows/static.yml` builds the site and pushes the output to the configured Pages branch or directory.

If using a different host (Vercel, Netlify, Cloudflare Pages) deploy the `dist/` output or connect the repository directly to the platform.

---

## 🛠 Troubleshooting — Quick tips
- Dev server not starting: confirm Node and npm versions and re-run `npm install`.
- Broken styles: run a fresh build `npm run build` and `npm run preview` to inspect compiled output.
- Missing images/assets: ensure files exist in `public/` and paths used in components are correct.

---

## 🤝 Contributing
Contributions are welcome. Please check [CONTRIBUTING.md](CONTRIBUTING.md) and open an issue or PR. Remember to run `npm run build` before submitting changes that affect the UI.

---

## 📜 License
MIT — see [LICENSE](LICENSE)

---

Happy hacking — explore the src/ components for small, focused sections and follow the interactive steps above to run and test locally.

