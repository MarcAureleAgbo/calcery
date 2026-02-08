# Calcery

Site Astro premium de calculateurs du quotidien (glassmorphism, animations avancées, mobile-first).

## 🚀 Développement

```bash
npm install
npm run dev
```

## 🏗️ Build

```bash
npm run build
npm run preview
```

## ☁️ Déploiement Cloudflare Pages

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- URL du site centralisée: `site.config.mjs` (`SITE_URL`)

## 🎨 Personnalisation rapide des couleurs

Éditez les variables CSS dans `src/styles/global.css`:

```css
:root {
  --primary: #6366F1;
  --primary-dark: #4F46E5;
  --primary-light: #818CF8;
  --accent: #14B8A6;
  --bg-main: #0A0E1A;
  --bg-secondary: #151B2E;
  --bg-tertiary: #1F2937;
  --glass-bg: rgba(31, 41, 55, 0.6);
  --glass-border: rgba(156, 163, 175, 0.1);
}
```

## 🧩 Composants principaux

- `src/layouts/BaseLayout.astro`: background animé, header/fixed, footer premium, scripts globaux (particules, scroll, observer, touch, batterie faible)
- `src/components/Hero.astro`: hero premium
- `src/components/ToolCard.astro`: cartes outils glassmorphism + interactions
- `src/components/FeatureCard.astro`: cartes avantages
- `src/components/StepCard.astro`: étapes numérotées
- `src/components/AdSpace.astro`: zones publicitaires AdSense
- `src/styles/global.css`: design system, animations, responsive complet

## 📁 Structure

- `src/pages/` - Pages Astro
- `src/components/` - Composants UI
- `src/layouts/` - Layouts partagés
- `src/content/` - Articles de blog
- `src/lib/` - Config et types

## 📧 Contact

contact@calcery.fr
