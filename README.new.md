# Mateket Senior School — React + TypeScript School Website

A modern, component-based school website built with React, TypeScript, and Vite. Each page is a separate, maintainable component with optimized routing.

## 📋 Project Structure

```
src/
├── main.tsx              # React entry point
├── App.tsx               # Router setup
├── components/
│   ├── Header.tsx        # Navigation header (improved responsive design)
│   ├── Footer.tsx        # Footer
│   └── HeroCarousel.tsx   # Auto-rotating hero carousel
├── pages/
│   ├── HomePage.tsx      # Home with carousel, about, stats
│   ├── AboutPage.tsx     # School values and mission
│   ├── PerformancePage.tsx # Results and resources
│   └── ContactPage.tsx   # Contact form with fallback storage
├── styles/
│   ├── index.css         # Global styles & imports
│   ├── Header.css        # Header & nav (mobile-first responsive)
│   ├── Footer.css        # Footer
│   ├── Carousel.css      # Hero carousel
│   └── Pages.css         # All page-specific styles
└── data/
    └── site.json         # CMS-friendly content (stats, slides, downloads)
server.js                 # Express mock API for enquiries
```

## 🚀 Quick Start

```powershell
npm install
npm run dev
```
Opens http://localhost:5173 with hot reload.

## 🏗️ Features

- **React 18** + **TypeScript** — Type-safe components
- **React Router v6** — Separate pages for `/`, `/about`, `/performance`, `/contact`
- **Responsive Header** — Mobile hamburger menu with full accessibility
- **Hero Carousel** — Auto-play (5s), pause-on-hover, keyboard navigation, smooth transitions
- **Accessible** — ARIA attributes, skip links, focus management
- **Form Handling** — Posts to `/api/enquiries`, falls back to localStorage
- **CMS-Ready** — Edit content in `src/data/site.json` without touching components
- **SEO** — JSON-LD structured data, Open Graph meta tags
- **Mobile-First Responsive** — Breakpoints at 1024px, 768px, 480px
- **Optimized** — Vite HMR, code splitting per page, lazy image loading

## 📱 Header Improvements

The header has been completely redesigned and refactored:
- **No hardcoded DOM selectors** — Fully React-managed state
- **Proper accessibility** — `aria-controls`, `aria-expanded`, keyboard support  
- **Smooth animations** — Underline on hover for nav links
- **Mobile menu** — Hamburger toggle with clean animations
- **Logo link** — Navigates to home page
- **Responsive nav** — Stacked menu on mobile, closes on link click

## 🎨 Styles

All CSS is organized by component/section:
- `src/styles/index.css` — Global variables, resets, imports
- `src/styles/Header.css` — Header & navigation
- `src/styles/Carousel.css` — Hero carousel
- `src/styles/Pages.css` — All page-specific styles
- `src/styles/Footer.css` — Footer

CSS variables for colors, spacing, fonts. Mobile-first approach.

## 🔧 Common Tasks

### Build for production
```powershell
npm run build
npm run preview
```

### Lint code
```powershell
npm run lint
```

### Run mock API (separate terminal)
```powershell
npm run start:server
```

## 📝 Adding Pages

1. Create `src/pages/PageName.tsx`
2. Add route in `App.tsx`:
   ```tsx
   <Route path="/page-name" element={<PageName />} />
   ```
3. Link in Header navigation
4. Create `src/styles/PageName.css` for styles

## 📝 Editing Content

Edit `src/data/site.json` to update:
- Hero carousel slides (`heroSlides`)
- Stats (`stats`)
- Downloads (`downloads`)

No component code changes needed.

## 🚢 Deploy

- **Vercel**: Recommended for React apps, automatic deploys from Git
- **Netlify**: Connect repo, set build to `npm run build`
- **Self-hosted**: Deploy `dist/` folder as static site

## 📞 Contact Form

Submits to `/api/enquiries`. If backend unavailable, saves to browser localStorage under `mateket:enquiries`.

## ✅ Quality

- TypeScript strict mode enabled
- All components typed
- ESLint configured
- Accessibility audited (WCAG 2.1 AA)
- SEO best practices applied
