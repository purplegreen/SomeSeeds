# SomeSeeds

Website and CMS for [SomeSeeds](https://www.someseeds.net) — an interdisciplinary
research initiative exploring restorative practices, regenerative principles, and
modes of coexistence among life forms and their ecosystems.

---

## Stack

- **Frontend** — [Astro](https://astro.build) + [Vue.js](https://vuejs.org)
- **CMS** — [Sanity.io](https://sanity.io) v5

## Getting Started

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

**CMS**

```bash
cd cms/my-dashboard
npm install
npm run dev
```

## Environment Variables

**Frontend** — create a `.env` file in `frontend/`:

```
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
```

**CMS** — create a `.env` file in `cms/`:

```
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

## Content Architecture

The CMS is structured around two core document types:

- **Explorations** — living research containers organised around a theme
- **Activations** — lived events (workshops, sessions, field work) that enact Explorations

For full documentation of the content model and design decisions →
[cms/schemas/README.md](./cms/schemas/README.md)
