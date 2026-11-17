# Portfolio: future interaction options

Date: 2026-11-16. Status: **unselected future options**, not commitments, implementation requirements or acceptance evidence. Existing behavior mentioned below is a starting point, not new work claimed here.

Choose an option only after identifying a user problem and checking current implementation. Offer up to three evaluated choices, recommend one and ask the owner which to pursue. Keep existing priorities and design constraints. Effort is a rough relative estimate (S/M/L), not a delivery promise. No new dependency, service, browser session or deployment is authorized by this list.

[DESIGN.md](../DESIGN.md) and [UI rules](../.agents/rules/ui-design.md) own design. Keep zero-build HTML/CSS/minimal JavaScript, GitHub Pages URLs, existing fonts and square shapes. Existing FLIP drawers, list movement, BibTeX disclosure and View Transitions are foundations to refine, not missing features.

## Options to evaluate

| Option | Potential benefit / interaction | Effort | Boundary or prerequisite |
|---|---|---|---|
| Project evidence explorer | Expand a preview into genuine screenshots, diagrams, citations and links. | M | Build on existing drawers; avoid heavy live embeds or fabricated evidence. |
| Image/title continuity | Refine project-thumbnail and title movement into its case study. | M | Existing shared-element transitions need inspection; feature-detect and retain normal links. |
| Before/after map comparison | Drag or keyboard-adjust a divider between aligned observations or model outputs. | M | Requires genuinely comparable imagery, honest legends and text alternatives. |
| Inspectable architecture SVG | Select a pipeline stage to highlight connections and show evidence. | M | Use actual architecture, HTML controls and keyboard focus; no heavy diagram framework. |
| Project-list continuity | Refine existing filter/sort FLIP so retained projects remain easy to track. | S | Avoid duplicate animation layers; respect reduced motion. |
| Evidence tabs in a drawer | Switch between approach, output and limitations while maintaining context. | M | Do not hide essential reading or break existing URL/focus behavior. |
| Annotated image inspection | Reveal a meaningful explanation beside selected map or screenshot features. | M | No hover-only hotspots; preserve a complete readable caption. |
| Lightweight image zoom | Inspect a high-resolution artifact without opening a notebook export. | M | Manage image weight, focus restoration and mobile pan/zoom conventions. |
| Citation/provenance previews | Open compact contextual details next to a citation or method. | S | Keep DOI links and existing BibTeX access; use inline fallbacks. |
| Keyboard project navigator | Offer quick navigation across projects and publications. | M | Ordinary navigation remains primary; no framework or search service required. |
| Case-study section navigator | Show current section and let readers jump between methods, results and limits. | S | Use anchors and progressive enhancement; no scroll hijacking. |
| Copyable evidence links | Copy a link to a specific figure, citation or open drawer with clear feedback. | S | Stable IDs, query state and clipboard failure fallback. |
| Progressive BibTeX disclosure | Evaluate native details/summary for useful zero-JavaScript citation access. | S | Already on DESIGN.md roadmap; preserve current copy and animation behavior where useful. |
| Intent-based prefetch refinement | Reduce perceived delay on likely project navigation. | M | Inspect existing speculation rules; avoid downloading large notebook exports. |
| Focused reading-progress accent | Consider a small optional progress marker on long case studies. | M | Conditional only: current design excludes broad ScrollTimeline/parallax use; requires a specific design decision. |

## Selection and acceptance

For a selected option, record the user problem, existing behavior, intended change, data prerequisites, implementation boundary and success measure in the project's normal task/spec process. Compare against leaving the experience unchanged. Preserve keyboard and touch operation, visible focus, reduced-motion alternatives, stable identity and useful empty/error states. Profile representative content on mobile before applying animation broadly. Test only the selected behavior using existing project commands and authorized visual checks.

## Research sources

Research retrieved 2026-11-16; recheck compatibility before implementation. These sources establish available techniques, not approval or proof of a better experience:

- [Svelte animation](https://svelte.dev/docs/svelte/animate) and [transitions](https://svelte.dev/docs/svelte/svelte-transition).
- [SvelteKit View Transitions](https://svelte.dev/docs/kit/faq#How-do-I-use-the-view-transitions-API) and [Kit 3 migration](https://svelte.dev/docs/kit/migrating-to-sveltekit-3).
- [Native View Transition demonstrations](https://view-transitions.chrome.dev/).
- [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using) and [SVG interaction](https://www.w3.org/TR/SVG2/interact.html).
