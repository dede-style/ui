# Divider

A 1px line between items, rendered as an `<hr>`, so screen readers announce it as a separator. `orientation` is `horizontal` (the default), which fills its container's width, or `vertical`, which fills the height of the row it sits in. `variant` is `subtle` (the default) or `strong`. `inset` stops the line short of both ends by a `--space-component-*` step; `inset="text"` makes a vertical line exactly one line of the surrounding text tall. It has no margin: the parent's `gap` spaces it.

```tsx
import { Divider } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `orientation` | `horizontal` · `vertical` | `horizontal` | which way the line runs. Horizontal fills its container's width; vertical fills the height of its row |
| `variant` | `subtle` · `strong` | `subtle` | how much it stands out: subtle (default) uses the subtle border colour, strong the strong one |
| `inset` | `none` · `text` · `1` · `2` · `3` · `4` · `5` · `6` · `8` | `none` | how far short of each end the line stops. A number is a --space-component-* step, taken off the top and bottom when vertical, or the start and end when horizontal. text makes a vertical line exactly one line of the surrounding text tall, centred in the row. On a horizontal line, text is the same as none |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

## Notes

- **A vertical divider needs a flex or grid row.** It takes the row's height. In plain block flow it has no height to take, so it does not show.
- **A line as tall as the text:** use `inset="text"` on a vertical divider. The line is one line of the text around it tall (`1lh`), centred in the row, so it matches the text at any size. A step such as `inset="3"` is a fixed length instead: in a 40px row it leaves 16px.
- **`inset="text"` on a horizontal divider** does nothing: the line fills the width, as with `"none"`.
- **A look of your own** is your own class on the divider: `.divider-brand { border-color: … }` with `<Divider className="divider-brand" />`. Divider's colour rules have zero specificity, so your class wins whatever order the stylesheets load in.

Live examples: https://dede.style/components/divider

_Generated from the component's schema by `npm run build:docs`._
