# Figure

Content with an optional caption under it: an image, a video, an SVG or a component. It fills its lane. `caption` makes it a `<figure>` with a `<figcaption>`. `surface="sunken"` puts the content in a rounded panel, with padding per edge (`paddingTop`, `paddingBottom`, `paddingStart`, `paddingEnd`) and an optional `mode`. `contentRatio` crops the content to a ratio such as `"16:9"`, and `contentPosition` says which part it keeps; `panelRatio` gives the panel a ratio. `fit` sets the content's width as a share of the frame, and `justify` and `align` place it. Figure never renders the image itself: pass your own `<img>` or your framework's image.

```tsx
import { Figure } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `caption` | text or any React content | — | text under the frame. Given, the figure is a <figure> and this its <figcaption>. Blank, it is a plain wrapper |
| `surface` | `none` · `sunken` | `none` | sunken puts the content in a rounded panel, in the sunken surface colour. None (default) shows the content alone |
| `mode` | `inherit` · `light` · `dark` · `inverse` | `inherit` | put the panel in a mode, as Section’s mode. Light keeps a sketch’s panel light on a dark page. Panel only |
| `contentRatio` | a ratio written `16:9` or `16/9` (the exported type `FigureRatio`) | — | crop the content to this ratio of width to height, such as 16:9 or 1:1. An image, video or SVG inside fills it and is cut to fit. Blank keeps the content’s own shape |
| `contentPosition` | `center` · `top` · `bottom` · `start` · `end` | `center` | which part of the content the crop keeps: center (default), top, bottom, start (left) or end (right). An inline SVG follows its own preserveAspectRatio instead. With contentRatio only |
| `panelRatio` | a ratio written `16:9` or `16/9` (the exported type `FigureRatio`) | — | give the panel this ratio of width to height, such as 16:9. Content taller than the panel runs off an edge. Blank, the panel is the content’s height plus its padding. Panel only |
| `fit` | number | `1` | the content’s width as a share of the frame: 0.85 is 85%. Without a panel, the caption takes the same width |
| `justify` | `start` · `center` · `end` | `center` | where the content sits from side to side: start (left), center (default) or end (right) |
| `align` | `start` · `center` · `end` | `center` | where the content sits from top to bottom, in a panel taller than it. Content taller than the panel starts at the top, unless end. Panel only |
| `paddingTop` | `none` · `0` · `0-25` · `0-5` · `1` · `1-5` · `2` · `3` · `4` · `6` · `8` | `2` | the panel’s padding at the top, a layout spacing step. None lets the content meet that edge. Panel only |
| `paddingBottom` | `none` · `0` · `0-25` · `0-5` · `1` · `1-5` · `2` · `3` · `4` · `6` · `8` | `2` | the panel’s padding at the bottom. None lets a tall document run off the bottom. Panel only |
| `paddingStart` | `none` · `0` · `0-25` · `0-5` · `1` · `1-5` · `2` · `3` · `4` · `6` · `8` | `2` | the panel’s padding at the start (left). Panel only |
| `paddingEnd` | `none` · `0` · `0-25` · `0-5` · `1` · `1-5` · `2` · `3` · `4` · `6` · `8` | `2` | the panel’s padding at the end (right). Panel only |
| `overflow` | `hidden` · `visible` | `hidden` | hidden (default) cuts the content off at the panel’s edge; visible lets it spill past. Panel only |
| `border` | `true` · `false` | `false` | a hairline round the content, for an image whose own edge is white. It is drawn over the content, so it takes no room |
| `rounded` | `true` · `false` | `false` | round the content’s corners, for a photo standing alone. The panel is always rounded; content inside it is square unless this is on |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

## Notes

- **The caption is always under the frame**: under the panel when there is one, under the content when not. It is never inside the panel.
- **A panel colour of your own** is the sunken role set on your own class: `.canvas-brand { --color-surface-sunken: …; }` with `<Figure surface="sunken" className="canvas-brand">`. dede checks contrast only for its own colours.
- **Content taller than its panel** starts at the panel's top and runs off the bottom, unless `align="end"`, which keeps its bottom edge on the panel's bottom and runs off the top. The panel clips it, unless `overflow="visible"`.
- **A ratio is written with a colon**, `"16:9"`. `"16/9"` and `"16 / 9"` work too, and decimals are fine (`"1:1.414"`). A value that is not a ratio is ignored, with a warning in development.
- **Two ways to show part of an image.** The panel can cut it: give the panel a `panelRatio` and let a tall image run off an edge, which says there is more of it. Or crop the content itself with `contentRatio` and `contentPosition`, which gives the visible part a clean shape of its own.
- **Figure fills its lane by default**, unlike controls, which hug. An image has no natural size that suits a page. To make it narrower, use `fit` or put it in a narrower lane.

Live examples: https://dede.style/components/figure

_Generated from the component's schema by `npm run build:docs`._
