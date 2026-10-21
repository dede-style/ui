# CheckboxGroup

A labelled set of Checkboxes: a fieldset whose legend names the set. Each Checkbox stays controlled on its own.

```tsx
import { CheckboxGroup } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `label` | string | — | the group's name, shown above the options. Required |
| `hideLabel` | `true` · `false` | `false` | hide the name visually but keep it for screen readers, when a heading already says it |
| `isDisabled` | `true` · `false` | `false` | disables every checkbox in the group |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/components/checkbox-group

_Generated from the component's schema by `npm run build:docs`._
