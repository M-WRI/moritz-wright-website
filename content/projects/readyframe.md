---
title: Ready Frame
number: "02"
tagline: Production-minded app starter
category: App Generator
stack: Monorepo, TypeScript
tags:
  - Monorepo
  - TypeScript
  - Full Stack
  - Generator
year: 2026
featured: true
image: /images/readyframe.jpg
heroImage: /images/readyframe.jpg
imageFit: contain
imageBg: "#03091d"
darkThumb: false
github: https://github.com/M-WRI/readyframe
demo: https://www.npmjs.com/package/create-readyframe
overlay: Scaffold into Ship.
aboutHeading: Start past the empty repo.
features:
  - title: Contracts first
    description: Shared DTOs and ApiError shapes stay in sync across the web app and both API tracks.
  - title: One command to scaffold
    description: create-readyframe spins up a sibling app with one backend, locales, and a deploy shape.
  - title: Auth that ships
    description: httpOnly cookie sessions, roles, verify and reset email, and idempotent register.
  - title: Gates in CI
    description: Format, types, coverage, axe, contract drift, and template sync fail the build when they drift.
tech:
  - name: Vite + React
    detail: Web App
  - name: Fastify
    detail: Node API + Prisma
  - name: FastAPI
    detail: Python API + SQLModel
  - name: Postgres
    detail: Shared Schema
  - name: Turborepo
    detail: pnpm Monorepo
screenshots: []
---

A monorepo starter and app generator: Vite React, Fastify or FastAPI, shared contracts, cookie auth, and CI gates so a new product does not start from an empty folder.

## About

Ready Frame is the reference monorepo and the create-readyframe CLI. The repo keeps Node and Python API tracks on the same contracts and Postgres schema. A generated app picks one backend, plus Cursor rules and agents, and leaves with auth, i18n, and the same quality bar.
