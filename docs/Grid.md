# Grid

Tiles a collection of unknown count — cards, images, logos — into as many equal columns of at least `minColumnWidth` as fit, reflowing with its own width. Renders a list (`<ul>`), wrapping each child in an `<li>`.

```tsx
import { Grid } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `as` | `ul` · `ol` · `div` | `ul` | element to render. ul by default, wrapping each child in an li; ol when order matters; div when it is not a collection |
| `minColumnWidth` | string | `16rem` | the narrowest a column may be; as many columns as fit, then wrap. Any CSS length; a bare number is px |
| `maxColumns` | number | `0` | the most columns allowed. Omit (0 here) for no limit. In code it can change by breakpoint: { base: 1, sm: 3 } |
| `gap` | `0` · `0-25` · `0-5` · `1` · `2` · `3` · `4` · `6` · `8` | `4` | space between items, a spacing step |
| `gapScale` | `component` · `layout` | `component` | component for a fixed gap, layout for one that grows with the Section |
| `ratio` | string | — | a fixed aspect ratio for every cell, such as 16:9. Blank keeps each item's natural height |
| `justify` | `stretch` · `start` · `center` · `end` | `stretch` | where each item sits across its cell. Default stretch fills the column |
| `align` | `stretch` · `start` · `center` · `end` | `stretch` | where each item sits down its cell. Default stretch makes every item in a row the same height |
| `stretch` | `true` · `false` | `true` | when there are fewer items than columns, they widen to fill the row. Off leaves the spare columns empty |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/layout/grid

_Generated from the component's schema by `npm run build:docs`._
