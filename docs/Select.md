# Select

One choice from a list that opens over the page. Same box as TextInput, keyboard and type-ahead like a native select, and form participation through `name`.

```tsx
import { Select } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `placeholder` | string | — | shown until an option is chosen. Not a label |
| `size` | `8` · `10` · `12` | `10` | height: 32, 40 (default) or 48px, matching TextInput and Button |
| `variant` | `frame` · `plain` | `frame` | frame (default) draws the box; plain has no box, for a toolbar |
| `width` | `2` · `3` · `4` · `5` · `10` · `20` · `full` | `full` | how many characters the trigger fits. full fills the container |
| `disabled` | `true` · `false` | `false` | disables the select and dims it |
| `required` | `true` · `false` | `false` | requires a choice before the form submits. No asterisk is shown |
| `invalid` | `true` · `false` | `false` | shows the error state. Inside a Field it follows the Field's error |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/components/select

_Generated from the component's schema by `npm run build:docs`._
