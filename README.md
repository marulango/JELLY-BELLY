# Jelly Belly — Shopify Theme

A custom Shopify theme built on the Skeleton Theme base, using **Tailwind CSS v4** for styling and **Swiper.js** for sliders.

## Getting started

### Prerequisites

- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli)
- [Node.js](https://nodejs.org/) (for Tailwind CSS compilation)
- [Shopify Liquid VS Code Extension](https://shopify.dev/docs/storefronts/themes/tools/shopify-liquid-vscode) (optional but recommended)

### Setup

```bash
npm install
```

### Development

Preview the theme on a connected Shopify store:

```bash
shopify theme dev
```

Compile Tailwind CSS once:

```bash
npm run build
```

Watch Tailwind CSS for changes during development:

```bash
npm run watch
```

## Theme architecture

```
.
├── assets          # Static assets (compiled CSS, JS, images, fonts)
├── blocks          # Editor-customizable, nestable UI components
├── config          # Global theme settings
├── layout          # Top-level page wrappers (theme.liquid)
├── locales         # Translation files
├── sections        # Full-width page modules with merchant settings
├── snippets        # Reusable Liquid fragments
├── src             # Source files (Tailwind CSS input)
└── templates       # JSON files wiring sections per page type
```

## Design system

Defined in `src/tailwind.css` and compiled to `assets/tailwind.css`.

**Colors**
- `brand` — #FF52AF (Jelly Belly pink)
- `plum` — #33222B
- `muted`, `dusty`, `gray`

**Fonts**
- `font-headline` — Obviously Extended
- `font-title` — Neulis Cursive
- `font-body` — Neulis Sans

**Buttons** — `.btn-primary`, `.btn-secondary`, `.btn-tertiary`, `.btn-ghost`  
All button variants use CSS vars (`--btn-bg`, `--btn-text`, `--btn-border`) set by background color context classes.

## CSS

- `src/tailwind.css` → compiled to `assets/tailwind.css`
- `assets/critical.css` — page-critical styles loaded on every page (keep minimal)
- Per-component styles live inside `{% stylesheet %}` tags within section/block/snippet files

## Schema conventions

**Single CSS property** → CSS variable:
```liquid
<div style="--gap: {{ block.settings.gap }}px">
{% stylesheet %}.foo { gap: var(--gap); }{% endstylesheet %}
```

**Multiple CSS properties** → CSS class from select setting:
```liquid
<div class="{{ block.settings.layout }}">
```

Schema `label` and `name` values use translation keys (`t:labels.foo`).

## Translations

All user-facing text uses `{{ 'key' | t }}`. English keys live in `locales/en.default.json`; schema strings in `locales/en.default.schema.json`.

Keys: snake_case, max 3 levels deep (e.g. `sections.hero.title`). Sentence case for all text.
