# IconButton

A button with an icon and no visible words. `label` is required and becomes its accessible name. Same variants, sizes and shapes as Button; with `href` it renders a link instead.

```tsx
import { IconButton } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `glyph` | `Alert` · `AlertFill` · `ArrowDown` · `ArrowLeft` · `ArrowRight` · `ArrowUp` … ([all](https://dede.style/icons)) | `Star` | the icon. In code, import it by its full name: icon plus this (Star is iconStar) |
| `label` | string | — | required: the button's accessible name, since it has no visible words |
| `variant` | `primary` · `secondary` · `tertiary` · `destructive` | `secondary` | emphasis: primary, secondary (default), tertiary or destructive |
| `size` | `6` · `8` · `10` · `12` | `10` | 24, 32, 40 or 48px square. Use 24 only where space demands it: it is the minimum touch target |
| `shape` | `rounded` · `pill` · `square` | `rounded` | corners: rounded (default), pill (a circle) or square |
| `isDisabled` | `true` · `false` | `false` | disables the button and dims it |
| `type` | `button` · `submit` · `reset` | `button` | the HTML button type. Default button, so it never submits a form by accident |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/components/icon-button

_Generated from the component's schema by `npm run build:docs`._
