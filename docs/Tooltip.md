# Tooltip

A short line of text beside a control, naming what it does. Tooltip is a wrapper: put the control inside it, as in `<Tooltip content="Next: Matching"><IconButton glyph={iconArrowRight} label="Next: Matching" /></Tooltip>`, and the tooltip anchors to it with nothing else to wire. It shows when the control gets keyboard focus, and after a short delay when the pointer rests on it. It never shows on touch. `placement` picks the side (`above` by default, `below`, `start`, `end`) and `align` where it lines up along that side (`center` by default, `start`, `end`). At a screen edge the browser flips it to the other side.

```tsx
import { Tooltip } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `content` | string | — | the text, required. One short line. Screen readers do not read it, so the control’s own name must say the same or more |
| `placement` | `above` · `below` · `start` · `end` | `above` | which side of the control it sits on. start and end follow the reading direction. At a screen edge it flips to the opposite side |
| `align` | `start` · `center` · `end` | `center` | where it lines up along that side: centred on the control, or level with its start or end edge |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

## Notes

- **The text is hidden from screen readers.** The control’s own accessible name is what they read, so the name must carry everything the tooltip says. The tooltip can say less than the name (a tooltip “Matching” on a button named “Next: Matching”), never more.
- **It hides at once** when the pointer leaves, focus leaves, the control is pressed, or Escape is pressed. Escape leaves focus where it was. The pointer can move from the control onto the tooltip without it closing.
- **The delay is the token `--tooltip-delay`** (200ms, from `--motion-duration-base`), not a prop. Once one tooltip closes, a neighbour reached within the delay opens at once, so a pointer moving along a row of icon buttons reads each name in turn.
- **A disabled control shows no tooltip.** It cannot take keyboard focus, so a tooltip on it would reach pointer users only. If a control is disabled for a reason, say the reason in visible text.
- **It is shown in the top layer**, so a scrolling container such as a table cannot clip it. It is placed with CSS anchor positioning. In a browser without anchor positioning (Chrome and Edge before 129, Safari before 26, Firefox before 147) it shows at the placement you chose and does not flip.
- **A look of your own** is your own class on the Tooltip, with a rule for its text: `.my-tip .dede-tooltip-text { background-color: …; color: … }`. Tooltip’s colour rules have zero specificity, so your rule wins. dede checks contrast only for its own colours.

Live examples: https://dede.style/components/tooltip

_Generated from the component's schema by `npm run build:docs`._
