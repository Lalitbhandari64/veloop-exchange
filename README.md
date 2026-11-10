# VELOOP Rewards — Exchange Center

## Live Demo

[Open the VELOOP Rewards Exchange Center](https://veloop-exchange-lemon.vercel.app/)

A responsive rewards dashboard for converting earned Gems into VEs. Built with React, Vite, Bootstrap, CSS Modules, and Lucide icons.

## How it works

Choose a conversion, review the required Gems and expected VEs, then confirm. A successful conversion updates the balances and adds an entry to Recent Conversions. The demo also includes insufficient-balance, loading, empty, and error states.

## Run locally

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Vite writes the production build to `dist/`.

## Project structure

- `src/App.jsx` — dashboard, confirmation flow, and conversion history
- `src/App.module.css` — responsive layout and animations
- `src/components/InfoTooltip.jsx` — reusable information tooltip
- `src/data/exchangeData.js` — conversion options
- `public/Image/` — dashboard artwork

## Data and deployment

This is a frontend demo with simulated balances and conversions. A future backend can provide conversion options, validate eligibility, and return updated balances and history.

The site can be deployed to Vercel or Netlify using `npm run build` and the `dist` output directory.