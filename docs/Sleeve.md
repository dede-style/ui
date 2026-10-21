# Sleeve

Spaces the content inside one region — a heading, its text, a table — in a single column on the fixed component scale. Goes inside a Slot.

```tsx
import { Sleeve } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `gap` | `none` · `1` · `2` · `3` · `4` · `5` · `6` · `8` | `3` | space between children, a fixed --space-component-* step. Default 3 (12px) |
| `justify` | `stretch` · `start` · `center` · `end` | `stretch` | where children sit across the Sleeve. Anything but stretch makes each child as wide as its content |
| `alignContent` | `start` · `center` · `end` · `stretch` | `start` | where the content sits when the Sleeve is taller than it. Default start |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/layout/sleeve

_Generated from the component's schema by `npm run build:docs`._
