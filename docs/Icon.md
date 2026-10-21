# Icon

An SVG glyph from `@dede-style/ui/icons`, sized on the element ramp and coloured by `currentColor`. Decorative by default; give `label` only when the icon is the content.

```tsx
import { Icon } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `glyph` | `Alert` · `AlertFill` · `ArrowDown` · `ArrowLeft` · `ArrowRight` · `ArrowUp` … ([all](https://dede.style/icons)) | `Star` | the icon. In code, import it by its full name: icon plus this (Star is iconStar) |
| `size` | `3` · `4` · `5` · `6` · `8` · `10` · `12` · `text` · `fill` | `6` | a size step (16, 20, 24px…), or text to match the surrounding type, or fill to fill the container |
| `label` | string | — | leave empty for a decorative icon. Set it only when the icon is the content; an icon button takes its name on the button |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/components/icon

_Generated from the component's schema by `npm run build:docs`._
