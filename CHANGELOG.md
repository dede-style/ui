# Changelog

## 0.1.6 — 2026-11-21

### Changed

- **Disabled is fainter and the same everywhere:** every disabled control
  now dims to `--opacity-disabled`, 32%. It was 64% on Button, IconButton and
  Segmented, and 48% on fields and the choice rows. Buttons in particular
  were hard to tell from enabled ones. A site that wants a different value
  sets `--opacity-disabled` once on `:root`, and every control follows.

### Added

- `--opacity-disabled` (`var(--opacity-8)`), the opacity of every disabled
  control.
- **Figure** (`@dede-style/ui/figure`): content with an optional caption
  under it. The content is anything you pass: your own `<img>`, a
  framework's image, a `<video>`, an SVG or a component; Figure never
  renders the image itself. It fills its lane. `caption` makes it a
  `<figure>` with a `<figcaption>` (small tertiary text, 12px below);
  without one it is a plain `<div>`. `surface="sunken"` puts the content in
  a rounded panel, with padding per edge (`paddingTop`, `paddingBottom`,
  `paddingStart`, `paddingEnd`: a layout step or `"none"`, default step 2),
  `mode` (`light`, `dark`, `inverse`), `panelRatio` for a fixed shape and
  `overflow` (`hidden`, the default, or `visible`). `contentRatio` crops the
  content to a shape; `fit` (0 to 1) sets its width as a share of the
  frame; `justify` and `align` (`start`, `center`, `end`) place it.
  `contentPosition` (`center`, `top`, `bottom`, `start`, `end`) says which
  part a `contentRatio` crop keeps. Ratios are written with a colon
  (`"16:9"`); `"16/9"` and `"16 / 9"` work too, decimals allowed, and a
  value that is not a ratio is ignored with a warning in development.
  `border` draws a hairline over the content; `rounded` rounds its corners.
  The panel is painted with `--color-surface-sunken` at zero specificity,
  so a site recolours one panel by setting that role on its own class. Its
  stylesheet is `figure.css`, in `styles.css`.
- **`--figure-radius`** (8px, from `--radius-4`): the corner of every
  panel, and of content with `rounded`.

## 0.1.5 — 2026-11-19

### Added

- **Badge** (`@dede-style/ui/badge`): a short label in a pill, 24px tall and
  never narrower than it is tall, so one character is a circle and a word a
  pill. `variant` sets the emphasis: `quiet` (default) or `strong`. `tone`
  sets the meaning: `neutral` (default), `info`, `success`, `warning` or
  `error`. `border` (default off) adds an inset edge in the tone's border
  colour that takes no room; strong has no border, since its fill is the
  edge. The text is regular weight. A label wider than its container is cut
  with an ellipsis. Its stylesheet is `badge.css`, in `styles.css`.
- Badge has no component tokens. Its colour rules have zero specificity, so
  a site's own class on a badge (`.badge-new { background-color: …; color:
  … }`) wins whatever order the stylesheets load in. dede checks contrast
  for its own colours only.
- **Tooltip** (`@dede-style/ui/tooltip`): a short line of text beside a
  control. A wrapper: `<Tooltip content="Matching"><IconButton … /></Tooltip>`
  anchors to its one child. `placement`: `above` (default), `below`, `start`,
  `end`; `align`: `center` (default), `start`, `end`. It shows on keyboard
  focus at once and on hover after a delay, never on touch, and hides at once
  on leave, blur, Escape or a press. The text is hidden from screen readers,
  so the control's name must carry it. Shown in the top layer and placed
  with CSS anchor positioning, flipping at a screen edge; without anchor
  positioning it shows at the chosen side, unflipped. A disabled control
  shows none. Its stylesheet is `tooltip.css`, in `styles.css`.
- **`--tooltip-radius`** (8px, from `--radius-4`): the corner of every
  tooltip.
- **`--tooltip-delay`** (200ms, from `--motion-duration-base`): how long the
  pointer rests before a tooltip shows. A tooltip reached within that time of
  another closing opens at once.

## 0.1.4 — 2026-11-07

### Added

- **`linkAs` on Button and IconButton.** With `href`, it takes a framework's
  link component in place of the plain `<a>`: `linkAs={Link}` from
  `next/link` changes page without a full reload.
- **Button state tokens:** `--button-bg-primary-hover`,
  `--button-bg-primary-pressed`, `--button-bg-destructive-hover`,
  `--button-bg-destructive-pressed`. The filled variants' states read them in
  place of a mix written in `button.css`, so a theme can move them.

### Fixed

- **`onClick` runs when `href` is set.** The link form dropped it.
- **Hover shows only where the pointer can hover** (`@media (hover: hover)`).
  On a touch screen a tapped button no longer stays lit; press still shows.

### Docs

- **App page example corrected.** The frame is `Section as="div"`: `main` is not
  valid inside a `<section>`, and a footer inside one is not the contentinfo
  landmark. The example now shows a footer in the content lane, and `DESIGN.md`
  shows `Section as="footer"` for a footer of one band.

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
