# 3xampleca

3xampleca is a frontend-first internal asset management dashboard built with React, TypeScript, Vite, Tailwind CSS, React Router, and Lucide React.

It is designed as a clean enterprise interface for tracking devices, assignments, employees, maintenance, vendors, requests, reports, and settings without backend integration yet.

## Current Scope

This project currently includes:

- Shared application shell with a dark sidebar and light content area
- Routed dashboard structure with React Router
- Reusable UI primitives for cards, badges, and section containers
- Realistic mock data for assets, employees, requests, assignments, maintenance, and vendors
- Polished placeholder pages for:
  - Dashboard
  - Assets
  - Asset Detail
  - Employees
  - Assignments
  - Maintenance
  - Requests
  - Vendors
  - Reports
  - Settings

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React

## Project Structure

```text
src/
  components/
    layout/
    ui/
  data/
  lib/
  pages/
  router/
  types/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Current UI Areas

### Dashboard

- Summary metrics
- Recent assignments
- Maintenance alerts
- Warranty review
- Recent requests

### Assets

- Inventory header and actions
- Search and filter placeholders
- Asset table
- Inventory notes and health summary

### Asset Detail

- Device overview
- Assignment details
- Maintenance history
- Notes
- Activity timeline
- Security and compliance summary

### Employees

- Employee directory
- Device ownership visibility
- Department distribution

### Assignments

- Active assignments
- Assignment history
- Awaiting-assignment panel

### Maintenance

- Repair queue
- Repair history
- Vendor performance summary

## Notes

- This is a frontend scaffold only.
- No backend, API integration, authentication, or persistence is included yet.
- All current data is mocked for layout and workflow design.

## Next Suggested Steps

- Connect the app to a real backend or mock API layer
- Add shared data tables and filters as reusable components
- Add form flows for create/edit actions
- Add role-aware permissions and settings workflows
- Add charts and exports on the Reports page

## Author

Built by Ankur Gautam
