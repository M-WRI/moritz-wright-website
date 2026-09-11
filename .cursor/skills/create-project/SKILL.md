---
name: create-project
description: >-
  Create or update portfolio project case studies as Markdown files in
  content/projects/. Use when the user asks to add a project, create a case
  study, introduce new work, scaffold a project page, or manage portfolio
  projects.
---

# Create Project

Portfolio projects live as Markdown in `content/projects/{slug}.md`. The site loads them at build time via `src/lib/projects.ts`.

## When to use

- User wants to add, scaffold, or update a portfolio project
- User mentions a new case study, work item, or project page

## Workflow

1. Read an existing file in `content/projects/` (e.g. `korigio.md`) for tone and field conventions.
2. Ask only for missing essentials: title, one-liner, category/stack, and whether images/links exist. Infer the rest when reasonable.
3. Choose slug: lowercase kebab-case from the title (`Plant Sensor` → `plant-sensor`). Filename = `{slug}.md`.
4. Set `number` to the next value after the highest existing `number` (`01`, `02`, …).
5. Create `content/projects/{slug}.md` from the template below.
6. Place images under `public/images/` (or reuse existing paths). Point `image`, `heroImage`, and `screenshots[].src` at public URLs starting with `/`.
7. Leave `github` / `demo` empty if unknown.
8. Confirm the project appears on `/` (if `featured: true`) and `/projects/{slug}`.

## Template

Copy this structure exactly:

```markdown
---
title: Project Name
number: "05"
tagline: Short uppercase-style subtitle
category: Short category label
stack: Web, AI
tags:
  - Web
  - AI
year: 2026
featured: true
image: /images/thumb-example.jpg
heroImage: /images/hero-example.jpg
logoText:
darkThumb: false
github:
demo:
overlay: Ideas into Action.
aboutHeading: A short about headline.
features:
  - title: Feature one
    description: One sentence.
  - title: Feature two
    description: One sentence.
  - title: Feature three
    description: One sentence.
  - title: Feature four
    description: One sentence.
tech:
  - name: React
    detail: Frontend
  - name: TypeScript
    detail: Type Safety
screenshots:
  - src: /images/hero-example.jpg
    label: Overview
  - src: /images/hero-example.jpg
    label: Detail
---

One or two sentences for the project page intro (one-liner).

## About

Longer about paragraph used in the / About column.
```

## Field notes

| Field | Notes |
| --- | --- |
| `year` | Display year on archive cards |
| `number` | Display order; zero-padded string |
| `stack` | Shown as `category / stack` on cards |
| `darkThumb` | `true` + `logoText` = orange wordmark on black thumb (like Unolio) |
| `featured` | `true` shows on home selected work |
| Body before `## About` | Maps to `oneLiner` |
| `## About` section | Maps to `aboutBody` |
| Empty `github` / `demo` | Render as disabled CTAs |

## Do not

- Put projects back into `src/lib/content.ts`
- Create blog posts (blog is out of this version)
- Use uppercase filenames or spaces in the slug
- Start filenames with `_` (those are ignored by the loader)

## Reference

- Loader: `src/lib/projects.ts`
- Page: `src/app/projects/[slug]/page.tsx`
- Example: `content/projects/korigio.md`
- Blank starter: `content/projects/_template.md`
