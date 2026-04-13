# 3Xampleca

3Xampleca is a portfolio-ready frontend prototype for an internal IT asset operations platform. It is designed to showcase asset lifecycle visibility, assignment tracking, maintenance operations, vendor oversight, service request management, and reporting in a polished enterprise interface.

## Product Overview

This project presents the kind of internal system an IT operations or workplace technology team could use to manage company devices across procurement, ownership, repair, warranty review, and operational reporting.

The current version is frontend-only and runs entirely on realistic mock data. It focuses on product structure, dashboard quality, reusable UI patterns, and presentation-ready UX rather than backend integration.

## Key Features

- Enterprise app shell with a dark operations sidebar and light content workspace
- Dashboard with operational metrics, charts, recent assignments, maintenance alerts, warranty visibility, and request intake
- Asset inventory screen with search, filtering, sorting, and add-asset modal flow
- Asset detail view with lifecycle overview, assignment context, maintenance history, notes, and compliance summary
- Employee directory focused on device ownership and support visibility
- Assignment management for active allocations, returns, and assignment history
- Maintenance operations view for repair queue tracking, vendor handling, and service history
- Requests workspace for hardware, software, and support intake
- Vendor management for suppliers, support partners, and contract review
- Reporting screen with analytics visuals for category distribution, repair volume, assignment trends, and warranty outlook
- Settings and administration surface for organization defaults, workflow rules, notifications, and role profiles
- Local toast notifications and modal workflows for realistic UI behavior
- Route-aware breadcrumbs, polished empty states, not found handling, and portfolio-friendly mock data

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Recharts

## Project Structure

```text
src/
  components/
    charts/
    layout/
    ui/
  data/
  hooks/
  lib/
  pages/
  router/
  types/
public/
```

## Local Setup

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Build the project

```bash
npm run build
```

4. Preview the production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` starts the Vite development server
- `npm run typecheck` runs the TypeScript project build
- `npm run build` creates the production build
- `npm run preview` serves the production build locally
- `npm run lint` runs ESLint
- `npm run check` runs linting and a production build together
- `npm run deploy` pushes the built `dist` output to the `gh-pages` branch using the current subtree workflow

## Deployment Notes

### GitHub Pages

- The app uses a hash router, which avoids client-side refresh issues on static hosting
- The default Vite base path is configured for the `3Xampleca` GitHub Pages deployment
- The expected GitHub Pages URL is:

```text
https://ankygautam.github.io/3Xampleca/
```

### Vercel

- The current app does not require environment variables
- For a root-path Vercel deployment, set:

```text
VITE_BASE_PATH=/
```

- Because the app uses hash routing, no custom rewrite rules are required for the current prototype

## Screenshots

Add screenshots here before publishing the project publicly:

- `docs/screenshots/dashboard-overview.png`
- `docs/screenshots/assets-inventory.png`
- `docs/screenshots/maintenance-operations.png`
- `docs/screenshots/reporting-analytics.png`

Suggested README image section:

```md
![Dashboard overview](docs/screenshots/dashboard-overview.png)
![Assets inventory](docs/screenshots/assets-inventory.png)
```

## Portfolio Positioning

This project is intentionally framed as an internal asset operations platform rather than a marketing demo. The experience is built around practical operational workflows:

- asset lifecycle visibility
- assignment tracking
- maintenance operations
- vendor oversight
- reporting and warranty visibility

It is suitable for portfolio review when discussing:

- frontend architecture for internal tools
- reusable design systems
- dashboard UX
- table-heavy product interfaces
- modal workflows
- mock-data driven prototyping
- enterprise UI polish

## Future Improvements

- Connect the prototype to a real backend or API layer
- Add persistent CRUD flows for assets, assignments, maintenance records, requests, and vendors
- Add employee and request detail routes
- Support CSV or PDF export flows
- Add role-aware permissions and audit logging
- Add dark-mode aware chart theming if product requirements call for it
- Split analytics code for smaller production bundles

## Current Notes

- This is a mock-data environment with no authentication or persistence
- Modal actions update local page state only
- Some secondary actions intentionally surface informational toasts because the backend workflows are not wired yet

## Author

Built by Ankur Gautam
