# dede

![Currently brewing](https://img.shields.io/badge/Currently_brewing-111111?style=flat-square)

A code-based design system for React — **de**sign and **de**velop: design
tokens, layout primitives and components, documented at
**[dede.style](https://dede.style)** by a site built from its own components.

**Currently brewing.** v0.1 is a first handful of components, with more to
come. The API may still change.

## What is in it

- **Tokens** — colour roles over one tinted neutral ramp, with light and dark
  modes; spacing, type, radius, shadow, motion and more. All CSS custom
  properties, and also exported as W3C DTCG JSON for design tools.
- **Layout** — `Section › Stack › Slot › Sleeve`, plus `Grid`. Spacing is
  fluid between regions and fixed inside them, and every breakpoint measures
  the Section, not the viewport.
- **Components** — Button, IconButton, Icon, Card, Field, TextInput, Select,
  Segmented, Switch, Checkbox, Radio and their groups, and Table. Each one is
  checked for contrast and accessibility as it is built.
- **Icons** — a set of glyphs from Boxicons, imported one at a time, so only
  the ones you use ship.

It is deliberately monochrome: emphasis comes from ink, contrast and weight,
and colour is kept for status.

## Install

```sh
npm install @dede-style/ui
```

React 19 is a peer dependency.

## Use

Import the styles once, in the file that wraps every page, and set the mode on
`<html>`. In a Next.js app that is `app/layout.tsx`:

```tsx
// app/layout.tsx
import "@dede-style/ui/styles.css"
import type { ReactNode } from "react"

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" data-mode="light"> {/* or "dark" */}
            <body>{children}</body>
        </html>
    )
}
```

In another setup, import the stylesheet in your entry file (such as
`main.tsx`) and put `data-mode` on the `<html>` element in `index.html`.

To switch mode while the app runs, change the attribute. It works on any
element too, switching just that part of the page.

`styles.css` is the whole stylesheet: a reset, the tokens, base styles, layout
and every component, in that order. If you already have a reset, import the
parts instead — `reset.css`, `tokens.css`, `base.css`, `layout.css` and
`styles/<component>.css`.

Then build a page from Sections:

```tsx
// app/page.tsx
import { Section, Stack, Slot, Sleeve, Button } from "@dede-style/ui"

export default function Page() {
    return (
        <Section>
            <Stack lanes={{ base: 1, md: "1|1" }}>
                <Slot>
                    <Sleeve>
                        <h1>Hello, dede</h1>
                        <p>A heading, a line of text and an action.</p>
                        <Button variant="primary">Get started</Button>
                    </Sleeve>
                </Slot>
            </Stack>
        </Section>
    )
}
```

The [Getting started](https://dede.style/getting-started) guide goes further.

## Make it yours

Every token is a CSS custom property, so you restyle dede from your own
stylesheet, imported after dede's — never by editing dede's files. Override the
roles (`--color-surface`, `--color-text-primary` and the rest) rather than the
ramp underneath them.

Colours change with the mode, so set a colour for both light and dark:

```css
[data-mode="light"] { --color-surface: #faf8f5; }
[data-mode="dark"]  { --color-surface: #1c1a17; }
```

Everything else is the same in both modes, so one rule does it:

```css
:root { --card-radius: 12px; }
```

## Docs

- **[dede.style](https://dede.style)** — every token, layout primitive and
  component, with live properties and copyable code.
- **[DESIGN.md](https://dede.style/DESIGN.md)** — the whole system in one file,
  for AI agents and design tools; also in this package.
- **`docs/`** — one markdown file per component, with its props.
- **`tokens/`** — the tokens as W3C DTCG JSON: one file of shared values, one
  each for light and dark, and a resolver that joins them.

## Licence

The code is [MIT](./LICENSE). The icon artwork is derived from
[Boxicons](https://boxicons.com) and licensed
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); see
[NOTICE](./NOTICE) for the attribution to keep if you redistribute it, and
the credit a site that shows the icons gives.

Made by Steve Tearle.
