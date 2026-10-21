# Button

A button that does something on this page. `variant` sets how much emphasis it claims — one `primary` per view, `secondary` by default, `tertiary` for the quietest, `destructive` for a dangerous action. It hugs its label; `fullWidth` fills the container.

```tsx
import { Button } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `variant` | `primary` · `secondary` · `tertiary` · `destructive` | `secondary` | emphasis: primary for the main action (one per view), secondary (default), tertiary for the quietest, destructive for a dangerous action |
| `size` | `6` · `8` · `10` · `12` | `10` | height: 24, 32, 40 or 48px. 24 is for icon buttons only |
| `shape` | `rounded` · `pill` · `square` | `rounded` | corners: rounded (default), pill or square |
| `glyph` | `none` · `Alert` · `AlertFill` · `ArrowDown` · `ArrowLeft` · `ArrowRight` … ([all](https://dede.style/icons)) | `none` | an optional icon beside the label. In code, import it by its full name: icon plus this (Star is iconStar) |
| `iconPosition` | `start` · `end` | `start` | which side of the label the icon sits on |
| `isDisabled` | `true` · `false` | `false` | disables the button and dims it |
| `fullWidth` | `true` · `false` | `false` | fill the container's width. Off, the button fits its label |
| `type` | `button` · `submit` · `reset` | `button` | the HTML button type. Default button, so it never submits a form by accident; use submit to submit |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/components/button

_Generated from the component's schema by `npm run build:docs`._
