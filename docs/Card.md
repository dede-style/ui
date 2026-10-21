# Card

A surface that holds content. It paints (fill, edge, shadow, inset) but does not arrange: its width comes from the lane or Grid cell it sits in, and its children are spaced like a Sleeve's.

```tsx
import { Card } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `elevation` | `sunken` · `flush` · `raised` | `raised` | raised (default) sits above the page, flush on it, sunken below it |
| `border` | `true` · `false` | `true` | draw the card's edge. Off keeps the card the same size |
| `padding` | `none` · `3` · `4` · `5` · `6` · `8` · `10` · `12` | `6` | space inside the card, a fixed spacing step. none lets an image reach the card's edges |
| `gap` | `none` · `1` · `2` · `3` · `4` · `6` | `3` | space between the card's children. none puts an image flush against the content below it |
| `justify` | `stretch` · `start` · `center` · `end` | `stretch` | where the card's children sit across it. Default stretch fills the card's width |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/components/card

_Generated from the component's schema by `npm run build:docs`._
