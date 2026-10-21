# SegmentedItem

One segment of a Segmented: its value, its words (or an icon in their place) and its accessible name. Only valid inside a Segmented.

```tsx
import { SegmentedItem } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `label` | string | `Start` | the words on the segment. With a glyph, the accessible name instead |
| `a11yLabel` | string | — | a longer name for screen readers when the visible label is short, such as H for Horizontal |
| `glyph` | `none` · `Alert` · `AlertFill` · `ArrowDown` · `ArrowLeft` · `ArrowRight` … ([all](https://dede.style/icons)) | `none` | an icon in place of the words, for three or four options in a narrow space |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/components/segmented-item

_Generated from the component's schema by `npm run build:docs`._
