---
name: Cartographic Precision
description: Archival scientific atlas and nocturnal satellite radiometry design system for George Willis's zero-build portfolio on GitHub Pages.
colors:
  obsidian-canvas: "#0b0d0e"
  obsidian-dim: "#121110"
  surface-lowest: "#0e0e0f"
  surface-low: "#161514"
  surface-container: "#1d1c1b"
  surface-high: "#272624"
  surface-highest: "#33312f"
  surface-bright: "#3a393a"
  ivory-ink: "#f3f2ee"
  warm-stone: "#9e9c96"
  archival-gray: "#63615b"
  ember-tint: "#e1bfb2"
  magma-amber: "#e85d04"
  magma-soft: "#ffb596"
  ember-dim: "#581e00"
  solar-gold: "#ffba08"
  spectral-yellow: "#ffe3a8"
  hairline-rule: "rgba(255, 255, 255, 0.08)"
  hairline-strong: "rgba(255, 255, 255, 0.16)"
  backdrop-veil: "rgba(11, 13, 14, 0.82)"
typography:
  display:
    fontFamily: "Hanken Grotesk, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "3.25rem"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Hanken Grotesk, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Hanken Grotesk, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Carlito, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, IBM Plex Mono, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.12em"
  mono:
    fontFamily: "JetBrains Mono, IBM Plex Mono, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "'tnum' 1"
rounded:
  none: "0px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.75rem"
  xl: "3rem"
  gutter: "2rem"
  gutter-mobile: "1rem"
  margin: "4rem"
  margin-mobile: "1.5rem"
  measure: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.ivory-ink}"
    textColor: "{colors.obsidian-canvas}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "10px 18px"
  button-primary-hover:
    backgroundColor: "{colors.magma-amber}"
    textColor: "{colors.ivory-ink}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ivory-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "10px 18px"
  button-ghost:
    backgroundColor: "{colors.surface-low}"
    textColor: "{colors.warm-stone}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "10px 18px"
  nav-cta:
    backgroundColor: "{colors.ivory-ink}"
    textColor: "{colors.obsidian-canvas}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "6px 14px"
  index-row:
    backgroundColor: "transparent"
    textColor: "{colors.ivory-ink}"
    rounded: "{rounded.none}"
    padding: "24px 8px"
  index-row-hover:
    backgroundColor: "{colors.obsidian-dim}"
    textColor: "{colors.magma-amber}"
  spotlight-panel:
    backgroundColor: "{colors.obsidian-dim}"
    textColor: "{colors.ivory-ink}"
    rounded: "{rounded.none}"
    padding: "1.75rem"
  telemetry-drawer:
    backgroundColor: "{colors.obsidian-dim}"
    textColor: "{colors.ivory-ink}"
    rounded: "{rounded.none}"
    width: "820px"
  bibtex-box:
    backgroundColor: "{colors.obsidian-dim}"
    textColor: "{colors.spectral-yellow}"
    typography: "{typography.mono}"
    rounded: "{rounded.none}"
    padding: "16px"
---

# Design System: Cartographic Precision

## Overview

**Creative North Star: "The Nocturnal Atlas"**

This design system captures the visual grammar, motion architecture, and zero-build technical discipline of George Willis's personal portfolio (`gcwillis14-coder.github.io`, static HTML/CSS/vanilla JS on GitHub Pages). Built for an Experience-mode scientific portfolio covering data science, spatial networks, urban mobility, and live-music tooling, the interface recedes behind real geospatial artefacts, peer-reviewed citations, and candid engineering notes.

Deep obsidian grounds recall nocturnal Earth observation, illuminated sparingly by magma amber and solar gold anchored to Suomi-NPP VIIRS Day/Night Band radiance telemetry. Rather than relying on heavy frontend frameworks or decorative templates, every interaction uses browser-native primitives: compositor-friendly CSS transitions, vanilla JavaScript FLIP geometry morphing, and native View Transitions (`document.startViewTransition` and `@view-transition`) with progressive fallback for legacy static R Markdown and Jupyter exports.

**Key Characteristics:**

- **Zero-Build Static Craft:** Pure vanilla HTML, CSS, and JavaScript served directly via GitHub Pages with progressive enhancement (`html.js` vs `html:not(.js)`).
- **Data Sincerity:** Authentic sensor telemetry (`7.38` to `403.42 nW·cm⁻²·sr⁻¹`, `EPSG:4326`), verified DOIs, collapsible BibTeX records, and real project builds (_Giggity_, _TransitFlow_, and spatial analyses).
- **Fluid Native Motion:** First-Last-Invert-Play (FLIP) drawer expansion and list reordering paired with cross-page title transitions, avoiding artificial bounce or SPA runtime bloat.
- **Rejected Anti-Patterns:** No rounded pill clouds, no glowing neon borders, no multi-stop AI gradients, and no synthetic stat-card grids.

## Colors

The palette derives directly from nocturnal satellite radiometry—dark cosmic grounds contrasted by high-legibility ivory ink and calibrated ember highlights.

### Primary

- **Magma Amber** (`colors.magma-amber`): Primary radiant accent representing mid-to-high urban light intensity. Used for active navigation underlines, project row hover titles, primary citation links, calibration markers, and button hover fills.
- **Magma Soft** (`colors.magma-soft`) & **Ember Dim** (`colors.ember-dim`): Supporting warm highlights for diagram headings and muted accent states.

### Secondary

- **Solar Gold** (`colors.solar-gold`) & **Spectral Yellow** (`colors.spectral-yellow`): Reserved for peak radiometric readouts, status kickers, cartographic cluster pin titles, vector mark nodes, and BibTeX source text.

### Neutral

- **Obsidian Canvas** (`colors.obsidian-canvas`): Primary page background and dark base layer across all views.
- **Obsidian Dim** (`colors.obsidian-dim`) & **Surface Scale** (`colors.surface-lowest` through `colors.surface-bright`): Tonal steps separating spotlight panels, row hover states, modal drawers, and BibTeX containers without drop shadows.
- **Ivory Ink** (`colors.ivory-ink`): Primary text color for headlines, titles, and primary rectangular buttons, avoiding harsh pure-white glare.
- **Warm Stone** (`colors.warm-stone`) & **Archival Gray** (`colors.archival-gray`): Subdued hierarchy for body prose, abstracts, technical metadata, and colophons.
- **Hairline Rule** (`colors.hairline-rule`) & **Hairline Strong** (`colors.hairline-strong`): Disciplined `1px` dividers separating index rows, sections, tables, and modal headers.

**The Calibrated Radiance Rule.** Magma amber and solar gold act strictly as telemetry and focus signals; never flood large surfaces or ambient backgrounds with saturated orange or yellow.

**The Token Unification Rule.** `colors.obsidian-canvas` (`#0b0d0e`) is the sole canonical ground; align legacy `<meta name="theme-color">` tags, translucent masthead/backdrop veils, and case-study stylesheet aliases onto the canonical `--color-*` palette.

## Typography

**Display & Headline Font:** `Hanken Grotesk` (with `-apple-system, BlinkMacSystemFont, sans-serif` fallback)  
**Body Font:** `Carlito` (with `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` fallback; migrated from legacy Noto Serif baseline)  
**Label & Telemetry Font:** `JetBrains Mono` (with `IBM Plex Mono, Menlo, monospace` fallback and `'tnum' 1` tabular numerals)

**Character:** Geometric humanist sans-serif headings establish clean architectural authority while warm body prose carries long-form build notes and abstracts; tabular monospace anchors coordinates, dates, stack metadata, and BibTeX blocks with archival precision.

### Hierarchy

- **Display** (`400`, `36px` mobile → `52px` desktop, `1.15` line-height, `-0.02em` tracking): Hero thesis headline over the nocturnal satellite canvas.
- **Headline** (`500`, `24px–26px`, `1.3` line-height, `-0.01em` tracking): Section titles, spotlight headings, and modal drawer titles.
- **Title** (`500`, `20px`, `1.4` line-height): Index row titles and research card headings.
- **Body** (`400`, `15px–17px`, `1.6` line-height, max `58ch–780px` measure): Narrative prose, project abstracts, and navigation items styled with `Carlito`, aligning subpage/case-study display titles onto `Hanken Grotesk` and resolving legacy font fallbacks.
- **Label & Telemetry** (`400–500`, `10px–12px`, `0.04em–0.12em` tracking): Geodetic coordinates, radiance scales, kickers, metadata runs, filter/sort controls, and citations.

**The Mid-Dot Notation Rule.** Inline categories, dates, and technology metadata use natural sentence or mixed case separated by centered middle dots (`·`), never enclosed pill tags or faux code-comment prefixes (`// 01`).

## Layout

The layout organizes a five-section multi-page architecture (`Home`, `Work`, `Articles`, `Publications`, `About`) plus isolated legacy notebooks (`portfolio/R/`, `portfolio/python-notebooks/`, `portfolio/misc/`) inside a centered `1240px` maximum container (`spacing.measure`).

- **Grid & Rhythm:** Desktop views pair asymmetrical two-column splits (such as the `7fr / 5fr` nocturnal hero grid and dual-column case-study/about splits) with `2rem` gutters (`spacing.gutter`) and `3rem–4rem` vertical intervals (`spacing.xl` to `spacing.margin`).
- **Reading & Table Discipline:** Prose stays constrained (`58ch–65ch`) for uninterrupted reading; wide data tables and architecture diagrams scroll horizontally inside bounded containers (`overflow-x: auto`) rather than breaking viewport width.
- **Responsive Breakpoints:**
  - `<= 1024px`: Four-column index rows collapse thumbnails (`display: none`) and wrap technology metadata cleanly beneath the title/abstract column.
  - `<= 768px`: Horizontal padding tightens to `1rem` (`spacing.gutter-mobile`), hero prose scales down, and top navigation collapses into a full-width slide-down drawer menu (`Escape`-dismissible, static-visible under `html:not(.js)`).
  - `<= 640px`: Index rows stack into a single vertical column, and eastern cartographic coordinate pinpoints hide so the satellite canvas remains uncluttered on narrow screens.

**The Open Canvas Rule.** Content flows directly across open vertical rhythm and horizontal hairlines rather than wrapping every section in nested boxes.

## Elevation & Depth

Visual hierarchy relies on flat tonal shifts (`colors.obsidian-canvas` → `colors.obsidian-dim` → `colors.surface-low`) and `1px` hairline thresholds (`colors.hairline-rule`), never extruded card shadows or glossy gradients.

- **Flat Surface Tiers:** Page sections, index rows, and publication entries sit flush on the primary canvas; hovering an index row steps subtly to `colors.obsidian-dim`.
- **Translucent Chrome & Modal Depth:** Only the sticky top masthead (subtle `8px` backdrop blur over `var(--color-masthead-bg)` / `rgba(11, 13, 14, 0.95)`) and the open telemetry drawer (`0 24px 64px rgba(0, 0, 0, 0.85)` over a blurred `colors.backdrop-veil` backdrop) lift above the document plane.

**The Flat-By-Default Rule.** Static cards, rows, and buttons carry zero drop shadow; elevation is reserved exclusively for floating navigation chrome and active modal drawers.

## Shapes

The geometric system strictly enforces **Level 0 Sharp (`0px` border-radius)** across all interactive controls, containers, thumbnails, diagrams, and modals—echoing printed atlas plates and archival technical reports.

- **Containers & Thumbnails:** Index thumbnails (`120×80px`), buttons, filter underlines, BibTeX containers, and telemetry drawers have crisp `90°` corners (`rounded.none`).
- **Hairline Framing:** Where structural containment is needed, components use `1px solid` hairline borders rather than rounded outlines or thick accent left-borders.
- **Completed Shape Cleanups:** All interactive controls, containers, thumbnails, diagrams, and modals enforce Level 0 Sharp (`0px` border-radius). The showcase indicator `border-radius: 50%` exception has been retired, SVG architecture diagram boxes enforce `rx="0"`, and bordered stack chips have been converted into flat mid-dot typographic runs.

## Components

### Buttons

- **Shape:** Sharp rectangular geometry (`0px` radius), `10px 18px` padding, `150ms ease` color/background transitions.
- **Primary (`button-primary`):** High-contrast `colors.ivory-ink` fill with `colors.obsidian-canvas` text; transitions on hover to `colors.magma-amber` fill with `colors.ivory-ink` text.
- **Outline & Ghost (`button-outline`, `button-ghost`):** `1px` border (`colors.magma-amber` or `colors.hairline-rule`) on transparent or `colors.surface-low` ground, shifting to `colors.magma-amber` or `colors.surface-high` on hover.

### Navigation

- **Top Masthead:** Sticky `64px` bar displaying the `George Willis / Data scientist` mark on the left, five typographic links (`Home`, `Work`, `Articles`, `Publications`, `About`) with a `2px` `colors.magma-amber` active underline, and a sharp rectangular `About & experience` action on the right.
- **Skip Link & Footer:** Keyboard-accessible skip link (`Skip to content`) and a single-row tabular monospace colophon with `Email (Proton)`, `LinkedIn`, `GitHub`, and `Source` links.

### Index Project Row

- **Structure:** Unboxed horizontal four-column grid (`140px` category tag, flexible title + abstract, `180px` technology metadata, `120×80px` rectangular thumbnail or minimal `44×44px` SVG mark) bounded solely by top/bottom `1px` hairlines.
- **Hover State:** Background shifts quietly to `colors.obsidian-dim` and the row title shifts to `colors.magma-amber` (`150ms ease`) with zero scale bounce.

### Spotlight & Research Panels

- **Featured Project & Dual Research Cards:** Permitted `1px` hairline rectangular containers on `colors.obsidian-dim` for high-priority spotlights (_Giggity_, _TransitFlow_ build notes, _Uber & NYC Taxis_ paper), pairing kicker labels in `colors.solar-gold`, serif/target-sans abstracts, and inline action links.
- **Completed Tech Run Standardization:** The rectangular bordered technology spans inside spotlight/case-study headers have been converted into inline mid-dot (`·`) text runs.

### Nocturnal Radiance Hero & Metrology

- **Imagery & Masks:** Full-bleed preloaded `4200×4200` Suomi-NPP VIIRS Day/Night Band composite (`img/header.jpg`) attenuated on the west and bottom edges by multi-stop obsidian masks so hero typography remains crisp.
- **Cartographic Pins & Ribbon:** Four coordinate callouts (`Jing-Jin-Ji Megalopolis`, `Sichuan Basin`, `Yangtze River Delta`, `Pearl River Delta`) paired with a bottom horizon bar showing the continuous radiance scale (`7.38` to `403.42 nW·cm⁻²·sr⁻¹`) and sensor parameters (`EPSG:4326 · VIIRS/VCM · ZENITH: 14.2°`).

### Telemetry Drawer & FLIP Motion

- **Shared-Element Expansion:** Clicking `About the image ↗` or `Under the bonnet ↗` captures the originating trigger/row via `getBoundingClientRect()`, mounts the `820px` max-width `.telemetry-drawer`, applies an inverse `translate3d(Δx, Δy, 0) scale(scaleX, scaleY)` from `top left`, and plays a `380ms cubic-bezier(0.16, 1, 0.3, 1)` transform to identity (reversing over `280ms` on close button click, backdrop click, or `Escape`).
- **Completed Accessibility Architecture:** Full `Tab` / `Shift+Tab` focus trapping inside open drawers, background page landmarks marked `inert`, and `prefers-reduced-motion: reduce` checked inside JavaScript FLIP calculations so inline transforms are skipped alongside CSS media rules.

### Filter & Sort Controls

- **Typographic Toggles:** Underlined text buttons on the Work index for category filtering (`All`, `Transport`, `Spatial Data`, `Research`) and sorting (`Recommended`, `Recency`, `Title`).
- **FLIP List Reordering:** Records `First` and `Last` vertical positions around DOM filtering/sorting and interpolates surviving rows smoothly via `translate3d(0, Δy, 0)` over `380ms cubic-bezier(0.16, 1, 0.3, 1)`.

### Citations & BibTeX

- **Publication Entries:** Flat hairline-separated rows carrying year, title, summary, co-author citation, outbound DOI link (`↗`), and an interactive `BibTeX citation →` toggle.
- **BibTeX Drawer:** Expands a `0px`-radius `colors.obsidian-dim` `<pre>` block in `colors.spectral-yellow` with a 1-click `Copy BibTeX` button (`Copied to clipboard ✓` feedback).

### Multi-Page View Transitions & Target Roadmap

- **Current Baseline:** CSS `@view-transition { navigation: auto; }` + persistent masthead transition name (`masthead`) paired with a progressive `document.startViewTransition()` fetch-and-DOMParser swap for same-origin pages (explicitly bypassing static R/Python notebooks) and `project-title` pairing from `[data-slug]` index rows to destination `main h1`.
- **Target Evolution:** Extend `view-transition-name` pairing to `project-tag` and `project-meta`, replace `window.location.reload()` on `popstate` with view-transitioned history restoration, adopt `<script type="speculationrules">` (`prefetch` on moderate eagerness), wrap home sections in `<main id="main">`, and gradually retire the JS fetch-swap layer as cross-document MPA View Transitions mature natively.

## Do's and Don'ts

### Do:

- **Do** enforce `0px` border radius (`rounded.none`) across all buttons, containers, thumbnails, badges, and drawers.
- **Do** keep the portfolio 100% zero-build vanilla HTML, CSS, and vanilla JS for direct GitHub Pages delivery.
- **Do** separate inline metadata, years, and technology stacks with middle dots (`·`) and render numeric telemetry in tabular `JetBrains Mono` (`'tnum' 1`).
- **Do** honor `prefers-reduced-motion: reduce` in both CSS and JavaScript FLIP transitions, and maintain full keyboard/screen-reader accessibility (`skip-link`, `aria-current`, focus restoration).
- **Do** maintain the target typography and token unification (`Carlito` body font, `#0b0d0e` theme-color, unified `--color-*` tokens across case-study styles, and `Hanken Grotesk` for all display/section headings).

### Don't:

- **Don't** introduce React, Tailwind, Sass, build bundlers, or external UI component libraries.
- **Don't** use rounded pill badges, glowing neon shadows, artificial gradients, faux code-comment section numbers (`// 01`), or generic marketing copy.
- **Don't** intercept static R Markdown or Jupyter HTML exports (`/portfolio/R/`, `/portfolio/python-notebooks/`, `/portfolio/misc/`) with the View Transitions DOM-swap router.
- **Don't** hardcode `#050506` or legacy color aliases when authoring new components; reference the canonical `--color-*` tokens defined in frontmatter.
