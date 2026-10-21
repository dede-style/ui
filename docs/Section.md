# Section

A full-width band of the page and the measuring stick for everything inside it: spacing and breakpoints measure the Section. Holds one or more Stacks; can paint a background.

```tsx
import { Section } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `as` | `section` · `div` · `header` · `nav` · `aside` · `footer` · `article` | `section` | element to render: section by default, or header, nav, aside, footer, article, div |
| `aria-label` | string | — | the band's accessible name. Set it when the band is a landmark: an unnamed section or nav is not one |
| `bg` | `none` · `surface-1` · `surface-2` · `surface-3` · `bg` · `bg-overlay` | `none` | a background for the band, from the colour roles |
| `clip` | `true` · `false` | `true` | clip content to the band. Off lets content overlap the band's edge |
| `queryContainer` | `true` · `false` | `false` | for a nested band that stands alone (a card, a demo): spacing and breakpoints inside it measure this band, not the page. Nothing inside then aligns with the rest of the page |
| `showGuides` | `true` · `false` | `false` | draw the layout guide overlay, for development |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/layout/section

_Generated from the component's schema by `npm run build:docs`._
