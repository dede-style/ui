# Checkbox

Include this option, independently of the others. A real checkbox input with a visible label and an optional description; `indeterminate` shows a mixed state for a parent of partly selected items. Controlled.

```tsx
import { Checkbox } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `label` | string | — | the visible label and the accessible name. Required |
| `description` | string | — | an optional second line under the label |
| `checked` | `true` · `false` | `false` | whether it is ticked. Controlled: pass it with onChange |
| `size` | `4` · `5` · `6` | `5` | the box: 16, 20 (default) or 24px |
| `indeterminate` | `true` · `false` | `false` | shows a mixed state, for a parent of partly selected items |
| `controlPosition` | `start` · `end` | `start` | the box before the label (start) or after it (end) |
| `fullWidth` | `true` · `false` | `false` | spread the row across its container. Off, the row fits its content |
| `isDisabled` | `true` · `false` | `false` | disables the checkbox and dims the row |
| `hideLabel` | `true` · `false` | `false` | hide the label visually but keep it for screen readers, such as in a table's selection column |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/components/checkbox

_Generated from the component's schema by `npm run build:docs`._
