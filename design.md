---
name: Cartographic Precision
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#e1bfb2'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#a98a7e'
  outline-variant: '#594137'
  surface-tint: '#ffb596'
  primary: '#ffb596'
  on-primary: '#581e00'
  primary-container: '#f26411'
  on-primary-container: '#4d1900'
  inverse-primary: '#a33e00'
  secondary: '#ffdb9c'
  on-secondary: '#412d00'
  secondary-container: '#fcb802'
  on-secondary-container: '#6a4b00'
  tertiary: '#a6c8ff'
  on-tertiary: '#003060'
  tertiary-container: '#2d91ff'
  on-tertiary-container: '#002a54'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcd'
  primary-fixed-dim: '#ffb596'
  on-primary-fixed: '#360f00'
  on-primary-fixed-variant: '#7c2e00'
  secondary-fixed: '#ffdea6'
  secondary-fixed-dim: '#ffbb12'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5d4200'
  tertiary-fixed: '#d5e3ff'
  tertiary-fixed-dim: '#a6c8ff'
  on-tertiary-fixed: '#001c3b'
  on-tertiary-fixed-variant: '#004787'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  display-hero:
    fontFamily: Hanken Grotesk
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 26px
    fontWeight: '400'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Noto Serif
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Noto Serif
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Noto Serif
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Noto Serif
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Noto Serif
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
spacing:
  gutter: 2rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-mobile: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
---

## Brand & Style

This design system establishes an authentic, intellectually rigorous visual environment tailored for spatial statistics, geodata engineering, and applied machine learning research. Drawing inspiration from archival cartographic atlases, technical research journals, and high-performance minimalist scientific interfaces, the layout keeps focus on the data and prose.

The aesthetic marries deep void-black foundations with the radiant spectrum of nocturnal satellite radiometry (VIIRS night-lights data): warm embers, deep magma reds, and radiant solar ambers used sparingly as semantic accents against pitch obsidian surfaces. 

Key attributes:
- **Academic and Technical Gravity:** Typography relies on the literary weight of Hanken Grotesk for titles paired with the neutral, unadorned precision of Noto Serif for structural documentation.
- **Asymmetrical Editorial Cadence:** Content is arranged with deliberate spatial tension, open breathing margins, and stark typographic hierarchy instead of repetitive bordered cards.
- **Restraint and Data Sincerity:** Every interface element represents functional spatial metadata, authentic citations (DOI, BibTeX), or direct project indexes. Decorative visual noise, such as neon drop shadows, pill tags, and abstract gradients, is entirely eliminated unless user has specifically accepted a suggestion.

## Colors

The color palette is derived directly from radiance values in nocturnal raster cartography. The background is a dense, neutral cosmic black (`#050506`), moving subtly to an off-pitch charcoal (`#121215`) for elevated layers or table headers. 

- **Primary (`#e85d04`):** An assertive magma orange representing intermediate radiometric intensity. Used for primary focus links, visual plot marks, and high-priority spatial citations.
- **Secondary (`#ffba08`):** A solar incandescent gold reflecting the highest cluster light emissions. Reserved for pinpoint highlights, selected states, and numerical focal points.
- **Surface & Hairlines:** Borders avoid intrusive outlines and instead rely on disciplined hair-thin thresholds (`#1f2026`) that separate structural views without breaking editorial flow.
- **Text Palette:** Pure white is avoided to reduce eye fatigue across dense statistical prose. Hierarchy flows from crisp chalk (`#f4f4f6`) to mid-slate neutral (`#a0a1ab`) down to muted stone (`#636573`) for tabular metadata.

## Typography

The type system balances scholarly literature and computational rigor. 

- **Headlines:** Set in Hanken Grotesk, featuring proportional optical balance, open counters, and editorial elegance. Titles avoid trailing periods and gratuitous italic styling. Headlines sit with natural optical rhythm rather than artificial negative tracking.
- **Body & Labels:** Set in Noto Serif. It delivers classic editorial readability without falling into common UI tropes. 
- **Metadata and Categorization:** Metadata values are displayed in natural sentence or mixed-case notation separated by centered mid-dots (`·`). Tiny all-caps badges, monospaced file tags, and oversized tracking are avoided to preserve archival legibility.

## Layout & Spacing

The layout is built around an asymmetrical, wide-canvas grid that facilitates uninterrupted reading flow and showcases geographic data visualization.

- **Grid Architecture:** Desktop views utilize an asymmetrical dual-column layout (an anchor sidebar/context column paired with a broad research canvas) with `2rem` gutters and a maximum bounded container of `1240px`.
- **Rhythm:** Generous vertical intervals (`space-xl` to `margin`) demarcate research phases without resorting to structural border boxes or full-bleed divider bars. 
- **Reflow:** On mobile viewports (<768px), layout transforms into an uninterrupted linear narrative with `1.5rem` outer canvas padding, ensuring complex map figures and statistical tables can be navigated horizontally when necessary.

## Elevation & Depth

Visual hierarchy operates purely through tonal surface shifts and selective illumination rather than extruded drop shadows or frosted glass blurs:

- **Surface Tiers:** Content flows directly over the base black background (`#050506`). When an interactive layer requires separation, it relies on a flat step to `#121215`.
- **Hairline Thresholds:** Where division is functionally necessary (such as index rows or metadata splits), single 1px solid lines tinted in `#1f2026` are used. No colored left-borders or heavy surrounding frames are permitted.
- **Cartographic Illumination:** Contrast and visual emphasis emerge naturally from the geodata visuals, such as satellite raster maps or choropleth plots, illuminating the surrounding monochromatic space.

## Shapes

The geometric framework follows Level 0 (Sharp). In keeping with classical atlas indexing and scientific report prints, all components feature crisp 90-degree right angles (`0px` border-radius). 

Containers avoid pill-shaped capsules, curved chip containers, and softened borders. This architectural angularity gives the portfolio an archival, precise physical journal feel.

## Components

### Index Project Row (`.index-row`)
The central presentation mechanism for research and engineering case studies:
- **Structure:** Arranged as a flat, horizontal row spanning the content column without an outer enclosure box.
- **Grid Flow:** Desktop renders four inline spans: Category/Tags, Title & Abstract body, Technology Meta, and an optional 120px rectangular raster thumbnail.
- **Hover Behavior:** No dramatic scaling or drop shadows. A subtle background transition to `#121215` and a shift of the headline color to `#e85d04` provides quiet feedback.
- **Separation:** Rows are punctuated solely by a single bottom border (`1px solid #1f2026`).

### Buttons and Actions
- **Primary:** Solid high-contrast rectangular blocks. `#f4f4f6` background with `#050506` text, transitioning on hover to `#e85d04` with white text. Zero border radius.
- **Tertiary / Citation Link:** Unbordered text actions featuring an underlined anchor or a direct citation icon (`↗`). They inherit `body-md` typography in `#e85d04`.

### Metadata and Citations
- **Data Attributes:** Presented as raw text paired values (e.g., `DOI · 10.1145/...`) separated by mid-dots. No pills, badges, or enclosed capsules.
- **BibTeX Block:** Unadorned flat containers styled with background `#121215`, 1px hairline `#1f2026`, zero radius, and clean text padding.

### Raster Showcase & Data Figures
- **Figure Presentations:** Spatial maps and statistical charts are set edge-to-edge within their grid spans without inset frames or floating drop shadows.
- **Captions:** Positioned flush beneath figures in `label-sm` with color `#636573`, delivering concise technical context without uppercase decoration.
