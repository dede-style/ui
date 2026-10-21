# Segmented

One choice from two to four short options, every option on screen in one track. Real radio inputs underneath, so it works with the keyboard and in forms. Children are SegmentedItems.

```tsx
import { Segmented } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `label` | string | — | the group's accessible name: what the options are a choice of. Required |
| `size` | `8` · `10` · `12` | `10` | height: 32, 40 (default) or 48px, matching Button |
| `fullWidth` | `true` · `false` | `false` | fill the container. Segments stay equal widths |
| `isDisabled` | `true` · `false` | `false` | disables the whole control; the selected option stays visible |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/components/segmented

_Generated from the component's schema by `npm run build:docs`._
