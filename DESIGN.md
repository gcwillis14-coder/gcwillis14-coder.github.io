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
  archival-gray: "#88857d"
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

Deep obsidian grounds recall nocturnal Earth observation, illuminated sparingly by magma amber and solar gold anchored to harmonised DMSP-OLS and VIIRS nighttime lights imagery (2000–2019). Rather than relying on Svelte, SvelteKit, external motion libraries, or build bundlers, every interaction in the core shell uses browser-native primitives: compositor-friendly CSS transitions, vanilla JavaScript FLIP geometry morphing, query-parameter shallow routing, and native View Transitions (`document.startViewTransition` and `@view-transition`) with progressive isolation for legacy static R Markdown and Jupyter exports.

**Key Characteristics:**

- **Zero-Build Static Craft:** Pure vanilla HTML, CSS, and JavaScript served directly via GitHub Pages with progressive enhancement (`html.js` vs `html:not(.js)`), explicitly excluding Svelte, SvelteKit, React, Motion, and heavy runtime visualization bundles from the core shell.
- **Data Sincerity:** Authentic project metadata only—harmonised DMSP-OLS and VIIRS nighttime lights (2000–2019) from Chen et al. (2021) with log-scale radiance mapping and geographic regional coordinates, verified DOIs, collapsible BibTeX records, and real project builds (_Giggity_, _TransitFlow_, and spatial analyses), with zero fabricated telemetry or third-party tracker scripts (`about/index.html` uses a static LinkedIn link instead of an external badge embed).
- **Fluid Native Motion:** First-Last-Invert-Play (FLIP) drawer expansion, list reordering (`moveBefore`), and BibTeX sibling displacement paired with cross-page shared-element transitions—using deterministic `cubic-bezier(0.16, 1, 0.3, 1)` curves with zero scale bounce or artificial spring physics.
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
- **Warm Stone** (`colors.warm-stone`) & **Archival Gray** (`colors.archival-gray`): Subdued hierarchy for body prose, abstracts, technical metadata, and colophons (`#88857d` achieves WCAG AA `5.29:1` contrast on `#0b0d0e` obsidian canvas and `~4.95:1` on `#161514`).
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

- **Grid & Rhythm:** Desktop views pair asymmetrical two-column splits (such as the `7fr / 5fr` nocturnal hero grid and dual-column case-study/about splits) with `2rem` gutters (`spacing.gutter`) and `3rem–4rem` vertical intervals (`spacing.xl` to `spacing.margin`). Below the About split, a compact two-column hairline experience strip (`.timeline` / `.timeline__row`) surfaces career and doctoral milestones without synthetic stat-card grids.
- **Reading & Table Discipline:** Prose stays constrained (`58ch–65ch`) for uninterrupted reading; wide data tables and inline architecture diagrams (`role="img"` with `<title>`) scroll horizontally inside bounded containers (`overflow-x: auto`) paired with a mobile-only scroll cue (`.diagram-panel__hint`) rather than breaking viewport width.
- **Responsive Breakpoints & Mobile Ergonomics:**
  - `<= 1024px`: Four-column index rows collapse thumbnails (`display: none`) and wrap technology metadata cleanly beneath the title/abstract column.
  - `<= 768px` (and `@media (pointer: coarse)`): Horizontal padding tightens to `1rem` (`spacing.gutter-mobile`), hero prose scales down, and top navigation collapses into a full-width slide-down drawer menu (`Escape`-dismissible, backed by `.masthead__scrim` with `document.body` scroll lock, `[aria-expanded="true"]` X-bar toggle transform, and static-visible fallback under `html:not(.js)`). Interactive text controls (`.masthead__toggle`, `.filters button`, `.sorts button`, `.bibtex-toggle-btn`, `.drawer-trigger-btn`) enforce `44×44px` minimum touch targets (WCAG 2.5.8).
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

- **Top Masthead:** Sticky `64px` bar displaying the `George Willis / Data scientist` mark on the left, five typographic links (`Home`, `Work`, `Articles`, `Publications`, `About`) with a `2px` `colors.magma-amber` active underline, and a sharp rectangular `About & experience` action on the right. `updateActiveNav()` matches parent section paths so subpages (such as `/portfolio/giggity.html` under `Work` and `/articles/beijing-subway-network-analytics.html` under `Articles`) retain `aria-current="page"`.
- **Mobile Drawer & Scrim:** `.masthead__toggle` maintains a `44×44px` hit target, morphing its spans to an `X` when `[aria-expanded="true"]`, paired with a `.masthead__scrim` backdrop that dismisses the menu on click and locks `document.body` scroll while open.
- **Subpage Breadcrumbs, Skip Link & Footer:** Case studies and longform articles display a tabular monospace `.breadcrumb` (`Work / Giggity`, `Articles / TransitFlow`). All pages share a keyboard-accessible `Skip to content` link and a single-row tabular monospace colophon with `Email (Proton)`, `LinkedIn`, `GitHub`, and `Source` links.
- **Zero-Tracker External Links:** In `about/index.html`, the third-party LinkedIn badge embed script and widget wrapper were removed in favor of a zero-tracker static LinkedIn link inside `<dl class="fields">` in `.about-sidebar`.

### Index Project Row

- **Structure:** Unboxed horizontal four-column grid (`140px` category tag, flexible title + abstract, `180px` technology metadata, `120×80px` rectangular thumbnail or minimal `44×44px` SVG mark) bounded solely by top/bottom `1px` hairlines.
- **Hover State:** Background shifts quietly to `colors.obsidian-dim` and the row title shifts to `colors.magma-amber` (`150ms ease`) with zero scale bounce.

### Spotlight & Research Panels

- **Featured Project & Dual Research Cards:** Permitted `1px` hairline rectangular containers on `colors.obsidian-dim` for high-priority spotlights (_Giggity_, _TransitFlow_ build notes, _Uber & NYC Taxis_ paper), pairing kicker labels in `colors.solar-gold`, abstracts, `.featured-preview` framing, and inline action links.
- **Icon Disambiguation:** On-page modal drawer triggers use `.drawer-trigger-btn` with the expand glyph `⤢` (`About the image ⤢`, `Under the bonnet ⤢`), reserving `↗` strictly for external `target="_blank"` outbound links and DOIs.
- **Completed Tech Run Standardization:** The rectangular bordered technology spans inside spotlight/case-study headers have been converted into inline mid-dot (`·`) text runs.
- **Archival Preview Plates & CSS Pruning:** Fake macOS browser window chrome and traffic-light dots have been removed from `portfolio/giggity.html`, `articles/beijing-subway-network-analytics.html`, and `assets/case-study.css`, replaced by semantic archival `<figure class="cs-preview-card">` plates with a `0px`-radius `.cs-preview-bar` header (`FIG. 01 · ARCHIVE PLATE` and host label), `.cs-preview-body`, and `<figcaption class="cs-preview-caption">`. Unused legacy CSS classes have also been pruned from `assets/style.css` (legacy ticker, dispatch, pull-quote, and intro selectors) and `assets/case-study.css` (legacy case-study hero, TOC, metric card, mock-browser, architecture, roadmap, and duplicate spotlight overrides).

### Nocturnal Radiance Hero & Metrology

- **Imagery & Masks:** Full-bleed preloaded `4200×4200` harmonised DMSP-OLS and VIIRS nighttime lights composite of China (`img/header.jpg`, 2000–2019, Chen et al., 2021) attenuated on the west and bottom edges by multi-stop obsidian masks so hero typography remains crisp.
- **Cartographic Pins & Ribbon:** Four geographic regional coordinate callouts (`Jing-Jin-Ji Megalopolis · Beijing–Tianjin–Hebei`, `Sichuan Basin · Chengdu–Chongqing`, `Yangtze River Delta · Shanghai–Nanjing`, `Pearl River Delta · Guangzhou–Shenzhen`) paired with a bottom horizon ribbon displaying a log-scale nighttime lights intensity gradient bar (`Low` to `High`) and authentic source metadata (`SOURCE: CHEN ET AL. (2021) · DMSP-OLS & VIIRS (2000–2019) · R / RASTER`), plus the `About the image ⤢` drawer trigger (`#drawer-viirs` documenting dataset, citation, raster stack & log-scale NTL mapping method, and `R · raster · ggplot2` tools).

### Telemetry Drawer & FLIP Motion

- **Vanilla JS Shared-Element Expansion (Feature 1):** Clicking `About the image ⤢` (`#drawer-viirs`) or `Under the bonnet ⤢` (`#drawer-giggity`, `#drawer-transitflow`) captures the originating trigger/row via `getBoundingClientRect()`, mounts the `820px` max-width `.telemetry-drawer`, applies an inverse `translate3d(Δx, Δy, 0) scale(scaleX, scaleY)` from `top left`, and plays a `380ms cubic-bezier(0.16, 1, 0.3, 1)` transform to identity (reversing over `280ms` on close button click, backdrop click, or `Escape`)—implemented purely in vanilla JS with zero Svelte or external motion libraries.
- **Non-Destructive Shallow Query Routing (Feature 4):** Opening a drawer pushes `?drawer=<id>` (e.g., `?drawer=giggity`) via `history.pushState` (and `history.back()` or `history.replaceState` on close), enabling deep-linking and `popstate` Back/Forward closure without reloading or triggering GitHub Pages path-based 404s.
- **Accessibility & Scroll Containment:** Full `Tab` / `Shift+Tab` focus trapping inside open drawers, background page landmarks marked `inert`, `overscroll-behavior: contain` on `.telemetry-drawer` and `.telemetry-backdrop`, `44px` minimum coarse/mobile trigger touch targets, and `prefers-reduced-motion: reduce` checked in JavaScript FLIP calculations so inline transforms are skipped alongside CSS media rules.

### Filter & Sort Controls

- **Typographic Toggles & Counts:** Underlined text buttons on the Work index for category filtering (`All`, `Transport`, `Spatial Data`, `Research`) and sorting (`Recommended`, `Recency`, `Title`), dynamically annotated with live category counts (e.g., `All (N)`, `Transport (N)`) via `dataset.baseLabel`, `44px` touch targets on `@media (max-width: 768px), (pointer: coarse)`, and an accessible empty state (`#portfolio-empty` with `[data-reset-filters]`).
- **FLIP List Reordering (`moveBefore`):** Records `First` and `Last` vertical positions around DOM filtering/sorting, reorders surviving rows using `container.moveBefore(row, null)` when supported (falling back to `appendChild`) to preserve DOM identity, and interpolates positions smoothly via `translate3d(0, Δy, 0)` over `380ms cubic-bezier(0.16, 1, 0.3, 1)`.
- **Shallow Query Routing & Live Announcements:** Filter and sort selections synchronize to `?filter=` and `?sort=` via `history.pushState` + `popstate` without page reloads, while `#portfolio-status` (`role="status"`, `.sr-only`) announces active result counts and sort order to assistive technologies.

### Citations & BibTeX

- **Publication Entries:** Flat hairline-separated rows carrying year, title, summary, co-author citation, outbound DOI link (`↗`), and an interactive `BibTeX citation →` toggle (`.bibtex-toggle-btn`, `44px` touch target on mobile/coarse pointers).
- **BibTeX Drawer & Sibling FLIP Displacement:** Expands a `0px`-radius `colors.obsidian-dim` `<pre>` block in `colors.spectral-yellow` (with subtle opacity/slide reveal under `prefers-reduced-motion: no-preference`), shifting subsequent `.clip` sibling rows smoothly via vanilla JS FLIP `translate3d(0, Δy, 0)` over `320ms cubic-bezier(0.16, 1, 0.3, 1)`.
- **Clipboard Feedback & Live Region:** Includes a 1-click `Copy BibTeX` button (`Copied to clipboard ✓` visual state) paired with `#copy-status` (`role="status"`, `.sr-only`) to announce `"BibTeX citation copied to clipboard"` to screen readers.

### Multi-Page View Transitions & Target Roadmap

- **Native Multi-Page View Transitions (Feature 2):** Implemented across the zero-build static shell using CSS `@view-transition { navigation: auto; }` (gated inside `@media (prefers-reduced-motion: no-preference)`) and persistent `.masthead` `view-transition-name`, paired with a progressive `document.startViewTransition()` fetch-and-`DOMParser` swap for same-origin pages, parent-section `aria-current="page"` matching in `updateActiveNav()`, shared `project-title`, `project-tag`, and `project-meta` transition tokens across index/spotlight cards and destination headings/metadata (`width: fit-content` for stable text aspect ratios), and `<script type="speculationrules">` (`prefetch`, `moderate` eagerness).
- **Static Notebook Isolation:** `isStaticNotebookPath()` explicitly bypasses the View Transitions DOM-swap router for `/portfolio/R/`, `/portfolio/python-notebooks/`, and `/portfolio/misc/` so self-contained R Markdown and Jupyter exports (up to 17+ MB with legacy jQuery/Bootstrap/Leaflet scripts) load via hard navigation without freezing the main thread or colliding with core shell styles.
- **Architectural Feature Mapping (No Framework Clashes):**
  - **Feature 1 (FLIP Layout Morphing & Shared Elements):** Pure vanilla JS across telemetry drawers, Work index filtering/sorting (`moveBefore`), and BibTeX citation sibling displacement—zero Svelte `crossfade` or Framer Motion dependencies.
  - **Feature 2 (Native Multi-Page View Transitions):** Native `@view-transition` + `document.startViewTransition()` DOM swap + Speculation Rules, explicitly isolating static R/Python/misc notebooks.
  - **Feature 3 (Off-Main-Thread `ScrollTimeline`):** Excluded from the core shell to avoid polyfills, scroll-linked parallax bloat, and cross-browser inconsistency; any future reading-progress accent must remain optional pure CSS `@supports (animation-timeline: scroll())` gated by `prefers-reduced-motion: no-preference`.
  - **Feature 4 (Non-Destructive Shallow Routing):** Path-based SvelteKit shallow routing (`preloadData` + `pushState` to virtual paths) clashes with GitHub Pages static hosting (returning `404` on reload without server rewrites); non-destructive shallow routing therefore uses query parameters (`?filter=`, `?sort=`, `?drawer=`) via `history.pushState` + `popstate`.
  - **Feature 5 (Svelte 5 `{@attach}` Spring Physics):** Excluded by both the **Zero-Build Static Craft** rule (no Svelte 5 compiler or runtime) and the **Zero Scale Bounce** aesthetic rule (deterministic `cubic-bezier(0.16, 1, 0.3, 1)` replaces rubber-band spring solvers).
  - **Feature 6 (Heavy D3 / Canvas / WebGL Bundles):** Excluded from the core portfolio shell to preserve zero-build performance and DOM accessibility; complex interactive visualizations stay isolated inside offline static notebook exports (`/portfolio/R/`, `/portfolio/python-notebooks/`) and external edge applications (such as _Giggity_ on MapLibre GL / Cloudflare Workers and _TransitFlow_ on Cloudflare Pages), while core shell diagrams use lightweight inline SVGs (`rx="0"`, `role="img"`, `<title>`).
- **Roadmap:** Wrap home sections cleanly in `<main id="main">` where not yet standardized, add progressive native `<details>`/`<summary>` wrappers for zero-JS BibTeX disclosure, and gradually retire the JS fetch-swap layer once cross-document MPA View Transitions (`@view-transition`) and `SpeculationRules` reach uniform cross-browser maturity.

## Do's and Don'ts

### Do:

- **Do** enforce `0px` border radius (`rounded.none`) across all buttons, containers, thumbnails, badges, and drawers.
- **Do** keep the portfolio 100% zero-build vanilla HTML, CSS, and vanilla JS for direct GitHub Pages delivery.
- **Do** separate inline metadata, years, and technology stacks with middle dots (`·`) and render numeric telemetry in tabular `JetBrains Mono` (`'tnum' 1`).
- **Do** disambiguate action glyphs: reserve `↗` for external `target="_blank"` links and use `⤢` (`.drawer-trigger-btn`) for on-page modal drawers.
- **Do** honor `prefers-reduced-motion: reduce` in both CSS and JavaScript FLIP/View-Transition paths, maintain `44×44px` mobile/coarse touch targets, and provide `role="status"` live announcements (`#portfolio-status`, `#copy-status`), `skip-link`, `aria-current`, and focus restoration.
- **Do** maintain typography and token unification (`Carlito` body font, `#0b0d0e` theme-color, `#88857d` archival-gray tertiary text for WCAG AA contrast, unified `--color-*` tokens, and `Hanken Grotesk` for display/section headings).
- **Do** frame project previews as semantic `<figure class="cs-preview-card">` archival plates (`.cs-preview-bar`) and link to external profiles such as LinkedIn with static, zero-tracker anchors.

### Don't:

- **Don't** introduce Svelte, SvelteKit, React, Motion, Tailwind, Sass, build bundlers, or heavy D3/Canvas/WebGL libraries into the core portfolio shell.
- **Don't** use path-based shallow routing on GitHub Pages (which causes `404` errors on reload); use query parameters (`?filter=`, `?sort=`, `?drawer=`) via `history.pushState` and `popstate`.
- **Don't** use bouncy spring physics, scroll-linked parallax, rounded pill badges, glowing neon shadows, artificial gradients, faux code-comment section numbers (`// 01`), fake macOS traffic-light window dots, fabricated telemetry numbers, third-party tracker scripts, or generic marketing copy.
- **Don't** intercept static R Markdown or Jupyter HTML exports (`/portfolio/R/`, `/portfolio/python-notebooks/`, `/portfolio/misc/`) with the View Transitions DOM-swap router.
- **Don't** hardcode `#050506`, legacy `#63615b` low-contrast tertiary text, or legacy color aliases when authoring new components; reference the canonical `--color-*` tokens defined in frontmatter.
