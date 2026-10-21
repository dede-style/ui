# RadioGroup

One choice from a set where every option is visible and can carry a description. A fieldset with a legend; controlled by `value` and `onChange`.

```tsx
import { RadioGroup } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `label` | string | — | the group's name, shown above the options. Required |
| `hideLabel` | `true` · `false` | `false` | hide the name visually but keep it for screen readers, when a heading already says it |
| `isDisabled` | `true` · `false` | `false` | disables every option |
| `required` | `true` · `false` | `false` | requires a choice before the form submits (browser validation) |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/components/radio-group

_Generated from the component's schema by `npm run build:docs`._
