# Slot

One region in a Stack lane. The Stack places it; the Slot can position its own content and render a semantic element (`article`, `nav`, `ul`…).

```tsx
import { Slot } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `as` | `div` · `article` · `aside` · `figure` · `header` · `footer` · `nav` · `ul` · `ol` | `div` | element to render: div by default, or article, main, aside, figure, header, footer, nav, ul, ol |
| `alignSelf` | `stretch` · `start` · `center` · `end` | `stretch` | where this slot sits in its lane, overriding the Stack's align |
| `justify` | `stretch` · `start` · `center` · `end` | `stretch` | where the slot's content sits across it |
| `align` | `stretch` · `start` · `center` · `end` | `stretch` | where the slot's content sits down it, when the slot is taller than its content |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/layout/slot

_Generated from the component's schema by `npm run build:docs`._
