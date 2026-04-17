# 3xample.ca

A single-page **Next.js** website for [3xample.ca](https://3xample.ca), built as a public showcase for **AI-agentic web applications** and a build-in-public development journey. The repository is structured as a static-friendly App Router project with homepage content driven by central config files. citeturn722782view0turn631872view0turn631872view1turn631872view2turn988469view0

## Overview

3xample is positioned as a public example hub for AI-assisted and agentic product builds. The current site messaging describes it as a place where ideas are turned into working applications, with projects showcased publicly and future build sessions planned around livestreams and community suggestions. citeturn631872view1

The repository itself is a lightweight frontend project using **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, and static export settings that make it suitable for GitHub Pages-style deployment. citeturn631872view0turn988469view0

## Tech Stack

- **Framework:** Next.js 15 (App Router) citeturn631872view0
- **UI:** React 19 citeturn631872view0
- **Language:** TypeScript citeturn722782view0turn631872view0
- **Styling:** Tailwind CSS citeturn631872view0turn631872view3
- **Deployment:** Static export via `output: "export"` with `gh-pages` deployment script support. citeturn988469view0turn631872view0

## Current Structure

The repo currently includes:

- `app/` – App Router entry points and page layout citeturn722782view0turn988469view1turn988469view2
- `components/` – UI building blocks used by the homepage, including the navbar, hero, projects grid, and disclaimer footer. citeturn988469view1
- `public/` – static assets citeturn722782view0
- `config.ts` – site messaging, vision statements, about text, token/donation placeholders, disclaimer copy, and schedule metadata. citeturn631872view1
- `projects.ts` – project card data including title, description, status, featured state, stack, and URL. citeturn631872view2

## Features

- Single-page marketing/showcase site for 3xample.ca. citeturn722782view0turn631872view3
- Homepage content is centralized in `config.ts` and `projects.ts`, making updates simple without deeply editing UI files. citeturn631872view3turn631872view1turn631872view2
- Static export configuration with unoptimized images and trailing slash support for static hosting. citeturn988469view0
- Preconfigured deployment scripts for building and publishing the exported site output. citeturn631872view0
- Project showcase model with status states such as `live`, `completed`, and `coming-soon`. citeturn631872view2

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

These scripts are defined directly in `package.json`. citeturn631872view0

## Deployment

This repo is configured for static output:

```ts
output: "export"
```

It also includes:

- `predeploy`: builds the project with `GITHUB_PAGES=true`
- `deploy`: publishes the `out` folder using `gh-pages`

That means the project is already set up for static hosting workflows such as GitHub Pages. citeturn988469view0turn631872view0

## Content Management

### Update brand/site copy

Edit `config.ts` to change:

- live status and stream schedule
- project vision and homepage statements
- about section content
- contract address and donation messaging
- disclaimer text and external links

These content fields are stored centrally in the config object. citeturn631872view1

### Update showcased apps

Edit `projects.ts` to change project cards. Each entry includes:

- `title`
- `description`
- `status`
- `featured`
- `stack`
- `url`

The current sample projects include items such as **Support Copilot**, **Ops Dashboard**, **Lead Intake Agent**, and **Creator Toolkit**. citeturn631872view2

## Suggested Improvements

Based on the current repo state, good next upgrades would be:

- add a fuller project architecture section with screenshots or preview GIFs
- replace placeholder token and social URLs in `config.ts`
- add real destination URLs for project cards in `projects.ts`
- expand the README with setup notes for GitHub Pages or Vercel
- add an environment variable section if external APIs are introduced later

The recommendation to replace placeholders is grounded in the current config values like `PASTE_CA_HERE`, `PASTE_DONATION_ADDRESS_HERE`, and `https://x.com/YOURHANDLE`. citeturn631872view1

## Existing README

The current repository README is very minimal and only covers the basic description, local development commands, and a few implementation notes. This rewritten version is intended to be more GitHub-ready and better reflect the repo’s current structure and deployment setup. citeturn631872view3turn722782view0

---

Built for public experiments in AI-assisted product development through **3xample.ca**. citeturn722782view0turn631872view1
