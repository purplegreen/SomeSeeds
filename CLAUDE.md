# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SomeSeeds v2.0 — a headless CMS + Astro frontend for an interdisciplinary research initiative. Migrated from Webflow to a custom stack.

## Commands

**Frontend** (the actual app lives in `frontend/my-dashboard/`):
```bash
cd frontend/my-dashboard
npm install
npm run dev      # Astro dev server
npm run build    # Static build
npm run preview  # Preview production build
```

**CMS** (Sanity Studio):
```bash
cd cms
npm install
npm run dev      # Sanity Studio dev server
npm run build    # Build Studio
npm run deploy   # Deploy Studio to Sanity hosting
```

## Environment Variables

`frontend/my-dashboard/.env`:
```
PUBLIC_SANITY_PROJECT_ID=
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_TOKEN=
```

`cms/.env`:
```
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
```

## Architecture

### Frontend (`frontend/my-dashboard/`)

Astro 6 + Vue 3 hybrid:
- `.astro` components handle data fetching and static rendering
- `.vue` components handle client-side interactivity (`client:load` directive)
- GSAP + ScrollTrigger for scroll-driven animations (imported inline via `<script>` blocks in `.astro` pages)

**Data flow:** All Sanity GROQ queries are centralised in `src/lib/sanity.ts`. Pages import query functions from there — no ad-hoc `sanityClient.fetch()` calls in page files.

**Layout:** `src/layouts/Layout.astro` is the shell — fetches nav and explorations on every page, passes them to `<Navbar>` and `<Footer>`.

**Routing:** Astro file-based. Dynamic routes use `getStaticPaths()` to pre-render at build time:
- `/explorations/[slug].astro` — fetches exploration + its activations
- `/activations/[slug].astro` — fetches single activation

**Styling:** CSS custom properties defined in `src/styles/global.css` (`--color-*`, `--text-*`, `--space-*`, `--radius-*`). Layout uses named CSS grid areas (`container_grid`, `container_grid_one_row`, `container_grid_two_rows`). Typography classes like `.display_xl`, `.heading_m`, `.portable_text` are global utilities used across components.

### CMS (`cms/`)

Sanity Studio v5. Schema defined in `cms/schemas/`, registered in `sanity.config.ts`.

**Content model:**
- **Explorations** — living research containers organised around a theme. No status field; always open. Can have collaborators, body (Portable Text), cover image, category, tags.
- **Activations** — lived events (workshop / event / session / field-work) that enact one or more Explorations. Structured around a three-phase arc:
  - `research` — material prepared before the activation
  - `documentation` — record of what happened during
  - `outcomes` — what emerged after
- **Supporting types:** `category`, `tag`, `navigation`, `simple_page`, `homepage`

Activations reference Explorations (many-to-many via `explorations[]` array). The frontend reverses this with a backreference query: `*[_type == "activation" && references(^._id)]`.

### CMS ↔ Frontend

Sanity CDN is used (`useCdn: true`) for all reads. Image assets are resolved to URLs in GROQ using `asset->url`. Portable Text is rendered via `@portabletext/vue` in `PortableTextRenderer.vue`.

## Code Style

CMS follows the Prettier config in `cms/package.json`: no semicolons, single quotes, 100-char print width.
