# Changelog

## 0.1.3 — 2026-10-28

### Breaking (types only)

- **Step props take step names, not any string.** Stack `gap`, `paddingX`,
  `paddingTop`, `paddingBottom`; Grid `gap`; Sleeve `gap`; Card `padding`
  and `gap`. A value that is not a step (`gap="7"`, `gap="none"` on Grid)
  is now a type error; it never rendered a step. The lists are exported:
  `LAYOUT_STEPS`, `COMPONENT_STEPS`, and the types `LayoutStep`,
  `ComponentStep`, `SharedStep`.

### Added

- **`--stack-space`**, one theme lever for every Stack's band default: side
  gutter, top, bottom and gap. It resolves to `var(--space-layout-2)`, so
  nothing moves until a theme sets it. A stated prop still wins, `"2"`
  included.
- **`--heading-size-1` … `--heading-size-6`**, one size per heading level.
  Each resolves to the step it used before (`h1` is `--font-size-3xl`); a
  theme may set a `clamp()` for display-sized headings instead of restyling
  `h1`.
- **Grid `as="dl"`** for term–value pairs: each child is a `<dt>`/`<dd>`
  fragment, which Grid wraps in a `<div>`, the grid item.

### Docs

- Section.md and Stack.md state that a Section has no spacing and its Stacks
  own all of it, including the space between two Sections.
- The 0.1.2 notes below are corrected: `bg` used to paint a CSS value, and
  only a top-level Section is a frame by position.
- DESIGN.md's layout table shows `--space-layout-0` as `0px`, as tokens.css
  declares it.
- Icon.md and DESIGN.md name the `iconLogo<Brand>` marks and say how to
  credit Boxicons on a site that shows the icons.

## 0.1.2 — 2026-10-27

### Breaking

- **`queryContainer` is renamed `frame`** on Section, and its class
  `dede-section--query-container` is now `dede-section--frame`. A top-level
  Section no longer carries any frame class: every top-level Section is a
  frame by position, and one inside another is not unless it sets `frame`.
- **`iconGithub` is renamed `iconLogoGithub`.** Brand marks share the
  `iconLogo` prefix.
- **Section `bg` takes surface roles**: `surface`, `raised`, `sunken`. It was a
  free string: the old role names (`surface-1`, `bg-overlay` …) never painted,
  but a CSS value did. Replace `bg="var(--color-surface)"` with `bg="surface"`,
  or with `mode` if the band changes mode. A bespoke colour is a `className`
  with your own token.

### Added

- **`mode` on Section**: `light`, `dark` or `inverse` (the opposite of the
  page's mode). It switches the band's colour tokens and paints its surface.
- **`data-mode` sets inherited text colour** on any element, so a plain
  `<footer data-mode="dark">` needs only its own background.
- **Brand marks**: `iconLogoFacebook`, `iconLogoInstagram`, `iconLogoLinkedin`,
  `iconLogoMeta`, `iconLogoThreads`, `iconLogoTiktok`, `iconLogoWhatsapp`,
  `iconLogoX`, `iconLogoYoutube` (Boxicons, CC BY 4.0; each brand's guidelines
  apply).
- **Docs**: both page shapes (site and app) and the frame rule in DESIGN.md;
  Notes sections in `Section.md`, `Stack.md` and `Button.md`.

### Fixed

- **Zero tokens carry a unit** (`--space-layout-0`, `--space-component-0`,
  `--border-0`, `--radius-0` are `0px`), so they work inside `calc()`: a Grid
  with `gap="0"` and `maxColumns` no longer falls to one column.
- **A frame and its gutter can no longer disagree**: both follow from the
  Section's position, decided in CSS.

### Notes

- A Section rendered in a portal (a dialog) is top level, so it is a frame.
- The band's Stack must be the Section's direct child for the gutter rule.

## 0.1.1 — 2026-10-21

- Dark `surface-sunken` deepened; prose links use the primary text colour.

## 0.1.0 — 2026-10-21

- First release.
