# SomeSeeds — Sanity Schema Documentation

A reference for the content architecture decisions behind this CMS.
Useful for developers, collaborators, and AI assistants working on this project.

---

## Project Overview

**SomeSeeds** is an interdisciplinary research initiative founded by Deborah Ligorio
that uses situated, practice-based case studies to explore vulnerable, underrepresented
issues — ecological, bodily, social — combining ancient practices with modern tools.

The site is built with **Astro + Vue.js** on the frontend, **Sanity v5** as the CMS,
and connects to external data sources via APIs.

---

## Information Architecture

```
/                          ← Home (editorial intro, surfaces recent Activations)
/approach                  ← Framework: philosophy, methodology (static)
/explorations              ← Index of all Explorations
/explorations/[slug]       ← Single Exploration + its Activations
/about                     ← Identity: founder, collaborators
/contact                   ← Get involved
```

---

## Core Vocabulary

These terms have specific meanings within SomeSeeds — use them consistently.

### Exploration

A **living research container** organised around a specific theme or issue.
Explorations are never "closed" — they can always be re-activated when a new
Activation is planned. They have no status field for this reason.

Examples:

- Promoting Biodiversity in the Region of Apulia
- Activating Metabolic Constitutions
- Water Scarcity Handling Techniques

### Activation

A **lived event** — workshop, session, field work, gathering — that enacts
one or more Explorations in the world. Activations have a lifecycle and carry
a status field (`upcoming` / `ongoing` / `completed`).

Activations are structured around a three-phase arc:

- **BEFORE → Research** — material gathered to inform and prepare the activation
- **DURING → Documentation** — the record of what happened
- **AFTER → Outcomes** — what the activation set in motion

---

## Schema Types

### `exploration`

The research frame. Each Exploration is a thematic container.

| Field         | Type                     | Notes                                    |
| ------------- | ------------------------ | ---------------------------------------- |
| title         | string                   | Required                                 |
| slug          | slug                     | Required, auto-generated from title      |
| category      | reference → category     | Primary theme category                   |
| tags          | array of reference → tag | Cross-cutting keywords                   |
| summary       | text                     | Short description for cards and previews |
| coverImage    | image                    | With hotspot                             |
| body          | Portable Text + images   | Full research context and objectives     |
| collaborators | array of objects         | name, logo, url                          |

### `activation`

A lived event tied to one or more Explorations.

| Field               | Type                             | Notes                                     |
| ------------------- | -------------------------------- | ----------------------------------------- |
| title               | string                           | Required                                  |
| slug                | slug                             | Auto-generated from title                 |
| type                | string                           | workshop / event / session / field-work   |
| status              | string                           | upcoming / ongoing / completed            |
| explorations        | array of reference → exploration | Can belong to multiple                    |
| categories          | array of reference → category    | For cross-cutting queries                 |
| tags                | array of reference → tag         | Fine-grained keywords                     |
| startDate           | date                             |                                           |
| endDate             | date                             | Only for multi-day activations            |
| location            | object                           | venue, city, country                      |
| hostingInstitutions | array of objects                 | name, logo, url                           |
| coverImage          | image                            | With hotspot                              |
| research            | object                           | BEFORE: text, images[], links[]           |
| documentation       | object                           | DURING: text, images[]                    |
| outcomes            | array of objects                 | AFTER: label, url (external), internalRef |

**Outcomes** can point to either an external URL or an internal reference
to another Activation or Exploration — capturing connections that emerge
as a result of the event.

### `simple_page`

Generic static page (About, Approach, Contact, etc.)

### `navigation`

Site navigation structure.

### `category`

Primary thematic groupings. One Category typically corresponds to one Exploration theme.
Used to organise the Studio sidebar and to query cross-cutting content.

### `tag`

Fine-grained keywords that cut across Explorations and Activations.
Used for filtering and discovery.

---

## Key Design Decisions

**1. Explorations have no status**
An Exploration is a permanently open research frame. The lifecycle (upcoming /
ongoing / completed) belongs to Activations, not Explorations.

**2. Activations reference Explorations (not the other way around)**
An Activation holds the reference to its parent Exploration(s). This allows
an Activation to belong to multiple Explorations without changing the
Exploration schema. Query pattern:

```groq
*[_type == "activation" && references($explorationId)]
```

**3. All fields are optional except title**
Content is entered progressively — a draft Activation can be created the
moment something is planned, then filled in before, during, and after the event.

**4. Categories vs Tags**

- **Categories** = broad thematic groupings, one per Exploration theme
- **Tags** = fine-grained cross-cutting concepts (e.g. `field-work`, `ayurveda`, `reforestation`)

---

## Useful GROQ Queries

```groq
// All Explorations (for nav dropdown)
*[_type == "exploration"] | order(title asc) {
  title,
  slug
}

// All Activations for a specific Exploration
*[_type == "activation" && references($explorationId)]
  | order(startDate desc) {
    title, slug, status, startDate, type, coverImage
  }

// Recent completed Activations (for homepage)
*[_type == "activation" && status == "completed"]
  | order(startDate desc)[0...3] {
    title, slug, startDate, coverImage,
    explorations[]-> { title, slug }
  }

// Upcoming Activations across the site
*[_type == "activation" && status == "upcoming"]
  | order(startDate asc) {
    title, slug, startDate, location, coverImage,
    explorations[]-> { title, slug }
  }

// All Activations for a Category
*[_type == "activation" && references($categoryId)]
  | order(startDate desc)
```

---

## Studio Structure

The Sanity Studio sidebar is organised into three groups:

```
Content     → Explorations, Activations
Pages       → Simple Pages
Settings    → Navigation, Categories, Tags
```

---

## Future Schema Types (planned)

- `interview` — recorded or written conversations linked to Explorations
- `dataVisualisation` — data aggregation and API-connected content units

---

_Last updated: 2026 — during initial CMS architecture session._
