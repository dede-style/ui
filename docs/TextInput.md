# TextInput

One line of typed text. `type` sets the keyboard and browser handling; affixes (text or an icon) sit inside the box. Put it in a Field for a label, hint and error. Controlled.

```tsx
import { TextInput } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `value` | string | — | the text. Controlled: pass it with onChange |
| `type` | `text` · `email` · `password` · `tel` · `url` · `search` · `number` | `text` | what is being typed: text, email, password, tel, url, search or number. Sets the keyboard and browser behaviour |
| `variant` | `frame` · `plain` | `frame` | frame (default) draws the box; plain has no box, for a search in a toolbar. Give a plain field an icon or placeholder |
| `size` | `8` · `10` · `12` | `10` | height: 32, 40 (default) or 48px, matching Button |
| `width` | `2` · `3` · `4` · `5` · `10` · `20` · `full` | `full` | how many characters the box fits, as a hint of the expected length. full fills the container |
| `placeholder` | string | — | an example of the format, shown until something is typed. Not a label |
| `prefix` | string | — | text at the start of the box, such as a currency sign |
| `prefixIcon` | `none` · `Alert` · `AlertFill` · `ArrowDown` · `ArrowLeft` · `ArrowRight` … ([all](https://dede.style/icons)) | `none` | an icon at the start of the box. In code, import it by its full name: icon plus this (Search is iconSearch) |
| `suffix` | string | — | text at the end of the box, such as a unit |
| `suffixIcon` | `none` · `Alert` · `AlertFill` · `ArrowDown` · `ArrowLeft` · `ArrowRight` … ([all](https://dede.style/icons)) | `none` | an icon at the end of the box |
| `required` | `true` · `false` | `false` | requires a value before the form submits. No asterisk is shown; mark optional fields in their label |
| `disabled` | `true` · `false` | `false` | disables the field and dims it. Prefer readOnly when the value should still be read or copied |
| `readOnly` | `true` · `false` | `false` | the value can be read, selected and copied, and is submitted, but not edited |
| `maxLength` | number | — | the most characters allowed |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

Live examples: https://dede.style/components/text-input

_Generated from the component's schema by `npm run build:docs`._
