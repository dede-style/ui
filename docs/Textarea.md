# Textarea

Several lines of typed text, in the same box as TextInput. `rows` sets the height in lines and the smallest it can be dragged to. It fills its container's width. Put it in a Field for a label, hint and error. Controlled.

```tsx
import { Textarea } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `value` | string | — | the text. Controlled: pass it with onChange |
| `rows` | `2` · `3` · `4` · `5` · `6` · `8` | `3` | the height in lines: 2, 3 (default), 4, 5, 6 or 8. It is also the smallest the box can be dragged to |
| `resize` | `vertical` · `none` | `vertical` | vertical (default) lets the person drag the box taller; none removes the drag handle. Never sideways |
| `autoSize` | `true` · `false` | `false` | grows the box as the person types, from rows up. Works in Chrome and Edge 123+, Safari 26.2+ and Firefox 152+; older browsers keep the rows height and the drag handle |
| `variant` | `frame` · `plain` | `frame` | frame (default) draws the box; plain has no box, only the focus ring |
| `size` | `8` · `10` · `12` | `10` | the text size and padding of a TextInput of this size (32, 40 or 48px), so the two line up in a form. The height comes from rows |
| `placeholder` | string | — | an example of what to write, shown until something is typed. Not a label |
| `required` | `true` · `false` | `false` | requires a value before the form submits. No asterisk is shown; mark optional fields in their label |
| `disabled` | `true` · `false` | `false` | disables the field and dims it. Prefer readOnly when the text should still be read or copied |
| `readOnly` | `true` · `false` | `false` | the text can be read, selected and copied, and is submitted, but not edited |
| `maxLength` | number | — | the most characters allowed. There is no counter |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

## Notes

- **`rows` is the height and the minimum.** The person can drag the box taller (`resize="vertical"`, the default) but never shorter than `rows`. `resize="none"` removes the drag handle. It never resizes sideways: it fills its container.
- **`autoSize` grows the box as the person types**, from `rows` up, using CSS `field-sizing: content`. Chrome and Edge 123+, Safari 26.2+ and Firefox 152+ support it. In older browsers the box stays at `rows` and keeps its drag handle. Where it grows, the drag handle is removed.
- **`size` matches a TextInput of the same size:** the same text size, and the same space above the first line, so a Textarea and a TextInput line up in one form.
- **No character counter.** `maxLength` sets the attribute only.

Live examples: https://dede.style/components/textarea

_Generated from the component's schema by `npm run build:docs`._
