import type { SchemaFor } from "../../props/controls"
import type { DividerProps } from "./Divider"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "A 1px line between items, rendered as an `<hr>`, so screen readers announce it as a separator. `orientation` is `horizontal` (the default), which fills its container's width, or `vertical`, which fills the height of the row it sits in. `variant` is `subtle` (the default) or `strong`. `inset` stops the line short of both ends by a `--space-component-*` step; `inset=\"text\"` makes a vertical line exactly one line of the surrounding text tall. It has no margin: the parent's `gap` spaces it."

export const notes = [
    "**A vertical divider needs a flex or grid row.** It takes the row's height. In plain block flow it has no height to take, so it does not show.",
    "**A line as tall as the text:** use `inset=\"text\"` on a vertical divider. The line is one line of the text around it tall (`1lh`), centred in the row, so it matches the text at any size. A step such as `inset=\"3\"` is a fixed length instead: in a 40px row it leaves 16px.",
    "**`inset=\"text\"` on a horizontal divider** does nothing: the line fills the width, as with `\"none\"`.",
    "**A look of your own** is your own class on the divider: `.divider-brand { border-color: … }` with `<Divider className=\"divider-brand\" />`. Divider's colour rules have zero specificity, so your class wins whatever order the stylesheets load in.",
]

export const dividerControls: SchemaFor<DividerProps> = [
    { prop: "orientation", type: "select", options: ["horizontal", "vertical"], default: "horizontal", help: "which way the line runs. Horizontal fills its container's width; vertical fills the height of its row" },
    { prop: "variant", type: "select", options: ["subtle", "strong"], default: "subtle", help: "how much it stands out: subtle (default) uses the subtle border colour, strong the strong one" },
    { prop: "inset", type: "select", options: ["none", "text", "1", "2", "3", "4", "5", "6", "8"], default: "none", help: "how far short of each end the line stops. A number is a --space-component-* step, taken off the top and bottom when vertical, or the start and end when horizontal. text makes a vertical line exactly one line of the surrounding text tall, centred in the row. On a horizontal line, text is the same as none" },
]
