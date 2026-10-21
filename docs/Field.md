# Field

The label, hint and error around one form control (TextInput, Select). The hint sits above the control, the error below; passing `error` marks the control invalid. Field never validates — the form decides when.

```tsx
import { Field } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `label` | string | — | the control's visible label. Required. Mark an optional field in these words: Middle name (optional) |
| `labelHidden` | `true` · `false` | `false` | hide the label visually but keep it for screen readers, only where the purpose is obvious (a search box beside its button) |
| `hint` | string | — | one line of instructions, shown above the control |
| `error` | string | — | an error message, shown below the control. Setting it marks the control invalid |
| `id` | string | — | the control's id. Generated if left empty |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/components/field

_Generated from the component's schema by `npm run build:docs`._
