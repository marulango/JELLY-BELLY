# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Preview the theme on a connected Shopify store
shopify theme dev

# Build Tailwind CSS (one-time)
npm run build

# Watch Tailwind CSS for changes during development
npm run watch
```

Theme check (linting) uses `extends: theme-check:recommended` configured in `.theme-check.yml`.

## Architecture

This is a custom **Jelly Belly** Shopify theme built on the Shopify Skeleton Theme, using **Tailwind CSS v4** for styling and **Swiper.js** for sliders.

### CSS layers

- `src/tailwind.css` → compiled to `assets/tailwind.css` via `npm run build`
- `assets/critical.css` — page-critical styles loaded on every page (keep minimal)
- Per-component CSS lives inside `{% stylesheet %}` tags within section/block/snippet files — do not put component styles in `assets/`

### Custom brand design system (defined in `src/tailwind.css`)

Colors: `brand` (#FF52AF), `muted`, `dusty`, `gray`, `plum` (#33222B)  
Fonts: `font-headline` (Obviously Extended), `font-title` (Neulis Cursive), `font-body` (Neulis Sans)  
Button variants: `.btn-primary`, `.btn-secondary`, `.btn-tertiary`, `.btn-ghost` — all use CSS vars `--btn-bg`, `--btn-text`, `--btn-border` set by background color context classes

### Global layout (`layout/theme.liquid`)

Loads: `critical.css`, `tailwind.css`, `slider.css`, Swiper 11 (CDN), Phosphor Icons (CDN), `menu-mobile.js`, `slider.js`, `stamp-animation.js`, `newsletter.js`. Contains a fixed animated stamp overlay rendered via `snippets/stamp.liquid` and `snippets/stamp-ring.liquid`.

### Component hierarchy

Focus development on **snippets**, **blocks**, and **sections** — merchants build pages through the theme editor using templates.

| Type | Purpose | Requires |
|------|---------|----------|
| `snippets/` | Reusable fragments, not editor-exposed | `{% doc %}` header |
| `blocks/` | Editor-customizable small components, nestable | `{% doc %}` header (if statically rendered), `{% schema %}` |
| `sections/` | Full-width page modules with merchant settings | `{% schema %}` |
| `templates/` | JSON files wiring sections/blocks per page type | — |

### Schema patterns

**Single CSS property** → use CSS variable:
```liquid
<div style="--gap: {{ block.settings.gap }}px">
{% stylesheet %}.foo { gap: var(--gap); }{% endstylesheet %}
```

**Multiple CSS properties** → use CSS class value from select setting:
```liquid
<div class="{{ block.settings.layout }}">
```

Schema `label` and `name` values must use translation keys (`t:labels.foo`, `t:general.bar`).

### Translations

- All user-facing text must use `{{ 'key' | t }}` — no hardcoded strings
- Add new English keys to `locales/en.default.json`; schema strings go in `locales/en.default.schema.json`
- Keys: snake_case, max 3 levels deep, hierarchical (e.g. `sections.hero.title`)
- Use sentence case for all text (`Featured collection`, not `Featured Collection`)

### LiquidDoc

Every snippet and statically-rendered block must have a `{% doc %}` header:
```liquid
{% doc %}
  Short description.
  @param {type} name - Description
  @param {type} [optional] - Description
  @example
  {% render 'snippet-name', param: value %}
{% enddoc %}
```

### Liquid gotchas

- No parentheses in conditions — use nested `{% if %}` for complex logic
- No ternary — always use `{% if cond %}...{% endif %}`
- `for` loops max 50 iterations — use `{% paginate %}` for larger arrays
- Snippets cannot access variables from calling scope (only globals and passed params)
- `{% stylesheet %}` and `{% javascript %}` tags are only valid in `snippets/`, `blocks/`, and `sections/`
