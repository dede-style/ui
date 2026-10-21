# Switch

A setting that takes effect immediately: on or off. A checkbox input with `role="switch"`, a visible label, and the control after the words by default.

```tsx
import { Switch } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `checked` | `true` · `false` | `false` | whether the setting is on. Controlled: pass it with onChange |
| `label` | string | — | the visible label and the accessible name. Required. Name the setting (Show guides), not its state (Guides on) |
| `description` | string | — | an optional second line under the label |
| `size` | `4` · `5` · `6` | `6` | height 16, 20 or 24px (default). 24 is the comfortable touch target |
| `controlPosition` | `start` · `end` | `end` | the switch after the label (end, default) or before it |
| `fullWidth` | `true` · `false` | `false` | spread the row across its container, the switch at the far edge, as in a settings list |
| `isDisabled` | `true` · `false` | `false` | disables the switch and dims the row |
| `hideLabel` | `true` · `false` | `false` | hide the label visually but keep it for screen readers, when the name is already on screen |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/components/switch

_Generated from the component's schema by `npm run build:docs`._
