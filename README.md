# Tomi Abe Art

A digital art portfolio for [Tomi Abe Art](https://tomiabe.github.io/tomiabeart/) — a practice exploring systems, stories, and signals through generative and computational media.

**Live site → [tomiabe.github.io/tomiabeart](https://tomiabe.github.io/tomiabeart/)**

---

## Overview

Single-page portfolio built with React + Vite. Every section of the site — from the hero slideshow speed to the bio paragraphs — is editable through Pages CMS without touching code.

**Sections**
- **Hero** — full-screen image slideshow with configurable autoplay speed and transition duration
- **Projects** — responsive grid of selected works with lightbox detail view; grid columns and initial load count are configurable
- **Lab** — scrolling marquee of experimental pieces; marquee speed is configurable per column
- **Info** — artist bio, focus areas, exhibitions
- **Connect** — email and social links

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| CMS | [Pages CMS](https://pagescms.org) |
| Hosting | GitHub Pages (via GitHub Actions) |

---

## Content Management

All content lives in `src/content/` as JSON files and is fully editable via [Pages CMS](https://pagescms.org):

| File | Editable Fields |
|---|---|
| `settings.json` | Site title, nav links, logo text, footer |
| `hero.json` | Tagline, slideshow images, autoplay speed, transition duration |
| `projects.json` | Projects (title, description, images, year, category), grid defaults, initial count |
| `lab.json` | Lab items, tools tags, marquee speed |
| `info.json` | Bio, profile photo, focus areas, exhibitions |
| `connect.json` | Email, heading, description, social links |

Every CMS edit commits directly to this repo, triggering an automatic rebuild and redeploy.

---

## Local Development

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

---

## Deployment

Deployments are fully automated via GitHub Actions (`.github/workflows/deploy.yml`). Every push to `main` triggers a build and deploy to GitHub Pages.

To trigger a manual deploy, go to **Actions → Deploy to GitHub Pages → Run workflow**.
