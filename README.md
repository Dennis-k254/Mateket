# Mateket Senior School — Local Dev & Mock API

This repository contains a small static site scaffold (Vite) and a simple Express mock API for handling enquiries.

## Install

Open a terminal in the project root and run:

```powershell
npm install
```

## Run dev site (Vite)

```powershell
npm run dev
```

This runs the Vite dev server (default port 5173).

## Run mock API server

```powershell
npm run start:server
```

The mock API listens on port 4000 by default and exposes:
- `POST /api/enquiries` — accepts JSON payload and saves to `data/enquiries.json`
- `GET /api/enquiries` — returns stored enquiries

To test the full site locally, run both the Vite dev server and the mock API (use separate terminals).

## Notes
- The site populates `stats` and `downloads` from `data/site.json` so content can be edited without changing templates.
- For production, replace the mock API with a real backend or a managed form service (Formspree, Netlify Forms), or deploy the Express server behind a node host.
