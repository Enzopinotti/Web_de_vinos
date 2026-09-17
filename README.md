# La Casa del Vino

Historical HTML/SCSS learning project focused on a multi-page wine-themed website.

This repository is intentionally preserved as part of my early frontend progression. The current tree still reflects the original implementation and is **not** presented as a current production product.

## What the project contains

- multi-page static HTML site;
- SCSS source compiled to CSS;
- responsive/layout work from an early frontend-learning stage;
- local image/media assets;
- pages for wine types, educational content, contact/questions and subscription content.

## Historical toolchain

The original project uses:

- HTML
- SCSS / CSS
- `node-sass`
- `nodemon` as a Sass watch helper

Build the historical stylesheet with:

```bash
npm install
npm run build-css
```

Watch SCSS changes with:

```bash
npm run watch-css
```

Then open `index.html` with a local static server or browser-compatible development server.

## Current repository status

This repository is classified as a **historical learning project worth preserving and cleaning up**, not as a candidate for a framework rewrite.

Known modernization/hygiene work for the next dedicated lane includes:

- remove committed `node_modules/` from current source authority while preserving Git history;
- replace the historical `node-sass` build path with maintained Sass tooling;
- make install/build behavior reproducible;
- review paths, accessibility and responsive behavior;
- keep the original visual/project intent instead of rebuilding it as another React application.

The point of the future modernization is to demonstrate engineering progression while preserving the original project truth.

Portfolio coordination: [`Enzopinotti/Enzopinotti#19`](https://github.com/Enzopinotti/Enzopinotti/issues/19)

## Author

Enzo Pinotti
