# Radio

One option of a RadioGroup. It takes its name and the selected value from the group, so it cannot be used on its own.

```tsx
import { Radio } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `label` | string | — | the visible label and the accessible name. Required |
| `description` | string | — | an optional second line under the label |
| `size` | `4` · `5` · `6` | `5` | the circle: 16, 20 (default) or 24px |
| `controlPosition` | `start` · `end` | `start` | the circle before the label (start) or after it (end) |
| `fullWidth` | `true` · `false` | `false` | spread the row across its container. Off, the row fits its content |
| `isDisabled` | `true` · `false` | `false` | disables this option only; disable the whole set on the RadioGroup |
| `hideLabel` | `true` · `false` | `false` | hide the label visually but keep it for screen readers |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/components/radio

_Generated from the component's schema by `npm run build:docs`._
