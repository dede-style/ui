# Badge

A short label in a pill: a number, a status, a word. One character is a circle and a word is a pill, 24px tall either way. `variant` sets how much it stands out (`quiet` by default, or `strong`) and `tone` what it means (`neutral` by default, or `info`, `success`, `warning`, `error`). `border` adds an edge that takes no room. Plain text, not interactive.

```tsx
import { Badge } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `children` | string | — | the label, required. One character is a circle; more is a pill |
| `variant` | `quiet` · `strong` | `quiet` | how much it stands out: quiet (default) sits back, strong is a solid fill |
| `tone` | `neutral` · `info` · `success` · `warning` · `error` | `neutral` | what it means: neutral (default), or a status colour |
| `border` | `true` · `false` | `false` | draw an edge in the tone's border colour. It takes no room, so the badge stays the same size. Quiet status badges on a light page need it to read as a pill. Strong has no border; its fill is the edge |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

## Notes

- **Strong has no border; its fill is the edge.** `border` is accepted on a strong badge and changes nothing.
- **A look of your own** is your own class on the badge: `.badge-new { background-color: …; color: … }` with `<Badge className="badge-new">New</Badge>`. Badge's colour rules have zero specificity, so your class wins whatever order the stylesheets load in. dede checks contrast only for its own colours; a colour you set is yours to check.
- **A label wider than its container** is cut with an ellipsis rather than overflowing. There is no maximum width of its own: the container sets the measure.

Live examples: https://dede.style/components/badge

_Generated from the component's schema by `npm run build:docs`._
