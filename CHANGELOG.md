# Changelog

## 0.1.2 — 2026-10-27

### Breaking

- **`queryContainer` is renamed `frame`** on Section, and its class
  `dede-section--query-container` is now `dede-section--frame`. A top-level
  Section no longer carries any frame class: every Section is a frame by
  position, and one inside another is not unless it sets `frame`.
- **`iconGithub` is renamed `iconLogoGithub`.** Brand marks share the
  `iconLogo` prefix.
- **Section `bg` takes surface roles**: `surface`, `raised`, `sunken`. The old
  values (`surface-1`, `bg-overlay` …) never painted anything; a CSS value is
  no longer accepted. A bespoke colour is a `className` with your own token.

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
