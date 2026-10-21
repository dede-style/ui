# Stack

Divides a band into lanes and owns its padding and gap. `lanes="2|1"` is two lanes; a responsive object (`{ base: 1, md: "1|1" }`) changes them by width. One row is one Stack.

```tsx
import { Stack } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `pattern` | `ratio` · `snap` | `ratio` | ratio (default) lays lanes out by weight; snap places them on a fixed 25-column grid shared by every Section |
| `lanes` | string | `1` | lane weights, such as 2\|1, or a number of equal lanes. Children fill lanes in order; extra children start a new row. In code it can change by breakpoint: { base: 1, md: 1\|1 } |
| `direction` | `horizontal` · `vertical` | `horizontal` | lanes as columns (horizontal) or rows (vertical). Ratio only |
| `reverse` | `true` · `false` | `false` | reverse the lane order. In code it can change by breakpoint: { base: true, md: false } |
| `align` | `stretch` · `start` · `center` · `end` | `stretch` | how lanes line up with each other. Default stretch makes them equal height |
| `maxWidth` | string | — | cap the content width and centre it: prose, panel, content, wide or a CSS length. Blank is full width |
| `gap` | `0` · `0-5` · `1` · `1-5` · `2` · `3` · `4` · `6` · `8` | `2` | space between lanes, a layout spacing step. Default 2 |
| `paddingX` | `none` · `0` · `0-5` · `1` · `1-5` · `2` · `3` · `4` · `6` · `8` | `2` | padding at the band's left and right edges. Default 2; none inside another Stack or a nested Section. Ratio only |
| `paddingTop` | `none` · `0` · `0-5` · `1` · `1-5` · `2` · `3` · `4` · `6` · `8` | `2` | padding above the band. Default 2; none inside another Stack |
| `paddingBottom` | `none` · `0` · `0-5` · `1` · `1-5` · `2` · `3` · `4` · `6` · `8` | `2` | padding below the band. Default 2; none inside another Stack |
| `edges` | `true` · `false` | `true` | keep a gutter column at each edge. Snap only |
| `gutter` | number | `1` | gutter width in columns. Snap only |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/layout/stack

_Generated from the component's schema by `npm run build:docs`._
