---
version: alpha
name: dede
description: "A monochrome, code-based design system for React: tokens, layout primitives and components (@dede-style/ui)."
colors:
  primary: "#000000"
  control-fill: "#161616"
  control-track: "#808080"
  control-border: "#808080"
  brand: "#000000"
  surface: "#f8f8f8"
  surface-raised: "#ffffff"
  surface-sunken: "#f2f2f2"
  surface-inverse: "#161616"
  wash: "#0000000a"
  scrim: "#1616167a"
  shadow: "#1616161f"
  text-primary: "#161616"
  text-secondary: "#555555"
  text-tertiary: "#636363"
  text-inverse: "#f8f8f8"
  state-hover: "#1616160a"
  state-pressed: "#16161614"
  state-selected: "#16161614"
  button-bg-primary: "#161616"
  button-bg-secondary: "#1616160a"
  button-bg-destructive: "#d61f21"
  segmented-thumb: "#ffffff"
  table-stripe: "#00000005"
  table-selected: "#0000000f"
  table-hover: "#0000000a"
  icon-primary: "#222222"
  icon-secondary: "#636363"
  icon-tertiary: "#808080"
  border-subtle: "#dedede"
  border-default: "#cecece"
  border-strong: "#9e9e9e"
  border-focus: "#161616"
  success: "#007e35"
  success-strong: "#037231"
  success-surface: "#f0fdf4"
  success-border: "#80b995"
  error: "#d61f21"
  error-strong: "#bf1e20"
  error-surface: "#fef2f2"
  error-border: "#ce9c9d"
  warning: "#a75900"
  warning-strong: "#965103"
  warning-surface: "#fffbeb"
  warning-border: "#c3ad51"
  info: "#2563eb"
  info-strong: "#235ad1"
  info-surface: "#eff6ff"
  info-border: "#91abcd"
typography:
  h1:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: 1.875rem
    fontWeight: 700
    lineHeight: 1.15
  h2:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.15
  h3:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.15
  h4:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.15
  h5:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.15
  h6:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.15
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.4
  prose:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25
  caption:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.4
  button:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: 1rem
    fontWeight: 500
    lineHeight: 1
  code:
    fontFamily: "ui-monospace, Consolas, monospace"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1
rounded:
  "0": 0
  "1": 2px
  "2": 4px
  "4": 8px
  "6": 12px
  "8": 16px
  "12": 24px
  "16": 32px
  "full": 9999px
spacing:
  component-0: 0px
  component-0-25: 1px
  component-0-5: 2px
  component-1: 4px
  component-2: 8px
  component-3: 12px
  component-4: 16px
  component-5: 20px
  component-6: 24px
  component-8: 32px
  component-10: 40px
  component-12: 48px
  component-16: 64px
components:
  button-primary:
    backgroundColor: "{colors.button-bg-primary}"
    textColor: "{colors.text-inverse}"
    typography: "{typography.button}"
    rounded: "{rounded.4}"
    height: 40px
    padding: 16px
  button-secondary:
    backgroundColor: "#efefef"
    textColor: "{colors.text-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.4}"
    height: 40px
    padding: 16px
  button-tertiary:
    textColor: "{colors.text-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.4}"
    height: 40px
    padding: 16px
  button-destructive:
    backgroundColor: "{colors.button-bg-destructive}"
    textColor: "{colors.text-inverse}"
    typography: "{typography.button}"
    rounded: "{rounded.4}"
    height: 40px
    padding: 16px
  text-input:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.4}"
    height: 40px
    padding: 12px
  select:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.4}"
    height: 40px
    padding: 12px
  card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.4}"
    padding: 24px
  checkbox:
    size: 20px
    rounded: "{rounded.2}"
  checkbox-checked:
    backgroundColor: "{colors.control-fill}"
    textColor: "{colors.text-inverse}"
    size: 20px
    rounded: "{rounded.2}"
  switch-off:
    backgroundColor: "{colors.control-track}"
    height: 24px
    width: 40px
    rounded: "{rounded.full}"
  switch-on:
    backgroundColor: "{colors.control-fill}"
    height: 24px
    width: 40px
    rounded: "{rounded.full}"
  segmented:
    backgroundColor: "#eeeeee"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.4}"
    height: 40px
  segmented-selected:
    backgroundColor: "{colors.segmented-thumb}"
    textColor: "{colors.text-primary}"
  table-row-selected:
    backgroundColor: "#e9e9e9"
---

# dede

> Generated from `design-system/styles/tokens.css` and the component schemas by
> `npm run build:docs`. Do not edit by hand. Token values in the front matter
> are the **light** mode; dark mode is listed under Colors. Every token is also
> a CSS custom property — `colors.text-primary` is `var(--color-text-primary)`,
> `rounded.4` is `var(--radius-4)`, `spacing.component-3` is
> `var(--space-component-3)`. Write the custom property, not the hex.

## Overview

dede (DEsign + DEvelop) is a code-based design system for React: tokens, layout
primitives and components, published as `@dede-style/ui`. It is deliberately
**monochrome** — emphasis comes from solid ink, contrast and weight, never from
an accent colour. Colour is reserved for status (success, error, warning,
info). The voice is quiet and precise: generous space, one strong line where a
line is needed, nothing decorative.

Install and import once:

```tsx
import "@dede-style/ui/styles.css"
import { Section, Stack, Slot, Sleeve, Button } from "@dede-style/ui"
```

Set the mode on `<html>`: `<html data-mode="light">` or `data-mode="dark"`. The
attribute can be set on any element to switch just that subtree.

## Colors

Colours are **roles**, named for their job, never for their hue. Roles point at
one neutral ramp (`--neutral-0` … `--neutral-100`, where the number is the OKLCH
lightness); each mode points at different steps. Override roles, not the ramp.

- **Surfaces obey elevation in both modes:** `surface` is the page,
  `surface-raised` (cards, fields, popovers) is lighter, `surface-sunken` darker.
- **Text** has three ranks plus `text-inverse` for text on a filled control.
  Prose is `text-secondary`; headings, `strong`, `code` and labels are
  `text-primary`.
- **Films** are translucent and lay over whatever is behind them: `wash` (a chip,
  a track), `state-hover`, `state-pressed`, `state-selected`, `scrim`, `shadow`.
  Films compose — a hover over a wash is one step deeper.
- **Control** roles are the parts of an interactive control: `control-fill` (a
  checked or on control), `control-track` (a switch's off ground),
  `control-border` (an empty control's edge, held to 3:1).
- **Status** families have four members: the colour itself (text and icons),
  `-strong` (focused while in that state), `-surface` (a tint) and `-border`.
- `primary` is the brand ink. There is no accent.

Every text and status pairing is verified for WCAG contrast on each build.

| Role | Light | Dark | CSS |
|---|---|---|---|
| `control-fill` | `#161616` | `#f8f8f8` | `var(--color-control-fill)` |
| `control-track` | `#808080` | `#9e9e9e` | `var(--color-control-track)` |
| `control-border` | `#808080` | `#9e9e9e` | `var(--color-control-border)` |
| `brand` | `#000000` | `#ffffff` | `var(--color-brand)` |
| `surface` | `#f8f8f8` | `#161616` | `var(--color-surface)` |
| `surface-raised` | `#ffffff` | `#1b1b1b` | `var(--color-surface-raised)` |
| `surface-sunken` | `#f2f2f2` | `#0b0b0b` | `var(--color-surface-sunken)` |
| `surface-inverse` | `#161616` | `#f8f8f8` | `var(--color-surface-inverse)` |
| `wash` | `#0000000a` | `#ffffff0a` | `var(--color-wash)` |
| `scrim` | `#1616167a` | `#000000a3` | `var(--color-scrim)` |
| `shadow` | `#1616161f` | `#0000007a` | `var(--color-shadow)` |
| `text-primary` | `#161616` | `#f8f8f8` | `var(--color-text-primary)` |
| `text-secondary` | `#555555` | `#cecece` | `var(--color-text-secondary)` |
| `text-tertiary` | `#636363` | `#9e9e9e` | `var(--color-text-tertiary)` |
| `text-inverse` | `#f8f8f8` | `#161616` | `var(--color-text-inverse)` |
| `state-hover` | `#1616160a` | `#f8f8f80a` | `var(--color-state-hover)` |
| `state-pressed` | `#16161614` | `#f8f8f814` | `var(--color-state-pressed)` |
| `state-selected` | `#16161614` | `#f8f8f814` | `var(--color-state-selected)` |
| `button-bg-primary` | `#161616` | `#f8f8f8` | `var(--button-bg-primary)` |
| `button-bg-secondary` | `#1616160a` | `#f8f8f814` | `var(--button-bg-secondary)` |
| `button-bg-destructive` | `#d61f21` | `#f87171` | `var(--button-bg-destructive)` |
| `segmented-thumb` | `#ffffff` | `#3a3a3a` | `var(--segmented-thumb)` |
| `table-stripe` | `#00000005` | `#ffffff05` | `var(--table-stripe)` |
| `table-selected` | `#0000000f` | `#ffffff0f` | `var(--table-selected)` |
| `table-hover` | `#0000000a` | `#ffffff0a` | `var(--table-hover)` |
| `icon-primary` | `#222222` | `#f2f2f2` | `var(--color-icon-primary)` |
| `icon-secondary` | `#636363` | `#bebebe` | `var(--color-icon-secondary)` |
| `icon-tertiary` | `#808080` | `#808080` | `var(--color-icon-tertiary)` |
| `border-subtle` | `#dedede` | `#333333` | `var(--color-border-subtle)` |
| `border-default` | `#cecece` | `#3a3a3a` | `var(--color-border-default)` |
| `border-strong` | `#9e9e9e` | `#555555` | `var(--color-border-strong)` |
| `border-focus` | `#161616` | `#f8f8f8` | `var(--color-border-focus)` |
| `success` | `#007e35` | `#4ade80` | `var(--color-success)` |
| `success-strong` | `#037231` | `#5fe18f` | `var(--color-success-strong)` |
| `success-surface` | `#f0fdf4` | `#052e16` | `var(--color-success-surface)` |
| `success-border` | `#80b995` | `#186735` | `var(--color-success-border)` |
| `error` | `#d61f21` | `#f87171` | `var(--color-error)` |
| `error-strong` | `#bf1e20` | `#f88181` | `var(--color-error-strong)` |
| `error-surface` | `#fef2f2` | `#450a0a` | `var(--color-error-surface)` |
| `error-border` | `#ce9c9d` | `#a22422` | `var(--color-error-border)` |
| `warning` | `#a75900` | `#fbbf24` | `var(--color-warning)` |
| `warning-strong` | `#965103` | `#fbc63e` | `var(--color-warning-strong)` |
| `warning-surface` | `#fffbeb` | `#451a03` | `var(--color-warning-surface)` |
| `warning-border` | `#c3ad51` | `#944110` | `var(--color-warning-border)` |
| `info` | `#2563eb` | `#60a5fa` | `var(--color-info)` |
| `info-strong` | `#235ad1` | `#72affa` | `var(--color-info-strong)` |
| `info-surface` | `#eff6ff` | `#172554` | `var(--color-info-surface)` |
| `info-border` | `#91abcd` | `#2c52c1` | `var(--color-info-border)` |

Eight-digit hex is a translucent film (the last two digits are alpha).

## Typography

One family stack (the system UI face) until real faces are chosen; `code` is
the system monospace. Sizes are Tailwind's scale in `rem`, and the **root font
size is fluid** — about 14px on a phone, 16px from 800px wide — so every step
scales together and the ratios between them never change. Headings carry their
own size: choose the level, not a class. Labels are `sm` and snug; prose is
`text-secondary` at 1.5 leading.

| Level | Size | Weight | Leading | Use |
|---|---|---|---|---|
| `h1` | `--font-size-3xl` (30px) | 700 | 1.15 | page title |
| `h2` | `--font-size-2xl` (24px) | 600 | 1.15 | band heading |
| `h3` | `--font-size-xl` (20px) | 600 | 1.15 |  |
| `h4` | `--font-size-lg` (18px) | 600 | 1.15 |  |
| `h5` | `--font-size-base` (16px) | 600 | 1.15 |  |
| `h6` | `--font-size-sm` (14px) | 600 | 1.15 |  |
| `body` | `--font-size-base` (16px) | 400 | 1.4 | UI text, the inherited default |
| `prose` | `--font-size-base` (16px) | 400 | 1.5 | paragraphs, text-secondary |
| `label` | `--font-size-sm` (14px) | 400 | 1.25 | form labels |
| `caption` | `--font-size-xs` (12px) | 400 | 1.4 | hints, descriptions |
| `button` | `--font-size-base` (16px) | 500 | 1 | at the default 40px; 14px at 32, 12px at 24 |
| `code` | `--font-size-sm` (14px) | 500 | 1 | inline, 0.9em of its context |

## Layout

Layout is four primitives in a fixed chain, with `Grid` a peer of `Stack`:

```
Section > Stack > Slot > Sleeve > content
```

- **Section** is a full-width band and the only query container: every `cqi`
  value and every breakpoint measures the Section, not the viewport.
- **Stack** divides the band into **lanes** and owns the band's padding.
  `lanes="2|1"` is two lanes; a weight is a **column count**, so arrangements
  whose totals share a multiple line up (`"2|1"` with `"1|1|1"`).
- **Slot** is one region in a lane. **Sleeve** spaces the content inside a region,
  one column, on the fixed component scale.
- **Grid** tiles a collection of unknown count into as many columns of at least
  `minColumnWidth` as fit. It renders a `<ul>`.

**Two spacing scales.** `space-layout-*` is **fluid** and separates regions
(Stack gaps and band padding); `space-component-*` is **fixed** and spaces
content inside a region or a component. A heading and the table it labels use
the fixed scale: that distance does not change with the window.

Fluid layout steps (`cqi` is 1% of the Section's width):

| Token | Min | Max | CSS |
|---|---|---|---|
| `--space-layout-0` | 0 | 0 | `0` |
| `--space-layout-0-25` | 3px | 6px | `clamp(3px, 0.5cqi, 6px)` |
| `--space-layout-0-5` | 6px | 12px | `clamp(6px, 1cqi, 12px)` |
| `--space-layout-1` | 12px | 24px | `clamp(12px, 2cqi, 24px)` |
| `--space-layout-1-5` | 18px | 36px | `clamp(18px, 3cqi, 36px)` |
| `--space-layout-2` | 24px | 48px | `clamp(24px, 4cqi, 48px)` |
| `--space-layout-3` | 36px | 72px | `clamp(36px, 6cqi, 72px)` |
| `--space-layout-4` | 48px | 96px | `clamp(48px, 8cqi, 96px)` |
| `--space-layout-6` | 72px | 144px | `clamp(72px, 12cqi, 144px)` |
| `--space-layout-8` | 96px | 192px | `clamp(96px, 16cqi, 192px)` |

Fixed component steps are in the front matter as `spacing.component-*` (4px × N).

Rules that keep pages consistent:

- **One row is one Stack.** A Stack with nothing to arrange is not written.
- Band rhythm: 24px inside a band, 48px at the frame (edges, seams). All four
  Stack spacing dials default to step 2.
- Text sets no layout — no `max-width` on a paragraph. Measure comes from the
  lane or the Stack's `maxWidth` cap (`prose`, `panel`, `content`, `wide`).
- Gap gives the uniform rhythm; margin only the asymmetry (more space above a
  heading than below).
- Components **hug** their content by default; `fullWidth` fills.

## Elevation & Depth

Depth is carried by **fill first**: raised surfaces are lighter than the page
and sunken ones darker, in both modes. Shadows reinforce a raised surface but
are never the only signal — on dark a black shadow barely shows. A card is
`surface-raised` with `shadow-2`; a popover or list floats with `shadow-3` and a
subtle border. Interaction states are films, not new colours.

| Token | Value |
|---|---|
| `--shadow-0` | `none` |
| `--shadow-1` | `0 1px 2px 0 color-mix(in srgb, oklch(0.20 0 0) 12%, transparent)` |
| `--shadow-2` | `0 2px 8px -2px color-mix(in srgb, oklch(0.20 0 0) 12%, transparent)` |
| `--shadow-3` | `0 8px 24px -4px color-mix(in srgb, oklch(0.20 0 0) 12%, transparent)` |
| `--shadow-4` | `0 16px 40px -8px color-mix(in srgb, oklch(0.20 0 0) 12%, transparent)` |

## Shapes

Corners come from one radius scale (2px × N). Controls, cards and inputs use
`rounded.4` (8px) by default; each has a theme lever (`--button-radius-rounded`,
`--card-radius`, `--text-input-radius`, `--segmented-radius`). Pills and circles
use `rounded.full`. A nested corner is derived (outer radius minus the inset),
never a second token.

## Components

Controls share one height ramp — 32 / 40 / 48px (`size="8" | "10" | "12"`),
default 40 — so a button, a field, a select and a segmented control in one row
line up. A control's icon is half its height. Every component's props, values
and defaults are in its own file:

- [Button](docs/Button.md) — A button that does something on this page.
- [Card](docs/Card.md) — A surface that holds content.
- [Checkbox](docs/Checkbox.md) — Include this option, independently of the others.
- [CheckboxGroup](docs/CheckboxGroup.md) — A labelled set of Checkboxes: a fieldset whose legend names the set.
- [Field](docs/Field.md) — The label, hint and error around one form control (TextInput, Select).
- [Grid](docs/Grid.md) — Tiles a collection of unknown count — cards, images, logos — into as many equal columns of at least `minColumnWidth` as fit, reflowing with its own width.
- [Icon](docs/Icon.md) — An SVG glyph from `@dede-style/ui/icons`, sized on the element ramp and coloured by `currentColor`.
- [IconButton](docs/IconButton.md) — A button with an icon and no visible words.
- [Radio](docs/Radio.md) — One option of a RadioGroup.
- [RadioGroup](docs/RadioGroup.md) — One choice from a set where every option is visible and can carry a description.
- [Section](docs/Section.md) — A full-width band of the page and the measuring stick for everything inside it: spacing and breakpoints measure the Section.
- [Segmented](docs/Segmented.md) — One choice from two to four short options, every option on screen in one track.
- [SegmentedItem](docs/SegmentedItem.md) — One segment of a Segmented: its value, its words (or an icon in their place) and its accessible name.
- [Select](docs/Select.md) — One choice from a list that opens over the page.
- [Sleeve](docs/Sleeve.md) — Spaces the content inside one region — a heading, its text, a table — in a single column on the fixed component scale.
- [Slot](docs/Slot.md) — One region in a Stack lane.
- [Stack](docs/Stack.md) — Divides a band into lanes and owns its padding and gap.
- [Switch](docs/Switch.md) — A setting that takes effect immediately: on or off.
- [Table](docs/Table.md) — Rows of records in a real `<table>`, built from TableHead, TableBody, TableFoot, TableRow and TableCell.
- [TextInput](docs/TextInput.md) — One line of typed text.

## Do's and Don'ts

- **Do** compose pages from `Section > Stack > Slot > Sleeve`; **don't** write
  ad-hoc flex or grid containers for page layout.
- **Do** use a role (`var(--color-text-secondary)`); **don't** write a hex, an
  `rgb()` or a `color-mix()` at a call site.
- **Do** keep colour for status; **don't** introduce an accent colour.
- **Do** use the component props (`variant`, `size`, `shape`); **don't** restyle a
  component's box from outside.
- **Do** name an icon-only control (`IconButton label`); **don't** put
  `aria-label` on the glyph.
- **Do** mark an optional field in its label ("Middle name (optional)");
  **don't** add a required asterisk.
- **Don't** set a `max-width` on text, or a layout margin between regions — use
  the lane and the Stack gap.
- **Do** maintain WCAG AA contrast; every role pairing here already clears it.

## Responsive Behavior

Responsive values are **one mobile-first object**, measured against the Section
(the query container), with Tailwind's breakpoint names and numbers:

```tsx
<Stack lanes={{ base: 1, md: "1|1", lg: "2|1" }}>
```

Each key applies at that width and up. It works for Stack `lanes` and `reverse`
and Grid `maxColumns`. A Grid also reflows on its own from `minColumnWidth`.
Type and layout spacing are fluid, so most pages need no breakpoints at all.
Below 768px text inputs and selects hold 16px text so iOS does not zoom on
focus; touch rows in lists are at least 40px.

| Name | Min width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

## Agent Prompt Guide

When building with dede:

1. Import `@dede-style/ui/styles.css` once; set `data-mode` on `<html>`.
2. A page is a list of `<Section>`s. Inside each, one `<Stack>` per row, with
   `lanes` for the columns. Each lane holds a `<Slot>` (or a `Grid` or nested
   `Stack`); inside a Slot, a `<Sleeve>` spaces a heading and what follows it.
3. A collection of cards or items is a `<Grid>` of `<Card>`s, not a Stack.
4. Text sits in a `"1|1"` lane or under a Stack `maxWidth="prose"` cap.
5. Forms: `<Field label hint error>` around one control (`TextInput`, `Select`);
   choices are `Checkbox`, `RadioGroup`, `Switch` or `Segmented` (2–4 short
   options).
6. Spacing between regions: Stack `gap` / padding steps. Inside content: Sleeve
   `gap`. Never margins between regions.
7. Colours, radii and spacing come from `var(--…)` custom properties, never
   literals.

Example — a hero with copy and a figure, then a card grid:

```tsx
<Section>
  <Stack lanes={{ base: 1, md: "1|1" }} align="center">
    <Slot>
      <Sleeve>
        <h1>Title</h1>
        <p>One or two sentences of summary.</p>
        <Button variant="primary">Get started</Button>
      </Sleeve>
    </Slot>
    <Slot><img src="/figure.png" alt="" /></Slot>
  </Stack>
</Section>
<Section>
  <Stack>
    <Grid minColumnWidth="16rem" maxColumns={3}>
      <Card><h3>One</h3><p>Detail.</p></Card>
      <Card><h3>Two</h3><p>Detail.</p></Card>
      <Card><h3>Three</h3><p>Detail.</p></Card>
    </Grid>
  </Stack>
</Section>
```
